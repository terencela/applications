"use client";

import React, { useState, type CSSProperties } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { DossierBackground } from "@/app/components/shared/DossierBackground";
import { SubpageHeader } from "@/app/components/shared/SubpageHeader";
import { LoomVideoFrame } from "@/app/components/shared/LoomVideoFrame";
import { ProductVisual } from "@/app/components/shared/ProductVisual";
import { DossierThemeProvider } from "@/app/lib/dossier-theme";

const EASE_OUT_STRONG = [0.23, 1, 0.32, 1] as const;

const TERENCE_AI_URL = "https://about.terencela.com";

function TerenceAIAskBar() {
  const handleAsk = () => {
    window.location.href = TERENCE_AI_URL;
  };

  return (
    <div className="dossier-terenceai-ask mt-4">
      <label className="dossier-terenceai-ask__field">
        <span className="dossier-terenceai-ask__icon" aria-hidden="true">
          <Search className="h-5 w-5" strokeWidth={2.25} />
          <Sparkles className="dossier-terenceai-ask__sparkle h-3.5 w-3.5" />
        </span>
        <input
          type="text"
          name="terenceai-ask"
          placeholder="Ask TerenceAI anything"
          autoComplete="off"
          onInput={(event) => {
            if (event.currentTarget.value.trim().length > 0) handleAsk();
          }}
          className="dossier-terenceai-ask__input"
        />
      </label>
    </div>
  );
}

type DeploymentStat = {
  value: string;
  label: string;
  sub?: string;
};

type DeploymentExample = {
  title: string;
  subtitle: string;
  challenge: string;
  stats: DeploymentStat[];
  role: string[];
  outcome: string;
  outcomeHighlight: string;
};

type SelectedProject = {
  name: string;
  category: string;
  stage: string;
  accent: string;
  visual: string;
  description: string;
  evidence: string;
  url?: string;
};

const credibilityLogos = [
  "Zurich Airport",
  "UBS",
  "PwC",
  "World Economic Forum",
  "SAP",
  "Forbes",
  "TEDx",
  "HSG",
] as const;

const deployments: DeploymentExample[] = [
  {
    title: "Zurich Airport - Voice AI Agent",
    subtitle: "Voice-agent proof of concept for an operation handling ~85K annual calls; progressed into formal tender.",
    challenge:
      "Regulated environment, multi-stakeholder, trust constraints.",
    stats: [
      { value: "~85K", label: "calls/year" },
      { value: "8 FTE", label: "call center" },
      { value: "Regulated", label: "environment" },
    ],
    role: [
      "Discovery",
      "Use-case prioritisation",
      "Architecture and prototype",
      "Vendor evaluation",
      "Governance",
    ],
    outcomeHighlight: "PoC in two weeks.",
    outcome: "Proof of concept completed; formal tender and vendor assessment followed. Not represented as a production voice deployment.",
  },
  {
    title: "ZRH Insider - Employee App Rebuild",
    subtitle: "Rebuilt the employee-app foundation for a workforce of ~35K, consolidating fragmented code.",
    challenge: "Fragmented Android/iOS slowed delivery.",
    stats: [
      { value: "35K", label: "employees" },
      { value: "2 weeks", label: "solo rebuild" },
      { value: "CHF 200K", label: "external quote saved" },
    ],
    role: [
      "Rebuilt 35K-user app foundation in two weeks",
      "Consolidated 3 codebases into 1 scalable architecture",
      "Transformed into a gamified retention and revenue channel",
    ],
    outcomeHighlight: "Shipped in 2 weeks.",
    outcome: "Replaced a CHF 200K external quote. Now scaling across airport staff.",
  },
  {
    title: "Leistera - AI Operating System for Engineering Firms",
    subtitle: "Custom agent harness and autonomous workflows for Swiss AEC offices.",
    challenge: "Scattered project archives, manual proposal drafting, strict norm citations.",
    stats: [
      { value: "~98%", label: "benchmark accuracy" },
      { value: "30h to 3h", label: "per proposal" },
    ],
    role: [
      "Built custom agent harness, OCR + hybrid RAG pipeline",
      "Optimized latency, cost, and page-level citation grounding",
      "Live client pilot and production rollout via leistera.com",
    ],
    outcomeHighlight: "Live in production.",
    outcome: "98% benchmark accuracy on real engineering corpora.",
  },
];

const selectedProjects: SelectedProject[] = [
  {
    name: "PrivacyLayer",
    category: "AI infrastructure",
    stage: "Live",
    accent: "green",
    visual: "privacy",
    description: "Browser-side PII stripping before prompts reach any model. Zero bytes to any server.",
    evidence: "Live product with Chrome extension",
    url: "https://privacy.terencela.com",
  },
  {
    name: "Engineering Office OS",
    category: "Enterprise AI",
    stage: "In delivery",
    accent: "blue",
    visual: "knowledge",
    description: "RAG + OCR pipeline connecting project history, decisions and expertise across offices.",
    evidence: "Vertical system designed",
    url: "https://leistera.com",
  },
  {
    name: "Vibe Translator",
    category: "Human intelligence",
    stage: "Building",
    accent: "violet",
    visual: "messages",
    description: "Context layer decoding tone, personality and culture before generating responses.",
    evidence: "Interactive product prototype",
    url: "https://vibes.terencela.com/v3",
  },
  {
    name: "AirCompanion",
    category: "Travel",
    stage: "Venture",
    accent: "cyan",
    visual: "travel",
    description: "Contextual AI companion for the full airport journey. Real-time, location-aware.",
    evidence: "Product system designed",
    url: "https://app.aircompanion.app",
  },
  {
    name: "Asia Bridge",
    category: "Cultural intelligence",
    stage: "Concept",
    accent: "red",
    visual: "culture",
    description: "Communication rules and social nuances of Asian cultures. Duolingo meets Grammarly.",
    evidence: "Product thesis developed",
    url: "https://asia.terencela.com",
  },
  {
    name: "Rehearse",
    category: "Simulation",
    stage: "Live",
    accent: "coral",
    visual: "rehearse",
    description: "AI role-play for sales, negotiations and difficult conversations. Real-time feedback.",
    evidence: "Interactive rehearsal flow",
    url: "https://rehearse-roleplay.vercel.app",
  },
  {
    name: "Treasure",
    category: "Voice AI",
    stage: "Testing",
    accent: "amber",
    visual: "voice",
    description: "Voice AI that captures family stories and preserves them across generations.",
    evidence: "Voice-first experience built",
    url: "https://treasures-bowl.vercel.app",
  },
];

const accentStyles = {
  "--hero-accent": "#10a37f",
} as CSSProperties;

const businessPillars = [
  {
    title: "Executive & Board Alignment",
    detail: "Management Support at Chairman's Office (UBS/Credit Suisse), WEF delegate briefing, Interim CAIO.",
  },
  {
    title: "Governance & Swiss Compliance",
    detail: "Leading AI deployment at Zurich Airport (32M+ passengers/yr). Navigating nDSG, works councils & enterprise tenders.",
  },
  {
    title: "Commercial & Founder Track Record",
    detail: "1 startup exit (NeverAlone.ch), $1M+ client revenue generated, M.A. Business Innovation (HSG), Forbes 30u30.",
  },
];

const techPillars = [
  {
    title: "Production Agent Harnesses",
    detail: "Custom agent loops, hybrid RAG, eval pipelines, tool-calling & autonomous execution. GPT-3 since 2020.",
  },
  {
    title: "Full-Stack Velocity",
    detail: "Rebuilt 35K-user app (ZRH Insider) in 2 weeks (saved CHF 200K quote). Built & shipped 20+ functional AI products.",
  },
  {
    title: "Competitive Engineering Rigor",
    detail: "8× Hackathon Winner, including 3rd prize overall at HackZurich (1,600 engineers). Deep voice AI & low-latency streaming.",
  },
];

const intersectionPowers = [
  {
    title: "C-Suite to Codebase in 1 Step",
    desc: "Sit in the steering committee meeting on Monday, architect and ship the production pilot by Friday.",
  },
  {
    title: "Tenders That Actually Go Live",
    desc: "Unblock enterprise legal, security, and procurement instead of watching frontier models stall in review.",
  },
  {
    title: "Native Swiss/DACH Authority",
    desc: "Native in German, Swiss German, English & Cantonese. Local cultural fluency with global technical standards.",
  },
];

function BusinessTechIntersection({ reduceMotion }: { reduceMotion: boolean | null }) {
  const [activeTab, setActiveTab] = useState<"overlap" | "business" | "tech">("overlap");

  return (
    <section className="dossier-section relative z-[2] !pt-4 !pb-10" id="business-tech-overlap">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#10a37f]">
              The Rare Combination
            </p>
            <h2 className="mt-2 text-[clamp(28px,3.8vw,44px)] font-semibold tracking-[-0.04em] text-[var(--dossier-ink)]">
              Business leader. Hands-on engineer.
            </h2>
            <p className="mt-2 max-w-[62ch] text-[14px] leading-relaxed text-[var(--dossier-body)] md:text-[15px]">
              Most enterprise executives can&apos;t write production code. Most engineers freeze when procurement, works councils, or C-suite sponsors demand governance. Here is what I actually mean by both—and why the overlap unlocks OpenAI&apos;s biggest enterprise accounts.
            </p>
          </div>

          <div className="inline-flex rounded-full border border-[var(--dossier-line-strong)] bg-[var(--dossier-panel)] p-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("overlap")}
              className={`rounded-full px-3 py-1.5 font-medium transition-all duration-200 ${
                activeTab === "overlap"
                  ? "bg-[#10a37f] text-white shadow-sm"
                  : "text-[var(--dossier-muted)] hover:text-[var(--dossier-ink)]"
              }`}
            >
              The Overlap
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("business")}
              className={`rounded-full px-3 py-1.5 font-medium transition-all duration-200 ${
                activeTab === "business"
                  ? "bg-[#10a37f] text-white shadow-sm"
                  : "text-[var(--dossier-muted)] hover:text-[var(--dossier-ink)]"
              }`}
            >
              Business
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("tech")}
              className={`rounded-full px-3 py-1.5 font-medium transition-all duration-200 ${
                activeTab === "tech"
                  ? "bg-[#10a37f] text-white shadow-sm"
                  : "text-[var(--dossier-muted)] hover:text-[var(--dossier-ink)]"
              }`}
            >
              Tech
            </button>
          </div>
        </div>

        {/* Visual Venn Graphic */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-6 md:p-10">
          <div className="relative mx-auto flex w-full max-w-[880px] flex-col items-center justify-center py-6 md:py-10">
            {/* SVG Interactive Animated Two-Circle Venn */}
            <div className="relative aspect-[16/10] w-full max-w-[700px] select-none sm:aspect-[16/9]">
              <svg
                viewBox="0 0 600 360"
                className="h-full w-full drop-shadow-sm"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Left circle gradient (Business / ink / deep slate) */}
                  <linearGradient id="businessGradient" x1="120" y1="60" x2="300" y2="300" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1e222d" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#0f1117" stopOpacity="0.98" />
                  </linearGradient>

                  {/* Right circle gradient (Tech / elevated contrast emerald / light) */}
                  <linearGradient id="techGradient" x1="300" y1="60" x2="480" y2="300" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#15362a" stopOpacity="0.92" />
                    <stop offset="100%" stopColor="#0b1e17" stopOpacity="0.96" />
                  </linearGradient>

                  {/* Center overlap glow */}
                  <radialGradient id="overlapGlow" cx="300" cy="180" r="110" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#10a37f" stopOpacity="0.35" />
                    <stop offset="85%" stopColor="#10a37f" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#10a37f" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Left Circle: Business */}
                <motion.g
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          x: activeTab === "tech" ? -15 : activeTab === "business" ? 10 : 0,
                          scale: activeTab === "business" ? 1.03 : activeTab === "tech" ? 0.97 : 1,
                        }
                  }
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  className="cursor-pointer"
                  onClick={() => setActiveTab("business")}
                >
                  <circle
                    cx="225"
                    cy="180"
                    r="135"
                    fill="url(#businessGradient)"
                    stroke={activeTab === "business" ? "#10a37f" : "rgba(255, 255, 255, 0.16)"}
                    strokeWidth={activeTab === "business" ? "2.5" : "1.5"}
                    className="transition-colors duration-300"
                  />
                  {/* Subtle inner ring */}
                  <circle
                    cx="225"
                    cy="180"
                    r="105"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                </motion.g>

                {/* Right Circle: Tech */}
                <motion.g
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          x: activeTab === "business" ? 15 : activeTab === "tech" ? -10 : 0,
                          scale: activeTab === "tech" ? 1.03 : activeTab === "business" ? 0.97 : 1,
                        }
                  }
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  className="cursor-pointer"
                  onClick={() => setActiveTab("tech")}
                >
                  <circle
                    cx="375"
                    cy="180"
                    r="135"
                    fill="url(#techGradient)"
                    stroke={activeTab === "tech" ? "#10a37f" : "rgba(16, 163, 127, 0.35)"}
                    strokeWidth={activeTab === "tech" ? "2.5" : "1.5"}
                    className="transition-colors duration-300"
                  />
                  <circle
                    cx="375"
                    cy="180"
                    r="105"
                    stroke="rgba(16, 163, 127, 0.12)"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                </motion.g>

                {/* Overlap Intersection Zone */}
                <motion.g
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scale: activeTab === "overlap" ? 1.04 : 1,
                        }
                  }
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="cursor-pointer"
                  onClick={() => setActiveTab("overlap")}
                >
                  {/* Overlap ellipse glow */}
                  <ellipse
                    cx="300"
                    cy="180"
                    rx="60"
                    ry="95"
                    fill="url(#overlapGlow)"
                  />
                  <ellipse
                    cx="300"
                    cy="180"
                    rx="58"
                    ry="90"
                    stroke="#10a37f"
                    strokeWidth={activeTab === "overlap" ? "2" : "1"}
                    strokeDasharray={activeTab === "overlap" ? "none" : "3 3"}
                    opacity={activeTab === "overlap" ? "0.9" : "0.5"}
                  />
                </motion.g>

                {/* Text and Labels rendered cleanly inside SVG */}
                {/* Left Label */}
                <g className="pointer-events-none select-none">
                  <text
                    x="165"
                    y="142"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="18"
                    fontWeight="700"
                    letterSpacing="-0.02em"
                  >
                    BUSINESS
                  </text>
                  <text
                    x="165"
                    y="166"
                    textAnchor="middle"
                    fill="#cbd5e1"
                    fontSize="11"
                    fontWeight="500"
                  >
                    Chairman&apos;s Office · HSG
                  </text>
                  <text
                    x="165"
                    y="185"
                    textAnchor="middle"
                    fill="#cbd5e1"
                    fontSize="11"
                    fontWeight="500"
                  >
                    Zurich Airport AI Lead
                  </text>
                  <text
                    x="165"
                    y="204"
                    textAnchor="middle"
                    fill="#cbd5e1"
                    fontSize="11"
                    fontWeight="500"
                  >
                    $1M+ Client Rev · 1 Exit
                  </text>
                </g>

                {/* Right Label */}
                <g className="pointer-events-none select-none">
                  <text
                    x="435"
                    y="142"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="18"
                    fontWeight="700"
                    letterSpacing="-0.02em"
                  >
                    TECH
                  </text>
                  <text
                    x="435"
                    y="166"
                    textAnchor="middle"
                    fill="#d1fae5"
                    fontSize="11"
                    fontWeight="500"
                  >
                    GPT-3 Since 2020
                  </text>
                  <text
                    x="435"
                    y="185"
                    textAnchor="middle"
                    fill="#d1fae5"
                    fontSize="11"
                    fontWeight="500"
                  >
                    20+ Shipped AI Apps
                  </text>
                  <text
                    x="435"
                    y="204"
                    textAnchor="middle"
                    fill="#d1fae5"
                    fontSize="11"
                    fontWeight="500"
                  >
                    8× Hackathon Winner
                  </text>
                </g>

                {/* Overlap Center Label */}
                <g className="pointer-events-none select-none">
                  <rect
                    x="245"
                    y="160"
                    width="110"
                    height="40"
                    rx="8"
                    fill="#0a0b0f"
                    fillOpacity="0.85"
                    stroke="#10a37f"
                    strokeWidth="1.2"
                  />
                  <text
                    x="300"
                    y="178"
                    textAnchor="middle"
                    fill="#10a37f"
                    fontSize="10"
                    fontWeight="700"
                    letterSpacing="0.06em"
                  >
                    OPENAI FDE
                  </text>
                  <text
                    x="300"
                    y="192"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9.5"
                    fontWeight="600"
                  >
                    Ships &amp; Aligns
                  </text>
                </g>
              </svg>
            </div>

            <p className="mt-4 text-center text-xs text-[var(--dossier-muted)]">
              Click any circle or toggle above to explore the detailed breakdown.
            </p>
          </div>

          {/* Cards Breakdown beneath the Circles */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {/* Business Column */}
            <div
              onClick={() => setActiveTab("business")}
              className={`cursor-pointer rounded-xl border p-5 transition-all duration-200 ${
                activeTab === "business"
                  ? "border-[#10a37f] bg-[var(--dossier-dark)] ring-1 ring-[#10a37f]"
                  : "border-[var(--dossier-line)] bg-[var(--dossier-panel)] hover:border-[var(--dossier-line-strong)]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--dossier-subtle)]">
                  Circle 1
                </span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-[var(--dossier-muted)]">
                  Enterprise Reality
                </span>
              </div>
              <h3 className="mt-2 text-base font-semibold tracking-tight text-[var(--dossier-ink)]">
                What I mean by Business
              </h3>
              <p className="mt-1 text-xs text-[var(--dossier-muted)]">
                Not slide deck decks or advisory slogans—real operating ownership.
              </p>
              <ul className="mt-4 space-y-3 border-t border-[var(--dossier-line)] pt-3 text-xs leading-relaxed text-[var(--dossier-body)]">
                {businessPillars.map((p) => (
                  <li key={p.title}>
                    <strong className="text-[var(--dossier-ink)]">{p.title}:</strong> {p.detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Overlap Column */}
            <div
              onClick={() => setActiveTab("overlap")}
              className={`cursor-pointer rounded-xl border p-5 transition-all duration-200 ${
                activeTab === "overlap"
                  ? "border-[#10a37f] bg-[var(--dossier-dark)] ring-1 ring-[#10a37f]"
                  : "border-[var(--dossier-line)] bg-[var(--dossier-panel)] hover:border-[var(--dossier-line-strong)]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#10a37f]">
                  Intersection
                </span>
                <span className="rounded-full bg-[#10a37f]/10 px-2 py-0.5 text-[10px] font-semibold text-[#10a37f]">
                  Why It&apos;s Rare
                </span>
              </div>
              <h3 className="mt-2 text-base font-semibold tracking-tight text-[var(--dossier-ink)]">
                The Forward Deployed Advantage
              </h3>
              <p className="mt-1 text-xs text-[var(--dossier-muted)]">
                Why Swiss enterprise pilots stall without this exact combination.
              </p>
              <ul className="mt-4 space-y-3 border-t border-[var(--dossier-line)] pt-3 text-xs leading-relaxed text-[var(--dossier-body)]">
                {intersectionPowers.map((p) => (
                  <li key={p.title}>
                    <strong className="text-[var(--dossier-ink)]">{p.title}:</strong> {p.desc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Column */}
            <div
              onClick={() => setActiveTab("tech")}
              className={`cursor-pointer rounded-xl border p-5 transition-all duration-200 ${
                activeTab === "tech"
                  ? "border-[#10a37f] bg-[var(--dossier-dark)] ring-1 ring-[#10a37f]"
                  : "border-[var(--dossier-line)] bg-[var(--dossier-panel)] hover:border-[var(--dossier-line-strong)]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--dossier-subtle)]">
                  Circle 2
                </span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-[var(--dossier-muted)]">
                  Production Depth
                </span>
              </div>
              <h3 className="mt-2 text-base font-semibold tracking-tight text-[var(--dossier-ink)]">
                What I mean by Tech
              </h3>
              <p className="mt-1 text-xs text-[var(--dossier-muted)]">
                Not ChatGPT prompt wrappers—hard engineering that runs reliably.
              </p>
              <ul className="mt-4 space-y-3 border-t border-[var(--dossier-line)] pt-3 text-xs leading-relaxed text-[var(--dossier-body)]">
                {techPillars.map((p) => (
                  <li key={p.title}>
                    <strong className="text-[var(--dossier-ink)]">{p.title}:</strong> {p.detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function OpenAIApplicationPage() {
  const reduceMotion = useReducedMotion();

  return (
    <DossierThemeProvider>
      <main
        className="dossier-page relative min-h-[100dvh] overflow-x-hidden"
        style={accentStyles}
      >
        <DossierBackground accentColor="#10a37f" />
        <SubpageHeader
          companyName="OpenAI"
          roleTitle="Forward Deployed Engineer (Zurich)"
          accentColor="#10a37f"
        />

        <section className="dossier-openai-hero relative z-[2] flex min-h-[calc(100dvh-57px)] flex-col md:min-h-[calc(100dvh-57px)]">
          <div className="dossier-openai-hero__main mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-start px-4 py-5 md:justify-center md:px-8 md:py-14 lg:py-16">
            <div className="flex flex-col gap-6 md:grid md:grid-cols-[minmax(0,1fr)_minmax(200px,260px)] md:items-center md:gap-x-14 md:gap-y-0 lg:gap-x-20">
              <aside className="dossier-openai-hero__photo w-full max-w-[min(11.5rem,42vw)] shrink-0 md:col-start-2 md:row-start-1 md:mx-0 md:max-w-[220px] lg:max-w-[260px]">
                <div className="dossier-profile-frame aspect-[4/5] w-full">
                  <Image
                    src="/images/terence-la-profile.png"
                    alt="Terence La profile"
                    fill
                    sizes="(max-width: 768px) 172px, 260px"
                    className="dossier-profile-photo object-cover object-top"
                    priority
                  />
                  <div className="dossier-profile-caption absolute inset-x-0 bottom-0 z-[2] px-5 pb-5 pt-16">
                    <p className="text-sm font-medium text-white">Terence La</p>
                    <p className="text-xs text-white/80">AI Lead · Zurich Airport</p>
                  </div>
                </div>
              </aside>

              <div className="max-w-[760px] md:col-start-1 md:row-start-1">
                <h1 className="dossier-hero-title max-w-[18ch]" style={{ fontSize: "clamp(30px, 8.2vw, 64px)" }}>
                  Enterprise AI leader, builder and founder.
                </h1>
                <p className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-[var(--dossier-body)] md:mt-10 md:text-[17px] md:leading-[1.65]">
                  Enterprise AI Lead at Zurich Airport (32M+ passengers/yr). 20+ functional AI products built, GPT-3 builder since 2020, 8× hackathon winner, and 1 startup exit. Bridging C-suite strategy, rigorous enterprise governance, and rapid full-stack engineering.
                </p>
                <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:mt-10">
                  <a
                    href="https://about.terencela.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dossier-button-primary dossier-cta-accent dossier-pressable inline-flex"
                  >
                    Chat with TerenceAI
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="https://xp.terencela.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13px] text-[var(--dossier-muted)] transition-colors duration-200 hover:text-[var(--dossier-ink)]"
                  >
                    Discover TerenceXP
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="dossier-openai-hero__logos mt-auto shrink-0 border-t border-[var(--dossier-line)]">
            <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-8 md:py-8">
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                {credibilityLogos.map((logo) => (
                  <div
                    key={logo}
                    className="rounded-full border border-[var(--dossier-line)] px-3.5 py-1.5 text-[13px] font-normal tracking-[-0.005em] text-[var(--dossier-subtle)]"
                  >
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="dossier-section relative z-[2] pt-6">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <h2 className="text-[clamp(28px,3.5vw,42px)] font-semibold tracking-[-0.04em] text-[var(--dossier-ink)]">
              90-second walkthrough
            </h2>
            <div className="mt-4">
              <LoomVideoFrame
                companyName="OpenAI"
                roleTitle="Forward Deployed Engineer (Zurich)"
                loomUrl="https://www.loom.com/share/054ec870f2c448928570797160ccc6b0"
                videoTitle="Quick Introduction"
                videoSubtitle="Who I am in 90 seconds."
                playInModal
                accentColor="#10a37f"
                showChapters={false}
              />
              <TerenceAIAskBar />
            </div>
          </div>
        </section>

        <section className="dossier-section relative z-[2] !pb-5">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <motion.h2
              className="text-[clamp(28px,3.7vw,44px)] font-semibold tracking-[-0.04em] text-[var(--dossier-ink)]"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_OUT_STRONG }}
            >
              Three hands-on engineering engagements
            </motion.h2>

            <motion.article
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.6, ease: EASE_OUT_STRONG }}
              className="mt-4 rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)]"
            >
              <div className="p-4 md:p-5">
                <h3 className="text-[clamp(18px,2.2vw,24px)] font-semibold tracking-[-0.02em] text-[var(--dossier-ink)]">
                  {deployments[0].title}
                </h3>
                <p className="mt-0.5 max-w-[55ch] text-[12px] leading-snug text-[var(--dossier-muted)]">
                  {deployments[0].subtitle}
                </p>

                <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1">
                  {deployments[0].stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: EASE_OUT_STRONG }}
                    >
                      <p className="text-base font-semibold tracking-tight text-[var(--dossier-ink)]">
                        {stat.value}
                      </p>
                      <p className="text-[10px] text-[var(--dossier-muted)]">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-3 grid gap-2.5 border-t border-[var(--dossier-line)] pt-3 sm:grid-cols-2 sm:gap-4">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--dossier-subtle)]">
                      My role
                    </p>
                    <p className="mt-1 text-[12px] leading-snug text-[var(--dossier-body)]">
                      {deployments[0].role.join(" · ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--dossier-subtle)]">
                      Outcome
                    </p>
                    <p className="mt-1 text-[12px] leading-snug text-[var(--dossier-body)]">
                      <span className="font-semibold text-[var(--dossier-ink)]">
                        {deployments[0].outcomeHighlight}
                      </span>{" "}
                      {deployments[0].outcome}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>

            <div className="mt-2.5 grid gap-2.5 md:grid-cols-2">
              {deployments.slice(1).map((deployment, idx) => (
                <motion.article
                  key={deployment.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE_OUT_STRONG }}
                  className="rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)]"
                >
                  <div className="p-3.5">
                    <h3 className="text-[15px] font-semibold tracking-tight text-[var(--dossier-ink)]">
                      {deployment.title}
                    </h3>
                    <p className="mt-0.5 text-[12px] leading-snug text-[var(--dossier-muted)]">
                      {deployment.subtitle}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      {deployment.stats.map((stat) => (
                        <div key={stat.label}>
                          <p className="text-sm font-semibold tracking-tight text-[var(--dossier-ink)]">
                            {stat.value}
                          </p>
                          <p className="text-[10px] text-[var(--dossier-muted)]">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2.5 grid gap-2 border-t border-[var(--dossier-line)] pt-2.5 sm:grid-cols-2 sm:gap-3">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--dossier-subtle)]">
                          My role
                        </p>
                        <p className="mt-0.5 text-[12px] leading-snug text-[var(--dossier-body)]">
                          {deployment.role.join(" · ")}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--dossier-subtle)]">
                          Outcome
                        </p>
                        <p className="mt-0.5 text-[12px] leading-snug text-[var(--dossier-body)]">
                          <span className="font-semibold text-[var(--dossier-ink)]">
                            {deployment.outcomeHighlight}
                          </span>{" "}
                          {deployment.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <BusinessTechIntersection reduceMotion={reduceMotion} />

        <section className="dossier-section-tight dossier-projects-compact-section relative z-[2] !pt-2">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <h2 className="text-[clamp(28px,3.5vw,42px)] font-semibold tracking-[-0.04em] text-[var(--dossier-ink)]">
              Selected AI applications and working prototypes
            </h2>
            <p className="mt-2 text-sm text-[var(--dossier-muted)]">
              Personal products. AI infrastructure, voice, human intelligence.
            </p>
            <div className="project-grid mt-6">
              {selectedProjects.map((project, index) => (
                <div
                  key={project.name}
                  className={`project-card dossier-project-card-compact accent-${project.accent}`}
                  style={{ cursor: "default" }}
                >
                  <div className="card-topline">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span className="stage-badge">{project.stage}</span>
                  </div>
                  <ProductVisual type={project.visual} />
                  <div className="card-copy">
                    <small>{project.category}</small>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="evidence">
                      <span>Evidence</span>
                      <b>{project.evidence}</b>
                    </div>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--accent)] transition-opacity duration-150 hover:opacity-80"
                      >
                        View project
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dossier-section relative z-[2] pb-20 pt-8">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <div className="border border-[var(--dossier-line-strong)] bg-[var(--dossier-panel)] p-7 md:p-9">
              <h2 className="text-[clamp(30px,4vw,48px)] font-semibold tracking-[-0.04em] text-[var(--dossier-ink)]">
                I&apos;d rather show you than tell you.
              </h2>
              <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-[var(--dossier-muted)] md:text-[15px]">
                30 minutes. I&apos;ll show you the code, the prototypes, delivery decisions and failure modes—and discuss how field feedback can improve OpenAI products.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/terencela"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dossier-button-primary dossier-cta-accent dossier-pressable inline-flex"
                >
                  Get in touch
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="https://xp.terencela.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] text-[var(--dossier-muted)] transition-colors duration-200 hover:text-[var(--dossier-ink)]"
                >
                  See TerenceXP
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </DossierThemeProvider>
  );
}
