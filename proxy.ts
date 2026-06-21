import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import authConfig from "@/lib/auth.config";

/**
 * Optimistic auth gate (Next.js 16 "proxy", formerly middleware).
 * Only reads the JWT cookie — secure permission checks happen in the
 * Data Access Layer (lib/dal.ts) on every server action / page.
 *
 * Uses the edge-safe base config (no Prisma/bcrypt) so the middleware bundle
 * stays edge-compatible and deploys cleanly on the Netlify adapter.
 */
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname === "/login";

  if (isAdminRoute && !isLoggedIn) {
    const url = new URL("/login", req.nextUrl);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (isLoginRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
