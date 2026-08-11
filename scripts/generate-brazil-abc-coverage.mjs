import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(
  scriptDirectory,
  "../client/src/data/brazil-abc-coverage.json"
);

const ibgeBaseUrl = "https://servicodados.ibge.gov.br/api/v3/malhas";
const minimumQuality = "formato=application/vnd.geo%2Bjson&qualidade=minima";

const stateNames = {
  11: "Rondônia",
  12: "Acre",
  13: "Amazonas",
  14: "Roraima",
  15: "Pará",
  16: "Amapá",
  17: "Tocantins",
  21: "Maranhão",
  22: "Piauí",
  23: "Ceará",
  24: "Rio Grande do Norte",
  25: "Paraíba",
  26: "Pernambuco",
  27: "Alagoas",
  28: "Sergipe",
  29: "Bahia",
  31: "Minas Gerais",
  32: "Espírito Santo",
  33: "Rio de Janeiro",
  35: "São Paulo",
  41: "Paraná",
  42: "Santa Catarina",
  43: "Rio Grande do Sul",
  50: "Mato Grosso do Sul",
  51: "Mato Grosso",
  52: "Goiás",
  53: "Distrito Federal",
};

const pilotCities = [
  { code: "3548708", name: "São Bernardo do Campo" },
  { code: "3547809", name: "Santo André" },
  { code: "3548807", name: "São Caetano do Sul" },
];

async function fetchGeoJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`IBGE request failed (${response.status}): ${url}`);
  }

  return response.json();
}

const statesUrl = `${ibgeBaseUrl}/paises/BR?${minimumQuality}&intrarregiao=UF`;
const statesGeoJson = await fetchGeoJson(statesUrl);

if (statesGeoJson.features?.length !== 27) {
  throw new Error(
    `Expected 27 Brazilian states, received ${statesGeoJson.features?.length ?? 0}`
  );
}

const states = statesGeoJson.features.map(feature => {
  const code = feature.properties?.codarea;
  const name = stateNames[code];

  if (!name) {
    throw new Error(`Unknown state code returned by IBGE: ${code}`);
  }

  return {
    ...feature,
    id: code,
    properties: {
      code,
      name,
      layer: "state",
      highlighted: false,
    },
  };
});

const cities = await Promise.all(
  pilotCities.map(async city => {
    const cityUrl = `${ibgeBaseUrl}/municipios/${city.code}?${minimumQuality}`;
    const cityGeoJson = await fetchGeoJson(cityUrl);
    const feature = cityGeoJson.features?.[0];

    if (!feature) {
      throw new Error(`IBGE returned no geometry for ${city.name}`);
    }

    return {
      ...feature,
      id: city.code,
      properties: {
        code: city.code,
        name: city.name,
        layer: "pilot-city",
        highlighted: true,
      },
    };
  })
);

const coverageGeoJson = {
  type: "FeatureCollection",
  name: "brazil-abc-residential-pilot-coverage",
  metadata: {
    source: "IBGE API de Malhas Geográficas v3",
    sourceUrl: "https://servicodados.ibge.gov.br/api/docs/malhas?versao=3",
    generatedOn: "2026-08-11",
    stateCount: states.length,
    highlightedCityCount: cities.length,
  },
  features: [...states, ...cities],
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(coverageGeoJson)}\n`, "utf8");

console.log(
  `Generated ${outputPath} with ${states.length} states and ${cities.length} highlighted cities.`
);
