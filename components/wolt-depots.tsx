import { WOLT_DEPOTS } from "@/lib/wolt-depots";
import type { Locale } from "@/lib/i18n/routing";

export function WoltDepots({ locale }: { locale: Locale }) {
  const heading =
    locale === "en"
      ? "Order our food through Wolt as well"
      : "Objednajte si naše potraviny aj cez Wolt";
  const subtitle =
    locale === "en"
      ? "You can order selected Italian food from us straight through the Wolt delivery service. We have four pickup points, one in Košice and three in Bratislava. Quickly, right to your door."
      : "Vybrané talianske potraviny od nás si môžete objednať priamo cez donáškovú službu Wolt - máme štyri odberné miesta, jedno v Košiciach a tri v Bratislave. Rýchlo až k vám domov.";
  const cta = locale === "en" ? "Open on Wolt" : "Otvoriť na Wolt";

  return (
    <section
      aria-labelledby="wolt-heading"
      className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24 border-t border-cream-300"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <p className="eyebrow">Wolt</p>
          <h2 id="wolt-heading" className="display-lg mt-4 max-w-[24ch]">
            {heading}
          </h2>
          <p className="body-lg mt-4 max-w-[60ch]" lang={locale}>
            {subtitle}
          </p>
        </div>
      </div>

      <ul role="list" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {WOLT_DEPOTS.map((d) => (
          <li
            key={d.id}
            className="bg-white border border-cream-300 rounded-2xl p-6 flex flex-col gap-3"
          >
            <p className="label-meta">{d.city}</p>
            <p className="font-display text-[22px] leading-tight text-ink-900">
              {d.district}
            </p>
            <p className="text-[14px] text-ink-700">{d.address}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex justify-center">
        <a
          href="https://wolt.com/sk/discovery/search?q=italiamo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-ink-900 text-cream-50 text-[14px] font-mono uppercase tracking-[0.14em] hover:bg-terracotta-700 transition-colors"
        >
          {cta} →
        </a>
      </div>
    </section>
  );
}
