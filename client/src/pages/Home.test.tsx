import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import Home from "./Home";

global.window.open = vi.fn();
(global.window as any).gtag = vi.fn();

describe("Home - Busca Frete Residencial", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the residential hero and local context", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Mudança sem dor de cabeça." })
    ).toBeTruthy();
    expect(
      screen.getAllByText(/Busca Frete Residencial/i).length
    ).toBeGreaterThan(0);
    expect(screen.getAllByText(/Vinhedo e região/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Motorista parceiro/i).length).toBeGreaterThan(
      0
    );
    expect(screen.getByText("Indicação no app")).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /Ver programa de indicação/i })
    ).toHaveAttribute("href", "#trabalhe-conosco");
  });

  it("renders residential service language", () => {
    render(<Home />);

    expect(screen.getByText("Pequeno porte")).toBeTruthy();
    expect(screen.getByText("Médio porte")).toBeTruthy();
    expect(screen.getByText("Grande porte")).toBeTruthy();
    expect(
      screen.getByText(
        "Geladeira, fogão, mesa, sofá, cama e outros itens avulsos para mover sem complicação."
      )
    ).toBeTruthy();
  });

  it("renders the expected page sections", () => {
    render(<Home />);

    expect(screen.getByText("Frete residencial para a vida real")).toBeTruthy();
    expect(
      screen.getByText("Do pedido ao agendamento em poucos passos")
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "Trabalhe conosco" })
    ).toBeTruthy();
    expect(screen.getByText("Vinhedo e região para sua mudança.")).toBeTruthy();
    expect(screen.getByText("Carreto residencial")).toBeTruthy();
    expect(screen.getByText("Frete Vinhedo")).toBeTruthy();
    expect(screen.getByText("Casa e apartamento")).toBeTruthy();
    expect(screen.getByText("Mudança Vinhedo")).toBeTruthy();
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
      screen.getByText("Baixe o app e acompanhe as propostas da sua mudança.")
    ).toBeTruthy();
  });

  it("renders the floating app badges and keeps WhatsApp as the main action", () => {
    render(<Home />);

    const floating = screen.getByRole("navigation", {
      name: "Ações rápidas",
    });
    const scoped = within(floating);

    expect(scoped.getByText("Receba as propostas no app.")).toBeTruthy();
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

  it("opens WhatsApp with a residential Vinhedo message", () => {
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
    ).toContain("orçamento para minha mudança residencial em Vinhedo");
    expect((global.window as any).gtag).toHaveBeenCalledWith(
      "event",
      "contact_whatsapp_residential",
      expect.objectContaining({
        page: "residential_landing_vinhedo",
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
      "contact_instagram_residential",
      expect.objectContaining({
        page: "residential_landing_vinhedo",
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
        page: "residential_landing_vinhedo",
      })
    );
    expect((global.window as any).gtag).toHaveBeenCalledWith(
      "event",
      "download_android_app",
      expect.objectContaining({
        page: "residential_landing_vinhedo",
      })
    );
  });

  it("does not render the old long-route driver positioning", () => {
    render(<Home />);

    const pageText = document.body.textContent ?? "";

    expect(pageText).not.toMatch(/SP ⇄ PI/);
    expect(pageText).not.toMatch(/Rota SP-PI/);
    expect(pageText).not.toMatch(/Pagar\.me/);
    expect(pageText).not.toMatch(/frete de retorno/i);
    expect(pageText).not.toMatch(/BAIXAR PARA ANDROID/);
    expect(pageText).not.toMatch(/BAIXAR PARA IPHONE/);
    expect(pageText).not.toMatch(/carga pesada/i);
    expect(pageText).not.toMatch(/operação semi-manual/i);
    expect(pageText).not.toMatch(/validação interna/i);
  });
});
