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
    <section className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10 pb-16 sm:pb-20">
      <header className="max-w-[60ch]">
        <p className="eyebrow">Blog</p>
        <h1 className="display-md mt-3 max-w-[20ch]">
          {locale === "en" ? "Stories behind the bottles." : "Príbehy za fľašami."}
        </h1>
        <p className="body mt-3 max-w-[58ch]" lang={locale}>
          {locale === "en"
            ? "Notes from the road: producers, regions, recipes, and why some flavours simply smell like home."
            : "Poznámky z cesty: producenti, regióny, recepty a prečo niektoré chute jednoducho voňajú domovom."}
        </p>
      </header>

      {lead && <LeadArticle post={lead} locale={locale} />}

      {rest.length > 0 && (
        <>
          <div className="mt-12 sm:mt-16 mb-6 flex items-baseline gap-4">
            <h2 className="font-display text-lg sm:text-xl text-ink-900">
              {locale === "en" ? "All articles" : "Všetky články"}
            </h2>
            <span className="flex-1 h-px bg-cream-300" />
            <span className="label-meta tabular-nums text-ink-500">
              {String(rest.length).padStart(2, "0")}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
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
    locale === "en" ? "en-US" : "sk-SK",
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
      className="group mt-10 sm:mt-12 grid lg:grid-cols-[1fr_1fr] gap-x-8 xl:gap-x-10 gap-y-6 items-center focus-visible:outline-none"
    >
      <div className="relative aspect-[4/3] bg-cream-200 overflow-hidden rounded-sm">
        <Image
          src={post.cover}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
          priority
        />
      </div>
      <div className="lg:pr-4 xl:pr-6">
        <p className="eyebrow text-terracotta-600">
          {locale === "en" ? "Featured" : "Hlavný článok"}
        </p>
        <p className="label-meta tabular-nums mt-2 text-ink-500">
          {date} · {post.readMinutes} {locale === "en" ? "min" : "min"}
        </p>
        <h2
          className="display-sm sm:text-[clamp(1.4rem,1.4vw+0.8rem,2rem)] mt-3 text-balance group-hover:text-terracotta-700 transition-colors"
          lang={locale}
        >
          {post.title[locale]}
        </h2>
        <p className="body mt-3 max-w-[52ch]" lang={locale}>
          {post.excerpt[locale]}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-ink-900 group-hover:gap-3 transition-[gap]">
          {locale === "en" ? "Read" : "Čítať"}
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
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-3 min-w-0">
        <p className="label-meta tabular-nums text-ink-500 text-[11px]">{date}</p>
        <h3
          className="font-display text-base sm:text-lg leading-snug mt-1.5 text-balance group-hover:text-terracotta-700 transition-colors"
          lang={locale}
        >
          {post.title[locale]}
        </h3>
        <p className="body-sm mt-2 text-ink-700 line-clamp-2" lang={locale}>
          {post.excerpt[locale]}
        </p>
      </div>
    </Link>
  );
}
