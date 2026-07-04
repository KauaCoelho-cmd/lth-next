import { NextRequest, NextResponse } from "next/server";

const ALLOWED_TYPES = ["text/css", "font/", "application/font", "text/javascript", "application/javascript"];

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url || !/^https?:\/\//i.test(url)) {
    return new NextResponse("URL inválida", { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SiteScope/1.0)",
        "Referer": new URL(url).origin + "/",
      },
      redirect: "follow",
    });

    const ct = res.headers.get("content-type") || "";
    const allowed = ALLOWED_TYPES.some((t) => ct.startsWith(t));
    if (!allowed && !url.match(/\.(css|woff2?|ttf|eot|otf|js)(\?|$)/i)) {
      return new NextResponse("Tipo não permitido", { status: 403 });
    }

    const body = await res.arrayBuffer();
    return new NextResponse(body, {
      status: res.status,
      headers: {
        "Content-Type": ct || "text/css",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (e) {
    return new NextResponse("Erro ao buscar recurso", { status: 500 });
  }
}
