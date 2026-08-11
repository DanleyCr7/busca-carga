import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Drivers from "./Drivers";

Object.defineProperty(window, "scrollTo", { writable: true, value: vi.fn() });
Object.defineProperty(window, "fetch", {
  writable: true,
  value: vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      available: true,
      pilotSlug: "abc-residencial-v1",
      state: "SP",
      cities: ["São Bernardo do Campo", "Santo André", "São Caetano do Sul"],
      minimumLeadHours: 48,
      promotion: null,
    }),
  }),
});

describe("landing de motoristas do ABC", () => {
  it("explica cadastro, aprovação e responsabilidade pela disponibilidade", async () => {
    render(<Drivers />);

    expect(
      screen.getByRole("heading", { name: /fretes residenciais no abc/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/cadastro está liberado/i)).toBeInTheDocument();
    expect(screen.getAllByText(/aprovação cadastral/i)).toHaveLength(2);
    expect(
      screen.getByText(
        /responsabilidade do motorista manter sua disponibilidade/i
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/todo o brasil|cobertura nacional/i)
    ).not.toBeInTheDocument();
    expect(await screen.findByText("Santo André")).toBeInTheDocument();
  });
});
