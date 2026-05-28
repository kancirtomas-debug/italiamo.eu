# Italiamo — Design Brief for Claude Design

> Feed this file to **claude-design**. Task: redesign the live e-shop at `http://localhost:4000` in **3 distinct visual styles**. Same routes, same data, three completely different aesthetics.

---

## Project Context

- **Site:** Italiamo — premium Italian e-shop for Slovak market
- **URL (local dev):** `http://localhost:4000`
- **Repo:** `C:\Users\kanci\Italiamo-website\`
- **Stack:** Next.js 16 (App Router, Turbopack), Tailwind CSS, next-intl (it / sk), Drizzle ORM, Resend
- **Run dev server:** `cd C:\Users\kanci\Italiamo-website && pnpm dev` (port 4000)
- **Product categories:** vini, caffè, pasta, salse, dolci — small producers, direct import, no middlemen
- **Audience:** SK customers buying authentic Italian food/wine. Premium but warm. Not luxury-cold.

## Routes to Redesign (per style)

Mandatory pages, all under `/[locale]/`:

1. `/` — homepage (hero, category teasers, featured products, story strip, blog teaser, footer)
2. `/shop` — product grid + category filter + count
3. `/shop/[slug]` — product detail (gallery, copy, price, add-to-cart, related)
4. `/cart` — line items, totals, checkout CTA
5. `/about` — story page
6. `/blog` — listing + 1 article layout
7. Global: header (logo, nav, cart icon, locale switch), footer

Each style is a **complete redesign** — header, footer, type, color, spacing, components, motion, micro-copy framing. Not a reskin.

## Hard Constraints (all 3 styles)

- Keep Next.js 16 App Router + existing route structure + i18n (it/sk).
- Keep `ProductCard`, `getProducts`, `getCategories` data contracts.
- Mobile-first responsive. Min target: 360px width.
- WCAG AA contrast on all body text + interactive elements.
- Existing shop product image convention: cream card + inner 70% white square box, `object-contain object-center`. Each style may reinterpret card but must keep transparent-PNG-friendly inner area.
- Reduced-motion fallback required for any animation.
- Performance budget: LCP < 2.0s on /shop with 24 products, no layout shift.

## Deliverable

For each of the 3 styles, ship:

- New / replaced components under `components/styles/{style-slug}/`
- A style-scoped CSS layer (Tailwind tokens + globals override)
- A toggle: `?style=editorial | mercato | bottega` query param OR route prefix `/style/{slug}/...` — pick whichever is cleaner. Default style stays the current one.
- README per style: 1 short paragraph + screenshot of `/shop` + `/shop/[slug]`.

---

## STYLE 1 — "Editorial Trattoria"

Warm editorial print magazine. Feels like a high-end Italian food zine — *Apartamento × Cereal × old Slow Food guides*. Quiet, confident, lots of breathing room.

**Mood words:** editorial, warm, restrained, typographic, paper, sun-bleached, hand-set.

**Palette:**
- Background: `#F5EFE4` (warm cream paper)
- Ink: `#1B1A17` (warm near-black)
- Accent 1: `#8C2A1F` (dried tomato red, used sparingly)
- Accent 2: `#3D5B3A` (olive leaf green)
- Muted: `#A89C86` (warm grey)
- No gradients. No glow. Flat ink on paper.

**Type:**
- Display: serif with old-style figures — `Editorial New`, `GT Sectra`, or `PP Editorial Old` fallback
- Body: humanist serif at 17–18px, generous leading (1.65)
- Eyebrows: small caps, wide tracking (0.18em), monospaced detail labels
- Italic used as voice, not decoration

**Layout:**
- 12-col grid with asymmetric placement. Big margins. Hanging indents.
- Product grid: 2-col desktop / 1-col mobile with editorial captions under each photo (producer name, region, year)
- Hero is a single hero image + pull-quote in big serif. No carousel.
- Drop caps on long copy.

**Components:**
- Product card: full-bleed photo on cream, name in serif, producer/region in small caps below, price right-aligned in tabular monospace
- Buttons: text-only with thin underline that animates on hover. No filled buttons except primary checkout (solid ink).
- Footer: long-form, like a magazine masthead. Credits, producers list, newsletter.

**Motion:** almost none. Page fades in. Image reveals via mask wipe on scroll.

---

## STYLE 2 — "Mercato Retro-Future"

Sunlit Italian market poster meets 70s-2090s retro-future. Bold, joyful, colorful. *Memphis × Saul Bass × Italian travel posters × modern web craft*. Tactile, glossy, fun. Matches Italiamo's existing retro+future direction but pushes it harder.

**Mood words:** sun, citrus, gloss, posterized, optimistic, candy-physical, skeuomorphic-light.

**Palette:**
- Background: `#FFF8EC` (creamy off-white) with grainy noise overlay
- Primary: `#F25E3D` (blood-orange)
- Secondary: `#F4C430` (saffron yellow)
- Tertiary: `#0E6E5A` (basil green)
- Deep: `#1A2A6B` (Adriatic blue)
- Ink: `#221A14`
- Subtle radial gradients allowed (sun, citrus pulp). Soft drop shadows allowed.

**Type:**
- Display: condensed grotesque OR retro slab — `Migra`, `PP Mondwest`, or `Tobias`. Heavy weights.
- Body: warm geometric sans — `GT Walsheim`, `Söhne`, or `Inter` with tightened tracking
- Numerals: tabular, oversized on price
- Use big curved/arched text on hero (`text-on-path`) for category labels

**Layout:**
- Product grid: 3-col desktop, soft rounded cards (24px radius), subtle inner shadow giving "sticker" feel
- Hero: layered poster composition — illustrated citrus / pasta shapes float behind type
- Category chips are pill-shaped with thick borders and offset shadow (1970s sticker look)
- Sections separated by curved SVG dividers

**Components:**
- Product card: rounded cream tile + inner 70% white square (preserve convention), playful price tag overlay (rotated -3deg, saffron bg), "Aggiungi" button bottom-right as candy-physical pill with offset shadow
- Buttons: solid color, thick (56px tall), offset hard shadow `4px 4px 0 #221A14`, satisfying press-down animation (translate + shadow collapse)
- Cart: feels like a market receipt — perforated edge, monospace totals

**Motion:** confident. Hover lifts cards 2px. Buttons compress on click. Hero shapes parallax gently. Loading states use a rotating sun.

---

## STYLE 3 — "Bottega Brutalist"

Raw industrial Italian workshop. Swiss grid discipline meets Milanese concrete. *Massimo Vignelli × ECAL × OFFF posters × terminal UIs*. Hard edges, monospace data, technical confidence. Premium through restraint, not warmth.

**Mood words:** concrete, grid, monospace, technical, archival, weighted, severe.

**Palette:**
- Background: `#ECECEA` (concrete grey)
- Surface: `#FFFFFF` flat
- Ink: `#0A0A0A` (true black)
- Accent: `#FF3B00` (signal red — used as data highlight, not decoration)
- Muted: `#6B6B68`
- No gradients. No shadows. No rounded corners except 2px max.

**Type:**
- Display: heavy grotesque — `GT America Mono`, `ABC Diatype`, or `Söhne Breit`. Set TIGHT. Negative tracking on big sizes.
- Body: neutral grotesque at 14–15px
- Labels: monospace (`JetBrains Mono`, `Berkeley Mono`) — used for SKU, weight, origin, price-per-unit, all metadata
- All caps for nav and section labels

**Layout:**
- Rigid 16-col grid, visible 1px hairlines between cells on hover (admin/editorial feel)
- Product grid: 4-col desktop, dense, no gaps — products separated by hairlines only
- Hero: full-bleed product photo + monospaced data block overlay (`PROD-014 / TOSCANA / 2021 / 750ML / €28.00`)
- Numbers everywhere — index numbers prefix each product (`014.`)

**Components:**
- Product card: white tile, hairline border, monospace SKU top-left, name bottom-left, price bottom-right in tabular monospace. Hover swaps photo for technical detail (label macro, bottle close-up).
- Buttons: rectangular, ink fill, monospace label, no radius. Hover inverts to red.
- Cart: looks like a shipping manifest. Aligned columns, totals row with double underline.
- Filter: vertical sidebar with checkbox-style toggles, monospace counts.

**Motion:** instant. No easing curves above 120ms. Hover states are step transitions, not eased. Page transitions: hard cut, with a brief monospace route label flashing top-left.

---

## Acceptance Checklist

For each style, verify:

- [ ] All 7 route types render without errors on `localhost:4000`
- [ ] Italian + Slovak locales both work
- [ ] Cart add → cart page → checkout flow still completes
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95 on `/shop`
- [ ] No console errors, no hydration warnings
- [ ] Mobile (375px) and desktop (1440px) screenshots of `/`, `/shop`, `/shop/[slug]`, `/cart`
- [ ] Reduced-motion respected
- [ ] Style switcher works and persists across navigation

## Out of Scope

- New product data, new copy beyond style-specific micro-copy
- Backend / API / DB changes
- Auth, payments wiring
- Email templates

## Tone of Voice (unchanged across styles)

Warm, direct, knowledgeable. Speaks like the importer who knows the producer's grandfather. Never marketing-loud. Never luxury-cold. Italian words used naturally, not as decoration.
