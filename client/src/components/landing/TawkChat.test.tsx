import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { ConsentBanner } from "./ConsentBanner";
import { TawkChat } from "./TawkChat";

const tawkScriptId = "tawkto-script";
const expectedSource =
  "https://embed.tawk.to/6a3c3b322784431d3e92a12c/1jrtkeg36";

describe("TawkChat com consentimento", () => {
  beforeEach(() => {
    localStorage.clear();
    document.getElementById(tawkScriptId)?.remove();
  });

  it("não carrega o Tawk.to antes da autorização e inicia após o aceite", async () => {
    render(
      <>
        <TawkChat />
        <ConsentBanner />
      </>
    );

    expect(document.getElementById(tawkScriptId)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Aceitar" }));

    await waitFor(() =>
      expect(document.getElementById(tawkScriptId)).toHaveAttribute(
        "src",
        expectedSource
      )
    );
  });

  it("carrega o chat quando o consentimento já foi concedido", () => {
    localStorage.setItem("bf_marketing_consent", "granted");

    render(<TawkChat />);

    expect(document.getElementById(tawkScriptId)).toHaveAttribute(
      "src",
      expectedSource
    );
  });

  it("mantém o chat desativado quando o consentimento foi recusado", () => {
    localStorage.setItem("bf_marketing_consent", "denied");

    render(<TawkChat />);

    expect(document.getElementById(tawkScriptId)).not.toBeInTheDocument();
  });
});
