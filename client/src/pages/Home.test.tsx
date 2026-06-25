import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import Home from "./Home";

global.window.open = vi.fn();
(global.window as any).gtag = vi.fn();

describe("Home - Busca Frete de Cargas", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the cargo hero and local context", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: "Frete de cargas sem dor de cabeça.",
      })
    ).toBeTruthy();
    expect(
      screen.getAllByText(/Busca Frete de Cargas/i).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Piauí, São Paulo e expansão nacional/i).length
    ).toBeGreaterThan(0);
    expect(screen.getAllByText(/Motorista parceiro/i).length).toBeGreaterThan(
      0
    );
    expect(screen.getByText("Indicação no app")).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /Ver programa de indicação/i })
    ).toHaveAttribute("href", "#trabalhe-conosco");
  });

  it("renders cargo service language", () => {
    render(<Home />);

    expect(screen.getAllByText("Grande porte").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Carga completa").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Carga dedicada").length).toBeGreaterThan(0);
    expect(
      screen.getByText(
        "Cargas maiores que pedem espaço, organização e uma rota dedicada."
      )
    ).toBeTruthy();
  });

  it("renders the expected page sections", () => {
    render(<Home />);

    expect(screen.getByText("Frete de cargas para a vida real")).toBeTruthy();
    expect(
      screen.getByText("Do pedido ao agendamento em poucos passos")
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "Trabalhe conosco" })
    ).toBeTruthy();
    expect(
      screen.getByText("Piauí, São Paulo e expansão para outras regiões.")
    ).toBeTruthy();
    expect(screen.getByText("Carreto de cargas")).toBeTruthy();
    expect(screen.getByText("Operação nacional")).toBeTruthy();
    expect(screen.getAllByText("Carga dedicada").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Carga completa").length).toBeGreaterThan(0);
    expect(screen.getByText("Programa de indicação")).toBeTruthy();
    expect(screen.getAllByText(/R\$ 10/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { name: "Veja o app em ação." })
    ).toBeTruthy();
    expect(screen.getByTitle("BuscaFrete em Ação")).toHaveAttribute(
      "src",
      expect.stringContaining("youtube.com/embed/01ub8UwHzs4")
    );
    expect(screen.getByText("Dúvidas antes de chamar")).toBeTruthy();
    expect(
      screen.getByText("Baixe o app e acompanhe as propostas da sua carga.")
    ).toBeTruthy();
  });

  it("renders the floating app badges and keeps WhatsApp as the main action", () => {
    render(<Home />);

    const floating = screen.getByRole("navigation", {
      name: "Ações rápidas",
    });
    const scoped = within(floating);

    expect(scoped.getByText("Receba as propostas da sua carga.")).toBeTruthy();
    expect(scoped.getByRole("link", { name: "App Store" })).toHaveAttribute(
      "href",
      "https://apps.apple.com/br/app/busca-frete/id6747501257"
    );
    expect(scoped.getByRole("link", { name: "Google Play" })).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.frete.busca"
    );
    expect(scoped.getByRole("button", { name: /WhatsApp/i })).toBeTruthy();
    expect(scoped.queryByRole("button", { name: /Instagram/i })).toBeNull();
    expect(floating.textContent ?? "").not.toMatch(/WhatsApp \+55/i);
    expect(floating.textContent ?? "").not.toMatch(/Instagram @busca\.frete/i);
  });

  it("opens WhatsApp with a national cargo message", () => {
    render(<Home />);

    fireEvent.click(
      screen.getAllByRole("button", { name: /Falar no WhatsApp/i })[0]
    );

    expect(global.window.open).toHaveBeenCalledWith(
      expect.stringContaining("https://wa.me/558699960441?text="),
      "_blank",
      "noopener,noreferrer"
    );
    expect(
      decodeURIComponent((global.window.open as any).mock.calls[0][0])
    ).toContain(
      "orçamento para meu frete de cargas no Piauí, em São Paulo e em outras regiões do Brasil"
    );
    expect((global.window as any).gtag).toHaveBeenCalledWith(
      "event",
      "contact_whatsapp_cargas",
      expect.objectContaining({
        page: "cargas_landing_nacional",
      })
    );
  });

  it("opens Instagram as the secondary contact", () => {
    render(<Home />);

    fireEvent.click(
      screen.getAllByRole("button", { name: /Ver Instagram/i })[0]
    );

    expect(global.window.open).toHaveBeenCalledWith(
      "https://www.instagram.com/busca.frete/",
      "_blank",
      "noopener,noreferrer"
    );
    expect((global.window as any).gtag).toHaveBeenCalledWith(
      "event",
      "contact_instagram_cargas",
      expect.objectContaining({
        page: "cargas_landing_nacional",
      })
    );
  });

  it("tracks app downloads when the store links are used", () => {
    render(<Home />);

    fireEvent.click(screen.getAllByRole("link", { name: "App Store" })[0]);
    fireEvent.click(screen.getAllByRole("link", { name: "Google Play" })[0]);

    expect((global.window as any).gtag).toHaveBeenCalledWith(
      "event",
      "download_ios_app",
      expect.objectContaining({
        page: "cargas_landing_nacional",
      })
    );
    expect((global.window as any).gtag).toHaveBeenCalledWith(
      "event",
      "download_android_app",
      expect.objectContaining({
        page: "cargas_landing_nacional",
      })
    );
  });

  it("does not render the old residential positioning", () => {
    render(<Home />);

    const pageText = document.body.textContent ?? "";

    expect(pageText).not.toMatch(/residencial/i);
    expect(pageText).not.toMatch(/mudança/i);
    expect(pageText).not.toMatch(/pequeno porte/i);
    expect(pageText).not.toMatch(/médio porte/i);
    expect(pageText).not.toMatch(/carreto residencial/i);
    expect(pageText).not.toMatch(/casa e apartamento/i);
    expect(pageText).not.toMatch(/Mudança Vinhedo/i);
  });
});
