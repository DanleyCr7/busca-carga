export const SITE_URL = "https://www.buscafrete.com";

export const RESIDENTIAL_CITIES = [
  "Santo André",
  "São Bernardo do Campo",
  "São Caetano do Sul",
  "Diadema",
  "Mauá",
] as const;

export const MINIMUM_LEAD_HOURS = 48;
export const CLIENT_APP_LINK =
  import.meta.env.VITE_APPSFLYER_CLIENT_ONELINK_URL?.trim() ||
  "https://buscafrete.onelink.me/kgfl/kliyuvok";
export const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.frete.busca";
export const APP_STORE_URL =
  "https://apps.apple.com/br/app/busca-frete/id6747501257";

export function residentialLeadHours(apiHours?: number) {
  return typeof apiHours === "number" && Number.isFinite(apiHours)
    ? Math.max(MINIMUM_LEAD_HOURS, apiHours)
    : MINIMUM_LEAD_HOURS;
}
