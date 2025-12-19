import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Truck,
  Clock,
  Gavel,
  MapPin,
  Zap,
  Lock,
  Smartphone,
  CheckCircle,
  Download,
  Shield,
  CreditCard,
  Award,
  HelpCircle,
  DollarSign,
  Car,
  Timer,
  AlertTriangle,
  TrendingUp,
  Star,
  Users,
  Gift,
  Crown,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

// Paleta de cores conforme especificado no documento
const COLORS = {
  azul: "#1E40AF",
  verde: "#10B981",
  laranja: "#F59E0B",
};

const DownloadButton = ({
  label,
  icon,
  onClick,
  compact = false,
  centered = false,
}: {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  compact?: boolean;
  centered?: boolean;
}) => (
  <Button
    onClick={onClick}
    style={{
      backgroundColor: compact ? COLORS.laranja : COLORS.laranja,
      border: 'none'
    }}
    className={`${compact
      ? "hover:opacity-90 active:opacity-85 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2 transition-all duration-300 min-h-[36px] text-sm shadow-lg"
      : "hover:opacity-90 active:opacity-85 text-white font-bold py-4 px-8 rounded-lg flex items-center gap-3 transition-all duration-300 min-h-[56px] text-base sm:text-lg touch-manipulation shadow-xl"
      } ${centered ? "block mx-auto" : ""}`}
  >
    {icon}
    {label}
  </Button>
);

const trackDownloadEvent = (platform: string) => {
  // Google Analytics event
  if ((window as any).gtag) {
    (window as any).gtag("event", "app_download_sp_pi", {
      platform: platform,
      timestamp: new Date().toISOString(),
    });
  }
};

export default function Home() {
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Handle sticky header visibility
    const handleScroll = () => {
      const heroSection = document.querySelector('#hero-section') as HTMLElement;
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setShowStickyHeader(window.scrollY > heroBottom - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAndroidDownload = () => {
    trackDownloadEvent("android");
    window.open("https://play.google.com/store/apps/details?id=com.frete.busca", "_blank");
  };

  const handleIOSDownload = () => {
    trackDownloadEvent("ios");
    window.open("https://apps.apple.com/br/app/busca-frete/id6747501257", "_blank");
  };

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/busca.frete/", "_blank");
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5586999960441", "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header com CTAs */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-200 transition-transform duration-300 ${showStickyHeader ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-2">
              <Truck size={24} style={{ color: COLORS.azul }} />
              <span className="font-bold text-lg" style={{ color: COLORS.azul }}>BuscaFrete</span>
            </div>

            {/* CTAs no Sticky Header */}
            <div className="flex items-center space-x-3">
              <DownloadButton
                label="ANDROID"
                icon={<Download size={16} />}
                onClick={handleAndroidDownload}
                compact={true}
              />
              <DownloadButton
                label="IPHONE"
                icon={<Download size={16} />}
                onClick={handleIOSDownload}
                compact={true}
              />
            </div>
          </div>
        </div>
      </div>

      <section
        id="hero-section"
        className="relative py-20 px-4 sm:px-6 lg:px-8 text-center"
        style={{ background: `linear-gradient(135deg, ${COLORS.azul} 0%, ${COLORS.azul}dd 100%)` }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span style={{ color: COLORS.laranja }}>BUSCAFRETE</span>: O Fim do Vazio de Retorno na Rota SP ⇄ PI
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 mb-8">
            Fretes de Alto Valor na Rota Longa: SP ⇄ PI
          </p>
          <p className="text-lg text-blue-50 mb-12 max-w-2xl mx-auto">
            Receba propostas de frete na hora e garanta o pagamento 100% seguro via Pagar.me
          </p>

          {/* CTAs Duplos */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto">
            <DownloadButton
              label="BAIXAR PARA ANDROID"
              icon={<Download size={24} />}
              onClick={handleAndroidDownload}
            />
            <DownloadButton
              label="BAIXAR PARA IPHONE"
              icon={<Download size={24} />}
              onClick={handleIOSDownload}
            />
          </div>

          {/* Selos de Segurança Expandidos */}
          <div className="mt-8">
            {/* Selos principais */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-white opacity-90 mb-4">
              <div className="flex items-center gap-2 bg-white bg-opacity-10 px-3 py-2 rounded-full">
                <Shield size={20} className="text-blue-300" />
                <span className="text-sm font-medium text-blue-300">App Seguro</span>
              </div>
              <div className="flex items-center gap-2 bg-white bg-opacity-10 px-3 py-2 rounded-full">
                <CreditCard size={20} className="text-blue-300" />
                <span className="text-sm font-medium text-blue-300">Parceiro Pagar.me</span>
              </div>
              <div className="flex items-center gap-2 bg-white bg-opacity-10 px-3 py-2 rounded-full">
                <Award size={20} className="text-blue-300" />
                <span className="text-sm font-medium text-blue-300">100% Confiável</span>
              </div>
            </div>

            {/* Selos adicionais */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-white opacity-80 text-xs">
              <div className="flex items-center gap-1">
                <Lock size={14} className="text-green-400" />
                <span>SSL 256-bit</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={14} className="text-green-400" />
                <span>Pagamento Garantido</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap size={14} className="text-green-400" />
                <span>Processamento Rápido</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: DOR E SOLUÇÃO (3 CARDS) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle size={32} className="text-red-500" />
              <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: COLORS.azul }}>
                Sua Maior Dor
              </h2>
            </div>
            <div className="flex items-center justify-center gap-3 mb-6">
              <TrendingUp size={32} style={{ color: COLORS.verde }} />
              <h3 className="text-2xl sm:text-3xl font-bold text-green-600">
                tem Solução Imediata
              </h3>
            </div>
            <p className="text-gray-600 text-lg">
              Descubra como o BuscaFrete resolve os principais desafios do motorista
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Vazio de Retorno */}
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto"
                style={{ backgroundColor: COLORS.laranja }}
              >
                <Truck size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4" style={{ color: COLORS.azul }}>
                Ficar Parado Custa Caro
              </h3>
              <p className="text-gray-600 text-center">
                Encontre cargas para sua volta (PI → SP ou SP → PI) em tempo real. Elimine o "vazio de retorno".
              </p>
            </Card>

            {/* Card 2: Pagamento Demorado */}
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto"
                style={{ backgroundColor: COLORS.verde }}
              >
                <Clock size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4" style={{ color: COLORS.azul }}>
                Pagamento Demorado e Inseguro
              </h3>
              <p className="text-gray-600 text-center">
                Receba via Split Pagar.me. O dinheiro é seu e cai na sua conta com a máxima segurança e rapidez.
              </p>
            </Card>

            {/* Card 3: Seu Lance, Seu Preço Justo */}
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto"
                style={{ backgroundColor: COLORS.azul }}
              >
                <TrendingUp size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4" style={{ color: COLORS.azul }}>
                Seu Lance, Seu Preço Justo
              </h3>
              <p className="text-gray-600 text-center">
                Você tem o poder de decidir o valor. Faça lances competitivos e garanta fretes rentáveis na rota que você conhece melhor.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: PROCESSO SIMPLIFICADO (3 PASSOS) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4" style={{ color: COLORS.azul }}>
            Como Funciona em 3 Passos Simples
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Este é o fluxo de operação simplificado para o motorista
          </p>

          <div className="relative">
            {/* Linha de timeline para desktop */}
            <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gray-300"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Passo 1 */}
              <div className="text-center relative">
                <div className="relative mb-6">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto text-white font-bold text-3xl shadow-lg border-4 border-white"
                    style={{ backgroundColor: COLORS.azul }}
                  >
                    1
                  </div>
                  {/* Conector para o próximo passo */}
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gray-300" style={{ width: 'calc(100% - 6rem)' }}></div>
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.azul }}>
                  Encontre o Frete Ideal <span className="text-orange-500 font-extrabold">AGORA</span>
                </h3>
                <p className="text-gray-600">
                  Abra o app, faça seu cadastro rápido e veja as ofertas exclusivas para a rota SP ⇄ PI. Sem enrolação.
                </p>
              </div>

              {/* Passo 2 */}
              <div className="text-center relative">
                <div className="relative mb-6">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto text-white font-bold text-3xl shadow-lg border-4 border-white"
                    style={{ backgroundColor: COLORS.verde }}
                  >
                    2
                  </div>
                  {/* Conector para o próximo passo */}
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gray-300" style={{ width: 'calc(100% - 6rem)' }}></div>
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.azul }}>
                  Feche seu Lance Vencedor
                </h3>
                <p className="text-gray-600">
                  Dê seu lance. A burocracia do documento só entra após o fechamento do frete. Máxima agilidade.
                </p>
              </div>

              {/* Passo 3 */}
              <div className="text-center relative">
                <div className="relative mb-6">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto text-white font-bold text-3xl shadow-lg border-4 border-white"
                    style={{ backgroundColor: COLORS.laranja }}
                  >
                    3
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.azul }}>
                  Receba Rápido e <span className="text-green-600 font-extrabold">SEGURO</span>
                </h3>
                <p className="text-gray-600">
                  Pagamento seguro via Pagar.me direto na sua conta. Zero risco de calote. Seu tempo é dinheiro, e ele cai na hora.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Repetido */}
          <div className="text-center mt-12">
            <Button
              onClick={() => document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg block mx-auto flex items-center gap-3 transition-all duration-300 min-h-[56px] text-base sm:text-lg touch-manipulation shadow-xl"
              style={{
                backgroundColor: COLORS.laranja,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <Download size={24} />
              BAIXE O APP E COMECE AGORA
            </Button>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: VÍDEO (DEMONSTRAÇÃO) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4" style={{ color: COLORS.azul }}>
            Veja o BuscaFrete em Ação
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Assista ao vídeo e veja como é fácil e rápido fechar um frete de retorno com pagamento garantido
          </p>

          {/* Demonstração Animada da Interface do App */}
          <div className="relative w-full bg-gray-900 rounded-lg shadow-lg overflow-hidden" style={{ paddingBottom: "56.25%" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Simulação do Smartphone */}
              <div className="relative w-64 h-[500px] bg-black rounded-3xl border-4 border-gray-700 p-2">
                {/* Tela do Smartphone */}
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                  {/* Header do App */}
                  <div className="bg-blue-600 text-white p-4" style={{ background: `linear-gradient(135deg, ${COLORS.azul} 0%, ${COLORS.azul}dd 100%)` }}>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-lg">BuscaFrete</h4>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Conteúdo Animado */}
                  <div className="p-4 space-y-4">
                    {/* Fretes Disponíveis */}
                    <div className="animate-pulse">
                      <h5 className="font-semibold text-gray-800 mb-3">Fretes Disponíveis</h5>
                      <div className="space-y-3">
                        {/* Frete 1 */}
                        <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium" style={{ color: COLORS.azul }}>São Paulo → Teresina</p>
                              <p className="text-sm text-gray-600">Distância: 1.800 km</p>
                            </div>
                            <span className="font-bold text-green-600">R$ 4.200</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="text-xs text-gray-600">Pagamento via Pagar.me</span>
                          </div>
                        </div>

                        {/* Frete 2 */}
                        <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors opacity-60">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium" style={{ color: COLORS.azul }}>Campinas → Fortaleza</p>
                              <p className="text-sm text-gray-600">Distância: 2.100 km</p>
                            </div>
                            <span className="font-bold text-green-600">R$ 5.800</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="text-xs text-gray-600">Pagamento via Pagar.me</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Botão de Ação */}
                    <div className="pt-4">
                      <button
                        className="w-full py-3 rounded-lg font-bold text-white transition-all hover:scale-105"
                        style={{ backgroundColor: COLORS.laranja }}
                      >
                        <Download size={20} className="inline mr-2" />
                        DAR LANCE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlay explicativo */}
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-3 rounded-lg">
              <p className="text-sm text-center">
                📱 Interface real do BuscaFrete - Baixe o app e veja fretes em tempo real!
              </p>
            </div>
          </div>

          {/* CTA Repetido */}
          <div className="text-center mt-12">
            <div className="flex justify-center">
              <DownloadButton
                label="BAIXE O APP AGORA E CONFIRA"
                icon={<Download size={24} />}
                onClick={handleAndroidDownload}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: VANTAGENS DO APP */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4" style={{ color: COLORS.azul }}>
            BuscaFrete na Rota SP ⇄ PI: Sua Vantagem Competitiva
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Descubra os recursos que fazem a diferença
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vantagem 1 */}
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: COLORS.laranja }}
              >
                <Shield size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.azul }}>
                  Segurança Máxima <span className="text-sm font-normal bg-green-100 text-green-800 px-2 py-1 rounded-full">Pagar.me</span>
                </h3>
                <p className="text-gray-600">
                  Pagamento 100% seguro via Pagar.me. Zero risco de calote. Seu dinheiro cai direto na conta.
                </p>
              </div>
            </div>

            {/* Vantagem 2 */}
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: COLORS.verde }}
              >
                <MapPin size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.azul }}>
                  Foco Exclusivo
                </h3>
                <p className="text-gray-600">
                  Fretes de alta qualidade e valor, filtrados apenas para a rota que você já opera (SP ⇄ PI).
                </p>
              </div>
            </div>

            {/* Vantagem 3 */}
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: COLORS.azul }}
              >
                <Zap size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.azul }}>
                  Cadastro Rápido
                </h3>
                <p className="text-gray-600">
                  Zero burocracia inicial. Documentos só após fechar o frete.
                </p>
              </div>
            </div>

            {/* Vantagem 4 */}
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: COLORS.laranja }}
              >
                <Smartphone size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.azul }}>
                  App Leve e Simples
                </h3>
                <p className="text-gray-600">
                  Projetado para funcionar bem mesmo com conexões instáveis na estrada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: PROVA SOCIAL */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12" style={{ color: COLORS.azul }}>
            Quem usa, aprova
          </h2>

          {/* Testemunho */}
          <Card className="p-8 mb-8 border-l-4" style={{ borderLeftColor: COLORS.verde }}>
            <p className="text-lg text-gray-700 italic mb-4">
              "Achei que ia voltar vazio, mas fechei um frete de Teresina para São Paulo em 10 minutos pelo app. O pagamento caiu sem dor de cabeça. Resolveu meu mês!"
            </p>
            <p className="font-bold" style={{ color: COLORS.azul }}>
              — João A., Caminhoneiro Autônomo, PI
            </p>
          </Card>

          {/* Contador de Urgência */}
          <div
            className="text-center p-8 rounded-lg text-white"
            style={{ backgroundColor: COLORS.laranja }}
          >
            <h3 className="text-4xl font-bold mb-2">1.500+</h3>
            <h4 className="text-xl font-semibold mb-4">FRETES MAPEADOS NOS ÚLTIMOS 30 DIAS</h4>
            <p className="text-lg opacity-95">
              O volume de cargas para a rota Sul-Nordeste está alto. Garanta já sua vaga no app e não perca oportunidades.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7: FINAL */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" id="hero">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8" style={{ color: COLORS.azul }}>
            Não perca mais tempo na estrada.
          </h2>
          <p className="text-2xl font-bold mb-12" style={{ color: COLORS.laranja }}>
            Comece a lucrar agora.
          </p>

          {/* CTAs Duplos Finais */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto">
            <DownloadButton
              label="BAIXAR BUSCAFRETE ANDROID"
              icon={<Download size={24} />}
              onClick={handleAndroidDownload}
            />
            <DownloadButton
              label="BAIXAR BUSCAFRETE iOS"
              icon={<Download size={24} />}
              onClick={handleIOSDownload}
            />
          </div>
        </div>
      </section>

      {/* SEÇÃO MOCKUPS DO APP */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4" style={{ color: COLORS.azul }}>
            Conheça o BuscaFrete na Prática
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Veja como é simples encontrar fretes e garantir pagamentos na rota SP ⇄ PI
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mockup 1: Listagem de Fretes */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              {/* Header do App */}
              <div className="bg-blue-600 text-white p-4" style={{ background: `linear-gradient(135deg, ${COLORS.azul} 0%, ${COLORS.azul}dd 100%)` }}>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-lg">BuscaFrete</h4>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <p className="text-sm text-blue-100 mt-1">Fretes disponíveis agora</p>
              </div>

              {/* Conteúdo */}
              <div className="p-4 space-y-3">
                {/* Frete 1 - São Paulo → Teresina */}
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm" style={{ color: COLORS.azul }}>São Paulo → Teresina</p>
                      <p className="text-xs text-gray-600">Distância: 2.682 km • Carga: Carga Geral</p>
                    </div>
                    <span className="font-bold text-sm" style={{ color: COLORS.verde }}>R$ 18.700</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <CheckCircle size={12} className="text-green-500" />
                      <span className="text-xs text-gray-600">Pagar.me</span>
                    </div>
                    <span className="text-xs text-gray-500">há 2h</span>
                  </div>
                </div>

                {/* Frete 2 - Campinas → Fortaleza */}
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm" style={{ color: COLORS.azul }}>Campinas → Fortaleza</p>
                      <p className="text-xs text-gray-600">Distância: 2.850 km • Carga: Frigorificada</p>
                    </div>
                    <span className="font-bold text-sm" style={{ color: COLORS.verde }}>R$ 22.800</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <CheckCircle size={12} className="text-green-500" />
                      <span className="text-xs text-gray-600">Pagar.me</span>
                    </div>
                    <span className="text-xs text-gray-500">há 4h</span>
                  </div>
                </div>

                {/* Frete 3 - São José → Recife */}
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm" style={{ color: COLORS.azul }}>São José → Recife</p>
                      <p className="text-xs text-gray-600">Distância: 2.450 km • Carga: Conteinerizada</p>
                    </div>
                    <span className="font-bold text-sm" style={{ color: COLORS.verde }}>R$ 18.200</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <CheckCircle size={12} className="text-green-500" />
                      <span className="text-xs text-gray-600">Pagar.me</span>
                    </div>
                    <span className="text-xs text-gray-500">há 6h</span>
                  </div>
                </div>
              </div>

              {/* Legenda */}
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                <p className="text-xs text-center text-gray-600 font-medium">📱 Tela Principal - Fretes Disponíveis</p>
              </div>
            </div>

            {/* Mockup 2: Tela de Pagamento */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              {/* Header do App */}
              <div className="bg-green-600 text-white p-4" style={{ background: `linear-gradient(135deg, ${COLORS.verde} 0%, ${COLORS.verde}dd 100%)` }}>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-lg">Pagamento Seguro</h4>
                  <Shield size={20} className="text-white" />
                </div>
                <p className="text-sm text-green-100 mt-1">Frete: São Paulo → Teresina</p>
              </div>

              {/* Conteúdo */}
              <div className="p-4 space-y-4">
                {/* Valor do Frete */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Valor do Frete</span>
                    <span className="font-bold text-lg" style={{ color: COLORS.azul }}>R$ 18.700</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Taxa BuscaFrete (15%)</span>
                    <span className="text-sm text-gray-600">-R$ 2.805</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Você Recebe</span>
                    <span className="font-bold text-lg" style={{ color: COLORS.verde }}>R$ 15.895</span>
                  </div>
                </div>

                {/* Método de Pagamento */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-sm">Pagamento via Pagar.me</span>
                    <div className="flex items-center space-x-1">
                      <Shield size={16} className="text-green-500" />
                      <span className="text-xs text-green-600 font-medium">Garantido</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-800">
                      💳 O valor fica retido no Pagar.me até você confirmar a entrega. Sem risco de calote!
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-sm font-medium text-green-800">Frete Aprovado</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    Pagamento será liberado após confirmação de entrega
                  </p>
                </div>
              </div>

              {/* Legenda */}
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                <p className="text-xs text-center text-gray-600 font-medium">💰 Tela de Pagamento - Segurança Máxima</p>
              </div>
            </div>
          </div>

          {/* CTA após mockups */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Pronto para começar? Baixe o app e veja fretes reais!</p>
            <div className="flex justify-center">
              <DownloadButton
                label="COMEÇAR AGORA"
                icon={<Download size={24} />}
                onClick={handleAndroidDownload}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO MOTORISTAS FUNDADORES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Crown size={40} style={{ color: COLORS.laranja }} />
              <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: COLORS.azul }}>
                Motoristas Fundadores
              </h2>
            </div>
            <p className="text-xl text-gray-600 mb-4">
              Seja um dos primeiros 100 motoristas e garanta benefícios exclusivos!
            </p>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Users size={20} style={{ color: COLORS.azul }} />
              <span className="font-semibold text-lg" style={{ color: COLORS.azul }}>
                VAGAS LIMITADAS
              </span>
            </div>
          </div>

          {/* Container dos benefícios */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Benefício 1: Desconto nas primeiras cargas */}
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-orange-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gift size={32} style={{ color: COLORS.laranja }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.azul }}>
                  Desconto Especial
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong className="text-2xl font-bold" style={{ color: COLORS.verde }}>50% OFF</strong>
                  <br />nas primeiras 4 cargas
                </p>
                <p className="text-sm text-gray-500">
                  Reduza sua taxa de 15% para apenas 7,5% nas suas primeiras negociações
                </p>
              </div>
            </div>

            {/* Benefício 2: Selo de Fundador */}
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-orange-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star size={32} style={{ color: COLORS.azul }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.azul }}>
                  Selo de Fundador
                </h3>
                <p className="text-gray-600 mb-4">
                  Badge exclusivo no seu perfil confirmando que você foi um dos pioneiros do BuscaFrete
                </p>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <Crown size={14} />
                  FUNDADOR
                </div>
              </div>
            </div>

            {/* Benefício 3: Grupo VIP */}
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-orange-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users size={32} style={{ color: COLORS.verde }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.azul }}>
                  Grupo VIP Exclusivo
                </h3>
                <p className="text-gray-600 mb-4">
                  Acesso antecipado a novas funcionalidades, dicas exclusivas e networking com outros fundadores
                </p>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  <Zap size={14} />
                  ACESSO VIP
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-orange-600 rounded-2xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">
                🚀 Não perca essa oportunidade única!
              </h3>
              <p className="text-lg mb-6 opacity-95">
                Apenas <strong>100 vagas</strong> disponíveis para motoristas fundadores.
                Garanta seu lugar na história do BuscaFrete!
              </p>
              <div className="flex justify-center">
                <DownloadButton
                  label="GARANTIR VAGA DE FUNDADOR"
                  icon={<Crown size={24} />}
                  onClick={handleAndroidDownload}
                />
              </div>
              <p className="text-sm mt-4 opacity-80">
                ⚡ Oferta por tempo limitado • Vagas preenchidas por ordem de cadastro
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4" style={{ color: COLORS.azul }}>
            Dúvidas Frequentes
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Tire suas dúvidas sobre o BuscaFrete e a rota SP ⇄ PI
          </p>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg border border-gray-200 px-6">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <DollarSign size={20} style={{ color: COLORS.verde }} />
                  <span className="font-medium">Quanto custa usar o BuscaFrete?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                O cadastro e uso básico do app é <strong>100% gratuito</strong>. Você só paga uma taxa competitiva de 15% sobre o valor do frete quando fecha negócio com sucesso.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg border border-gray-200 px-6">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <Car size={20} style={{ color: COLORS.azul }} />
                  <span className="font-medium">Qualquer caminhão pode usar o app?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                O BuscaFrete é otimizado para caminhões que operam na rota Sul-Nordeste (SP ⇄ PI e similares). Caminhões de pequeno, médio e grande porte são bem-vindos, desde que tenham capacidade para cargas de longa distância.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg border border-gray-200 px-6">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <Timer size={20} style={{ color: COLORS.laranja }} />
                  <span className="font-medium">Quando o pagamento cai na conta?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                Com o <strong>Pagar.me</strong>, o pagamento é processado em até 2 dias úteis após a entrega confirmada. Você recebe o dinheiro diretamente na sua conta bancária, sem intermediários.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg border border-gray-200 px-6">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <Shield size={20} style={{ color: COLORS.verde }} />
                  <span className="font-medium">É seguro fechar frete pelo app?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                <strong>100% seguro!</strong> Todos os pagamentos são processados via Pagar.me com garantia total. O dinheiro fica retido até você confirmar a entrega, eliminando qualquer risco de calote.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg border border-gray-200 px-6">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <HelpCircle size={20} style={{ color: COLORS.azul }} />
                  <span className="font-medium">Como funciona o processo de contratação?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                1) Baixe o app e cadastre-se rapidamente<br />
                2) Veja fretes disponíveis para SP ⇄ PI<br />
                3) Dê seu lance competitivo<br />
                4) Feche o negócio com segurança<br />
                5) Execute o frete e receba o pagamento
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* CTA na seção FAQ */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Ainda tem dúvidas? Baixe o app e tire todas as dúvidas na prática!</p>
            <div className="flex justify-center">
              <DownloadButton
                label="BAIXAR BUSCAFRETE AGORA"
                icon={<Download size={24} />}
                onClick={handleAndroidDownload}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Logo e Copyright */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <Truck size={24} style={{ color: COLORS.laranja }} />
                <span className="font-bold text-xl">BuscaFrete</span>
              </div>
              <p className="text-gray-400 text-sm">
                © 2025 BuscaFrete. Todos os direitos reservados.<br />
                Rota SP ⇄ PI
              </p>
            </div>

            {/* Redes Sociais */}
            <div className="text-center">
              <h4 className="font-semibold mb-4" style={{ color: COLORS.laranja }}>
                Conecte-se Conosco
              </h4>
              <div className="flex justify-center gap-6">
                <button
                  onClick={handleInstagramClick}
                  className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:scale-110 transition-transform duration-300"
                  aria-label="Siga-nos no Instagram"
                >
                  <Instagram size={20} className="text-white" />
                </button>
                <button
                  onClick={handleWhatsAppClick}
                  className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full hover:scale-110 transition-transform duration-300"
                  aria-label="Fale conosco no WhatsApp"
                >
                  <MessageCircle size={20} className="text-white" />
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-3">
                Fique por dentro das novidades!
              </p>
            </div>

            {/* Selos de Segurança */}
            <div className="text-center md:text-right">
              <h4 className="font-semibold mb-4" style={{ color: COLORS.verde }}>
                Segurança Garantida
              </h4>
              <div className="flex flex-wrap justify-center md:justify-end gap-3 text-xs">
                <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-full">
                  <Shield size={14} className="text-green-400" />
                  <span className="text-gray-300">SSL Seguro</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-full">
                  <CreditCard size={14} className="text-blue-400" />
                  <span className="text-gray-300">Pagar.me</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
