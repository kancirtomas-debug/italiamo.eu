import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/lib/i18n/routing";
import { Mail, MapPin, Phone } from "lucide-react";
import { LeadForm } from "@/components/lead-form";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <section className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16 lg:py-20">
      <p className="eyebrow mb-3">{t("nav.contact")}</p>
      <h1 className="display-lg mb-4 sm:mb-6">
        {locale === "it" ? "Scrivici" : "Napíšte nám"}
      </h1>
      <p className="body-lg max-w-[52ch] mb-8 sm:mb-12 lg:mb-14" lang={locale}>
        {locale === "it"
          ? "Ordini, collaborazioni o domande sui prodotti — rispondiamo entro un giorno lavorativo."
          : "Objednávky, spolupráca alebo otázky k produktom — odpovedáme do jedného pracovného dňa."}
      </p>

      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 sm:gap-12 lg:gap-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 sm:gap-4 lg:gap-8 border-y sm:border-0 border-cream-300 py-6 sm:py-0">
          <Item
            icon={<MapPin size={20} strokeWidth={1.5} />}
            title={locale === "it" ? "Indirizzo" : "Adresa"}
            lines={["Italiamo Distribution s.r.o.", "Družstevná", "080 06 Prešov"]}
          />
          <Item
            icon={<Mail size={20} strokeWidth={1.5} />}
            title="Email"
            lines={["info@italiamo.eu"]}
          />
          <Item
            icon={<Phone size={20} strokeWidth={1.5} />}
            title={locale === "it" ? "Telefono" : "Telefón"}
            lines={["+421 000 000 000"]}
          />
        </div>

        <div>
          <LeadForm locale={locale} />
        </div>
      </div>
    </section>
  );
}

function Item({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}) {
  return (
    <div>
      <div className="text-terracotta-600 mb-3" aria-hidden="true">
        {icon}
      </div>
      <p className="eyebrow mb-2">{title}</p>
      {lines.map((l, i) => (
        <p key={i} className="body-sm">
          {l}
        </p>
      ))}
    </div>
  );
}
