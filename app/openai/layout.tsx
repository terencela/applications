import { DossierHoldScreen } from "@/app/components/shared/DossierHoldScreen";
import { isDossierOnHold } from "@/app/lib/dossier-hold";

export const dynamic = "force-dynamic";

export default function OpenAILayout({ children }: { children: React.ReactNode }) {
  if (isDossierOnHold()) {
    return <DossierHoldScreen />;
  }

  return <>{children}</>;
}
