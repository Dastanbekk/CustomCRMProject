import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt");
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/dashboard")) {
    // dashboardga faqat token bo‘lsa kiritamiz
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname === "/" && token) {
    // login sahifasiga token bo‘lsa, dashboardga yuboramiz
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/"], // ham dashboard, ham root login sahifasini tekshiradi
};
