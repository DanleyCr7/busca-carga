import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Publish route-specific head tags before Google or a link preview renders JS.
// The Vite bundle remains shared and Wouter renders the requested page normally.
const outputDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist/public");
const template = await readFile(path.join(outputDirectory, "index.html"), "utf8");
const pages = [
  {
    path: "/cobertura",
    title: "Frete no ABCD e Mauá: cidades e cobertura | Busca Frete",
    description: "Consulte a cobertura do Busca Frete em Santo André, São Bernardo do Campo, São Caetano do Sul, Diadema e Mauá. Saiba como solicitar pelo aplicativo.",
  },
  {
    path: "/motoristas",
    title: "Motoristas parceiros no ABCD e Mauá | Busca Frete",
    description: "Cadastre-se como motorista parceiro do Busca Frete para atender fretes residenciais em Santo André, São Bernardo do Campo, São Caetano do Sul, Diadema e Mauá.",
  },
];

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

for (const page of pages) {
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttribute(page.title)}</title>`);
  const values = {
    description: page.description,
    "og:title": page.title,
    "og:description": page.description,
    "og:url": `https://www.buscafrete.com${page.path}`,
    "twitter:title": page.title,
    "twitter:description": page.description,
  };
  for (const [name, value] of Object.entries(values)) {
    const pattern = new RegExp(`(<meta (?:name|property)="${name}" content=")[^"]*("\\s*/?>)`);
    if (!pattern.test(html)) throw new Error(`Missing metadata: ${name}`);
    html = html.replace(pattern, (_, prefix, suffix) => `${prefix}${escapeAttribute(value)}${suffix}`);
  }
  html = html.replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/, (_, prefix, suffix) => `${prefix}https://www.buscafrete.com${page.path}${suffix}`);
  await writeFile(path.join(outputDirectory, `${page.path.slice(1)}.html`), html);
}
