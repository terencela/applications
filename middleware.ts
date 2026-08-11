import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  if (hostname.startsWith("openai.")) {
    if (!url.pathname.startsWith("/openai")) {
      url.pathname = `/openai${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }
  if (hostname.startsWith("anthropic.")) {
    if (!url.pathname.startsWith("/anthropic")) {
      url.pathname = `/anthropic${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }
  if (hostname.startsWith("google.")) {
    if (!url.pathname.startsWith("/google")) {
      url.pathname = `/google${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }
  if (hostname.startsWith("salesforce.")) {
    if (!url.pathname.startsWith("/salesforce")) {
      url.pathname = `/salesforce${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
