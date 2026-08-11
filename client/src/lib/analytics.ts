export type LandingEvent =
  | "landing_view"
  | "coverage_view"
  | "store_cta_click"
  | "driver_cta_click"
  | "promotion_view";

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: MetaPixelFunction;
  }
}

type MetaPixelFunction = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  loaded?: boolean;
  push?: MetaPixelFunction;
  queue: unknown[][];
  version?: string;
};

const consentKey = "bf_marketing_consent";
export const marketingConsentChangedEvent =
  "bf:marketing-consent-changed";
export type MarketingConsent = "granted" | "denied";

function notifyMarketingConsentChanged(consent: MarketingConsent) {
  window.dispatchEvent(
    new CustomEvent<MarketingConsent>(marketingConsentChangedEvent, {
      detail: consent,
    })
  );
}

function dataLayer() {
  window.dataLayer = window.dataLayer ?? [];
  return window.dataLayer;
}

export function initializeConsentMode() {
  dataLayer().push([
    "consent",
    "default",
    {
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    },
  ]);
}

function injectScript(id: string, src: string) {
  if (!id || document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  script.dataset.bfMarketing = "true";
  document.head.appendChild(script);
}

function initializeMetaPixel(pixelId: string) {
  if (!window.fbq) {
    const fbq = ((...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    }) as MetaPixelFunction;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
  }
  injectScript("bf-meta", "https://connect.facebook.net/pt_BR/fbevents.js");
  window.fbq("init", pixelId);
  window.fbq("track", "PageView");
}

export function enableMarketingAnalytics() {
  localStorage.setItem(consentKey, "granted");
  notifyMarketingConsentChanged("granted");
  dataLayer().push([
    "consent",
    "update",
    {
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    },
  ]);
  const gtmId = import.meta.env.VITE_GTM_ID;
  const ga4Id = import.meta.env.VITE_GA4_ID;
  const metaId = import.meta.env.VITE_META_PIXEL_ID;
  if (gtmId) {
    injectScript(
      "bf-gtm",
      `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
    );
    return;
  }
  if (ga4Id) {
    injectScript(
      "bf-ga4",
      `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`
    );
    dataLayer().push(["js", new Date()]);
    dataLayer().push(["config", ga4Id, { anonymize_ip: true }]);
  }
  if (metaId) initializeMetaPixel(metaId);
}

export function denyMarketingAnalytics() {
  localStorage.setItem(consentKey, "denied");
  notifyMarketingConsentChanged("denied");
}

export function currentConsent(): MarketingConsent | null {
  const consent = localStorage.getItem(consentKey);
  return consent === "granted" || consent === "denied" ? consent : null;
}

export function trackLandingEvent(
  event: LandingEvent,
  properties: Record<string, string | number | boolean | null> = {}
) {
  if (currentConsent() !== "granted") return;
  const params = new URLSearchParams(window.location.search);
  const payload = {
    event,
    route: window.location.pathname,
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    ...properties,
  };
  dataLayer().push(payload);
  window.fbq?.("trackCustom", event, payload);
}
