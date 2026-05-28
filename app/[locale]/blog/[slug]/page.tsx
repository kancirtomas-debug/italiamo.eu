import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";
import { Link } from "@/lib/i18n/navigation";
import type { Locale } from "@/lib/i18n/routing";
import { posts, getPost } from "@/lib/blog";
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
        it: `https://italiamo.eu/it/blog/${post.slug}`,
      },
    },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "Italiamo",
      locale: locale === "it" ? "it_IT" : "sk_SK",
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

  const htmlLang = locale === "it" ? "it" : "sk";

  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === "it" ? "it-IT" : "sk-SK",
    { day: "numeric", month: "long", year: "numeric" },
  );

  const readLabel =
    locale === "it" ? `${post.readMinutes} min di lettura` : `${post.readMinutes} min čítania`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title[locale],
    description: post.description[locale],
    image: [post.cover],
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale === "it" ? "it-IT" : "sk-SK",
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
        inLanguage: locale === "it" ? "it-IT" : "sk-SK",
        mainEntity: allFaqs.map((f) => ({
          "@type": "Question",
          name: f.q[locale],
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a[locale],
          },
        })),
      }
    : null;

  return (
    <article
      lang={htmlLang}
      className="mx-auto px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16 pb-24 sm:pb-28 max-w-[1120px] min-w-0"
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
        ← {locale === "it" ? "Tutti gli articoli" : "Všetky články"}
      </Link>

      <header className="mt-10 sm:mt-12 max-w-[920px]">
        <p className="eyebrow text-ink-500">
          <span>{formattedDate}</span>
          <span aria-hidden="true" className="opacity-50">·</span>
          <span className="tabular-nums">{readLabel}</span>
        </p>

        <h1 className="blog-h1 mt-4">{post.title[locale]}</h1>

        <p className="blog-lead mt-6">{post.excerpt[locale]}</p>
      </header>

      <figure className="mt-12 sm:mt-14 relative aspect-[16/9] overflow-hidden bg-cream-100 rounded-sm">
        <Image
          src={post.cover}
          alt={post.title[locale]}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1120px) 90vw, 1024px"
          className="object-cover"
          priority
        />
      </figure>

      <div className="mt-14 sm:mt-16 w-full space-y-12 sm:space-y-14">
        {post.sections.map((section, i) => (
          <section key={i}>
            {section.heading[locale] && (
              <h2 className="blog-h2">{section.heading[locale]}</h2>
            )}
            <div
              className={`blog-body space-y-5 ${i === 0 ? "blog-body--first" : ""}`}
            >
              {section.paragraphs[locale].map((para, j) => (
                <p key={j}>{para}</p>
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
                        ? "list-decimal pl-6 space-y-2 marker:text-terracotta-600 marker:font-mono"
                        : "list-disc pl-6 space-y-2 marker:text-terracotta-600"
                    }
                  >
                    {items.map((it, n) => (
                      <li key={n}>{it}</li>
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
                      <dd className="mt-2 text-ink-700">{f.a[locale]}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </section>
        ))}
      </div>

      <hr className="mt-20 border-cream-300 w-full" />

      <aside
        aria-label={locale === "it" ? "Note di redazione" : "Poznámka pre redakciu"}
        className="mt-6 w-full text-[12px] font-mono text-ink-500 leading-relaxed"
      >
        <p className="uppercase tracking-[0.12em] text-ink-400 mb-1">
          {locale === "it" ? "Note di redazione" : "Poznámka pre redakciu"}
        </p>
        <p className="break-words">
          {locale === "it" ? "File: " : "Súbor: "}
          <code className="bg-cream-100 px-1.5 py-0.5 rounded">lib/blog.ts</code>
          {" · slug: "}
          <code className="bg-cream-100 px-1.5 py-0.5 rounded break-all">{post.slug}</code>
        </p>
        <p className="mt-1">
          {locale === "it"
            ? "Per modificare il testo apri questo file, trova l'oggetto con questo slug e cambia i campi title/excerpt/description/sections."
            : "Na úpravu textu otvor tento súbor, nájdi objekt s týmto slugom a uprav polia title/excerpt/description/sections."}
        </p>
      </aside>
    </article>
  );
}
