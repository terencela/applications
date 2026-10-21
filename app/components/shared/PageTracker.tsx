"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import {
  getSessionId,
  isTrackerDebug,
  track,
  TRACKER_DEBUG_EVENT,
  type TrackerEvent,
} from "@/app/lib/tracker";

type PageTrackerProps = {
  posthogKey?: string;
  posthogHost?: string;
  gaId?: string;
};

function sectionName(el: Element): string {
  const heading = el.querySelector("h1, h2")?.textContent?.trim();
  if (heading) return heading.slice(0, 80);
  return el.id || "section";
}

function closestSectionName(el: Element | null): string | undefined {
  const section = el?.closest("section");
  return section ? sectionName(section) : undefined;
}

export function PageTracker({ posthogKey, posthogHost, gaId }: PageTrackerProps) {
  const pathname = usePathname() || "/";
  const [debug] = useState<boolean>(() => {
    try {
      return isTrackerDebug();
    } catch {
      return false;
    }
  });
  const [debugEvents, setDebugEvents] = useState<TrackerEvent[]>([]);
  const startedAt = useRef<number>(0);

  useEffect(() => {
    getSessionId();
    const onEvent = (e: Event) => {
      const detail = (e as CustomEvent<TrackerEvent>).detail;
      setDebugEvents((prev) => [detail, ...prev].slice(0, 8));
    };
    window.addEventListener(TRACKER_DEBUG_EVENT, onEvent);
    return () => window.removeEventListener(TRACKER_DEBUG_EVENT, onEvent);
  }, []);

  // Pageview + time on page
  useEffect(() => {
    startedAt.current = Date.now();
    track({ event: "pageview", page: pathname });
    let exitSent = false;
    const sendExit = () => {
      if (exitSent) return;
      exitSent = true;
      track(
        {
          event: "page_exit",
          page: pathname,
          value: Math.round((Date.now() - startedAt.current) / 1000),
        },
        { beacon: true },
      );
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") sendExit();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", sendExit);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", sendExit);
    };
  }, [pathname]);

  // Scroll depth + which sections were actually seen
  useEffect(() => {
    const firedDepth = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.round((window.scrollY / max) * 100);
      for (const milestone of [25, 50, 75, 90, 100]) {
        if (pct >= milestone && !firedDepth.has(milestone)) {
          firedDepth.add(milestone);
          track({ event: "scroll_depth", page: pathname, value: milestone });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const name = sectionName(entry.target);
          if (seen.has(name)) continue;
          seen.add(name);
          track({ event: "section_view", page: pathname, section: name });
        }
      },
      { threshold: 0.3 },
    );
    document.querySelectorAll("section").forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [pathname]);

  // Every click on a link or button, with its visible label
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest("a, button") as HTMLElement | null;
      if (!target) return;
      const label =
        target.getAttribute("aria-label") ||
        target.textContent?.trim().replace(/\s+/g, " ") ||
        "";
      const href = target instanceof HTMLAnchorElement ? target.href : undefined;
      const isVideo = /play video/i.test(label);
      track({
        event: isVideo ? "video_play" : "click",
        page: pathname,
        label: label.slice(0, 80),
        href,
        section: closestSectionName(target),
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  return (
    <>
      {posthogKey ? (
        <Script id="posthog-init" strategy="afterInteractive">
          {`(function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]);t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureFlagEnabled reloadFeatureFlags updateEarlyAccessErrorTracking getEarlyAccessCalled getEarlyAccessErrorChecking getEarlyAccessCalls getDistinctId getGroups get_session_id get_session_replay_url alias set_config setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url getFeatureFlag getFeatureFlagResult".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1})(document,window.posthog||[]);
posthog.init(${JSON.stringify(posthogKey)},{api_host:${JSON.stringify(posthogHost || "https://eu.i.posthog.com")},person_profiles:"identified_only",capture_pageview:false});`}
        </Script>
      ) : null}
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag("js",new Date());gtag("config",${JSON.stringify(gaId)},{send_page_view:false});`}
          </Script>
        </>
      ) : null}
      {debug ? (
        <div className="fixed bottom-4 left-4 z-[200] w-[320px] max-w-[calc(100vw-2rem)] border border-white/20 bg-black/90 p-3 text-white shadow-2xl backdrop-blur">
          <p className="text-xs font-semibold">Tracker debug</p>
          <p className="mt-1 text-[11px] leading-snug text-white/70">
            First-party pixel: firing. PostHog: {posthogKey ? "configured" : "not configured"}. GA4:{" "}
            {gaId ? "configured" : "not configured"}.
          </p>
          <ul className="mt-2 space-y-1 text-[11px] leading-snug">
            {debugEvents.length === 0 ? (
              <li className="text-white/60">No events yet. Scroll or click.</li>
            ) : (
              debugEvents.map((ev, i) => (
                <li key={`${ev.event}-${i}`} className="truncate">
                  <span className="font-semibold">{ev.event}</span>
                  {ev.section ? ` · ${ev.section}` : ""}
                  {ev.label ? ` · ${ev.label}` : ""}
                  {typeof ev.value === "number" ? ` · ${ev.value}` : ""}
                </li>
              ))
            )}
          </ul>
          <p className="mt-2 text-[10px] text-white/50">
            Open Network tab and filter “track” to see each pixel fire. Append ?tracker_debug=0
            after removing the local flag, or clear site data to hide this panel.
          </p>
        </div>
      ) : null}
    </>
  );
}
