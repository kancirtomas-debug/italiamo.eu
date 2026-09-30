import { Link } from "@/lib/i18n/navigation";

/**
 * Inline markup for blog copy: `[anchor text](/shop/product-slug)`.
 * Only internal paths are accepted - anything else renders as plain text.
 */
const LINK_RE = /\[([^\]]+)\]\((\/[^)\s]+)\)/g;

/** Strips inline link markup, for JSON-LD and metadata where raw text is needed. */
export function stripLinks(text: string): string {
  return text.replace(LINK_RE, "$1");
}

export function RichText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(LINK_RE.source, "g");

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    nodes.push(
      <Link key={match.index} href={match[2]} className="blog-link">
        {match[1]}
      </Link>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));

  return <>{nodes}</>;
}
