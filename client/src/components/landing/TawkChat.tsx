import { MessageCircle, ShieldCheck } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  currentConsent,
  enableMarketingAnalytics,
  marketingConsentChangedEvent,
  type MarketingConsent,
} from "@/lib/analytics";

const TAWK_SCRIPT_ID = "tawkto-script";
const TAWK_PROPERTY_ID = "6a3c3b322784431d3e92a12c";
const TAWK_WIDGET_ID = "1jrtkeg36";

type TawkApi = {
  maximize?: () => void;
  onLoad?: () => void;
};

declare global {
  interface Window {
    Tawk_API?: TawkApi;
  }
}

type LoadState = "idle" | "loading" | "loaded";

export function TawkChat() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const openAfterLoadRef = useRef(false);
  const onLoadConfiguredRef = useRef(false);

  const configureTawkOnLoad = useCallback(() => {
    const api = (window.Tawk_API ??= {});
    if (onLoadConfiguredRef.current) return;

    const previousOnLoad = api.onLoad;
    api.onLoad = () => {
      previousOnLoad?.();
      setLoadState("loaded");
      if (openAfterLoadRef.current) {
        openAfterLoadRef.current = false;
        window.Tawk_API?.maximize?.();
      }
    };
    onLoadConfiguredRef.current = true;
  }, []);

  const loadTawkChat = useCallback(() => {
    configureTawkOnLoad();

    const existingScript = document.getElementById(TAWK_SCRIPT_ID);
    if (existingScript) {
      if (typeof window.Tawk_API?.maximize === "function") {
        setLoadState("loaded");
        if (openAfterLoadRef.current) {
          openAfterLoadRef.current = false;
          window.Tawk_API.maximize();
        }
      } else {
        setLoadState("loading");
      }
      return;
    }

    setLoadState("loading");
    const script = document.createElement("script");
    script.id = TAWK_SCRIPT_ID;
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    script.charset = "UTF-8";
    script.dataset.bfMarketing = "true";
    script.setAttribute("crossorigin", "*");
    script.addEventListener("error", () => {
      script.remove();
      setLoadState("idle");
    });
    document.body.appendChild(script);
  }, [configureTawkOnLoad]);

  useEffect(() => {
    const handleConsentChange = (event: Event) => {
      const consent = (event as CustomEvent<MarketingConsent>).detail;
      if (consent === "granted") loadTawkChat();
    };

    if (currentConsent() === "granted") loadTawkChat();
    window.addEventListener(marketingConsentChangedEvent, handleConsentChange);

    return () => {
      window.removeEventListener(
        marketingConsentChangedEvent,
        handleConsentChange
      );
    };
  }, [loadTawkChat]);

  const handleLauncherClick = () => {
    if (currentConsent() !== "granted") {
      setPrivacyOpen(true);
      return;
    }

    openAfterLoadRef.current = true;
    loadTawkChat();
  };

  const handleAcceptAndChat = () => {
    openAfterLoadRef.current = true;
    setPrivacyOpen(false);
    enableMarketingAnalytics();
  };

  return (
    <>
      {loadState !== "loaded" && (
        <button
          type="button"
          aria-label="Conversar com o suporte"
          className="fixed right-4 bottom-4 z-40 flex size-14 touch-manipulation items-center justify-center rounded-full bg-black text-white shadow-[0_12px_32px_rgba(0,0,0,.28)] transition duration-200 hover:scale-105 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 motion-reduce:transition-none motion-reduce:hover:scale-100"
          onClick={handleLauncherClick}
        >
          <MessageCircle className="size-7" aria-hidden="true" />
        </button>
      )}

      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent
          showCloseButton={false}
          className="gap-0 overflow-hidden border-slate-200 p-0 max-sm:bottom-0 max-sm:left-0 max-sm:top-auto max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-b-none max-sm:rounded-t-3xl sm:max-w-md sm:rounded-3xl"
        >
          <div className="bg-[linear-gradient(145deg,#eef5ff,#ffffff)] px-6 pt-7 pb-5 sm:px-7">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-[#1254d8] text-white shadow-sm">
              <ShieldCheck className="size-6" aria-hidden="true" />
            </span>
            <DialogHeader className="mt-5 text-left">
              <DialogTitle className="text-xl leading-7 font-black text-[#0c204d]">
                Para conversar com nosso suporte, aceite a Política de
                Privacidade
              </DialogTitle>
              <DialogDescription className="text-sm leading-6 text-slate-600">
                O atendimento usa o Tawk.to e só será carregado depois da sua
                autorização. Você pode consultar como tratamos seus dados na{" "}
                <a
                  href="/privacidade"
                  className="font-bold text-[#1254d8] underline underline-offset-2"
                >
                  Política de Privacidade
                </a>
                .
              </DialogDescription>
            </DialogHeader>
          </div>
          <DialogFooter className="gap-3 border-t border-slate-100 bg-white p-5 sm:p-6">
            <button
              type="button"
              className="min-h-11 rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200 motion-reduce:transition-none"
              onClick={() => setPrivacyOpen(false)}
            >
              Agora não
            </button>
            <button
              type="button"
              className="min-h-11 rounded-xl bg-[#1254d8] px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#0d46b8] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 motion-reduce:transition-none"
              onClick={handleAcceptAndChat}
            >
              Aceitar e conversar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
