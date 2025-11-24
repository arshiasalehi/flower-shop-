# Fleuriste Montréal

Premium flower shop experience built with React 18, Vite, TypeScript, Tailwind CSS, React Router, Zustand, and Vitest. The project focuses on same-day delivery commerce, localization for Montréal, and WCAG-aware UI patterns.

## Features
- **Comprehensive catalog** with 220 seeded products, faceted filters (price, colors, sizes, delivery, availability, tags), badge system, sale pricing, pagination, and promotional banners.
- **Product detail experiences** featuring gallery, variant selection, care tips, share actions, delivery badges, FAQs, and related items.
- **Stateful commerce flows** using Zustand stores for cart, filters, UI preferences, and mock auth session (signup/signin, account dashboard, reminders, addresses, wishlist-ready states).
- **Checkout + cart** with editable quantities, promo codes, mock shipping estimator, mini-cart drawer, savings math, and success states.
- **Content ecosystem**: about/FAQ/careers/contact, Montreal florist SEO copy, blog list + posts, store locator with Leaflet/OSM map, flower reference library (list + detail), subscriptions pricing, and legal pages.
- **Global navigation**: mega-menu for Flowers/Occasions, announcement bar with live countdown, search autocomplete with recent queries, cookie/consent controls, dark/light toggle, newsletter signup, social links, and trust badges.
- **Performance & UX**: responsive Tailwind design, skeletons, reduced-motion-friendly animations (Framer Motion), lazy routes, IntersectionObserver-friendly image usage, skip links, focus styles, and WCAG AA-conscious colors.
- **SEO + analytics**: react-helmet-async meta tags per page, sitemap/robots, JSON data ready for schema enrichment, and analytics stubs gated by cookie consent choices.
- **Testing & quality**: ESLint (typescript-eslint, jsx-a11y, Testing Library), Prettier, Vitest + RTL tests for business logic + key pages, and deterministic seeding script.

## Getting Started

### Prerequisites
- Node.js 18.20+ (see `.nvmrc`)
- npm 9+ (or pnpm/yarn if preferred)

### Installation
```bash
npm install
npm run seed   # generate src/data/products.json
```

### Local Development
```bash
npm run dev
```
- App served at `http://localhost:5173`
- `.env.example` documents optional API keys (Unsplash/Pexels/Maps/analytics). Fallback assets + OSM tiles are used if keys are absent.

### Linting & Formatting
```bash
npm run lint
npm run format
```

### Testing
```bash
npm run test       # watch mode
npm run test:run   # CI-friendly run
```
Coverage includes filter/sort utilities, cart math, countdown utility, and RTL smoke tests for PLP/PDP/Cart screens.

### Build & Preview
```bash
npm run build
npm run preview
```
Vite outputs a production bundle with code-splitting and Tailwind tree-shaking.

## Project Structure
```
src/
  app/         # routing + providers + layouts
  assets/      # logo + fallbacks
  components/  # reusable layout + UI primitives
  data/        # catalog seeds, navigation, content, home, stores
  features/    # domain modules (catalog, product, cart, checkout, auth, account, content, store-locator, legal)
  hooks/       # shared hooks (countdown, debounce, theme, search)
  lib/         # utilities (currency, filters, countdown, analytics, SEO, query helpers)
  styles/      # global + Tailwind entrypoints
  tests/       # Vitest suites
```

The `scripts/seed.ts` generator creates 220 products with realistic pricing, media, occasions, delivery options, badges, and sale data. Re-run whenever catalog refreshes.

## Environmental Notes
- `VITE_UNSPLASH_ACCESS_KEY` / `VITE_PEXELS_KEY`: optional for swapping to live image APIs. Default Unsplash static URLs + local fallbacks are bundled.
- `VITE_MAPS_API_KEY`: optional if switching to Google Maps. Leaflet + OSM tiles work offline.
- `VITE_ANALYTICS_WRITE_KEY`: placeholder for real analytics; `src/lib/analytics.ts` stubs events gated by cookie consent.

## Accessibility & Compliance
- Semantic headings/landmarks, skip link, focus-visible styles, and high-contrast palette.
- Cookie banner + settings modal align with GDPR/CPRA (analytics + marketing toggles, persistent preferences).
- Form validation via `react-hook-form` + Zod, with inline errors and ARIA-friendly inputs.

## Next Steps
- Wire real CMS/product APIs or commerce backends.
- Expand automated Lighthouse/axe testing in CI.
- Connect true authentication + payment providers when backend endpoints are available.
