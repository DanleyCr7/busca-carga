import { render, screen, waitFor } from "@testing-library/react";
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
    expect(
      screen.getByRole("heading", { name: /acompanhe tudo pelo aplicativo/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /baixar o app e solicitar/i })
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /sou motorista/i })[0]
    ).toHaveAttribute("href", "/motoristas");
    expect(
      screen.getByText(/agende com pelo menos 48 horas/i)
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText("São Bernardo do Campo")).toBeInTheDocument()
    );
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

  it("usa o fallback ABC Paulista e oculta promoção quando a API falha", async () => {
    fetchMock.mockRejectedValueOnce(new Error("offline"));
    render(<Home />);

    expect(await screen.findByText("ABC Paulista")).toBeInTheDocument();
    expect(screen.queryByText(/abc30/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /baixar o app e solicitar/i })
    ).toHaveAttribute("href");
  });
});
