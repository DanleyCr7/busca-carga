import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  denyMarketingAnalytics,
  enableMarketingAnalytics,
  initializeConsentMode,
  trackLandingEvent,
} from "./analytics";

describe("analytics com Consent Mode", () => {
  beforeEach(() => {
    localStorage.clear();
    window.dataLayer = [];
    delete window.fbq;
    document.head
      .querySelectorAll("script[data-bf-marketing]")
      .forEach(script => script.remove());
    window.history.replaceState({}, "", "/?utm_source=meta&utm_campaign=abc");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("inicia negado e não envia eventos sem aceite", () => {
    initializeConsentMode();
    trackLandingEvent("landing_view", { audience: "client" });

    expect(window.dataLayer?.[0]).toEqual([
      "consent",
      "default",
      expect.objectContaining({
        ad_storage: "denied",
        analytics_storage: "denied",
      }),
    ]);
    expect(window.dataLayer).toHaveLength(1);
  });

  it("envia somente propriedades operacionais e UTMs após o aceite", () => {
    enableMarketingAnalytics();
    trackLandingEvent("store_cta_click", {
      audience: "client",
      store: "onelink",
      pilot: "abc-residencial-v1",
    });

    expect(window.dataLayer).toContainEqual(
      expect.objectContaining({
        event: "store_cta_click",
        audience: "client",
        utm_source: "meta",
        utm_campaign: "abc",
      })
    );
    expect(JSON.stringify(window.dataLayer)).not.toMatch(/cpf|email|phone/i);
  });

  it("mantém recursos de marketing desabilitados após recusa", () => {
    denyMarketingAnalytics();
    trackLandingEvent("promotion_view", { audience: "client" });
    expect(window.dataLayer).toHaveLength(0);
  });

  it("usa o GTM como único carregador quando ele está configurado", () => {
    vi.stubEnv("VITE_GTM_ID", "GTM-TEST");
    vi.stubEnv("VITE_GA4_ID", "G-TEST");
    vi.stubEnv("VITE_META_PIXEL_ID", "123456");

    enableMarketingAnalytics();

    expect(document.querySelector("#bf-gtm")).toHaveAttribute(
      "src",
      "https://www.googletagmanager.com/gtm.js?id=GTM-TEST"
    );
    expect(document.querySelector("#bf-ga4")).not.toBeInTheDocument();
    expect(document.querySelector("#bf-meta")).not.toBeInTheDocument();
    expect(window.fbq).toBeUndefined();
  });

  it("inicializa a fila oficial do Meta Pixel quando não há GTM", () => {
    vi.stubEnv("VITE_GTM_ID", "");
    vi.stubEnv("VITE_GA4_ID", "");
    vi.stubEnv("VITE_META_PIXEL_ID", "123456");

    enableMarketingAnalytics();

    expect(document.querySelector("#bf-meta")).toHaveAttribute(
      "src",
      "https://connect.facebook.net/pt_BR/fbevents.js"
    );
    expect(window.fbq).toBeTypeOf("function");
    expect(window.fbq?.queue).toEqual([
      ["init", "123456"],
      ["track", "PageView"],
    ]);
  });
});
