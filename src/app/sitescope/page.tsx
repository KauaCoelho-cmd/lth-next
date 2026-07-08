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

function getDeviceId(): string {
  let id = localStorage.getItem("hx_device_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("hx_device_id", id);
  }
  return id;
}

async function checkServerValid(licenseKey: string): Promise<boolean> {
  try {
    const res = await fetch("/api/verify-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: licenseKey }),
    });
    const data = await res.json();
    return data.valid === true;
  } catch {
    // Servidor fora do ar não deve trancar quem tem chave válida
    return true;
  }
}

async function checkDevice(licenseKey: string): Promise<{ ok: boolean; reason?: string }> {
  const deviceId = getDeviceId();
  const res = await fetch("/api/sitescope/device", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ licenseKey, deviceId }),
  });
  return res.json();
}

function timeLeft(expiresAt: string) {
  const diff = new Date(expiresAt).getTime() - new Date().getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, total: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { days, hours, minutes, total: diff };
}

function ManualLogin({ onSuccess }: { onSuccess: (email: string, expiresAt: string) => void }) {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const [payload, serverOk] = await Promise.all([
      verifyLicenseKey(key.trim()),
      checkServerValid(key.trim()),
    ]);
    setLoading(false);
    if (!payload || !serverOk) {
      setError("Chave inválida, expirada ou revogada. Verifique e tente novamente.");
      return;
    }
    const device = await checkDevice(key.trim());
    if (!device.ok) {
      setError(
        device.reason === "device_mismatch"
          ? "Esta chave já está ativa em outro dispositivo. Entre em contato com o suporte para transferir o acesso."
          : "Erro ao validar dispositivo. Tente novamente."
      );
      setLoading(false);
      return;
    }
    localStorage.setItem("hx_license", key.trim());
    onSuccess(payload.email, payload.expiresAt);
  }

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      setKey(text);
    } catch {
      // fallback silencioso
    }
  }

  async function handleCopy() {
    if (!key.trim()) return;
    await navigator.clipboard.writeText(key.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{
      background: "#06090d",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Fundo atmosférico ciano */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse at bottom, rgba(34,211,238,0.18) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse at top left, rgba(34,211,238,0.1) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse at bottom right, rgba(8,145,178,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "linear-gradient(rgba(34,211,238,1) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,1) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
      </div>

      <div style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 1 }}>

        {/* Logo + badge */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img src="/sitescope-logo.png" alt="SiteScope" style={{ width: 64, height: 64, objectFit: "contain", filter: "drop-shadow(0 0 20px rgba(34,211,238,0.7))", marginBottom: 14 }} />
          <h1 style={{ margin: "0 0 6px", fontSize: 32, fontWeight: 900, color: "#fff", letterSpacing: "-1px" }}>SiteScope</h1>
          <p style={{ margin: 0, fontSize: 12, color: "rgba(34,211,238,0.7)", letterSpacing: "0.2em", textTransform: "uppercase" as const, fontWeight: 700 }}>Editor Visual · Hunter X</p>
        </div>

        {/* Card */}
        <div style={{ background: "linear-gradient(160deg,#080e14,#060c12)", border: "1px solid rgba(34,211,238,0.25)", borderRadius: 20, padding: "36px 32px", boxShadow: "0 0 60px rgba(34,211,238,0.08), inset 0 1px 0 rgba(34,211,238,0.1)" }}>

          {/* linha de glow no topo do card */}
          <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.5), transparent)", borderRadius: 1 }} />

          <p style={{ margin: "0 0 24px", fontSize: 13, color: "rgba(34,211,238,0.6)", lineHeight: 1.6, textAlign: "center" }}>
            Cole sua chave de licença para entrar.<br />Você a encontra no email que recebeu ao assinar.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Label + botões */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(34,211,238,0.5)" }}>Chave de licença</label>
              <div style={{ display: "flex", gap: 6 }}>
                <button type="button" onClick={handlePaste}
                  style={{ background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.25)", borderRadius: 6, color: "#22d3ee", fontSize: 11, fontWeight: 700, padding: "4px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  Colar
                </button>
                <button type="button" onClick={handleCopy} disabled={!key.trim()}
                  style={{ background: copied ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${copied ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.08)"}`, borderRadius: 6, color: copied ? "#4ade80" : "#52525b", fontSize: 11, fontWeight: 700, padding: "4px 10px", cursor: key.trim() ? "pointer" : "not-allowed", opacity: key.trim() ? 1 : 0.4 }}>
                  {copied ? "✓ Copiado" : "Copiar"}
                </button>
              </div>
            </div>

            <textarea
              value={key}
              onChange={e => setKey(e.target.value)}
              placeholder="HX-eyJ..."
              rows={3}
              style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(34,211,238,0.25)", borderRadius: 10, color: "#22d3ee", fontFamily: "monospace", fontSize: 12, padding: "12px 14px", resize: "none", outline: "none", boxSizing: "border-box" as const, lineHeight: 1.6 }}
            />

            {error && (
              <div style={{ marginTop: 10, padding: "10px 14px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 8, fontSize: 12, color: "#f87171" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !key.trim()}
              style={{ marginTop: 16, width: "100%", background: "linear-gradient(135deg,#0891b2,#22d3ee)", color: "#06090d", border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 800, cursor: loading || !key.trim() ? "not-allowed" : "pointer", opacity: loading || !key.trim() ? 0.5 : 1, boxShadow: "0 0 30px rgba(34,211,238,0.3)", letterSpacing: "0.02em" }}
            >
              {loading ? "Verificando..." : "Entrar no SiteScope →"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "#27272a" }}>
          Não tem uma licença?{" "}
          <a href="https://hunterx.site" style={{ color: "rgba(34,211,238,0.5)", textDecoration: "none", fontWeight: 700 }}>Assine o Hunter X →</a>
        </p>
      </div>
    </div>
  );
}

export default function SiteScope() {
  const [status, setStatus] = useState<"loading" | "ok" | "denied">("loading");
  const [email, setEmail] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    async function check() {
      const params = new URLSearchParams(window.location.search);
      const k = params.get("k");
      const t = params.get("t");

      // Tenta via token da extensão
      if (k && t) {
        let licenseKey: string;
        try {
          licenseKey = atob(k + "==".slice(0, (4 - (k.length % 4)) % 4));
        } catch { setStatus("denied"); return; }

        const [payload, tokenOk, serverOk] = await Promise.all([
          verifyLicenseKey(licenseKey),
          verifyToken(licenseKey, t),
          checkServerValid(licenseKey),
        ]);

        if (payload && tokenOk && serverOk) {
          const device = await checkDevice(licenseKey);
          if (!device.ok) { setStatus("denied"); return; }
          localStorage.setItem("hx_license", licenseKey);
          setEmail(payload.email);
          setExpiresAt(payload.expiresAt);
          setStatus("ok");
          window.history.replaceState({}, "", "/sitescope");
          return;
        }
      }

      // Tenta via chave salva no localStorage
      const saved = localStorage.getItem("hx_license");
      if (saved) {
        const [payload, device, serverOk] = await Promise.all([
          verifyLicenseKey(saved),
          checkDevice(saved),
          checkServerValid(saved),
        ]);
        if (payload && device.ok && serverOk) {
          setEmail(payload.email);
          setExpiresAt(payload.expiresAt);
          setStatus("ok");
          return;
        }
        localStorage.removeItem("hx_license");
      }

      setStatus("denied");
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
    return <ManualLogin onSuccess={(e, ex) => { setEmail(e); setExpiresAt(ex); setStatus("ok"); }} />;
  }

  const { days, hours, minutes } = timeLeft(expiresAt);
  const daysColor = days <= 5 ? "#f87171" : days <= 15 ? "#fbbf24" : "#4ade80";
  void tick;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#0c0c10" }}>
      {/* Barra topo */}
      <div style={{ height: 40, background: "#13131a", borderBottom: "1px solid #252535", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src="/sitescope-logo.png" alt="SiteScope" style={{ width: 20, height: 20, objectFit: "contain" }} />
          <span style={{ color: "#f0f0f8", fontSize: 13, fontWeight: 700, fontFamily: "sans-serif" }}>Hunter X · SiteScope</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "sans-serif" }}>
          <span style={{ fontSize: 11, color: "#52525b" }}>{email}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${daysColor}18`, border: `1px solid ${daysColor}40`, borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700, color: daysColor }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: daysColor, display: "inline-block", flexShrink: 0 }}></span>
            {days}d {hours}h {minutes}m restantes
          </span>
          <button
            onClick={() => {
              localStorage.removeItem("hx_license");
              window.location.reload();
            }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700,
              color: "#ef4444", cursor: "pointer", fontFamily: "sans-serif",
            }}
            onMouseOver={e => (e.currentTarget.style.background = "rgba(239,68,68,0.18)")}
            onMouseOut={e => (e.currentTarget.style.background = "rgba(239,68,68,0.08)")}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sair
          </button>
        </div>
      </div>

      {/* Editor */}
      <iframe
        src="/sitescope-editor.html"
        style={{ flex: 1, border: "none", display: "block" }}
        title="SiteScope Editor"
      />
    </div>
  );
}
