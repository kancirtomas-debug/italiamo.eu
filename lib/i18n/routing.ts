import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sk", "it"],
  defaultLocale: "sk",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
