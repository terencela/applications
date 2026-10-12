"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Database,
  Filter,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";

export type ArchNodeId =
  | "user"
  | "orchestrator"
  | "retrieval"
  | "validation"
  | "generation"
  | "evaluation"
  | "response";

type ArchNode = {
  id: ArchNodeId;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  role: string;
  inputs: string;
  outputs: string;
  failureMode: string;
  codeSnippet: string;
};

const ARCH_NODES: ArchNode[] = [
  {
    id: "user",
    title: "User Request",
    subtitle: "Multilingual query entry",
    icon: MessageSquare,
    role: "Captures natural-language questions across Swiss German dialects, standard German, French, or English.",
    inputs: "Client session, raw query string, user tenant identifier.",
    outputs: "Normalized UTF-8 token stream with tenant scoping metadata.",
    failureMode: "Token overrun (>2048 tokens) or rapid rate-limit threshold violations.",
    codeSnippet: `// Intake Normalizer
export function normalizeQuery(raw: string, tenantId: string) {
  const sanitized = raw.trim().slice(0, 2048);
  return { tenantId, query: sanitized, timestamp: Date.now() };
}`,
  },
  {
    id: "orchestrator",
    title: "Orchestrator & Guardrail",
    subtitle: "Deterministic pre-LLM gates",
    icon: ShieldCheck,
    role: "Pre-model regex scanning for Swiss PII (passports, AHV, IBAN) and domain boundary enforcement before expensive inference.",
    inputs: "Normalized query payload, tenant policy config.",
    outputs: "Sanitized query tokens, intent routing decision (RAG / Tool Call / Refusal).",
    failureMode: "PII leakage, out-of-domain financial speculation or jailbreak attempts.",
    codeSnippet: `// Sovereign PII & Intent Gate
if (isOutOfDomain(query)) return triggerRefusal("UNGROUNDED_DOMAIN");
const sanitized = query.replace(/X\\d{7}/g, "[REDACTED_PII_PASSPORT]");
return routePipeline(sanitized);`,
  },
  {
    id: "retrieval",
    title: "Retrieval & Tool Calling",
    subtitle: "BM25 + Dense Vectors + Cohere",
    icon: Database,
    role: "Dual-track retrieval: sparse BM25 for strict article/norm numbers + dense semantic embeddings + Cohere cross-encoder rerank.",
    inputs: "Sanitized query, tenant corpus index partition.",
    outputs: "Ranked Top-K passages with relevance confidence scores and document IDs.",
    failureMode: "Low score threshold (<0.35 similarity) triggering automated clarification or zero-result fallback.",
    codeSnippet: `// Hybrid Retrieval & Cohere Cross-Encoder
const sparse = await bm25Search(query, { k: 20 });
const dense = await vectorSearch(embed(query), { k: 20 });
const fused = reciprocalRankFusion(sparse, dense);
return cohereRerank(query, fused.slice(0, 5));`,
  },
  {
    id: "validation",
    title: "Evidence Validation",
    subtitle: "Norm edition & boundary check",
    icon: Filter,
    role: "Validates that retrieved passages come from current, in-force norm editions (e.g. SIA 102 2020 vs outdated 2014) and verifies page boundaries.",
    inputs: "Top-ranked candidate passages, official norm registry.",
    outputs: "Verified passages with exact PDF bounding-box coordinates (x, y, w, h).",
    failureMode: "Outdated norm editions, ambiguous edition dates, or missing page numbers.",
    codeSnippet: `// Verified Edition & Bounding Box Check
const isValidEdition = checkNormRegistry(doc.normId, doc.editionDate);
if (!isValidEdition) throw new OutdatedNormException(doc.normId);
return extractBBoxCoordinates(doc.pageId);`,
  },
  {
    id: "generation",
    title: "Answer Generation",
    subtitle: "Strictly grounded synthesis",
    icon: Sparkles,
    role: "Synthesizes answer constrained strictly to verified evidence chunks. Forces explicit citation tags `[DOC-ID §X.Y, p. Z]`.",
    inputs: "Validated passages, sanitized query, system prompt with strict refusal instructions.",
    outputs: "Synthesized candidate response text with bracketed citation markers.",
    failureMode: "Hallucinated statements unsupported by the context passage.",
    codeSnippet: `// Strict Context-Constrained Generation
const prompt = formatPrompt({
  context: verifiedChunks,
  rule: "Cite exact document ID and page. If unsupported, refuse.",
});
return generateCompletion(prompt);`,
  },
  {
    id: "evaluation",
    title: "Offline Eval & Safety Gate",
    subtitle: "Faithfulness & recall harness",
    icon: Terminal,
    role: "Automated regression testing measuring Context Recall@K, Answer Faithfulness (0-100%), and Hallucination Risk before payload release.",
    inputs: "Generated response, source passages, gold evaluation benchmarks.",
    outputs: "Pass/Fail decision, faithfulness score, latency breakdown.",
    failureMode: "Faithfulness score <95% or refusal failure on adversarial test queries.",
    codeSnippet: `// Continuous Eval Harness
const faithfulness = computeFaithfulness(answer, sourcePassages);
if (faithfulness < 0.95) return triggerHumanReviewQueue();
return releaseToClient({ answer, faithfulness });`,
  },
  {
    id: "response",
    title: "Verified Response",
    subtitle: "Auditable client delivery",
    icon: CheckCircle2,
    role: "Streams verified answer to client with interactive citations, highlighted PDF bounding boxes, and immutable audit logs.",
    inputs: "Passed response payload, execution trace telemetry.",
    outputs: "Client UI render, OpenTelemetry trace record, compliance audit entry.",
    failureMode: "Client stream interruption or network timeout.",
    codeSnippet: `// Audit-Logged Response Stream
logComplianceAudit({ queryHash, docIds, latencyMs, evalPass: true });
return streamResponseWithCitations(payload);`,
  },
];

export function GoogleAgentArchitecture({
  activeNodeId,
}: {
  activeNodeId?: string | null;
}) {
  const [selectedNodeId, setSelectedNodeId] = useState<ArchNodeId>("orchestrator");

  const currentNodeId = (activeNodeId as ArchNodeId) || selectedNodeId;
  const activeNode = ARCH_NODES.find((n) => n.id === currentNodeId) ?? ARCH_NODES[1];

  return (
    <div className="w-full rounded-2xl border border-[var(--dossier-line-strong)] bg-[var(--dossier-panel)] p-5 md:p-7 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-[var(--dossier-line)] pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4285f4]">
            End-to-End System Architecture
          </span>
          <h3 className="mt-1 text-lg md:text-xl font-bold tracking-tight text-[var(--dossier-ink)]">
            Production Agent Orchestration Pipeline
          </h3>
        </div>
        <p className="text-xs text-[var(--dossier-muted)] max-w-[44ch]">
          Click any architecture node to inspect its specific role, inputs, outputs, failure modes, and code contracts.
        </p>
      </div>

      {/* Horizontal Interactive Pipeline Strip */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 overflow-x-auto pb-2">
        {ARCH_NODES.map((node, idx) => {
          const isSelected = node.id === currentNodeId;
          const Icon = node.icon;
          return (
            <React.Fragment key={node.id}>
              <button
                type="button"
                onClick={() => setSelectedNodeId(node.id)}
                className={`flex flex-col items-center p-3 rounded-xl border transition-all text-center min-w-[125px] flex-1 ${
                  isSelected
                    ? "border-[#4285f4] bg-[#4285f4]/15 shadow-md scale-[1.02]"
                    : "border-[var(--dossier-line)] bg-[var(--dossier-panel)]/70 hover:border-[var(--dossier-line-strong)]"
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg mb-2 transition-colors ${
                    isSelected
                      ? "bg-[#4285f4] text-white"
                      : "bg-[var(--dossier-line)] text-[var(--dossier-body)]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-[var(--dossier-ink)] line-clamp-1">
                  {node.title}
                </span>
                <span className="text-[10px] text-[var(--dossier-muted)] line-clamp-1 mt-0.5">
                  {node.subtitle}
                </span>
              </button>
              {idx < ARCH_NODES.length - 1 && (
                <ArrowRight className="hidden lg:block h-3.5 w-3.5 text-[var(--dossier-subtle)] shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Selected Node Inspector Pane */}
      <div className="mt-6 rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)]/40 p-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="rounded bg-[#4285f4]/10 border border-[#4285f4]/30 px-2 py-0.5 text-[10px] font-mono font-bold text-[#4285f4] uppercase">
                Node Specification: {activeNode.id}
              </span>
              <h4 className="text-base font-bold text-[var(--dossier-ink)]">
                {activeNode.title} &middot; {activeNode.subtitle}
              </h4>
            </div>

            <p className="text-xs leading-relaxed text-[var(--dossier-body)]">
              {activeNode.role}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="rounded-lg border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-2.5">
                <span className="text-[10px] font-mono uppercase font-bold text-[var(--dossier-muted)]">
                  Input Contract
                </span>
                <p className="mt-1 text-[11px] text-[var(--dossier-ink)]">{activeNode.inputs}</p>
              </div>

              <div className="rounded-lg border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-2.5">
                <span className="text-[10px] font-mono uppercase font-bold text-[var(--dossier-muted)]">
                  Output Contract
                </span>
                <p className="mt-1 text-[11px] text-[var(--dossier-ink)]">{activeNode.outputs}</p>
              </div>
            </div>

            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5 text-xs">
              <span className="text-[10px] font-mono uppercase font-bold text-amber-500">
                Guarded Failure Mode &amp; Fallback
              </span>
              <p className="mt-1 text-[11px] text-[var(--dossier-body)]">{activeNode.failureMode}</p>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl border border-[var(--dossier-line-strong)] bg-[var(--dossier-dark)] p-3 text-zinc-100 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-[10px] text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Code2 className="h-3.5 w-3.5 text-blue-400" />
                IMPLEMENTATION CONTRACT
              </span>
              <span>TypeScript / Node</span>
            </div>
            <pre className="mt-2.5 overflow-x-auto text-[11px] text-blue-300 leading-relaxed">
              <code>{activeNode.codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
