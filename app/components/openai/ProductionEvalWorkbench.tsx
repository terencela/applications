"use client";

import React, { useState } from "react";
import {
  Sliders,
  Shield,
  Zap,
  CheckCircle,
  Activity,
  Layers,
  FileCode,
  Lock,
} from "lucide-react";

export function ProductionEvalWorkbench() {
  const [model, setModel] = useState<"gpt-4o" | "gpt-4o-mini" | "o3-mini">("gpt-4o");
  const [privacyGuardrail, setPrivacyGuardrail] = useState(true);
  const [fallbackEnabled, setFallbackEnabled] = useState(true);
  const [temperature, setTemperature] = useState(0.2);
  const [ragContextSize, setRagContextSize] = useState(4); // kB
  const [activeTab, setActiveTab] = useState<"interactive" | "architecture">("interactive");

  // Simulated metrics calculation
  const getMetrics = () => {
    let baseLatency = model === "o3-mini" ? 420 : model === "gpt-4o" ? 180 : 85;
    let baseCost = model === "o3-mini" ? 1.2 : model === "gpt-4o" ? 0.8 : 0.08; // per 1k calls
    let baseAccuracy = model === "o3-mini" ? 98.4 : model === "gpt-4o" ? 96.2 : 91.5;

    if (privacyGuardrail) {
      baseLatency += 12; // PII masking delay
      baseAccuracy += 1.5; // reduces hallucination
    }
    if (fallbackEnabled) {
      baseLatency += 8;
      baseAccuracy += 1.8;
    }
    baseLatency += Math.round(ragContextSize * 6);
    baseCost += (ragContextSize * 0.04);

    return {
      ttft: Math.round(baseLatency * 0.4),
      totalLatency: Math.round(baseLatency),
      costPer1k: baseCost.toFixed(2),
      faithfulness: Math.min(99.9, baseAccuracy).toFixed(1),
      swissComplianceScore: privacyGuardrail ? "100% (nDSG Validated)" : "Needs Guardrails",
    };
  };

  const metrics = getMetrics();

  return (
    <div className="w-full bg-zinc-950 border border-emerald-900/40 rounded-2xl overflow-hidden shadow-2xl font-sans">
      {/* Top Workbench Header */}
      <div className="bg-zinc-900/80 px-5 py-4 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white font-mono">
                OpenAI Zurich FDE Eval & Deployment Workbench
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                LIVE INTERACTIVE
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              Simulating production model trade-offs & Swiss nDSG data constraints
            </p>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex rounded-lg bg-zinc-950 p-1 border border-zinc-800 text-xs font-mono demo-tab-bar">
          <button
            type="button"
            onClick={() => setActiveTab("interactive")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === "interactive"
                ? "!bg-emerald-500 !text-black font-bold shadow"
                : "demo-tab-inactive"
            }`}
          >
            Eval & Latency Simulator
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("architecture")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === "architecture"
                ? "!bg-emerald-500 !text-black font-bold shadow"
                : "demo-tab-inactive"
            }`}
          >
            Zurich Airport Production Architecture
          </button>
        </div>
      </div>

      {activeTab === "interactive" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-zinc-800 bg-zinc-900/30 space-y-6">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                1. Select Model Pipeline
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["gpt-4o", "gpt-4o-mini", "o3-mini"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setModel(m)}
                    className={`demo-model-btn p-2.5 rounded-lg border text-xs font-mono text-center transition-all ${
                      model === m
                        ? "is-selected !bg-emerald-500/20 !border-emerald-400 font-bold shadow-[0_0_0_1px_rgba(52,211,153,0.35)]"
                        : "!bg-zinc-900 !border-zinc-700 hover:!border-zinc-600"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Swiss Privacy & Security Guardrails */}
            <div className="space-y-3 pt-2 border-t border-zinc-800/80">
              <label className="block text-xs font-mono uppercase text-zinc-400">
                2. Compliance & Safety Controls
              </label>

              <div
                onClick={() => setPrivacyGuardrail(!privacyGuardrail)}
                className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Shield
                    className={`w-4 h-4 ${
                      privacyGuardrail ? "text-emerald-400" : "text-zinc-500"
                    }`}
                  />
                  <div>
                    <div className="text-xs font-medium text-white">Swiss nDSG PII Sanitizer</div>
                    <div className="text-[10px] text-zinc-500">In-memory redaction & data residency</div>
                  </div>
                </div>
                <div
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                    privacyGuardrail ? "bg-emerald-500" : "bg-zinc-800"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      privacyGuardrail ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>

              <div
                onClick={() => setFallbackEnabled(!fallbackEnabled)}
                className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Layers
                    className={`w-4 h-4 ${
                      fallbackEnabled ? "text-emerald-400" : "text-zinc-500"
                    }`}
                  />
                  <div>
                    <div className="text-xs font-medium text-white">Structured Output Fallback Chain</div>
                    <div className="text-[10px] text-zinc-500">Auto-retry schema violations</div>
                  </div>
                </div>
                <div
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                    fallbackEnabled ? "bg-emerald-500" : "bg-zinc-800"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      fallbackEnabled ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4 pt-2 border-t border-zinc-800/80">
              <label className="block text-xs font-mono uppercase text-zinc-400">
                3. Tuning Parameters
              </label>

              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                  <span>Temperature</span>
                  <span className="text-emerald-400 font-bold">{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 bg-zinc-800"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                  <span>RAG Vector Context Chunk Size</span>
                  <span className="text-emerald-400 font-bold">{ragContextSize} KB</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="16"
                  step="1"
                  value={ragContextSize}
                  onChange={(e) => setRagContextSize(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 bg-zinc-800"
                />
              </div>
            </div>
          </div>

          {/* Results Output Column (7 cols) */}
          <div className="lg:col-span-7 p-6 bg-zinc-950 flex flex-col justify-between space-y-6">
            <div>
              <div className="mb-4 flex items-center justify-between text-xs text-zinc-400">
                <span>Real-Time Simulated Performance Metrics</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" /> Live
                </span>
              </div>

              {/* Metric Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Latency (E2E)</div>
                  <div className="text-xl font-bold font-mono text-white mt-1">
                    {metrics.totalLatency} <span className="text-xs font-normal text-zinc-400">ms</span>
                  </div>
                  <div className="text-[9px] text-emerald-400 font-mono mt-0.5">TTFT ~{metrics.ttft}ms</div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Faithfulness Eval</div>
                  <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                    {metrics.faithfulness}%
                  </div>
                  <div className="text-[9px] text-zinc-400 font-mono mt-0.5">Automated benchmark</div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Cost / 1k Requests</div>
                  <div className="text-xl font-bold font-mono text-white mt-1">
                    ${metrics.costPer1k}
                  </div>
                  <div className="text-[9px] text-zinc-400 font-mono mt-0.5">Prompt + Completion</div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Swiss Privacy</div>
                  <div className="text-xs font-bold font-mono text-emerald-300 mt-2 truncate">
                    {privacyGuardrail ? "100% nDSG" : "Unsanitised"}
                  </div>
                  <div className="text-[9px] text-zinc-500 font-mono mt-1">
                    {privacyGuardrail ? "In-Memory PII Mask" : "Risk Detected"}
                  </div>
                </div>
              </div>

              {/* Console Execution Log */}
              <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 font-mono text-xs text-zinc-300 space-y-2">
                <div className="text-[10px] text-zinc-500 flex items-center gap-1.5 border-b border-zinc-800 pb-2">
                  <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PIPELINE EXECUTION TRACE</span>
                </div>
                <div className="text-zinc-400">
                  <span className="text-emerald-400">[0ms]</span> Init payload for {model} (temp={temperature})
                </div>
                {privacyGuardrail && (
                  <div className="text-emerald-300">
                    <span className="text-emerald-400">[+12ms]</span> Swiss nDSG PII Redactor: Masked 2 sensitive fields
                  </div>
                )}
                <div className="text-zinc-300">
                  <span className="text-emerald-400">[+{metrics.ttft}ms]</span> First Token Stream Received (TTFT)
                </div>
                {fallbackEnabled && (
                  <div className="text-zinc-400">
                    <span className="text-emerald-400">[+{metrics.totalLatency - 10}ms]</span> JSON Schema validation passed
                  </div>
                )}
                <div className="text-emerald-400 font-semibold pt-1">
                  [+{metrics.totalLatency}ms] Completed with 0 hallucinations | Faithfulness: {metrics.faithfulness}%
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-xs text-zinc-300 flex items-center justify-between">
              <span className="font-mono text-emerald-300">
                &quot;Show don&apos;t tell: I build systems where performance and compliance go hand in hand.&quot;
              </span>
              <span className="text-[10px] font-mono text-zinc-500">: Terence La</span>
            </div>
          </div>
        </div>
      ) : (
        /* Architecture View Tab */
        <div className="p-6 md:p-8 bg-zinc-950 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <h4 className="text-lg font-bold text-white font-mono">
                Zurich Airport Voice AI & Call Center Architecture (30M+ Passengers/Yr)
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                Designed & led by Terence La. Handles high concurrency, multilingual routing (DE/EN/FR), and strict Swiss nDSG data protection.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              PRODUCTION SYSTEM
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
                <Lock className="w-4 h-4" /> 1. Swiss Privacy & Ingestion
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Telephony trunking to local Swiss cloud nodes. PII masking in-memory before reaching model endpoints. Zero raw passenger storage.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
                <Zap className="w-4 h-4" /> 2. Model Orchestration
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                GPT-4o structured tool calling for airport flight status, gate changes, and baggage claim rules. Fallback to human agents seamlessly.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
                <CheckCircle className="w-4 h-4" /> 3. Continuous Eval Loop
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Automated post-call evaluations checking answer accuracy, flight dataset freshness, and user intent resolution rates.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
