import { readFileSync } from "node:fs";
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
    expect(screen.getByRole("heading", { name: /o frete certo para sua mudança ou carga/i })).toBeInTheDocument();
    const navigation = screen.getByRole("navigation", { name: /navegação principal/i });
    expect(within(navigation).getByRole("link", { name: /como funciona/i })).toHaveAttribute("href", "#como-funciona");
    expect(within(navigation).getByRole("link", { name: /serviços/i })).toHaveAttribute("href", "#servicos");
    expect(within(navigation).getByRole("link", { name: /^soluções$/i })).toHaveAttribute("href", "#solucoes");
  });

  it("links the header to both app stores", () => {
    render(<Home />);
    expect(screen.queryByRole("button", { name: /entrar|cadastrar/i })).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /baixar busca frete na app store/i })[0]).toHaveAttribute(
      "href",
      "https://apps.apple.com/br/app/busca-frete/id6747501257",
    );
    expect(screen.getAllByRole("link", { name: /baixar busca frete na google play/i })[0]).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.frete.busca",
    );
  });

  it("replaces the freight search with the app download card", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("form")).toBeNull();
    expect(screen.queryByRole("button", { name: /buscar frete/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox", { name: /origem|destino/i })).not.toBeInTheDocument();
    expect(screen.getByText(/o busca frete está na palma da sua mão/i)).toBeInTheDocument();
    expect(screen.getByText(/acompanhe seus fretes, negocie e receba atualizações/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /baixar busca frete na app store/i })).toHaveLength(3);
    expect(screen.getAllByRole("link", { name: /baixar busca frete na google play/i })).toHaveLength(3);
    expect(screen.queryByText("Suporte dedicado")).not.toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("renders vehicles, solutions, steps and metrics", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /veículos para mudanças e cargas de todos os portes/i })).toBeInTheDocument();
    expect(screen.getAllByText(/carreta baú|carroceria aberta|truck baú|carroceria sider/i)).toHaveLength(4);
    expect(screen.queryByText("Van")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /soluções para mudanças e transporte de cargas/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /mudanças residenciais/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /pequenos fretes/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /solicite seu frete/i })).toBeInTheDocument();
    expect(screen.getByText("Fretes realizados")).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(13);
    expect(screen.getByText("1.809")).toBeInTheDocument();
    expect(screen.getByText("13")).toBeInTheDocument();
    expect(screen.getByText("64")).toBeInTheDocument();
    expect(screen.getByText("94%")).toBeInTheDocument();
  });

  it("renders the landing images without empty slots", () => {
    const { container } = render(<Home />);
    const placeholders = Array.from(container.querySelectorAll<HTMLImageElement>("img[data-image-slot]"));
    const heroImage = container.querySelector<HTMLImageElement>('img[data-image-slot="hero-map-fleet"]');
    const coverageImage = container.querySelector<HTMLImageElement>('img[data-image-slot="coverage-map"]');
    const emptyPlaceholders = placeholders.filter((image) => !image.hasAttribute("src"));

    expect(placeholders).toHaveLength(10);
    expect(emptyPlaceholders).toHaveLength(0);
    expect(heroImage).toHaveAttribute("src", "/images/busca-frete-frota.png");
    expect(heroImage).toHaveAttribute("alt", "Frota de caminhões da Busca Frete");
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
    expect(screen.getByRole("heading", { name: /cargas para todo o brasil/i })).toBeInTheDocument();
    expect(screen.getByText("Transporte de cargas com cobertura nacional")).toBeInTheDocument();
    expect(screen.getByText("Mudanças residenciais conforme a região")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /quero solicitar um frete/i })).toHaveAttribute("href", "#inicio");
    expect(screen.getByRole("heading", { name: /precisa de ajuda com sua mudança ou carga/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /falar com um especialista/i })).toHaveAttribute(
      "href",
      "https://wa.me/558699960441?text=Ol%C3%A1%21%20Preciso%20de%20ajuda%20para%20solicitar%20uma%20mudan%C3%A7a%20ou%20transportar%20uma%20carga.",
    );
  });

  it("describes residential moves and cargo transport in the page metadata", () => {
    const indexHtml = readFileSync("client/index.html", "utf8");
    const structuredDataSource = indexHtml.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    )?.[1];
    const structuredData = JSON.parse(structuredDataSource ?? "{}");
    const service = structuredData["@graph"]?.find((item: { "@type"?: string }) => item["@type"] === "Service");

    expect(indexHtml).toContain(
      "<title>Busca Frete | Mudanças e transporte de cargas</title>",
    );
    expect(indexHtml).toContain(
      '<meta name="description" content="Encontre motoristas verificados para mudanças residenciais e transporte de cargas, com acompanhamento e suporte especializado." />',
    );
    expect(indexHtml).toContain(
      '<meta property="og:title" content="Busca Frete | Mudanças e transporte de cargas" />',
    );
    expect(indexHtml).toContain(
      '<meta property="og:image:alt" content="Busca Frete — mudanças residenciais e transporte de cargas" />',
    );
    expect(service).toMatchObject({
      areaServed: "BR",
      serviceType: "Mudanças residenciais e transporte de cargas",
      description: "Transporte de cargas com cobertura nacional e mudanças residenciais sujeitas à disponibilidade regional.",
    });
  });
});
