export function CoverageMap() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f9fbff] p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--brand-blue)]">
            Cobertura nacional
          </p>
          <h3 className="mt-2 text-xl font-black text-slate-950">Mapa ilustrativo do Brasil</h3>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 shadow-sm">
          Referencia visual
        </span>
      </div>

      <svg
        viewBox="0 0 520 460"
        role="img"
        aria-labelledby="coverage-map-title coverage-map-desc"
        className="h-auto w-full"
      >
        <title id="coverage-map-title">Mapa ilustrativo do Brasil com rotas decorativas</title>
        <desc id="coverage-map-desc">
          Representacao visual de cobertura nacional com cinco pontos de referencia e linhas entre regioes.
        </desc>
        <defs>
          <linearGradient id="mapFill" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#0f3f88" />
            <stop offset="100%" stopColor="#1a76ff" />
          </linearGradient>
          <linearGradient id="routeStroke" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="520" height="460" rx="28" fill="#f9fbff" />
        <path
          d="M153 60l47-22 46 16 34-10 28 14 34 0 30 31-11 32 26 24-4 34 18 27-4 49-28 38-54 7-35 29-45 17-42-20-40 14-36-20-44 2-33-32 6-38-31-38 21-37-6-49 23-21 7-43 43-14 19-30z"
          fill="url(#mapFill)"
          opacity="0.96"
        />
        <path
          d="M146 155c46 12 85 15 115 2 28-12 53-11 88 4 34 15 69 44 88 76"
          fill="none"
          stroke="url(#routeStroke)"
          strokeDasharray="8 10"
          strokeLinecap="round"
          strokeWidth="8"
          opacity="0.9"
        />
        <path
          d="M184 332c38-37 78-62 122-71 45-10 91-1 138 31"
          fill="none"
          stroke="#16213c"
          strokeDasharray="5 8"
          strokeLinecap="round"
          strokeWidth="5"
          opacity="0.32"
        />

        {[
          { x: 177, y: 118, label: "Norte" },
          { x: 244, y: 178, label: "Nordeste" },
          { x: 232, y: 248, label: "Centro-Oeste" },
          { x: 304, y: 287, label: "Sudeste" },
          { x: 250, y: 366, label: "Sul" },
        ].map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="16" fill="#fff" opacity="0.98" />
            <circle cx={point.x} cy={point.y} r="8" fill="#fb923c" />
            <text
              x={point.x + 20}
              y={point.y + 6}
              fill="#16213c"
              fontFamily="var(--font-display)"
              fontSize="14"
              fontWeight="700"
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
