"use client";

import React, { type CSSProperties } from "react";
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
import { BusinessTechIntersection } from "@/app/components/shared/BusinessTechIntersection";
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
          placeholder="Ask TerenceAI: why should OpenAI hire me?"
          autoComplete="off"
          onInput={(event) => {
            if (event.currentTarget.value.trim().length > 0) handleAsk();
          }}
          className="dossier-terenceai-ask__input"
        />
      </label>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 px-1">
        <span className="text-xs text-[var(--dossier-muted)]">Try:</span>
        {[
          "Why Forward Deployed Zurich?",
          "What did you ship at the airport?",
          "How did you win 8 hackathons solo?",
        ].map((question) => (
          <a
            key={question}
            href={TERENCE_AI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-[var(--dossier-ink)] underline decoration-[var(--dossier-line-strong)] underline-offset-4 transition-colors hover:decoration-[var(--dossier-ink)]"
          >
            {question}
            <ArrowUpRight className="h-3 w-3" />
          </a>
        ))}
      </div>
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
  "--hero-accent": "#73736d",
} as CSSProperties;

const intersectionPowers = [
  {
    title: "In the room, then in the code",
    desc: "With the customer at the start of the week. A working pilot by the end of it.",
  },
  {
    title: "Gets past legal, security and procurement",
    desc: "That is where most enterprise pilots die. I handle it instead of handing it off.",
  },
  {
    title: "Zurich, in four languages",
    desc: "German, Swiss German, English and Cantonese. Local with customers, technical with engineers.",
  },
];

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
          accentColor="#1a1a1a"
        />

        <section className="dossier-openai-hero relative z-[2] flex min-h-[calc(100dvh-57px)] flex-col md:min-h-[calc(100dvh-57px)]">
          <div className="dossier-openai-hero__main mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-start px-4 py-5 md:justify-center md:px-8 md:py-14 lg:py-16">
            <div className="flex flex-col gap-4 md:grid md:grid-cols-[minmax(0,1fr)_minmax(200px,260px)] md:items-center md:gap-x-14 md:gap-y-0 lg:gap-x-20">
              <aside className="dossier-openai-hero__photo w-full max-w-[min(9rem,38vw)] shrink-0 md:col-start-2 md:row-start-1 md:mx-0 md:max-w-[220px] lg:max-w-[260px]">
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
                <p className="mb-3 text-[13px] font-medium text-[var(--dossier-muted)] md:mb-4">
                  I&apos;m applying for the Forward Deployed Engineer role in Zurich.
                </p>
                <h1 className="dossier-hero-title max-w-[18ch]" style={{ fontSize: "clamp(30px, 8.2vw, 64px)" }}>
                  Forward deployed engineer for enterprise AI.
                </h1>
                <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-[var(--dossier-body)] md:mt-8 md:text-[17px] md:leading-[1.6]">
                  AI Lead at Zurich Airport, 32M+ passengers a year. I find the problem inside the company, build the AI, and get it through data rules, procurement and real operations.
                </p>
                <div className="mt-5 grid max-w-[640px] grid-cols-3 gap-3 border-t border-[var(--dossier-line)] pt-4 md:mt-8 md:gap-5 md:pt-5">
                  <div>
                    <p className="text-[20px] font-semibold leading-none tracking-[-0.03em] text-[var(--dossier-ink)] md:text-[24px]">8×</p>
                    <p className="mt-1.5 text-[11px] font-semibold leading-snug text-[var(--dossier-ink)] md:text-[12px]">Hackathon winner, mostly solo</p>
                    <p className="mt-0.5 text-[10px] leading-snug text-[var(--dossier-muted)] md:text-[11px]">3rd at HackZurich, 1,600 engineers</p>
                  </div>
                  <div>
                    <p className="text-[20px] font-semibold leading-none tracking-[-0.03em] text-[var(--dossier-ink)] md:text-[24px]">20+</p>
                    <p className="mt-1.5 text-[11px] font-semibold leading-snug text-[var(--dossier-ink)] md:text-[12px]">AI products built</p>
                    <p className="mt-0.5 text-[10px] leading-snug text-[var(--dossier-muted)] md:text-[11px]">GPT-3 since 2020</p>
                  </div>
                  <div>
                    <p className="text-[20px] font-semibold leading-none tracking-[-0.03em] text-[var(--dossier-ink)] md:text-[24px]">2 weeks</p>
                    <p className="mt-1.5 text-[11px] font-semibold leading-snug text-[var(--dossier-ink)] md:text-[12px]">App for 35,000 staff, rebuilt solo</p>
                    <p className="mt-0.5 text-[10px] leading-snug text-[var(--dossier-muted)] md:text-[11px]">Replaced a CHF 200K quote</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:mt-8">
                  <a
                    href="https://about.terencela.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dossier-button-primary dossier-cta-accent dossier-pressable inline-flex"
                  >
                    Ask TerenceAI anything about me
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
                <p className="mt-3 text-xs text-[var(--dossier-muted)]">
                  TerenceAI answers from my work in seconds. The work itself is below.
                </p>
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

        <section className="dossier-section relative z-[2] pt-4">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <h2 className="text-[clamp(28px,3.5vw,42px)] font-semibold tracking-[-0.04em] text-[var(--dossier-ink)]">
              Terence in 90 seconds
            </h2>
            <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-[var(--dossier-muted)]">
              No deck. Who I am, what I shipped at Zurich Airport, and why I want Forward Deployed Zurich.
            </p>
            <div className="mt-4">
              <LoomVideoFrame
                companyName="OpenAI"
                roleTitle="Forward Deployed Engineer (Zurich)"
                videoSrc="/videos/terence-90s.mp4"
                videoPoster="/videos/terence-90s-poster.jpg"
                coverImage="/videos/terence-90s-poster.jpg"
                videoTitle="Terence in 90 seconds"
                videoSubtitle="Who I am, what I shipped, why Zurich."
                videoOrientation="portrait"
                showCoverPhoto
                accentColor="#73736d"
                showChapters={false}
              />
              <TerenceAIAskBar />
            </div>
          </div>
        </section>

        <BusinessTechIntersection
          reduceMotion={reduceMotion}
          intro="Most executives can't ship code. Most engineers can't get a pilot past procurement. I do both."
          centerTop="OPENAI FDE"
          centerBottom="Ships & Aligns"
          overlapTitle="The forward deployed part"
          overlapSubtitle="What a customer in Switzerland needs from one person."
          intersectionPowers={intersectionPowers}
        />

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

        <section className="dossier-section relative z-[2] pb-24 pt-8" id="full-circle">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <div className="rounded-2xl border border-[var(--dossier-line-strong)] bg-[var(--dossier-panel)] p-6 md:p-10">
              <div className="grid gap-8 md:grid-cols-12 md:items-center lg:gap-12">
                <div className="flex flex-col items-center md:col-span-5">
                  <div className="group relative w-full max-w-[320px] overflow-hidden rounded-xl border border-[var(--dossier-line-strong)] bg-[var(--dossier-surface)] shadow-md transition-all duration-300 hover:shadow-xl sm:max-w-[340px]">
                    <div className="relative aspect-[640/922] w-full overflow-hidden bg-black/5">
                      <Image
                        src="/images/sam-altman-davos-wef.jpg"
                        alt="Terence La speaking with Sam Altman, CEO of OpenAI, at the World Economic Forum in Davos"
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 320px, 340px"
                      />
                    </div>
                    <div className="border-t border-[var(--dossier-line)] bg-[var(--dossier-panel)] px-4 py-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-semibold text-[var(--dossier-ink)]">
                          World Economic Forum · Davos
                        </span>
                        <span className="rounded-full border border-[var(--dossier-line)] px-2 py-0.5 text-[10px] font-medium text-[var(--dossier-muted)]">
                          WEF
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] leading-snug text-[var(--dossier-muted)]">
                        Speaking with Sam Altman on frontier models and Swiss enterprise deployment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:col-span-7">
                  <p className="text-[13px] font-medium text-[var(--dossier-muted)]">
                    Full circle, 2020 to 2026
                  </p>
                  <h2 className="mt-2 text-[clamp(28px,3.6vw,44px)] font-semibold tracking-[-0.04em] text-[var(--dossier-ink)] leading-[1.12]">
                    From Davos to Zurich. Ready to deploy.
                  </h2>
                  <p className="mt-4 text-[14px] leading-relaxed text-[var(--dossier-body)] md:text-[15px]">
                    I started building with GPT-3 in 2020. At the World Economic Forum in Davos I spoke with Sam Altman about getting frontier models into real companies. That is what I have done since, inside Swiss enterprise.
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--dossier-body)] md:text-[15px]">
                    As OpenAI builds its Forward Deployed team in Zurich, I want to bring that full circle: frontier models in production at Switzerland&apos;s biggest companies.
                  </p>

                  <div className="mt-6 rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-surface)] p-4 md:p-5">
                    <h3 className="text-[15px] font-semibold tracking-tight text-[var(--dossier-ink)]">
                      I&apos;d rather show you than tell you.
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--dossier-muted)]">
                      30 minutes. I&apos;ll walk through live code, production architectures, enterprise failure modes—and discuss how Swiss field feedback can shape OpenAI products.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
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
                        href="https://about.terencela.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[13px] text-[var(--dossier-muted)] transition-colors duration-200 hover:text-[var(--dossier-ink)]"
                      >
                        Ask TerenceAI anything about me
                        <ArrowUpRight className="h-3 w-3" />
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
            </div>
          </div>
        </section>
      </main>
    </DossierThemeProvider>
  );
}
