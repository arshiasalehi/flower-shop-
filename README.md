# 🌸 Fleuriste Montréal

**Fleuriste Montréal** is a premium flower-shop e-commerce experience built with React 18, Vite, TypeScript, Tailwind CSS, Zustand, React Router, and Stripe.  
Designed for modern same-day delivery in Montréal, the app includes a full catalog system, rich product pages, robust cart + checkout logic, localization, accessibility-aware UI patterns, and a full content ecosystem.

---

## 🚀 Features

### 🛒 Catalog & Product Experience
- 220 **seeded products** with realistic metadata  
- Faceted filters (price, color, size, delivery, availability, tags)  
- Badges (Sale, Same-Day Delivery, Seasonal, Limited, etc.)  
- Pagination, sorting, promo banners  
- Product detail pages with:
  - Image gallery  
  - Variant selection  
  - Care instructions  
  - Delivery badges  
  - FAQs  
  - Related items  

### 🛍️ Commerce Flow
- Zustand-powered:
  - Cart store  
  - Filters  
  - UI preferences  
  - Mock auth session (signup/signin)  
  - Wishlist-ready architecture  
- Editable cart quantities  
- Promo codes (mock logic)  
- Shipping estimator  
- Mini-cart drawer  
- Order success screens  

### 💳 Payment (Stripe)
- Checkout flow wired to **Stripe PaymentIntent API**  
- Test-mode credit cards supported  
- Secure client → server communication pattern  
- Stripe-friendly cart math + tax-ready calculations  

### 🗺️ Content Ecosystem
- About, FAQ, Careers, Contact  
- Montréal SEO content  
- Blog posts (list + detailed view)  
- Store locator using **Leaflet + OSM**  
- Flower encyclopedia (list + detail)  
- Subscription pricing pages  
- Full legal pages (Terms, Privacy, Returns)  

### 🧭 Global Navigation
- Mega-menu for Flowers / Occasions  
- Countdown announcement bar  
- Search autocomplete (with recent queries)  
- Cookie/consent preferences  
- Dark/light theme toggle  
- Newsletter signup  
- Social links + trust badges  

### ⚡ Performance & UX
- Fully responsive Tailwind layout  
- Skeleton loading states  
- Reduced-motion-aware animations (Framer Motion)  
- Lazy routes + code splitting (Vite)  
- Optimized images using IntersectionObserver patterns  
- Skip links, focus rings, and WCAG AA-aligned colors  

### 📈 SEO & Analytics
- `react-helmet-async` per-page meta tags  
- Sitemap, robots.txt  
- Schema-ready JSON metadata  
- Cookie-gated analytics events  

### 🧪 Testing & Quality
- ESLint (typescript-eslint + jsx-a11y)  
- Prettier  
- Vitest + RTL for:
  - Filters  
  - Sorting  
  - Cart math  
  - Countdown logic  
  - Smoke screens (PLP/PDP/Cart)  

---

# 💻 Tech Stack

## 🌐 Frontend
![React](https://img.shields.io/badge/React-61DBFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)

- React 18 + Vite  
- TypeScript throughout  
- Tailwind CSS with responsive, accessible design patterns  
- React Router  
- Zustand for global state  
- Framer Motion (reduced-motion aware animations)

## 💳 Payments
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)

- Stripe PaymentIntent API  
- Secure test-mode checkout  
- Server API endpoint (Node/Express or similar)  
- Client-side payment + order confirmation UI  

## 🛠️ Tooling
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)

- ESLint (a11y + TS rules)  
- Prettier formatting  
- Vitest + React Testing Library  
- Deterministic seeding script  

---

# 🧠 Architecture Overview

## 🎨 Presentation Layer
- Reusable UI components  
- Card templates, product layouts, blog layouts  
- Mega-menu + global header/footer  
- Tailwind styling + theme toggling  

## ⚙️ Domain Modules
- Catalog (filters, search, sorting)  
- Product detail (gallery, variants, FAQs)  
- Cart + checkout  
- Auth (mock session)  
- Account dashboard  
- Content pages  
- Store locator  
- Legal pages  

## 🗄️ State & Logic
- Zustand stores (cart, filters, preferences, session)  
- Lib utilities: currency, filters, analytics, SEO, countdown  
- React Router data flows  
- Stripe payment orchestration  

## 📦 Project Structure
```
src/
  app/
  assets/
  components/
  data/
  features/
  hooks/
  lib/
  styles/
  tests/
```

---

# 🛠️ Getting Started

### 📌 Prerequisites
- Node.js 18.20+  
- npm 9+ (or pnpm/yarn)

### 📦 Installation
```bash
npm install
npm run seed   # generate src/data/products.json
```

### ▶️ Local Development
```bash
npm run dev
```
- App: http://localhost:5173  
- `.env.example` includes optional API keys (Unsplash, Pexels, Maps, Analytics, Stripe)

### 🧹 Linting & Formatting
```bash
npm run lint
npm run format
```

### 🧪 Testing
```bash
npm run test
npm run test:run
```

### 🚀 Build & Preview
```bash
npm run build
npm run preview
```

---

# 🔐 Environment Variables
- `VITE_STRIPE_PUBLIC_KEY` – Stripe publishable key  
- `VITE_UNSPLASH_ACCESS_KEY` (optional)  
- `VITE_PEXELS_KEY` (optional)  
- `VITE_MAPS_API_KEY` (optional)  
- `VITE_ANALYTICS_WRITE_KEY` (optional)

Leaflet + OSM work without keys.

---

# ♿ Accessibility & Compliance
- Semantic headings + landmarks  
- Skip links  
- Focus-visible and contrast-safe colors  
- Reduced-motion support  
- Cookie banner + GDPR/CPRA-aligned preferences  
- Form validation (react-hook-form + Zod)

---

# 📈 Next Steps
- Connect real CMS or commerce backend  
- Production-ready Stripe order server  
- Integrate user accounts with a real auth provider  
- Automate Lighthouse/axe CI testing  

---

# 👥 Team Members
- [**Arshia Salehi**](https://github.com/arshiasalehi)
