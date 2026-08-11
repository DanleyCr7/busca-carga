import { ArrowLeft, FileCheck2, Mail } from "lucide-react";
import { useEffect } from "react";

const termSections = [
  {
    title: "1. Sobre a plataforma",
    body: "O Busca Frete conecta clientes que precisam transportar itens a motoristas e transportadores cadastrados. A plataforma organiza solicitações, propostas, comunicação, acompanhamento e pagamentos, mas não substitui as responsabilidades assumidas por cada participante na execução do transporte.",
  },
  {
    title: "2. Cadastro e segurança da conta",
    body: "Clientes, motoristas e empresas devem fornecer informações verdadeiras, manter seus dados atualizados e proteger o acesso à conta. Motoristas somente participam das ofertas compatíveis depois da análise cadastral exigida pela plataforma.",
  },
  {
    title: "3. Solicitações e propostas",
    body: "O cliente informa rota, itens, data e condições de acesso. As propostas são definidas livremente pelos motoristas elegíveis, e o cliente escolhe a alternativa que considerar adequada antes de confirmar a contratação.",
  },
  {
    title: "4. Fretes residenciais",
    body: "Fretes residenciais podem ter cobertura limitada por cidade, disponibilidade de motoristas e categoria de veículo. No piloto do ABC Paulista, a solicitação deve ser agendada com pelo menos 48 horas de antecedência. A cobertura vigente sempre deve ser consultada no aplicativo.",
  },
  {
    title: "5. Responsabilidades do motorista",
    body: "O motorista é responsável por declarar disponibilidade real, manter cidades e datas atualizadas, usar veículo compatível, observar a necessidade de ajudantes e aceitar somente fretes que possa cumprir com segurança e dentro das regras aplicáveis.",
  },
  {
    title: "6. Valores e pagamentos",
    body: "Antes da confirmação, o aplicativo apresenta os valores e benefícios aplicáveis. Pagamentos, taxas, repasses, promoções, cancelamentos e eventuais reembolsos seguem as condições exibidas no fluxo contratado e as regras do meio de pagamento utilizado.",
  },
  {
    title: "7. Uso adequado",
    body: "Não é permitido usar a plataforma para fraude, conteúdo ilícito, assédio, violação de direitos, transporte proibido ou qualquer atividade que coloque pessoas, bens ou a operação em risco. Contas podem ser restringidas quando houver indícios de abuso ou descumprimento.",
  },
  {
    title: "8. Privacidade e atendimento",
    body: "O tratamento de dados segue a Política de Privacidade. Dúvidas, solicitações e pedidos relacionados à conta podem ser enviados para suporte@buscafrete.com.",
  },
  {
    title: "9. Atualizações destes termos",
    body: "Estes termos podem ser atualizados para refletir mudanças no serviço, na legislação ou nas medidas de segurança. Quando a alteração for relevante, a versão atualizada será disponibilizada nos canais oficiais da plataforma.",
  },
];

export default function Terms() {
  useEffect(() => {
    document.title = "Termos de Uso | Busca Frete";
  }, []);

  return (
    <div className="min-h-dvh bg-[#f5f8ff] text-slate-900">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-bold focus:text-[#1254d8] focus:shadow-lg"
      >
        Ir para o conteúdo
      </a>
      <header className="border-b border-slate-200 bg-white">
        <div className="container flex items-center justify-between py-4">
          <a href="/" aria-label="Voltar para o início">
            <img src="/logo_with_name.svg" alt="Busca Frete" className="h-10 w-auto" />
          </a>
          <a
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-bold text-[#1254d8] focus-visible:ring-4 focus-visible:ring-blue-200"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar ao início
          </a>
        </div>
      </header>

      <main id="conteudo-principal" className="container py-12 sm:py-16" tabIndex={-1}>
        <article className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-[0_24px_80px_-40px_rgba(18,84,216,0.35)]">
          <div className="border-b border-blue-100 bg-gradient-to-br from-[#eef5ff] to-white px-6 py-10 sm:px-10">
            <div className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-[#1254d8] text-white">
              <FileCheck2 className="size-6" aria-hidden="true" />
            </div>
            <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.16em] text-[#1254d8]">
              Regras de utilização
            </p>
            <h1 className="max-w-2xl text-3xl font-black tracking-tight text-[#0c204d] sm:text-5xl">
              Termos de Uso
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Estes termos explicam as responsabilidades de clientes e motoristas ao usar a plataforma Busca Frete.
            </p>
            <p className="mt-4 text-sm font-semibold text-slate-500">
              Última atualização: 11 de agosto de 2026
            </p>
          </div>

          <div className="space-y-8 px-6 py-10 sm:px-10">
            {termSections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-extrabold text-[#0c204d]">{section.title}</h2>
                <p className="mt-3 max-w-[70ch] leading-7 text-slate-600">{section.body}</p>
              </section>
            ))}

            <section className="rounded-2xl border border-blue-100 bg-[#f3f7ff] p-6">
              <h2 className="text-xl font-extrabold text-[#0c204d]">Documentos relacionados</h2>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="/privacidade"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#1254d8] px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#0d46b8] focus-visible:ring-4 focus-visible:ring-blue-200 motion-reduce:transition-none"
                >
                  Política de Privacidade
                </a>
                <a
                  href="mailto:suporte@buscafrete.com"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-blue-200 px-5 py-3 text-sm font-extrabold text-[#1254d8] focus-visible:ring-4 focus-visible:ring-blue-200"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Falar com o suporte
                </a>
              </div>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
