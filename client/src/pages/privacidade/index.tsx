import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import { useEffect } from "react";

const policySections = [
  {
    title: "Dados usados para prestar o serviço",
    body: "Tratamos dados de cadastro, endereços e localização, informações do frete, conversas, propostas e pagamentos para conectar clientes e motoristas, operar a entrega, prevenir fraudes e oferecer suporte.",
  },
  {
    title: "Atribuição e mensuração agregada",
    body: "Usamos AppsFlyer e Meta Ads para entender, de forma agregada, quais campanhas ajudam pessoas a instalar o aplicativo, concluir o cadastro e usar o serviço. Dependendo da plataforma e das escolhas de privacidade do aparelho, esses parceiros podem tratar identificadores do dispositivo e interações no app.",
  },
  {
    title: "Proteção no funil de aquisição",
    body: "Não enviamos nome, CPF, telefone ou endereço nos eventos de atribuição. Compartilhamos somente eventos essenciais, como cadastro concluído, solicitação residencial, início do checkout e pagamento confirmado, sem o valor da compra nesta primeira configuração.",
  },
  {
    title: "Compartilhamento e retenção",
    body: "Compartilhamos dados apenas com prestadores necessários à operação, segurança, pagamento, atendimento e mensuração, sob finalidades definidas. Mantemos as informações pelo período necessário ao serviço e às obrigações legais e regulatórias aplicáveis.",
  },
  {
    title: "Seus direitos",
    body: "Você pode solicitar confirmação de tratamento, acesso, correção, portabilidade, informação sobre compartilhamento e exclusão quando aplicável. Antes de atender ao pedido, podemos validar a identidade para proteger a conta.",
  },
];

export default function Privacidade() {
  useEffect(() => {
    document.title = "Política de Privacidade | Busca Frete";
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f8ff] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="container flex items-center justify-between py-4">
          <a href="/" aria-label="Voltar para o início">
            <img src="/logo_with_name.svg" alt="Busca Frete" className="h-10 w-auto" />
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1254d8]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar ao início
          </a>
        </div>
      </header>

      <main className="container py-12 sm:py-16">
        <article className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-[0_24px_80px_-40px_rgba(18,84,216,0.35)]">
          <div className="border-b border-blue-100 bg-gradient-to-br from-[#eef5ff] to-white px-6 py-10 sm:px-10">
            <div className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-[#1254d8] text-white">
              <ShieldCheck className="size-6" aria-hidden="true" />
            </div>
            <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.16em] text-[#1254d8]">
              Privacidade e transparência
            </p>
            <h1 className="max-w-2xl text-3xl font-black tracking-tight text-[#0c204d] sm:text-5xl">
              Política de Privacidade
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Esta política explica como a Busca Frete trata dados de clientes e motoristas no aplicativo e em seus canais digitais.
            </p>
            <p className="mt-4 text-sm font-semibold text-slate-500">
              Última atualização: 11 de agosto de 2026
            </p>
          </div>

          <div className="space-y-9 px-6 py-10 sm:px-10">
            {policySections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-extrabold text-[#0c204d]">{section.title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{section.body}</p>
              </section>
            ))}

            <section className="rounded-2xl border border-blue-100 bg-[#f3f7ff] p-6">
              <h2 className="text-xl font-extrabold text-[#0c204d]">Solicitações e contato</h2>
              <p className="mt-3 leading-7 text-slate-600">
                Para exercer seus direitos ou esclarecer dúvidas, escreva para{" "}
                <a className="font-bold text-[#1254d8] underline" href="mailto:suporte@buscafrete.com">
                  suporte@buscafrete.com
                </a>
                .
              </p>
              <a
                href="/exclusao-de-dados"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#1254d8] px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#0d46b8]"
              >
                Solicitar exclusão
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
