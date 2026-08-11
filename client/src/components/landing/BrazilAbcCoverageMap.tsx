import coverageGeoJson from "@/data/brazil-abc-coverage.json";

type Position = [number, number];
type Bounds = {
  minLongitude: number;
  maxLongitude: number;
  minLatitude: number;
  maxLatitude: number;
};
type PolygonGeometry = {
  type: "Polygon";
  coordinates: Position[][];
};
type MultiPolygonGeometry = {
  type: "MultiPolygon";
  coordinates: Position[][][];
};
type CoverageFeature = {
  id: string;
  properties: {
    code: string;
    name: string;
    layer: "state" | "pilot-city";
    highlighted: boolean;
  };
  geometry: PolygonGeometry | MultiPolygonGeometry;
};

const coverageFeatures =
  coverageGeoJson.features as unknown as CoverageFeature[];
const stateFeatures = coverageFeatures.filter(
  feature => feature.properties.layer === "state"
);
const pilotCityFeatures = coverageFeatures.filter(
  feature => feature.properties.layer === "pilot-city"
);

function featurePositions(feature: CoverageFeature): Position[] {
  if (feature.geometry.type === "Polygon") {
    return feature.geometry.coordinates.flat();
  }

  return feature.geometry.coordinates.flat(2);
}

function getBounds(features: CoverageFeature[], paddingRatio = 0): Bounds {
  const positions = features.flatMap(featurePositions);
  const longitudes = positions.map(([longitude]) => longitude);
  const latitudes = positions.map(([, latitude]) => latitude);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const longitudePadding = (maxLongitude - minLongitude) * paddingRatio;
  const latitudePadding = (maxLatitude - minLatitude) * paddingRatio;

  return {
    minLongitude: minLongitude - longitudePadding,
    maxLongitude: maxLongitude + longitudePadding,
    minLatitude: minLatitude - latitudePadding,
    maxLatitude: maxLatitude + latitudePadding,
  };
}

function projectPosition(
  [longitude, latitude]: Position,
  bounds: Bounds,
  width: number,
  height: number,
  padding: number
): Position {
  const longitudeSpan = bounds.maxLongitude - bounds.minLongitude;
  const latitudeSpan = bounds.maxLatitude - bounds.minLatitude;
  const scale = Math.min(
    (width - padding * 2) / longitudeSpan,
    (height - padding * 2) / latitudeSpan
  );
  const projectedWidth = longitudeSpan * scale;
  const projectedHeight = latitudeSpan * scale;
  const offsetX = (width - projectedWidth) / 2;
  const offsetY = (height - projectedHeight) / 2;

  return [
    offsetX + (longitude - bounds.minLongitude) * scale,
    offsetY + (bounds.maxLatitude - latitude) * scale,
  ];
}

function geometryPath(
  geometry: CoverageFeature["geometry"],
  bounds: Bounds,
  width: number,
  height: number,
  padding: number
) {
  const rings =
    geometry.type === "Polygon"
      ? geometry.coordinates
      : geometry.coordinates.flat();

  return rings
    .map(ring =>
      ring
        .map((position, index) => {
          const [x, y] = projectPosition(
            position,
            bounds,
            width,
            height,
            padding
          );
          return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
        })
        .join(" ")
        .concat(" Z")
    )
    .join(" ");
}

const brazilBounds = getBounds(stateFeatures, 0.025);
const abcBounds = getBounds(pilotCityFeatures, 0.12);
const abcCenter: Position = [
  (abcBounds.minLongitude + abcBounds.maxLongitude) / 2,
  (abcBounds.minLatitude + abcBounds.maxLatitude) / 2,
];
const abcAnchor = projectPosition(abcCenter, brazilBounds, 480, 560, 18);

export function BrazilAbcCoverageMap() {
  return (
    <figure
      data-testid="coverage-map"
      data-source="client/src/data/brazil-abc-coverage.json"
      className="mx-auto w-full max-w-[680px]"
    >
      <svg
        role="img"
        aria-label="Mapa do Brasil com o ABC Paulista em destaque"
        viewBox="0 0 720 600"
        className="h-auto w-full"
      >
        <title>Mapa do Brasil com o ABC Paulista em destaque</title>
        <defs>
          <filter
            id="abc-map-shadow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="10"
              floodColor="#17386f"
              floodOpacity="0.14"
            />
          </filter>
        </defs>

        <g aria-label="Estados brasileiros">
          {stateFeatures.map(feature => (
            <path
              key={feature.id}
              d={geometryPath(feature.geometry, brazilBounds, 480, 560, 18)}
              fill={feature.properties.code === "35" ? "#bfdbfe" : "#e1efff"}
              fillRule="evenodd"
              stroke="#79aee8"
              strokeLinejoin="round"
              strokeWidth="0.9"
            >
              <title>{feature.properties.name}</title>
            </path>
          ))}
        </g>

        <g aria-label="Localização do ABC Paulista">
          <circle
            cx={abcAnchor[0]}
            cy={abcAnchor[1]}
            r="12"
            fill="#0f9f8f"
            opacity="0.18"
          />
          <circle
            cx={abcAnchor[0]}
            cy={abcAnchor[1]}
            r="6"
            fill="#0f9f8f"
            stroke="white"
            strokeWidth="3"
          />
          <path
            d={`M${abcAnchor[0] + 8},${abcAnchor[1] - 4} C470,${abcAnchor[1] - 20} 490,350 510,340`}
            fill="none"
            stroke="#0f9f8f"
            strokeDasharray="5 5"
            strokeWidth="2"
          />
        </g>

        <g transform="translate(490 250)" filter="url(#abc-map-shadow)">
          <rect
            width="215"
            height="245"
            rx="20"
            fill="white"
            stroke="#b8e5df"
          />
          <text x="18" y="32" fill="#101a35" fontSize="16" fontWeight="800">
            ABC em destaque
          </text>
          <text x="18" y="51" fill="#64748b" fontSize="10">
            detalhe das cidades liberadas
          </text>
          <g
            role="list"
            aria-label="Cidades do piloto residencial"
            transform="translate(15 62)"
          >
            {pilotCityFeatures.map(feature => (
              <path
                key={feature.id}
                role="listitem"
                aria-label={feature.properties.name}
                d={geometryPath(feature.geometry, abcBounds, 185, 160, 8)}
                fill="#0f9f8f"
                fillRule="evenodd"
                stroke="white"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            ))}
          </g>
        </g>
      </svg>

      <figcaption className="mt-2 flex items-center justify-center gap-2 text-xs font-bold text-[#0b776d]">
        <span
          className="size-2.5 rounded-full bg-[#0f9f8f]"
          aria-hidden="true"
        />
        Cidades do piloto residencial destacadas no mapa
      </figcaption>
    </figure>
  );
}
