"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Database,
  Filter,
  Layers,
  MessageSquare,
  ShieldCheck,
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
    title: "User Intake",
    subtitle: "Dialect & encoding normalization",
    icon: MessageSquare,
    role: "Captures natural-language questions across Swiss German dialects, standard German, French, or English.",
    inputs: "Client session, raw query string, tenant identifier.",
    outputs: "Normalized UTF-8 token stream with tenant scoping metadata.",
    failureMode: "Token overrun (>2048 tokens) or rapid rate-limit threshold violations.",
    codeSnippet: `export function normalizeQuery(raw: string, tenantId: string) {
  const sanitized = raw.trim().slice(0, 2048);
  return { tenantId, query: sanitized, timestamp: Date.now() };
}`,
  },
  {
    id: "orchestrator",
    title: "Orchestrator",
    subtitle: "Sovereign PII & boundary guardrails",
    icon: ShieldCheck,
    role: "Pre-model regex scanning for Swiss PII (passports, AHV, IBAN) and domain boundary enforcement before inference.",
    inputs: "Normalized query payload, tenant policy config.",
    outputs: "Sanitized query tokens, intent routing decision (RAG, Tool Call, Refusal).",
    failureMode: "PII leakage, out-of-domain financial speculation or prompt injection attempts.",
    codeSnippet: `if (isOutOfDomain(query)) return triggerRefusal("UNGROUNDED_DOMAIN");
const sanitized = query.replace(/X\\d{7}/g, "[REDACTED_PII_PASSPORT]");
return routePipeline(sanitized);`,
  },
  {
    id: "retrieval",
    title: "Hybrid Search",
    subtitle: "BM25 + dense vectors + rerank",
    icon: Database,
    role: "Dual-track retrieval: sparse BM25 for strict article numbers, dense semantic embeddings, and Cohere cross-encoder rerank.",
    inputs: "Sanitized query, tenant corpus index partition.",
    outputs: "Ranked Top-K passages with relevance confidence scores and document IDs.",
    failureMode: "Low score threshold (<0.35 similarity) triggering automated clarification or zero-result fallback.",
    codeSnippet: `const sparse = await bm25Search(query, { k: 20 });
const dense = await vectorSearch(embed(query), { k: 20 });
const fused = reciprocalRankFusion(sparse, dense);
return cohereRerank(query, fused.slice(0, 5));`,
  },
  {
    id: "validation",
    title: "Norm Gate",
    subtitle: "Edition currency & page bounds",
    icon: Filter,
    role: "Validates that retrieved passages come from current, in-force norm editions (e.g. SIA 102 2020 vs outdated editions) and verifies page boundaries.",
    inputs: "Top-ranked candidate passages, official norm registry.",
    outputs: "Verified passages with exact PDF bounding-box coordinates (x, y, w, h).",
    failureMode: "Outdated norm editions, ambiguous edition dates, or missing page numbers.",
    codeSnippet: `const isValidEdition = checkNormRegistry(doc.normId, doc.editionDate);
if (!isValidEdition) throw new OutdatedNormException(doc.normId);
return extractBBoxCoordinates(doc.pageId);`,
  },
  {
    id: "generation",
    title: "Synthesis",
    subtitle: "Strictly grounded generation",
    icon: Layers,
    role: "Synthesizes answer constrained strictly to verified evidence chunks with explicit citation tags.",
    inputs: "Validated passages, sanitized query, system prompt with strict refusal instructions.",
    outputs: "Synthesized candidate response text with bracketed citation markers.",
    failureMode: "Hallucinated statements unsupported by the context passage.",
    codeSnippet: `const prompt = formatPrompt({
  context: verifiedChunks,
  rule: "Cite exact document ID and page. If unsupported, refuse.",
});
return generateCompletion(prompt);`,
  },
  {
    id: "evaluation",
    title: "Eval Gate",
    subtitle: "Recall & faithfulness regression",
    icon: CheckCircle2,
    role: "Automated regression testing measuring Context Recall@K, Answer Faithfulness (0-100%), and Hallucination Risk before release.",
    inputs: "Generated response, source passages, gold evaluation benchmarks.",
    outputs: "Pass/Fail decision, faithfulness score, latency breakdown.",
    failureMode: "Faithfulness score <95% or refusal failure on adversarial test queries.",
    codeSnippet: `const faithfulness = computeFaithfulness(answer, sourcePassages);
if (faithfulness < 0.95) return triggerHumanReviewQueue();
return releaseToClient({ answer, faithfulness });`,
  },
  {
    id: "response",
    title: "Audited Stream",
    subtitle: "Client render & OpenTelemetry",
    icon: CheckCircle2,
    role: "Streams verified answer to client with interactive citations, highlighted PDF bounding boxes, and immutable audit logs.",
    inputs: "Passed response payload, execution trace telemetry.",
    outputs: "Client UI render, OpenTelemetry trace record, compliance audit entry.",
    failureMode: "Client stream interruption or network timeout.",
    codeSnippet: `logComplianceAudit({ queryHash, docIds, latencyMs, evalPass: true });
return streamResponseWithCitations(payload);`,
  },
];

export function GoogleAgentArchitecture() {
  const [selectedId, setSelectedId] = useState<ArchNodeId>("orchestrator");
  const activeNode = ARCH_NODES.find((n) => n.id === selectedId) ?? ARCH_NODES[1];

  return (
    <div className="w-full rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-5 md:p-7 space-y-6">
      <div className="border-b border-[var(--dossier-line)] pb-4">
        <h3 className="text-base font-semibold tracking-tight text-[var(--dossier-ink)]">
          Production Agent Pipeline Architecture
        </h3>
        <p className="mt-1 text-xs text-[var(--dossier-muted)]">
          Select any pipeline stage to inspect its runtime contract, data boundaries, and guarded failure modes.
        </p>
      </div>

      {/* Stage selector strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {ARCH_NODES.map((node, idx) => {
          const active = node.id === selectedId;
          const Icon = node.icon;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedId(node.id)}
              className={`flex flex-col items-start p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                active
                  ? "border-[#8ab4f8] bg-[#8ab4f8]/[0.06]"
                  : "border-[var(--dossier-line)] bg-transparent hover:border-[var(--dossier-line-strong)]"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <Icon className={`h-4 w-4 ${active ? "text-[#8ab4f8]" : "text-[var(--dossier-muted)]"}`} />
                <span className="text-[10px] font-mono text-[var(--dossier-muted)]">0{idx + 1}</span>
              </div>
              <span className="text-xs font-medium text-[var(--dossier-ink)]">
                {node.title}
              </span>
              <span className="text-[10px] text-[var(--dossier-muted)] mt-0.5 leading-tight">
                {node.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Inspected stage contract */}
      <div className="rounded-lg border border-[var(--dossier-line)] bg-[var(--dossier-dark)] p-4 md:p-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7 space-y-3.5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[var(--dossier-ink)]">
                  {activeNode.title}
                </span>
                <span className="text-xs text-[var(--dossier-muted)]">
                  &middot; {activeNode.subtitle}
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--dossier-body)]">
                {activeNode.role}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="rounded-lg border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-2.5">
                <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--dossier-subtle)] block mb-1">
                  Input Contract
                </span>
                <p className="text-xs text-[var(--dossier-ink)] leading-snug">{activeNode.inputs}</p>
              </div>

              <div className="rounded-lg border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-2.5">
                <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--dossier-subtle)] block mb-1">
                  Output Contract
                </span>
                <p className="text-xs text-[var(--dossier-ink)] leading-snug">{activeNode.outputs}</p>
              </div>
            </div>

            <div className="rounded-lg border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-2.5 text-xs">
              <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--dossier-subtle)] block mb-1">
                Guarded Failure Mode &amp; Fallback
              </span>
              <p className="text-xs text-[var(--dossier-body)] leading-snug">{activeNode.failureMode}</p>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-lg border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--dossier-line)] text-[11px] text-[var(--dossier-muted)]">
              <span>Contract implementation</span>
              <span>TypeScript</span>
            </div>
            <pre className="mt-2.5 overflow-x-auto text-[11px] text-[var(--dossier-ink)] leading-relaxed font-mono">
              <code>{activeNode.codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
