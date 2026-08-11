import { render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Home from "./Home";

const fetchMock = vi.fn();
Object.defineProperty(window, "fetch", { writable: true, value: fetchMock });
Object.defineProperty(window, "scrollTo", { writable: true, value: vi.fn() });

describe("landing residencial Busca Frete", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        available: true,
        pilotSlug: "abc-residencial-v1",
        state: "SP",
        cities: ["São Bernardo do Campo", "Santo André", "São Caetano do Sul"],
        minimumLeadHours: 48,
        promotion: null,
      }),
    });
  });

  it("prioriza frete residencial e mostra os dois públicos acima da dobra", async () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /seu frete residencial no abc, do seu jeito/i,
      })
    ).toBeInTheDocument();
    const appCard = screen.getByTestId("hero-app-card");
    expect(
      within(appCard).getByRole("heading", {
        name: /o busca frete está na palma da sua mão/i,
      })
    ).toBeInTheDocument();
    expect(
      within(appCard).getByRole("link", { name: /baixar o app/i })
    ).toBeInTheDocument();
    expect(
      within(appCard).getByRole("link", { name: /sou motorista/i })
    ).toHaveAttribute("href", "/motoristas");
    expect(
      screen.getByText(/agende com pelo menos 48 horas/i)
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText("São Bernardo do Campo")).toBeInTheDocument()
    );
  });

  it("mantém a composição visual do hero com largura disponível no desktop", async () => {
    render(<Home />);

    expect(screen.getByTestId("hero-brazil-map")).toHaveAttribute(
      "src",
      "/images/mapa-cobertura-brasil.png"
    );
    expect(
      screen.getByRole("img", {
        name: /caminhão de carga da busca frete/i,
      })
    ).toHaveAttribute("src", "/images/busca-frete-caminhao.png");
    await screen.findByText("São Bernardo do Campo");
  });

  it("restaura o card do aplicativo e os benefícios do hero antigo", async () => {
    render(<Home />);

    const appCard = screen.getByTestId("hero-app-card");
    expect(
      within(appCard).getByText(/solicite seu frete residencial/i)
    ).toBeInTheDocument();
    expect(
      within(appCard).getByText(/compare propostas e acompanhe o serviço/i)
    ).toBeInTheDocument();

    const benefits = screen.getByTestId("hero-benefits-desktop");
    expect(within(benefits).getByText("Propostas livres")).toBeInTheDocument();
    expect(within(benefits).getByText("Compare e escolha")).toBeInTheDocument();
    expect(within(benefits).getByText("Motoristas aptos")).toBeInTheDocument();
    expect(within(benefits).getByText("Para sua rota")).toBeInTheDocument();
    expect(within(benefits).getByText("Agendamento")).toBeInTheDocument();
    expect(
      within(benefits).getByText("Mínimo de 48 horas")
    ).toBeInTheDocument();

    await screen.findByText("São Caetano do Sul");
  });

  it("recupera a hierarquia comercial da landing antiga com conteúdo residencial", async () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /do item avulso à mudança completa/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /tudo o que sua mudança precisa/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /como funciona/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /cobertura residencial no abc paulista/i,
      })
    ).toBeInTheDocument();

    await screen.findByText("São Bernardo do Campo");
  });

  it("renderiza o Brasil inteiro e destaca as cidades do ABC a partir do GeoJSON", async () => {
    render(<Home />);

    const coverageMap = screen.getByTestId("coverage-map");
    expect(coverageMap).toHaveAttribute(
      "data-source",
      "client/src/data/brazil-abc-coverage.json"
    );
    expect(
      within(coverageMap).getByRole("img", {
        name: /mapa do brasil com o abc paulista em destaque/i,
      })
    ).toBeInTheDocument();
    expect(
      within(coverageMap).getByRole("listitem", {
        name: "São Bernardo do Campo",
      })
    ).toBeInTheDocument();
    expect(
      within(coverageMap).getByRole("listitem", { name: "Santo André" })
    ).toBeInTheDocument();
    expect(
      within(coverageMap).getByRole("listitem", {
        name: "São Caetano do Sul",
      })
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/todo o brasil|cobertura nacional/i)
    ).not.toBeInTheDocument();

    await screen.findByText("Santo André");
  });

  it("apresenta somente as três categorias residenciais reais", async () => {
    render(<Home />);

    expect(screen.getByText("Categoria 1")).toBeInTheDocument();
    expect(screen.getByText("Caminhão pequeno")).toBeInTheDocument();
    expect(screen.getByText("Categoria 2")).toBeInTheDocument();
    expect(screen.getByText("Caminhão médio")).toBeInTheDocument();
    expect(screen.getByText("Categoria 3")).toBeInTheDocument();
    expect(screen.getByText("Caminhão grande")).toBeInTheDocument();
    expect(screen.queryByText("Categoria 4")).not.toBeInTheDocument();
    expect(screen.getByText("Ajudantes informados")).toBeInTheDocument();

    await screen.findByText("Santo André");
  });

  it("substitui métricas antigas por fatos verificáveis do piloto", async () => {
    render(<Home />);

    expect(screen.getByText("3 cidades")).toBeInTheDocument();
    expect(screen.getByText("48 horas")).toBeInTheDocument();
    expect(screen.getByText("3 categorias")).toBeInTheDocument();
    expect(screen.getByText("Expansão em andamento")).toBeInTheDocument();
    expect(
      screen.queryByText(
        /1\.809|motoristas cadastrados|satisfação dos clientes/i
      )
    ).not.toBeInTheDocument();

    await screen.findByText("São Caetano do Sul");
  });

  it("mantém cargas como serviço secundário sem promessa nacional", async () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /também precisa transportar cargas/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/consulte a disponibilidade no app/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/todo o brasil|cobertura nacional/i)
    ).not.toBeInTheDocument();
    await screen.findByText("Santo André");
  });

  it("divulga ABC30 apenas quando a API confirma a campanha ativa", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        available: true,
        pilotSlug: "abc-residencial-v1",
        state: "SP",
        cities: ["Santo André"],
        minimumLeadHours: 48,
        promotion: {
          code: "ABC30",
          maximumDiscountCents: 3000,
          endsAt: "2026-09-10T23:59:00.000Z",
        },
      }),
    });
    render(<Home />);

    expect(
      await screen.findByText(/até r\$ 30 de benefício/i)
    ).toBeInTheDocument();
  });

  it("usa o fallback ABC Paulista, oculta promoção e não inventa link de loja quando a API falha", async () => {
    fetchMock.mockRejectedValueOnce(new Error("offline"));
    render(<Home />);

    expect(await screen.findByText("ABC Paulista")).toBeInTheDocument();
    expect(screen.queryByText(/abc30/i)).not.toBeInTheDocument();
    const appCard = screen.getByTestId("hero-app-card");
    expect(
      within(appCard).getByRole("link", { name: /baixar o app/i })
    ).not.toHaveAttribute("href");
  });
});
