// Shown during navigation to /shop while the server renders the catalog.
// Mirrors the real shop layout so the page frame appears to assemble first.
export default function ShopLoading() {
  return (
    <section className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-12">
      <header className="grid lg:grid-cols-[1fr_auto] gap-x-12 gap-y-4 items-end mb-10">
        <div className="max-w-[60ch] w-full">
          <div className="skeleton h-3 w-24" />
          <div className="skeleton h-11 w-2/3 mt-5" />
        </div>
        <div className="skeleton h-[42px] w-[220px] justify-self-start lg:justify-self-end" />
      </header>

      <div className="grid lg:grid-cols-[260px_1fr] gap-6 lg:gap-10 border-t border-cream-300 pt-8 lg:pt-10">
        <aside className="space-y-1.5" aria-hidden>
          <div className="skeleton h-3 w-20 mb-3" />
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="skeleton h-12" />
          ))}
        </aside>

        <div
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 items-start gap-3 sm:gap-4"
          aria-hidden
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="border border-cream-300 rounded-lg overflow-hidden"
            >
              <div className="skeleton aspect-square !rounded-none" />
              <div className="px-4 pt-3 pb-4 border-t border-cream-300">
                <div className="skeleton h-2.5 w-16" />
                <div className="skeleton h-4 w-full mt-2.5" />
                <div className="skeleton h-4 w-2/3 mt-1.5" />
                <div className="mt-4 pt-3 flex items-center justify-between border-t border-cream-300">
                  <div className="skeleton h-4 w-14" />
                  <div className="skeleton h-9 w-9 !rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">Načítavam…</span>
    </section>
  );
}
