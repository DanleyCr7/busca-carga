import { ArrowRight, Clock3, MapPin, Smartphone } from "lucide-react";
import { useEffect } from "react";
import { BrazilAbcCoverageMap } from "@/components/landing/BrazilAbcCoverageMap";
import { MarketingHeader } from "@/components/landing/MarketingHeader";
import { PageMetadata } from "@/components/landing/PageMetadata";
import { usePublicResidentialPilot } from "@/hooks/usePublicResidentialPilot";
import { trackLandingEvent } from "@/lib/analytics";
import {
  APP_STORE_URL,
  CLIENT_APP_LINK,
  GOOGLE_PLAY_URL,
  RESIDENTIAL_CITIES,
  residentialLeadHours,
} from "@/lib/site";

export default function Coverage() {
  const { pilot } = usePublicResidentialPilot();
  const minimumLeadHours = residentialLeadHours(pilot?.minimumLeadHours);

  useEffect(() => {
    window.scrollTo(0, 0);
    trackLandingEvent("coverage_view", {
      audience: "client",
      pilot: "abc-residencial-v1",
    });
  }, []);

  function trackStore(store: string) {
    trackLandingEvent("store_cta_click", {
      audience: "client",
      store,
      pilot: "abc-residencial-v1",
    });
  }

  return (
    <div className="min-h-screen bg-white text-[#101a35]">
      <PageMetadata
        title="Frete no ABCD e Mauá: cidades e cobertura | Busca Frete"
        description="Consulte a cobertura do Busca Frete em Santo André, São Bernardo do Campo, São Caetano do Sul, Diadema e Mauá. Saiba como solicitar pelo aplicativo."
        path="/cobertura"
      />
      <MarketingHeader home={false} />
      <main>
        <section className="bg-[#e1f0fc] py-14 sm:py-20">
          <div className="container grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-extrabold text-[#1757ba]">
                <MapPin className="size-5" /> Cobertura residencial
              </p>
              <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                Fretes e mudanças no ABCD e Mauá
              </h1>
              <p className="mt-6 max-w-xl leading-8 text-slate-600">
                Precisa de frete em Santo André, transporte de móveis em São
                Bernardo do Campo ou São Caetano do Sul, uma pequena mudança em
                Diadema ou frete em Mauá? Informe sua rota no Busca Frete e
                consulte as opções de motoristas parceiros pelo aplicativo.
              </p>
              <div
                className="mt-6 flex flex-wrap gap-2"
                aria-label="Cidades da cobertura residencial"
              >
                {RESIDENTIAL_CITIES.map(city => (
                  <span
                    key={city}
                    className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-[#1757ba]"
                  >
                    {city}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-600">
                Consulte no app a disponibilidade para os endereços, a data e os
                itens da sua solicitação. As propostas dependem dos motoristas
                aptos para a rota.
              </p>
            </div>
            <BrazilAbcCoverageMap />
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="container grid gap-10 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 p-7 sm:p-9">
              <h2 className="text-2xl font-black">
                Do móvel avulso à mudança residencial
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Informe geladeira, sofá, cama, armário e os demais volumes que
                precisam ser transportados. O app recomenda a categoria de
                caminhão a partir dos itens da solicitação.
              </p>
              <p className="mt-4 leading-7 text-slate-600">
                Fotos e detalhes sobre escadas, elevadores e acessos ajudam o
                motorista a preparar uma proposta compatível. Informe também
                quando precisar de ajudantes na coleta ou na entrega.
              </p>
              <a
                href="/#solucoes"
                className="mt-6 inline-flex items-center gap-2 font-bold text-[#1757ba] hover:underline"
              >
                Conheça as categorias de veículos{" "}
                <ArrowRight className="size-4" />
              </a>
            </article>
            <article className="rounded-2xl bg-[#f5f8fe] p-7 sm:p-9">
              <Clock3 className="size-8 text-[#1757ba]" />
              <h2 className="mt-4 text-2xl font-black">
                Como agendar pelo app
              </h2>
              <ol className="mt-5 list-decimal space-y-4 pl-5 leading-7 text-slate-600">
                <li>
                  Informe os endereços de origem e destino, os itens e a data.
                </li>
                <li>
                  Planeje com pelo menos {minimumLeadHours} horas de
                  antecedência e consulte as datas disponíveis.
                </li>
                <li>
                  Compare as propostas recebidas de motoristas parceiros e
                  escolha a opção para sua necessidade.
                </li>
                <li>
                  Acompanhe os detalhes do frete residencial pelo aplicativo.
                </li>
              </ol>
            </article>
          </div>
        </section>

        <section id="aplicativo" className="pb-14 sm:pb-20">
          <div className="container">
            <div className="rounded-2xl bg-[#1555bd] p-7 text-white sm:p-10">
              <Smartphone className="size-9" />
              <h2 className="mt-4 text-3xl font-black">
                Solicite seu frete pelo Busca Frete
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-blue-100">
                Consulte a cobertura da sua rota, compare propostas e acompanhe
                sua mudança em um só lugar.
              </p>
              <a
                href={CLIENT_APP_LINK}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackStore("onelink")}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-[#1757ba] hover:bg-blue-50"
              >
                Baixar o app <ArrowRight className="size-4" />
              </a>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold">
                <a
                  href={GOOGLE_PLAY_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackStore("google_play")}
                  className="underline underline-offset-4 hover:text-blue-100"
                >
                  Google Play · Android
                </a>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackStore("app_store")}
                  className="underline underline-offset-4 hover:text-blue-100"
                >
                  App Store · iPhone
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[#081936] py-8 text-sm text-blue-100/70">
        <div className="container flex flex-wrap justify-between gap-5">
          <a href="/" className="hover:text-white">
            Busca Frete · Página inicial
          </a>
          <div className="flex flex-wrap gap-5">
            <a href="/motoristas" className="hover:text-white">
              Sou motorista
            </a>
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
