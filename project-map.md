# Project Map
_Generated: 2026-08-11 14:29 -0300 | Git: c450034_

## Directory Structure
client/ — React/Vite landing page, public assets, routes, tests, and UI components.
server/ — Minimal Express server that serves the production SPA bundle.
shared/ — Constants shared by the browser and server bundles.
docs/ — Operational checklists for acquisition and external console setup.
patches/ — pnpm dependency patches committed with the project.
assets/ — Source brand assets retained outside the browser public directory.

## Key Files
package.json — pnpm 10.4.1 scripts and the Vite, Vitest, TypeScript, React, and Express dependency contract.
client/src/pages/Home.tsx — Main marketing landing and the primary residential acquisition surface.
client/src/pages/Home.test.tsx — Regression coverage for residential priority, promotion visibility, fallback behavior, and major landing content.
client/src/pages/Drivers.tsx — Dedicated ABC driver acquisition page at `/motoristas`.
client/src/App.tsx — SPA route registry, including home, driver, privacy, and data-deletion routes.
client/src/lib/pilot.ts — Public residential-pilot API client and response type.
client/src/hooks/usePublicResidentialPilot.ts — Loads public pilot configuration and exposes the safe failure state.
client/src/lib/analytics.ts — Consent-gated GTM, GA4, Meta Pixel, UTM, and landing-event integration.
client/src/components/landing/ConsentBanner.tsx — Marketing consent UI; analytics remains denied until acceptance.
client/src/pages/privacidade/index.tsx — Public privacy policy required by attribution and Meta configuration.
client/src/pages/DataDeletion.tsx — Public data-deletion instructions required by Meta.
client/index.html — SEO, Open Graph, and structured metadata for the residential positioning.
client/src/index.css — Global Tailwind theme, typography, palette, and shared landing styles.
server/index.ts — Static hosting and SPA fallback for production.
vercel.json — Vercel build and route configuration.

## Critical Constraints
- Residential freight in the ABC Paulista is the primary positioning; cargo stays visible only as a secondary service.
- Never restore national-coverage claims, invented metrics, Tawk Chat, or direct store fallbacks from the old cargo landing.
- Client and driver downloads use only Vercel-provided AppsFlyer OneLinks; missing variables disable the CTA safely.
- Public pilot failure must leave the landing functional with the `ABC Paulista` fallback and no promotion.
- Marketing analytics is denied by default and only loads after explicit consent.
- The project declares pnpm 10.4.1; the desktop fallback pnpm 11 can try to purge the existing modules, so use pinned pnpm or installed binaries.
- Opening browsers or running apps on devices, simulators, or emulators requires explicit user authorization.
- Production deploys are separate from implementation and require explicit authorization.

## Hot Files
client/src/pages/Home.tsx, client/src/pages/Home.test.tsx, client/src/lib/analytics.ts, client/src/lib/pilot.ts, client/src/index.css
