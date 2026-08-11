"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Target,
  Zap,
} from "lucide-react";

type MarketSegment = "startups" | "enterprise" | "fintech";
type MigrationSource = "openai" | "azure" | "aws";

export function VertexGtmSimulator() {
  const [segment, setSegment] = useState<MarketSegment>("startups");
  const [targetAccounts, setTargetAccounts] = useState(25);
  const [avgDealARR, setAvgDealARR] = useState(120); // in k CHF
  const [migrationSource, setMigrationSource] = useState<MigrationSource>("openai");

  const marketSegments: { id: MarketSegment; label: string }[] = [
    { id: "startups", label: "AI Startups" },
    { id: "fintech", label: "Zurich FinTech" },
    { id: "enterprise", label: "Large Enterprise" },
  ];

  const migrationTargets: { id: MigrationSource; label: string }[] = [
    { id: "openai", label: "OpenAI Direct" },
    { id: "azure", label: "Azure AI" },
    { id: "aws", label: "AWS Bedrock" },
  ];

  const calculateGTM = () => {
    const rawPipeline = (targetAccounts * avgDealARR) / 1000; // in M CHF
    const winRate = migrationSource === "openai" ? 0.38 : 0.42;
    const projectedARR = (rawPipeline * winRate).toFixed(2);

    return {
      rawPipeline: rawPipeline.toFixed(2),
      projectedARR,
      timeToClose: segment === "startups" ? "45 Days" : "120 Days",
      keyWedge:
        migrationSource === "openai"
          ? "Vertex AI Cost & Model Diversity (Gemini 1.5 Pro 2M Token Context)"
          : "Native DeepMind Research Integration & Multi-Cloud Sovereignty",
    };
  };

  const gtm = calculateGTM();

  return (
    <div className="w-full bg-zinc-950 border border-blue-900/40 rounded-2xl overflow-hidden shadow-2xl font-sans">
      {/* Top Header */}
      <div className="bg-zinc-900/80 px-5 py-4 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white font-mono">
                Google Cloud Zurich AI Sales & GTM Simulator
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                PIPELINE MODELER
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              Scaling Vertex AI & Gemini revenue across Zurich startups and enterprise accounts
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Controls Panel (5 cols) */}
        <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-zinc-800 bg-zinc-900/30 space-y-6">
          {/* Market Segment */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
              1. Target Market Segment in Zurich
            </label>
            <div className="grid grid-cols-3 gap-2">
              {marketSegments.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSegment(s.id)}
                  className={`p-2.5 rounded-lg border text-xs font-mono text-center transition-all ${
                    segment === s.id
                      ? "bg-blue-950/60 border-blue-500 text-blue-300 font-bold"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Account & Deal Sliders */}
          <div className="space-y-4 pt-2 border-t border-zinc-800">
            <label className="block text-xs font-mono uppercase text-zinc-400">
              2. Territory & Account Volume
            </label>

            <div>
              <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                <span>Target Accounts</span>
                <span className="text-blue-400 font-bold">{targetAccounts} Accounts</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={targetAccounts}
                onChange={(e) => setTargetAccounts(parseInt(e.target.value))}
                className="w-full accent-blue-500 bg-zinc-800"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                <span>Avg Deal Size (ARR)</span>
                <span className="text-blue-400 font-bold">CHF {avgDealARR}k</span>
              </div>
              <input
                type="range"
                min="30"
                max="500"
                step="10"
                value={avgDealARR}
                onChange={(e) => setAvgDealARR(parseInt(e.target.value))}
                className="w-full accent-blue-500 bg-zinc-800"
              />
            </div>
          </div>

          {/* Migration Source */}
          <div className="pt-2 border-t border-zinc-800">
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
              3. Displacement Target (Competitive Win)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {migrationTargets.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMigrationSource(m.id)}
                  className={`p-2.5 rounded-lg border text-xs font-mono text-center transition-all ${
                    migrationSource === m.id
                      ? "bg-blue-950/60 border-blue-500 text-blue-300 font-bold"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel (7 cols) */}
        <div className="lg:col-span-7 p-6 bg-zinc-950 flex flex-col justify-between space-y-6">
          <div>
            <div className="mb-4 flex items-center justify-between text-xs text-zinc-400">
              <span>Projected Go-To-Market Impact (Zurich Region)</span>
              <span className="text-blue-400 flex items-center gap-1 font-mono text-xs">
                <Target className="w-3.5 h-3.5" /> High Velocity
              </span>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Gross Pipeline</div>
                <div className="text-xl font-bold font-mono text-white mt-1">
                  CHF {gtm.rawPipeline}M
                </div>
                <div className="text-[9px] text-zinc-400 font-mono mt-0.5">{targetAccounts} active pursuits</div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Projected Net ARR</div>
                <div className="text-xl font-bold font-mono text-blue-400 mt-1">
                  CHF {gtm.projectedARR}M
                </div>
                <div className="text-[9px] text-zinc-400 font-mono mt-0.5">Weighted win rate</div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Avg Sales Cycle</div>
                <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                  {gtm.timeToClose}
                </div>
                <div className="text-[9px] text-zinc-400 font-mono mt-0.5">Lead to Onboarding</div>
              </div>
            </div>

            {/* Value Proposition Strategy Box */}
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" /> Executive CXO Pitch & Positioning Strategy
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                <strong className="text-white">Competitive Wedge:</strong> {gtm.keyWedge}
              </p>
              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400 leading-relaxed">
                &quot;Terence&apos;s dual background as 4x founder ($1M+ sales funnel execution) and Zurich Airport AI Lead provides the exact credibility needed to convert Swiss CXOs.&quot;
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-800/40 text-xs text-zinc-300 flex items-center justify-between">
            <span className="font-mono text-blue-300">
              &quot;I combine technical fluency, enterprise execution, and aggressive GTM drive.&quot;
            </span>
            <span className="text-[10px] font-mono text-zinc-500">: Terence La</span>
          </div>
        </div>
      </div>
    </div>
  );
}
