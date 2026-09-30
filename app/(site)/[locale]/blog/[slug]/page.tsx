import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";
import { Link } from "@/lib/i18n/navigation";
import type { Locale } from "@/lib/i18n/routing";
import { posts, getPost } from "@/lib/blog";
import { getProduct } from "@/lib/queries";
import {
  AlcoholAwareCards,
  CardsSkeleton,
} from "@/components/alcohol-aware-cards";
import { RichText, stripLinks } from "@/components/blog-rich-text";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const title = post.title[locale];
  const description = post.description[locale];
  const url = `https://italiamo.eu/${locale}/blog/${post.slug}`;

  return {
    title: `${title} | Italiamo`,
    description,
    keywords: post.keywords,
    alternates: {
      canonical: url,
      languages: {
        sk: `https://italiamo.eu/sk/blog/${post.slug}`,
        en: `https://italiamo.eu/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "Italiamo",
      locale: locale === "en" ? "en_US" : "sk_SK",
      publishedTime: post.date,
      authors: ["Italiamo Distribution"],
      images: [{ url: post.cover, width: 1600, height: 900, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.cover],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(slug);
  if (!post) notFound();

  const featuredProducts = post.productSlugs?.length
    ? (await Promise.all(post.productSlugs.map((s) => getProduct(s)))).filter(
        (p): p is NonNullable<typeof p> => Boolean(p?.name?.[locale]),
      )
    : [];

  const htmlLang = locale === "en" ? "en" : "sk";

  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === "en" ? "en-US" : "sk-SK",
    { day: "numeric", month: "long", year: "numeric" },
  );

  const readLabel =
    locale === "en" ? `${post.readMinutes} min read` : `${post.readMinutes} min čítania`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title[locale],
    description: post.description[locale],
    image: [post.cover],
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale === "en" ? "en-US" : "sk-SK",
    author: { "@type": "Organization", name: "Italiamo Distribution s.r.o." },
    publisher: {
      "@type": "Organization",
      name: "Italiamo",
      logo: {
        "@type": "ImageObject",
        url: "https://italiamo.eu/italiamo-logo-official.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://italiamo.eu/${locale}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
  };

  const allFaqs = post.sections.flatMap((s) => s.faqs ?? []);
  const faqJsonLd = allFaqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: locale === "en" ? "en-US" : "sk-SK",
        mainEntity: allFaqs.map((f) => ({
          "@type": "Question",
          name: f.q[locale],
          acceptedAnswer: {
            "@type": "Answer",
            text: stripLinks(f.a[locale] ?? ""),
          },
        })),
      }
    : null;

  return (
    <article
      lang={htmlLang}
      className="mx-auto px-5 sm:px-8 lg:px-12 pt-10 sm:pt-12 pb-20 sm:pb-24 max-w-[1120px] min-w-0"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Link
        href="/blog"
        className="text-[0.7rem] font-mono uppercase tracking-[0.15em] text-ink-500 hover:text-terracotta-600 focus-visible:outline-none focus-visible:underline"
      >
        ← {locale === "en" ? "All articles" : "Všetky články"}
      </Link>

      <header className="mt-8 max-w-[900px]">
        <p className="eyebrow text-ink-500">
          <span>{formattedDate}</span>
          <span aria-hidden="true" className="opacity-50">·</span>
          <span className="tabular-nums">{readLabel}</span>
        </p>

        <h1 className="font-display text-2xl sm:text-3xl leading-tight mt-3 text-balance">{post.title[locale]}</h1>

        <p className="body mt-4 text-ink-700">{post.excerpt[locale]}</p>
      </header>

      <div className="mt-10 sm:mt-12 w-full space-y-8 sm:space-y-10 text-[15px] leading-[1.65]">
        {post.sections.map((section, i) => (
          <section key={i}>
            {section.heading[locale] && (
              <h2 className="blog-h2">{section.heading[locale]}</h2>
            )}
            <div
              className={`blog-body space-y-5 ${i === 0 ? "blog-body--first" : ""}`}
            >
              {section.image && section.image.side !== "center" && (
                <figure
                  className={`${
                    section.image.side === "right"
                      ? "sm:float-right sm:mb-3 sm:ml-8"
                      : "sm:float-left sm:mb-3 sm:mr-8"
                  } ${
                    section.image.size === "sm"
                      ? "sm:w-[34%]"
                      : section.image.size === "lg"
                        ? "sm:w-[48%]"
                        : "sm:w-[42%]"
                  } ${
                    // Sized images crop to a compact 3:2 thumbnail so tall
                    // portraits sit neatly beside the text instead of towering.
                    section.image.size ? "aspect-[3/2]" : ""
                  } w-full mb-5 overflow-hidden rounded-sm bg-cream-100`}
                >
                  <Image
                    src={section.image.src}
                    alt={section.image.alt[locale] ?? ""}
                    width={800}
                    height={600}
                    sizes="(max-width: 640px) 100vw, 480px"
                    className={
                      section.image.size
                        ? "w-full h-full object-cover object-center"
                        : "w-full h-auto"
                    }
                  />
                </figure>
              )}
              {(section.paragraphs[locale] ?? []).map((para, j) => (
                <p key={j}>
                  <RichText text={para} />
                </p>
              ))}

              {section.lists?.map((list, k) => {
                const items = list.items[locale];
                if (!items?.length) return null;
                const ListTag = list.ordered ? "ol" : "ul";
                return (
                  <ListTag
                    key={`list-${k}`}
                    className={
                      list.ordered
                        ? "list-decimal pl-7 space-y-2.5 marker:text-terracotta-600 marker:font-mono marker:font-medium"
                        : "list-disc pl-6 space-y-2.5 marker:text-terracotta-600"
                    }
                  >
                    {items.map((it, n) => (
                      <li key={n}>
                        <RichText text={it} />
                      </li>
                    ))}
                  </ListTag>
                );
              })}

              {section.faqs && section.faqs.length > 0 && (
                <dl className="mt-8 space-y-6 border-t border-cream-300 pt-8">
                  {section.faqs.map((f, k) => (
                    <div key={`faq-${k}`}>
                      <dt className="font-serif text-lg sm:text-xl text-ink-900">
                        {f.q[locale]}
                      </dt>
                      <dd className="mt-2 text-ink-700">
                        <RichText text={f.a[locale] ?? ""} />
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {section.image && section.image.side === "center" && (
                <figure
                  className={`clear-both mx-auto mt-7 sm:mt-8 w-full overflow-hidden rounded-sm bg-cream-100 ${
                    section.image.size === "sm"
                      ? "sm:max-w-[340px]"
                      : "sm:max-w-[480px]"
                  }`}
                >
                  <Image
                    src={section.image.src}
                    alt={section.image.alt[locale] ?? ""}
                    width={800}
                    height={600}
                    sizes={
                      section.image.size === "sm"
                        ? "(max-width: 640px) 100vw, 340px"
                        : "(max-width: 640px) 100vw, 480px"
                    }
                    className="w-full h-auto"
                  />
                </figure>
              )}
            </div>
          </section>
        ))}
      </div>

      {featuredProducts.length > 0 && (
        <aside className="mt-16 sm:mt-20 border-t border-cream-300 pt-10">
          <h2 className="blog-h2">
            {locale === "en" ? "Products from the article" : "Produkty z článku"}
          </h2>
          <p className="body mt-2 text-ink-700 max-w-[60ch]">
            {locale === "en"
              ? "The products mentioned in the article, available in our catalogue through direct import."
              : "Produkty spomínané v článku, dostupné v našom katalógu z priameho importu."}
          </p>
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <Suspense
              fallback={<CardsSkeleton count={featuredProducts.length} />}
            >
              <AlcoholAwareCards products={featuredProducts} locale={locale} />
            </Suspense>
          </div>
          <div className="mt-8">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.14em] text-terracotta-600 hover:text-terracotta-700 focus-visible:outline-none focus-visible:underline"
            >
              {locale === "en" ? "Tutto il catalogo" : "Zobraziť celý katalóg"} →
            </Link>
          </div>
        </aside>
      )}
    </article>
  );
}
