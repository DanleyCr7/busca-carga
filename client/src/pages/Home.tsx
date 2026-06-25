import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowUpRight,
  Apple,
  BadgeCheck,
  Camera,
  CheckCircle,
  Clock,
  Download,
  Home as HomeIcon,
  Instagram,
  MapPin,
  MessageCircle,
  Package,
  Play,
  Send,
  Smartphone,
  Gift,
  Users,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";

const COLORS = {
  blue: "#1E40AF",
  green: "#10B981",
  orange: "#F59E0B",
};

const WHATSAPP_NUMBER = "558699960441";
const WHATSAPP_DISPLAY = "+55 86 9996-0441";
const WHATSAPP_MESSAGE =
  "Olá! Vim pela landing da Busca Frete e quero um orçamento para meu frete de cargas no Piauí, em São Paulo e em outras regiões do Brasil.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;
const APP_STORE_URL = "https://apps.apple.com/br/app/busca-frete/id6747501257";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.frete.busca";
const INSTAGRAM_URL = "https://www.instagram.com/busca.frete/";

const services = [
  {
    title: "Grande porte",
    description:
      "Cargas maiores que pedem espaço, organização e uma rota dedicada.",
    icon: Truck,
  },
  {
    title: "Carga completa",
    description:
      "Quando o envio precisa ir inteiro no mesmo frete, com mais controle no app.",
    icon: Package,
  },
  {
    title: "Carga dedicada",
    description:
      "Para atender volumes altos com atenção no horário de retirada e entrega.",
    icon: HomeIcon,
  },
  {
    title: "Cobertura em expansão",
    description:
      "Operação com base no Piauí e em São Paulo, expandindo para novas regiões com atendimento ágil.",
    icon: MapPin,
  },
];

const steps = [
  {
    title: "Chame no WhatsApp",
    description:
      "Toque no botão principal e envie sua mensagem com o pedido de frete de cargas.",
    icon: MessageCircle,
  },
  {
    title: "Envie itens e fotos",
    description:
      "Conte o que precisa levar, mande fotos, endereço de origem e destino para agilizar.",
    icon: Camera,
  },
  {
    title: "Receba orientação rápida",
    description:
      "A equipe responde com o caminho mais simples para organizar seu frete na sua região.",
    icon: Send,
  },
  {
    title: "Acompanhe no app",
    description:
      "Combine os detalhes, receba as propostas no app e acompanhe a marca no Instagram.",
    icon: CheckCircle,
  },
];

const localHighlights = [
  {
    title: "Carreto de cargas",
    description:
      "Caixas, mercadorias, eletrodomésticos e volumes saindo do lugar certo sem enrolação.",
    icon: Truck,
    color: COLORS.orange,
  },
  {
    title: "Operação nacional",
    description:
      "Atendimento com base no Piauí e em São Paulo, com expansão para outras regiões do país.",
    icon: MapPin,
    color: COLORS.blue,
  },
  {
    title: "Carga dedicada",
    description:
      "Quando a carga grande precisa de uma rota exclusiva e acompanhamento mais próximo.",
    icon: HomeIcon,
    color: COLORS.green,
  },
  {
    title: "Carga completa",
    description:
      "Quando o pedido pede uma viagem dedicada e propostas rápidas no app.",
    icon: Package,
    color: COLORS.orange,
  },
];

const driverHighlights = [
  {
    title: "Baixe o app",
    description:
      "Instale pela App Store ou no Google Play e faça seu cadastro de motorista.",
    icon: Smartphone,
    color: COLORS.blue,
  },
  {
    title: "Cadastro completo",
    description:
      "Preencha seus dados no app para deixar a conta pronta para receber fretes.",
    icon: BadgeCheck,
    color: COLORS.green,
  },
  {
    title: "Receba fretes",
    description:
      "Acompanhe as oportunidades de cargas da plataforma no Piauí, em São Paulo e em expansão para outras regiões.",
    icon: Truck,
    color: COLORS.orange,
  },
  {
    title: "Programa de indicação",
    description:
      "Indique um motorista. Se ele concluir o cadastro completo e fizer o primeiro frete, você ganha R$ 10.",
    icon: Gift,
    color: COLORS.blue,
  },
];

const faqs = [
  {
    question: "Vocês atendem só carga grande?",
    answer:
      "Sim. O foco desta página é grande porte, com frete de cargas para volumes maiores e operação ativa no Piauí, em São Paulo e em expansão para outras regiões.",
  },
  {
    question: "Posso pedir orçamento pelo WhatsApp?",
    answer:
      "Sim. O WhatsApp é o contato principal para enviar fotos, explicar a carga e receber orientação rápida.",
  },
  {
    question: "Onde a operação atende hoje?",
    answer:
      "A operação hoje está no Piauí e em São Paulo, com expansão para outras regiões conforme a demanda cresce.",
  },
  {
    question: "Quais itens posso levar?",
    answer:
      "Caixas, mercadorias, equipamentos, eletrodomésticos e outros volumes podem entrar no orçamento.",
  },
];

const trackContactEvent = (eventName: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, {
      page: "cargas_landing_nacional",
      timestamp: new Date().toISOString(),
    });
  }
};

const openExternal = (url: string, eventName: string) => {
  trackContactEvent(eventName);
  window.open(url, "_blank", "noopener,noreferrer");
};

const SectionHeading = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) => (
  <div className="mx-auto mb-10 max-w-3xl text-center">
    <p
      className="mb-3 text-sm font-bold uppercase tracking-[0.18em]"
      style={{ color: COLORS.orange }}
    >
      {eyebrow}
    </p>
    <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
      {title}
    </h2>
    <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
      {description}
    </p>
  </div>
);

export default function Home() {
  const [showFixedCta, setShowFixedCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector(
        "#inicio"
      ) as HTMLElement | null;
      if (!heroSection) {
        setShowFixedCta(window.scrollY > 240);
        return;
      }

      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      setShowFixedCta(window.scrollY > heroBottom - 140);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    openExternal(WHATSAPP_URL, "contact_whatsapp_cargas");
  };

  const handleInstagramClick = () => {
    openExternal(INSTAGRAM_URL, "contact_instagram_cargas");
  };

  const handleAppStoreClick = () => {
    trackContactEvent("download_ios_app");
  };

  const handlePlayStoreClick = () => {
    trackContactEvent("download_android_app");
  };

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <a
            href="#inicio"
            className="flex items-center gap-3"
            aria-label="Busca Frete de Cargas"
          >
            <img
              src="/logo.png"
              alt=""
              aria-hidden="true"
              className="h-12 w-12 shrink-0 rounded-xl border border-slate-200 bg-white object-contain shadow-sm"
            />
            <span>
              <strong className="block text-lg font-bold text-slate-950">
                Busca Frete de Cargas
              </strong>
              <span className="block text-sm text-slate-600">
                Piauí, São Paulo e expansão nacional
              </span>
            </span>
          </a>

          <nav
            className="flex flex-wrap gap-2 text-sm font-semibold text-slate-700"
            aria-label="Navegação principal"
          >
            <a
              className="rounded-full px-3 py-2 hover:bg-slate-100"
              href="#servicos"
            >
              Serviços
            </a>
            <a
              className="rounded-full px-3 py-2 hover:bg-slate-100"
              href="#como-funciona"
            >
              Como funciona
            </a>
            <a
              className="rounded-full px-3 py-2 hover:bg-slate-100"
              href="#trabalhe-conosco"
            >
              Trabalhe conosco
            </a>
            <a
              className="rounded-full px-3 py-2 hover:bg-slate-100"
              href="#local"
            >
              Região
            </a>
            <a
              className="rounded-full px-3 py-2 hover:bg-slate-100"
              href="#faq"
            >
              FAQ
            </a>
          </nav>
        </div>
      </header>

      <main className="pb-28">
        <section
          id="inicio"
          className="bg-slate-950 px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8"
        >
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <div className="mb-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                  Frete de cargas
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                  Piauí e São Paulo
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                  Motorista parceiro
                </span>
              </div>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Frete de cargas sem dor de cabeça.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
                O Busca Frete de Cargas ajuda você a levar cargas maiores, como
                caixas, mercadorias, eletrodomésticos e volumes altos, com uma
                conversa simples e direta.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={handleWhatsAppClick}
                  className="min-h-[52px] rounded-xl px-6 text-base font-bold text-slate-950 shadow-lg hover:opacity-95"
                  style={{ backgroundColor: COLORS.green }}
                >
                  <MessageCircle size={20} aria-hidden="true" />
                  Falar no WhatsApp
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleInstagramClick}
                  className="min-h-[52px] rounded-xl border-white/25 bg-white/10 px-6 text-base font-bold text-white hover:bg-white/15 hover:text-white"
                >
                  <Instagram size={20} aria-hidden="true" />
                  Ver Instagram
                </Button>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-start gap-3">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white"
                      style={{ backgroundColor: COLORS.orange }}
                      aria-hidden="true"
                    >
                      <Users size={22} />
                    </span>
                    <div className="min-w-0">
                      <strong className="block text-sm font-bold text-white">
                        Motorista parceiro
                      </strong>
                      <p className="mt-1 text-sm leading-6 text-slate-300">
                        Baixe o app, faça seu cadastro completo e comece a
                        receber fretes de cargas no Piauí, em São Paulo e em outras regiões.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-blue-100/20 bg-blue-500/10 p-5">
                  <div className="flex items-start gap-3">
                    <span
                      className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-600 text-white shadow-sm"
                      aria-hidden="true"
                    >
                      <span className="absolute inset-0 animate-ping rounded-xl bg-blue-400/30" />
                      <Gift size={20} className="relative" />
                    </span>
                    <div className="min-w-0">
                      <strong className="block text-sm font-bold text-white">
                        Indicação no app
                      </strong>
                      <p className="mt-1 text-sm leading-6 text-slate-300">
                        O programa fica dentro do app para você indicar outro
                        motorista e acompanhar o bônus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="#trabalhe-conosco"
                className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-blue-300 hover:text-blue-200"
              >
                Ver programa de indicação
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <strong className="block text-base">Contato direto</strong>
                  <span className="mt-1 block text-sm leading-6 text-slate-300">
                    {WHATSAPP_DISPLAY} para orçamento e dúvidas.
                  </span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <strong className="block text-base">Foco em cargas</strong>
                  <span className="mt-1 block text-sm leading-6 text-slate-300">
                    Grande porte para qualquer tipo de frete.
                  </span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <strong className="block text-base">Propostas no app</strong>
                  <span className="mt-1 block text-sm leading-6 text-slate-300">
                    Baixe na App Store ou no Google Play para receber as
                    propostas do grande porte.
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 text-slate-950 shadow-2xl">
              <div
                className="rounded-xl p-5 text-white"
                style={{ backgroundColor: COLORS.blue }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-100">
                      Receba propostas no app
                    </p>
                    <h2 className="mt-3 text-2xl font-bold">
                      Baixe o app e acompanhe as propostas da sua carga.
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-blue-100">
                      Depois de mandar os detalhes no WhatsApp, use o app para
                      receber as propostas no celular com mais praticidade.
                    </p>
                  </div>
                  <Clock className="mt-1 shrink-0 text-orange-300" size={30} />
                </div>
              </div>

              <div className="mt-5 grid gap-4">
                {[
                  "Envie fotos dos volumes e caixas.",
                  "Informe que é grande porte e envie os detalhes da carga.",
                  "Receba as propostas no app quando tudo estiver pronto.",
                ].map(item => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <CheckCircle
                      className="mt-0.5 shrink-0"
                      size={20}
                      style={{ color: COLORS.green }}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium leading-6 text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="mt-5 flex w-full items-center justify-between rounded-xl px-5 py-4 text-left font-bold text-white transition hover:opacity-95"
                style={{ backgroundColor: COLORS.orange }}
              >
                Falar no WhatsApp
                <ArrowUpRight size={20} aria-hidden="true" />
              </button>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Button
                  asChild
                  onClick={handleAppStoreClick}
                  size="lg"
                  className="h-auto min-h-[52px] rounded-xl bg-slate-950 px-4 py-3 text-base font-bold text-white hover:bg-slate-800"
                >
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download size={18} aria-hidden="true" />
                    App Store
                  </a>
                </Button>
                <Button
                  asChild
                  onClick={handlePlayStoreClick}
                  size="lg"
                  variant="outline"
                  className="h-auto min-h-[52px] rounded-xl border-slate-200 bg-white px-4 py-3 text-base font-bold text-slate-950 hover:bg-slate-50"
                >
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download size={18} aria-hidden="true" />
                    Google Play
                  </a>
                </Button>
              </div>
              <p className="mt-3 text-center text-xs leading-5 text-slate-500">
                Baixe o app para receber as propostas da sua carga no iPhone ou
                no Android.
              </p>
            </div>
          </div>
        </section>

        <section
          id="trabalhe-conosco"
          className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Motorista parceiro"
              title="Trabalhe conosco"
              description="Se você é motorista, baixe o app, faça seu cadastro completo e comece a receber fretes no Piauí, em São Paulo e em outras regiões. Indique outro motorista e ganhe R$ 10 quando ele concluir o cadastro completo e fizer o primeiro frete na plataforma."
            />

            <div className="mx-auto mb-8 flex max-w-3xl flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                onClick={handleAppStoreClick}
                size="lg"
                className="min-h-[52px] rounded-xl bg-slate-950 px-6 text-base font-bold text-white hover:bg-slate-800"
              >
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Apple size={20} aria-hidden="true" />
                  Baixar na App Store
                </a>
              </Button>
              <Button
                asChild
                onClick={handlePlayStoreClick}
                size="lg"
                variant="outline"
                className="min-h-[52px] rounded-xl border-slate-200 bg-white px-6 text-base font-bold text-slate-950 hover:bg-slate-50"
              >
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Play size={20} aria-hidden="true" />
                  Baixar no Google Play
                </a>
              </Button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {driverHighlights.map(item => {
                const Icon = item.icon;

                return (
                  <Card
                    key={item.title}
                    className="h-full rounded-2xl border-slate-200 p-6 shadow-sm"
                  >
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon size={24} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-slate-950">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="servicos" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="O que fazemos"
              title="Frete de cargas para a vida real"
              description="A página fala com quem precisa resolver uma carga maior, sem cadastro obrigatório e sem linguagem complicada."
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map(service => {
                const Icon = service.icon;
                return (
                  <Card
                    key={service.title}
                    className="h-full rounded-2xl border-slate-200 p-6 shadow-sm"
                  >
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                      style={{ backgroundColor: COLORS.blue }}
                    >
                      <Icon size={24} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-slate-950">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {service.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="como-funciona"
          className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Como funciona"
              title="Do pedido ao agendamento em poucos passos"
              description="O caminho é direto para o WhatsApp, com informações fáceis de enviar e resposta pensada para operações no Piauí, em São Paulo e em expansão."
            />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                        style={{
                          backgroundColor:
                            index === 1
                              ? COLORS.green
                              : index === 2
                                ? COLORS.orange
                                : COLORS.blue,
                        }}
                      >
                        <Icon size={23} aria-hidden="true" />
                      </span>
                      <span className="text-sm font-bold text-slate-400">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-slate-950">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="video" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p
                className="mb-3 text-sm font-bold uppercase tracking-[0.18em]"
                style={{ color: COLORS.orange }}
              >
                Vídeo
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Veja o app em ação.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Assista ao vídeo e veja como o Busca Frete ajuda você a receber
                propostas para frete de cargas no Piauí, em São Paulo e em
                outras regiões, com foco total em grande porte.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  onClick={handleAppStoreClick}
                  size="lg"
                  className="min-h-[52px] rounded-xl bg-slate-950 px-6 text-base font-bold text-white hover:bg-slate-800"
                >
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Apple size={20} aria-hidden="true" />
                    App Store
                  </a>
                </Button>
                <Button
                  asChild
                  onClick={handlePlayStoreClick}
                  size="lg"
                  variant="outline"
                  className="min-h-[52px] rounded-xl border-slate-200 bg-white px-6 text-base font-bold text-slate-950 hover:bg-slate-50"
                >
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Play size={20} aria-hidden="true" />
                    Google Play
                  </a>
                </Button>
              </div>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
                Baixe o app para acompanhar as propostas da sua carga com mais
                praticidade, onde quer que a operação esteja crescendo.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-lg">
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/01ub8UwHzs4"
                  title="BuscaFrete em Ação"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        <section id="local" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p
                className="mb-3 text-sm font-bold uppercase tracking-[0.18em]"
                style={{ color: COLORS.orange }}
              >
                Cobertura
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Piauí, São Paulo e expansão para outras regiões.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Atendimento para transporte de itens, carreto de cargas e frete
                de grande porte com base no Piauí e em São Paulo.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={handleWhatsAppClick}
                  className="min-h-[52px] rounded-xl px-6 text-base font-bold text-white"
                  style={{ backgroundColor: COLORS.blue }}
                >
                  <MessageCircle size={20} aria-hidden="true" />
                  Pedir orçamento
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleInstagramClick}
                  className="min-h-[52px] rounded-xl px-6 text-base font-bold"
                >
                  <Instagram size={20} aria-hidden="true" />
                  @busca.frete
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {localHighlights.map(item => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <span
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-white"
                      style={{ backgroundColor: item.color }}
                      aria-hidden="true"
                    >
                      <Icon size={24} />
                    </span>
                    <strong className="text-lg text-slate-950">
                      {item.title}
                    </strong>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              eyebrow="Perguntas rápidas"
              title="Dúvidas antes de chamar"
              description="As respostas já deixam claro o foco em cargas e encurtam o caminho até o orçamento."
            />

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${index + 1}`}
                  className="rounded-2xl border border-slate-200 bg-white px-6"
                >
                  <AccordionTrigger className="text-left text-base font-bold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-base leading-7 text-slate-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-10 rounded-2xl bg-slate-950 p-6 text-center text-white">
              <h3 className="text-2xl font-bold">
                Baixe o app e receba as propostas da sua carga.
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-slate-300">
                O WhatsApp continua aberto para falar com a equipe, e o app é
                onde você acompanha as propostas de grande porte no celular,
                em operações que já rodam no Piauí, em São Paulo e em expansão.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  onClick={handleAppStoreClick}
                  size="lg"
                  className="min-h-[52px] rounded-xl bg-white px-6 text-base font-bold text-slate-950 hover:bg-slate-100"
                >
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download size={20} aria-hidden="true" />
                    App Store
                  </a>
                </Button>
                <Button
                  asChild
                  onClick={handlePlayStoreClick}
                  size="lg"
                  variant="outline"
                  className="min-h-[52px] rounded-xl border-white/25 bg-white/10 px-6 text-base font-bold text-white hover:bg-white/15 hover:text-white"
                >
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download size={20} aria-hidden="true" />
                    Google Play
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt=""
              aria-hidden="true"
              className="h-11 w-11 shrink-0 rounded-xl border border-slate-200 bg-white object-contain shadow-sm"
            />
            <div>
              <strong className="block text-base text-slate-950">
                Busca Frete de Cargas
              </strong>
              <span>Piauí, São Paulo e expansão nacional • Frete de cargas sem dor de cabeça</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 md:text-right">
            <span>WhatsApp {WHATSAPP_DISPLAY}</span>
            <span>Instagram @busca.frete</span>
          </div>
        </div>
      </footer>

      <div
        className={`fixed bottom-3 right-4 z-50 w-[min(calc(100%-2rem),520px)] rounded-2xl border border-white/10 bg-slate-950/95 p-2 text-white shadow-2xl backdrop-blur transition duration-300 sm:bottom-4 sm:p-3 ${
          showFixedCta
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0"
        }`}
        role="navigation"
        aria-label="Ações rápidas"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <strong className="block text-sm sm:text-base">
              Receba as propostas da sua carga.
            </strong>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button
                asChild
                onClick={handleAppStoreClick}
                size="sm"
                className="h-9 rounded-full border border-white/10 bg-white/10 px-3 text-xs font-semibold text-white hover:bg-white/15 hover:text-white"
              >
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Apple size={14} aria-hidden="true" />
                  App Store
                </a>
              </Button>
              <Button
                asChild
                onClick={handlePlayStoreClick}
                size="sm"
                className="h-9 rounded-full border border-white/10 bg-white/10 px-3 text-xs font-semibold text-white hover:bg-white/15 hover:text-white"
              >
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Play size={14} aria-hidden="true" />
                  Google Play
                </a>
              </Button>
            </div>
          </div>
          <div className="sm:shrink-0">
            <Button
              onClick={handleWhatsAppClick}
              className="min-h-[44px] w-full rounded-xl px-4 font-bold text-slate-950 sm:w-auto"
              style={{ backgroundColor: COLORS.green }}
            >
              <MessageCircle size={18} aria-hidden="true" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
