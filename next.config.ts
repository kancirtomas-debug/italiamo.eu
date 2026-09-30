import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

const config: NextConfig = {
  cacheComponents: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    // Vercel image optimization quota is exhausted on this plan and every
    // uncached /_next/image request returns 402. Assets in /public are already
    // webp/avif, so serve them directly instead of through the optimizer.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "kvunflkysscrkfcsaras.supabase.co" },
    ],
  },
  async redirects() {
    // Consolidate to a single site: any traffic on the legacy shop subdomain
    // or the www host is sent to the canonical apex.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "shop.italiamo.eu" }],
        destination: "https://italiamo.eu/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.italiamo.eu" }],
        destination: "https://italiamo.eu/:path*",
        permanent: true,
      },
      // Removed duplicate pesto article, replaced by the rewritten version.
      {
        source: "/:locale(sk|en)/blog/pesto-genovese-cestoviny-recept",
        destination: "/:locale/blog/pesto-nikdy-nevarim-ligursky-recept-15-minut",
        permanent: true,
      },
      // Legacy legal-page slugs from the previous site. They were still linked
      // from the footer and are indexed, so send them to the real pages.
      {
        source: "/zasady-spracovania-a-ochrany-osobnych-udajov",
        destination: "/sk/privacy",
        permanent: true,
      },
      {
        source: "/zasady-pouzivania-suborov-cookies",
        destination: "/sk/terms",
        permanent: true,
      },
      {
        source: "/obchodne-podmienky",
        destination: "/sk/terms",
        permanent: true,
      },
      {
        source: "/ochrana-osobnych-udajov",
        destination: "/sk/privacy",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(config);
