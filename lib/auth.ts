import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(creds) {
        const email = (creds?.email as string)?.trim().toLowerCase();
        const password = creds?.password as string;
        const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
        const hash = process.env.ADMIN_PASSWORD_HASH;
        if (!email || !password || !adminEmail || !hash) return null;
        if (email !== adminEmail) return null;
        const ok = await bcrypt.compare(password, hash);
        if (!ok) return null;
        return { id: "owner", email: adminEmail, name: "Owner" };
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      const isAdmin = request.nextUrl.pathname.startsWith("/admin");
      const isLogin = request.nextUrl.pathname === "/admin/login";
      if (isAdmin && !isLogin) return !!auth?.user;
      return true;
    },
  },
});
