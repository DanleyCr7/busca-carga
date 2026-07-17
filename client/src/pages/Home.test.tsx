import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Home from "./Home";

const fetchMock = vi.fn();
const scrollToMock = vi.fn();

Object.defineProperty(window, "fetch", { writable: true, value: fetchMock });
Object.defineProperty(window, "scrollTo", { writable: true, value: scrollToMock });

describe("Home - Busca Frete landing", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders the reference structure and navigation", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /o frete certo para sua carga/i })).toBeInTheDocument();
    const navigation = screen.getByRole("navigation", { name: /navegação principal/i });
    expect(within(navigation).getByRole("link", { name: /como funciona/i })).toHaveAttribute("href", "#como-funciona");
    expect(within(navigation).getByRole("link", { name: /serviços/i })).toHaveAttribute("href", "#servicos");
    expect(within(navigation).getByRole("link", { name: /para empresas/i })).toHaveAttribute("href", "#solucoes");
  });

  it("keeps the freight search visual-only", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("form")).toBeNull();
    expect(screen.getByRole("textbox", { name: "Origem" })).toBeDisabled();
    expect(screen.getByRole("textbox", { name: "Destino" })).toBeDisabled();
    expect(screen.getByRole("button", { name: /buscar frete/i })).toHaveAttribute("type", "button");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("renders vehicles, solutions, steps and metrics", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /do pequeno ao extrapesado/i })).toBeInTheDocument();
    expect(screen.getAllByText(/carreta baú|carroceria aberta|truck baú|carroceria sider/i)).toHaveLength(4);
    expect(screen.queryByText("Van")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /soluções completas para sua logística/i })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(13);
    expect(screen.getByText("+25.000")).toBeInTheDocument();
    expect(screen.getByText("+80.000")).toBeInTheDocument();
    expect(screen.getByText("+5.000")).toBeInTheDocument();
    expect(screen.getByText("98%")).toBeInTheDocument();
  });

  it("renders the landing images without empty slots", () => {
    const { container } = render(<Home />);
    const placeholders = Array.from(container.querySelectorAll<HTMLImageElement>("img[data-image-slot]"));
    const heroImage = container.querySelector<HTMLImageElement>('img[data-image-slot="hero-map-truck"]');
    const coverageImage = container.querySelector<HTMLImageElement>('img[data-image-slot="coverage-map"]');
    const emptyPlaceholders = placeholders.filter((image) => !image.hasAttribute("src"));

    expect(placeholders).toHaveLength(10);
    expect(emptyPlaceholders).toHaveLength(0);
    expect(heroImage).toHaveAttribute("src", "/images/busca-frete-caminhao.png");
    expect(heroImage).toHaveAttribute("alt", "Caminhão de carga da Busca Frete");
    expect(coverageImage).toHaveAttribute("src", "/images/mapa-brasil-busca-frete-corrigido.svg");
    expect(coverageImage).toHaveAttribute("alt", "Mapa do Brasil representando a cobertura nacional da Busca Frete");
    expect(container.querySelector('img[data-image-slot="support-avatar"]')).toHaveAttribute("src", "/images/atendimento-busca-frete.png");
    expect(screen.getByRole("img", { name: "Atendimento especializado da Busca Frete" })).toBeInTheDocument();
    expect(container.querySelector('img[data-image-slot="step-1"]')).toHaveAttribute("src", "/images/como-funciona-caminhao.png");
    expect(container.querySelector('img[data-image-slot="step-2"]')).toHaveAttribute("src", "/images/como-funciona-painel.png");
    expect(container.querySelector('img[data-image-slot="step-3"]')).toHaveAttribute("src", "/images/como-funciona-aplicativo.png");
    expect(screen.getByRole("img", { name: "Carreta baú da Busca Frete" })).toHaveAttribute("src", "/images/carreta-bau-busca-frete.png");
    expect(screen.getByRole("img", { name: "Caminhão de carroceria aberta" })).toHaveAttribute("src", "/images/caminhao-carroceria-aberta.png");
    expect(screen.getByRole("img", { name: "Caminhão truck baú" })).toHaveAttribute("src", "/images/caminhao-truck-bau.png");
    expect(screen.getByRole("img", { name: "Caminhão de carroceria sider com lona azul" })).toHaveAttribute("src", "/images/caminhao-carroceria-sider.png");
  });

  it("renders national coverage and support CTA", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /atendemos todo o brasil/i })).toBeInTheDocument();
    expect(screen.getByText("Cobertura nacional")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /falar com um especialista/i })).toHaveAttribute("type", "button");
  });
});
