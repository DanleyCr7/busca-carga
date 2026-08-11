import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const SOURCE_BASE_URL =
  "https://servicodados.ibge.gov.br/api/v3/malhas/municipios";

const municipalities = [
  { id: "3547809", name: "Santo André", fill: "#d8e9ff" },
  { id: "3548708", name: "São Bernardo do Campo", fill: "#c7ddff" },
  { id: "3548807", name: "São Caetano do Sul", fill: "#e6f1ff" },
];

function polygonRings(geometry) {
  if (geometry.type === "Polygon") return geometry.coordinates;
  if (geometry.type === "MultiPolygon") return geometry.coordinates.flat();
  throw new Error(`Unsupported geometry: ${geometry.type}`);
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const cityGeometries = await Promise.all(
  municipalities.map(async municipality => {
    const url = `${SOURCE_BASE_URL}/${municipality.id}?formato=application/vnd.geo+json&qualidade=minima`;
    const response = await fetch(url, {
      headers: { Accept: "application/vnd.geo+json" },
    });

    if (!response.ok) {
      throw new Error(`IBGE request failed for ${municipality.name}`);
    }

    const collection = await response.json();
    return {
      ...municipality,
      rings: polygonRings(collection.features[0].geometry),
    };
  })
);

const allPoints = cityGeometries.flatMap(city => city.rings.flat());
const longitudes = allPoints.map(([longitude]) => longitude);
const latitudes = allPoints.map(([, latitude]) => latitude);
const bounds = {
  minLongitude: Math.min(...longitudes),
  maxLongitude: Math.max(...longitudes),
  minLatitude: Math.min(...latitudes),
  maxLatitude: Math.max(...latitudes),
};

const canvas = { width: 900, height: 620, margin: 54 };
const availableWidth = canvas.width - canvas.margin * 2;
const availableHeight = canvas.height - canvas.margin * 2;
const scale = Math.min(
  availableWidth / (bounds.maxLongitude - bounds.minLongitude),
  availableHeight / (bounds.maxLatitude - bounds.minLatitude)
);
const usedWidth = (bounds.maxLongitude - bounds.minLongitude) * scale;
const usedHeight = (bounds.maxLatitude - bounds.minLatitude) * scale;
const offsetX = (canvas.width - usedWidth) / 2;
const offsetY = (canvas.height - usedHeight) / 2;

function project([longitude, latitude]) {
  return [
    offsetX + (longitude - bounds.minLongitude) * scale,
    offsetY + (bounds.maxLatitude - latitude) * scale,
  ];
}

function pathForRing(ring) {
  return ring
    .map((point, index) => {
      const [x, y] = project(point);
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ")
    .concat(" Z");
}

function labelPoint(rings) {
  const outerRing = rings.reduce(
    (largest, ring) => (ring.length > largest.length ? ring : largest),
    rings[0]
  );
  const points = outerRing.slice(0, -1).map(project);
  const [sumX, sumY] = points.reduce(
    ([x, y], [pointX, pointY]) => [x + pointX, y + pointY],
    [0, 0]
  );
  return [sumX / points.length, sumY / points.length];
}

const cityMarkup = cityGeometries
  .map(city => {
    const paths = city.rings
      .map(ring => `<path d="${pathForRing(ring)}" />`)
      .join("");
    const [labelX, labelY] = labelPoint(city.rings);
    const labelLines =
      city.name === "São Bernardo do Campo"
        ? ["São Bernardo", "do Campo"]
        : city.name === "São Caetano do Sul"
          ? ["São Caetano", "do Sul"]
          : [city.name];
    const labels = labelLines
      .map(
        (line, index) =>
          `<tspan x="${labelX.toFixed(2)}" dy="${index === 0 ? 0 : 24}">${escapeXml(line)}</tspan>`
      )
      .join("");

    return `<g fill="${city.fill}" stroke="#ffffff" stroke-width="5" stroke-linejoin="round">${paths}</g>
      <g aria-hidden="true">
        <circle cx="${labelX.toFixed(2)}" cy="${(labelY - 18).toFixed(2)}" r="8" fill="#1757ba" stroke="#ffffff" stroke-width="4" />
        <text x="${labelX.toFixed(2)}" y="${(labelY + 18).toFixed(2)}" text-anchor="middle" fill="#101a35" font-family="Inter, Segoe UI, sans-serif" font-size="19" font-weight="750">${labels}</text>
      </g>`;
  })
  .join("\n");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvas.width} ${canvas.height}" role="img" aria-labelledby="title description">
  <title id="title">Mapa das cidades do piloto residencial no ABC Paulista</title>
  <desc id="description">Contornos de Santo André, São Bernardo do Campo e São Caetano do Sul com base nas malhas municipais do IBGE.</desc>
  <metadata>Fonte cartográfica: IBGE, API de Malhas, qualidade mínima.</metadata>
  <g>${cityMarkup}</g>
  <text x="${canvas.width - 22}" y="${canvas.height - 18}" text-anchor="end" fill="#64748b" font-family="Inter, Segoe UI, sans-serif" font-size="12">Fonte cartográfica: IBGE</text>
</svg>
`;

const outputDirectory = path.resolve(
  process.cwd(),
  "client/public/images/residential"
);
await mkdir(outputDirectory, { recursive: true });
await writeFile(path.join(outputDirectory, "abc-pilot-map.svg"), svg);

console.log("Generated client/public/images/residential/abc-pilot-map.svg");
