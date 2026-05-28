import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { getProducts } from "@/lib/queries";
import { routing } from "@/lib/i18n/routing";

const BASE = "https://italiamo.eu";
const LOCALES = routing.locales;

function alternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${BASE}/${l}${path}`;
  }
  languages["x-default"] = `${BASE}/sk${path}`;
  return { languages };
}

function buildLocaleEntries(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
  lastModified: Date = new Date(),
): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: `${BASE}/${locale}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: alternates(path),
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths: Array<{
    path: string;
    cf: MetadataRoute.Sitemap[number]["changeFrequency"];
    p: number;
  }> = [
    { path: "", cf: "weekly", p: 1.0 },
    { path: "/shop", cf: "daily", p: 0.95 },
    { path: "/blog", cf: "weekly", p: 0.9 },
    { path: "/about", cf: "monthly", p: 0.7 },
    { path: "/contact", cf: "monthly", p: 0.6 },
    { path: "/dokumenty", cf: "yearly", p: 0.3 },
    { path: "/privacy", cf: "yearly", p: 0.2 },
    { path: "/terms", cf: "yearly", p: 0.2 },
  ];

  const staticEntries = staticPaths.flatMap((s) =>
    buildLocaleEntries(s.path, s.cf, s.p),
  );

  const blogEntries = posts.flatMap((post) =>
    buildLocaleEntries(
      `/blog/${post.slug}`,
      "monthly",
      0.85,
      new Date(post.date),
    ),
  );

  let productEntries: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts();
    productEntries = products.flatMap((product) =>
      buildLocaleEntries(`/shop/${product.slug}`, "weekly", 0.8),
    );
  } catch {
    productEntries = [];
  }

  return [...staticEntries, ...blogEntries, ...productEntries];
}
