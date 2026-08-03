import { NextRequest, NextResponse } from "next/server";

const ALLOWED_TYPES = [
  "text/css",
  "font/",
  "application/font",
  "text/javascript",
  "application/javascript",
  // HTML/XML: usados para carregar a página no editor (?url=),
  // analisar checkout e ler sitemap.
  "text/html",
  "application/xhtml",
  "text/xml",
  "application/xml",
];

const MAX_BYTES = 8 * 1024 * 1024; // 8MB

// Bloqueia alvos internos (localhost, redes privadas, metadata de cloud)
function isPrivateHost(host: string) {
  const h = host.toLowerCase().replace(/^\[|\]$/g, "");
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".internal") || h.endsWith(".local")) return true;
  if (h === "::1" || h.startsWith("fc") || h.startsWith("fd")) return true;
  const m = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!m) return false;
  const [a, b] = [Number(m[1]), Number(m[2])];
  return (
    a === 0 || a === 10 || a === 127 ||
    (a === 169 && b === 254) ||            // link-local / metadata AWS
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168)
  );
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url || !/^https?:\/\//i.test(url)) {
    return new NextResponse("URL inválida", { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(url);
  } catch {
    return new NextResponse("URL inválida", { status: 400 });
  }
  if (isPrivateHost(target.hostname)) {
    return new NextResponse("Destino não permitido", { status: 403 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        // Navegador real: muitas páginas de venda bloqueiam user-agents genéricos
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
        "Referer": target.origin + "/",
      },
      redirect: "follow",
    });

    const ct = res.headers.get("content-type") || "";
    const allowed = ALLOWED_TYPES.some((t) => ct.startsWith(t));
    if (!allowed && !url.match(/\.(css|woff2?|ttf|eot|otf|js|html?|xml)(\?|$)/i)) {
      return new NextResponse("Tipo não permitido", { status: 403 });
    }

    const body = await res.arrayBuffer();
    if (body.byteLength > MAX_BYTES) {
      return new NextResponse("Recurso muito grande", { status: 413 });
    }

    const isDoc = ct.startsWith("text/html") || ct.startsWith("application/xhtml");

    return new NextResponse(body, {
      status: res.status,
      headers: {
        "Content-Type": ct || "text/css",
        "Access-Control-Allow-Origin": "*",
        // A URL final após redirects — o editor usa para corrigir caminhos relativos
        "X-Final-Url": res.url || url,
        "Access-Control-Expose-Headers": "X-Final-Url",
        // Documentos não são cacheados: a página pode mudar entre uma edição e outra
        "Cache-Control": isDoc ? "no-store" : "public, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("Erro ao buscar recurso", { status: 500 });
  }
}
