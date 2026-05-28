import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { fontSans, fontDisplay, fontMono, fontAlegreya } from "../fonts";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable} ${fontAlegreya.variable}`}
    >
      <body className="bg-white text-ink-900 min-h-screen flex flex-col overflow-x-clip">
        <NextIntlClientProvider>
          <Nav />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
          <CookieBanner locale={locale as "sk" | "it"} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
