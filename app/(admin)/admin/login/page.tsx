import { Suspense } from "react";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>;
}) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <Suspense fallback={<LoginSkeleton />}>
        <LoginForm searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

async function LoginForm({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>;
}) {
  const { from, error } = await searchParams;

  async function login(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const callbackUrl = (formData.get("from") as string) || "/admin";
    try {
      await signIn("credentials", { email, password, redirectTo: callbackUrl });
    } catch (e) {
      if (e instanceof AuthError) {
        redirect(`/admin/login?error=invalid${from ? `&from=${encodeURIComponent(from)}` : ""}`);
      }
      throw e;
    }
  }

  return (
    <form
      action={login}
      className="w-full max-w-sm bg-white border border-ink-700/10 rounded-2xl p-10 shadow-sm"
    >
      <h1 className="font-display text-3xl mb-2">Prihlásenie</h1>
      <p className="text-sm text-ink-500 mb-8">Admin panel Italiamo</p>

      {error ? (
        <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          Nesprávny email alebo heslo.
        </p>
      ) : null}

      <label className="block mb-4">
        <span className="label-meta">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full px-3 py-2 border border-ink-700/15 rounded-md focus:outline-none focus:border-terracotta-500"
        />
      </label>
      <label className="block mb-6">
        <span className="label-meta">Heslo</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full px-3 py-2 border border-ink-700/15 rounded-md focus:outline-none focus:border-terracotta-500"
        />
      </label>
      <input type="hidden" name="from" value={from ?? ""} />
      <button type="submit" className="btn btn-block btn-lg">
        Prihlásiť sa
      </button>
    </form>
  );
}

function LoginSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="w-full max-w-sm bg-white border border-ink-700/10 rounded-2xl p-10 shadow-sm"
    >
      <div className="h-7 w-32 bg-cream-200 rounded mb-2 animate-pulse" />
      <div className="h-4 w-44 bg-cream-100 rounded mb-8 animate-pulse" />
      <div className="space-y-4">
        <div className="h-10 bg-cream-100 rounded animate-pulse" />
        <div className="h-10 bg-cream-100 rounded animate-pulse" />
        <div className="h-11 bg-cream-200 rounded animate-pulse" />
      </div>
    </div>
  );
}
