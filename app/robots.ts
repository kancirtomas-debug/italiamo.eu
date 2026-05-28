import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/checkout/", "/cart"],
      },
    ],
    sitemap: "https://italiamo.eu/sitemap.xml",
    host: "https://italiamo.eu",
  };
}
