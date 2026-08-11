import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { useEffect } from "react";

const deletionEmail =
  "mailto:suporte@buscafrete.com?subject=Solicita%C3%A7%C3%A3o%20de%20exclus%C3%A3o%20de%20dados";

export default function DataDeletion() {
  useEffect(() => {
    document.title = "Exclusão de dados | Busca Frete";
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f8ff] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="container flex items-center justify-between py-4">
          <a href="/" aria-label="Voltar para o início">
            <img src="/logo_with_name.svg" alt="Busca Frete" className="h-10 w-auto" />
          </a>
          <a
            href="/privacidade"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1254d8]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Ver política
          </a>
        </div>
      </header>

      <main className="container py-12 sm:py-16">
        <article className="mx-auto max-w-3xl rounded-3xl border border-blue-100 bg-white p-6 shadow-[0_24px_80px_-40px_rgba(18,84,216,0.35)] sm:p-10">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#1254d8] text-white">
            <ShieldCheck className="size-6" aria-hidden="true" />
          </div>
          <p className="mt-6 text-sm font-extrabold uppercase tracking-[0.16em] text-[#1254d8]">
            Controle dos seus dados
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-[#0c204d] sm:text-5xl">
            Exclusão de dados
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            Envie a solicitação pelo e-mail vinculado à sua conta. Para impedir exclusões indevidas, nossa equipe poderá pedir informações adicionais para validar sua identidade.
          </p>

          <ol className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["1", "Envie o pedido", "Use o botão abaixo e informe que deseja excluir sua conta e seus dados."],
              ["2", "Valide a identidade", "Responderemos pelo canal informado para confirmar que a conta é sua."],
              ["3", "Acompanhe a conclusão", "O pedido será respondido em até 15 dias após a validação."],
            ].map(([step, title, body]) => (
              <li key={step} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-blue-100 text-sm font-black text-[#1254d8]">
                  {step}
                </span>
                <h2 className="mt-4 font-extrabold text-[#0c204d]">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-extrabold text-amber-950">Dados sujeitos a retenção obrigatória</h2>
            <p className="mt-2 text-sm leading-6 text-amber-900/80">
              Alguns registros podem ser mantidos pelo prazo exigido por obrigações legais, fiscais, regulatórias, prevenção a fraudes ou exercício de direitos. Os demais dados serão excluídos ou anonimizados quando aplicável.
            </p>
          </div>

          <a
            href={deletionEmail}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1254d8] px-6 py-4 font-extrabold text-white shadow-sm transition hover:bg-[#0d46b8] sm:w-auto"
          >
            <Mail className="size-5" aria-hidden="true" />
            Solicitar por e-mail
          </a>
          <p className="mt-4 text-sm text-slate-500">Contato: suporte@buscafrete.com</p>
        </article>
      </main>
    </div>
  );
}
