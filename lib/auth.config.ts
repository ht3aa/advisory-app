import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe base Auth.js config — contains NO database or bcrypt imports.
 *
 * Shared by the full server instance (lib/auth.ts, which adds the Credentials
 * provider) and the proxy/middleware (proxy.ts). Keeping providers out here
 * means the middleware bundle never pulls in Prisma/bcrypt, so it stays
 * lightweight and edge-compatible (and deployable on Netlify's adapter).
 *
 * Reading the JWT session in middleware does not require the provider — only
 * these callbacks — so `req.auth` still resolves identically.
 */
export const authConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  trustHost: true,
  providers: [],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.uid = user.id as string;
        token.roles = user.roles ?? [];
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = (token.uid as string) ?? "";
        session.user.roles = (token.roles as string[]) ?? [];
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;
