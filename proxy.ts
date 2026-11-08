import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/lib/i18n/routing";
import { auth } from "@/lib/auth";
import { LEGACY_PRODUCT_SLUGS } from "@/lib/legacy-slugs";

const intlMiddleware = createMiddleware(routing);

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Admin lives at /admin (no locale prefix). Redirect legacy /sk/admin, /it/admin.
  const localeAdmin = pathname.match(/^\/(?:sk|en)(\/admin(?:\/.*)?)$/);
  if (localeAdmin) {
    const url = req.nextUrl.clone();
    url.pathname = localeAdmin[1];
    return NextResponse.redirect(url);
  }

  // Renamed product slugs -> real 301 (one old slug contains spaces).
  const shop = pathname.match(/^\/(sk|en)\/shop\/([^/]+)$/);
  if (shop) {
    const renamed = LEGACY_PRODUCT_SLUGS[decodeURIComponent(shop[2])];
    if (renamed) {
      const url = req.nextUrl.clone();
      url.pathname = `/${shop[1]}/shop/${renamed}`;
      return NextResponse.redirect(url, 301);
    }
  }

  if (pathname.startsWith("/admin")) {
    const session = await auth();
    const isLogin = pathname === "/admin/login";
    if (!session && !isLogin) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
    if (session && isLogin) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin";
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/", "/(sk|en)/:path*", "/admin/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
