import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/auth/session";
import { PROTECTED_PATHS, AUTH_COOKIE_NAME, ROLE_REDIRECTS } from "@/lib/auth/types";
import { UserRole } from "@prisma/client";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path requires authentication
  const isProtectedPath = PROTECTED_PATHS.some(
    (path) => pathname.startsWith(path) && path !== "/"
  );

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  // Get session ( cookies work in middleware)
  const sessionToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!sessionToken) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const decoded = Buffer.from(sessionToken, "base64").toString("utf-8");
    const sessionData = JSON.parse(decoded);
    const session = sessionData.user;

    if (!session) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Redirect logged-in users away from auth pages
    if (pathname.startsWith("/auth")) {
      const redirectUrl = ROLE_REDIRECTS[session.role as UserRole] || "/";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // Role-based path protection
    if (pathname.startsWith("/admin") && session.role !== UserRole.SUPER_ADMIN) {
      const redirectUrl = ROLE_REDIRECTS[session.role as UserRole] || "/";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    if (
      (pathname.startsWith("/merchant")) &&
      session.role !== UserRole.MERCHANT_OWNER &&
      session.role !== UserRole.MERCHANT_STAFF
    ) {
      const redirectUrl = ROLE_REDIRECTS[session.role as UserRole] || "/";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    if (pathname.startsWith("/my-points") && session.role !== UserRole.CUSTOMER) {
      const redirectUrl = ROLE_REDIRECTS[session.role as UserRole] || "/";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // Add user info to headers for server components
    const response = NextResponse.next();
    response.headers.set("x-user-id", session.id);
    response.headers.set("x-user-role", session.role);
    if (session.tenantId) {
      response.headers.set("x-tenant-id", session.tenantId);
    }
    return response;
  } catch {
    // Invalid session token
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/merchant/:path*",
    "/my-points/:path*",
    "/auth/:path*",
  ],
};