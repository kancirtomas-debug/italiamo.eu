import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Logo } from "./logo";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  return (
    <footer className="mt-20 bg-ink-900 text-[#d8d3c8] font-sans">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-12 grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 text-[13px] leading-[1.55]">
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
          <h6 className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[#908a7e] mb-3">
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
          <h6 className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[#908a7e] mb-3">
            {t("company")}
          </h6>
          <ul className="space-y-2">
            <li><Link href="/blog" className="font-sans hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors motion-reduce:transition-none">{nav("blog")}</Link></li>
            <li><Link href="/contact" className="font-sans hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors motion-reduce:transition-none">{t("contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h6 className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[#908a7e] mb-3">
            {t("legal")}
          </h6>
          <ul className="space-y-2">
            <li>
              <Link href="/dokumenty" className="font-sans hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors motion-reduce:transition-none">
                {t("legal")}
              </Link>
            </li>
            <li>
              <a
                href="https://italiamo.eu/zasady-spracovania-a-ochrany-osobnych-udajov"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors motion-reduce:transition-none"
              >
                {t("privacy")}
              </a>
            </li>
            <li>
              <a
                href="https://italiamo.eu/zasady-pouzivania-suborov-cookies"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors motion-reduce:transition-none"
              >
                {t("terms")}
              </a>
            </li>
            <li>
              <a
                href="https://shop.italiamo.eu/wp-content/uploads/2022/12/Prevadzkovatel-internetovym-obchodom-www.shop_.italiamo.eu-dalej-len-%E2%80%9EPrevadzkovatel.-25.05.2018.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors motion-reduce:transition-none"
              >
                GDPR
              </a>
            </li>
            <li>
              <a
                href="https://shop.italiamo.eu/wp-content/uploads/2022/12/Zasady-pouzivania-suborov-cookies.pdf"
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
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-5 text-[12px] text-[#908a7e] flex flex-col md:flex-row md:items-center justify-between gap-3">
          <p>© 2026 Italiamo Distribution s.r.o.</p>
          <p className="font-mono md:ml-auto md:mr-6">Družstevná, 080 06 Prešov</p>
          <a
            href="https://webzatyzden.sk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Built by webzatyzden.sk"
            className="self-start md:self-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-[11px] font-mono uppercase tracking-[0.12em] text-[#d8d3c8] hover:bg-white/10 hover:text-white hover:border-white/30 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
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
