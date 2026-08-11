import {
  ArrowRight,
  CalendarCheck,
  Check,
  MapPin,
  ShieldCheck,
  Truck,
  UserCheck,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import { MarketingHeader } from "@/components/landing/MarketingHeader";
import { usePublicResidentialPilot } from "@/hooks/usePublicResidentialPilot";
import { trackLandingEvent } from "@/lib/analytics";

const driverLink = import.meta.env.VITE_APPSFLYER_DRIVER_ONELINK_URL;

export default function Drivers() {
  const { pilot } = usePublicResidentialPilot();
  const cities =
    pilot?.available && pilot.cities.length > 0
      ? pilot.cities
      : ["ABC Paulista"];
  useEffect(() => {
    window.scrollTo(0, 0);
    trackLandingEvent("landing_view", {
      audience: "driver",
      pilot: "abc-residencial-v1",
    });
  }, []);
  useEffect(() => {
    if (pilot?.available) {
      trackLandingEvent("coverage_view", {
        audience: "driver",
        pilot: pilot.pilotSlug,
      });
    }
  }, [pilot]);
  return (
    <div className="min-h-screen bg-white text-[#0b1f45]">
      <MarketingHeader driver />
      <main>
        <section className="bg-[radial-gradient(circle_at_75%_20%,#d9f7ee_0,transparent_38%),linear-gradient(180deg,#f4f9ff,#fff)]">
          <div className="container grid min-h-[620px] items-center gap-10 py-16 lg:grid-cols-2">
            <div>
              <span className="inline-flex rounded-full bg-[#e3f5ef] px-4 py-2 text-xs font-bold text-[#0f7565]">
                O cadastro está liberado
              </span>
              <h1 className="mt-7 text-4xl font-black leading-[1.06] tracking-[-.04em] sm:text-5xl">
                Fretes residenciais no ABC para quem está disponível de verdade.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Cadastre-se, conclua a aprovação cadastral e informe em quais
                cidades e datas você pode atender.
              </p>
              <a
                role="link"
                href={driverLink || undefined}
                aria-disabled={!driverLink}
                target="_blank"
                rel="noreferrer"
                onClick={event => {
                  if (!driverLink) {
                    event.preventDefault();
                    return;
                  }
                  trackLandingEvent("store_cta_click", {
                    audience: "driver",
                    store: "onelink",
                    pilot: "abc-residencial-v1",
                  });
                }}
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#1254d8] px-6 py-4 font-bold text-white aria-disabled:cursor-not-allowed aria-disabled:opacity-60"
              >
                Baixar app e fazer cadastro <ArrowRight className="size-5" />
              </a>
            </div>
            <div className="rounded-[2.5rem] bg-[#0b1f45] p-8 text-white shadow-2xl">
              <Truck className="size-12 text-[#78d9c9]" />
              <h2 className="mt-6 text-2xl font-black">
                Onde o piloto está disponível
              </h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {cities.map(city => (
                  <span
                    key={city}
                    className="rounded-full bg-white/10 px-4 py-3 text-sm font-bold"
                  >
                    {city}
                  </span>
                ))}
              </div>
              <p className="mt-7 leading-7 text-blue-100/75">
                Você poderá aceitar fretes entre essas cidades quando sua
                cobertura incluir origem, destino, data e ajudantes necessários.
              </p>
            </div>
          </div>
        </section>
        <section id="como-funciona" className="container py-20">
          <h2 className="text-3xl font-black">Como começar</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              [
                UserCheck,
                "1. Faça seu cadastro",
                "Envie seus dados e veículo para a análise cadastral da plataforma.",
              ],
              [
                ShieldCheck,
                "2. Aguarde a aprovação",
                "A aprovação cadastral é obrigatória antes de enviar propostas.",
              ],
              [
                CalendarCheck,
                "3. Declare a disponibilidade",
                "Escolha cidades, datas e se consegue levar ajudantes.",
              ],
            ].map(([Icon, title, text]) => {
              const StepIcon = Icon as typeof Users;
              return (
                <article
                  key={String(title)}
                  className="rounded-3xl border border-slate-200 p-7"
                >
                  <StepIcon className="size-8 text-[#1254d8]" />
                  <h3 className="mt-5 text-xl font-bold">{String(title)}</h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {String(text)}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
        <section id="cobertura" className="container pb-20">
          <div className="grid gap-8 rounded-[2.5rem] bg-[#eff8f6] p-8 lg:grid-cols-2 lg:p-12">
            <div>
              <MapPin className="size-10 text-[#0f7565]" />
              <h2 className="mt-5 text-3xl font-black">
                Disponibilidade é um compromisso operacional
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                É responsabilidade do motorista manter sua disponibilidade
                atualizada e aceitar apenas fretes que possa cumprir. Você pode
                alterar cidades, datas e ajudantes no app.
              </p>
            </div>
            <ul className="space-y-4 self-center">
              {[
                "Cadastro geral aprovado",
                "Origem e destino cobertos",
                "Disponível na data do frete",
                "Ajudantes quando o pedido exigir",
              ].map(item => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-white p-4 font-bold"
                >
                  <Check className="size-5 text-[#0f8d77]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <footer className="bg-[#071731] py-10 text-sm text-blue-100/65">
        <div className="container flex justify-between">
          <p>© 2026 Busca Frete.</p>
          <a href="/privacidade">Privacidade</a>
        </div>
      </footer>
    </div>
  );
}
