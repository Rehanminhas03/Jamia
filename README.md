# Jamia Uloom Islamia — Trilingual Madrasa Website (Demo)

A production-quality, frontend-only demo for "Jamia Uloom Islamia," a madrasa / Islamic university. Built in **English, Urdu, and Arabic** with full RTL support. Visual reference: <https://www.banuri.edu.pk/>.

## Stack

- **Next.js 16.2.4** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** (CSS-first `@theme` configuration — no `tailwind.config.ts`)
- **next-intl 4.9.1** for routing-based i18n (`/en`, `/ur`, `/ar`)
- **framer-motion** for animations · **embla-carousel-react** for the hero slider · **lucide-react** for icons
- **next/font/google** for self-hosted fonts: Plus Jakarta Sans, Cormorant Garamond, Amiri (Arabic), Noto Nastaliq Urdu

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000> — root redirects to `/en`. Try `/ur` and `/ar` for the right-to-left views.

```bash
npm run build   # production build (Turbopack)
npm run lint    # ESLint
```

## Project structure

```
src/
├── app/
│   ├── globals.css                 # Tailwind v4 @theme + brand tokens
│   └── [locale]/
│       ├── layout.tsx              # owns <html>, fonts, dir, NextIntlClientProvider
│       ├── page.tsx                # Home composition
│       ├── not-found.tsx           # localized 404
│       └── [...rest]/page.tsx      # catch-all → triggers localized notFound()
├── components/
│   ├── home/                       # Hero, Intro, FeaturedDepartments, LatestNews, PrincipalMessage, CTA
│   ├── layout/                     # Header, Footer, LanguageSwitcher, MobileMenu, nav-links
│   ├── shared/                     # PageHero, AnimatedSection
│   └── ui/                         # Container, Button, Card, SectionTitle, IslamicPattern
├── i18n/
│   ├── routing.ts                  # locales, defaultLocale, isRtl helper
│   ├── request.ts                  # loads messages/{locale}.json
│   ├── navigation.ts               # locale-aware Link, useRouter, usePathname
│   └── messages/                   # en.json (canonical) · ur.json · ar.json
├── lib/
│   ├── data.ts                     # typed mock data (departments, news, stats, etc.)
│   └── utils.ts                    # cn(...) helper (clsx + tailwind-merge)
└── proxy.ts                        # next-intl middleware (Next 16 rename of middleware.ts)
public/
├── favicon.ico
└── pattern.svg                     # Islamic geometric overlay
```

## i18n notes

- All UI strings live in `src/i18n/messages/{en,ur,ar}.json`. Keys are mirrored across the three files; `next-intl` will throw on missing keys.
- Demo Urdu and Arabic translations were authored for the demo and are tagged with a **`[DRAFT]`** sentinel suffix. **Before production**, grep the codebase for `[DRAFT]` and have a native reviewer revise them:
  ```bash
  grep -rn "\[DRAFT\]" src/i18n/messages
  ```
- The `<html>` `dir` attribute is set server-side per locale (`ur` and `ar` → `rtl`). The `<body>` font class swaps automatically: Plus Jakarta on `/en`, Noto Nastaliq on `/ur`, Amiri on `/ar`.

## RTL approach

This project uses **Tailwind v4's native RTL support** — no `tailwindcss-rtl` plugin (incompatible with v4). Conventions:

- Logical properties throughout: `ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`, `text-start`, `text-end`. **Do not use** `pl-*` / `pr-*` / `ml-*` / `mr-*` / `text-left` / `text-right`.
- Directional icons (chevrons, arrows) get `rtl:-scale-x-100` so they flip in RTL.
- Hero carousel reads `useLocale()` and passes `direction: 'rtl' | 'ltr'` into embla so swipe + prev/next match the reading direction.
- framer-motion section reveals use `y` (vertical) so they stay direction-agnostic.

## Pages

All eight pages are live in all three locales:

| Page | Path | Highlights |
| --- | --- | --- |
| Home | `/` | Hero slider, intro, featured departments, latest news, principal's message, CTA |
| About | `/about` | Vision/mission/history alternating sections, **animated stats counter**, core values |
| Departments | `/departments` | Eight department cards with arched imagery and hover lift |
| Courses | `/courses` | Filter tabs (Beginner / Intermediate / Advanced), animated layout transitions |
| Admissions | `/admissions` | 5-step process timeline, eligibility, documents, mock application form |
| News & Events | `/news` | Category tabs, "Load More" pagination, animated grid |
| Fatwa | `/fatwa` | Search bar, category sidebar, accordion Q&A |
| Contact | `/contact` | Info block, mock form, embedded Google Map |

## Animations

- **Section reveals:** `AnimatedSection` wraps content with `whileInView` fade + 20px slide-up — fires once when 20% of the element enters the viewport.
- **Stagger:** grids pass an incremental `delay` (`idx * 0.08`) for a cascading reveal.
- **Counter count-up:** `useCountUp` + `IntersectionObserver` animates stats when scrolled into view; respects `prefers-reduced-motion`.
- **Filter transitions:** courses, news, and fatwa lists use framer-motion's `layout` + `AnimatePresence` for smooth re-flow when filters change.
- **Hover lift:** all cards `-translate-y-1` and grow shadow on hover.
- **Hero slider:** embla autoplay with locale-aware direction; slide content fades on each transition.
- **Mobile menu:** slides in from the leading edge via `AnimatePresence`.
- **Reduced motion:** a global CSS rule disables all animations and transitions when the user prefers reduced motion.

## Design tokens

Defined in [src/app/globals.css](src/app/globals.css) under `@theme`:

| Token | Value | Utility examples |
| --- | --- | --- |
| `--color-primary` | `#0F5132` (deep Islamic green) | `bg-primary`, `text-primary` |
| `--color-accent` | `#C9A24B` (gold) | `text-accent`, `border-accent` |
| `--color-cream` | `#FAF7F0` | `bg-cream` |
| `--font-display` | Cormorant Garamond | `font-display` |
| `--font-urdu` | Noto Nastaliq Urdu | `font-urdu` |
| `--font-arabic` | Amiri | `font-arabic` |

## Key Next.js 16 conventions used

- The middleware file is **`src/proxy.ts`** (Next 16 renamed `middleware.ts` → `proxy.ts`).
- Page and layout `params` are `Promise<T>` — every page/layout/`generateMetadata` does `const { locale } = await params;`.
- Turbopack is the default compiler.
- The `[locale]` segment owns the only `<html>`/`<body>` (no separate root layout).
