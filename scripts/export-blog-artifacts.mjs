import { posts } from "../lib/blog.ts";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_ROOT = "C:/Users/kanci/Italiamo-SEO/blog-posts";
const SITE = "https://italiamo.eu";

function pad(n) {
  return String(n).padStart(2, "0");
}

function renderMarkdown(post, locale) {
  const lang = locale === "it" ? "it" : "sk";
  const lines = [];
  lines.push("---");
  lines.push(`title: "${post.title[locale].replace(/"/g, '\\"')}"`);
  lines.push(`slug: ${post.slug}`);
  lines.push(`locale: ${locale}`);
  lines.push(`date: ${post.date}`);
  lines.push(`read_minutes: ${post.readMinutes}`);
  lines.push(`excerpt: "${post.excerpt[locale].replace(/"/g, '\\"')}"`);
  lines.push(`description: "${post.description[locale].replace(/"/g, '\\"')}"`);
  lines.push(`keywords: [${post.keywords.map((k) => `"${k}"`).join(", ")}]`);
  lines.push(`cover: ${post.cover}`);
  lines.push(`canonical: ${SITE}/${locale}/blog/${post.slug}`);
  lines.push("---");
  lines.push("");
  lines.push(`# ${post.title[locale]}`);
  lines.push("");
  lines.push(`> ${post.excerpt[locale]}`);
  lines.push("");
  for (const section of post.sections) {
    if (section.heading[locale]) {
      lines.push(`## ${section.heading[locale]}`);
      lines.push("");
    }
    for (const para of section.paragraphs[locale]) {
      lines.push(para);
      lines.push("");
    }
    if (section.lists) {
      for (const list of section.lists) {
        const items = list.items[locale] ?? [];
        items.forEach((it, i) => {
          lines.push(list.ordered ? `${i + 1}. ${it}` : `- ${it}`);
        });
        lines.push("");
      }
    }
    if (section.faqs) {
      for (const f of section.faqs) {
        lines.push(`### ${f.q[locale]}`);
        lines.push("");
        lines.push(f.a[locale]);
        lines.push("");
      }
    }
  }
  return lines.join("\n");
}

function renderHTML(post, locale) {
  const blocks = [];
  blocks.push(`<!-- wp:paragraph --><p><em>${escape(post.excerpt[locale])}</em></p><!-- /wp:paragraph -->`);
  for (const section of post.sections) {
    if (section.heading[locale]) {
      blocks.push(`<!-- wp:heading {"level":2} --><h2>${escape(section.heading[locale])}</h2><!-- /wp:heading -->`);
    }
    for (const para of section.paragraphs[locale]) {
      blocks.push(`<!-- wp:paragraph --><p>${escape(para)}</p><!-- /wp:paragraph -->`);
    }
    if (section.lists) {
      for (const list of section.lists) {
        const items = list.items[locale] ?? [];
        const tag = list.ordered ? "ol" : "ul";
        const inner = items.map((it) => `<li>${escape(it)}</li>`).join("");
        blocks.push(`<!-- wp:list${list.ordered ? ' {"ordered":true}' : ""} --><${tag}>${inner}</${tag}><!-- /wp:list -->`);
      }
    }
    if (section.faqs) {
      for (const f of section.faqs) {
        blocks.push(`<!-- wp:heading {"level":3} --><h3>${escape(f.q[locale])}</h3><!-- /wp:heading -->`);
        blocks.push(`<!-- wp:paragraph --><p>${escape(f.a[locale])}</p><!-- /wp:paragraph -->`);
      }
    }
  }
  return blocks.join("\n");
}

function escape(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderSchema(post) {
  const faqs = post.sections.flatMap((s) => s.faqs ?? []);
  const out = {
    article: {
      sk: buildArticleSchema(post, "sk"),
      it: buildArticleSchema(post, "it"),
    },
  };
  if (faqs.length) {
    out.faqPage = {
      sk: buildFaqSchema(faqs, "sk"),
      it: buildFaqSchema(faqs, "it"),
    };
  }
  out.breadcrumb = {
    sk: buildBreadcrumb(post, "sk"),
    it: buildBreadcrumb(post, "it"),
  };
  return JSON.stringify(out, null, 2);
}

function buildArticleSchema(post, locale) {
  return {
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
      logo: { "@type": "ImageObject", url: `${SITE}/italiamo-logo-official.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE}/${locale}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
  };
}

function buildFaqSchema(faqs, locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "it" ? "it-IT" : "sk-SK",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q[locale],
      acceptedAnswer: { "@type": "Answer", text: f.a[locale] },
    })),
  };
}

function buildBreadcrumb(post, locale) {
  const blogLabel = locale === "it" ? "Blog" : "Blog";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Italiamo", item: `${SITE}/${locale}` },
      { "@type": "ListItem", position: 2, name: blogLabel, item: `${SITE}/${locale}/blog` },
      { "@type": "ListItem", position: 3, name: post.title[locale], item: `${SITE}/${locale}/blog/${post.slug}` },
    ],
  };
}

async function main() {
  // Skip first post (already has artifacts) — but allow override via --all
  const all = process.argv.includes("--all");
  const targets = all ? posts : posts.slice(1);

  for (let i = 0; i < targets.length; i++) {
    const post = targets[i];
    const idx = posts.indexOf(post) + 1;
    const dirName = `${pad(idx)}-${post.slug}`;
    const dir = path.join(OUT_ROOT, dirName);
    await mkdir(dir, { recursive: true });

    await writeFile(path.join(dir, "article.sk.md"), renderMarkdown(post, "sk"), "utf8");
    await writeFile(path.join(dir, "article.it.md"), renderMarkdown(post, "it"), "utf8");
    await writeFile(path.join(dir, "article.sk.html"), renderHTML(post, "sk"), "utf8");
    await writeFile(path.join(dir, "article.it.html"), renderHTML(post, "it"), "utf8");
    await writeFile(path.join(dir, "schema.json"), renderSchema(post), "utf8");
    console.log(`✓ ${dirName}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
