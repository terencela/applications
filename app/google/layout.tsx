import type { Metadata } from "next";
import { DossierHoldScreen } from "@/app/components/shared/DossierHoldScreen";
import { isDossierOnHold } from "@/app/lib/dossier-hold";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Terence La · Google Applied AI Dossier",
  description: "Forward Deployed Engineer III (Applied AI, Zurich) — Terence La",
};

export default function GoogleLayout({ children }: { children: React.ReactNode }) {
  if (isDossierOnHold()) {
    return <DossierHoldScreen />;
  }

  return <>{children}</>;
}
