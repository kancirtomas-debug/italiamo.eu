import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import type { Locale } from "@/lib/i18n/routing";
import { posts } from "@/lib/blog";

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [lead, ...rest] = posts;

  return (
    <section className="max-w-[1300px] mx-auto px-6 lg:px-10 pt-14 pb-28">
      <header className="max-w-[60ch]">
        <p className="eyebrow">Blog</p>
        <h1 className="display-lg mt-4 max-w-[20ch]">
          {locale === "it" ? "Storie dietro le bottiglie." : "Príbehy za fľašami."}
        </h1>
        <p className="body-lg mt-4 max-w-[58ch]" lang={locale}>
          {locale === "it"
            ? "Note dal viaggio: produttori, regioni, ricette, e perché certi prodotti sanno di casa."
            : "Poznámky z cesty: producenti, regióny, recepty a prečo niektoré chute jednoducho voňajú domovom."}
        </p>
      </header>

      {lead && <LeadArticle post={lead} locale={locale} />}

      {rest.length > 0 && (
        <>
          <div className="mt-20 sm:mt-24 mb-10 flex items-baseline gap-4">
            <h2 className="font-display text-xl sm:text-2xl text-ink-900">
              {locale === "it" ? "Tutti gli articoli" : "Všetky články"}
            </h2>
            <span className="flex-1 h-px bg-cream-300" />
            <span className="label-meta tabular-nums text-ink-500">
              {String(rest.length).padStart(2, "0")}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-14 sm:gap-y-16">
            {rest.map((p) => (
              <ArticleCard key={p.slug} post={p} locale={locale} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function formatDate(date: string, locale: Locale) {
  return new Date(date).toLocaleDateString(
    locale === "it" ? "it-IT" : "sk-SK",
    { day: "numeric", month: "long", year: "numeric" },
  );
}

function LeadArticle({
  post,
  locale,
}: {
  post: (typeof posts)[number];
  locale: Locale;
}) {
  const date = formatDate(post.date, locale);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group mt-14 sm:mt-16 grid lg:grid-cols-[1.25fr_1fr] gap-x-10 xl:gap-x-14 gap-y-8 items-center focus-visible:outline-none"
    >
      <div className="relative aspect-[4/3] lg:aspect-[5/4] bg-cream-200 overflow-hidden rounded-sm">
        <Image
          src={post.cover}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
          priority
        />
      </div>
      <div className="lg:pr-4 xl:pr-8">
        <p className="eyebrow text-terracotta-600">
          {locale === "it" ? "In primo piano" : "Hlavný článok"}
        </p>
        <p className="label-meta tabular-nums mt-3 text-ink-500">
          {date} · {post.readMinutes} {locale === "it" ? "min" : "min"}
        </p>
        <h2
          className="display-md sm:text-[clamp(2rem,2.4vw+1rem,3.25rem)] mt-4 text-balance group-hover:text-terracotta-700 transition-colors"
          lang={locale}
        >
          {post.title[locale]}
        </h2>
        <p className="body-lg mt-5 max-w-[52ch]" lang={locale}>
          {post.excerpt[locale]}
        </p>
        <span className="mt-7 inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.16em] text-ink-900 group-hover:gap-3 transition-[gap]">
          {locale === "it" ? "Leggi" : "Čítať"}
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

function ArticleCard({
  post,
  locale,
}: {
  post: (typeof posts)[number];
  locale: Locale;
}) {
  const date = formatDate(post.date, locale);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-4 focus-visible:ring-offset-cream-50 rounded-sm"
    >
      <div className="relative aspect-[4/3] bg-cream-200 overflow-hidden rounded-sm">
        <Image
          src={post.cover}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5 min-w-0">
        <p className="label-meta tabular-nums text-ink-500">{date}</p>
        <h3
          className="display-sm mt-2 text-balance group-hover:text-terracotta-700 transition-colors"
          lang={locale}
        >
          {post.title[locale]}
        </h3>
        <p className="body mt-3 text-ink-700 line-clamp-3" lang={locale}>
          {post.excerpt[locale]}
        </p>
      </div>
    </Link>
  );
}
