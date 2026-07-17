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
    expect(screen.getAllByText(/carreta baú|carroceria aberta|truck baú|carroceria sider|van/i)).toHaveLength(5);
    expect(screen.getByRole("heading", { name: /soluções completas para sua logística/i })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(14);
    expect(screen.getByText("+25.000")).toBeInTheDocument();
    expect(screen.getByText("+80.000")).toBeInTheDocument();
    expect(screen.getByText("+5.000")).toBeInTheDocument();
    expect(screen.getByText("98%")).toBeInTheDocument();
  });

  it("reserves every image slot without a source", () => {
    const { container } = render(<Home />);
    const placeholders = Array.from(container.querySelectorAll<HTMLImageElement>("img[data-image-slot]"));
    expect(placeholders).toHaveLength(11);
    expect(placeholders.every((image) => !image.hasAttribute("src"))).toBe(true);
    expect(placeholders.map((image) => image.dataset.imageSlot)).toContain("hero-map-truck");
    expect(placeholders.map((image) => image.dataset.imageSlot)).toContain("coverage-map");
  });

  it("renders national coverage and support CTA", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /atendemos todo o brasil/i })).toBeInTheDocument();
    expect(screen.getByText("Cobertura nacional")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /falar com um especialista/i })).toHaveAttribute("type", "button");
  });
});
