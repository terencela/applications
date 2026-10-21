"use client";

import React, { useId, useState } from "react";
import { motion } from "framer-motion";

export type StatPillar = { stat: string; title: string; detail: string };
export type IntersectionPower = { title: string; desc: string };

export const businessPillars: StatPillar[] = [
  {
    stat: "32M+",
    title: "AI Lead at Zurich Airport",
    detail: "Leading AI deployment at the airport. Swiss data rules, works councils and procurement are part of the job.",
  },
  {
    stat: "$1M+",
    title: "Agency founder, with 1 exit",
    detail: "Founded and ran an AI agency that generated over $1M for clients. Forbes 30 under 30.",
  },
  {
    stat: "St. Gallen",
    title: "M.A. in Business Innovation, University of St. Gallen",
    detail: "The 6th best business school in Europe. Earlier in my career: UBS and Credit Suisse, and Davos with the World Economic Forum.",
  },
];

export const techPillars: StatPillar[] = [
  {
    stat: "8×",
    title: "Hackathon winner, mostly solo",
    detail: "Including 3rd overall at HackZurich against 1,600 engineers. I work out how it is judged, then ship a working product in 48 hours.",
  },
  {
    stat: "20+",
    title: "AI products built. GPT-3 since 2020.",
    detail: "Agent loops, hybrid RAG and evals, running in Leistera, PrivacyLayer and Rehearse.",
  },
  {
    stat: "2 weeks",
    title: "Rebuilt the app for 35,000 staff, solo",
    detail: "ZRH Insider. It replaced a CHF 200K external quote. Plus voice AI in live airport operations.",
  },
];

type BusinessTechIntersectionProps = {
  reduceMotion: boolean | null;
  accent: string;
  accentSoft: string;
  techGradient: [string, string];
  intro: string;
  centerTop: string;
  centerBottom: string;
  overlapTitle: string;
  overlapSubtitle: string;
  intersectionPowers: IntersectionPower[];
};

export function BusinessTechIntersection({
  reduceMotion,
  accent,
  accentSoft,
  techGradient,
  intro,
  centerTop,
  centerBottom,
  overlapTitle,
  overlapSubtitle,
  intersectionPowers,
}: BusinessTechIntersectionProps) {
  const [activeTab, setActiveTab] = useState<"overlap" | "business" | "tech">("overlap");
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const businessGradientId = `businessGradient-${uid}`;
  const techGradientId = `techGradient-${uid}`;
  const overlapGlowId = `overlapGlow-${uid}`;

  const tabClass = (tab: typeof activeTab) =>
    `rounded-full px-3 py-1.5 font-medium transition-all duration-200 ${
      activeTab === tab ? "text-white shadow-sm" : "text-[var(--dossier-muted)] hover:text-[var(--dossier-ink)]"
    }`;
  const tabStyle = (tab: typeof activeTab) =>
    activeTab === tab ? { backgroundColor: accent } : undefined;
  const cardClass = (tab: typeof activeTab) =>
    `cursor-pointer rounded-xl border bg-[var(--dossier-panel)] p-4.5 transition-all duration-200 ${
      activeTab === tab ? "" : "border-[var(--dossier-line)] hover:border-[var(--dossier-line-strong)]"
    }`;
  const cardStyle = (tab: typeof activeTab) =>
    activeTab === tab ? { borderColor: accent, boxShadow: `0 0 0 1px ${accent}` } : undefined;

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
              <svg viewBox="0 0 540 280" className="h-full w-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id={businessGradientId} x1="100" y1="40" x2="280" y2="240" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1e222d" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#0f1117" stopOpacity="0.98" />
                  </linearGradient>
                  <linearGradient id={techGradientId} x1="260" y1="40" x2="440" y2="240" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor={techGradient[0]} stopOpacity="0.92" />
                    <stop offset="100%" stopColor={techGradient[1]} stopOpacity="0.96" />
                  </linearGradient>
                  <radialGradient id={overlapGlowId} cx="270" cy="140" r="90" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
                    <stop offset="85%" stopColor={accent} stopOpacity="0.08" />
                    <stop offset="100%" stopColor={accent} stopOpacity="0" />
                  </radialGradient>
                </defs>

                <motion.g
                  animate={reduceMotion ? undefined : { x: activeTab === "tech" ? -12 : activeTab === "business" ? 8 : 0, scale: activeTab === "business" ? 1.03 : activeTab === "tech" ? 0.97 : 1 }}
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  className="cursor-pointer"
                  onClick={() => setActiveTab("business")}
                >
                  <circle cx="195" cy="140" r="108" fill={`url(#${businessGradientId})`} stroke={activeTab === "business" ? accent : "rgba(255, 255, 255, 0.16)"} strokeWidth={activeTab === "business" ? "2.5" : "1.5"} className="transition-colors duration-300" />
                  <circle cx="195" cy="140" r="82" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="4 4" strokeWidth="1" />
                </motion.g>

                <motion.g
                  animate={reduceMotion ? undefined : { x: activeTab === "business" ? 12 : activeTab === "tech" ? -8 : 0, scale: activeTab === "tech" ? 1.03 : activeTab === "business" ? 0.97 : 1 }}
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  className="cursor-pointer"
                  onClick={() => setActiveTab("tech")}
                >
                  <circle cx="345" cy="140" r="108" fill={`url(#${techGradientId})`} stroke={activeTab === "tech" ? accent : `${accent}59`} strokeWidth={activeTab === "tech" ? "2.5" : "1.5"} className="transition-colors duration-300" />
                  <circle cx="345" cy="140" r="82" stroke={`${accent}1f`} strokeDasharray="4 4" strokeWidth="1" />
                </motion.g>

                <motion.g
                  animate={reduceMotion ? undefined : { scale: activeTab === "overlap" ? 1.04 : 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="cursor-pointer"
                  onClick={() => setActiveTab("overlap")}
                >
                  <ellipse cx="270" cy="140" rx="48" ry="76" fill={`url(#${overlapGlowId})`} />
                  <ellipse cx="270" cy="140" rx="46" ry="72" stroke={accent} strokeWidth={activeTab === "overlap" ? "2" : "1"} strokeDasharray={activeTab === "overlap" ? "none" : "3 3"} opacity={activeTab === "overlap" ? "0.9" : "0.5"} />
                </motion.g>

                <g className="pointer-events-none select-none">
                  <text x="145" y="104" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="700" letterSpacing="-0.02em">BUSINESS</text>
                  <text x="92" y="130" fill="#ffffff" fontSize="11" fontWeight="600">AI Lead · Zurich Airport</text>
                  <text x="92" y="150" fill="#cbd5e1" fontSize="11" fontWeight="500">$1M+ agency · 1 exit</text>
                  <text x="92" y="169" fill="#cbd5e1" fontSize="11" fontWeight="500">St. Gallen · UBS</text>
                </g>

                <g className="pointer-events-none select-none">
                  <text x="395" y="100" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="700" letterSpacing="-0.02em">TECH</text>
                  <text x="334" y="124" fill="#ffffff" fontSize="13.5" fontWeight="800" letterSpacing="-0.02em">8× hackathon</text>
                  <text x="334" y="143" fill={accentSoft} fontSize="10.5" fontWeight="600">winner, mostly solo</text>
                  <text x="334" y="162" fill="#ffffff" fillOpacity="0.85" fontSize="10.5" fontWeight="500">HackZurich 3rd overall</text>
                </g>

                <g className="pointer-events-none select-none">
                  <rect x="218" y="122" width="104" height="36" rx="7" fill="#0a0b0f" fillOpacity="0.88" stroke={accent} strokeWidth="1.2" />
                  <text x="270" y="136" textAnchor="middle" fill={accent} fontSize="9.5" fontWeight="700" letterSpacing="0.06em">{centerTop}</text>
                  <text x="270" y="149" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="600">{centerBottom}</text>
                </g>
              </svg>
            </div>
          </div>

          <div className="mt-5 grid gap-3.5 md:grid-cols-3">
            <div onClick={() => setActiveTab("business")} className={cardClass("business")} style={cardStyle("business")}>
              <h3 className="text-[16px] font-semibold tracking-tight text-[var(--dossier-ink)]">What I mean by business</h3>
              <p className="mt-1 text-xs text-[var(--dossier-muted)]">Running AI inside a real enterprise, and running my own company.</p>
              <div className="mt-4 space-y-5 border-t border-[var(--dossier-line)] pt-4">
                {businessPillars.map((p) => (
                  <div key={p.title}>
                    <p className="text-[26px] font-semibold leading-none tracking-[-0.03em] text-[var(--dossier-ink)]">{p.stat}</p>
                    <p className="mt-1.5 text-[13px] font-semibold leading-snug text-[var(--dossier-ink)]">{p.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--dossier-body)]">{p.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div onClick={() => setActiveTab("overlap")} className={cardClass("overlap")} style={cardStyle("overlap")}>
              <h3 className="text-[16px] font-semibold tracking-tight text-[var(--dossier-ink)]">{overlapTitle}</h3>
              <p className="mt-1 text-xs text-[var(--dossier-muted)]">{overlapSubtitle}</p>
              <div className="mt-4 space-y-4 border-t border-[var(--dossier-line)] pt-4">
                {intersectionPowers.map((p) => (
                  <div key={p.title}>
                    <p className="text-[14px] font-semibold leading-snug text-[var(--dossier-ink)]">{p.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--dossier-body)]">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div onClick={() => setActiveTab("tech")} className={cardClass("tech")} style={cardStyle("tech")}>
              <h3 className="text-[16px] font-semibold tracking-tight text-[var(--dossier-ink)]">What I mean by tech</h3>
              <p className="mt-1 text-xs text-[var(--dossier-muted)]">Code that runs in production, built fast.</p>
              <div className="mt-4 space-y-5 border-t border-[var(--dossier-line)] pt-4">
                {techPillars.map((p) => (
                  <div key={p.title}>
                    <p className="text-[26px] font-semibold leading-none tracking-[-0.03em]" style={{ color: accent }}>{p.stat}</p>
                    <p className="mt-1.5 text-[13px] font-semibold leading-snug text-[var(--dossier-ink)]">{p.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--dossier-body)]">{p.detail}</p>
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
