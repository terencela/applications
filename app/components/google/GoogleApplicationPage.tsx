"use client";

import React, { useState, type CSSProperties } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  ExternalLink,
  Sparkles,
  Terminal,
  Users,
  Workflow,
} from "lucide-react";
import { DossierBackground } from "@/app/components/shared/DossierBackground";
import { SubpageHeader } from "@/app/components/shared/SubpageHeader";
import { DossierThemeProvider } from "@/app/lib/dossier-theme";
import { GoogleAgentInteractiveDemo } from "@/app/components/google/GoogleAgentInteractiveDemo";
import { GoogleAgentArchitecture } from "@/app/components/google/GoogleAgentArchitecture";

const ACCENT = "#4285f4";

type DeploymentStat = {
  value: string;
  label: string;
};

type DeploymentExample = {
  title: string;
  subtitle: string;
  statusTag: string;
  challenge: string;
  stats: DeploymentStat[];
  technicalContribution: string[];
  architecture: string;
  outcomeHighlight: string;
  outcome: string;
};

type CompactProject = {
  name: string;
  category: string;
  stage: string;
  stageColor: string;
  description: string;
  evidence: string;
  url?: string;
};

const credibilityBadges = [
  "AI Lead @ Zurich Airport",
  "Founder with an Exit",
  "Forbes 30 Under 30",
  "8× Hackathon Winner",
  "2× TEDx Speaker",
  "M.A. HSG",
  "PwC & Credit Suisse Alumni",
] as const;

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
    title: "Zurich Airport — Voice AI Operations Agent",
    subtitle: "Enterprise voice AI handling ~85K annual customer calls. Concept through formal RFP tender.",
    statusTag: "Internal Prototype → Enterprise Tender Preparation",
    challenge: "High-noise acoustic environment, multi-dialect German (Swiss German / High German / FR / EN), zero tolerance for hallucinated flight info under airport governance.",
    stats: [
      { value: "~85K", label: "annual calls" },
      { value: "8 FTE", label: "call center ops" },
      { value: "<800ms", label: "streaming audio latency" },
      { value: "nDSG / Zero-PII", label: "Swiss sovereign boundary" },
    ],
    technicalContribution: [
      "Discovered operational friction across airport call centers and ground handling staff",
      "Architected WebRTC / WebSocket streaming prototype with local Zurich dialect token handling",
      "Conducted automated offline evaluation on 85K historical anonymized transcript logs",
      "Authored security boundary and technical specification for formal multi-vendor enterprise tender",
    ],
    architecture: "Edge WebRTC → STT Stream → Sovereign PII Gate → Airport Master RAG (Flight API + Bounding Box Ops Docs) → Latency-Guarded TTS",
    outcomeHighlight: "Prototype to Tender.",
    outcome: "Validated sub-800ms response & 94%+ intent accuracy across 4 languages; advanced directly into active enterprise procurement.",
  },
  {
    title: "ZRH Insider — Operations Mobile Platform Rebuild",
    subtitle: "Consolidated fragmented native apps into a unified cross-platform mobile core for 35,000 airport employees.",
    statusTag: "Shipped Production Rebuild",
    challenge: "Divergent Swift (iOS) and Kotlin (Android) codebases stalled operational shift workflows for ground and security staff.",
    stats: [
      { value: "~35K", label: "employee audience" },
      { value: "3 → 1", label: "codebases unified" },
      { value: "CHF 350K", label: "saved vs external quotes" },
      { value: "1 Month", label: "initial core rebuild" },
    ],
    technicalContribution: [
      "Consolidated fragmented Swift and Kotlin repos into a high-performance Capacitor + React 19 architecture",
      "Integrated enterprise airport SSO, push notification relays, and offline shift synchronization",
      "Engineered automated CI/CD build and delivery pipelines for App Store and Google Play distribution",
    ],
    architecture: "Capacitor Mobile Container → React 19 Runtime → Enterprise OIDC SSO → Offline SQLite Cache → Push Event Relay",
    outcomeHighlight: "Shipped to Production.",
    outcome: "Live across airport operations; unblocked weekly feature velocity with a single maintainable cross-functional codebase.",
  },
  {
    title: "Leistera — Swiss AEC Agentic Workflow & Citation Engine",
    subtitle: "Agentic RAG and norm compliance engine for Swiss engineering and architecture offices.",
    statusTag: "Active B2B Delivery",
    challenge: "Senior billable engineers spending 30+ hours rebuilding proposals and verifying SIA norm compliance across fragmented local drives and archives.",
    stats: [
      { value: "30h → 3h", label: "proposal turnaround" },
      { value: "Exact PDF", label: "bounding-box citations" },
      { value: "Hybrid BM25", label: "+ dense vectors + Cohere" },
      { value: "100% On-Prem", label: "Swiss data residency" },
    ],
    technicalContribution: [
      "Engineered agentic retrieval pipeline with verified norm edition gating (SIA, ASTRA, nDSG)",
      "Implemented hybrid sparse (BM25) and dense vector search with Cohere cross-encoder reranking",
      "Built deterministic citation extractor linking AI answers directly to exact PDF page coordinates",
    ],
    architecture: "Document Ingestion (Docling OCR) → BM25 + pgvector → Cohere Cross-Encoder → Strict Grounded Generation → Bounding Box PDF Viewer",
    outcomeHighlight: "Active Delivery.",
    outcome: "Piloting with leading Swiss engineering firms, cutting proposal turnaround from days to hours with zero ungrounded hallucinations.",
  },
];

const compactProjects: CompactProject[] = [
  {
    name: "PrivacyLayer",
    category: "AI Infrastructure",
    stage: "Live",
    stageColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
    description: "Browser-side regex & token PII stripping before prompts reach any remote model. Zero plaintext bytes to any server.",
    evidence: "Live Chrome extension & WebAssembly core",
    url: "https://privacy.terencela.com",
  },
  {
    name: "Leistera / Office OS",
    category: "Enterprise AI",
    stage: "In Delivery",
    stageColor: "text-blue-500 bg-blue-500/10 border-blue-500/30",
    description: "Agentic RAG connecting project history, SIA norms, and proposal drafting across engineering offices with exact citations.",
    evidence: "Active B2B pilots with Swiss planning offices",
    url: "https://leistera.com",
  },
  {
    name: "Rehearse",
    category: "Simulation",
    stage: "Live",
    stageColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
    description: "Interactive AI role-play for high-stakes enterprise sales, executive negotiations, and difficult conversations with instant feedback.",
    evidence: "Interactive live rehearsal flow",
    url: "https://rehearse-roleplay.vercel.app",
  },
  {
    name: "Vibe Translator",
    category: "Human Intelligence",
    stage: "Building",
    stageColor: "text-purple-500 bg-purple-500/10 border-purple-500/30",
    description: "Context layer decoding tone, subtext, and organizational culture before generating high-stakes communication responses.",
    evidence: "Interactive product prototype",
    url: "https://vibes.terencela.com",
  },
  {
    name: "AirCompanion",
    category: "Travel AI",
    stage: "Venture",
    stageColor: "text-cyan-500 bg-cyan-500/10 border-cyan-500/30",
    description: "Contextual AI companion for the full airport passenger journey. Real-time flight tracking, gate walking times, and transit assist.",
    evidence: "Full product system architecture designed",
    url: "https://app.aircompanion.app",
  },
  {
    name: "Asia Bridge",
    category: "Cultural Intelligence",
    stage: "Concept",
    stageColor: "text-rose-500 bg-rose-500/10 border-rose-500/30",
    description: "Business communication rules and social nuances for Western executives working with Asian enterprises and partners.",
    evidence: "Product thesis & semantic ruleset",
    url: "https://asia.terencela.com",
  },
];

const accentStyles = {
  "--hero-accent": ACCENT,
} as CSSProperties;

export function GoogleApplicationPage() {
  const [activeArchNodeId, setActiveArchNodeId] = useState<string | null>("retrieval");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <DossierThemeProvider>
      <main
        className="dossier-page dossier-theme-dark min-h-screen text-[var(--dossier-body)]"
        style={accentStyles}
      >
        <DossierBackground accentColor={ACCENT} />

        <SubpageHeader
          companyName="Google"
          roleTitle="Forward Deployed Engineer III (Zurich)"
          accentColor={ACCENT}
        />

        {/* HERO SECTION */}
        <section className="dossier-openai-hero relative z-[2] flex min-h-[calc(100dvh-57px)] flex-col md:min-h-[calc(100dvh-57px)]">
          <div className="dossier-openai-hero__main mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-start px-4 py-5 md:justify-center md:px-8 md:py-12 lg:py-14">
            <div className="flex flex-col gap-6 md:grid md:grid-cols-[minmax(0,1fr)_minmax(200px,260px)] md:items-center md:gap-x-12 md:gap-y-0 lg:gap-x-16">
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
                <div className="inline-flex items-center gap-2 rounded-full border border-[#4285f4]/30 bg-[#4285f4]/10 px-3 py-1 text-[11px] font-mono font-medium text-[#4285f4]">
                  <Sparkles className="h-3 w-3" />
                  Forward Deployed Engineer III &middot; Applied AI Zurich
                </div>

                <h1 className="dossier-hero-title mt-4 max-w-[18ch]" style={{ fontSize: "clamp(30px, 7vw, 60px)" }}>
                  I build AI agents and get them working in the real world.
                </h1>

                <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-[var(--dossier-body)] md:mt-6 md:text-[16px] md:leading-[1.65]">
                  AI Lead at Zurich Airport, founder with an exit, and hands-on applied AI engineer. Rapid prototyping &times; customer discovery &times; engineering execution &times; agent orchestration &times; enterprise delivery in regulated Swiss environments.
                </p>

                {/* 3 Prominent Metrics Strip Above the Fold */}
                <div className="mt-6 grid grid-cols-3 gap-3 border-y border-[var(--dossier-line)] py-3 max-w-[580px]">
                  <div>
                    <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--dossier-ink)] font-mono">
                      15+
                    </span>
                    <p className="text-[11px] font-medium text-[var(--dossier-muted)] mt-0.5">
                      AI applications built
                    </p>
                  </div>
                  <div>
                    <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#4285f4] font-mono">
                      8&times;
                    </span>
                    <p className="text-[11px] font-medium text-[var(--dossier-muted)] mt-0.5">
                      Hackathon winner (Europe)
                    </p>
                  </div>
                  <div>
                    <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--dossier-ink)] font-mono">
                      ~35K
                    </span>
                    <p className="text-[11px] font-medium text-[var(--dossier-muted)] mt-0.5">
                      Employee app audience
                    </p>
                  </div>
                </div>

                {/* Credibility Tag Strip */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {credibilityBadges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-md border border-[var(--dossier-line-strong)] bg-[var(--dossier-panel)]/70 px-2.5 py-1 text-[11px] font-medium text-[var(--dossier-subtle)]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Primary CTA Buttons */}
                <div className="mt-6 flex flex-wrap items-center gap-3 md:mt-8">
                  <button
                    type="button"
                    onClick={() => scrollToSection("interactive-agent-demo")}
                    className="dossier-button-primary dossier-cta-accent dossier-pressable inline-flex cursor-pointer"
                  >
                    Run Live Agent Demo
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection("case-studies")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--dossier-line-strong)] bg-[var(--dossier-panel)] px-4 py-2 text-xs font-semibold text-[var(--dossier-ink)] transition-colors hover:border-[#4285f4]"
                  >
                    View Deployments
                  </button>
                  <a
                    href="https://www.linkedin.com/in/terencela"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[var(--dossier-muted)] transition-colors hover:text-[var(--dossier-ink)]"
                  >
                    LinkedIn
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="dossier-openai-hero__logos mt-auto shrink-0 border-t border-[var(--dossier-line)]">
            <div className="mx-auto max-w-[1200px] px-4 py-3 md:px-8 md:py-4">
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                {credibilityLogos.map((logo) => (
                  <div
                    key={logo}
                    className="rounded-full border border-[var(--dossier-line)] px-3 py-1 text-[12px] font-normal tracking-[-0.005em] text-[var(--dossier-subtle)]"
                  >
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: WHY ME */}
        <section className="dossier-section relative z-[2] pt-12 pb-6">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4285f4]">
              Role Alignment
            </p>
            <h2 className="mt-1 text-[clamp(26px,3.2vw,38px)] font-bold tracking-tight text-[var(--dossier-ink)]">
              What I bring to Google Applied AI on day one.
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <article className="flex flex-col rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#4285f4]/10 text-[#4285f4]">
                  <Workflow className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold tracking-tight text-[var(--dossier-ink)]">
                  Enterprise deployment
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--dossier-muted)]">
                  Discovery &rarr; architecture &rarr; prototype &rarr; governance &rarr; tender. I know how to navigate Swiss data constraints (nDSG, GDPR), enterprise security teams, and procurement cycles.
                </p>
                <div className="mt-4 pt-3 border-t border-[var(--dossier-line)] text-[10px] font-mono text-[var(--dossier-subtle)]">
                  Zurich Airport Voice AI &middot; Formal Tender
                </div>
              </article>

              <article className="flex flex-col rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#4285f4]/10 text-[#4285f4]">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold tracking-tight text-[var(--dossier-ink)]">
                  Hands-on AI builder
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--dossier-muted)]">
                  15+ AI applications built from scratch. Agent orchestration, hybrid BM25/dense vector retrieval, streaming voice pipelines, and continuous offline evaluation gates.
                </p>
                <div className="mt-4 pt-3 border-t border-[var(--dossier-line)] text-[10px] font-mono text-[var(--dossier-subtle)]">
                  Agentic RAG &middot; WebRTC Voice &middot; Eval Harness
                </div>
              </article>

              <article className="flex flex-col rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#4285f4]/10 text-[#4285f4]">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold tracking-tight text-[var(--dossier-ink)]">
                  Customer discovery &times; commercial acumen
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--dossier-muted)]">
                  Founder with an exit and HSG master. I translate between C-level executives, compliance leads, and engineers to define the true business wedge and ship fast.
                </p>
                <div className="mt-4 pt-3 border-t border-[var(--dossier-line)] text-[10px] font-mono text-[var(--dossier-subtle)]">
                  Founder Exit &middot; M.A. HSG &middot; 35K Users
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION: INTERACTIVE AGENT DEMO & ARCHITECTURE */}
        <section id="interactive-agent-demo" className="dossier-section relative z-[2] py-8">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8 space-y-8">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#4285f4]/30 bg-[#4285f4]/10 px-3 py-1 text-[11px] font-mono font-medium text-[#4285f4]">
                <Terminal className="h-3.5 w-3.5" />
                Real Live Technical Demo &middot; Browser Executed
              </div>
              <h2 className="mt-2 text-[clamp(26px,3.2vw,38px)] font-bold tracking-tight text-[var(--dossier-ink)]">
                Interactive Agent Retrieval &amp; Evaluation Engine
              </h2>
              <p className="mt-1 text-sm text-[var(--dossier-muted)] max-w-[68ch]">
                Test a production-grade agent workflow running over actual Swiss regulatory and operational documents. Inspect the real-time multi-stage trace, PII anonymization, citation bounding boxes, and faithfulness evaluation.
              </p>
            </div>

            {/* 1. Live Interactive Demo */}
            <GoogleAgentInteractiveDemo onActiveNodeChange={setActiveArchNodeId} />

            {/* 2. Interactive System Architecture Pipeline */}
            <GoogleAgentArchitecture activeNodeId={activeArchNodeId} />
          </div>
        </section>

        {/* SECTION: THREE CASE STUDIES */}
        <section id="case-studies" className="dossier-section relative z-[2] py-8">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4285f4]">
              Production Proof
            </p>
            <h2 className="mt-1 text-[clamp(26px,3.2vw,38px)] font-bold tracking-tight text-[var(--dossier-ink)]">
              Three high-stakes enterprise deployments
            </h2>
            <p className="mt-1 text-sm text-[var(--dossier-muted)] max-w-[60ch]">
              Defensible, verified technical systems built for regulated Swiss enterprises and live operational staff.
            </p>

            <div className="mt-6 space-y-4">
              {deployments.map((deployment) => (
                <article
                  key={deployment.title}
                  className="rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-5 md:p-6 transition-all hover:border-[var(--dossier-line-strong)]"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 border-b border-[var(--dossier-line)] pb-4">
                    <div>
                      <span className="rounded bg-[#4285f4]/10 border border-[#4285f4]/30 px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#4285f4] uppercase">
                        {deployment.statusTag}
                      </span>
                      <h3 className="mt-2 text-lg md:text-xl font-bold tracking-tight text-[var(--dossier-ink)]">
                        {deployment.title}
                      </h3>
                      <p className="mt-1 text-xs md:text-sm text-[var(--dossier-muted)]">
                        {deployment.subtitle}
                      </p>
                    </div>
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 shrink-0 text-left md:text-right">
                      <span className="text-[9px] font-mono uppercase font-bold text-emerald-500 block">
                        Verified Outcome
                      </span>
                      <span className="text-xs font-semibold text-[var(--dossier-ink)]">
                        {deployment.outcomeHighlight}
                      </span>
                    </div>
                  </div>

                  {/* Metrics Strip */}
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[var(--dossier-panel)]/50 rounded-lg p-3 border border-[var(--dossier-line)]">
                    {deployment.stats.map((stat) => (
                      <div key={stat.label}>
                        <span className="text-base md:text-lg font-bold font-mono text-[var(--dossier-ink)] block">
                          {stat.value}
                        </span>
                        <span className="text-[10px] text-[var(--dossier-muted)] uppercase tracking-wider">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Technical Deep Dive */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                    <div className="md:col-span-7 space-y-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-[var(--dossier-subtle)]">
                        Technical Contributions &amp; Engineering Decisions
                      </span>
                      <ul className="space-y-1.5 text-[var(--dossier-body)]">
                        {deployment.technicalContribution.map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#4285f4] mt-0.5 font-bold">&bull;</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="md:col-span-5 space-y-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-[var(--dossier-subtle)]">
                        Architecture &amp; Security Boundary
                      </span>
                      <div className="rounded-lg border border-[var(--dossier-line)] bg-[var(--dossier-dark)] p-3 text-[11px] font-mono text-blue-300 leading-relaxed">
                        {deployment.architecture}
                      </div>
                      <p className="text-[11px] text-[var(--dossier-muted)] mt-1">
                        <strong>Current Status:</strong> {deployment.outcome}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: COMPACT SELECTED PROJECTS (SOLVES "ZU HOCH") */}
        <section className="dossier-section relative z-[2] py-8">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4285f4]">
                  Applied AI Systems
                </p>
                <h2 className="mt-1 text-[clamp(26px,3.2vw,38px)] font-bold tracking-tight text-[var(--dossier-ink)]">
                  Selected systems built from scratch
                </h2>
              </div>
              <p className="text-xs text-[var(--dossier-muted)] max-w-[42ch]">
                Compact overview of live personal products, enterprise AI tools, and infrastructure.
              </p>
            </div>

            {/* Compact 3-column grid without cavernous visual blocks */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {compactProjects.map((project, index) => (
                <div
                  key={project.name}
                  className="rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-4 flex flex-col justify-between hover:border-[var(--dossier-line-strong)] transition-all hover:bg-[var(--dossier-panel)]/80"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-[var(--dossier-subtle)] font-bold">
                        {String(index + 1).padStart(2, "0")} &middot; {project.category.toUpperCase()}
                      </span>
                      <span className={`px-2 py-0.5 rounded border text-[9px] font-bold uppercase ${project.stageColor}`}>
                        {project.stage}
                      </span>
                    </div>

                    <h3 className="mt-2 text-base font-bold text-[var(--dossier-ink)] tracking-tight">
                      {project.name}
                    </h3>

                    <p className="mt-1.5 text-xs text-[var(--dossier-body)] leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--dossier-line)] flex items-center justify-between text-[11px]">
                    <span className="text-[var(--dossier-muted)] truncate max-w-[190px]" title={project.evidence}>
                      {project.evidence}
                    </span>
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-[#4285f4] hover:underline shrink-0"
                      >
                        Inspect
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-[10px] font-mono text-[var(--dossier-subtle)]">Internal</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: CTA */}
        <section className="dossier-section relative z-[2] pb-20 pt-6">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <div className="rounded-2xl border border-[var(--dossier-line-strong)] bg-[var(--dossier-panel)] p-6 md:p-9 shadow-xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4285f4]">
                Direct Technical Discussion
              </span>
              <h2 className="mt-1 text-[clamp(26px,3.6vw,44px)] font-bold tracking-tight text-[var(--dossier-ink)]">
                I&apos;d rather show you the code and systems.
              </h2>
              <p className="mt-2.5 max-w-[56ch] text-sm leading-relaxed text-[var(--dossier-body)] md:text-[15px]">
                30 minutes. Let&apos;s walk through live agent orchestration, offline eval harnesses, and where Google Applied AI can unlock high-stakes enterprise value in Zurich and across DACH.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/terencela"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dossier-button-primary dossier-cta-accent dossier-pressable inline-flex"
                >
                  Connect on LinkedIn
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="https://xp.terencela.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--dossier-line-strong)] bg-[var(--dossier-panel)] px-4 py-2.5 text-xs font-semibold text-[var(--dossier-ink)] transition-colors hover:border-[#4285f4]"
                >
                  Explore TerenceXP Portfolio
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="mailto:terence@terencela.com"
                  className="inline-flex items-center gap-1 text-xs text-[var(--dossier-muted)] hover:text-[var(--dossier-ink)] px-2"
                >
                  terence@terencela.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </DossierThemeProvider>
  );
}
