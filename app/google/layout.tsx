import type { Metadata } from "next";
import { DossierHoldScreen } from "@/app/components/shared/DossierHoldScreen";
import { isDossierOnHold } from "@/app/lib/dossier-hold";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Terence La · AI Outcome Customer Engineer, Google Cloud (Zurich)",
  description:
    "Application for AI Outcome Customer Engineer, Google Cloud, Zurich. Enterprise AI from agreement to daily use: shaped with the customer, built in code, measured by adoption.",
};

export default function GoogleLayout({ children }: { children: React.ReactNode }) {
  if (isDossierOnHold()) {
    return <DossierHoldScreen />;
  }

  return <>{children}</>;
}
