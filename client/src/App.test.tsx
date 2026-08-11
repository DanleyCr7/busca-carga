import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";

Object.defineProperty(window, "matchMedia", {
  configurable: true,
  writable: true,
  value: () => ({
    matches: false,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
  }),
});

describe("recursos globais da landing", () => {
  beforeEach(() => {
    localStorage.clear();
    document.getElementById("tawkto-script")?.remove();
    window.history.replaceState({}, "", "/privacidade");
  });

  it("mantém consentimento e suporte disponíveis nas páginas legais", () => {
    render(<App />);

    expect(
      screen.getByRole("button", { name: "Conversar com o suporte" })
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Preferências de privacidade")
    ).toBeInTheDocument();
    expect(document.getElementById("tawkto-script")).not.toBeInTheDocument();
  });

  it("registra uma rota pública real para os termos de uso", () => {
    window.history.replaceState({}, "", "/termos");

    render(<App />);

    expect(screen.getByRole("heading", { name: /termos de uso/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /página não encontrada/i })).not.toBeInTheDocument();
  });
});
