"use client";

import React from "react";
import { Building2, Globe, Lock } from "lucide-react";
import { ClaudeEnterpriseSandbox } from "@/app/components/anthropic/ClaudeEnterpriseSandbox";
import { RoleDossierPage } from "@/app/components/shared/RoleDossierPage";

export default function AnthropicPage() {
  return (
    <RoleDossierPage
      companyKey="anthropic"
      companyName="Anthropic"
      roleTitle="Applied AI Architect, Industries (Zurich)"
      accentColor="#d97706"
      heroTitle={
        <>
          The blocker isn&apos;t Claude&apos;s capability. It&apos;s the{" "}
          <em>CISO&apos;s sign-off.</em>
        </>
      }
      heroSummary="I design Claude deployments that legal, IT, and the board can defend. At Zurich Airport I align C-suite priorities with nDSG compliance every week. For Industries, that means reference architectures for banking and critical infrastructure, trust evals compliance teams understand, and workshops that resolve blockers in one room."
      primaryCtaLabel="See my 90-day Industries plan"
      blueprintItems={[
        "Map Anthropic's DACH priority accounts against compliance blockers I have solved in aviation and financial services contexts.",
        "Publish two reference architectures (Swiss private banking and critical infrastructure) with eval criteria, data boundaries, and human oversight tiers.",
        "Lead co-design sessions with customer architects and document reusable patterns for the Zurich Industries team.",
      ]}
      metrics={[
        {
          label: "Regulated verticals",
          value: "3",
          note: "Aviation, finance, public sector.",
        },
        {
          label: "Privacy frameworks",
          value: "nDSG + FINMA",
          note: "Designed into architecture, not bolted on.",
        },
        {
          label: "TEDx talks delivered",
          value: "2",
          note: "HEC Paris and EDHEC.",
        },
      ]}
      fitHeading="Mapped to what Industries hires for"
      fitPoints={[
        {
          icon: Lock,
          title: "Reference architecture for regulated workloads",
          description:
            "Industries customers need documented data flows, model boundaries, and oversight models before they expand token volume. I build artifacts security teams audit, not slide decks.",
        },
        {
          icon: Building2,
          title: "Constitutional AI in practice",
          description:
            "Trust is not a marketing word. I translate safety principles into eval suites covering hallucination rate, PII leakage, and refusal behavior on regulated content.",
        },
        {
          icon: Globe,
          title: "DACH workshop fluency",
          description:
            "English, German, Swiss German, Cantonese, and French. I run cross-functional sessions where legal, IT, and business owners decide whether Claude graduates from lab to production.",
        },
      ]}
      demoTitle="Reference architecture sandbox: Swiss bank first Claude workload"
      demoSummary="How I map Claude capabilities to nDSG and FINMA constraints for a private banking use case. Toggle compliance requirements to see how architecture decisions change before a POC expands."
      interactiveDemo={<ClaudeEnterpriseSandbox />}
    />
  );
}
