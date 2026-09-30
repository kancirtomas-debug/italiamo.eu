import "../../globals.css";
import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import { fontSans, fontDisplay } from "../../fonts";
import { auth, signOut } from "@/lib/auth";

export const metadata = { title: "Italiamo - Admin", robots: { index: false } };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="sk"
      className={`${fontSans.variable} ${fontDisplay.variable}`}
    >
      <body className="bg-cream-50 text-ink-900 min-h-screen flex flex-col">
        <Suspense fallback={null}>
          <AdminHeader />
        </Suspense>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

async function AdminHeader() {
  const session = await auth();
  if (!session) return null;
  return (
    <header className="border-b border-ink-700/10 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/admin" className="font-display text-xl">
          Italiamo · Admin
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/admin/products" className="hover:text-terracotta-600">
            Produkty
          </Link>
          <Link href="/admin/products/new" className="hover:text-terracotta-600">
            + Nový produkt
          </Link>
          <Link href="/admin/objednavky" className="hover:text-terracotta-600">
            Objednávky
          </Link>
          <Link href="/admin/b2b" className="hover:text-terracotta-600">
            Overené Firmy
          </Link>
          <span className="text-ink-300">{session.user?.email}</span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button className="text-ink-500 hover:text-terracotta-600">
              Odhlásiť
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
