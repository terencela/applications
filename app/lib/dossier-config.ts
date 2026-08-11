/**
 * External dossier pages (/openai, /anthropic, etc.) are standalone application
 * pages that must never link back to the internal hub at /.
 */
export const IS_EXTERNAL_DOSSIER = true;

export function getDossierMode(): "external" | "internal" {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_DOSSIER_MODE === "internal") {
    return "internal";
  }
  return IS_EXTERNAL_DOSSIER ? "external" : "internal";
}

export function isExternalDossier(): boolean {
  return getDossierMode() === "external";
}

export type DossierCompany = "openai" | "anthropic" | "google" | "salesforce";

export type CareerProofItem = {
  stat: string;
  label: string;
  sub: string;
};

export type CareerTimelineStep = {
  period: string;
  title: string;
  company: string;
  detail: string;
  current?: boolean;
};

export type CredentialHighlight = {
  label: string;
  detail: string;
};

export type AdoptionPillar = {
  title: string;
  desc: string;
  howTerenceSolves: string;
};

export type AdoptionUseCase = {
  industry: string;
  friction: string;
  solution: string;
  adoptionImpact: string;
};

export type CompanyDossierSupport = {
  careerProofIntro: string;
  careerProofItems: CareerProofItem[];
  interviewPitch: string;
  interviewPitchSub: string;
  interviewBlueprintLabel: string;
  toolkitTitle: string;
  toolkitSubtitle: string;
  adoptionPillars: AdoptionPillar[];
  useCases: AdoptionUseCase[];
  linkedInCtaBody: string;
};

export const careerTimeline: CareerTimelineStep[] = [
  {
    period: "Current",
    title: "AI Lead",
    company: "Zurich Airport",
    detail: "Enterprise AI for 32M+ passengers. Rebuilding ZRH Insider. Voice AI POC to tender in two weeks.",
    current: true,
  },
  {
    period: "Current",
    title: "Founder & CEO",
    company: "KI Unlocked",
    detail: "AI workflow platform. 40% workflow reduction, 8+ enterprise clients.",
    current: true,
  },
  {
    period: "2023",
    title: "Head of AI",
    company: "Spadoom AG",
    detail: "Repositioned an SAP consultancy as AI-ready with shipped integrations.",
  },
  {
    period: "2022",
    title: "Head of AI",
    company: "Hutter Consult AG",
    detail: "Streamlined AI strategy and eliminated delivery inefficiency.",
  },
  {
    period: "2021",
    title: "Chairman's Office",
    company: "Credit Suisse",
    detail: "Strategic initiatives and executive support at the highest level.",
  },
  {
    period: "2019",
    title: "Transfer Pricing Analyst",
    company: "PwC",
    detail: "International tax consulting. First enterprise consulting foundation.",
  },
  {
    period: "2018",
    title: "CMO",
    company: "SmartCredit.io",
    detail: "DeFi lending startup. Raised 1,200 ETH, $5.6M funding round.",
  },
  {
    period: "2017",
    title: "Research Associate",
    company: "University of St. Gallen",
    detail: "Harvard co-project on innovative business research.",
  },
];

export const credentialsHighlights: CredentialHighlight[] = [
  { label: "Forbes 30 Under 30", detail: "DACH, 2022" },
  { label: "2x TEDx Speaker", detail: "HEC Paris, EDHEC" },
  { label: "19+ wins", detail: "HackZurich, Bain FinTech, venture.ch" },
  { label: "30+ talks", detail: "Enterprise and startup stages" },
  { label: "Leader of Tomorrow", detail: "St. Gallen Symposium, 2021" },
  { label: "HSG Master's", detail: "University of St. Gallen" },
];

export const companyDossierSupport: Record<DossierCompany, CompanyDossierSupport> = {
  openai: {
    careerProofIntro:
      "I run AI inside Zurich Airport, where 30M+ passengers a year expose every gap in eval coverage, latency, and data handling. That is the same pressure your Zurich FDE team faces when a UBS or Swiss Re pilot goes live.",
    careerProofItems: [
      {
        stat: "12+",
        label: "Internal AI tools shipped",
        sub: "Python and TypeScript, not slide decks",
      },
      {
        stat: "30M+",
        label: "Passengers in operational scope",
        sub: "Same stakes as tier-1 DACH accounts, not a claim I built AI for every passenger",
      },
      {
        stat: "8+",
        label: "Enterprise clients at KI Unlocked",
        sub: "40% workflow reduction in production deployments",
      },
      {
        stat: "Since 2020",
        label: "LLM production cycles",
        sub: "Evals, structured output, and field feedback loops",
      },
      {
        stat: "5 languages",
        label: "Customer workshop ready",
        sub: "English, German, Swiss German, Cantonese, French",
      },
    ],
    interviewPitch:
      "Your DACH customers do not stall on model quality. They stall between pilot and production sign-off. I have been the customer your FDE team is trying to win.",
    interviewPitchSub:
      "In a first conversation I would walk through how I de-risk a bank or infrastructure operator's first OpenAI production deployment, using the eval workbench on this page as the starting frame.",
    interviewBlueprintLabel: "First 90 days on your Zurich accounts",
    toolkitTitle: "How I unblock DACH production deployments",
    toolkitSubtitle:
      "The patterns I use when a Swiss enterprise account is stuck between a successful POC and signed production.",
    adoptionPillars: [
      {
        title: "Eval gates before go-live",
        desc: "Define precision, faithfulness, and latency thresholds tied to the customer's actual workload, not generic benchmarks.",
        howTerenceSolves:
          "Built post-interaction eval loops at Zurich Airport that compare model output against operational ground truth before any feature ships.",
      },
      {
        title: "Data path design for nDSG review",
        desc: "Map every token, log, and retention point so legal can sign without a six-month security audit restart.",
        howTerenceSolves:
          "Architected least-exposure pipelines for high-volume passenger data with executive and legal visibility from day one.",
      },
      {
        title: "Structured output and fallback chains",
        desc: "Protect downstream integrations when model behavior shifts between API versions or under load.",
        howTerenceSolves:
          "Years of structured LLM pipelines with schema validation and deterministic fallbacks in production integrations.",
      },
      {
        title: "Customer engineering co-ownership",
        desc: "Sit inside the customer's architecture team, not across the table pitching features.",
        howTerenceSolves:
          "Daily work bridging Zurich Airport IT, operations, and C-suite with the same rhythm an FDE needs at a bank or pharma account.",
      },
    ],
    useCases: [
      {
        industry: "Swiss Banking (Tier-1 DACH)",
        friction: "POC succeeds in sandbox but dies in security review on data residency and logging.",
        solution:
          "Co-design eval suite and data boundary diagram with customer security before expanding token volume.",
        adoptionImpact: "Shorter path from pilot approval to production sign-off.",
      },
      {
        industry: "Critical Infrastructure (Aviation)",
        friction: "Peak disruption events break model reliability under multilingual, high-concurrency load.",
        solution:
          "Load-tested routing with tool-calling for status, baggage, and gate ops with automated regression evals.",
        adoptionImpact: "Stable behavior when passenger volume spikes and stakes are public.",
      },
      {
        industry: "Pharma and Life Sciences",
        friction: "R&D teams want GPT capabilities but GxP and document control block quick iteration.",
        solution:
          "Versioned prompt and eval registry with audit trail aligned to existing quality management workflows.",
        adoptionImpact: "IT and quality teams can approve incremental rollout instead of blocking entirely.",
      },
    ],
    linkedInCtaBody:
      "If you are hiring FDEs in Zurich, I would welcome a working session on your hardest active deployment. I can show eval design, data path architecture, and how I convert field failures into model improvements.",
  },

  anthropic: {
    careerProofIntro:
      "Anthropic's Industries team wins when a Swiss CISO reads the architecture and says yes. I design Claude deployments that legal, IT, and the board can defend, not just admire in a sandbox.",
    careerProofItems: [
      {
        stat: "Forbes 30u30",
        label: "Executive room credibility",
        sub: "Founder who presents architecture to decision-makers",
      },
      {
        stat: "3 verticals",
        label: "Regulated Swiss industries",
        sub: "Aviation, financial services, public sector",
      },
      {
        stat: "nDSG + FINMA",
        label: "Compliance-native design",
        sub: "Privacy and financial regulation as architecture inputs",
      },
      {
        stat: "2x TEDx",
        label: "Trust communication",
        sub: "HEC Paris and EDHEC on AI adoption",
      },
      {
        stat: "Since 2020",
        label: "Production LLM systems",
        sub: "Safety and quality evals before rollout, not after incident",
      },
    ],
    interviewPitch:
      "The blocker is not Claude's capability. It is the CISO's sign-off. Your Industries customers in Zurich need a reference architecture their security team can audit.",
    interviewPitchSub:
      "I would start by walking through the sandbox on this page: how I map Claude capabilities to Swiss regulatory constraints for a first production workload in banking or critical infrastructure.",
    interviewBlueprintLabel: "First 90 days with Industries accounts",
    toolkitTitle: "Claude adoption architecture for Swiss enterprises",
    toolkitSubtitle:
      "How I translate constitutional AI principles into deployment decisions that DACH legal and IT teams actually approve.",
    adoptionPillars: [
      {
        title: "Reference architecture before POC expansion",
        desc: "Document data flows, model boundaries, and human oversight points before the customer increases token volume.",
        howTerenceSolves:
          "Designed Claude-ready integration patterns at Zurich Airport where every data path required legal review before launch.",
      },
      {
        title: "Trust metrics the CISO understands",
        desc: "Replace vague safety claims with eval suites covering hallucination rate, PII leakage, and refusal behavior on regulated content.",
        howTerenceSolves:
          "Built evaluation frameworks that give compliance teams measurable thresholds instead of qualitative assurances.",
      },
      {
        title: "Responsible scaling playbook",
        desc: "Define which workloads graduate from assistant to agent, and which stay human-in-the-loop by policy.",
        howTerenceSolves:
          "Implemented tiered autonomy levels for operational AI where wrong answers have public consequences.",
      },
      {
        title: "Cross-functional workshop facilitation",
        desc: "Run sessions where legal, IT, and business owners resolve blockers in one room instead of async email chains.",
        howTerenceSolves:
          "Daily practice at Zurich Airport aligning executives, external auditors, and engineering on AI risk decisions.",
      },
    ],
    useCases: [
      {
        industry: "Swiss Private Banking",
        friction: "Relationship managers want Claude for client prep but compliance blocks any client data in prompts.",
        solution:
          "Sanitized context layer with retrieval boundaries, audit logging, and explicit prohibited-use policies in the architecture doc.",
        adoptionImpact: "Compliance approves phased rollout to a controlled user group within weeks.",
      },
      {
        industry: "Pharma R&D (Basel corridor)",
        friction: "Research teams need document synthesis but GxP requires traceable model inputs and outputs.",
        solution:
          "Claude deployment with versioned prompts, eval regression on scientific accuracy, and immutable interaction logs.",
        adoptionImpact: "Quality teams treat AI as a controlled system, not a shadow IT tool.",
      },
      {
        industry: "Public Sector and Infrastructure",
        friction: "Multilingual citizen-facing services need Claude quality but cannot expose personal data to US processing.",
        solution:
          "Architecture options matrix covering data residency, on-premise inference, and hybrid patterns with decision criteria.",
        adoptionImpact: "Procurement can compare Anthropic deployment models against legal requirements directly.",
      },
    ],
    linkedInCtaBody:
      "For the Applied AI Architect role, I would welcome a session on your hardest Industries account in DACH. I can walk through reference architecture design, trust evals, and how I get Swiss legal teams to yes.",
  },

  google: {
    careerProofIntro:
      "I have sat on both sides of a Swiss enterprise AI procurement: as the buyer building at Zurich Airport and as a founder selling into regulated accounts. That is what your Zurich GTM team needs when a CIO asks why Vertex over OpenAI.",
    careerProofItems: [
      {
        stat: "$0.5M",
        label: "Revenue via TL Innovations",
        sub: "10 clients through sales funnels, copy, and outbound",
      },
      {
        stat: "Decade",
        label: "Sales background",
        sub: "Founder who sold AI services, not just consumed them",
      },
      {
        stat: "30M+",
        label: "Buyer-side reference",
        sub: "Enterprise AI procurement from the inside at Zurich Airport",
      },
      {
        stat: "19+",
        label: "Competition wins",
        sub: "HackZurich, Bain FinTech, venture.ch credibility",
      },
      {
        stat: "5 languages",
        label: "DACH deal fluency",
        sub: "English, German, Swiss German, Cantonese, French",
      },
    ],
    interviewPitch:
      "Swiss enterprises buy Vertex when someone in the room can answer the hard technical question. Not from a feature matrix, but from having been the buyer and the seller.",
    interviewPitchSub:
      "I would open with the discovery simulator on this page and show how I qualify a DACH account, surface technical objections early, and build a proof-of-value path that survives legal review.",
    interviewBlueprintLabel: "First 90 days on Zurich GTM",
    toolkitTitle: "How I qualify and win DACH Vertex deals",
    toolkitSubtitle:
      "Discovery, objection handling, and proof-of-value design for Swiss enterprise accounts evaluating Google Cloud AI.",
    adoptionPillars: [
      {
        title: "Workload-first discovery",
        desc: "Start with the customer's actual inference pattern (RAG, batch, agents, fine-tuning) before pitching platform breadth.",
        howTerenceSolves:
          "As Head of AI at Zurich Airport, I evaluated vendors against real operational workloads, not demo scenarios.",
      },
      {
        title: "Competitive reframing with technical honesty",
        desc: "Acknowledge where OpenAI or Azure wins today, then anchor on Google strengths for the specific use case.",
        howTerenceSolves:
          "Founder experience selling against larger platforms taught me to win on architecture fit, not feature checklists.",
      },
      {
        title: "Executive proof-of-value design",
        desc: "Build a 30-day measurable outcome that survives CFO scrutiny and gives the AE a land-and-expand wedge.",
        howTerenceSolves:
          "Designed ROI narratives for airport AI investments that required board approval and multi-year budget commitment.",
      },
      {
        title: "Partner and startup ecosystem activation",
        desc: "Use Zurich innovation community as pipeline amplifier for Vertex adoption stories and co-sell motions.",
        howTerenceSolves:
          "Forbes 30 Under 30 founder network across Swiss startups and enterprise innovation labs.",
      },
    ],
    useCases: [
      {
        industry: "Swiss Retail and Consumer",
        friction: "Marketing wants Gemini for content but IT blocks cloud AI without clear data processing agreement.",
        solution:
          "Discovery call framework that maps DPA requirements to Vertex deployment options before the POC budget is approved.",
        adoptionImpact: "Legal engaged early, reducing deal stall at contract stage.",
      },
      {
        industry: "Financial Services (Zurich hub)",
        friction: "Data science team built on Azure OpenAI; Google needs a migration story with minimal re-engineering.",
        solution:
          "Workload assessment comparing inference costs, latency, and compliance posture with a phased migration plan.",
        adoptionImpact: "Technical buyers see a credible path, not a rip-and-replace pitch.",
      },
      {
        industry: "Travel and Infrastructure",
        friction: "High-volume multilingual support needs real-time AI but procurement cycles run 12+ months.",
        solution:
          "Reference my airport deployment as peer proof, with a scoped 60-day Vertex POC tied to one measurable KPI.",
        adoptionImpact: "Executive sponsor can defend the investment internally with a concrete outcome.",
      },
    ],
    linkedInCtaBody:
      "For the AI Sales Lead role, I would welcome a ride-along on a live Zurich account. I can show my discovery process, how I handle technical objections, and why my buyer-side experience changes the conversation.",
  },

  salesforce: {
    careerProofIntro:
      "Agentforce works when agents act on data the compliance team already trusts. I deploy autonomous workflows inside existing operations, with nDSG guardrails at every decision point.",
    careerProofItems: [
      {
        stat: "12+",
        label: "Tools shipped end-to-end",
        sub: "Same integration discipline as CRM-native agents",
      },
      {
        stat: "30M+",
        label: "Operational touchpoints/year",
        sub: "High-volume service workflows with public failure visibility",
      },
      {
        stat: "Live ops",
        label: "Workflow automation shipped",
        sub: "Routing, escalation, and human handoff in production",
      },
      {
        stat: "No cert",
        label: "Same integration mindset",
        sub: "I embed in existing systems; Salesforce cert is a gap I close fast",
      },
      {
        stat: "nDSG",
        label: "Autonomous data paths",
        sub: "Privacy boundaries designed into every agent action",
      },
    ],
    interviewPitch:
      "Your Zurich FDE customers want agents inside Salesforce, not another chatbot beside it. I embed automation where service teams already work.",
    interviewPitchSub:
      "I would start with the Agentforce simulator on this page: a service recovery workflow with data boundary checks, fallback to human agents, and the governance template I would reuse across DACH accounts.",
    interviewBlueprintLabel: "First 90 days on Agentforce deployments",
    toolkitTitle: "Trusted Agentforce deployment patterns",
    toolkitSubtitle:
      "How I embed agents in Customer 360 workflows without breaking compliance or operator trust.",
    adoptionPillars: [
      {
        title: "CRM-native agent design",
        desc: "Agents read and write through existing Salesforce objects and flows, not parallel databases that sync later.",
        howTerenceSolves:
          "Built operational automations at Zurich Airport that plug into existing ticketing and routing systems, not standalone UIs.",
      },
      {
        title: "Data Cloud boundary mapping",
        desc: "Define which customer fields an agent can access, mask, or never touch before the first production action.",
        howTerenceSolves:
          "Architected real-time data streams with field-level privacy rules for passenger-facing AI under nDSG.",
      },
      {
        title: "Escalation over hallucination",
        desc: "Agents defer to human operators when confidence is low or the action touches regulated data.",
        howTerenceSolves:
          "Production service AI with explicit confidence thresholds and mandatory human handoff for high-stakes queries.",
      },
      {
        title: "Change management with ops teams",
        desc: "Train the people who will override agents daily, not just the IT team who deployed them.",
        howTerenceSolves:
          "Rolled out AI tools to frontline airport staff with feedback loops that improved agent behavior within weeks.",
      },
    ],
    useCases: [
      {
        industry: "Swiss Insurance (Service Cloud)",
        friction: "Claims agents want AI summaries but compliance blocks autonomous updates to policy records.",
        solution:
          "Agentforce workflow with read-only summarization, human approval gate before any CRM write, and full audit trail.",
        adoptionImpact: "Compliance approves agent assist without approving autonomous claims decisions.",
      },
      {
        industry: "B2B Enterprise Sales (DACH)",
        friction: "Reps ignore AI tools that require leaving Salesforce to get account intelligence.",
        solution:
          "Einstein agent embedded in Opportunity view pulling Data Cloud signals with source attribution on every suggestion.",
        adoptionImpact: "Adoption rises because the agent lives where reps already work.",
      },
      {
        industry: "Aviation and Travel Operations",
        friction: "Disruption events need autonomous routing but wrong gate or baggage info damages trust instantly.",
        solution:
          "Multi-step agent with tool-calling to operational systems, confidence checks, and instant fallback to human ops.",
        adoptionImpact: "Same pattern I run at Zurich Airport, transferable to any high-stakes service environment.",
      },
    ],
    linkedInCtaBody:
      "For the Forward Deployed Engineer role, I would welcome a working session on your toughest Agentforce account in DACH. I can show workflow embedding, data boundary design, and how I get ops teams to trust autonomous actions.",
  },
};
