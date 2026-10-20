"use client";

import React, { useEffect, type CSSProperties } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Building2,
  Cpu,
  Database,
  FileText,
  MessageSquareText,
  Mic,
  Search,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { DossierBackground } from "@/app/components/shared/DossierBackground";
import { SubpageHeader } from "@/app/components/shared/SubpageHeader";
import { ProductVisual } from "@/app/components/shared/ProductVisual";
import { DossierThemeProvider } from "@/app/lib/dossier-theme";

const EASE_OUT_STRONG = [0.23, 1, 0.32, 1] as const;
const ACCENT = "#8ab4f8";

const TERENCE_AI_URL = "https://about.terencela.com";

function TerenceAIAskBar() {
  const handleAsk = () => {
    window.location.href = TERENCE_AI_URL;
  };

  return (
    <div className="dossier-terenceai-ask mt-4">
      <label className="dossier-terenceai-ask__field">
        <span className="dossier-terenceai-ask__icon" aria-hidden="true">
          <Search className="h-4 w-4" strokeWidth={2} />
        </span>
        <input
          type="text"
          name="terenceai-ask"
          placeholder="Ask TerenceAI anything about my work..."
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
  remark?: string;
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
    subtitle: "Voice AI for 85K annual calls. Discovery through formal tender.",
    challenge: "Regulated environment, multi-stakeholder, trust constraints.",
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
    outcome: "Formal tender initiated. Procurement ongoing.",
  },
  {
    title: "ZRH Insider - Employee App Rebuild",
    subtitle: "Three codebases merged into one foundation for 35K employees.",
    challenge: "Fragmented Android/iOS slowed delivery.",
    stats: [
      { value: "35K", label: "employees" },
      { value: "3 to 1", label: "codebases merged" },
    ],
    role: [
      "Rebuilt app foundation in one month",
      "Consolidated architecture for faster rollout",
      "Designed engagement loops",
    ],
    outcomeHighlight: "Shipped.",
    outcome: "Externally quoted at CHF 350K. Scalable base for future features.",
  },
  {
    title: "Leistera - Swiss AEC Agentic Operations",
    subtitle: "Agentic workspace for Swiss planning firms with cited norm grounding.",
    challenge: "Manual proposals and norm checks across fragmented office archives.",
    stats: [
      { value: "Agentic RAG", label: "retrieval stack" },
      { value: "Exact PDF", label: "citations" },
    ],
    role: [
      "Founded KI Unlocked and built Leistera end to end",
      "Hybrid retrieval and eval on real corpora",
      "Pilot delivery with Swiss engineering offices",
    ],
    outcomeHighlight: "Active delivery.",
    outcome: "Live product for Swiss planning firms.",
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
    remark: "Client-side WebAssembly parser · Sub-5ms regex scanner · Chrome extension",
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
    remark: "Hybrid BM25 + dense retrieval · Exact PDF citation coordinates",
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
    remark: "Cultural subtext alignment · Multi-turn communication decoding",
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
    remark: "Live flight telemetry ingest · Location-aware gate walking times",
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
    remark: "Cross-cultural negotiation heuristics · Real-time executive coaching",
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
    remark: "Low-latency voice streaming · Multi-criteria evaluation rubric",
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
    remark: "Speech-to-text pipeline · Narrative summarization · Oral archive",
    evidence: "Voice-first experience built",
    url: "https://treasures-bowl.vercel.app",
  },
];

const accentStyles = {
  "--hero-accent": ACCENT,
} as CSSProperties;

export function GoogleApplicationPage() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Track internal Google visitor
    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: "/google",
          referrer: document.referrer,
          screen: `${window.innerWidth}x${window.innerHeight}`,
        }),
      }).catch(() => {});
    } catch {}
  }, []);

  return (
    <DossierThemeProvider>
      <main
        className="dossier-page relative min-h-[100dvh] overflow-x-hidden"
        style={accentStyles}
      >
        <DossierBackground accentColor={ACCENT} />
        <SubpageHeader
          companyName="Google"
          roleTitle="Forward Deployed Engineer III (Zurich)"
          accentColor={ACCENT}
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
                  I build AI agents and get them working in the real world.
                </h1>
                <p className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-[var(--dossier-body)] md:mt-10 md:text-[17px] md:leading-[1.65]">
                  Forward Deployed Engineer candidate for Google Applied AI in Zurich. As AI Lead at Zurich Airport, I drove voice AI from concept through formal enterprise tender and consolidated fragmented platforms for ~35k staff. Through KI Unlocked, I architect, code, and ship agentic AI systems like Leistera that solve high-stakes document and workflow operations in regulated Swiss environments.
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
                <div className="mt-4 max-w-[540px]">
                  <TerenceAIAskBar />
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

        <section className="dossier-section relative z-[2] pt-9">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8ab4f8]">
              Why me
            </p>
            <h2 className="mt-2 text-[clamp(28px,3.5vw,42px)] font-semibold tracking-[-0.04em] text-[var(--dossier-ink)]">
              What I bring to Google on day one.
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <article className="flex flex-col rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-6 pb-7">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8ab4f8]/[0.08]">
                  <Workflow className="h-6 w-6 text-[#8ab4f8]" />
                </div>
                <h3 className="text-[15px] font-semibold tracking-tight text-[var(--dossier-ink)]">
                  Enterprise deployment
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--dossier-muted)]">
                  Discovery to production to governance. Full path.
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-x-1.5 gap-y-2 pt-6">
                  {[
                    { icon: Search, label: "Discover" },
                    { icon: Building2, label: "Build" },
                    { icon: ArrowUpRight, label: "Deploy" },
                    { icon: Users, label: "Adopt" },
                    { icon: ShieldCheck, label: "Govern" },
                  ].map((step, i) => (
                    <React.Fragment key={step.label}>
                      <div className="flex flex-col items-center gap-1">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#8ab4f8]/[0.08]">
                          <step.icon className="h-3.5 w-3.5 text-[#8ab4f8]" />
                        </span>
                        <span className="text-[8px] font-medium text-[var(--dossier-muted)]">{step.label}</span>
                      </div>
                      {i < 4 && <ArrowRight className="mt-[-10px] h-2.5 w-2.5 shrink-0 text-[var(--dossier-subtle)]" />}
                    </React.Fragment>
                  ))}
                </div>
              </article>

              <article className="flex flex-col rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-6 pb-7">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8ab4f8]/[0.08]">
                  <Cpu className="h-6 w-6 text-[#8ab4f8]" />
                </div>
                <h3 className="text-[15px] font-semibold tracking-tight text-[var(--dossier-ink)]">
                  AI builder
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--dossier-muted)]">
                  15+ products. Agents, RAG, voice AI, eval loops.
                </p>
                <div className="mt-auto flex items-center gap-3 pt-6">
                  {[Bot, FileText, Mic, Database, MessageSquareText].map((Icon, i) => (
                    <span
                      key={i}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8ab4f8]/[0.08]"
                    >
                      <Icon className="h-4 w-4 text-[#8ab4f8]" />
                    </span>
                  ))}
                </div>
              </article>

              <article className="flex flex-col rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-6 pb-7">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8ab4f8]/[0.08]">
                  <Users className="h-6 w-6 text-[#8ab4f8]" />
                </div>
                <h3 className="text-[15px] font-semibold tracking-tight text-[var(--dossier-ink)]">
                  Business x Engineering
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--dossier-muted)]">
                  Translate between executives, engineers and end users to keep projects moving.
                </p>
                <div className="mt-auto pt-6">
                  <svg viewBox="0 0 220 90" className="w-full max-w-[220px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="48" y1="22" x2="172" y2="22" stroke="#8ab4f8" strokeWidth="1" opacity="0.4" />
                    <line x1="40" y1="24" x2="110" y2="76" stroke="#8ab4f8" strokeWidth="1" opacity="0.4" />
                    <line x1="180" y1="24" x2="110" y2="76" stroke="#8ab4f8" strokeWidth="1" opacity="0.4" />
                    <circle cx="40" cy="20" r="4" fill="#8ab4f8" opacity="0.8" />
                    <circle cx="180" cy="20" r="4" fill="#8ab4f8" opacity="0.8" />
                    <circle cx="110" cy="78" r="4" fill="#8ab4f8" opacity="0.8" />
                    <text x="18" y="12" fontSize="9" fontWeight="500" className="fill-[var(--dossier-ink)]">Business</text>
                    <text x="148" y="12" fontSize="9" fontWeight="500" className="fill-[var(--dossier-ink)]">Engineering</text>
                    <text x="92" y="89" fontSize="9" fontWeight="500" className="fill-[var(--dossier-ink)]">User</text>
                  </svg>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="dossier-section-tight relative z-[2] !pb-2 !pt-3">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <h2 className="text-[clamp(28px,3.5vw,42px)] font-semibold tracking-[-0.04em] text-[var(--dossier-ink)]">
              Explore my work through AI
            </h2>
            <p className="mt-1 text-sm text-[var(--dossier-muted)]">
              No pre-recorded video pitch. Ask questions directly about my real production deployments, code, and systems.
            </p>
            <div className="mt-4">
              <a
                href={TERENCE_AI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="dossier-loom-panel dossier-loom-panel-compact block overflow-hidden dossier-pressable"
                aria-label="Ask TerenceAI anything about my work"
              >
                <div className="relative flex w-full min-h-[210px] items-stretch text-left sm:min-h-[230px] md:min-h-[270px]">
                  <div className="dossier-loom-pattern absolute inset-0" aria-hidden="true" />
                  <div className="relative z-10 flex flex-1 flex-col justify-between p-5 md:p-7">
                    <div
                      className="inline-flex w-fit items-center gap-1.5 text-xs font-medium"
                      style={{ color: ACCENT }}
                    >
                      <MessageSquareText className="h-4 w-4" />
                      Interactive Q&amp;A
                    </div>
                    <div>
                      <div className="flex items-center gap-4 md:gap-5">
                        <span
                          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--dossier-line-strong)] bg-[var(--dossier-dark)] text-[#8ab4f8]"
                        >
                          <MessageSquareText className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--dossier-muted)]">
                            Interactive Introduction
                          </p>
                          <h4 className="mt-1 text-lg font-semibold tracking-tight text-[var(--dossier-ink)] md:text-2xl">
                            Ask me anything about my work
                          </h4>
                          <p className="mt-1 text-sm text-[var(--dossier-body)] md:text-[15px]">
                            Questions about my engineering background, voice AI tender, or Swiss deployments? Prompt the AI below.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-[38%] max-w-[240px] min-w-[112px] shrink-0 border-l border-[var(--dossier-line-strong)] bg-[#101116] sm:min-w-[132px] md:min-w-[180px]">
                    <Image
                      src="/images/terence-editorial.jpg"
                      alt="Terence La"
                      fill
                      sizes="(max-width: 768px) 38vw, 240px"
                      className="dossier-profile-photo object-cover object-top"
                    />
                  </div>
                </div>
              </a>
              <TerenceAIAskBar />
            </div>
          </div>
        </section>

        <section className="dossier-section-tight relative z-[2] !pb-2 !pt-2">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <motion.h2
              className="text-[clamp(28px,3.7vw,44px)] font-semibold tracking-[-0.04em] text-[var(--dossier-ink)]"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_OUT_STRONG }}
            >
              Three recent deployments
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

        <section className="google-projects-section dossier-section-tight relative z-[2] !pt-2 !pb-6">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <h2 className="text-[clamp(28px,3.5vw,42px)] font-semibold tracking-[-0.04em] text-[var(--dossier-ink)]">
              Selected projects I created from scratch this year
            </h2>
            <p className="mt-1 text-sm text-[var(--dossier-muted)]">
              Personal products. AI infrastructure, voice, human intelligence.
            </p>
            <div className="project-grid mt-4">
              {selectedProjects.map((project, index) => (
                <div
                  key={project.name}
                  className={`project-card google-project-card accent-${project.accent}`}
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
                        className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--accent)] transition-opacity duration-150 hover:opacity-80"
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
                30 minutes. I&apos;ll walk you through a live deployment, the decisions behind it, and where I think Google Applied AI should go next with enterprise customers in Switzerland.
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
              <TerenceAIAskBar />
            </div>
          </div>
        </section>
      </main>
    </DossierThemeProvider>
  );
}
