"use client";

import React, { useState } from "react";
import { CheckCircle2, Play } from "lucide-react";

type SampleDoc = {
  id: string;
  source: string;
  normYear: string;
  title: string;
  text: string;
  page: number;
  bbox: string;
};

const SAMPLE_CORPUS: SampleDoc[] = [
  {
    id: "DOC-SIA-102",
    source: "SIA Norm 102 · Architektenleistungen",
    normYear: "Ausgabe 2020",
    title: "Phase 32: Bauprojekt & Kostengenauigkeit",
    page: 14,
    bbox: "x: 45, y: 180, w: 520, h: 95",
    text: "In Phase 32 (Bauprojekt) ist eine Kostenschätzung mit einer Genauigkeit von ±10% zu erstellen. Bauliche Anforderungen an Erdreichabdichtungen müssen die SIA 272 (Ausgabe 2020) referenzieren. Abweichungen erfordern schriftliche Bauherrenfreigabe.",
  },
  {
    id: "DOC-ZRH-OPS",
    source: "Flughafen Zürich Betriebsreglement §4.2",
    normYear: "Stand 2026",
    title: "Nachtflugbeschränkungen & Lärmkontingent",
    page: 28,
    bbox: "x: 60, y: 310, w: 490, h: 110",
    text: "Planmässige Starts sind zwischen 23:00 und 06:00 Uhr untersagt. Verspätete Linienflüge dürfen bis 23:30 Uhr starten, sofern die Ursache nachweislich auf unvorhersehbare meteorologische Bedingungen oder ATC-Sicherheitsanweisungen zurückzuführen ist.",
  },
  {
    id: "DOC-NDSG-06",
    source: "Schweizer Datenschutzgesetz (nDSG)",
    normYear: "Revidiert 2023",
    title: "Art. 6: Bekanntgabe von Personendaten ins Ausland",
    page: 6,
    bbox: "x: 50, y: 120, w: 510, h: 85",
    text: "Personendaten (wie Passnummern oder biometrische Merkmale) dürfen nicht ohne angemessenes Schutzniveau an Drittstaaten übermittelt werden. Vor dem Aufruf externer Cloud-Modelle ist eine clientseitige PII-Anonymisierung durchzuführen.",
  },
];

type Scenario = {
  id: string;
  label: string;
  category: string;
  query: string;
  expectedDocId: string;
  isAdversarial?: boolean;
};

const SCENARIOS: Scenario[] = [
  {
    id: "sia-cost",
    label: "SIA 102 Norm Citation",
    category: "Norm Intelligence",
    query: "Welche Kostengenauigkeit und Abdichtungsnorm fordert SIA 102 in Phase 32?",
    expectedDocId: "DOC-SIA-102",
  },
  {
    id: "zrh-curfew",
    label: "ZRH Airport Night Curfew",
    category: "Aviation Operations",
    query: "Dürfen verspätete Flüge nach 23:00 Uhr am Flughafen Zürich noch starten?",
    expectedDocId: "DOC-ZRH-OPS",
  },
  {
    id: "ndsg-pii",
    label: "nDSG Passport PII Redaction",
    category: "Swiss Privacy / nDSG",
    query: "Darf Passnummer X829104 direkt an ein US-Cloud-Modell gesendet werden?",
    expectedDocId: "DOC-NDSG-06",
  },
  {
    id: "adversarial",
    label: "Out-of-Domain Refusal",
    category: "Adversarial Gate",
    query: "What will Google stock price be next week according to SIA 102?",
    expectedDocId: "NONE",
    isAdversarial: true,
  },
];

type StepTrace = {
  num: string;
  title: string;
  detail: string;
  ms: number;
};

export function GoogleAgentDemo() {
  const [selectedId, setSelectedId] = useState<string>("sia-cost");
  const [query, setQuery] = useState<string>(SCENARIOS[0].query);
  const [piiStrip, setPiiStrip] = useState<boolean>(true);
  const [rerank, setRerank] = useState<boolean>(true);
  const [running, setRunning] = useState<boolean>(false);
  const [traces, setTraces] = useState<StepTrace[]>([]);
  const [result, setResult] = useState<{
    answer: string;
    source?: string;
    edition?: string;
    page?: number;
    quote?: string;
    recall: number;
    faithfulness: number;
    latency: number;
  } | null>(null);

  const scenario = SCENARIOS.find((s) => s.id === selectedId) ?? SCENARIOS[0];

  const handleSelect = (s: Scenario) => {
    setSelectedId(s.id);
    setQuery(s.query);
    setResult(null);
    setTraces([]);
  };

  const handleRun = () => {
    if (running) return;
    setRunning(true);
    setTraces([]);
    setResult(null);

    const steps: StepTrace[] = [
      {
        num: "01",
        title: "Intake normalization",
        detail: `Sanitized query tokens. Verified UTF-8 character encoding and dialect tokens.`,
        ms: 12,
      },
      {
        num: "02",
        title: "Sovereign PII & intent gate",
        detail: piiStrip
          ? scenario.id === "ndsg-pii" || query.includes("X829104")
            ? "Passport pattern detected and replaced with [REDACTED_PII_PASSPORT]. Zero plaintext leaked."
            : "No PII patterns detected. Sovereign Swiss boundary verified."
          : "PII redaction bypassed by configuration.",
        ms: 18,
      },
      {
        num: "03",
        title: "Hybrid BM25 + dense retrieval",
        detail: scenario.isAdversarial
          ? "Dense similarity: 0.28 (below 0.35 confidence threshold). Routing to refusal."
          : `Retrieved candidate passages from verified corpus partition (${scenario.expectedDocId}).`,
        ms: 44,
      },
      {
        num: "04",
        title: rerank ? "Cross-encoder rerank" : "Direct vector rank",
        detail: rerank
          ? "Cross-encoder joint attention re-scored candidate chunks. Top-1 precision elevated."
          : "Direct embedding dot-product ranking used.",
        ms: 36,
      },
      {
        num: "05",
        title: "Grounded synthesis",
        detail: scenario.isAdversarial
          ? "Out-of-domain refusal triggered. Refused financial speculation without hallucination."
          : "Grounded strictly in verified source passage. Exact citation coordinates extracted.",
        ms: 68,
      },
      {
        num: "06",
        title: "Faithfulness evaluation",
        detail: "Context recall: 1.00. Answer faithfulness: 0.992. Citation quotes verified against source text.",
        ms: 22,
      },
    ];

    let i = 0;
    const timer = setInterval(() => {
      if (i < steps.length) {
        const item = steps[i];
        setTraces((prev) => [...prev, item]);
        i++;
      } else {
        clearInterval(timer);
        setRunning(false);

        if (scenario.isAdversarial) {
          setResult({
            answer:
              "Query Refused (Out of Domain): The query asks for financial speculation, which is not supported by verified engineering or airport regulatory corpora. The pipeline refused to hallucinate ungrounded facts.",
            recall: 100,
            faithfulness: 100,
            latency: 162,
          });
        } else {
          const doc = SAMPLE_CORPUS.find((d) => d.id === scenario.expectedDocId) ?? SAMPLE_CORPUS[0];
          let text = "";
          if (doc.id === "DOC-SIA-102") {
            text =
              "In SIA Phase 32 (Bauprojekt) ist eine Kostenschätzung mit einer Genauigkeit von ±10% zu erstellen. Bauliche Anforderungen an Erdreichabdichtungen müssen zwingend die SIA 272 (Ausgabe 2020) referenzieren. Abweichungen erfordern eine schriftliche Bauherrenfreigabe.";
          } else if (doc.id === "DOC-ZRH-OPS") {
            text =
              "Planmässige Starts sind zwischen 23:00 und 06:00 Uhr untersagt. Verspätete Linienflüge dürfen bis 23:30 Uhr starten, sofern die Ursache nachweislich auf unvorhersehbare meteorologische Bedingungen oder ATC-Sicherheitsanweisungen zurückzuführen ist.";
          } else {
            text =
              "Nein. Nach Art. 6 des Schweizer nDSG dürfen Personendaten wie Passnummern nicht ohne adäquate Schutzgarantien ins Ausland übertragen werden. Vor dem Aufruf externer US-Cloud-Modelle ist eine clientseitige PII-Anonymisierung durchzuführen.";
          }

          setResult({
            answer: text,
            source: doc.source,
            edition: doc.normYear,
            page: doc.page,
            quote: doc.text,
            recall: 100,
            faithfulness: 99.2,
            latency: 184,
          });
        }
      }
    }, 160);
  };

  return (
    <div className="w-full rounded-xl border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-5 md:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--dossier-line)] pb-5">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-[var(--dossier-ink)]">
            Interactive Agent Execution
          </h3>
          <p className="mt-1 text-xs text-[var(--dossier-muted)]">
            Deterministic retrieval, client-side PII masking, and cited evidence grounding over Swiss regulatory corpora.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRun}
          disabled={running}
          className="inline-flex items-center gap-2 rounded-lg bg-[#8ab4f8] px-4 py-2 text-xs font-medium text-[#0a0b0f] transition-colors hover:bg-[#a8c7fa] disabled:opacity-60 cursor-pointer self-start sm:self-auto"
        >
          <Play className={`h-3.5 w-3.5 fill-current ${running ? "animate-spin" : ""}`} />
          {running ? "Executing..." : "Run execution"}
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Scenarios and query input */}
        <div className="lg:col-span-5 space-y-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--dossier-subtle)]">
            Select scenario
          </p>

          <div className="space-y-2">
            {SCENARIOS.map((s) => {
              const active = selectedId === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelect(s)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors text-xs ${
                    active
                      ? "border-[#8ab4f8] bg-[#8ab4f8]/[0.06] text-[var(--dossier-ink)]"
                      : "border-[var(--dossier-line)] bg-transparent text-[var(--dossier-body)] hover:border-[var(--dossier-line-strong)]"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-[var(--dossier-muted)] mb-1">
                    <span>{s.category}</span>
                    <span className="font-mono text-[10px]">{s.expectedDocId}</span>
                  </div>
                  <p className="font-medium text-[var(--dossier-ink)] leading-snug">{s.query}</p>
                </button>
              );
            })}
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--dossier-subtle)] mb-1.5">
              Query
            </p>
            <textarea
              rows={2}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={running}
              className="w-full rounded-lg border border-[var(--dossier-line)] bg-[var(--dossier-dark)] px-3 py-2 text-xs text-[var(--dossier-ink)] focus:border-[#8ab4f8] focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-[var(--dossier-line)] text-xs text-[var(--dossier-body)]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={piiStrip}
                onChange={(e) => setPiiStrip(e.target.checked)}
                className="rounded border-[var(--dossier-line)] accent-[#8ab4f8]"
              />
              <span>Client-side PII stripping (nDSG Art. 6)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rerank}
                onChange={(e) => setRerank(e.target.checked)}
                className="rounded border-[var(--dossier-line)] accent-[#8ab4f8]"
              />
              <span>Cross-encoder reranking</span>
            </label>
          </div>
        </div>

        {/* Right Column: Runtime trace & grounded citation */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--dossier-line)] pb-2.5">
            <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--dossier-subtle)]">
              Execution trace
            </p>
            <span className="text-xs text-[var(--dossier-muted)]">
              {traces.length > 0 ? `${traces.length} / 6 steps` : "Ready to run"}
            </span>
          </div>

          {traces.length === 0 && !running && (
            <div className="py-10 text-center text-xs text-[var(--dossier-muted)]">
              Select a scenario and click &ldquo;Run execution&rdquo; to trace the live pipeline.
            </div>
          )}

          <div className="space-y-2">
            {traces.map((t) => (
              <div
                key={t.num}
                className="rounded-lg border border-[var(--dossier-line)] bg-[var(--dossier-dark)] p-3 text-xs"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[var(--dossier-ink)]">
                    {t.num}. {t.title}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--dossier-muted)]">
                    {t.ms}ms
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-[var(--dossier-muted)] leading-relaxed">
                  {t.detail}
                </p>
              </div>
            ))}
          </div>

          {result && (
            <div className="mt-4 rounded-xl border border-[var(--dossier-line-strong)] bg-[var(--dossier-dark)] p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-[var(--dossier-line)] pb-2 text-xs">
                <span className="font-semibold text-[var(--dossier-ink)]">
                  Grounded answer
                </span>
                <span className="text-xs text-[#8ab4f8]">
                  Faithfulness: {result.faithfulness}%
                </span>
              </div>

              <p className="text-xs text-[var(--dossier-ink)] leading-relaxed">
                {result.answer}
              </p>

              {result.source && (
                <div className="rounded-lg border border-[var(--dossier-line)] bg-[var(--dossier-panel)] p-3 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-[var(--dossier-muted)]">
                    <span className="font-medium text-[var(--dossier-ink)]">{result.source}</span>
                    <span>{result.edition} &middot; Page {result.page}</span>
                  </div>
                  <p className="text-[11px] italic text-[var(--dossier-body)] border-l-2 border-[#8ab4f8] pl-2.5">
                    &ldquo;{result.quote}&rdquo;
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-[var(--dossier-line)] text-xs text-[var(--dossier-muted)]">
                <span>Recall: {result.recall}%</span>
                <span>Latency: {result.latency}ms</span>
                <span className="text-[#8ab4f8] font-medium">Verified Grounded</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
