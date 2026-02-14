import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const tokenFromQuery = searchParams.get("token");
  const tokenFromCookie = req.cookies.get("admin_token")?.value;
  const expected = process.env.ADMIN_DASH_TOKEN;

  // If no token configured, block (don’t run admin open by accident)
  if (!expected) {
    return new NextResponse("ADMIN_DASH_TOKEN not set", { status: 500 });
  }

  // If token passed in URL and correct, set cookie and redirect (clean URL)
  if (tokenFromQuery && tokenFromQuery === expected) {
    const url = req.nextUrl.clone();
    url.searchParams.delete("token");

    const res = NextResponse.redirect(url);
    res.cookies.set("admin_token", expected, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 6, // 6 hours
    });
    return res;
  }

  // If cookie valid, allow
  if (tokenFromCookie === expected) {
    return NextResponse.next();
  }

  // Otherwise block
  return new NextResponse("Forbidden (admin)", { status: 403 });
}

export const config = {
  matcher: ["/admin/:path*"],
};
