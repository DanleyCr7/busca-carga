import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DataDeletion from "./DataDeletion";
import Privacidade from "./privacidade";

describe("public privacy pages", () => {
  it("describes attribution partners and privacy controls", () => {
    render(<Privacidade />);

    expect(screen.getByRole("heading", { name: /política de privacidade/i })).toBeInTheDocument();
    expect(screen.getByText(/appsflyer/i)).toBeInTheDocument();
    expect(screen.getByText(/meta ads/i)).toBeInTheDocument();
    expect(screen.getByText(/atribuição e mensuração agregada/i)).toBeInTheDocument();
    expect(screen.getByText(/não enviamos nome, cpf, telefone ou endereço/i)).toBeInTheDocument();
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
});
