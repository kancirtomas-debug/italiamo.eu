import { writeFileSync } from "node:fs";
import { posts } from "../lib/blog.ts";

const SLUG = process.argv[2] || "pesto-genovese-cestoviny-recept";
const LOCALE = "sk";
const BASE = "https://italiamo.eu";

const post = posts.find((p) => p.slug === SLUG);
if (!post) {
  console.error("Post not found:", SLUG);
  process.exit(1);
}

const esc = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// [anchor](/shop/slug) or full URL -> absolute <a>. Keep bold **x** -> <strong>.
function inline(text) {
  let t = esc(text);
  t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)/g, (_, label, href) => {
    let url = href;
    if (url.startsWith("/")) url = `${BASE}/${LOCALE}${url}`;
    // normalise any localhost that slipped in
    url = url.replace(/https?:\/\/localhost:\d+/, BASE);
    if (/^https?:\/\/[^/]+\/(shop|blog)/.test(url) && !/\/(sk|en)\//.test(url)) {
      url = url.replace(/(\/(shop|blog))/, `/${LOCALE}$1`);
    }
    return `<a href="${url}">${label}</a>`;
  });
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  return t;
}

const out = [];
const title = post.title[LOCALE];
out.push(`<h1>${esc(title)}</h1>`);
if (post.excerpt?.[LOCALE]) out.push(`<p><em>${inline(post.excerpt[LOCALE])}</em></p>`);

for (const s of post.sections) {
  const h = s.heading?.[LOCALE];
  if (h) out.push(`<h2>${esc(h)}</h2>`);
  for (const p of s.paragraphs?.[LOCALE] ?? []) out.push(`<p>${inline(p)}</p>`);
  for (const list of s.lists ?? []) {
    const items = list.items?.[LOCALE];
    if (!items?.length) continue;
    const tag = list.ordered ? "ol" : "ul";
    out.push(`<${tag}>`);
    for (const it of items) out.push(`  <li>${inline(it)}</li>`);
    out.push(`</${tag}>`);
  }
  if (s.faqs?.length) {
    for (const f of s.faqs) {
      if (f.q?.[LOCALE]) out.push(`<h3>${esc(f.q[LOCALE])}</h3>`);
      if (f.a?.[LOCALE]) out.push(`<p>${inline(f.a[LOCALE])}</p>`);
    }
  }
}

const html = out.join("\n");
const outPath = `scripts/whitepress-${SLUG}.html`;
writeFileSync(outPath, html + "\n", "utf8");
console.log("Wrote", outPath, `(${html.length} chars)`);
console.log("Links:", (html.match(/href=/g) || []).length);
