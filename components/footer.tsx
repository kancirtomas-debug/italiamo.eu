import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Logo } from "./logo";
import { COMPANY } from "@/lib/company";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const locale = await getLocale();

  return (
    <footer className="mt-10 sm:mt-12 lg:mt-14 bg-ink-900 text-[#d8d3c8] font-sans">
      <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-6 sm:gap-8 lg:gap-8 text-[14px] leading-[1.55]">
        <div>
          <Logo />
          <p className="mt-3 text-[#b8b2a4] max-w-[34ch] leading-relaxed">
            {t("tagline")}
          </p>
          <p className="mt-3 italic font-display text-[14px] text-[#b8b2a4]">
            {t("rights")}.
          </p>
        </div>

        <div>
          <h6 className="font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-[#908a7e] mb-3">
            {t("shop")}
          </h6>
          <ul className="space-y-2">
            <li><Link href="/shop?cat=vino" className="font-sans hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors motion-reduce:transition-none">{nav("wine")}</Link></li>
            <li><Link href="/shop?cat=kava" className="font-sans hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors motion-reduce:transition-none">{nav("coffee")}</Link></li>
            <li><Link href="/shop?cat=cestoviny" className="font-sans hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors motion-reduce:transition-none">{nav("pasta")}</Link></li>
            <li><Link href="/shop?cat=bio" className="font-sans hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors motion-reduce:transition-none">{nav("bio")}</Link></li>
          </ul>
        </div>

        <div>
          <h6 className="font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-[#908a7e] mb-3">
            {t("contact")}
          </h6>
          <ul className="space-y-3 text-[14px]">
            <li>
              <p className="text-white">Branislav Solár</p>
              <p className="text-[12px] uppercase tracking-[0.1em] text-[#908a7e]">CEO</p>
              <a
                href="tel:+421917839954"
                className="font-mono hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors"
              >
                +421 917 839 954
              </a>
            </li>
            <li>
              <p className="text-white">Matej Solár</p>
              <p className="text-[12px] uppercase tracking-[0.1em] text-[#908a7e]">
                E-shop &amp; tech
              </p>
              <a
                href="tel:+421917502610"
                className="font-mono hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors"
              >
                +421 917 502 610
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-[#908a7e] mb-3">
            {t("legal")}
          </h6>
          <ul className="space-y-2">
            <li>
              <Link href="/dokumenty" className="font-sans hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors motion-reduce:transition-none">
                {t("legal")}
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="font-sans hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors motion-reduce:transition-none"
              >
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="font-sans hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors motion-reduce:transition-none"
              >
                {t("terms")}
              </Link>
            </li>
            <li>
              <a
                href="/dokumenty/prevadzkovatel.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors motion-reduce:transition-none"
              >
                GDPR
              </a>
            </li>
            <li>
              <a
                href="/dokumenty/cookies.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors motion-reduce:transition-none"
              >
                Cookies (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-10 py-4 lg:py-4 text-[12px] text-[#908a7e] flex flex-col md:flex-row md:items-center justify-between gap-3">
          <p>© 2026 {COMPANY.legalName}</p>
          <ul className="md:ml-auto md:mr-6 flex flex-col sm:flex-row gap-1 sm:gap-6 m-0 p-0 list-none">
            {COMPANY.addresses.map((a) => (
              <li key={a.oneLine} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                <span className="uppercase tracking-[0.12em] text-[11px] text-[#7c766b]">
                  {locale === "en" ? a.label.en : a.label.sk}
                </span>
                <span className="font-mono not-italic">{a.oneLine}</span>
              </li>
            ))}
          </ul>
          <a
            href="https://webzatyzden.sk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Built by webzatyzden.sk"
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] text-[12px] font-mono uppercase tracking-[0.14em] text-[#d8d3c8] hover:bg-white/10 hover:text-white hover:border-white/30 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span>by webzatyzden.sk</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
