"use client";

import { useEffect, useRef, useState } from "react";

const ORBIT_WORDS = [
  "HUNTER X", "·", "SITESCOPE", "·", "ACESSO EXCLUSIVO", "·",
  "HUNTER X", "·", "SITESCOPE", "·", "ACESSO EXCLUSIVO", "·",
  "HUNTER X", "·", "SITESCOPE", "·", "ACESSO EXCLUSIVO", "·",
];

// Ícones SVG de linha (stroke = currentColor herda a cor do container)
const ICONS: Record<string, React.ReactNode> = {
  target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="1" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="1" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="23" y2="12"/></>,
  tag: <><path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L3 13V3h10l7.59 7.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
  flame: <><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></>,
  chart: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
  folder: <><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
  keyboard: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"/></>,
  type: <><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></>,
  palette: <><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></>,
  phone: <><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  link: <><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.5-1.5"/></>,
  lock: <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
  ruler: <><path d="M3 8V5a2 2 0 0 1 2-2h3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M21 16v3a2 2 0 0 1-2 2h-3"/><line x1="7" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="17" y2="12"/></>,
};

function BIcon({ name, color }: { name: string; color: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

export function HeroScrollVideo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Parallax 3D sutil seguindo o mouse
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setTilt({ x: px * 6, y: py * -6 });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center bg-[#080810] overflow-hidden">

      {/* EFEITO DE AÇÃO — igual ao vídeo */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

        {/* chão roxo base */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 130% 80% at 50% 110%, rgba(110,30,230,0.5) 0%, transparent 60%)" }} />

        {/* metade esquerda — roxo */}
        <div className="absolute inset-y-0 left-0 w-1/2"
          style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.45) 0%, rgba(124,58,237,0.15) 70%, transparent 100%)", filter: "blur(30px)", animation: "lightPulse 4s ease-in-out infinite" }} />

        {/* metade direita — ciano */}
        <div className="absolute inset-y-0 right-0 w-1/2"
          style={{ background: "linear-gradient(270deg, rgba(34,211,238,0.4) 0%, rgba(34,211,238,0.12) 70%, transparent 100%)", filter: "blur(30px)", animation: "lightPulse 4s ease-in-out infinite 2s" }} />

        {/* god ray central vertical — explodindo do chão */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[180px] h-full"
          style={{ background: "linear-gradient(to top, rgba(180,80,255,0.8) 0%, rgba(140,50,255,0.4) 25%, rgba(120,40,220,0.15) 55%, transparent 80%)", filter: "blur(25px)", animation: "rayBurst 3s ease-in-out infinite" }} />

        {/* god ray diagonal esquerdo */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px]"
          style={{ background: "linear-gradient(45deg, rgba(140,50,255,0.5) 0%, transparent 60%)", filter: "blur(40px)", transformOrigin: "bottom left", animation: "diagLeft 5s ease-in-out infinite" }} />

        {/* god ray diagonal direito */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px]"
          style={{ background: "linear-gradient(135deg, transparent 40%, rgba(34,211,238,0.35) 100%)", filter: "blur(40px)", transformOrigin: "bottom right", animation: "diagRight 5s ease-in-out infinite 1.5s" }} />

        {/* flash de energia — pulso rápido do centro */}
        <div className="absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(160,60,255,0.3) 0%, transparent 70%)", filter: "blur(30px)", animation: "energyFlash 4s ease-in-out infinite 0.5s" }} />

        {/* partículas — moedas roxas flutuando */}
        {[
          { left: "15%", delay: "0s",   size: 6,  dur: "5s" },
          { left: "28%", delay: "1.2s", size: 4,  dur: "7s" },
          { left: "42%", delay: "0.5s", size: 8,  dur: "6s" },
          { left: "58%", delay: "2s",   size: 5,  dur: "5.5s" },
          { left: "72%", delay: "0.8s", size: 7,  dur: "6.5s" },
          { left: "85%", delay: "1.5s", size: 4,  dur: "7.5s" },
          { left: "8%",  delay: "3s",   size: 5,  dur: "8s" },
          { left: "91%", delay: "2.5s", size: 6,  dur: "6s" },
        ].map((p, i) => (
          <div key={i} className="absolute bottom-0 rounded-full"
            style={{
              left: p.left,
              width: p.size, height: p.size,
              background: i % 2 === 0 ? "rgba(180,80,255,0.9)" : "rgba(34,211,238,0.9)",
              boxShadow: i % 2 === 0 ? `0 0 ${p.size*3}px rgba(160,50,255,0.8)` : `0 0 ${p.size*3}px rgba(34,211,238,0.8)`,
              animation: `floatUp ${p.dur} ease-in infinite ${p.delay}`,
            }}
          />
        ))}

        {/* vinheta escura nas bordas extremas */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 55%, rgba(4,4,12,0.8) 100%)" }} />
      </div>

      <style>{`
@keyframes rayBurst {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scaleX(1); }
          50%       { opacity: 1;   transform: translateX(-50%) scaleX(1.5); }
        }
        @keyframes diagLeft {
          0%, 100% { opacity: 0.5; transform: rotate(0deg); }
          50%       { opacity: 1;   transform: rotate(8deg); }
        }
        @keyframes diagRight {
          0%, 100% { opacity: 0.4; transform: rotate(0deg); }
          50%       { opacity: 0.9; transform: rotate(-8deg); }
        }
        @keyframes energyFlash {
          0%, 100% { opacity: 0.2; transform: translate(-50%,-50%) scale(0.8); }
          50%       { opacity: 0.8; transform: translate(-50%,-50%) scale(1.3); }
        }
        @keyframes floatUp {
          0%   { transform: translateY(0); opacity: 0; }
          10%  { opacity: 1; }
          80%  { opacity: 0.8; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        @keyframes lightPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
      `}</style>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-7xl px-4 py-4">

        {/* VÍDEO — aparece primeiro no mobile */}
        <div className="order-1 md:order-2 relative shrink-0" style={{ width: "min(500px, 90vw)", aspectRatio: "1/1" }}>
          <div className="absolute -inset-6 rounded-3xl bg-violet-500/10 blur-3xl pointer-events-none" />

          {/* ÓRBITA 3D */}
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ top: "10%", width: "100%", height: "60px", perspective: "900px", zIndex: 10 }}
          >
            <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", animation: "orbit 26s linear infinite" }}>
              {ORBIT_WORDS.map((word, i) => {
                const angle = (360 / ORBIT_WORDS.length) * i;
                return (
                  <span key={i} style={{
                    position: "absolute", left: "50%", top: "50%",
                    fontFamily: "monospace", fontSize: "12px", fontWeight: 800,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "#ffffff", whiteSpace: "nowrap",
                    textShadow: "0 0 12px rgba(167,139,250,0.8), 0 0 4px rgba(255,255,255,0.6)",
                    transform: `translate(-50%,-50%) rotateY(${angle}deg) translateZ(260px)`,
                    backfaceVisibility: "hidden",
                  }}>
                    {word}
                  </span>
                );
              })}
            </div>
          </div>

          <div
            ref={frameRef}
            className="relative w-full h-full rounded-2xl border border-violet-500/20 overflow-hidden bg-black"
            style={{ perspective: "800px" }}
          >
            <div
              className="absolute inset-0"
              style={{
                transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.04)`,
                transition: "transform 0.3s ease-out",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Imagem base — zoom lento infinito (Ken Burns) */}
              <img
                src="/hero-goblin.jpg"
                alt="Goblin mago conjurando Hunter X e SiteScope"
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: "cover", animation: "kenBurns 22s ease-in-out infinite alternate" }}
              />

              {/* Respiração do emblema Hunter X (roxo, esquerda) */}
              <div className="absolute pointer-events-none" style={{
                left: "4%", top: "12%", width: "34%", height: "34%",
                background: "radial-gradient(circle, rgba(167,80,255,0.45) 0%, transparent 65%)",
                mixBlendMode: "screen", filter: "blur(6px)",
                animation: "sigilPulse 3.2s ease-in-out infinite",
              }} />

              {/* Respiração do emblema SiteScope (ciano, direita) */}
              <div className="absolute pointer-events-none" style={{
                left: "62%", top: "10%", width: "36%", height: "36%",
                background: "radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 65%)",
                mixBlendMode: "screen", filter: "blur(6px)",
                animation: "sigilPulse 3.2s ease-in-out infinite 1.6s",
              }} />

              {/* Olhos do goblin pulsando */}
              <div className="absolute pointer-events-none" style={{
                left: "41%", top: "26%", width: "18%", height: "10%",
                background: "radial-gradient(ellipse, rgba(190,120,255,0.5) 0%, transparent 70%)",
                mixBlendMode: "screen", filter: "blur(4px)",
                animation: "eyeGlow 5s ease-in-out infinite",
              }} />

              {/* Partículas mágicas subindo dentro do quadro */}
              {[
                { left: "12%", delay: "0s", size: 3, dur: "6s", c: "rgba(180,80,255,0.9)" },
                { left: "30%", delay: "2s", size: 2, dur: "8s", c: "rgba(34,211,238,0.9)" },
                { left: "52%", delay: "1s", size: 3, dur: "7s", c: "rgba(180,80,255,0.9)" },
                { left: "70%", delay: "3s", size: 2, dur: "6.5s", c: "rgba(34,211,238,0.9)" },
                { left: "88%", delay: "0.5s", size: 3, dur: "7.5s", c: "rgba(34,211,238,0.9)" },
              ].map((p, i) => (
                <div key={i} className="absolute rounded-full pointer-events-none"
                  style={{
                    left: p.left, bottom: 0, width: p.size, height: p.size,
                    background: p.c, boxShadow: `0 0 ${p.size * 4}px ${p.c}`,
                    animation: `frameFloat ${p.dur} ease-in infinite ${p.delay}`,
                  }}
                />
              ))}

              {/* Varredura de brilho diagonal a cada ciclo */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.09) 50%, transparent 58%)",
                backgroundSize: "260% 100%",
                animation: "sheenSweep 8s ease-in-out infinite",
                mixBlendMode: "screen",
              }} />
            </div>
          </div>
        </div>

        {/* CARDS — lado a lado no mobile, lados no desktop */}
        <div className="order-2 md:order-1 md:hidden flex gap-3 w-full px-2">
          {/* Card Hunter X mobile */}
          <div className="flex-1 rounded-2xl overflow-hidden relative flex flex-col gap-2 p-3"
            style={{ background: "linear-gradient(160deg, #100d1f 0%, #0a0814 100%)", border: "1px solid rgba(124,58,237,0.35)", boxShadow: "0 0 30px rgba(124,58,237,0.2)", animation: "cardFloat 4s ease-in-out infinite" }}>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[8px] font-bold uppercase text-violet-300" style={{ background: "rgba(124,58,237,0.18)", border: "1px solid rgba(124,58,237,0.3)" }}>
                <span className="w-1 h-1 rounded-full bg-violet-400 animate-pulse" />Ao vivo
              </span>
              <img src="/logo.png" alt="Hunter X" className="w-6 h-6 object-contain" />
            </div>
            <p className="font-black text-white text-base leading-none">Hunter X</p>
            <div className="flex flex-col gap-1">
              {["Dias rodando", "Score viral", "Exporta CSV", "Nicho detectado"].map(f => (
                <div key={f} className="flex items-center gap-1.5 rounded-lg px-2 py-1" style={{ background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.12)" }}>
                  <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0" />
                  <span className="font-mono text-[9px] text-zinc-300">{f}</span>
                </div>
              ))}
            </div>
            <a href="/download" className="w-full text-center rounded-lg py-2 font-mono text-[10px] font-bold text-white mt-1" style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)" }}>
              Baixar grátis →
            </a>
          </div>

          {/* Card SiteScope mobile */}
          <div className="flex-1 rounded-2xl overflow-hidden relative flex flex-col gap-2 p-3"
            style={{ background: "linear-gradient(160deg, #080e14 0%, #060c12 100%)", border: "1px solid rgba(34,211,238,0.3)", boxShadow: "0 0 30px rgba(34,211,238,0.15)", animation: "cardFloat 4s ease-in-out infinite 1.5s" }}>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[8px] font-bold uppercase text-cyan-300" style={{ background: "rgba(34,211,238,0.12)", border: "1px solid rgba(34,211,238,0.25)" }}>
                <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />Incluso
              </span>
              <img src="/sitescope-logo.png" alt="SiteScope" className="w-6 h-6 object-contain" />
            </div>
            <p className="font-black text-white text-base leading-none">SiteScope</p>
            <div className="flex flex-col gap-1">
              {["Edita textos", "Troca cores", "Troca imagens", "Baixa HTML"].map(f => (
                <div key={f} className="flex items-center gap-1.5 rounded-lg px-2 py-1" style={{ background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.12)" }}>
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                  <span className="font-mono text-[9px] text-zinc-300">{f}</span>
                </div>
              ))}
            </div>
            <a href="/sitescope" className="w-full text-center rounded-lg py-2 font-mono text-[10px] font-bold mt-1" style={{ background: "linear-gradient(135deg,#0891b2,#22d3ee)", color: "#08131a" }}>
              Acessar →
            </a>
          </div>
        </div>

        {/* CARD ESQUERDO — Hunter X (desktop only) */}
        <div className="hidden md:flex order-1 shrink-0 self-center" style={{ width: "clamp(210px, 21vw, 300px)" }}>
          <div className="w-full rounded-2xl overflow-hidden relative flex flex-col gap-3 p-4"
            style={{ background: "linear-gradient(160deg, #100d1f 0%, #0a0814 60%, #0d0a1a 100%)", border: "1px solid rgba(124,58,237,0.35)", boxShadow: "0 0 60px rgba(124,58,237,0.15), inset 0 1px 0 rgba(167,139,250,0.1)" }}
          >
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(124,58,237,0.25)" }} />
            <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(167,139,250,1) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,1) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />

            {/* top badge + logo */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-violet-300" style={{ background: "rgba(124,58,237,0.18)", border: "1px solid rgba(124,58,237,0.35)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                Ao vivo
              </span>
              <img src="/logo.png" alt="Hunter X" className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
            </div>

            {/* título */}
            <div className="relative z-10">
              <p className="font-black text-white text-2xl tracking-tight leading-none">Hunter X</p>
              <p className="font-mono text-[10px] text-zinc-500 mt-1">Meta Ad Library Scanner</p>
            </div>

            {/* Benefícios listados */}
            <div className="relative z-10 flex flex-col gap-1.5">
              {[
                { icon: "target", title: "Dias rodando visíveis", desc: "Há quantos dias cada anúncio está ativo" },
                { icon: "tag", title: "Faixa de preço", desc: "Low, mid e high ticket automáticos" },
                { icon: "flame", title: "Badge de validação", desc: "Marca anúncios com 7, 14 e 30+ dias" },
                { icon: "chart", title: "Score viral 0–100", desc: "Pontuação por tempo, copy e escala" },
                { icon: "folder", title: "Nicho detectado", desc: "Saúde, renda, beleza e mais na hora" },
                { icon: "download", title: "Exporta CSV/JSON", desc: "Todos os dados filtrados num clique" },
                { icon: "keyboard", title: "Atalhos de teclado", desc: "L · S · A com HUD em tempo real" },
              ].map((b) => (
                <div key={b.title} className="flex items-center gap-2.5 rounded-xl px-2.5 py-2"
                  style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.12)" }}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)" }}>
                    <BIcon name={b.icon} color="#a78bfa" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-white text-[12px] leading-tight">{b.title}</p>
                    <p className="font-mono text-[9.5px] text-zinc-500 mt-0.5 leading-snug">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href="/download" className="relative z-10 w-full text-center rounded-xl py-3 font-mono text-xs font-bold text-white overflow-hidden group/cta" style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)", boxShadow: "0 0 24px rgba(124,58,237,0.4)" }}>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />
              Baixar grátis →
            </a>
          </div>
        </div>

        {/* CARD DIREITO — SiteScope (desktop only) */}
        <div className="hidden md:flex order-3 shrink-0 self-center" style={{ width: "clamp(210px, 21vw, 300px)" }}>
          <div className="w-full rounded-2xl overflow-hidden relative flex flex-col gap-3 p-4"
            style={{ background: "linear-gradient(160deg, #080e14 0%, #060c12 60%, #08111a 100%)", border: "1px solid rgba(34,211,238,0.3)", boxShadow: "0 0 60px rgba(34,211,238,0.1), inset 0 1px 0 rgba(34,211,238,0.12)" }}
          >
            {/* glow top */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(34,211,238,0.18)" }} />
            {/* grid */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(34,211,238,1) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,1) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />

            {/* top badge + logo */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-cyan-300" style={{ background: "rgba(34,211,238,0.12)", border: "1px solid rgba(34,211,238,0.3)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Incluso
              </span>
              <img src="/sitescope-logo.png" alt="SiteScope" className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            </div>

            {/* título */}
            <div className="relative z-10">
              <p className="font-black text-white text-2xl tracking-tight leading-none">SiteScope</p>
              <p className="font-mono text-[10px] text-zinc-500 mt-1">Visual Landing Page Editor</p>
            </div>

            {/* Benefícios listados */}
            <div className="relative z-10 flex flex-col gap-1.5">
              {[
                { icon: "type", title: "Edita textos", desc: "Clique em qualquer texto e reescreva" },
                { icon: "palette", title: "Troca cores ao vivo", desc: "Fundo e texto de qualquer elemento" },
                { icon: "image", title: "Substitui imagens", desc: "Selecione outra do seu computador" },
                { icon: "ruler", title: "Mostra dimensões", desc: "Tamanho exato pra recriar igual" },
                { icon: "phone", title: "Preview mobile", desc: "Veja no celular e no desktop" },
                { icon: "grid", title: "Galeria de imagens", desc: "Todas as imagens em miniaturas" },
                { icon: "download", title: "Baixa o HTML pronto", desc: "Arquivo final pra publicar" },
              ].map((b) => (
                <div key={b.title} className="flex items-center gap-2.5 rounded-xl px-2.5 py-2"
                  style={{ background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.12)" }}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(34,211,238,0.12)", border: "1px solid rgba(34,211,238,0.22)" }}>
                    <BIcon name={b.icon} color="#22d3ee" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-white text-[12px] leading-tight">{b.title}</p>
                    <p className="font-mono text-[9.5px] text-zinc-500 mt-0.5 leading-snug">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href="/sitescope" className="relative z-10 w-full text-center rounded-xl py-3 font-mono text-xs font-bold overflow-hidden group/cta" style={{ background: "linear-gradient(135deg,#0891b2,#22d3ee)", color: "#08131a", boxShadow: "0 0 24px rgba(34,211,238,0.3)" }}>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />
              Acessar SiteScope →
            </a>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes orbit {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(360deg); }
        }
        @keyframes lightPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.55; }
        }
        @keyframes kenBurns {
          from { transform: scale(1); }
          to   { transform: scale(1.07); }
        }
        @keyframes sigilPulse {
          0%, 100% { opacity: 0.35; transform: scale(0.96); }
          50%       { opacity: 1;    transform: scale(1.06); }
        }
        @keyframes eyeGlow {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 0.7; }
        }
        @keyframes frameFloat {
          0%   { transform: translateY(0); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 0.7; }
          100% { transform: translateY(-480px); opacity: 0; }
        }
        @keyframes sheenSweep {
          0%       { background-position: 130% 0; }
          55%, 100% { background-position: -130% 0; }
        }
      `}</style>
    </section>
  );
}
