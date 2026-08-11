import Link from "next/link";

const dossiers = [
  { company: "OpenAI", path: "/openai", domain: "openai.terencela.com" },
  { company: "Google", path: "/google", domain: "google.terencela.com" },
  { company: "Anthropic", path: "/anthropic", domain: "anthropic.terencela.com" },
  { company: "Salesforce", path: "/salesforce", domain: "salesforce.terencela.com" },
] as const;

export default function ApplicationsIndexPage() {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-lg flex-col justify-center gap-6 px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--dossier-ink,#f4f2ec)]">
        Application dossiers
      </h1>
      <ul className="space-y-3">
        {dossiers.map((dossier) => (
          <li key={dossier.path}>
            <Link
              href={dossier.path}
              className="block rounded-lg border border-white/10 px-4 py-3 text-sm text-white/80 transition-colors hover:border-white/20 hover:text-white"
            >
              {dossier.company}
              <span className="mt-0.5 block text-xs text-white/40">{dossier.domain}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
