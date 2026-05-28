import { Fraunces, DM_Sans, DM_Mono } from "next/font/google";

export const fontDisplay = Fraunces({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

export const fontSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const fontMono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

// Aranciata replaces Alegreya — declare a second DM Sans instance under
// the legacy `--font-alegreya` variable so existing references resolve.
export const fontAlegreya = DM_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-alegreya",
  weight: ["400", "500", "600", "700"],
});
