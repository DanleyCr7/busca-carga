import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DataDeletion from "./DataDeletion";
import Privacidade from "./privacidade";
import Terms from "./Terms";

describe("public privacy pages", () => {
  it("describes attribution partners and privacy controls", () => {
    render(<Privacidade />);

    expect(screen.getByRole("heading", { name: /política de privacidade/i })).toBeInTheDocument();
    expect(screen.getByText(/appsflyer/i)).toBeInTheDocument();
    expect(screen.getByText(/meta ads/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /firebase e funcionamento do aplicativo/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/atribuição e mensuração agregada/i)).toBeInTheDocument();
    expect(screen.getByText(/não enviamos nome, cpf, telefone ou endereço/i)).toBeInTheDocument();
    expect(screen.getByText(/documentos, fotos e conversas/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /pagamentos, segurança e suporte/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /solicitar exclusão/i })).toHaveAttribute(
      "href",
      "/exclusao-de-dados",
    );
  });

  it("provides public deletion instructions and response deadline", () => {
    render(<DataDeletion />);

    expect(screen.getByRole("heading", { name: /exclusão de dados/i })).toBeInTheDocument();
    expect(screen.getByText(/até 15 dias/i)).toBeInTheDocument();
    expect(screen.getByText(/retenção obrigatória/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /solicitar por e-mail/i })).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:suporte@buscafrete.com"),
    );
  });

  it("publishes service terms for clients and drivers", () => {
    render(<Terms />);

    expect(screen.getByRole("heading", { name: /termos de uso/i })).toBeInTheDocument();
    expect(screen.getByText(/clientes e motoristas/i)).toBeInTheDocument();
    expect(screen.getByText(/propostas são definidas livremente/i)).toBeInTheDocument();
    expect(screen.getByText(/48 horas/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /política de privacidade/i })).toHaveAttribute(
      "href",
      "/privacidade",
    );
  });
});
