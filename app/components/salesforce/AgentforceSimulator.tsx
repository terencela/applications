"use client";

import React, { useState } from "react";
import {
  Bot,
  CheckCircle,
  Zap,
  Activity,
} from "lucide-react";

type WorkflowType = "customer" | "ops" | "sales";
type AutonomyLevel = "assisted" | "autonomous";

export function AgentforceSimulator() {
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowType>("customer");
  const [autonomyLevel, setActiveAutonomyLevel] = useState<AutonomyLevel>("autonomous");

  const workflows = {
    customer: {
      title: "Real-Time Customer Disruption & Service Recovery Agent",
      trigger: "Flight cancellation or severe delay event detected in Data Cloud",
      actions: [
        "In-memory query to Data Cloud for passenger loyalty status & preferences",
        "Agent autonomously rebooks flight & hotel via API integration",
        "Generates personalized WhatsApp/SMS message in passenger's native language",
        "Updates CRM Case record & logs audit trail for compliance",
      ],
      timeSaved: "14 minutes per incident -> 2.4 seconds",
    },
    ops: {
      title: "Airport Ground Operations & Vendor Dispatch Agent",
      trigger: "Baggage belt congestion threshold breached (>85% capacity)",
      actions: [
        "Agent pulls live sensor stream & vendor SLA contract rules",
        "Autonomously dispatches backup ground team via Salesforce Field Service",
        "Adjusts resource allocation on live operational dashboard",
        "Notifies Duty Manager with summary report",
      ],
      timeSaved: "22 minutes human delay -> Instant automated dispatch",
    },
    sales: {
      title: "Enterprise Lead Qualification & Deal Routing Agent",
      trigger: "Inbound inquiry from Swiss Tier-1 enterprise account",
      actions: [
        "Enriches account profile via Swiss commercial registry & LinkedIn insights",
        "Scores deal complexity & assigns appropriate Forward Deployed Engineer",
        "Drafts custom pre-meeting architecture proposal in Data Cloud",
        "Schedules initial discovery call in calendar automatically",
      ],
      timeSaved: "2 days manual triage -> Under 60 seconds",
    },
  };

  const currentWF = workflows[activeWorkflow];
  const workflowOptions: { id: WorkflowType; label: string }[] = [
    { id: "customer", label: "Passenger & Customer Service Recovery" },
    { id: "ops", label: "Airport Ground Ops & Vendor Dispatch" },
    { id: "sales", label: "Enterprise Deal Qualification & Routing" },
  ];

  return (
    <div className="w-full bg-zinc-950 border border-sky-900/40 rounded-2xl overflow-hidden shadow-2xl font-sans">
      {/* Header */}
      <div className="bg-zinc-900/80 px-5 py-4 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white font-mono">
                Salesforce Agentforce Operations & Autonomous Agent Simulator
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30">
                AUTONOMOUS WORKFLOW
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              Bridging Data Cloud, Customer 360, and real-time operational execution in Switzerland
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Controls (5 cols) */}
        <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-zinc-800 bg-zinc-900/30 space-y-6">
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
              1. Select Autonomous Agent Use Case
            </label>
            <div className="space-y-2">
              {workflowOptions.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setActiveWorkflow(w.id)}
                  className={`w-full p-3 rounded-lg border text-xs font-mono text-left transition-all ${
                    activeWorkflow === w.id
                      ? "bg-sky-950/60 border-sky-500 text-sky-300 font-bold"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-800">
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
              2. Agent Guardrail & Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveAutonomyLevel("autonomous")}
                className={`p-2.5 rounded-lg border text-xs font-mono text-center ${
                  autonomyLevel === "autonomous"
                    ? "bg-sky-950/60 border-sky-500 text-sky-300 font-bold"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400"
                }`}
              >
                Fully Autonomous
              </button>
              <button
                onClick={() => setActiveAutonomyLevel("assisted")}
                className={`p-2.5 rounded-lg border text-xs font-mono text-center ${
                  autonomyLevel === "assisted"
                    ? "bg-sky-950/60 border-sky-500 text-sky-300 font-bold"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400"
                }`}
              >
                Human-in-the-Loop
              </button>
            </div>
          </div>
        </div>

        {/* Trace Panel (7 cols) */}
        <div className="lg:col-span-7 p-6 bg-zinc-950 flex flex-col justify-between space-y-6">
          <div>
            <div className="mb-4 flex items-center justify-between text-xs text-zinc-400">
              <span>Agent Action Trace & Real-Time Impact</span>
              <span className="text-sky-400 flex items-center gap-1 text-xs font-mono">
                <Activity className="w-3.5 h-3.5" /> Executing
              </span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3 mb-6">
              <div className="text-sm font-bold text-white font-mono">{currentWF.title}</div>
              <div className="text-xs text-sky-300 font-mono flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-sky-400" /> Trigger: {currentWF.trigger}
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-800">
                {currentWF.actions.map((action, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 font-mono">
                    <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-800/40 text-xs font-mono text-sky-300 flex items-center justify-between">
              <span>Efficiency Gain:</span>
              <span className="font-bold text-white">{currentWF.timeSaved}</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 flex items-center justify-between">
            <span className="font-mono text-sky-300">
              &quot;I transform complex CRM and operational data into autonomous, compliant AI agents.&quot;
            </span>
            <span className="text-[10px] font-mono text-zinc-500">: Terence La</span>
          </div>
        </div>
      </div>
    </div>
  );
}
