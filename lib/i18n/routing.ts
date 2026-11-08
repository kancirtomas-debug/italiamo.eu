import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sk", "en"],
  defaultLocale: "sk",
  localePrefix: "always",
  // hreflang is emitted per page in <head> (lib/seo.ts). next-intl's own Link
  // headers pointed x-default at the unprefixed URL and contradicted it.
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
