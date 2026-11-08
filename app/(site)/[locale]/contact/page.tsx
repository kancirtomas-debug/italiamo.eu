import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/lib/i18n/routing";
import { Mail, MapPin, Phone, FileText } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { COMPANY } from "@/lib/company";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

const META = {
  "title": {
    "sk": "Kontakt",
    "en": "Contact"
  },
  "desc": {
    "sk": "Kontakt na Italiamo Distribution s.r.o., Petrovany. Telefón, e-mail, adresa kancelárie a skladu. Radi poradíme s výberom vína aj veľkoodberom.",
    "en": "Contact Italiamo Distribution s.r.o., Petrovany, Slovakia. Phone, email, office and warehouse address. Happy to help with wine choice and wholesale."
  }
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: "sk" | "en" }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/contact", title: META.title[locale], description: META.desc[locale] });
}

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
        {locale === "en" ? "Write to us" : "Napíšte nám"}
      </h1>
      <p className="body-lg max-w-[52ch] mb-8 sm:mb-12 lg:mb-14" lang={locale}>
        {locale === "en"
          ? "Orders, partnerships or questions about products - we reply within one working day."
          : "Objednávky, spolupráca alebo otázky k produktom - odpovedáme do jedného pracovného dňa."}
      </p>

      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 sm:gap-12 lg:gap-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 sm:gap-4 lg:gap-8 border-y sm:border-0 border-cream-300 py-6 sm:py-0">
          {COMPANY.addresses.map((a) => (
            <Item
              key={a.oneLine}
              icon={<MapPin size={20} strokeWidth={1.5} />}
              title={locale === "en" ? a.label.en : a.label.sk}
              lines={[COMPANY.legalName, ...a.lines]}
            />
          ))}
          <Item
            icon={<Mail size={20} strokeWidth={1.5} />}
            title="Email"
            lines={[...COMPANY.emails]}
          />
          <Item
            icon={<Phone size={20} strokeWidth={1.5} />}
            title={locale === "en" ? "Phone" : "Telefón"}
            lines={[...COMPANY.phones]}
          />
          <Item
            icon={<FileText size={20} strokeWidth={1.5} />}
            title={locale === "en" ? "Company details" : "Firemné údaje"}
            lines={[
              `IČO: ${COMPANY.ico}`,
              `DIČ: ${COMPANY.dic}`,
              `IČ DPH: ${COMPANY.icDph}`,
              locale === "en"
                ? "Reg. comm.: Trib. di Prešov, sez. Sro, fasc. 10915/P"
                : "Obchodný register OS Prešov, oddiel: Sro, vložka č. 10915/P",
            ]}
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
