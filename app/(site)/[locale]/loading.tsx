// Generic "backbone" shown while any site page (that has no closer loading.tsx)
// renders on the server. Nav + footer live in the layout and stay put.
export default function SiteLoading() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
      <div className="skeleton h-3 w-28" aria-hidden />
      <div className="skeleton h-12 w-3/4 max-w-2xl mt-6" aria-hidden />
      <div className="skeleton h-12 w-2/3 max-w-xl mt-3" aria-hidden />

      <div className="mt-8 space-y-3 max-w-2xl" aria-hidden>
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-11/12" />
        <div className="skeleton h-4 w-4/5" />
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4" aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton aspect-[4/3]" />
        ))}
      </div>

      <span className="sr-only">Načítavam…</span>
    </div>
  );
}
