import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ConsentBanner } from "./ConsentBanner";
import { TawkChat } from "./TawkChat";

const tawkScriptId = "tawkto-script";
const expectedSource =
  "https://embed.tawk.to/6a3c3b322784431d3e92a12c/1jrtkeg36";

type TestTawkApi = {
  maximize?: ReturnType<typeof vi.fn>;
  onLoad?: () => void;
};

function tawkWindow() {
  return window as Window & { Tawk_API?: TestTawkApi };
}

function finishTawkLoading() {
  const maximize = vi.fn();
  const api = tawkWindow().Tawk_API;
  expect(api?.onLoad).toBeTypeOf("function");
  if (api) api.maximize = maximize;
  act(() => api?.onLoad?.());
  return maximize;
}

describe("TawkChat com consentimento", () => {
  beforeEach(() => {
    localStorage.clear();
    document.getElementById(tawkScriptId)?.remove();
    delete tawkWindow().Tawk_API;
  });

  it("mostra somente a bolinha local antes do aceite e abre o aviso de privacidade", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    render(<TawkChat />);

    expect(document.getElementById(tawkScriptId)).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Conversar com o suporte" })
    );

    expect(
      screen.getByRole("heading", {
        name: "Para conversar com nosso suporte, aceite a Política de Privacidade",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Política de Privacidade" })
    ).toHaveAttribute("href", "/privacidade");
    expect(document.getElementById(tawkScriptId)).not.toBeInTheDocument();
    expect(consoleError.mock.calls.flat().join(" ")).not.toContain(
      "Function components cannot be given refs"
    );
    consoleError.mockRestore();
  });

  it("fecha o aviso em Agora não sem carregar o Tawk.to", () => {
    render(<TawkChat />);

    fireEvent.click(
      screen.getByRole("button", { name: "Conversar com o suporte" })
    );
    fireEvent.click(screen.getByRole("button", { name: "Agora não" }));

    expect(
      screen.queryByRole("heading", {
        name: /para conversar com nosso suporte/i,
      })
    ).not.toBeInTheDocument();
    expect(document.getElementById(tawkScriptId)).not.toBeInTheDocument();
  });

  it("aceita a privacidade, carrega uma única vez e abre o chat solicitado", async () => {
    render(<TawkChat />);

    fireEvent.click(
      screen.getByRole("button", { name: "Conversar com o suporte" })
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Aceitar e conversar" })
    );

    expect(localStorage.getItem("bf_marketing_consent")).toBe("granted");
    expect(document.getElementById(tawkScriptId)).toHaveAttribute(
      "src",
      expectedSource
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Conversar com o suporte" })
    );
    expect(document.querySelectorAll(`#${tawkScriptId}`)).toHaveLength(1);

    const maximize = finishTawkLoading();
    await waitFor(() =>
      expect(
        screen.queryByRole("button", { name: "Conversar com o suporte" })
      ).not.toBeInTheDocument()
    );
    expect(maximize).toHaveBeenCalledTimes(1);
  });

  it("carrega pelo banner comum sem abrir o chat automaticamente", () => {
    render(
      <>
        <TawkChat />
        <ConsentBanner />
      </>
    );

    fireEvent.click(screen.getByRole("button", { name: "Aceitar" }));

    expect(document.getElementById(tawkScriptId)).toHaveAttribute(
      "src",
      expectedSource
    );
    const maximize = finishTawkLoading();
    expect(maximize).not.toHaveBeenCalled();
  });

  it("mantém a bolinha disponível após uma recusa anterior", () => {
    localStorage.setItem("bf_marketing_consent", "denied");

    render(<TawkChat />);

    expect(document.getElementById(tawkScriptId)).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Conversar com o suporte" })
    ).toBeInTheDocument();
  });

  it("restaura a bolinha quando o carregamento externo falha", async () => {
    localStorage.setItem("bf_marketing_consent", "granted");
    render(<TawkChat />);

    const script = document.getElementById(tawkScriptId);
    expect(script).toBeInTheDocument();
    act(() => script?.dispatchEvent(new Event("error")));

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Conversar com o suporte" })
      ).toBeInTheDocument()
    );
    expect(document.getElementById(tawkScriptId)).not.toBeInTheDocument();
  });
});
