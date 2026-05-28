# Italiamo Website

Next.js 16 e-shop for Italiamo Distribution s.r.o. — Italian food + wine importer (Prešov, SK).

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript, React 19
- Tailwind CSS v4 (terracotta / cream / olive / ink palette)
- next-intl v4 (SK + IT)
- Zustand (cart, persisted)
- GoPay REST (card payments)
- Bank transfer (manual reconciliation)

## Dev

```bash
pnpm install
cp .env.example .env.local      # then fill real GoPay + IBAN
pnpm dev                         # serves at http://localhost:4000
```

Runs on **port 4000**.

## Pages

- `/sk` `/it`            — home
- `/sk/shop`             — catalog (filter by `?cat=vino|kava|...`)
- `/sk/shop/[slug]`      — product detail
- `/sk/cart`             — cart
- `/sk/checkout`         — checkout (card via GoPay or bank transfer)
- `/sk/checkout/success` — order confirmation + bank instructions

## Payment

- **Card** — GoPay redirect flow. Set `GOPAY_*` env vars before go-live.
- **Bank transfer** — order saved with `awaiting_bank` status. IBAN + variable symbol shown to customer. Ops manually marks paid.

Orders persisted to `data/orders.json` (MVP — replace with DB before scale).

## Deployment

```bash
vercel link --scope marosove-projekty
vercel --prod
```

## Catalog

Product seed (`lib/products.ts`) sourced from italiamo.eu catalog factual data — names, prices, descriptions, regions. Replace placeholder Unsplash images with real product photos.
