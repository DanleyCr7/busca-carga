import {
  ArrowRight,
  Box,
  Camera,
  Clock3,
  Home as HomeIcon,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Smartphone,
  Sofa,
  Sparkles,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useEffect, type MouseEvent, type ReactNode } from "react";
import { BrazilAbcCoverageMap } from "@/components/landing/BrazilAbcCoverageMap";
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

const steps = [
  {
    title: "Informe rota, itens e data",
    text: "Adicione origem, destino e itens, e agende com pelo menos 48 horas de antecedência.",
    image: "/images/como-funciona-caminhao.png",
    imageAlt: "Caminhão da Busca Frete para a solicitação residencial",
  },
  {
    title: "Compare propostas",
    text: "Receba propostas livres de motoristas aptos e escolha a melhor opção para você.",
    image: "/images/como-funciona-painel.png",
    imageAlt: "Propostas recebidas pelo Busca Frete",
  },
  {
    title: "Acompanhe o frete",
    text: "Consulte os detalhes e acompanhe o serviço residencial pelo aplicativo.",
    image: "/images/como-funciona-aplicativo.png",
    imageAlt: "Acompanhamento do frete no aplicativo Busca Frete",
  },
] as const;

const heroBenefits: IconContent[] = [
  {
    icon: PackageCheck,
    title: "Propostas livres",
    text: "Compare e escolha",
  },
  {
    icon: ShieldCheck,
    title: "Motoristas aptos",
    text: "Para sua rota",
  },
  {
    icon: Clock3,
    title: "Agendamento",
    text: "Mínimo de 48 horas",
  },
];

function AppLink({
  children,
  variant = "primary",
  compact = false,
}: {
  children: ReactNode;
  variant?: "primary" | "light" | "outline";
  compact?: boolean;
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
        "inline-flex items-center justify-center gap-2 font-extrabold transition aria-disabled:cursor-not-allowed aria-disabled:opacity-60 " +
        (compact
          ? "rounded-lg px-4 py-2.5 text-xs "
          : "rounded-xl px-6 py-3.5 text-sm ") +
        variants[variant]
      }
    >
      {children}
    </a>
  );
}

function HeroBenefits({ mobile = false }: { mobile?: boolean }) {
  return (
    <ul
      data-testid={mobile ? "hero-benefits-mobile" : "hero-benefits-desktop"}
      className={
        mobile
          ? "container grid grid-cols-3 gap-2 text-[10px] sm:gap-4 sm:text-[11px]"
          : "mt-7 hidden max-w-3xl grid-cols-3 gap-4 text-[11px] lg:grid"
      }
    >
      {heroBenefits.map(({ icon: Icon, title, text }) => (
        <li
          key={title}
          className={
            mobile
              ? "flex flex-col items-center gap-1.5 rounded-xl bg-white p-3 text-center shadow-[0_4px_10px_rgba(22,65,130,.08)]"
              : "flex items-center gap-2"
          }
        >
          <Icon
            aria-hidden="true"
            className={
              mobile
                ? "size-7 shrink-0 text-[#1757ba]"
                : "size-9 shrink-0 text-[#1757ba]"
            }
          />
          <span>
            <strong className="block font-semibold">{title}</strong>
            {text}
          </span>
        </li>
      ))}
    </ul>
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
        <section
          id="inicio"
          className="relative overflow-hidden bg-[#e1f0fc] max-lg:overflow-visible"
        >
          <div className="container grid min-h-[650px] items-center gap-10 py-14 max-lg:pb-24 lg:grid-cols-[53%_47%] lg:py-20">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-extrabold text-[#1757ba]">
                <MapPin className="size-4" /> Piloto residencial no ABC Paulista
              </span>
              <h1 className="mt-7 max-w-xl text-3xl font-extrabold leading-[1.08] tracking-[-.045em] lg:text-[3rem]">
                Seu frete residencial no ABC,{" "}
                <span className="text-[#1757ba]">do seu jeito.</span>
              </h1>
              <p className="mt-6 max-w-md text-sm leading-7 text-slate-600">
                Agende com pelo menos 48 horas de antecedência, informe os itens
                e receba propostas de motoristas aptos para a sua mudança.
              </p>

              {pilot?.promotion && (
                <div className="mt-5 inline-flex rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-extrabold text-emerald-800">
                  ABC30 · até R$ 30 de benefício no lançamento
                </div>
              )}

              <div
                data-testid="hero-app-card"
                aria-label="Aplicativo Busca Frete"
                className="mt-7 flex max-w-2xl flex-col gap-3 rounded-xl bg-white px-4 py-3.5 shadow-[0_12px_32px_rgba(22,65,130,.12)] sm:grid sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-5"
              >
                <div className="flex items-start gap-3 sm:contents">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,#1764de,#0638ac)] text-white shadow-[0_8px_18px_rgba(23,87,186,.22)]">
                    <Smartphone
                      aria-hidden="true"
                      className="size-6 stroke-[1.8]"
                    />
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-sm font-extrabold leading-tight">
                      O Busca Frete está na palma da sua mão
                    </h2>
                    <p className="text-[11px] leading-4 text-slate-500">
                      Solicite seu frete residencial, compare propostas e
                      acompanhe o serviço pelo app.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:flex-col">
                  <AppLink compact>
                    Baixar o app <ArrowRight className="size-3.5" />
                  </AppLink>
                  <a
                    href="/motoristas"
                    onClick={() =>
                      trackLandingEvent("driver_cta_click", {
                        audience: "driver",
                        pilot: pilot?.pilotSlug ?? "abc-residencial-v1",
                      })
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#1757ba] bg-white px-4 py-2.5 text-xs font-extrabold text-[#1757ba] transition hover:bg-blue-50"
                  >
                    Sou motorista <Truck className="size-3.5" />
                  </a>
                </div>
              </div>

              <HeroBenefits />
            </div>

            <div className="relative mx-auto aspect-[5/4] w-[84%] overflow-hidden rounded-3xl sm:mx-0 sm:w-full">
              <img
                data-testid="hero-brazil-map"
                data-image-slot="hero-brazil-map"
                src="/images/mapa-cobertura-brasil.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 size-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 z-[1]"
                style={{
                  background: [
                    "linear-gradient(to right, #e1f0fc 0%, transparent 18%, transparent 82%, #e1f0fc 100%)",
                    "linear-gradient(to bottom, #e1f0fc 0%, transparent 18%, transparent 82%, #e1f0fc 100%)",
                  ].join(", "),
                }}
              />
              <img
                src="/images/busca-frete-caminhao.png"
                alt="Caminhão de carga da Busca Frete"
                data-image-slot="hero-map-truck"
                className="image-placeholder absolute inset-x-8 bottom-[-14%] z-10 h-[60%] w-full object-contain object-bottom sm:inset-x-10 sm:bottom-[-18%] sm:h-[72%]"
              />
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 translate-y-1/2 lg:hidden">
            <HeroBenefits mobile />
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

        <section
          id="como-funciona"
          data-testid="how-it-works"
          className="pb-16 sm:pb-20"
        >
          <div className="container">
            <div className="text-center">
              <p className="text-xs font-extrabold uppercase tracking-[.2em] text-[#1757ba]">
                É rápido, claro e agendado
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Como funciona
              </h2>
            </div>
            <div className="mt-9 grid gap-5 lg:grid-cols-3">
              {steps.map(({ title, text, image, imageAlt }, index) => (
                <article
                  key={title}
                  data-testid="how-step"
                  className="relative overflow-hidden rounded-xl bg-[#f9fbff] p-5"
                >
                  <span className="absolute left-4 top-4 z-10 flex size-9 items-center justify-center rounded-full bg-[#1757ba] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <img
                    src={image}
                    alt={imageAlt}
                    data-image-slot={`step-${index + 1}`}
                    className="image-placeholder mx-auto aspect-[16/9] w-4/5 object-contain"
                    loading="lazy"
                  />
                  <h3 className="mt-4 text-sm font-bold">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {text}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-2xl bg-[linear-gradient(120deg,#114aa9,#155bd0)] px-5 py-7 text-white lg:grid-cols-4">
              {facts.map(({ icon: Icon, value, label }) => (
                <div
                  key={value}
                  className="border-white/20 px-4 py-4 text-center lg:border-r lg:last:border-r-0"
                >
                  <Icon className="mx-auto size-8 stroke-1" />
                  <strong className="mt-3 block text-2xl">{value}</strong>
                  <span className="text-xs text-blue-100">{label}</span>
                </div>
              ))}
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
            <BrazilAbcCoverageMap />
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
    </div>
  );
}
