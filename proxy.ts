import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/lib/i18n/routing";
import { auth } from "@/lib/auth";

const intlMiddleware = createMiddleware(routing);

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
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
  matcher: ["/", "/(sk|it)/:path*", "/admin/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
