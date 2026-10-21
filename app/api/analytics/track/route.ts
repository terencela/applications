import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

const LOG_FILE = "/tmp/dossier_analytics.json";
const MAX_EVENTS = 1000;
const EVENTS = new Set([
  "pageview",
  "section_view",
  "scroll_depth",
  "click",
  "video_play",
  "page_exit",
]);

type TrackEvent = {
  id: string;
  timestamp: string;
  event: string;
  page: string;
  label?: string;
  href?: string;
  section?: string;
  value?: number;
  sessionId?: string;
  city: string;
  country: string;
  referrer: string;
  screen?: string;
};

// Best-effort per-IP rate limit (in-memory, per instance). Protects the public write endpoint.
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - 60_000;
  const list = (hits.get(ip) || []).filter((t) => t > windowStart);
  list.push(now);
  hits.set(ip, list);
  return list.length > 120;
}

function readEvents(): TrackEvent[] {
  try {
    if (fs.existsSync(LOG_FILE)) return JSON.parse(fs.readFileSync(LOG_FILE, "utf-8"));
  } catch {}
  return [];
}

function saveEvent(event: TrackEvent) {
  try {
    const list = readEvents();
    list.unshift(event);
    fs.writeFileSync(LOG_FILE, JSON.stringify(list.slice(0, MAX_EVENTS), null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save tracker event:", err);
  }
}

function clean(value: unknown, max: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim().slice(0, max);
  return trimmed || undefined;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const event = clean(body.event, 40);
  const page = clean(body.page, 120);
  if (!event || !EVENTS.has(event) || !page || !page.startsWith("/")) {
    return NextResponse.json({ ok: false, error: "invalid_event" }, { status: 400 });
  }

  const record: TrackEvent = {
    id: Math.random().toString(36).slice(2, 10),
    timestamp: new Date().toISOString(),
    event,
    page,
    label: clean(body.label, 80),
    href: clean(body.href, 300),
    section: clean(body.section, 80),
    value: typeof body.value === "number" && Number.isFinite(body.value) ? body.value : undefined,
    sessionId: clean(body.sessionId, 40),
    // Location comes from Vercel edge headers. No raw IP is stored or returned.
    city: req.headers.get("x-vercel-ip-city") || "Unknown",
    country: req.headers.get("x-vercel-ip-country") || "Unknown",
    referrer: clean(body.referrer, 300) || "",
    screen: clean(body.screen, 40),
  };

  saveEvent(record);
  return NextResponse.json({ ok: true, id: record.id, event: record.event });
}

function countBy(events: TrackEvent[], key: (e: TrackEvent) => string | undefined) {
  const out: Record<string, number> = {};
  for (const e of events) {
    const k = key(e);
    if (k) out[k] = (out[k] || 0) + 1;
  }
  return Object.entries(out)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([name, count]) => ({ name, count }));
}

export async function GET() {
  const events = readEvents();
  const sessions = new Set(events.map((e) => e.sessionId).filter(Boolean));
  return NextResponse.json({
    totalEvents: events.length,
    sessions: sessions.size,
    pageviews: countBy(
      events.filter((e) => e.event === "pageview"),
      (e) => e.page,
    ),
    sectionsSeen: countBy(
      events.filter((e) => e.event === "section_view"),
      (e) => `${e.page} · ${e.section || "section"}`,
    ),
    scrollDepth: countBy(
      events.filter((e) => e.event === "scroll_depth"),
      (e) => `${e.page} · ${e.value ?? "?"}%`,
    ),
    clicks: countBy(
      events.filter((e) => e.event === "click" || e.event === "video_play"),
      (e) => `${e.event}: ${e.label || e.href || "button"}`,
    ),
    countries: countBy(events, (e) => e.country),
    note: "First-party log is recent-visit verification (ephemeral on Vercel). PostHog/GA4 are the durable dashboards once their env keys are set.",
    recentEvents: events.slice(0, 30).map((e) => ({
      timestamp: e.timestamp,
      event: e.event,
      page: e.page,
      label: e.label,
      section: e.section,
      value: e.value,
      city: e.city,
      country: e.country,
    })),
  });
}
