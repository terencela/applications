"use client";

import React from "react";
import { Hammer, MapPin, Package } from "lucide-react";
import { ProductionEvalWorkbench } from "@/app/components/openai/ProductionEvalWorkbench";
import { RoleDossierPage } from "@/app/components/shared/RoleDossierPage";
import { openaiV2DossierSupport } from "@/app/lib/openai-v2-content";

export default function OpenAIPageV2() {
  return (
    <RoleDossierPage
      companyKey="openai"
      companyName="OpenAI"
      roleTitle="Forward Deployed Engineer (Zurich)"
      accentColor="#10a37f"
      profileRole="AI Lead · Zurich Airport"
      dossierSupport={openaiV2DossierSupport}
      heroEyebrow="Terence La · terencela.com"
      heroTitle={
        <>
          I create apps. <em>Zurich Airport is one place they run.</em>
        </>
      }
      heroSummary="AI Lead at Zurich Airport. Building with GPT since 2020. 15+ products shipped — 8 this year. This page is short: who I am, one thing to click, what I'd do on your accounts."
      primaryCtaLabel="First 90 days"
      fitIntro="Three things I actually do on customer accounts."
      blueprintItems={[
        "Join two live DACH deployments and write down exactly where they got stuck — evals, latency, legal, or handoff.",
        "Leave your Zurich team one eval template they can reuse on the next account without me in the room.",
        "Co-own one production go-live, then document the steps so the pattern repeats.",
      ]}
      metrics={[
        {
          label: "AI products shipped",
          value: "15+",
          note: "8 in 2026 — terencela.com/labs",
        },
        {
          label: "Passengers at ZRH",
          value: "32M+",
          note: "Ops scale, not a vanity metric",
        },
        {
          label: "Building with GPT",
          value: "Since 2020",
          note: "GPT-3 era onward",
        },
      ]}
      fitHeading="Why this fits FDE work"
      fitPoints={[
        {
          icon: Package,
          title: "I ship products",
          description:
            "Apps in production at an airport, for SMEs through ki-unlocked.com, and in my lab at terencela.com. FDE work is the same muscle: build, test, fix, ship.",
        },
        {
          icon: MapPin,
          title: "I know Swiss sign-off",
          description:
            "nDSG, legal review, ops runbooks. I have done this at Zurich Airport and with regulated clients. I know what makes a Swiss CIO say yes or no.",
        },
        {
          icon: Hammer,
          title: "I work in the room",
          description:
            "With customer engineering, IT, and the people who run the system at 6am. Not a remote demo and a follow-up deck.",
        },
      ]}
      demoTitle="Eval workbench"
      demoSummary="How I structure eval gates and latency checks before a Swiss bank's first OpenAI workload goes live. Move the sliders — see where a demo passes and production review fails."
      interactiveDemo={<ProductionEvalWorkbench />}
    />
  );
}
