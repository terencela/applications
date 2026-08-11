"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Globe,
  Brain,
  Lock,
} from "lucide-react";

type Industry = "banking" | "aviation" | "pharma" | "public";
type ClaudeModel = "sonnet" | "haiku" | "opus";

export function ClaudeEnterpriseSandbox() {
  const [industry, setIndustry] = useState<Industry>("banking");
  const [model, setModel] = useState<ClaudeModel>("sonnet");
  const [finmaMode, setFinmaMode] = useState(true);
  const [lang, setLanguage] = useState<"en" | "de" | "fr" | "ch">("de");
  const [tokenBudget] = useState(50); // k tokens per query

  const industryProfiles = {
    banking: {
      title: "Swiss Wealth & Private Banking (FINMA & nDSG)",
      useCase: "Regulatory Compliance & Investment Portfolio Risk Analysis",
      complianceRequirement: "FINMA Circular 2018/3 & Swiss Bank Secrecy (BA Art. 47)",
      claudeAdvantage: "Superior reasoning on complex 100-page legal contracts with zero data retention guarantees.",
      evalScore: "99.4%",
    },
    aviation: {
      title: "Swiss International Aviation & Airport Operations",
      useCase: "Real-time Multilingual Passenger Disruption & Gate Routing",
      complianceRequirement: "nDSG Passenger PII Protection & High Concurrency SLA",
      claudeAdvantage: "Fast 200k token context window reading full flight schedules & maintenance logs.",
      evalScore: "98.8%",
    },
    pharma: {
      title: "Swiss Life Sciences & MedTech (Basel / Zurich Hub)",
      useCase: "Clinical Trial Documentation & Patent Intelligence",
      complianceRequirement: "EU AI Act High-Risk Category Verification & Auditability",
      claudeAdvantage: "Exceptional precision in structured data extraction from complex medical PDFs.",
      evalScore: "99.1%",
    },
    public: {
      title: "Swiss Canton & Federal Public Administration",
      useCase: "Citizen Inquiry Automation & Ordinance Summarization",
      complianceRequirement: "Multi-cantonal Official Languages (DE / FR / IT / EN)",
      claudeAdvantage: "Natively fluent in Swiss legal terminology and multi-lingual nuances.",
      evalScore: "99.6%",
    },
  };

  const activeProfile = industryProfiles[industry];
  const industryOptions: { id: Industry; label: string }[] = [
    { id: "banking", label: "Wealth & Banking" },
    { id: "aviation", label: "Aviation & Travel" },
    { id: "pharma", label: "Pharma & Life Sci" },
    { id: "public", label: "Swiss Public Sector" },
  ];

  const modelOptions: { id: ClaudeModel; name: string; desc: string }[] = [
    { id: "sonnet", name: "3.5 Sonnet", desc: "Best Reasoning" },
    { id: "haiku", name: "3.5 Haiku", desc: "Ultra Fast" },
    { id: "opus", name: "3 Opus", desc: "Complex Deep Work" },
  ];

  const translations = {
    en: "Claude 3.5 Sonnet provides unmatched enterprise accuracy and safety for Swiss organizations.",
    de: "Claude 3.5 Sonnet bietet unerreichte Enterprise-Präzision und Datenschutz für Schweizer Unternehmen.",
    fr: "Claude 3.5 Sonnet offre une précision et une sécurité d'entreprise inégalées pour les organisations suisses.",
    ch: "Claude 3.5 Sonnet liefert top Präzision und Verlässlichkeit für d'Schweizer Wirtschaft.",
  };

  return (
    <div className="w-full bg-zinc-950 border border-amber-900/40 rounded-2xl overflow-hidden shadow-2xl font-sans">
      {/* Top Header */}
      <div className="bg-zinc-900/80 px-5 py-4 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white font-mono">
                Anthropic Zurich Applied AI Architecture Sandbox
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                PRE-SALES DEMO
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              Designing compliant, high-ROI Claude integrations for Swiss enterprise customers
            </p>
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs font-mono">
          <Globe className="w-3.5 h-3.5 text-zinc-400 ml-1.5" />
          {(["de", "en", "fr", "ch"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLanguage(l)}
              className={`px-2.5 py-1 rounded uppercase transition-all ${
                lang === l
                  ? "bg-amber-500 text-black font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {l === "ch" ? "CH-DE" : l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Settings Panel (5 cols) */}
        <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-zinc-800 bg-zinc-900/30 space-y-6">
          {/* Target Swiss Industry */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
              1. Select Swiss Enterprise Vertical
            </label>
            <div className="grid grid-cols-2 gap-2">
              {industryOptions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setIndustry(item.id)}
                  className={`p-2.5 rounded-lg border text-xs font-mono text-left transition-all ${
                    industry === item.id
                      ? "bg-amber-950/60 border-amber-500 text-amber-300 font-bold"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
              2. Choose Claude Model Tier
            </label>
            <div className="grid grid-cols-3 gap-2">
              {modelOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setModel(option.id)}
                  className={`p-2 rounded-lg border text-xs font-mono text-center transition-all ${
                    model === option.id
                      ? "bg-amber-950/60 border-amber-500 text-amber-300 font-bold"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="font-bold">{option.name}</div>
                  <div className="text-[9px] text-zinc-500 mt-0.5">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* FINMA & nDSG Compliance Toggle */}
          <div className="pt-2 border-t border-zinc-800">
            <div
              onClick={() => setFinmaMode(!finmaMode)}
              className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Lock
                  className={`w-4 h-4 ${
                    finmaMode ? "text-amber-400" : "text-zinc-500"
                  }`}
                />
                <div>
                  <div className="text-xs font-medium text-white">
                    FINMA & Swiss Banking Secrecy Mode
                  </div>
                  <div className="text-[10px] text-zinc-500">
                    Private VPC Endpoint & Zero Data Retention
                  </div>
                </div>
              </div>
              <div
                className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                  finmaMode ? "bg-amber-500" : "bg-zinc-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    finmaMode ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Architecture & Pitch Column (7 cols) */}
        <div className="lg:col-span-7 p-6 bg-zinc-950 flex flex-col justify-between space-y-6">
          <div>
            <div className="mb-4 flex items-center justify-between text-xs text-zinc-400">
              <span>Architectural Blueprint & Customer Value Proposition</span>
              <span className="text-amber-400 flex items-center gap-1 text-[11px] font-mono">
                <ShieldCheck className="w-3.5 h-3.5" /> FINMA Compliant
              </span>
            </div>

            {/* Main Spec Card */}
            <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4 mb-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="text-sm font-bold text-white font-mono">
                  {activeProfile.title}
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300">
                  Eval Benchmark: {activeProfile.evalScore}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-zinc-500 font-mono">Core Use Case:</span>{" "}
                  <span className="text-zinc-200 font-medium">{activeProfile.useCase}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono">Compliance Constraint:</span>{" "}
                  <span className="text-amber-300 font-mono">{activeProfile.complianceRequirement}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono">Claude Advantage:</span>{" "}
                  <span className="text-zinc-300">{activeProfile.claudeAdvantage}</span>
                </div>
              </div>

              {/* Multilingual Preview Box */}
              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 text-xs font-mono text-amber-200/90 leading-relaxed italic">
                &quot;{translations[lang]}&quot;
              </div>
            </div>

            {/* Value Proposition Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Context Window</div>
                <div className="text-lg font-bold font-mono text-white mt-1">
                  {tokenBudget}k Tokens
                </div>
                <div className="text-[9px] text-zinc-400 font-mono mt-0.5">Full financial reports</div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Prompt Eval Accuracy</div>
                <div className="text-lg font-bold font-mono text-amber-400 mt-1">
                  {activeProfile.evalScore}
                </div>
                <div className="text-[9px] text-zinc-400 font-mono mt-0.5">Swiss benchmarks</div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Data Security</div>
                <div className="text-xs font-bold font-mono text-emerald-300 mt-2 truncate">
                  {finmaMode ? "FINMA Sealed" : "Standard API"}
                </div>
                <div className="text-[9px] text-zinc-500 font-mono mt-1">Zero persistence</div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-zinc-300 flex items-center justify-between">
            <span className="font-mono text-amber-300">
              &quot;I bridge enterprise trust, technical architecture, and C-suite alignment.&quot;
            </span>
            <span className="text-[10px] font-mono text-zinc-500">: Terence La</span>
          </div>
        </div>
      </div>
    </div>
  );
}
