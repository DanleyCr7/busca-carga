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
});
