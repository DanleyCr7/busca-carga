import { useEffect, useState } from "react";
import {
  currentConsent,
  denyMarketingAnalytics,
  enableMarketingAnalytics,
  initializeConsentMode,
} from "@/lib/analytics";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    initializeConsentMode();
    const consent = currentConsent();
    if (consent === "granted") enableMarketingAnalytics();
    else if (!consent) setVisible(true);
  }, []);

  if (!visible) return null;
  return (
    <aside
      aria-label="Preferências de privacidade"
      className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
    >
      <div className="items-center gap-5 sm:flex">
        <div className="flex-1">
          <strong className="text-sm text-[#0b1f45]">
            Sua privacidade importa
          </strong>
          <p className="mt-1 text-xs leading-5 text-slate-600">
            Com sua autorização, usamos analytics para entender campanhas e o
            chat de atendimento para falar com você. Recusar mantém apenas
            recursos essenciais.
          </p>
        </div>
        <div className="mt-4 flex gap-2 sm:mt-0">
          <button
            type="button"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold"
            onClick={() => {
              denyMarketingAnalytics();
              setVisible(false);
            }}
          >
            Recusar
          </button>
          <button
            type="button"
            className="rounded-xl bg-[#1254d8] px-4 py-2 text-sm font-semibold text-white"
            onClick={() => {
              enableMarketingAnalytics();
              setVisible(false);
            }}
          >
            Aceitar
          </button>
        </div>
      </div>
    </aside>
  );
}
