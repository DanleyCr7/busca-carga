export type PublicResidentialPilot = {
  available: boolean;
  pilotSlug: string | null;
  state: string | null;
  cities: string[];
  minimumLeadHours: number;
  promotion: null | {
    code: "ABC30";
    maximumDiscountCents: number;
    endsAt: string;
  };
};

const apiUrl = (
  import.meta.env.VITE_API_URL ?? "https://api.buscarfrete.com"
).replace(/\/$/, "");

export async function getPublicResidentialPilot(): Promise<PublicResidentialPilot> {
  const response = await fetch(`${apiUrl}/public/residential-pilot`);
  if (!response.ok) throw new Error("pilot_unavailable");
  return response.json();
}
