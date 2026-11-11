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
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
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
const gtmId = import.meta.env.VITE_GTM_ID?.trim();
const ga4Id = import.meta.env.VITE_GA4_ID?.trim() || "G-PDYVBF5ZND";
let consentModeInitialized = false;
let marketingAnalyticsEnabled = false;
let googleTagConfigured = false;
export const marketingConsentChangedEvent = "bf:marketing-consent-changed";
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

function gtag(...args: unknown[]) {
  window.gtag =
    window.gtag ??
    function (..._args: unknown[]) {
      dataLayer().push(arguments);
    };
  window.gtag(...args);
}

function disableGoogleAnalytics(disabled: boolean) {
  window[`ga-disable-${ga4Id}`] = disabled;
}

function updateGoogleConsent(consent: MarketingConsent) {
  gtag("consent", "update", {
    ad_storage: consent,
    analytics_storage: consent,
    ad_user_data: consent,
    ad_personalization: consent,
  });
}

export function initializeConsentMode() {
  if (consentModeInitialized) return;
  consentModeInitialized = true;
  disableGoogleAnalytics(true);
  gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
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
  initializeConsentMode();
  if (marketingAnalyticsEnabled) return;
  marketingAnalyticsEnabled = true;
  localStorage.setItem(consentKey, "granted");
  disableGoogleAnalytics(false);
  updateGoogleConsent("granted");
  notifyMarketingConsentChanged("granted");

  if (gtmId) {
    if (!googleTagConfigured) {
      googleTagConfigured = true;
      dataLayer().push({ "gtm.start": Date.now(), event: "gtm.js" });
      injectScript(
        "bf-gtm",
        `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
      );
    }
    return;
  }

  if (!googleTagConfigured) {
    googleTagConfigured = true;
    gtag("js", new Date());
    gtag("config", ga4Id, { anonymize_ip: true });
    injectScript(
      "bf-ga4",
      `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`
    );
  }
  const metaId = import.meta.env.VITE_META_PIXEL_ID;
  if (metaId) initializeMetaPixel(metaId);
}

export function denyMarketingAnalytics() {
  localStorage.setItem(consentKey, "denied");
  marketingAnalyticsEnabled = false;
  initializeConsentMode();
  disableGoogleAnalytics(true);
  updateGoogleConsent("denied");
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
  if (!marketingAnalyticsEnabled) enableMarketingAnalytics();
  const params = new URLSearchParams(window.location.search);
  const payload = {
    route: window.location.pathname,
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    ...properties,
  };
  if (gtmId) dataLayer().push({ event, ...payload });
  else gtag("event", event, { ...payload, send_to: ga4Id });
  window.fbq?.("trackCustom", event, { event, ...payload });
}
