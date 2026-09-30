import { Fraunces, DM_Sans } from "next/font/google";

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

