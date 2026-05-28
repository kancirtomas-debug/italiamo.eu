import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://italiamo.eu"),
  title: {
    default: "Italiamo — Autentické chute Talianska | Víno, káva, cestoviny",
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
      it: "https://italiamo.eu/it",
      "x-default": "https://italiamo.eu/sk",
    },
  },
  icons: {
    icon: "/italiamo-logo.png",
    apple: "/italiamo-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
