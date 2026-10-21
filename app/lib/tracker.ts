"use client";

export type TrackerEventName =
  | "pageview"
  | "section_view"
  | "scroll_depth"
  | "click"
  | "video_play"
  | "page_exit";

export type TrackerEvent = {
  event: TrackerEventName;
  page: string;
  label?: string;
  href?: string;
  section?: string;
  value?: number;
};

type PostHogLike = { capture: (event: string, props?: Record<string, unknown>) => void };
type GtagLike = (command: string, event: string, props?: Record<string, unknown>) => void;

declare global {
  interface Window {
    __tlTracker?: { events: TrackerEvent[]; posthog: boolean; ga: boolean };
    posthog?: PostHogLike;
    gtag?: GtagLike;
  }
}

const SESSION_KEY = "tl-tracker-session";
export const TRACKER_DEBUG_EVENT = "tl-tracker-event";

export function getSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return "unknown";
  }
}

export function isTrackerDebug(): boolean {
  try {
    if (new URLSearchParams(window.location.search).get("tracker_debug") === "1") {
      localStorage.setItem("tl-tracker-debug", "1");
      return true;
    }
    return localStorage.getItem("tl-tracker-debug") === "1";
  } catch {
    return false;
  }
}

function sendFirstParty(payload: Record<string, unknown>, useBeacon: boolean) {
  const body = JSON.stringify(payload);
  try {
    if (useBeacon && navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics/track", new Blob([body], { type: "application/json" }));
      return;
    }
    void fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Tracking must never break the page.
  }
}

/** Fire one interaction event to the first-party endpoint, PostHog, and GA4 (when configured). */
export function track(event: TrackerEvent, opts?: { beacon?: boolean }) {
  if (typeof window === "undefined") return;
  const payload = {
    ...event,
    label: event.label?.slice(0, 80),
    href: event.href?.slice(0, 300),
    section: event.section?.slice(0, 80),
    sessionId: getSessionId(),
    referrer: document.referrer || "",
    screen: `${window.innerWidth}x${window.innerHeight}`,
    timestamp: new Date().toISOString(),
  };

  sendFirstParty(payload, Boolean(opts?.beacon));

  try {
    window.posthog?.capture(event.event, payload);
  } catch {}
  try {
    window.gtag?.("event", event.event, payload);
  } catch {}

  try {
    if (!window.__tlTracker) window.__tlTracker = { events: [], posthog: false, ga: false };
    window.__tlTracker.events.push(event);
    window.__tlTracker.posthog = Boolean(window.posthog);
    window.__tlTracker.ga = Boolean(window.gtag);
    window.dispatchEvent(new CustomEvent<TrackerEvent>(TRACKER_DEBUG_EVENT, { detail: event }));
  } catch {}
}
