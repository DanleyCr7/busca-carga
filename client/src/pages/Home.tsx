import {
  ArrowRight,
  Box,
  Building2,
  CalendarClock,
  Check,
  Home as HomeIcon,
  MapPin,
  Package,
  ShieldCheck,
  Smartphone,
  Sofa,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import { ConsentBanner } from "@/components/landing/ConsentBanner";
import { MarketingHeader } from "@/components/landing/MarketingHeader";
import { usePublicResidentialPilot } from "@/hooks/usePublicResidentialPilot";
import { trackLandingEvent } from "@/lib/analytics";

const clientLink = import.meta.env.VITE_APPSFLYER_CLIENT_ONELINK_URL;

const solutions = [
  {
    icon: Box,
    title: "Itens avulsos",
    text: "Geladeira, sofá, cama, armário e outros itens da sua casa.",
  },
  {
    icon: Sofa,
    title: "Pequenas mudanças",
    text: "Para poucos móveis e volumes, com veículo calculado pelos itens.",
  },
  {
    icon: HomeIcon,
    title: "Mudanças completas",
    text: "Informe acessos, ajudantes e fotos para receber propostas adequadas.",
  },
];

function HomeAndAppVisual() {
  return (
    <div
      aria-label="Ilustração de casa e aplicativo Busca Frete"
      className="relative mx-auto min-h-[430px] w-full max-w-[520px]"
    >
      <div className="absolute inset-x-4 bottom-6 top-20 rounded-[2.5rem] bg-[linear-gradient(145deg,#dff7f2,#c9e8ff)]" />
      <div className="absolute bottom-16 left-2 w-[58%] rounded-[2rem] bg-white p-6 shadow-xl">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-[#e4f4ff] text-[#1254d8]">
          <HomeIcon className="size-8" />
        </div>
        <div className="mt-7 h-3 w-3/4 rounded bg-slate-200" />
        <div className="mt-3 h-3 w-1/2 rounded bg-slate-100" />
        <div className="mt-8 flex gap-3">
          <span className="h-12 flex-1 rounded-xl bg-[#eaf7f3]" />
          <span className="h-12 flex-1 rounded-xl bg-[#fff2df]" />
        </div>
      </div>
      <div className="absolute right-2 top-2 w-[54%] rounded-[2.4rem] border-[7px] border-[#0b1f45] bg-white p-4 shadow-2xl">
        <div className="mx-auto h-1.5 w-16 rounded-full bg-[#0b1f45]" />
        <p className="mt-6 text-[10px] font-bold text-[#0b1f45]">
          Solicitar frete residencial
        </p>
        <div className="mt-4 rounded-xl bg-[#edf5ff] p-3">
          <MapPin className="size-4 text-[#1254d8]" />
          <div className="mt-2 h-2 rounded bg-white" />
          <div className="mt-2 h-2 w-3/4 rounded bg-white" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="h-16 rounded-xl bg-[#e8f8f3]" />
          <div className="h-16 rounded-xl bg-[#fff0dd]" />
        </div>
        <div className="mt-3 rounded-xl bg-[#1254d8] py-3 text-center text-[9px] font-bold text-white">
          Receber propostas
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { pilot, failed } = usePublicResidentialPilot();
  const cities = pilot?.available ? pilot.cities : [];

  useEffect(() => {
    window.scrollTo(0, 0);
    trackLandingEvent("landing_view", {
      audience: "client",
      pilot: "abc-residencial-v1",
    });
  }, []);
  useEffect(() => {
    if (pilot?.available)
      trackLandingEvent("coverage_view", {
        audience: "client",
        pilot: pilot.pilotSlug,
      });
    if (pilot?.promotion)
      trackLandingEvent("promotion_view", {
        audience: "client",
        pilot: pilot.pilotSlug,
      });
  }, [pilot]);

  return (
    <div className="min-h-screen bg-white text-[#0b1f45]">
      <MarketingHeader />
      <main>
        <section className="overflow-hidden bg-[radial-gradient(circle_at_80%_15%,#d9f7ee_0,transparent_38%),linear-gradient(180deg,#f4f9ff_0%,#fff_100%)]">
          <div className="container grid min-h-[650px] items-center gap-8 py-16 lg:grid-cols-[1.02fr_.98fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e1f3ff] px-4 py-2 text-xs font-bold text-[#1254d8]">
                <Sparkles className="size-4" /> Piloto residencial no ABC
                Paulista
              </span>
              <h1 className="mt-7 max-w-2xl text-4xl font-black leading-[1.05] tracking-[-.04em] sm:text-5xl lg:text-6xl">
                Seu frete residencial no ABC,{" "}
                <span className="text-[#1254d8]">do seu jeito.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Agende com pelo menos 48 horas de antecedência, informe os itens
                e receba propostas de motoristas aptos para a sua mudança.
              </p>
              {pilot?.promotion && (
                <div className="mt-5 inline-flex rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
                  ABC30 · até R$ 30 de benefício no lançamento
                </div>
              )}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  role="link"
                  href={clientLink || undefined}
                  aria-disabled={!clientLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={event => {
                    if (!clientLink) {
                      event.preventDefault();
                      return;
                    }
                    trackLandingEvent("store_cta_click", {
                      audience: "client",
                      store: "onelink",
                      pilot: pilot?.pilotSlug ?? "abc-residencial-v1",
                    });
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1254d8] px-6 py-4 font-bold text-white shadow-lg shadow-blue-700/20 aria-disabled:cursor-not-allowed aria-disabled:opacity-60"
                >
                  Baixar o app e solicitar <ArrowRight className="size-5" />
                </a>
                <a
                  href="/motoristas"
                  onClick={() =>
                    trackLandingEvent("driver_cta_click", {
                      audience: "driver",
                      pilot: pilot?.pilotSlug ?? "abc-residencial-v1",
                    })
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-4 font-bold"
                >
                  Sou motorista <Truck className="size-5" />
                </a>
              </div>
              <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-600" /> Propostas livres
                </span>
                <span className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-600" /> Fotos e acessos
                </span>
                <span className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-600" /> Data agendada
                </span>
              </div>
            </div>
            <HomeAndAppVisual />
          </div>
        </section>

        <section id="solucoes" className="container py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-[#128b77]">
              O que você pode transportar
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Da geladeira à mudança completa
            </h2>
            <p className="mt-4 text-slate-600">
              O app calcula a categoria de veículo a partir do que você
              informar.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {solutions.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#e9f3ff] text-[#1254d8]">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="como-funciona" className="bg-[#0b1f45] py-20 text-white">
          <div className="container">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-[#78d9c9]">
              Simples e transparente
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Como funciona
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                [
                  Package,
                  "1. Conte o que vai levar",
                  "Adicione itens, fotos, origem, destino, acessos e ajudantes.",
                ],
                [
                  CalendarClock,
                  "2. Escolha a data",
                  "Agende o serviço com antecedência mínima de 48 horas.",
                ],
                [
                  Users,
                  "3. Compare propostas",
                  "Escolha a proposta de um motorista elegível para a rota.",
                ],
              ].map(([Icon, title, text]) => {
                const StepIcon = Icon as typeof Package;
                return (
                  <article
                    key={String(title)}
                    className="rounded-3xl bg-white/8 p-7"
                  >
                    <StepIcon className="size-8 text-[#78d9c9]" />
                    <h3 className="mt-5 text-xl font-bold">{String(title)}</h3>
                    <p className="mt-3 leading-7 text-blue-100/75">
                      {String(text)}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="cobertura" className="container py-20">
          <div className="grid gap-10 rounded-[2.5rem] bg-[#eff8f6] p-8 lg:grid-cols-[.9fr_1.1fr] lg:p-12">
            <div>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-[#128b77]">
                <MapPin />
              </span>
              <h2 className="mt-6 text-3xl font-black">
                Cobertura residencial em expansão
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                No momento, o piloto atende rotas residenciais internas entre as
                cidades liberadas. Outras regiões serão adicionadas
                gradualmente.
              </p>
            </div>
            <div className="flex flex-wrap content-center gap-3">
              {cities.length > 0 ? (
                cities.map(city => (
                  <span
                    key={city}
                    className="rounded-full border border-emerald-200 bg-white px-5 py-3 font-bold text-[#0f7565]"
                  >
                    {city}
                  </span>
                ))
              ) : (
                <span className="rounded-full border border-emerald-200 bg-white px-5 py-3 font-bold text-[#0f7565]">
                  ABC Paulista
                </span>
              )}
              {failed && (
                <p className="w-full pt-3 text-sm text-slate-500">
                  Consulte a disponibilidade atual no aplicativo.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="container pb-20">
          <div className="grid items-center gap-8 rounded-[2.5rem] border border-blue-100 bg-[#f5f9ff] p-8 lg:grid-cols-2 lg:p-12">
            <div>
              <ShieldCheck className="size-10 text-[#1254d8]" />
              <h2 className="mt-5 text-3xl font-black">
                Informações para uma proposta mais segura
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Fotos, quantidade de itens, tipo de acesso e necessidade de
                ajudantes ajudam o motorista a avaliar o serviço antes de enviar
                uma proposta.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm font-bold">
              <span className="rounded-2xl bg-white p-5">
                <Building2 className="mb-3 text-[#1254d8]" /> Casa ou
                apartamento
              </span>
              <span className="rounded-2xl bg-white p-5">
                <Smartphone className="mb-3 text-[#1254d8]" /> Tudo pelo app
              </span>
              <span className="rounded-2xl bg-white p-5">
                <CalendarClock className="mb-3 text-[#1254d8]" /> Serviço
                agendado
              </span>
              <span className="rounded-2xl bg-white p-5">
                <Users className="mb-3 text-[#1254d8]" /> Ajudantes informados
              </span>
            </div>
          </div>
        </section>

        <section id="aplicativo" className="container pb-20">
          <div className="flex flex-col items-start justify-between gap-8 rounded-[2.5rem] bg-[#1254d8] p-8 text-white lg:flex-row lg:items-center lg:p-12">
            <div className="max-w-2xl">
              <Smartphone className="size-10 text-blue-100" />
              <h2 className="mt-5 text-3xl font-black">
                Acompanhe tudo pelo aplicativo
              </h2>
              <p className="mt-4 leading-7 text-blue-100">
                Crie a solicitação, compare propostas e acompanhe o frete
                residencial em um só lugar.
              </p>
            </div>
            <a
              role="link"
              href={clientLink || undefined}
              aria-disabled={!clientLink}
              target="_blank"
              rel="noreferrer"
              onClick={event => {
                if (!clientLink) {
                  event.preventDefault();
                  return;
                }
                trackLandingEvent("store_cta_click", {
                  audience: "client",
                  store: "onelink",
                  pilot: pilot?.pilotSlug ?? "abc-residencial-v1",
                });
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-[#1254d8] aria-disabled:cursor-not-allowed aria-disabled:opacity-60"
            >
              Baixar o Busca Frete <ArrowRight className="size-5" />
            </a>
          </div>
        </section>

        <section
          id="cargas"
          className="border-t border-slate-200 bg-slate-50 py-16"
        >
          <div className="container flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[.18em] text-slate-500">
                Serviço complementar
              </p>
              <h2 className="mt-3 text-3xl font-black">
                Também precisa transportar cargas?
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                A Busca Frete continua conectando cargas e motoristas. A
                disponibilidade varia por região e tipo de veículo; consulte a
                disponibilidade no app.
              </p>
            </div>
            <a
              role="link"
              href={clientLink || undefined}
              aria-disabled={!clientLink}
              onClick={event => {
                if (!clientLink) event.preventDefault();
              }}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-4 font-bold aria-disabled:cursor-not-allowed aria-disabled:opacity-60"
            >
              Consultar no aplicativo <ArrowRight className="size-5" />
            </a>
          </div>
        </section>
      </main>
      <footer className="bg-[#071731] py-10 text-sm text-blue-100/65">
        <div className="container flex flex-col justify-between gap-4 sm:flex-row">
          <p>© 2026 Busca Frete. Frete residencial e transporte de cargas.</p>
          <a href="/privacidade">Política de privacidade</a>
        </div>
      </footer>
      <ConsentBanner />
    </div>
  );
}
