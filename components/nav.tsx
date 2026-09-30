import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Logo } from "./logo";
import { LocaleSwitcher } from "./locale-switcher";
import { CartButton } from "./cart-button";
import { CustomerModeBadge } from "./customer-mode-badge";

export async function Nav() {
  const t = await getTranslations("nav");
  const locale = await getLocale();
  const skipLabel = locale === "en" ? "Skip to content" : "Preskočiť na obsah";

  const links: { href: string; label: string }[] = [
    { href: "/shop", label: t("shop") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  const mobileLinks: { href: string; label: string }[] = [
    { href: "/shop", label: t("shop") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 border-b border-cream-300"
    >
      <a
        href="#main"
        className="skip-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {skipLabel}
      </a>

      <div className="max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-10 min-w-0">
        <div className="h-14 sm:h-16 lg:h-16 flex items-center gap-2 sm:gap-8 lg:gap-12 min-w-0">
          <Link
            href="/"
            aria-label="Italiamo"
            className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm"
          >
            <Logo priority />
          </Link>

          <nav
            aria-label={t("shop")}
            className="hidden md:flex items-center gap-7 lg:gap-9 text-[17px] text-ink-900 flex-1 min-w-0 overflow-hidden"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-medium tracking-[-0.005em] whitespace-nowrap hover:text-terracotta-500 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-4 md:ml-auto shrink-0 ml-auto">
            <CustomerModeBadge />
            <LocaleSwitcher />
            <CartButton />
          </div>
        </div>

        <nav
          aria-label={t("shop")}
          className="md:hidden flex items-center justify-center gap-5 pb-2 pt-1 text-[14px] text-ink-900"
        >
          {mobileLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-medium tracking-[-0.005em] whitespace-nowrap hover:text-terracotta-500 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
