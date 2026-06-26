"use client";

import { useEffect, useState } from "react";

const HX_SECRET = process.env.NEXT_PUBLIC_HX_SECRET!;

function decodeB64url(b64url: string) {
  const padded = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (padded.length % 4)) % 4);
  return atob(padded + padding);
}

async function verifyLicenseKey(keyStr: string) {
  if (!keyStr || !keyStr.startsWith("HX-")) return null;
  const inner = keyStr.trim().slice(3);
  const dot = inner.lastIndexOf(".");
  if (dot === -1) return null;
  const payloadB64 = inner.slice(0, dot);
  const sigHex = inner.slice(dot + 1);
  try {
    const enc = new TextEncoder();
    const cryptoKey = await crypto.subtle.importKey(
      "raw", enc.encode(HX_SECRET),
      { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
    );
    const sigBuf = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(payloadB64));
    const fullHex = Array.from(new Uint8Array(sigBuf))
      .map((b) => b.toString(16).padStart(2, "0")).join("");
    if (fullHex.slice(0, 24) !== sigHex) return null;
    const payload = JSON.parse(decodeB64url(payloadB64));
    if (!payload.ex || new Date(payload.ex) < new Date()) return null;
    return { email: payload.e as string, expiresAt: payload.ex as string };
  } catch {
    return null;
  }
}

async function verifyToken(licenseKey: string, token: string) {
  try {
    const decoded = atob(token + "==".slice(0, (4 - (token.length % 4)) % 4));
    const [tsStr, sig] = decoded.split(":");
    const ts = parseInt(tsStr);
    if (isNaN(ts)) return false;
    // Token válido por 10 minutos
    if (Date.now() / 1000 - ts > 600) return false;
    const msg = `${licenseKey}:${ts}`;
    const enc = new TextEncoder();
    const cryptoKey = await crypto.subtle.importKey(
      "raw", enc.encode(HX_SECRET),
      { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
    );
    const sigBuf = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(msg));
    const expectedSig = Array.from(new Uint8Array(sigBuf))
      .map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
    return expectedSig === sig;
  } catch {
    return false;
  }
}

export default function SiteScope() {
  const [status, setStatus] = useState<"loading" | "ok" | "denied">("loading");
  const [email, setEmail] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  useEffect(() => {
    async function check() {
      const params = new URLSearchParams(window.location.search);
      const k = params.get("k");
      const t = params.get("t");
      if (!k || !t) { setStatus("denied"); return; }

      let licenseKey: string;
      try {
        licenseKey = atob(k + "==".slice(0, (4 - (k.length % 4)) % 4));
      } catch { setStatus("denied"); return; }

      const [payload, tokenOk] = await Promise.all([
        verifyLicenseKey(licenseKey),
        verifyToken(licenseKey, t),
      ]);

      if (!payload || !tokenOk) { setStatus("denied"); return; }

      setEmail(payload.email);
      setExpiresAt(new Date(payload.expiresAt).toLocaleDateString("pt-BR"));
      setStatus("ok");

      // Limpa a URL para não expor o token
      window.history.replaceState({}, "", "/sitescope");
    }
    check();
  }, []);

  if (status === "loading") {
    return (
      <div style={{ background: "#0a0a14", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#a78bfa", fontFamily: "sans-serif", fontSize: 16 }}>
        Verificando licença...
      </div>
    );
  }

  if (status === "denied") {
    return (
      <div style={{ background: "#0a0a14", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, fontFamily: "sans-serif" }}>
        <div style={{ fontSize: 40 }}>🔒</div>
        <h2 style={{ color: "#f0f0f8", margin: 0 }}>Acesso negado</h2>
        <p style={{ color: "#7878a0", textAlign: "center", maxWidth: 320, margin: 0 }}>
          Abra o SiteScope pelo popup da extensão Hunter X com uma licença válida.
        </p>
        <a href="https://hunterx.site" style={{ marginTop: 8, color: "#8b5cf6", fontSize: 14 }}>
          Não tem o Hunter X? Assine aqui →
        </a>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#0c0c10" }}>
      {/* Barra topo Hunter X */}
      <div style={{ height: 36, background: "#13131a", borderBottom: "1px solid #252535", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ background: "linear-gradient(135deg,#7c3aed,#a78bfa)", borderRadius: 6, width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>🎯</span>
          <span style={{ color: "#f0f0f8", fontSize: 13, fontWeight: 700, fontFamily: "sans-serif" }}>Hunter X · SiteScope</span>
        </div>
        <span style={{ color: "#7878a0", fontSize: 11, fontFamily: "sans-serif" }}>
          {email} · válido até {expiresAt}
        </span>
      </div>

      {/* Editor embutido via iframe */}
      <iframe
        src="/sitescope/editor"
        style={{ flex: 1, border: "none", display: "block" }}
        title="SiteScope Editor"
      />
    </div>
  );
}
