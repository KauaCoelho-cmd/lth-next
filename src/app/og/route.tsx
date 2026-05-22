import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0a0a14 0%, #0f0f1e 50%, #0a0a14 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow background */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
          }}
        />

        {/* Grid dots */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.15) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(124,58,237,0.15)",
            border: "1px solid rgba(139,92,246,0.4)",
            borderRadius: "100px",
            padding: "8px 20px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#a78bfa",
            }}
          />
          <span style={{ color: "#a78bfa", fontSize: "16px", fontWeight: 700, letterSpacing: "0.15em" }}>
            EXTENSÃO CHROME · v1.3.0
          </span>
        </div>

        {/* Title */}
        <div style={{ fontSize: "80px", fontWeight: 900, lineHeight: 0.9, marginBottom: "24px", letterSpacing: "-2px" }}>
          <span style={{ color: "#ffffff" }}>VEJA.</span>
          <br />
          <span style={{ background: "linear-gradient(135deg, #a78bfa, #38bdf8)", backgroundClip: "text", color: "transparent" }}>
            ANALISE.
          </span>
          <br />
          <span style={{ color: "#ffffff" }}>LUCRE.</span>
        </div>

        {/* Subtitle */}
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "22px", maxWidth: "640px", lineHeight: 1.5, margin: "0 0 48px 0" }}>
          Extensão Chrome que revela produtos low ticket escalando na Biblioteca do Meta em tempo real.
        </p>

        {/* Bottom row */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <div style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)", borderRadius: "12px", padding: "16px 36px", display: "flex" }}>
            <span style={{ color: "#ffffff", fontSize: "20px", fontWeight: 800 }}>
              A partir de R$29,90/mês
            </span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "18px" }}>hunterx.site</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
