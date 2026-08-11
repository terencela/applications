"use client";

import React from "react";
import { Database, Workflow, Zap } from "lucide-react";
import { AgentforceSimulator } from "@/app/components/salesforce/AgentforceSimulator";
import { RoleDossierPage } from "@/app/components/shared/RoleDossierPage";

export default function SalesforcePage() {
  return (
    <RoleDossierPage
      companyKey="salesforce"
      companyName="Salesforce"
      roleTitle="Forward Deployed Engineer (Zurich)"
      accentColor="#00a1e0"
      heroTitle={
        <>
          Agentforce works when agents act on data the compliance team{" "}
          <em>already trusts.</em>
        </>
      }
      heroSummary="I deploy autonomous workflows inside existing operations, not beside them. At Zurich Airport I built service routing where a wrong answer is visible to 30M+ passengers. For Salesforce FDE, that means CRM-native integration, Data Cloud boundaries before the first write, and human handoff when confidence drops. No Salesforce cert yet, same integration discipline."
      primaryCtaLabel="See my 90-day Agentforce plan"
      blueprintItems={[
        "Audit two enterprise Agentforce deployments for data boundary gaps, escalation failures, and ops team adoption blockers.",
        "Ship a reference service recovery agent with Data Cloud integration, nDSG-compliant field masking, and mandatory human approval on CRM writes.",
        "Document an agent governance template the Zurich FDE team can reuse across DACH insurance, B2B sales, and travel accounts.",
      ]}
      metrics={[
        {
          label: "Tools shipped end-to-end",
          value: "12+",
          note: "Same integration discipline as CRM-native agents.",
        },
        {
          label: "Operational touchpoints",
          value: "30M+",
          note: "High-volume service with public failure visibility.",
        },
        {
          label: "Privacy in agent paths",
          value: "nDSG",
          note: "Field-level boundaries on every action.",
        },
      ]}
      fitHeading="Mapped to what Salesforce FDE hires for"
      fitPoints={[
        {
          icon: Workflow,
          title: "CRM-native agent embedding",
          description:
            "Agents that read and write through existing Salesforce objects and flows, not parallel databases. I built operational automations at Zurich Airport that plug into existing ticketing systems.",
        },
        {
          icon: Database,
          title: "Data Cloud boundary design",
          description:
            "Define which customer fields an agent can access, mask, or never touch before the first production action. Field-level privacy rules under nDSG for passenger-facing AI.",
        },
        {
          icon: Zap,
          title: "Escalation over automation",
          description:
            "Agents defer to human operators when confidence is low or the action touches regulated data. Mandatory handoff for high-stakes queries because wrong information destroys trust instantly.",
        },
      ]}
      demoTitle="Agentforce visualizer: service recovery with compliance guardrails"
      demoSummary="A disruption-response agent embedded in a service workflow. Data boundary checks, confidence thresholds, and fallback to human operators before any autonomous action touches a customer record."
      interactiveDemo={<AgentforceSimulator />}
    />
  );
}
