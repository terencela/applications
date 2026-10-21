"use client";

import React, { useId, useState } from "react";
import { motion } from "framer-motion";
import { useDossierTheme } from "@/app/lib/dossier-theme";

export type StatPillar = { stat: string; title: string };
export type IntersectionPower = { title: string; desc: string };

export const businessPillars: StatPillar[] = [
  { stat: "32M+", title: "AI Lead at Zurich Airport" },
  { stat: "$1M+", title: "Agency founder, with 1 exit" },
  { stat: "St. Gallen", title: "M.A. in Business Innovation" },
];

export const techPillars: StatPillar[] = [
  { stat: "8×", title: "Hackathon winner, mostly solo" },
  { stat: "20+", title: "AI products built. GPT-3 since 2020." },
  { stat: "2 weeks", title: "App rebuilt for 35,000 staff, solo" },
];

type BusinessTechIntersectionProps = {
  reduceMotion: boolean | null;
  accent?: string;
  accentSoft?: string;
  techGradient?: [string, string];
  intro: string;
  centerTop: string;
  centerBottom: string;
  overlapTitle: string;
  intersectionPowers: IntersectionPower[];
};

export function BusinessTechIntersection({
  reduceMotion,
  intro,
  centerTop,
  centerBottom,
  overlapTitle,
  intersectionPowers,
}: BusinessTechIntersectionProps) {
  const [activeTab, setActiveTab] = useState<"overlap" | "business" | "tech">("overlap");
  const { theme } = useDossierTheme();
  const isDark = theme === "dark";
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const businessGradientId = `businessGradient-${uid}`;
  const techGradientId = `techGradient-${uid}`;
  const overlapGlowId = `overlapGlow-${uid}`;

  const tabClass = (tab: typeof activeTab) =>
    `rounded-full px-3.5 py-1.5 font-medium transition-all duration-200 ${
      activeTab === tab
        ? "shadow-sm"
        : "text-[var(--dossier-muted)] hover:text-[var(--dossier-ink)]"
    }`;
  const tabStyle = (tab: typeof activeTab) =>
    activeTab === tab
      ? { backgroundColor: "var(--dossier-ink)", color: "var(--dossier-bg)" }
      : undefined;

  const cardClass = (tab: typeof activeTab) =>
    `cursor-pointer rounded-xl border bg-[var(--dossier-panel)] p-4.5 transition-all duration-200 ${
      activeTab === tab
        ? "border-[var(--dossier-ink)] ring-1 ring-[var(--dossier-ink)]/15"
        : "border-[var(--dossier-line)] hover:border-[var(--dossier-line-strong)]"
    }`;

  const circleFillStops = isDark
    ? {
        busStart: "#181a22",
        busEnd: "#0e1015",
        techStart: "#1c1f29",
        techEnd: "#11131a",
        glow: "#ffffff",
        textPrimary: "#f4f2ec",
        textSecondary: "#9fa2ae",
        strokeDefault: "rgba(255, 255, 255, 0.14)",
        strokeActive: "#f4f2ec",
        innerRing: "rgba(255, 255, 255, 0.06)",
        badgeBg: "#0a0b0f",
        badgeStroke: "rgba(255, 255, 255, 0.28)",
        badgeTop: "#9fa2ae",
        badgeBottom: "#f4f2ec",
      }
    : {
        busStart: "#f5f4ef",
        busEnd: "#eceae2",
        techStart: "#f2f1ec",
        techEnd: "#e7e5dc",
        glow: "#1a1a1a",
        textPrimary: "#1a1a1a",
        textSecondary: "#575757",
        strokeDefault: "rgba(26, 26, 26, 0.16)",
        strokeActive: "#1a1a1a",
        innerRing: "rgba(26, 26, 26, 0.08)",
        badgeBg: "#1a1a1a",
        badgeStroke: "#1a1a1a",
        badgeTop: "#b8b8b2",
        badgeBottom: "#fafaf8",
      };

  return (
    <section className="dossier-section relative z-[2] !pt-4 !pb-6" id="business-tech-overlap">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-[clamp(26px,3.4vw,38px)] font-semibold tracking-[-0.04em] text-[var(--dossier-ink)]">
              Business leader. Hands-on engineer.
            </h2>
            <p className="mt-2 max-w-[52ch] text-[14px] leading-relaxed text-[var(--dossier-body)] md:text-[15px]">
              {intro}
            </p>
          </div>

          <div className="inline-flex rounded-full border border-[var(--dossier-line-strong)] bg-[var(--dossier-panel)] p-1 text-xs">
            <button type="button" onClick={() => setActiveTab("overlap")} className={tabClass("overlap")} style={tabStyle("overlap")}>
              The Overlap
            </button>
            <button type="button" onClick={() => setActiveTab("business")} className={tabClass("business")} style={tabStyle("business")}>
              Business
            </button>
            <button type="button" onClick={() => setActiveTab("tech")} className={tabClass("tech")} style={tabStyle("tech")}>
              Tech
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-4 sm:p-5 md:p-6 lg:p-7">
          <div className="relative mx-auto flex w-full max-w-[720px] flex-col items-center justify-center py-2 md:py-4">
            <div className="relative aspect-[16/8.8] w-full max-w-[560px] select-none">
              <svg viewBox="0 0 540 280" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id={businessGradientId} x1="100" y1="40" x2="280" y2="240" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor={circleFillStops.busStart} stopOpacity="0.96" />
                    <stop offset="100%" stopColor={circleFillStops.busEnd} stopOpacity="0.98" />
                  </linearGradient>
                  <linearGradient id={techGradientId} x1="260" y1="40" x2="440" y2="240" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor={circleFillStops.techStart} stopOpacity="0.94" />
                    <stop offset="100%" stopColor={circleFillStops.techEnd} stopOpacity="0.98" />
                  </linearGradient>
                  <radialGradient id={overlapGlowId} cx="270" cy="140" r="90" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor={circleFillStops.glow} stopOpacity={isDark ? "0.14" : "0.08"} />
                    <stop offset="85%" stopColor={circleFillStops.glow} stopOpacity={isDark ? "0.04" : "0.02"} />
                    <stop offset="100%" stopColor={circleFillStops.glow} stopOpacity="0" />
                  </radialGradient>
                </defs>

                <motion.g
                  animate={reduceMotion ? undefined : { x: activeTab === "tech" ? -12 : activeTab === "business" ? 8 : 0, scale: activeTab === "business" ? 1.03 : activeTab === "tech" ? 0.97 : 1 }}
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  className="cursor-pointer"
                  onClick={() => setActiveTab("business")}
                >
                  <circle
                    cx="195"
                    cy="140"
                    r="108"
                    fill={`url(#${businessGradientId})`}
                    stroke={activeTab === "business" ? circleFillStops.strokeActive : circleFillStops.strokeDefault}
                    strokeWidth={activeTab === "business" ? "2" : "1.2"}
                    className="transition-colors duration-300"
                  />
                  <circle cx="195" cy="140" r="82" stroke={circleFillStops.innerRing} strokeDasharray="4 4" strokeWidth="1" />
                </motion.g>

                <motion.g
                  animate={reduceMotion ? undefined : { x: activeTab === "business" ? 12 : activeTab === "tech" ? -8 : 0, scale: activeTab === "tech" ? 1.03 : activeTab === "business" ? 0.97 : 1 }}
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  className="cursor-pointer"
                  onClick={() => setActiveTab("tech")}
                >
                  <circle
                    cx="345"
                    cy="140"
                    r="108"
                    fill={`url(#${techGradientId})`}
                    stroke={activeTab === "tech" ? circleFillStops.strokeActive : circleFillStops.strokeDefault}
                    strokeWidth={activeTab === "tech" ? "2" : "1.2"}
                    className="transition-colors duration-300"
                  />
                  <circle cx="345" cy="140" r="82" stroke={circleFillStops.innerRing} strokeDasharray="4 4" strokeWidth="1" />
                </motion.g>

                <motion.g
                  animate={reduceMotion ? undefined : { scale: activeTab === "overlap" ? 1.04 : 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="cursor-pointer"
                  onClick={() => setActiveTab("overlap")}
                >
                  <ellipse cx="270" cy="140" rx="48" ry="76" fill={`url(#${overlapGlowId})`} />
                  <ellipse
                    cx="270"
                    cy="140"
                    rx="46"
                    ry="72"
                    stroke={circleFillStops.strokeActive}
                    strokeWidth={activeTab === "overlap" ? "1.6" : "1"}
                    strokeDasharray={activeTab === "overlap" ? "none" : "3 3"}
                    opacity={activeTab === "overlap" ? "0.7" : "0.3"}
                  />
                </motion.g>

                <g className="pointer-events-none select-none">
                  <text x="145" y="104" textAnchor="middle" fill={circleFillStops.textPrimary} fontSize="15" fontWeight="700" letterSpacing="-0.02em">Business</text>
                  <text x="92" y="130" fill={circleFillStops.textPrimary} fontSize="11" fontWeight="600">AI Lead · Zurich Airport</text>
                  <text x="92" y="150" fill={circleFillStops.textSecondary} fontSize="11" fontWeight="500">$1M+ agency · 1 exit</text>
                  <text x="92" y="169" fill={circleFillStops.textSecondary} fontSize="11" fontWeight="500">St. Gallen · UBS</text>
                </g>

                <g className="pointer-events-none select-none">
                  <text x="395" y="100" textAnchor="middle" fill={circleFillStops.textPrimary} fontSize="15" fontWeight="700" letterSpacing="-0.02em">Tech</text>
                  <text x="334" y="124" fill={circleFillStops.textPrimary} fontSize="13.5" fontWeight="700" letterSpacing="-0.02em">8× hackathon</text>
                  <text x="334" y="143" fill={circleFillStops.textPrimary} fontSize="10.5" fontWeight="600">winner, mostly solo</text>
                  <text x="334" y="162" fill={circleFillStops.textSecondary} fontSize="10.5" fontWeight="500">HackZurich 3rd overall</text>
                </g>

                <g className="pointer-events-none select-none">
                  <rect x="218" y="122" width="104" height="36" rx="7" fill={circleFillStops.badgeBg} stroke={circleFillStops.badgeStroke} strokeWidth="1" />
                  <text x="270" y="136" textAnchor="middle" fill={circleFillStops.badgeTop} fontSize="9" fontWeight="600" letterSpacing="0.02em">{centerTop}</text>
                  <text x="270" y="149" textAnchor="middle" fill={circleFillStops.badgeBottom} fontSize="9.5" fontWeight="600">{centerBottom}</text>
                </g>
              </svg>
            </div>
          </div>

          <div className="mt-5 grid gap-3.5 md:grid-cols-3">
            <div onClick={() => setActiveTab("business")} className={cardClass("business")}>
              <h3 className="text-[16px] font-semibold tracking-tight text-[var(--dossier-ink)]">What I mean by business</h3>
              <div className="mt-4 space-y-4 border-t border-[var(--dossier-line)] pt-4">
                {businessPillars.map((p) => (
                  <div key={p.title}>
                    <p className="text-[24px] font-semibold leading-none tracking-[-0.03em] text-[var(--dossier-ink)]">{p.stat}</p>
                    <p className="mt-1.5 text-[13px] font-semibold leading-snug text-[var(--dossier-ink)]">{p.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div onClick={() => setActiveTab("overlap")} className={cardClass("overlap")}>
              <h3 className="text-[16px] font-semibold tracking-tight text-[var(--dossier-ink)]">{overlapTitle}</h3>
              <div className="mt-4 space-y-4 border-t border-[var(--dossier-line)] pt-4">
                {intersectionPowers.map((p) => (
                  <div key={p.title}>
                    <p className="text-[14px] font-semibold leading-snug text-[var(--dossier-ink)]">{p.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--dossier-body)]">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div onClick={() => setActiveTab("tech")} className={cardClass("tech")}>
              <h3 className="text-[16px] font-semibold tracking-tight text-[var(--dossier-ink)]">What I mean by tech</h3>
              <div className="mt-4 space-y-4 border-t border-[var(--dossier-line)] pt-4">
                {techPillars.map((p) => (
                  <div key={p.title}>
                    <p className="text-[24px] font-semibold leading-none tracking-[-0.03em] text-[var(--dossier-ink)]">{p.stat}</p>
                    <p className="mt-1.5 text-[13px] font-semibold leading-snug text-[var(--dossier-ink)]">{p.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
