import { ArrowRight } from "lucide-react";

export function MarketingHeader({ driver = false }: { driver?: boolean }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="container flex h-18 items-center justify-between py-3">
        <a href="/" aria-label="Busca Frete">
          <img
            src="/logo_with_name.svg"
            alt="Busca Frete"
            className="h-10 w-auto"
          />
        </a>
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex"
        >
          {!driver && <a href="#solucoes">O que transportar</a>}
          <a href="#como-funciona">Como funciona</a>
          <a href="#cobertura">Cobertura</a>
          {!driver && <a href="#cargas">Frete de cargas</a>}
        </nav>
        <a
          href={driver ? "/" : "/motoristas"}
          className="inline-flex items-center gap-2 rounded-xl border border-[#1254d8] px-4 py-2 text-sm font-bold text-[#1254d8]"
        >
          {driver ? "Sou cliente" : "Sou motorista"}{" "}
          <ArrowRight className="size-4" />
        </a>
      </div>
    </header>
  );
}
