import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./Home";

// Mock window.open
global.window.open = vi.fn();

// Mock gtag
(global.window as any).gtag = vi.fn();

describe("Home - BuscaFrete Landing Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the hero section with main headline", () => {
    render(<Home />);
    const headline = screen.getByText("CHEGA DE VAZIO DE RETORNO");
    expect(headline).toBeTruthy();
  });

  it("renders the hero section with sub-headline", () => {
    render(<Home />);
    const subHeadline = screen.getByText(/Frete Garantido para sua Volta: SP ⇄ PI/);
    expect(subHeadline).toBeTruthy();
  });

  it("renders both download buttons in hero section", () => {
    render(<Home />);
    const androidButton = screen.getByText("BAIXAR PARA ANDROID");
    const iphoneButton = screen.getByText("BAIXAR PARA IPHONE");
    expect(androidButton).toBeTruthy();
    expect(iphoneButton).toBeTruthy();
  });

  it("renders the 'Dor e Solução' section with 3 cards", () => {
    render(<Home />);
    expect(screen.getByText("Sua Maior Dor tem Solução Imediata")).toBeTruthy();
    expect(screen.getByText("Ficar Parado Custa Caro")).toBeTruthy();
    expect(screen.getByText("Pagamento Demorado e Inseguro")).toBeTruthy();
    expect(screen.getByText("Leilões Injustos")).toBeTruthy();
  });

  it("renders the 'Processo Simplificado' section with 3 steps", () => {
    render(<Home />);
    expect(screen.getByText("Como Funciona em 3 Passos Simples")).toBeTruthy();
    expect(screen.getByText("Encontre o Frete Ideal")).toBeTruthy();
    expect(screen.getByText("Feche seu Lance Vencedor")).toBeTruthy();
    expect(screen.getByText("Receba Rápido e Garantido")).toBeTruthy();
  });

  it("renders the video section", () => {
    render(<Home />);
    expect(screen.getByText("Veja o BuscaFrete em Ação")).toBeTruthy();
    const iframe = screen.getByTitle("BuscaFrete em Ação") as HTMLIFrameElement;
    expect(iframe).toBeTruthy();
    expect(iframe.src).toContain("youtube.com/embed");
  });

  it("renders the advantages section with 4 features", () => {
    render(<Home />);
    expect(screen.getByText("BuscaFrete na Rota SP ⇄ PI: Sua Vantagem Competitiva")).toBeTruthy();
    expect(screen.getByText("Segurança Financeira")).toBeTruthy();
    expect(screen.getByText("Foco Exclusivo")).toBeTruthy();
    expect(screen.getByText("Cadastro Rápido")).toBeTruthy();
    expect(screen.getByText("App Leve e Simples")).toBeTruthy();
  });

  it("renders the social proof section with testimonial", () => {
    render(<Home />);
    expect(screen.getByText("Quem usa, aprova")).toBeTruthy();
    expect(screen.getByText(/Achei que ia voltar vazio/)).toBeTruthy();
    expect(screen.getByText(/João A., Caminhoneiro Autônomo, PI/)).toBeTruthy();
  });

  it("renders the urgency counter", () => {
    render(<Home />);
    expect(screen.getByText("MUITOS FRETES MAPEADOS!")).toBeTruthy();
  });

  it("renders the final CTA section", () => {
    render(<Home />);
    expect(screen.getByText("Não perca mais tempo na estrada.")).toBeTruthy();
    expect(screen.getByText("Comece a lucrar agora.")).toBeTruthy();
  });

  it("renders the footer", () => {
    render(<Home />);
    expect(screen.getByText(/© 2025 BuscaFrete/)).toBeTruthy();
  });

  it("tracks Android download event when Android button is clicked", () => {
    render(<Home />);
    const androidButton = screen.getByText("BAIXAR PARA ANDROID");
    fireEvent.click(androidButton);
    
    expect((global.window as any).gtag).toHaveBeenCalledWith(
      "event",
      "app_download_sp_pi",
      expect.objectContaining({
        platform: "android",
      })
    );
  });

  it("tracks iOS download event when iOS button is clicked", () => {
    render(<Home />);
    const iphoneButton = screen.getByText("BAIXAR PARA IPHONE");
    fireEvent.click(iphoneButton);
    
    expect((global.window as any).gtag).toHaveBeenCalledWith(
      "event",
      "app_download_sp_pi",
      expect.objectContaining({
        platform: "ios",
      })
    );
  });

  it("opens Google Play Store when Android button is clicked", () => {
    render(<Home />);
    const androidButton = screen.getByText("BAIXAR PARA ANDROID");
    fireEvent.click(androidButton);
    
    expect(global.window.open).toHaveBeenCalledWith(
      "https://play.google.com/store/apps/details?id=com.frete.busca",
      "_blank"
    );
  });

  it("opens Apple App Store when iOS button is clicked", () => {
    render(<Home />);
    const iphoneButton = screen.getByText("BAIXAR PARA IPHONE");
    fireEvent.click(iphoneButton);
    
    expect(global.window.open).toHaveBeenCalledWith(
      "https://apps.apple.com/br/app/busca-frete/id6747501257",
      "_blank"
    );
  });

  it("renders all CTA buttons with orange styling", () => {
    render(<Home />);
    const buttons = screen.getAllByText(/BAIXAR|COMECE/);
    buttons.forEach((button: HTMLElement) => {
      expect(button.className).toContain("bg-orange-500");
      expect(button.className).toContain("text-white");
      expect(button.className).toContain("font-bold");
    });
  });

  it("renders responsive headline classes", () => {
    render(<Home />);
    const mainContainer = screen.getByText("CHEGA DE VAZIO DE RETORNO").closest("h1");
    expect(mainContainer?.className).toContain("text-4xl");
    expect(mainContainer?.className).toContain("sm:text-5xl");
    expect(mainContainer?.className).toContain("lg:text-6xl");
  });
});
