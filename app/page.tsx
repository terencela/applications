import { headers } from "next/headers";
import AnthropicPage from "@/app/anthropic/page";
import GooglePage from "@/app/google/page";
import OpenAIPage from "@/app/openai/page";
import SalesforcePage from "@/app/salesforce/page";
import ElevenLabsPage from "@/app/elevenlabs/page";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const envCompany = process.env.DOSSIER_COMPANY?.toLowerCase().trim();
  if (envCompany === "elevenlabs") return <ElevenLabsPage />;
  if (envCompany === "salesforce") return <SalesforcePage />;
  if (envCompany === "google") return <GooglePage />;
  if (envCompany === "anthropic") return <AnthropicPage />;
  if (envCompany === "openai") return <OpenAIPage />;

  const headerList = await headers();
  const host = (headerList.get("host") || headerList.get("x-forwarded-host") || "").toLowerCase();

  if (host.includes("elevenlabs")) return <ElevenLabsPage />;
  if (host.includes("salesforce")) return <SalesforcePage />;
  if (host.includes("google")) return <GooglePage />;
  if (host.includes("anthropic")) return <AnthropicPage />;
  if (host.includes("openai")) return <OpenAIPage />;

  // Default to OpenAI dossier - never expose any list of other companies
  return <OpenAIPage />;
}
