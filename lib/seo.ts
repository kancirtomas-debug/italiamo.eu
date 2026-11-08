import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/routing";

export const SITE_URL = "https://italiamo.eu";
export const DEFAULT_OG_IMAGE = "/italiamo-logo-official.png";

/** Strip HTML/markdown links and squash whitespace, then cut at a word boundary. */
export function metaDescription(text: string, max = 155): string {
  const clean = text
    .replace(/<[^>]+>/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const atSpace = cut.lastIndexOf(" ");
  return `${(atSpace > max * 0.6 ? cut.slice(0, atSpace) : cut).replace(/[\s,.;:-]+$/, "")}…`;
}

/**
 * Canonical + hreflang for one page. `path` is the locale-less path,
 * e.g. "" for home, "/shop", "/shop/some-slug".
 */
export function pageAlternates(locale: Locale, path: string): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      sk: `/sk${path}`,
      en: `/en${path}`,
      "x-default": `/sk${path}`,
    },
  };
}

/**
 * Full per-page metadata: own title, description, canonical, hreflang,
 * og:url and og:image. `title` is the bare page title; the layout template
 * appends " | Italiamo" unless `absoluteTitle` is set.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
  imageAlt,
  absoluteTitle = false,
  type = "website",
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  absoluteTitle?: boolean;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | Italiamo`;
  const images = image
    ? [{ url: image, alt: imageAlt ?? title }]
    : [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Italiamo" }];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: pageAlternates(locale, path),
    openGraph: {
      type,
      url: `/${locale}${path}`,
      siteName: "Italiamo",
      locale: locale === "en" ? "en_US" : "sk_SK",
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}
