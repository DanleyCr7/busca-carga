import { ArrowRight, CircleDashed } from "lucide-react";

export function RoutePanelMock() {
  return (
    <div
      className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-6"
      aria-label="Painel visual de origem e destino"
    >
      <div
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-blue)]/40 to-transparent"
        aria-hidden="true"
      />
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--brand-blue)]">
            Painel visual
          </p>
          <h3 className="mt-2 text-xl font-black text-slate-950">Simule a leitura de uma rota</h3>
        </div>
        <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
          Sem envio
        </span>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-bold text-slate-700" htmlFor="route-origin">
          Origem
          <input
            id="route-origin"
            value="Cidade ou endereco de origem"
            readOnly
            disabled
            aria-disabled="true"
            className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-500 disabled:opacity-100"
          />
        </label>

        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
          <CircleDashed aria-hidden="true" className="size-4 text-[var(--brand-blue)]" />
          Deslocamento ilustrativo
        </div>

        <label className="grid gap-2 text-sm font-bold text-slate-700" htmlFor="route-destination">
          Destino
          <input
            id="route-destination"
            value="Cidade ou endereco de destino"
            readOnly
            disabled
            aria-disabled="true"
            className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-500 disabled:opacity-100"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-dashed border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-sm leading-6 text-slate-600">
          Os campos existem apenas como referencia visual e nao enviam dados.
        </p>
        <a
          href="#servicos"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-navy)] px-5 py-3 text-sm font-black text-white transition hover:bg-[var(--brand-blue)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-blue)]"
        >
          Ver tipos de servico
          <ArrowRight aria-hidden="true" className="size-4" />
        </a>
      </div>
    </div>
  );
}
