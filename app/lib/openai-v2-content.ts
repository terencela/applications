import type { CompanyDossierSupport } from "@/app/lib/dossier-config";

/** OpenAI dossier v2 — plain copy from CV + terencela.com, no recruiter AI slop. */
export const openaiV2DossierSupport: CompanyDossierSupport = {
  careerProofIntro:
    "AI Lead at Zurich Airport. 32M+ passengers a year. I have been building with GPT since 2020 and shipping products since long before that.",
  careerProofItems: [
    {
      stat: "15+",
      label: "AI products shipped",
      sub: "8 in 2026 alone — see terencela.com/labs",
    },
    {
      stat: "32M+",
      label: "Passengers at Zurich Airport",
      sub: "Real ops pressure, not a sandbox",
    },
    {
      stat: "Since 2020",
      label: "Building with GPT",
      sub: "Before most enterprise teams had a budget line for it",
    },
    {
      stat: "8×",
      label: "Hackathon wins",
      sub: "HackZurich, Bain FinTech, and others",
    },
    {
      stat: "Forbes",
      label: "30 Under 30 alumnus",
      sub: "2× TEDx · met Sam Altman at WEF",
    },
  ],
  interviewPitch:
    "Swiss accounts do not fail because the model is weak. They fail because legal, IT, and ops never got a path they could sign.",
  interviewPitchSub:
    "In a first call I would show one live product, one eval setup, and how I got something through review at an airport.",
  interviewBlueprintLabel: "First 90 days on Zurich accounts",
  toolkitTitle: "How I get Swiss deployments signed",
  toolkitSubtitle:
    "What I do when a customer is stuck between a working demo and a production yes.",
  adoptionPillars: [
    {
      title: "Evals on real workloads",
      desc: "Measure quality on the customer's actual tasks before anyone asks for a go-live date.",
      howTerenceSolves:
        "Built eval loops at Zurich Airport against operational data, not generic benchmarks.",
    },
    {
      title: "Data paths legal can read",
      desc: "Map tokens, logs, and retention so nDSG review does not restart from zero.",
      howTerenceSolves:
        "Designed least-exposure pipelines for passenger-facing AI with legal in the loop early.",
    },
    {
      title: "Fallbacks when models shift",
      desc: "Schema checks and retry logic so downstream systems do not break on an API update.",
      howTerenceSolves:
        "Years of structured-output pipelines in production integrations.",
    },
    {
      title: "Work inside their team",
      desc: "Same room as their architects and ops, not a vendor pitch across the table.",
      howTerenceSolves:
        "Daily work with Zurich Airport IT, operations, and leadership — same rhythm as an FDE at a bank.",
    },
  ],
  useCases: [
    {
      industry: "Swiss banking",
      friction: "Sandbox works. Security review blocks on logging and residency.",
      solution: "Eval suite + data boundary diagram before token volume goes up.",
      adoptionImpact: "Fewer review cycles between pilot and production.",
    },
    {
      industry: "Aviation",
      friction: "Peak days break reliability under multilingual load.",
      solution: "Load-tested routing with regression evals on ops scenarios.",
      adoptionImpact: "Stable when volume spikes and the press is watching.",
    },
    {
      industry: "Pharma",
      friction: "R&D wants GPT. GxP and document control slow everything down.",
      solution: "Versioned prompts and evals with an audit trail they already understand.",
      adoptionImpact: "Quality and IT can approve steps instead of blocking.",
    },
  ],
  linkedInCtaBody:
    "Hiring FDEs in Zurich? I would rather show you a working app and a real deployment story than send another deck.",
};
