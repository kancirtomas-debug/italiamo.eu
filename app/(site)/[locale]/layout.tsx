import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { AgeGate } from "@/components/age-gate";
import { fontSans, fontDisplay } from "../../fonts";
import "../../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://italiamo.eu"),
  title: {
    default: "Italiamo - Autentické chute Talianska | Víno, káva, cestoviny",
    template: "%s | Italiamo",
  },
  description:
    "Priamy import talianskeho vína, kávy Diemme, cestovín Grano Armando, olivových olejov a balsamica. Bez sprostredkovateľov, férová cena, plná dohľadateľnosť pôvodu.",
  applicationName: "Italiamo",
  keywords: [
    "talianske víno",
    "talianska káva",
    "talianske cestoviny",
    "olivový olej",
    "balsamico",
    "prosecco",
    "italiamo",
    "vino italiano",
    "caffè italiano",
    "pasta italiana",
  ],
  authors: [{ name: "Italiamo Distribution s.r.o." }],
  creator: "Italiamo Distribution s.r.o.",
  publisher: "Italiamo Distribution s.r.o.",
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    siteName: "Italiamo",
    images: [{ url: "/italiamo-logo-official.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      sk: "https://italiamo.eu/sk",
      en: "https://italiamo.eu/en",
      "x-default": "https://italiamo.eu/sk",
    },
  },
};

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
      className={`${fontSans.variable} ${fontDisplay.variable}`}
    >
      <head />
      <body className="bg-white text-ink-900 min-h-screen flex flex-col overflow-x-clip">
        <NextIntlClientProvider>
          <AgeGate locale={locale as "sk" | "en"} />
          <Nav />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
          <CookieBanner locale={locale as "sk" | "en"} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
