import { NextResponse, type NextRequest } from "next/server";
import map from "@/content/redirects.json";

// Old WordPress URLs (plan Phase 3). Built from extraction/url-map.csv by tools/build_redirects.py — do not edit by hand.
// 301 = old slug / old site → new page · 410 = hacker spam, tells Google the page is gone for good.
const redirects = map.redirects as Record<string, string>;
const pRedirects = map.pRedirects as Record<string, string>;
const gone = new Set(map.gone);
const pGone = new Set(map.pGone);

const goneHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Page removed | Bright Way Dental Clinic</title></head>
<body style="font-family:system-ui,sans-serif;background:#fffcf6;color:#3e2d0e;display:grid;place-items:center;min-height:100vh;margin:0;text-align:center">
<div><h1>This page no longer exists</h1><p><a href="/" style="color:#7d6120;font-weight:700">Go to Bright Way Dental Clinic</a></p></div></body></html>`;

function normalize(pathname: string) {
  let p = pathname;
  try {
    p = decodeURIComponent(pathname);
  } catch {}
  return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
}

function moved(req: NextRequest, to: string) {
  const url = req.nextUrl.clone();
  const [pathname, hash = ""] = to.split("#");
  url.pathname = pathname;
  url.search = "";
  url.hash = hash;
  return NextResponse.redirect(url, 301);
}

function removed() {
  return new NextResponse(goneHtml, { status: 410, headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex" } });
}

export function middleware(req: NextRequest) {
  const path = normalize(req.nextUrl.pathname);

  if (path === "/") {
    const id = req.nextUrl.searchParams.get("p");
    if (id && pRedirects[id]) return moved(req, pRedirects[id]);
    if (id && pGone.has(id)) return removed();
    return NextResponse.next();
  }
  if (redirects[path]) return moved(req, redirects[path]);
  if (gone.has(path)) return removed();
  for (const [prefix, to] of map.prefixes) if (path.startsWith(prefix)) return moved(req, to);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico).*)"],
};
