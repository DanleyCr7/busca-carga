import {
  Building2,
  Check,
  Clock3,
  Headphones,
  MapPin,
  Menu,
  PackageCheck,
  Search,
  ShieldCheck,
  Smartphone,
  Truck,
  Users,
  Warehouse,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { TawkChat } from "@/components/landing/TawkChat";

const vehicles = [
  { title: "Carreta Baú", description: "Carga fechada", image: "/images/carreta-bau-busca-frete.png", imageAlt: "Carreta baú da Busca Frete" },
  { title: "Carroceria Aberta", description: "Cargas secas", image: "/images/caminhao-carroceria-aberta.png", imageAlt: "Caminhão de carroceria aberta" },
  { title: "Truck Baú", description: "Carga fechada", image: "/images/caminhao-truck-bau.png", imageAlt: "Caminhão truck baú" },
  { title: "Carroceria Sider", description: "Carga seca", image: "/images/caminhao-carroceria-sider.png", imageAlt: "Caminhão de carroceria sider com lona azul" },
] as const;

const solutions = [
  { icon: Truck, title: "Transporte de cargas nacionais", text: "Encontre motoristas para cargas em todo o Brasil.", color: "blue" },
  { icon: PackageCheck, title: "Cargas dedicadas ou ponto a ponto", text: "Mais segurança e controle para sua operação.", color: "mint" },
  { icon: Warehouse, title: "Cargas fechadas e lotações", text: "Ideal para grandes volumes e longas distâncias.", color: "green" },
  { icon: Building2, title: "Fretes para empresas", text: "Soluções personalizadas para o seu negócio.", color: "orange" },
  { icon: Search, title: "Acompanhamento em tempo real", text: "Monitore sua carga do início ao destino final.", color: "purple" },
  { icon: ShieldCheck, title: "Seguro de carga", text: "Mais tranquilidade e proteção para sua mercadoria.", color: "yellow" },
] as const;

const steps = [
  { title: "Publique sua carga", text: "Informe origem, destino e detalhes da sua carga em poucos segundos.", image: "/images/como-funciona-caminhao.png", imageAlt: "Caminhão de carga da Busca Frete" },
  { title: "Receba propostas", text: "Motoristas qualificados enviam propostas com os melhores valores.", image: "/images/como-funciona-painel.png", imageAlt: "Painel web da Busca Frete com acompanhamento de entrega" },
  { title: "Escolha e acompanhe", text: "Escolha o melhor frete e acompanhe sua carga em tempo real.", image: "/images/como-funciona-aplicativo.png", imageAlt: "Aplicativo móvel da Busca Frete com rastreamento da carga" },
] as const;

const metrics = [
  { icon: Users, value: "+25.000", label: "Motoristas cadastrados" },
  { icon: PackageCheck, value: "+80.000", label: "Cargas transportadas" },
  { icon: MapPin, value: "+5.000", label: "Cidades atendidas" },
  { icon: ShieldCheck, value: "98%", label: "Satisfação dos clientes" },
] as const;

const appStores = {
  apple: "https://apps.apple.com/br/app/busca-frete/id6747501257",
  google: "https://play.google.com/store/apps/details?id=com.frete.busca",
} as const;

const specialistWhatsAppUrl =
  "https://wa.me/558699960441?text=Ol%C3%A1%21%20Preciso%20de%20ajuda%20para%20encontrar%20o%20frete%20ideal.";

function AppStoreLink({ store }: { store: keyof typeof appStores }) {
  const isApple = store === "apple";

  return (
    <a
      href={appStores[store]}
      target="_blank"
      rel="noreferrer"
      aria-label={`Baixar Busca Frete na ${isApple ? "App Store" : "Google Play"}`}
      className="flex h-8 items-center gap-1.5 rounded-md bg-black px-2 text-white transition hover:bg-slate-800 sm:h-9 sm:px-2.5"
    >
      {isApple ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0 fill-current sm:size-5">
          <path d="M17.05 12.54c-.02-2.25 1.84-3.34 1.92-3.4a4.12 4.12 0 0 0-3.24-1.75c-1.36-.14-2.68.82-3.37.82-.7 0-1.76-.8-2.91-.78a4.3 4.3 0 0 0-3.62 2.2c-1.57 2.72-.4 6.72 1.1 8.91.75 1.07 1.63 2.27 2.77 2.23 1.12-.05 1.54-.72 2.9-.72 1.34 0 1.74.72 2.91.7 1.2-.02 1.96-1.08 2.68-2.16a8.9 8.9 0 0 0 1.23-2.5 3.9 3.9 0 0 1-2.37-3.55ZM14.84 5.95a3.96 3.96 0 0 0 .9-2.84 4.03 4.03 0 0 0-2.61 1.35 3.78 3.78 0 0 0-.93 2.73 3.34 3.34 0 0 0 2.64-1.24Z" />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0 sm:size-5">
          <path fill="#00d7fe" d="M3.3 2.2 14 12 3.3 21.8c-.2-.4-.3-.8-.3-1.3v-17c0-.5.1-.9.3-1.3Z" />
          <path fill="#ffce00" d="m14 12 3.5-3.2 3.9 2.2c.8.5.8 1.5 0 2l-3.9 2.2L14 12Z" />
          <path fill="#00f076" d="M3.3 2.2c.5-.7 1.3-.9 2.1-.4l12.1 7-3.5 3.2L3.3 2.2Z" />
          <path fill="#f63448" d="M3.3 21.8 14 12l3.5 3.2-12.1 7c-.8.5-1.6.3-2.1-.4Z" />
        </svg>
      )}
      <span className="whitespace-nowrap leading-none">
        <small className="block text-[6px] uppercase tracking-wide sm:text-[7px]">{isApple ? "Baixar na" : "Disponível no"}</small>
        <strong className="mt-0.5 block text-[10px] font-semibold sm:text-[11px]">{isApple ? "App Store" : "Google Play"}</strong>
      </span>
    </a>
  );
}

function EmptyImage({ slot, className = "" }: { slot: string; className?: string }) {
  return <img alt="" aria-hidden="true" data-image-slot={slot} className={`image-placeholder ${className}`} />;
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#101a35]">
      <TawkChat />
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="container flex h-20 items-center justify-between gap-6">
          <a href="#inicio" aria-label="Busca Frete" className="shrink-0">
            <img src="/logo_with_name.svg" alt="Busca Frete" className="h-10 w-auto" />
          </a>
          <nav aria-label="Navegação principal" className="hidden items-center gap-7 text-xs font-semibold text-slate-600 lg:flex">
            <a href="#inicio">Início</a><a href="#como-funciona">Como funciona</a><a href="#servicos">Serviços</a>
            <a href="#solucoes">Para empresas</a><a href="#cobertura">Motoristas</a><a href="#sobre">Sobre nós</a>
          </nav>
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <AppStoreLink store="apple" />
            <AppStoreLink store="google" />
          </div>
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-md p-2 text-[#1757ba] lg:hidden"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <nav aria-label="Menu mobile" className="border-t border-slate-100 bg-white px-5 py-4 lg:hidden">
            <div className="container flex flex-col gap-4 text-sm font-semibold text-slate-600">
              {[['Início', '#inicio'], ['Como funciona', '#como-funciona'], ['Serviços', '#servicos'], ['Para empresas', '#solucoes'], ['Motoristas', '#cobertura'], ['Sobre nós', '#sobre']].map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMobileMenuOpen(false)}>{label}</a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <div className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-2 rounded-xl bg-white/90 p-1.5 shadow-[0_8px_28px_rgba(16,38,80,.2)] backdrop-blur lg:hidden">
        <AppStoreLink store="apple" />
        <AppStoreLink store="google" />
      </div>

      <main>
                <section id="inicio" className="relative overflow-hidden bg-[#e1f0fc] max-lg:overflow-visible">
          <div className="container grid min-h-[650px] items-center gap-10 py-14 max-lg:pb-24 lg:grid-cols-[53%_47%] lg:py-20">
            <div className="relative z-10">
              <h1 className="max-w-xl text-3xl font-extrabold leading-[1.08] tracking-[-0.045em] sm:text-3xl lg:text-[3rem]">
                O frete certo <span className="text-[#1757ba]">para sua carga, em qualquer lugar do Brasil.</span>
              </h1>
              <p className="mt-6 max-w-md text-sm leading-7 text-slate-600">Conectamos você ao motorista ideal para grandes cargas com segurança, agilidade e o melhor preço.</p>
              <div aria-label="Aplicativo Busca Frete" className="mt-7 flex max-w-2xl flex-col gap-3 rounded-xl bg-white px-4 py-3.5 shadow-[0_12px_32px_rgba(22,65,130,.12)] sm:grid sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-5">
                <div className="flex items-start gap-3 sm:contents">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,#1764de,#0638ac)] text-white shadow-[0_8px_18px_rgba(23,87,186,.22)]">
                    <Smartphone aria-hidden="true" className="size-6 stroke-[1.8]" />
                  </span>
                  <div className="min-w-0">
                    <strong className="text-sm font-extrabold leading-tight">O Busca Frete está na palma da sua mão</strong>
                    <p className="text-[11px] leading-4 text-slate-500">Acompanhe suas cargas, negocie e receba atualizações onde estiver.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:flex-col">
                  <AppStoreLink store="apple" />
                  <AppStoreLink store="google" />
                </div>
              </div>
              {/* desktop cards */}
              <div className="mt-7 hidden max-w-3xl grid-cols-3 gap-4 text-[11px] lg:grid">
                <div className="flex gap-2"><PackageCheck className="size-9 text-[#1757ba]" /><span><strong className="block font-semibold">Melhores preços</strong>Compare e economize</span></div>
                <div className="flex gap-2"><ShieldCheck className="size-9 text-[#1757ba]" /><span><strong className="block font-semibold">Motoristas verificados</strong>Segurança em cada etapa</span></div>
                <div className="flex gap-2"><Clock3 className="size-9 text-[#1757ba]" /><span><strong className="block font-semibold">Acompanhamento</strong>Em tempo real</span></div>
              </div>
            </div>
            <div className="relative mx-auto aspect-[5/4] w-[84%] overflow-hidden rounded-3xl sm:mx-0 sm:aspect-[5/4] sm:w-full">
              <img
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
          {/* mobile cards — entre azul e branco */}
          <div className="absolute inset-x-0 bottom-0 z-10 translate-y-1/2 lg:hidden">
            <div className="container grid grid-cols-3 gap-4 text-[11px]">
              <div className="flex flex-col items-center gap-1.5 rounded-xl bg-white p-3 text-center shadow-[0_4px_10px_rgba(22,65,130,.08)]"><PackageCheck className="size-7 text-[#1757ba]" /><span><strong className="block font-semibold">Melhores preços</strong>Compare e economize</span></div>
              <div className="flex flex-col items-center gap-1.5 rounded-xl bg-white p-3 text-center shadow-[0_4px_10px_rgba(22,65,130,.08)]"><ShieldCheck className="size-7 text-[#1757ba]" /><span><strong className="block font-semibold">Motoristas verificados</strong>Segurança em cada etapa</span></div>
              <div className="flex flex-col items-center gap-1.5 rounded-xl bg-white p-3 text-center shadow-[0_4px_10px_rgba(22,65,130,.08)]"><Clock3 className="size-7 text-[#1757ba]" /><span><strong className="block font-semibold">Acompanhamento</strong>Em tempo real</span></div>
            </div>
          </div>
        </section>

        <section id="servicos" className="py-14 max-lg:pt-24 sm:py-18">
          <div className="container">
            <h2 className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl">Do pequeno ao extrapesado, a gente entrega.</h2>
            <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {vehicles.map(({ title, description, image, imageAlt }) => <article key={title} className="text-center"><img src={image} alt={imageAlt} data-image-slot={`vehicle-${title.toLowerCase().replaceAll(" ", "-")}`} className="image-placeholder mx-auto aspect-[16/9] w-full object-contain" /><h3 className="mt-4 text-sm font-bold">{title}</h3><p className="mt-1 text-xs text-slate-500">{description}</p></article>)}
            </div>
            <div className="mt-9 text-center"><a href="#solucoes" className="inline-flex rounded-md border border-[#1757ba] px-5 py-3 text-xs font-bold text-[#1757ba]">Ver todos os tipos de veículos</a></div>
          </div>
        </section>

        <section id="solucoes" className="py-5 sm:py-8">
          <div className="container rounded-3xl bg-[#f7faff] px-5 py-10 sm:px-10">
            <h2 className="text-center text-2xl font-extrabold">Soluções completas para sua logística</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {solutions.map(({ icon: Icon, title, text, color }) => <article key={title} className="flex gap-4 rounded-xl bg-white p-5 shadow-[0_8px_25px_rgba(28,66,125,.04)]"><span className={`solution-icon solution-icon-${color}`}><Icon className="size-6" /></span><div><h3 className="text-sm font-bold">{title}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{text}</p></div></article>)}
            </div>
          </div>
        </section>

        <section id="como-funciona" className="py-14">
          <div className="container">
            <h2 className="text-center text-2xl font-extrabold">Como funciona</h2><p className="mt-1 text-center text-sm text-slate-500">É rápido, fácil e seguro</p>
            <div className="mt-9 grid gap-5 lg:grid-cols-3">
              {steps.map((step, index) => <article key={step.title} className="relative rounded-xl bg-[#f9fbff] p-5"><span className="absolute left-4 top-4 z-10 flex size-9 items-center justify-center rounded-full bg-[#1757ba] text-sm font-bold text-white">{index + 1}</span><img src={step.image} alt={step.imageAlt} data-image-slot={`step-${index + 1}`} className="image-placeholder mx-auto aspect-[16/9] w-4/5 object-contain" /><h3 className="mt-4 text-sm font-bold">{step.title}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{step.text}</p></article>)}
            </div>
            <div className="mt-8 grid overflow-hidden rounded-2xl bg-[linear-gradient(120deg,#114aa9,#155bd0)] px-5 py-7 text-white grid-cols-2 lg:grid-cols-4">
              {metrics.map(({ icon: Icon, value, label }) => <div key={label} className="border-white/20 px-4 py-4 text-center lg:border-r lg:last:border-r-0"><Icon className="mx-auto size-8 stroke-1" /><strong className="mt-3 block text-2xl">{value}</strong><span className="text-xs text-blue-100">{label}</span></div>)}
            </div>
          </div>
        </section>

        <section id="cobertura" className="pb-10">
          <div className="container grid items-center gap-8 rounded-3xl bg-[#f7faff] px-6 py-10 lg:grid-cols-[0.72fr_1fr_0.72fr] lg:px-10">
            <div><h2 className="text-3xl font-extrabold leading-tight">Atendemos <span className="block text-[#1757ba]">todo o Brasil</span></h2><p className="mt-5 text-sm leading-6 text-slate-600">Nossa plataforma conecta embarcadores e motoristas em todos os estados, com cobertura nacional e suporte dedicado.</p><a href="#inicio" className="mt-6 inline-flex rounded-md bg-[#1757ba] px-5 py-3 text-xs font-bold text-white">Quero enviar uma carga</a></div>
            <img
              src="/images/mapa-brasil-busca-frete-corrigido.svg"
              alt="Mapa do Brasil representando a cobertura nacional da Busca Frete"
              data-image-slot="coverage-map"
              className="image-placeholder aspect-square w-full object-contain"
            />
            <ul className="space-y-4 text-sm">{["Cobertura nacional", "Suporte em todas as regiões", "Parcerias com transportadoras e motoristas de confiança", "Agilidade e segurança em todo o processo"].map(item => <li key={item} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-[#1757ba]" />{item}</li>)}</ul>
          </div>
        </section>

        <section id="sobre" className="pb-12">
          <div className="container"><div className="flex flex-col items-center gap-5 rounded-2xl bg-[#eef5ff] px-6 py-5 sm:flex-row"><img src="/images/atendimento-busca-frete.png" alt="Atendimento especializado da Busca Frete" data-image-slot="support-avatar" className="image-placeholder size-16 shrink-0 rounded-full object-cover" /><div className="flex-1 text-center sm:text-left"><h2 className="font-bold text-[#1757ba]">Precisa de ajuda para encontrar o frete ideal?</h2><p className="mt-1 text-xs text-slate-500">Fale com nosso time e receba suporte especializado.</p></div><a href={specialistWhatsAppUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-[#1757ba] px-6 py-3 text-xs font-bold text-white"><Headphones className="size-4" />Falar com um especialista</a></div></div>
        </section>
      </main>
    </div>
  );
}
