import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // Check if accessing via dash.* subdomain (e.g. dash.vunk.my.id)
  const isDashSubdomain = host.startsWith("dash.");

  if (isDashSubdomain) {
    // On dash.*:
    // Root "/" goes directly to "/admin"
    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/admin", request.url));
    }
    // "/login" goes directly to "/admin/login"
    if (pathname === "/login") {
      return NextResponse.rewrite(new URL("/admin/login", request.url));
    }
    // Any other path passes through
    return NextResponse.next();
  }

  // On public storefront (e.g. saas.vunk.my.id):
  // Do not expose admin routes if hostname is specifically saas.vunk.my.id
  if (host.startsWith("saas.vunk.my.id") && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, assets, svg, jpg
     */
    "/((?!_next/static|_next/image|favicon.ico|assets/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
