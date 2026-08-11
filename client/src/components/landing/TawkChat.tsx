import { useEffect } from "react";
import {
  currentConsent,
  marketingConsentChangedEvent,
  type MarketingConsent,
} from "@/lib/analytics";

const TAWK_SCRIPT_ID = "tawkto-script";
const TAWK_PROPERTY_ID = "6a3c3b322784431d3e92a12c";
const TAWK_WIDGET_ID = "1jrtkeg36";

function loadTawkChat() {
  if (document.getElementById(TAWK_SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = TAWK_SCRIPT_ID;
  script.async = true;
  script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
  script.charset = "UTF-8";
  script.dataset.bfMarketing = "true";
  script.setAttribute("crossorigin", "*");
  document.body.appendChild(script);
}

export function TawkChat() {
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
  }, []);

  return null;
}
