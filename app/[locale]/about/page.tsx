import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import type { Locale } from "@/lib/i18n/routing";
import { BrandMarquee } from "@/components/brand-marquee";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <section className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16">
      <p className="eyebrow">{t("nav.about")}</p>
      <h1 className="display-xl mt-5 max-w-[18ch]">
        {locale === "it"
          ? "Importiamo l'Italia, in tavola da te."
          : "Prinášame Taliansko priamo na váš stôl."}
      </h1>

      <div className="mt-14 grid lg:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-cream-300">
          <Image
            src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=900&q=80"
            alt="Italian winery"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="text-[16px] leading-relaxed text-ink-700">
          <p>
            {locale === "it"
              ? "Italiamo Distribution è importatore esclusivo di prodotti italiani in Slovacchia. Lavoriamo direttamente con cantine, oleifici e artigiani delle più importanti regioni d'Italia: Veneto, Toscana, Puglia, Sardegna, Sicilia, Piemonte."
              : "Italiamo Distribution je výhradný importér talianskych produktov na Slovensku. Spolupracujeme priamo s vinárstvami, olejárňami a remeselníkmi z najvýznamnejších regiónov Talianska: Veneto, Toscana, Apúlia, Sardínia, Sicília, Piemonte."}
          </p>
          <p className="mt-4">
            {locale === "it"
              ? "Ogni prodotto nel nostro catalogo è scelto per qualità, tradizione e autenticità. Niente compromessi."
              : "Každý produkt v našom katalógu je vybraný pre kvalitu, tradíciu a autenticitu. Žiadne kompromisy."}
          </p>
          <Link href="/shop" className="btn btn-orange btn-lg mt-7">
            {t("hero.cta")}
          </Link>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-3 border-t border-b border-cream-300">
        <Stat n="18" label={locale === "it" ? "Produttori" : "Producentov"} />
        <Stat n="7" label={locale === "it" ? "Regioni" : "Regiónov"} />
        <Stat n="24" label={locale === "it" ? "Mesi di importazione" : "Mesiacov importu"} />
      </div>

      <div className="mt-20">
        <BrandMarquee
          eyebrow={locale === "it" ? "I nostri produttori" : "Naši producenti"}
        />
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="border-r border-cream-300 last:border-r-0 py-6 pr-4">
      <span className="block font-display text-[36px] font-medium leading-none tracking-[-0.025em] text-ink-900">
        {n}
      </span>
      <span className="block mt-2 text-[12px] uppercase tracking-[0.06em] text-ink-500">
        {label}
      </span>
    </div>
  );
}
