"use client";

import { brands } from "@/lib/brands";

export function BrandMarquee({ eyebrow }: { eyebrow: string }) {
  const row = [...brands, ...brands];

  return (
    <div className="w-full">
      <div
        aria-label={`${eyebrow} — ${brands.map((b) => b.name).join(", ")}`}
        className="relative h-[85px] sm:h-[122px] flex items-center overflow-hidden"
      >
        <div
          className="marquee-track flex items-center gap-5 sm:gap-8 pr-5 sm:pr-8 will-change-transform"
          style={{ width: "max-content" }}
        >
          {row.map((b, i) => (
            <div
              key={`${b.name}-${i}`}
              className="shrink-0 flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 overflow-hidden w-[126px] h-[77px] sm:w-[180px] sm:h-[109px]"
              title={b.name}
            >
              <img
                src={b.logo}
                alt={b.name}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  opacity: 1,
                  mixBlendMode: b.invert ? "normal" : "multiply",
                  filter: b.invert
                    ? "invert(1) brightness(0.55) contrast(1.3)"
                    : b.boost
                    ? "contrast(2.4) brightness(0.45) saturate(0)"
                    : undefined,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
