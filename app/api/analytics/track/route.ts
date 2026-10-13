import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LOG_FILE = "/tmp/google_visitor_analytics.json";

type VisitEvent = {
  id: string;
  timestamp: string;
  page: string;
  ip: string;
  city: string;
  region: string;
  country: string;
  isGoogleNetwork: boolean;
  referrer: string;
  userAgent: string;
  screen?: string;
};

function readEvents(): VisitEvent[] {
  try {
    if (fs.existsSync(LOG_FILE)) {
      const data = fs.readFileSync(LOG_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {}
  return [];
}

function saveEvent(event: VisitEvent) {
  try {
    const list = readEvents();
    list.unshift(event);
    // keep last 500 events
    const trimmed = list.slice(0, 500);
    fs.writeFileSync(LOG_FILE, JSON.stringify(trimmed, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save visitor event:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const headers = req.headers;

    const ip =
      headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headers.get("x-real-ip") ||
      "127.0.0.1";
    const city = headers.get("x-vercel-ip-city") || "Unknown City";
    const region = headers.get("x-vercel-ip-country-region") || "Unknown Region";
    const country = headers.get("x-vercel-ip-country") || "CH";
    const userAgent = headers.get("user-agent") || "";
    const referrer = body.referrer || headers.get("referer") || "";

    // Detect Google corporate network / ASN / domains
    const isGoogleNetwork =
      referrer.toLowerCase().includes("google") ||
      userAgent.toLowerCase().includes("google") ||
      ip.startsWith("66.249.") ||
      ip.startsWith("66.102.") ||
      ip.startsWith("64.233.") ||
      ip.startsWith("72.14.") ||
      ip.startsWith("74.125.") ||
      ip.startsWith("209.85.") ||
      ip.startsWith("216.239.");

    const event: VisitEvent = {
      id: Math.random().toString(36).slice(2, 10),
      timestamp: new Date().toISOString(),
      page: body.page || "/google",
      ip: ip.replace(/:\d+$/, ""),
      city,
      region,
      country,
      isGoogleNetwork,
      referrer,
      userAgent,
      screen: body.screen || "unknown",
    };

    saveEvent(event);

    return NextResponse.json({ ok: true, id: event.id });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  const events = readEvents();
  const googleVisits = events.filter((e) => e.isGoogleNetwork);
  return NextResponse.json({
    totalVisits: events.length,
    googleNetworkVisits: googleVisits.length,
    recentEvents: events.slice(0, 50),
  });
}
