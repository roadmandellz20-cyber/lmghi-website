import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const url = req.nextUrl;

  // protect admin routes
  if (url.pathname.startsWith("/admin")) {
    const token = url.searchParams.get("token");
    const cookie = req.cookies.get("admin_auth")?.value;
    const expected = process.env.ADMIN_DASH_TOKEN;

    // allow if cookie already set
    if (cookie === expected) {
      return NextResponse.next();
    }

    // allow if token matches → set cookie
    if (token && token === expected) {
      const res = NextResponse.redirect(
        new URL(url.pathname, req.url)
      );

      res.cookies.set("admin_auth", expected!, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });

      return res;
    }

    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
