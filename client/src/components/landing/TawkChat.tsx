import { useEffect } from "react";

const TAWK_SCRIPT_ID = "tawkto-script";
const TAWK_PROPERTY_ID = "6a3c3b322784431d3e92a12c";
const TAWK_WIDGET_ID = "1jrtkeg36";

export function TawkChat() {
  useEffect(() => {
    if (document.getElementById(TAWK_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = TAWK_SCRIPT_ID;
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);

  return null;
}
