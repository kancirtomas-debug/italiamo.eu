import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

const config: NextConfig = {
  cacheComponents: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "shop.italiamo.eu" },
      { protocol: "https", hostname: "italiamo.eu" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default withNextIntl(config);
