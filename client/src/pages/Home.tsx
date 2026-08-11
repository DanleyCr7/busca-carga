import {
  ArrowRight,
  Box,
  CalendarClock,
  Camera,
  Clock3,
  Home as HomeIcon,
  MapPin,
  Route,
  ShieldCheck,
  Smartphone,
  Sofa,
  Sparkles,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useEffect, type MouseEvent, type ReactNode } from "react";
import { ConsentBanner } from "@/components/landing/ConsentBanner";
import { MarketingHeader } from "@/components/landing/MarketingHeader";
import { usePublicResidentialPilot } from "@/hooks/usePublicResidentialPilot";
import { trackLandingEvent } from "@/lib/analytics";

const clientLink = import.meta.env.VITE_APPSFLYER_CLIENT_ONELINK_URL;

type IconContent = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const vehicleCategories = [
  {
    category: "Categoria 1",
    name: "Caminhão pequeno",
    text: "Para item avulso e mudanças com poucos volumes.",
    image: "/images/residential/category-1-small-truck.webp",
    imageAlt: "Caminhão pequeno de categoria 1 para frete residencial",
  },
  {
    category: "Categoria 2",
    name: "Caminhão médio",
    text: "Para pequenas mudanças e apartamentos compactos.",
    image: "/images/residential/category-2-medium-truck.webp",
    imageAlt: "Caminhão médio de categoria 2 para frete residencial",
  },
  {
    category: "Categoria 3",
    name: "Caminhão grande",
    text: "Para mudanças completas e maior quantidade de itens.",
    image: "/images/residential/category-3-large-truck.webp",
    imageAlt: "Caminhão grande de categoria 3 para frete residencial",
  },
] as const;

const solutions: IconContent[] = [
  {
    icon: Box,
    title: "Itens avulsos",
    text: "Geladeira, sofá, cama, armário e outros itens da sua casa.",
  },
  {
    icon: Sofa,
    title: "Pequenas mudanças",
    text: "O veículo é calculado a partir dos itens que você informar.",
  },
  {
    icon: HomeIcon,
    title: "Mudanças completas",
    text: "Descreva os volumes para receber propostas compatíveis.",
  },
  {
    icon: Camera,
    title: "Fotos e acessos",
    text: "Mostre os itens e informe escadas, elevador e tipo de imóvel.",
  },
  {
    icon: Users,
    title: "Ajudantes informados",
    text: "Indique se o serviço precisa de ajudantes na coleta ou entrega.",
  },
  {
    icon: ShieldCheck,
    title: "Motoristas aptos",
    text: "Receba propostas de motoristas elegíveis para a rota e a data.",
  },
];

const steps: IconContent[] = [
  {
    icon: Route,
    title: "Informe rota e itens",
    text: "Adicione origem, destino, itens, fotos e detalhes dos acessos.",
  },
  {
    icon: CalendarClock,
    title: "Escolha a data",
    text: "Agende o frete com pelo menos 48 horas de antecedência.",
  },
  {
    icon: Users,
    title: "Compare propostas",
    text: "Avalie as propostas livres enviadas pelos motoristas aptos.",
  },
  {
    icon: Smartphone,
    title: "Acompanhe o frete",
    text: "Consulte os detalhes e acompanhe o serviço pelo aplicativo.",
  },
];

function AppLink({
  children,
  variant = "primary",
}: {
  children: ReactNode;
  variant?: "primary" | "light" | "outline";
}) {
  const variants = {
    primary:
      "bg-[#1757ba] text-white shadow-[0_12px_28px_rgba(23,87,186,.2)] hover:bg-[#114ca7]",
    light: "bg-white text-[#1757ba] hover:bg-blue-50",
    outline: "border border-[#1757ba] bg-white text-[#1757ba] hover:bg-blue-50",
  };

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!clientLink) {
      event.preventDefault();
      return;
    }

    trackLandingEvent("store_cta_click", {
      audience: "client",
      store: "onelink",
      pilot: "abc-residencial-v1",
    });
  }

  return (
    <a
      role="link"
      href={clientLink || undefined}
      aria-disabled={!clientLink}
      target="_blank"
      rel="noreferrer"
      onClick={handleClick}
      className={
        "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-extrabold transition aria-disabled:cursor-not-allowed aria-disabled:opacity-60 " +
        variants[variant]
      }
    >
      {children}
    </a>
  );
}

export default function Home() {
  const { pilot, failed } = usePublicResidentialPilot();
  const cities = pilot?.available ? pilot.cities : [];
  const visibleCities = cities.length > 0 ? cities : ["ABC Paulista"];
  const minimumLeadHours = pilot?.minimumLeadHours ?? 48;
  const facts = [
    {
      icon: MapPin,
      value: (cities.length || 3) + " cidades",
      label: "no núcleo inicial",
    },
    {
      icon: Clock3,
      value: minimumLeadHours + " horas",
      label: "de antecedência mínima",
    },
    {
      icon: Truck,
      value: "3 categorias",
      label: "de caminhões residenciais",
    },
    {
      icon: Sparkles,
      value: "Expansão em andamento",
      label: "novas cidades gradualmente",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    trackLandingEvent("landing_view", {
      audience: "client",
      pilot: "abc-residencial-v1",
    });
  }, []);

  useEffect(() => {
    if (pilot?.available) {
      trackLandingEvent("coverage_view", {
        audience: "client",
        pilot: pilot.pilotSlug,
      });
    }

    if (pilot?.promotion) {
      trackLandingEvent("promotion_view", {
        audience: "client",
        pilot: pilot.pilotSlug,
      });
    }
  }, [pilot]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#101a35]">
      <MarketingHeader />
      <main>
        <section id="inicio" className="overflow-hidden bg-[#edf5ff]">
          <div className="container grid min-h-[620px] items-center gap-12 py-14 lg:grid-cols-[.88fr_1.12fr] lg:py-16">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-extrabold text-[#1757ba]">
                <MapPin className="size-4" /> Piloto residencial no ABC Paulista
              </span>
              <h1 className="mt-7 max-w-xl text-4xl font-black leading-[1.06] tracking-[-.045em] sm:text-5xl lg:text-[3.65rem]">
                Seu frete residencial no ABC,{" "}
                <span className="text-[#1757ba]">do seu jeito.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Agende com pelo menos 48 horas de antecedência, informe os itens
                e receba propostas de motoristas aptos para a sua mudança.
              </p>

              {pilot?.promotion && (
                <div className="mt-5 inline-flex rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-extrabold text-emerald-800">
                  ABC30 · até R$ 30 de benefício no lançamento
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <AppLink>
                  Baixar o app e solicitar <ArrowRight className="size-4" />
                </AppLink>
                <a
                  href="/motoristas"
                  onClick={() =>
                    trackLandingEvent("driver_cta_click", {
                      audience: "driver",
                      pilot: pilot?.pilotSlug ?? "abc-residencial-v1",
                    })
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#1757ba] bg-white px-6 py-3.5 text-sm font-extrabold text-[#1757ba] transition hover:bg-blue-50"
                >
                  Sou motorista <Truck className="size-4" />
                </a>
              </div>

              <div className="mt-7 inline-flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-[0_8px_22px_rgba(23,87,186,.08)]">
                <Clock3 className="size-5 text-[#1757ba]" />
                Agendamento mínimo de 48 horas
              </div>
            </div>

            <figure className="relative mx-auto aspect-[9/6.4] w-full max-w-[700px]">
              <img
                src="/images/residential/abc-pilot-map.svg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 size-full object-contain"
              />
              <img
                src="/images/residential/category-2-medium-truck.webp"
                alt="Caminhão para frete residencial sobre o mapa do ABC Paulista"
                className="absolute bottom-[2%] right-[-2%] w-[57%] object-contain drop-shadow-[0_18px_22px_rgba(16,26,53,.22)]"
              />
              <figcaption className="absolute bottom-[4%] left-[6%] inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 shadow-sm">
                <MapPin className="size-4" /> Novas cidades em breve
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="solucoes" className="py-16 sm:py-20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-extrabold uppercase tracking-[.2em] text-[#1757ba]">
                Veículo calculado pelos itens
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Do item avulso à mudança completa
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                O aplicativo recomenda a categoria adequada a partir do que você
                informar na solicitação.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {vehicleCategories.map(vehicle => (
                <article
                  key={vehicle.category}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(16,26,53,.06)]"
                >
                  <div className="flex aspect-[16/10] items-center justify-center bg-[#f3f7ff] p-4">
                    <img
                      src={vehicle.image}
                      alt={vehicle.imageAlt}
                      className="size-full object-contain transition duration-300 hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#1757ba]">
                      {vehicle.category}
                    </p>
                    <h3 className="mt-2 text-xl font-black">{vehicle.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {vehicle.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-20">
          <div className="container rounded-3xl bg-[#f6f9fe] px-5 py-12 sm:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-extrabold uppercase tracking-[.2em] text-[#1757ba]">
                Serviço residencial
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Tudo o que sua mudança precisa
              </h2>
            </div>
            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {solutions.map(({ icon: Icon, title, text }, index) => {
                const iconColor =
                  index % 3 === 0
                    ? "bg-blue-50 text-[#1757ba]"
                    : index % 3 === 1
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-orange-50 text-orange-700";
                return (
                  <article
                    key={title}
                    className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_22px_rgba(16,26,53,.04)]"
                  >
                    <span
                      className={
                        "flex size-12 shrink-0 items-center justify-center rounded-xl " +
                        iconColor
                      }
                    >
                      <Icon className="size-6" />
                    </span>
                    <div>
                      <h3 className="font-extrabold">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {text}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="como-funciona" className="pb-16 sm:pb-20">
          <div className="container">
            <div className="text-center">
              <p className="text-xs font-extrabold uppercase tracking-[.2em] text-[#1757ba]">
                É rápido, claro e agendado
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Como funciona
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {steps.map(({ icon: Icon, title, text }, index) => (
                <article
                  key={title}
                  className="relative min-h-64 rounded-2xl border border-blue-100 bg-[#f8fbff] p-6 pt-16"
                >
                  <span className="absolute left-5 top-5 flex size-9 items-center justify-center rounded-full bg-[#1757ba] text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <Icon className="size-10 text-[#1757ba]" strokeWidth={1.7} />
                  <h3 className="mt-5 text-lg font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {text}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 grid overflow-hidden rounded-2xl bg-[#1555bd] px-4 py-4 text-white sm:grid-cols-2 lg:grid-cols-4">
              {facts.map(({ icon: Icon, value, label }, index) => {
                const borders =
                  (index > 0 ? "border-t border-white/20 sm:border-t-0 " : "") +
                  (index % 2 === 1 ? "sm:border-l sm:border-white/20 " : "") +
                  (index > 1 ? "lg:border-l lg:border-white/20" : "");
                return (
                  <div
                    key={value}
                    className={"flex items-center gap-3 px-4 py-4 " + borders}
                  >
                    <Icon
                      className="size-8 shrink-0 text-blue-100"
                      strokeWidth={1.6}
                    />
                    <div>
                      <strong className="block text-base font-black">
                        {value}
                      </strong>
                      <span className="text-xs text-blue-100">{label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-20">
          <div className="container">
            <div className="grid items-center gap-7 overflow-hidden rounded-2xl bg-[#0d4fc5] px-7 py-8 text-white lg:grid-cols-[.48fr_1fr_auto] lg:px-10">
              <img
                src="/images/residential/category-1-small-truck.webp"
                alt="Caminhão pequeno de motorista parceiro"
                className="mx-auto hidden max-h-40 w-full object-contain lg:block"
                loading="lazy"
              />
              <div>
                <h2 className="text-2xl font-black">
                  Seja um motorista parceiro
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">
                  O cadastro está liberado. Após a aprovação, informe sua
                  disponibilidade para atender as cidades do piloto.
                </p>
              </div>
              <a
                href="/motoristas"
                onClick={() =>
                  trackLandingEvent("driver_cta_click", {
                    audience: "driver",
                    pilot: pilot?.pilotSlug ?? "abc-residencial-v1",
                  })
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white px-5 py-3 text-sm font-extrabold transition hover:bg-white hover:text-[#1757ba]"
              >
                Cadastrar como motorista <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </section>

        <section id="cobertura" className="pb-16 sm:pb-20">
          <div className="container grid items-center gap-10 rounded-3xl bg-[#f5f8fe] px-6 py-10 lg:grid-cols-[.8fr_1.2fr] lg:px-12">
            <div>
              <span className="flex size-12 items-center justify-center rounded-xl bg-white text-[#1757ba] shadow-sm">
                <MapPin className="size-6" />
              </span>
              <h2 className="mt-6 text-3xl font-black leading-tight sm:text-4xl">
                Cobertura residencial no ABC Paulista
              </h2>
              <p className="mt-4 max-w-lg leading-7 text-slate-600">
                O piloto atende rotas residenciais internas entre as cidades
                liberadas. A expansão acontecerá gradualmente.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {visibleCities.map(city => (
                  <span
                    key={city}
                    className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-extrabold text-[#1757ba]"
                  >
                    {city}
                  </span>
                ))}
              </div>
              {failed && (
                <p className="mt-4 text-sm text-slate-500">
                  Consulte a disponibilidade atual no aplicativo.
                </p>
              )}
            </div>
            <img
              src="/images/residential/abc-pilot-map.svg"
              alt="Mapa das cidades atendidas pelo piloto residencial no ABC Paulista"
              className="mx-auto w-full max-w-[620px] object-contain"
              loading="lazy"
            />
          </div>
        </section>

        <section id="aplicativo" className="pb-16 sm:pb-20">
          <div className="container">
            <div className="grid items-center gap-8 rounded-2xl bg-[#1555bd] px-7 py-8 text-white md:grid-cols-[1fr_auto] md:px-10">
              <div className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Smartphone className="size-6" />
                </span>
                <div>
                  <h2 className="text-2xl font-black">
                    Acompanhe tudo pelo aplicativo
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
                    Solicite sua mudança, compare propostas e acompanhe o frete
                    residencial em um só lugar.
                  </p>
                </div>
              </div>
              <AppLink variant="light">
                Baixar o Busca Frete <ArrowRight className="size-4" />
              </AppLink>
            </div>
          </div>
        </section>

        <section
          id="cargas"
          className="border-t border-slate-200 bg-slate-50 py-16"
        >
          <div className="container grid items-center gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.2em] text-slate-500">
                Frete de cargas também está disponível
              </p>
              <h2 className="mt-3 text-3xl font-black">
                Também precisa transportar cargas?
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-600">
                A Busca Frete também conecta cargas e motoristas. A
                disponibilidade varia por região e tipo de veículo; consulte a
                disponibilidade no app.
              </p>
              <div className="mt-6">
                <AppLink variant="outline">
                  Consultar no aplicativo <ArrowRight className="size-4" />
                </AppLink>
              </div>
            </div>
            <div className="flex min-h-64 items-center justify-center overflow-hidden rounded-2xl bg-white px-6">
              <img
                src="/images/residential/category-3-large-truck.webp"
                alt="Caminhão baú para transporte de cargas"
                className="max-h-72 w-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#081936] py-10 text-sm text-blue-100/70">
        <div className="container flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <p>© 2026 Busca Frete. Frete residencial e transporte de cargas.</p>
          <div className="flex flex-wrap gap-5">
            <a href="/privacidade" className="hover:text-white">
              Política de privacidade
            </a>
            <a href="/exclusao-de-dados" className="hover:text-white">
              Exclusão de dados
            </a>
          </div>
        </div>
      </footer>
      <ConsentBanner />
    </div>
  );
}
