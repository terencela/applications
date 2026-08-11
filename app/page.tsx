import Link from "next/link";
import AnthropicPage from "@/app/anthropic/page";
import GooglePage from "@/app/google/page";
import OpenAIPage from "@/app/openai/page";
import SalesforcePage from "@/app/salesforce/page";

const dossierPages = {
  openai: OpenAIPage,
  google: GooglePage,
  anthropic: AnthropicPage,
  salesforce: SalesforcePage,
} as const;

type DossierCompany = keyof typeof dossierPages;

function isDossierCompany(value: string | undefined): value is DossierCompany {
  return value !== undefined && value in dossierPages;
}

function DevIndex() {
  const entries = [
    { company: "openai", domain: "openai.terencela.com" },
    { company: "google", domain: "google.terencela.com" },
    { company: "anthropic", domain: "anthropic.terencela.com" },
    { company: "salesforce", domain: "salesforce.terencela.com" },
  ] as const;

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-lg flex-col justify-center gap-6 px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--dossier-ink,#f4f2ec)]">
        Application dossiers
      </h1>
      <p className="text-sm text-white/50">
        Local dev index. On Vercel, set <code className="text-white/70">DOSSIER_COMPANY</code> per project.
      </p>
      <ul className="space-y-3">
        {entries.map((entry) => (
          <li key={entry.company}>
            <Link
              href={`/${entry.company}`}
              className="block rounded-lg border border-white/10 px-4 py-3 text-sm text-white/80 transition-colors hover:border-white/20 hover:text-white"
            >
              {entry.company}
              <span className="mt-0.5 block text-xs text-white/40">{entry.domain}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default function HomePage() {
  const company = process.env.DOSSIER_COMPANY;

  if (!isDossierCompany(company)) {
    return <DevIndex />;
  }

  const Page = dossierPages[company];
  return <Page />;
}
