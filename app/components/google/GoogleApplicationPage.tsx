"use client";

import React, { useState, type CSSProperties } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Code2,
  Database,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
} from "lucide-react";
import { DossierBackground } from "@/app/components/shared/DossierBackground";
import { SubpageHeader } from "@/app/components/shared/SubpageHeader";
import { LoomVideoFrame } from "@/app/components/shared/LoomVideoFrame";
import { DossierThemeProvider } from "@/app/lib/dossier-theme";

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
          placeholder="Ask TerenceAI anything about my agent architecture or experience"
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

type TechnicalCase = {
  id: string;
  badge: string;
  badgeTone: "amber" | "emerald" | "blue";
  statusText: string;
  title: string;
  subtitle: string;
  problem: string;
  architecture: {
    title: string;
    items: string[];
  };
  directContribution: string[];
  verifiedOutcome: string;
  currentStatus: string;
  link?: {
    label: string;
    url: string;
  };
  stats: {
    value: string;
    label: string;
  }[];
};

const technicalCases: TechnicalCase[] = [
  {
    id: "zrh-voice-ai",
    badge: "Enterprise Voice Agent · Regulated Aviation",
    badgeTone: "amber",
    statusText: "PoC Completed → Enterprise Tender",
    title: "Zurich Airport — Voice AI Call Center Agent",
    subtitle: "High-volume voice intelligence for airport operations under strict Swiss data and aviation constraints.",
    stats: [
      { value: "~85K", label: "annual call volume" },
      { value: "8 FTE", label: "call center capacity" },
      { value: "2 Weeks", label: "concept to working PoC" },
    ],
    problem:
      "Zurich Airport operations handle ~85,000 annual passenger calls across 8 FTEs with high seasonality. Inquiries span flight status, gate changes, parking, baggage rules, and airport services. Standard off-the-shelf bots fail because hallucinating operational facts carries direct aviation liability, while high peak volumes require sub-second latency.",
    architecture: {
      title: "Architecture & Technical Decisions",
      items: [
        "Real-time voice pipeline with streaming speech-to-text (STT) and text-to-speech (TTS) integrated into an event-driven conversational loop.",
        "Deterministic pre-LLM policy router: client-side regex and hard-fact classifications gate speculative answers, enforcing official flight API verification.",
        "Strict latency budget: multi-tier intent classification prior to speech synthesis to maintain natural turn-taking latency without conversational drift.",
        "Aviation-compliant governance: detailed data boundary isolation preventing passenger PII leakage into third-party foundation models.",
      ],
    },
    directContribution: [
      "Solely led use-case discovery, technical scoping, and conversational state machine design.",
      "Engineered the working proof-of-concept in two weeks to validate voice latency and intent accuracy with operational leaders.",
      "Co-authored the formal RFP and technical tender specifications for enterprise vendor evaluation and security review.",
    ],
    verifiedOutcome:
      "Delivered a functional, stakeholder-tested PoC in 14 days that proved operational feasibility, gained cross-functional consensus (Operations, IT, Legal), and advanced into Zurich Airport's formal procurement tender.",
    currentStatus:
      "Proof of Concept completed and validated. Progressed to formal enterprise tender and procurement governance (NOT in live production).",
  },
  {
    id: "zrh-insider",
    badge: "Mobile & Web Cross-Platform · Enterprise Scale",
    badgeTone: "emerald",
    statusText: "Shipped Production Rebuild (Internal Rollout)",
    title: "ZRH Insider — Platform Rebuild & Internal AI Integration",
    subtitle: "Consolidated dual native mobile apps into one unified modern foundation for ~35,000 badged airport staff.",
    stats: [
      { value: "~35K", label: "airport staff & badge holders" },
      { value: "2 to 1", label: "native codebases consolidated" },
      { value: "1 Month", label: "foundation rebuild to shipping" },
    ],
    problem:
      "Zurich Airport's workforce platform serves ~35,000 badged staff across terminal operations, ground handling, retail, and security. Delivery was paralyzed by two fragmented legacy native codebases (iOS in Swift, Android in Kotlin) duplicating business logic, with high maintenance costs and zero room for rapid AI experimentation.",
    architecture: {
      title: "Architecture & Technical Decisions",
      items: [
        "Consolidated dual native apps into a single Capacitor 8 + React 19 + TypeScript cross-platform codebase, preserving native device capabilities (camera, secure storage, push notifications) while unifying 100% of business logic.",
        "Built serverless `/api/insider-chat` proxy with `gpt-5-nano` primary and `gpt-4.1-nano` fallback, decoupling secrets from client bundles with strict rate-limiting, token quotas, and role-based access.",
        "Implemented deterministic pre-LLM regex classification (`isHardFactQuery`) that blocks model generation on unverified operational facts (fees, flight gates, hours) and routes to verified sources until live RAG feeds connect.",
        "Integrated client-side Tesseract OCR pipeline for receipt verification, warming local language models in the background without external CDN dependencies.",
      ],
    },
    directContribution: [
      "Directly architected and wrote the unified React/TypeScript codebase rebuild in one month.",
      "Engineered the edge API proxy, message router, gamification unlock state machine, and client-side OCR flow.",
      "Authored comprehensive architectural handoff documentation, security reviews, and operational runbooks for internal engineering teams.",
    ],
    verifiedOutcome:
      "Consolidated two native codebases into one shared cross-platform foundation (driving an estimated ~50% reduction in ongoing engineering duplication), delivering an internal system externally quoted by an agency at CHF 300K–350K.",
    currentStatus:
      "Production-ready rebuild shipped and in active internal deployment for ~35,000 airport staff. AI assistant integrated behind operational feature flags.",
  },
  {
    id: "leistera-ai",
    badge: "Agentic AI System · Regulated Swiss AEC",
    badgeTone: "blue",
    statusText: "Active Flagship Product & Client Delivery",
    title: "Leistera (KI Unlocked) — Agentic Document & Norm Intelligence",
    subtitle: "Grounded AI workspace for Swiss engineering and planning offices with audit-proof norm citations.",
    stats: [
      { value: "SIA/ASTRA", label: "norm compliance verification" },
      { value: "Bounding Box", label: "exact PDF page citation" },
      { value: "Active", label: "eval harness on real corpora" },
    ],
    problem:
      "In Swiss engineering and architecture firms, assembling fee proposals (Honorarofferte) and verifying compliance against complex regulatory standards (SIA 102/103/118, ASTRA) consumes up to 30 senior billable hours per tender. Standard LLMs hallucinate clauses, cite superseded norm editions, and fail to provide auditable source grounding required for legal sign-off.",
    architecture: {
      title: "Architecture & Technical Decisions",
      items: [
        "Multi-step agent workflow: Document layout analysis and text extraction -> hybrid retrieval (BM25 + dense vector embeddings) -> Cohere cross-encoder reranking -> deterministic norm edition verification -> grounded document generation.",
        "Exact Source Grounding: Every synthesized sentence is bound to an immutable document ID, verified edition date, and exact PDF bounding box coordinates, allowing partners to inspect original sources with one click.",
        "Deterministic Safety Gates: Hard verification on valid standards editions (rejects superseded norm years), human-in-the-loop review before DOCX/Word export, and tenant isolation with strict zero-training privacy guarantees.",
        "Continuous Evaluation Harness: Systematic eval suite measuring context recall@k, citation precision, and hallucination rates across 160+ verified Swiss engineering test fixtures.",
      ],
    },
    directContribution: [
      "Founded KI Unlocked and architected Leistera as its flagship agentic AI product, personally writing and debugging the Next.js, TypeScript, and retrieval pipelines.",
      "Engineered the hybrid retrieval engine and the evaluation framework that tests retrieval and generation fidelity independently.",
      "Led customer discovery, onboarded pilot engineering offices, and ran paid workshops with Swiss engineering partners.",
    ],
    verifiedOutcome:
      "Built and launched a live commercial product at leistera.com, actively deployed in pilot engagements with Swiss engineering offices, transforming 30-hour manual proposal and norm verification workflows into verifiable, grounded drafts.",
    currentStatus:
      "Live flagship product at leistera.com. Active client discovery and pilot delivery in Swiss planning firms.",
    link: {
      label: "Inspect Live Product (leistera.com)",
      url: "https://leistera.com",
    },
  },
];

type CuratedProject = {
  name: string;
  category: string;
  statusBadge: string;
  badgeTone: "blue" | "emerald" | "amber" | "violet";
  description: string;
  technicalHighlight: string;
  url?: string;
  visual: string;
};

const curatedProjects: CuratedProject[] = [
  {
    name: "Leistera",
    category: "Agentic AI Workspace",
    statusBadge: "Live Product",
    badgeTone: "blue",
    description: "AI-native workspace for Swiss engineering and architecture offices with auditable SIA/ASTRA citations.",
    technicalHighlight: "Hybrid retrieval (BM25 + vector + Cohere rerank) with exact PDF bounding-box source grounding.",
    url: "https://leistera.com",
    visual: "knowledge",
  },
  {
    name: "PrivacyLayer",
    category: "AI Security & Compliance",
    statusBadge: "Live Extension",
    badgeTone: "emerald",
    description: "Browser-side PII stripping and context sanitization before prompts reach external model providers.",
    technicalHighlight: "Zero-latency client-side regex + NER sanitization; zero raw PII transmitted to external servers.",
    url: "https://privacy.terencela.com",
    visual: "privacy",
  },
  {
    name: "Rehearse AI",
    category: "Conversational Simulation",
    statusBadge: "Live Prototype",
    badgeTone: "amber",
    description: "Real-time AI role-play simulation for difficult negotiations, sales conversations, and stakeholder handling.",
    technicalHighlight: "Real-time turn evaluation, sentiment analysis, and dynamic persona steering with sub-second feedback.",
    url: "https://rehearse-roleplay.vercel.app",
    visual: "rehearse",
  },
  {
    name: "AirCompanion",
    category: "Autonomous Travel Agent",
    statusBadge: "System Architecture",
    badgeTone: "violet",
    description: "Contextual AI companion architecture covering the end-to-end airport passenger journey.",
    technicalHighlight: "Event-driven architecture with geospatial awareness, flight telemetry feeds, and localized operational context.",
    url: "https://app.aircompanion.app",
    visual: "travel",
  },
];

const agentArchitecturePillars = [
  {
    id: "intake",
    step: "01",
    title: "Intake & Intent Gateway",
    role: "Deterministic Hard-Fact Guardrail",
    summary: "Pre-model regex and schema classification stops ungrounded queries before expensive model calls.",
    details: [
      "Fast deterministic regex scanning for time-sensitive, operational, or legal keywords (prices, gates, legal clauses).",
      "Client-side refusal and redirect to authoritative live endpoints for unverified live facts.",
      "Structured schema validation enforcing strict token limits, message bounds, and tenant identity.",
    ],
    codeSnippet: `// Deterministic pre-LLM gate
if (isHardFactQuery(userQuery)) {
  return unverifiedReply({
    fallbackAction: "QUERY_OFFICIAL_FEED",
    sourceRequired: true
  });
}`,
  },
  {
    id: "retrieval",
    step: "02",
    title: "Hybrid Retrieval & Isolation",
    role: "Context Assembly & Tenant Boundaries",
    summary: "Dense vector search combined with BM25 keyword matching and cross-encoder reranking.",
    details: [
      "Contextual chunking that preserves document hierarchy, section numbers, and edition metadata.",
      "Two-phase retrieval: BM25 for exact regulatory codes + dense embeddings for semantic matching.",
      "Cohere cross-encoder reranking to prune retrieved candidates down to top-k high-signal passages.",
      "Strict tenant boundary isolation enforcing Swiss data residency (nDSG) without cross-tenant bleed.",
    ],
    codeSnippet: `// Two-phase hybrid search + rerank
const candidates = await Promise.all([
  bm25Search(query, { tenantId, limit: 20 }),
  vectorSearch(embedding, { tenantId, limit: 20 })
]);
const topChunks = await cohereRerank(query, candidates, { topK: 5 });`,
  },
  {
    id: "tools",
    step: "03",
    title: "Tool Execution & Fallbacks",
    role: "Schema-Enforced Function Calling",
    summary: "Strict JSON-schema tool calling with retry boundaries and graceful fallback recovery.",
    details: [
      "Zero-shot tool routing backed by typed JSON schema definitions.",
      "Execution boundaries with timeout limits, retry backoff, and graceful fallback handling.",
      "Deterministic post-execution validator checking that returned tool data conforms to the expected contract.",
    ],
    codeSnippet: `// Schema-constrained execution
const toolResult = await executeWithBoundary({
  tool: "verify_norm_edition",
  params: { norm: "SIA 102", edition: 2024 },
  timeoutMs: 1200,
  fallback: () => ({ valid: false, error: "TIMEOUT" })
});`,
  },
  {
    id: "grounding",
    step: "04",
    title: "Grounded Synthesis & Bounding Boxes",
    role: "Traceable Document Synthesis",
    summary: "Every synthesized claim links to an exact document ID, verified edition date, and page bounding box.",
    details: [
      "Constraint-prompted synthesis strictly restricting model assertions to supplied retrieved context.",
      "Inline citation injection: `[DocID:Edition:Page:BoundingBox]` generated alongside text.",
      "Human-in-the-loop review interface allowing partners to click any claim and highlight the original PDF bounding box.",
    ],
    codeSnippet: `// Citation-anchored assertion
return {
  text: "Honorar calculation adheres to SIA 102 Art. 4.2.",
  citation: {
    docId: "sia-102-v2024",
    page: 18,
    bbox: [120, 340, 480, 395]
  }
};`,
  },
  {
    id: "eval",
    step: "05",
    title: "Safety Gates & Systematic Eval",
    role: "Continuous Regression Testing",
    summary: "Evaluation harnesses measuring context recall, answer faithfulness, and hallucination rates on real corpora.",
    details: [
      "Post-generation faithfulness validation: checks whether generated facts exist in retrieved source chunks.",
      "Automated evaluation harness running 160+ real test queries across diverse regulatory corpora.",
      "Regression test gates: failure-set replay running in CI to prevent regression on critical edge cases.",
    ],
    codeSnippet: `// Offline & inline evaluation gate
const evalMetrics = await runEvalHarness({
  contextRecall: measureRecallAtK(retrievedChunks, groundTruth),
  faithfulness: verifyClaimOverlap(draft, retrievedChunks),
  hallucinationThreshold: 0.02
});`,
  },
];

type TraceStep = {
  step: number;
  label: string;
  type: "input" | "gate" | "tool" | "retrieval" | "output";
  detail: string;
  data: string;
};

const illustrativeTraceSteps: TraceStep[] = [
  {
    step: 1,
    label: "User Query Received",
    type: "input",
    detail: "Partner requests proposal verification against building norms.",
    data: 'Query: "Verify proposal compliance against SIA 102 and draft Section 4 (Fee Calculation) with valid edition."',
  },
  {
    step: 2,
    label: "Pre-LLM Intent & Guardrail Gate",
    type: "gate",
    detail: "System verifies query is not speculative, identifies norm compliance requirement, and validates tenant auth.",
    data: "Intent: NORM_VERIFICATION_AND_DRAFT | Tenant: CH_PLAN_08 | Guardrail: PASSED (No PII leak, auth verified)",
  },
  {
    step: 3,
    label: "Deterministic Tool Execution",
    type: "tool",
    detail: "Executes `verify_norm_edition` to ensure the newest active SIA standard is enforced (rejects superseded 2014 edition).",
    data: "Call: verify_norm_edition({ norm: 'SIA 102', required_year: 2024 }) -> Result: { valid: true, active_edition: '2024-05' }",
  },
  {
    step: 4,
    label: "Hybrid Retrieval & Reranking",
    type: "retrieval",
    detail: "BM25 keyword search + dense vector retrieval across tenant proposal archive and official SIA corpus.",
    data: "Retrieved 20 chunks -> Cohere Cross-Encoder Rerank -> Top 3 selected (Scores: 0.96, 0.93, 0.89) | Tenant Isolation: STRICT",
  },
  {
    step: 5,
    label: "Grounded Synthesis & Bounding Box Injection",
    type: "output",
    detail: "Model synthesizes draft with strict source grounding, binding every calculation to document page and bounding coordinates.",
    data: "Draft generated with citation: [SIA 102:2024, Art. 4.2, p. 18, bbox: [120, 340, 480, 395]] | Eval Faithfulness: 1.0 (Zero ungrounded claims)",
  },
];

const accentStyles = {
  "--hero-accent": "#4285f4",
} as CSSProperties;

export function GoogleApplicationPage() {
  const [activePillarIdx, setActivePillarIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<"architecture" | "trace">("architecture");

  const currentPillar = agentArchitecturePillars[activePillarIdx];

  return (
    <DossierThemeProvider>
      <main
        className="dossier-page relative min-h-[100dvh] overflow-x-hidden"
        style={accentStyles}
      >
        <DossierBackground accentColor="#4285f4" />
        <SubpageHeader
          companyName="Google"
          roleTitle="Forward Deployed Engineer III (Zurich)"
          accentColor="#4285f4"
        />

        {/* HERO SECTION */}
        <section className="dossier-openai-hero relative z-[2] flex flex-col justify-between pt-2 pb-6 md:min-h-[calc(100dvh-57px)] md:py-10">
          <div className="dossier-openai-hero__main mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-start px-4 py-2 md:justify-center md:px-8 md:py-6">
            <div className="flex flex-col gap-4 md:grid md:grid-cols-[minmax(0,1fr)_minmax(200px,260px)] md:items-start md:gap-x-12 lg:gap-x-16">
              
              {/* Profile Card */}
              <aside className="dossier-openai-hero__photo hidden md:block w-full max-w-[220px] lg:max-w-[250px] shrink-0 md:col-start-2 md:row-start-1 md:mx-0">
                <div className="dossier-profile-frame aspect-[4/5] w-full rounded-2xl overflow-hidden border border-[var(--dossier-line-strong)] bg-[var(--dossier-panel)] shadow-sm">
                  <Image
                    src="/images/terence-la-profile.png"
                    alt="Terence La"
                    fill
                    sizes="(max-width: 768px) 180px, 250px"
                    className="dossier-profile-photo object-cover object-top"
                    priority
                  />
                  <div className="dossier-profile-caption absolute inset-x-0 bottom-0 z-[2] px-4 pb-4 pt-14 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                    <p className="text-sm font-semibold text-white">Terence La</p>
                    <p className="text-xs text-white/90">AI Lead @ Zurich Airport</p>
                    <p className="text-[11px] text-white/75">Founder @ KI Unlocked</p>
                  </div>
                </div>
              </aside>

              {/* Main Headline & Context */}
              <div className="max-w-[760px] md:col-start-1 md:row-start-1">
                {/* Mobile Identity Badge */}
                <div className="flex items-center gap-3 md:hidden mb-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[var(--dossier-line-strong)]">
                    <Image
                      src="/images/terence-la-profile.png"
                      alt="Terence La"
                      fill
                      sizes="44px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--dossier-ink)]">Terence La</p>
                    <p className="text-xs text-[var(--dossier-muted)]">AI Lead @ Zurich Airport · Founder @ KI Unlocked</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-[#4285f4]/30 bg-[#4285f4]/[0.08] px-3 py-1 text-xs font-medium text-[#4285f4]">
                  <span className="h-2 w-2 rounded-full bg-[#4285f4] animate-pulse" />
                  Google Applied AI · Forward Deployed Engineer III (Zurich)
                </div>

                <h1 className="dossier-hero-title mt-3 max-w-[18ch]" style={{ fontSize: "clamp(26px, 6.5vw, 56px)" }}>
                  I build AI agents and get them working in the real world.
                </h1>

                <p className="mt-3 max-w-[62ch] text-[14px] leading-relaxed text-[var(--dossier-body)] md:text-[16px] md:leading-[1.6]">
                  Forward Deployed Engineer candidate for Google Applied AI in Zurich. As AI Lead at Zurich Airport, I drove voice AI from concept through formal enterprise tender and consolidated fragmented platforms for ~35k staff. Through KI Unlocked, I architect, code, and ship agentic AI systems like Leistera that solve high-stakes document and workflow operations in regulated Swiss environments.
                </p>

                {/* Primary Action Buttons */}
                <div className="mt-4 flex flex-wrap items-center gap-2.5 md:mt-6">
                  <a
                    href="https://about.terencela.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dossier-button-primary dossier-cta-accent dossier-pressable inline-flex items-center gap-2 text-xs md:text-sm px-4 py-2"
                  >
                    Chat with TerenceAI
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="#video-walkthrough"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--dossier-line-strong)] bg-[var(--dossier-panel)] px-3.5 py-2 text-xs md:text-sm font-medium text-[var(--dossier-ink)] transition-colors hover:border-[#4285f4] hover:text-[#4285f4]"
                  >
                    <Play className="h-3 w-3 text-[#4285f4] fill-[#4285f4]" />
                    Watch 90s intro
                  </a>
                  <a
                    href="https://xp.terencela.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[12px] md:text-[13px] text-[var(--dossier-muted)] transition-colors hover:text-[var(--dossier-ink)]"
                  >
                    Discover TerenceXP
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>

                {/* Above-the-Fold Strongest Proof Strip */}
                <div className="mt-5 grid gap-2.5 sm:grid-cols-3 border-t border-[var(--dossier-line)] pt-4">
                  <div className="rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-3">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--dossier-muted)]">Aviation Voice AI</span>
                      <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-amber-700 dark:text-amber-400">PoC → Tender</span>
                    </div>
                    <p className="mt-1 text-base font-bold text-[var(--dossier-ink)]">~85K calls/yr</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-[var(--dossier-body)]">
                      8 FTE call center. Concept to PoC in 2 weeks; progressed to formal tender.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-3">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--dossier-muted)]">ZRH Insider</span>
                      <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700 dark:text-emerald-400">Shipped Rebuild</span>
                    </div>
                    <p className="mt-1 text-base font-bold text-[var(--dossier-ink)]">~35K staff</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-[var(--dossier-body)]">
                      Merged 2 native apps into 1 Capacitor foundation. Agency-quoted CHF 300K–350K.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-3">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--dossier-muted)]">Leistera Flagship</span>
                      <span className="rounded bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-blue-700 dark:text-blue-400">Active Delivery</span>
                    </div>
                    <p className="mt-1 text-base font-bold text-[var(--dossier-ink)]">Agentic RAG</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-[var(--dossier-body)]">
                      SIA/ASTRA norm intelligence. Exact PDF bounding-box source grounding.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Focused Credibility Strip */}
          <div className="dossier-openai-hero__logos mt-6 border-t border-[var(--dossier-line)] bg-[var(--dossier-panel)]/40 backdrop-blur-sm">
            <div className="mx-auto max-w-[1200px] px-4 py-3.5 md:px-8">
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-[12px] text-[var(--dossier-body)]">
                <span className="font-semibold text-[var(--dossier-ink)]">Track Record:</span>
                <span className="rounded-md border border-[var(--dossier-line)] px-2.5 py-1 font-medium text-[var(--dossier-ink)]">Zurich Airport (AI Lead)</span>
                <span className="rounded-md border border-[var(--dossier-line)] px-2.5 py-1 font-medium text-[var(--dossier-ink)]">KI Unlocked (Founder & Builder)</span>
                <span className="rounded-md border border-[var(--dossier-line)] px-2.5 py-1 font-medium text-[var(--dossier-ink)]">M.A. HSG (University of St. Gallen)</span>
                <span className="rounded-md border border-[var(--dossier-line)] px-2.5 py-1 text-[var(--dossier-muted)]">Forbes 30 Under 30</span>
                <span className="rounded-md border border-[var(--dossier-line)] px-2.5 py-1 text-[var(--dossier-muted)]">2x TEDx Speaker</span>
                <span className="rounded-md border border-[var(--dossier-line)] px-2.5 py-1 text-[var(--dossier-muted)]">PwC & Credit Suisse Alumni</span>
              </div>
            </div>
          </div>
        </section>

        {/* HANDS-ON ENGINEERING & AGENT ORCHESTRATION */}
        <section className="dossier-section relative z-[2] border-t border-[var(--dossier-line)] bg-[var(--dossier-panel)]/30 pt-10 pb-12">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4285f4]">
                  Hands-On Engineering
                </p>
                <h2 className="mt-1.5 text-[clamp(26px,3.2vw,38px)] font-semibold tracking-[-0.03em] text-[var(--dossier-ink)]">
                  How I build, orchestrate, and debug agents
                </h2>
              </div>
              <p className="max-w-[48ch] text-xs text-[var(--dossier-body)] md:text-sm">
                Engineering reality over buzzwords. Terence writes, reviews, and debugs code daily, using coordinated AI coding harnesses to ship reliable systems.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4285f4]/[0.08] text-[#4285f4] mb-4">
                  <Terminal className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-[var(--dossier-ink)]">Multi-Agent Coding Harness</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--dossier-body)]">
                  Writes and debugs code daily using <strong>Cursor, Claude Code, Codex, and ChatGPT</strong>. Orchestrates parallel agent workflows with strict &ldquo;Plan &rarr; Build &rarr; Verify &rarr; Check&rdquo; automated loops.
                </p>
              </div>

              <div className="rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4285f4]/[0.08] text-[#4285f4] mb-4">
                  <Workflow className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-[var(--dossier-ink)]">Schema-Strict Tool Execution</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--dossier-body)]">
                  Deterministic intent gating, JSON-schema tool contracts, execution boundaries, and fallback recovery. Keeps agent actions bounded and inspectable.
                </p>
              </div>

              <div className="rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4285f4]/[0.08] text-[#4285f4] mb-4">
                  <Database className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-[var(--dossier-ink)]">Retrieval & Exact Grounding</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--dossier-body)]">
                  Contextual chunking, hybrid BM25 + dense vector embeddings, Cohere cross-encoder reranking, and PDF bounding-box citation down to the exact edition and page.
                </p>
              </div>

              <div className="rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4285f4]/[0.08] text-[#4285f4] mb-4">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-[var(--dossier-ink)]">Eval Suites & Compliance Gates</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--dossier-body)]">
                  Pre-model regex guardrails, nDSG/GDPR privacy boundaries, and offline evaluation harnesses testing context recall@k, faithfulness, and refusal rates on real corpora.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE AGENT ARCHITECTURE & EXECUTION TRACE */}
        <section className="dossier-section relative z-[2] pt-8 pb-12">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4285f4]">
                  Technical Deep-Dive
                </p>
                <h2 className="mt-1 text-[clamp(26px,3.2vw,38px)] font-semibold tracking-[-0.03em] text-[var(--dossier-ink)]">
                  Architecture & Verified Workflows
                </h2>
              </div>

              {/* View Switcher */}
              <div className="inline-flex rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("architecture")}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === "architecture"
                      ? "bg-[#4285f4] text-white shadow-sm"
                      : "text-[var(--dossier-muted)] hover:text-[var(--dossier-ink)]"
                  }`}
                >
                  5-Stage Architecture
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("trace")}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === "trace"
                      ? "bg-[#4285f4] text-white shadow-sm"
                      : "text-[var(--dossier-muted)] hover:text-[var(--dossier-ink)]"
                  }`}
                >
                  Illustrative Execution Trace
                </button>
              </div>
            </div>

            {activeTab === "architecture" ? (
              <div className="mt-6 grid gap-6 lg:grid-cols-12">
                {/* Stage Navigator (5 cols) */}
                <div className="lg:col-span-5 space-y-2">
                  {agentArchitecturePillars.map((pillar, idx) => {
                    const isActive = activePillarIdx === idx;
                    return (
                      <button
                        key={pillar.id}
                        type="button"
                        onClick={() => setActivePillarIdx(idx)}
                        className={`w-full rounded-xl border p-4 text-left transition-all ${
                          isActive
                            ? "border-[#4285f4] bg-[#4285f4]/[0.06] shadow-sm"
                            : "border-[var(--dossier-line)] bg-[var(--dossier-panel)] hover:border-[var(--dossier-line-strong)]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-mono font-bold ${isActive ? "text-[#4285f4]" : "text-[var(--dossier-subtle)]"}`}>
                            STAGE {pillar.step}
                          </span>
                          <span className="text-[11px] font-medium text-[var(--dossier-muted)]">
                            {pillar.role}
                          </span>
                        </div>
                        <p className="mt-1 font-semibold text-sm text-[var(--dossier-ink)]">
                          {pillar.title}
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--dossier-body)] line-clamp-1">
                          {pillar.summary}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Stage Detail Panel (7 cols) */}
                <div className="lg:col-span-7 rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-6">
                  <div className="flex items-center justify-between border-b border-[var(--dossier-line)] pb-3">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#4285f4]">
                        STAGE {currentPillar.step} SPECIFICATION
                      </span>
                      <h3 className="text-lg font-bold text-[var(--dossier-ink)]">
                        {currentPillar.title}
                      </h3>
                    </div>
                    <span className="rounded-full bg-[#4285f4]/10 px-2.5 py-1 text-xs font-medium text-[#4285f4]">
                      {currentPillar.role}
                    </span>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium text-[var(--dossier-ink)]">
                      {currentPillar.summary}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {currentPillar.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[var(--dossier-body)] leading-relaxed">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#4285f4] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 rounded-lg border border-[var(--dossier-line-strong)] bg-[var(--dossier-dark)] p-3 text-zinc-100">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pb-2 border-b border-zinc-800">
                      <span>VERIFIED IMPLEMENTATION PATTERN</span>
                      <Code2 className="h-3.5 w-3.5 text-zinc-400" />
                    </div>
                    <pre className="mt-2 text-[11px] font-mono overflow-x-auto text-blue-300">
                      <code>{currentPillar.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[var(--dossier-line)] pb-3 gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#4285f4]">
                      ILLUSTRATIVE EXECUTION TRACE
                    </span>
                    <h3 className="text-base font-bold text-[var(--dossier-ink)]">
                      Swiss Planning Office: Proposal Norm Verification & Drafting
                    </h3>
                  </div>
                  <span className="rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-1 text-[11px] font-mono text-[var(--dossier-muted)]">
                    Labeled Sample Workflow
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  {illustrativeTraceSteps.map((step) => (
                    <div key={step.step} className="flex items-start gap-3.5 rounded-lg border border-[var(--dossier-line)] bg-[var(--dossier-panel)]/60 p-3.5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#4285f4] text-xs font-mono font-bold text-white">
                        {step.step}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <p className="text-xs font-bold text-[var(--dossier-ink)]">{step.label}</p>
                          <span className="text-[10px] uppercase font-mono font-semibold text-[#4285f4]">{step.type}</span>
                        </div>
                        <p className="mt-0.5 text-xs text-[var(--dossier-body)]">{step.detail}</p>
                        <div className="mt-2 rounded bg-zinc-950 px-3 py-1.5 font-mono text-[11px] text-zinc-300 overflow-x-auto">
                          {step.data}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 90-SECOND VIDEO WALKTHROUGH */}
        <section id="video-walkthrough" className="dossier-section relative z-[2] border-t border-[var(--dossier-line)] pt-8 pb-10">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4285f4]">
                  Personal Introduction
                </p>
                <h2 className="mt-1 text-[clamp(26px,3.2vw,38px)] font-semibold tracking-[-0.03em] text-[var(--dossier-ink)]">
                  90-second technical introduction
                </h2>
              </div>
            </div>
            <div className="mt-4">
              <LoomVideoFrame
                companyName="Google"
                roleTitle="Forward Deployed Engineer III (Zurich)"
                loomUrl="https://www.loom.com/share/054ec870f2c448928570797160ccc6b0"
                videoTitle="Quick Introduction"
                videoSubtitle="Who I am in 90 seconds."
                playInModal
                accentColor="#4285f4"
                showChapters={false}
              />
              <TerenceAIAskBar />
            </div>
          </div>
        </section>

        {/* THREE TECHNICALLY PRIORITIZED CASE STUDIES */}
        <section className="dossier-section relative z-[2] border-t border-[var(--dossier-line)] pt-8 pb-12">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4285f4]">
                Production & Delivery Cases
              </p>
              <h2 className="mt-1 text-[clamp(26px,3.5vw,40px)] font-semibold tracking-[-0.04em] text-[var(--dossier-ink)]">
                Three customer-facing AI deployments
              </h2>
              <p className="mt-1.5 max-w-[60ch] text-xs text-[var(--dossier-body)] md:text-sm">
                Structured technical breakdown: Problem &gt; Architecture & Technical Decisions &gt; Terence&apos;s Direct Contribution &gt; Verified Outcome &gt; Current Status.
              </p>
            </div>

            <div className="mt-8 space-y-8">
              {technicalCases.map((cs) => (
                <article
                  key={cs.id}
                  className="rounded-2xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-5 md:p-7 shadow-sm transition-all"
                >
                  {/* Top Bar with Status Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--dossier-line)] pb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--dossier-muted)]">
                        {cs.badge}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          cs.badgeTone === "amber"
                            ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                            : cs.badgeTone === "emerald"
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                            : "bg-blue-500/15 text-blue-700 dark:text-blue-300"
                        }`}
                      >
                        {cs.statusText}
                      </span>
                    </div>

                    {cs.link && (
                      <a
                        href={cs.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4285f4] hover:underline"
                      >
                        {cs.link.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mt-4">
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[var(--dossier-ink)]">
                      {cs.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--dossier-body)]">
                      {cs.subtitle}
                    </p>
                  </div>

                  {/* Metrics Strip */}
                  <div className="mt-4 flex flex-wrap gap-4 rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)]/50 p-3">
                    {cs.stats.map((stat) => (
                      <div key={stat.label} className="min-w-[120px]">
                        <p className="text-base md:text-lg font-bold text-[var(--dossier-ink)]">{stat.value}</p>
                        <p className="text-[11px] text-[var(--dossier-muted)]">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Technical Breakdown Grid */}
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {/* Problem & Contribution */}
                    <div className="space-y-5">
                      <div>
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#4285f4]">
                          1. Problem & Customer Constraints
                        </h4>
                        <p className="mt-1.5 text-xs md:text-[13px] leading-relaxed text-[var(--dossier-body)]">
                          {cs.problem}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#4285f4]">
                          2. Terence&apos;s Direct Contribution
                        </h4>
                        <ul className="mt-1.5 space-y-1.5">
                          {cs.directContribution.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs md:text-[13px] leading-relaxed text-[var(--dossier-body)]">
                              <span className="text-[#4285f4] font-bold mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Architecture Decisions */}
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#4285f4]">
                        3. Architecture & Technical Decisions
                      </h4>
                      <ul className="mt-1.5 space-y-2 rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)]/40 p-4">
                        {cs.architecture.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs md:text-[13px] leading-relaxed text-[var(--dossier-body)]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#4285f4] shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Outcome & Current Status Banner */}
                  <div className="mt-6 rounded-xl border border-[var(--dossier-line-strong)] bg-[var(--dossier-panel)]/80 p-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--dossier-muted)]">
                          Verified Outcome
                        </p>
                        <p className="mt-1 text-xs md:text-[13px] font-medium leading-relaxed text-[var(--dossier-ink)]">
                          {cs.verifiedOutcome}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--dossier-muted)]">
                          Current Deployment Status
                        </p>
                        <p className="mt-1 text-xs md:text-[13px] leading-relaxed text-[var(--dossier-body)]">
                          {cs.currentStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CURATED WORKING APPLIED AI PROJECTS */}
        <section className="dossier-section relative z-[2] border-t border-[var(--dossier-line)] pt-8 pb-12">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4285f4]">
                  Portfolio Range
                </p>
                <h2 className="mt-1 text-[clamp(26px,3.2vw,38px)] font-semibold tracking-[-0.03em] text-[var(--dossier-ink)]">
                  Selected applied AI builds
                </h2>
              </div>
              <p className="max-w-[44ch] text-xs text-[var(--dossier-muted)]">
                Tested products, developer tools, and operational systems built to solve real workflows.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {curatedProjects.map((proj) => (
                <div
                  key={proj.name}
                  className="rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-5 flex flex-col justify-between transition-all hover:border-[var(--dossier-line-strong)]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-[var(--dossier-muted)]">{proj.category}</span>
                      <span className="rounded bg-[#4285f4]/10 px-2 py-0.5 text-[10px] font-semibold text-[#4285f4]">
                        {proj.statusBadge}
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-[var(--dossier-ink)]">{proj.name}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[var(--dossier-body)]">{proj.description}</p>
                    
                    <div className="mt-3 rounded-lg bg-[var(--dossier-line)]/20 p-2.5 text-[11px] leading-snug text-[var(--dossier-body)]">
                      <span className="font-semibold text-[var(--dossier-ink)]">Technical Core: </span>
                      {proj.technicalHighlight}
                    </div>
                  </div>

                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#4285f4] transition-colors hover:underline"
                    >
                      View Live Build
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GOOGLE APPLIED AI FDE CLOSING CTA */}
        <section className="dossier-section relative z-[2] border-t border-[var(--dossier-line)] pt-8 pb-16">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <div className="rounded-2xl border border-[var(--dossier-line-strong)] bg-[var(--dossier-panel)] p-6 md:p-10 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#4285f4]/30 bg-[#4285f4]/[0.08] px-3 py-1 text-xs font-medium text-[#4285f4]">
                Forward Deployed Engineer III · Applied AI (Zurich)
              </div>

              <h2 className="mt-4 text-[clamp(28px,3.8vw,46px)] font-bold tracking-[-0.03em] text-[var(--dossier-ink)]">
                Ready to deploy with your Zurich Applied AI team.
              </h2>

              <p className="mt-3 max-w-[58ch] text-sm md:text-base leading-relaxed text-[var(--dossier-body)]">
                Let&apos;s spend 30 minutes walking through live agent architectures, real customer delivery tradeoffs in Swiss enterprises, debugging edge cases, and moving high-value accounts from initial PoC to production scale.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/terencela"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dossier-button-primary dossier-cta-accent dossier-pressable inline-flex items-center gap-2 text-sm"
                >
                  Connect on LinkedIn
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="https://about.terencela.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--dossier-line-strong)] bg-[var(--dossier-panel)] px-4 py-2.5 text-sm font-medium text-[var(--dossier-ink)] transition-colors hover:border-[#4285f4] hover:text-[#4285f4]"
                >
                  <Bot className="h-4 w-4 text-[#4285f4]" />
                  Chat with TerenceAI
                </a>

                <a
                  href="https://xp.terencela.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs md:text-[13px] text-[var(--dossier-muted)] transition-colors hover:text-[var(--dossier-ink)]"
                >
                  Explore TerenceXP
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </DossierThemeProvider>
  );
}
