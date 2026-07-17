import {
  ArrowDown,
  ArrowUp,
  Building2,
  Check,
  Clock3,
  Headphones,
  MapPin,
  PackageCheck,
  Search,
  ShieldCheck,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";
import { useEffect } from "react";

const vehicles = [
  ["Carreta Baú", "Carga fechada"],
  ["Carroceria Aberta", "Cargas secas"],
  ["Truck Baú", "Carga fechada"],
  ["Carroceria Sider", "Carga seca"],
  ["Van", "Entregas menores"],
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
  { title: "Publique sua carga", text: "Informe origem, destino e detalhes da sua carga em poucos segundos." },
  { title: "Receba propostas", text: "Motoristas qualificados enviam propostas com os melhores valores." },
  { title: "Escolha e acompanhe", text: "Escolha o melhor frete e acompanhe sua carga em tempo real." },
] as const;

const metrics = [
  { icon: Users, value: "+25.000", label: "Motoristas cadastrados" },
  { icon: PackageCheck, value: "+80.000", label: "Cargas transportadas" },
  { icon: MapPin, value: "+5.000", label: "Cidades atendidas" },
  { icon: ShieldCheck, value: "98%", label: "Satisfação dos clientes" },
] as const;

function EmptyImage({ slot, className = "" }: { slot: string; className?: string }) {
  return <img alt="" aria-hidden="true" data-image-slot={slot} className={`image-placeholder ${className}`} />;
}

export default function Home() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#101a35]">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="container flex h-20 items-center justify-between gap-6">
          <a href="#inicio" aria-label="Busca Frete" className="shrink-0">
            <img src="/logo_with_name.svg" alt="Busca Frete" className="h-10 w-auto" />
          </a>
          <nav aria-label="Navegação principal" className="hidden items-center gap-7 text-xs font-semibold text-slate-600 lg:flex">
            <a href="#inicio">Início</a><a href="#como-funciona">Como funciona</a><a href="#servicos">Serviços</a>
            <a href="#solucoes">Para empresas</a><a href="#cobertura">Motoristas</a><a href="#sobre">Sobre nós</a>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <button type="button" className="rounded-md border border-[#1757ba] px-4 py-2 text-xs font-bold text-[#1757ba]">Entrar</button>
            <button type="button" className="rounded-md bg-[#1757ba] px-4 py-2 text-xs font-bold text-white">Cadastrar</button>
          </div>
        </div>
      </header>

      <main>
        <section id="inicio" className="relative overflow-hidden bg-[linear-gradient(105deg,#fff_5%,#f7fbff_58%,#eaf4ff_100%)]">
          <div className="container grid min-h-[650px] items-center gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
            <div className="relative z-10">
              <h1 className="max-w-xl text-4xl font-extrabold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-[3.65rem]">
                O frete certo <span className="text-[#1757ba]">para sua carga, em qualquer lugar do Brasil.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-7 text-slate-600">Conectamos você ao motorista ideal para grandes cargas com segurança, agilidade e o melhor preço.</p>
              <div aria-label="Busca visual de frete" className="mt-8 grid max-w-2xl gap-2 rounded-xl bg-white p-2 shadow-[0_14px_40px_rgba(22,65,130,.12)] sm:grid-cols-[1fr_1fr_auto]">
                <label className="flex min-w-0 items-center gap-3 rounded-lg px-3 py-2">
                  <ArrowUp className="size-5 text-[#1757ba]" /><span className="min-w-0"><strong className="block text-xs">Origem</strong><input aria-label="Origem" disabled placeholder="Cidade ou estado" className="w-full bg-transparent text-sm outline-none disabled:opacity-100" /></span>
                </label>
                <label className="flex min-w-0 items-center gap-3 border-slate-200 rounded-lg px-3 py-2 sm:border-l">
                  <ArrowDown className="size-5 text-[#1757ba]" /><span className="min-w-0"><strong className="block text-xs">Destino</strong><input aria-label="Destino" disabled placeholder="Cidade ou estado" className="w-full bg-transparent text-sm outline-none disabled:opacity-100" /></span>
                </label>
                <button type="button" className="rounded-lg bg-[#1757ba] px-7 py-4 text-sm font-bold text-white">Buscar frete</button>
              </div>
              <div className="mt-7 grid max-w-2xl gap-4 text-xs sm:grid-cols-3">
                <div className="flex gap-2"><PackageCheck className="size-5 text-[#1757ba]" /><span><strong className="block">Melhores preços</strong>Compare e economize</span></div>
                <div className="flex gap-2"><ShieldCheck className="size-5 text-[#1757ba]" /><span><strong className="block">Motoristas verificados</strong>Segurança em cada etapa</span></div>
                <div className="flex gap-2"><Clock3 className="size-5 text-[#1757ba]" /><span><strong className="block">Acompanhamento</strong>Em tempo real</span></div>
              </div>
            </div>
            <EmptyImage slot="hero-map-truck" className="aspect-[5/4] w-full" />
          </div>
        </section>

        <section id="servicos" className="py-14 sm:py-18">
          <div className="container">
            <h2 className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl">Do pequeno ao extrapesado, a gente entrega.</h2>
            <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
              {vehicles.map(([title, description]) => <article key={title} className="text-center"><EmptyImage slot={`vehicle-${title.toLowerCase().replaceAll(" ", "-")}`} className="mx-auto aspect-[16/9] w-full" /><h3 className="mt-4 text-sm font-bold">{title}</h3><p className="mt-1 text-xs text-slate-500">{description}</p></article>)}
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
              {steps.map((step, index) => <article key={step.title} className="relative rounded-xl bg-[#f9fbff] p-5"><span className="absolute left-4 top-4 flex size-9 items-center justify-center rounded-full bg-[#1757ba] text-sm font-bold text-white">{index + 1}</span><EmptyImage slot={`step-${index + 1}`} className="mx-auto aspect-[16/9] w-4/5" /><h3 className="mt-4 text-sm font-bold">{step.title}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{step.text}</p></article>)}
            </div>
            <div className="mt-8 grid overflow-hidden rounded-2xl bg-[linear-gradient(120deg,#114aa9,#155bd0)] px-5 py-7 text-white sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map(({ icon: Icon, value, label }) => <div key={label} className="border-white/20 px-4 py-4 text-center lg:border-r lg:last:border-r-0"><Icon className="mx-auto size-8 stroke-1" /><strong className="mt-3 block text-2xl">{value}</strong><span className="text-xs text-blue-100">{label}</span></div>)}
            </div>
          </div>
        </section>

        <section id="cobertura" className="pb-10">
          <div className="container grid items-center gap-8 rounded-3xl bg-[#f7faff] px-6 py-10 lg:grid-cols-[0.72fr_1fr_0.72fr] lg:px-10">
            <div><h2 className="text-3xl font-extrabold leading-tight">Atendemos <span className="block text-[#1757ba]">todo o Brasil</span></h2><p className="mt-5 text-sm leading-6 text-slate-600">Nossa plataforma conecta embarcadores e motoristas em todos os estados, com cobertura nacional e suporte dedicado.</p><a href="#inicio" className="mt-6 inline-flex rounded-md bg-[#1757ba] px-5 py-3 text-xs font-bold text-white">Quero enviar uma carga</a></div>
            <EmptyImage slot="coverage-map" className="aspect-square w-full" />
            <ul className="space-y-4 text-sm">{["Cobertura nacional", "Suporte em todas as regiões", "Parcerias com transportadoras e motoristas de confiança", "Agilidade e segurança em todo o processo"].map(item => <li key={item} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-[#1757ba]" />{item}</li>)}</ul>
          </div>
        </section>

        <section id="sobre" className="pb-12">
          <div className="container"><div className="flex flex-col items-center gap-5 rounded-2xl bg-[#eef5ff] px-6 py-5 sm:flex-row"><EmptyImage slot="support-avatar" className="size-16 shrink-0 rounded-full" /><div className="flex-1 text-center sm:text-left"><h2 className="font-bold text-[#1757ba]">Precisa de ajuda para encontrar o frete ideal?</h2><p className="mt-1 text-xs text-slate-500">Fale com nosso time e receba suporte especializado.</p></div><button type="button" className="inline-flex items-center gap-2 rounded-md bg-[#1757ba] px-6 py-3 text-xs font-bold text-white"><Headphones className="size-4" />Falar com um especialista</button></div></div>
        </section>
      </main>
    </div>
  );
}
