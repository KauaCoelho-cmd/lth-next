"use client";

import { useEffect, useState } from "react";

export function OnlineCounter() {
  const [count, setCount] = useState(780);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const tick = () => {
      setCount(c => {
        const delta = Math.floor(Math.random() * 11) - 5;
        return Math.max(670, Math.min(890, c + delta));
      });
      setBump(true);
      setTimeout(() => setBump(false), 350);
    };

    const schedule = () => {
      const delay = 4000 + Math.random() * 4000;
      return setTimeout(() => { tick(); schedule(); }, delay);
    };

    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  return (
    <>
    <div className="hidden sm:block relative overflow-hidden border-b border-violet-500/25 bg-gradient-to-r from-[#0c0a18] via-[#1a1230] to-[#0c0a18] shadow-[0_2px_24px_rgba(139,92,246,0.18)]">
      {/* glow superior */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/70 to-transparent" />
      {/* brilho deslizante de fundo */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[ticker-sheen_5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-violet-500/[0.12] to-transparent" />
      {/* grão/grid sutil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, #a78bfa 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />

      <div className="relative flex items-center justify-center gap-3 py-3 px-4">
        {/* radar dot maior */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,1)]" />
        </span>

        <p className="font-mono text-[13px] sm:text-[15px] tracking-wide text-zinc-300">
          <span
            className={`inline-block text-lg sm:text-xl font-black tabular-nums text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)] transition-transform duration-300 ${
              bump ? "-translate-y-0.5 scale-110" : ""
            }`}
          >
            {count}
          </span>{" "}
          <span className="font-semibold text-white">caçadores</span>{" "}
          <span className="text-zinc-400">online agora</span>
        </p>

        {/* selo ao vivo */}
        <span className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-300 shadow-[0_0_16px_rgba(52,211,153,0.2)]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Ao vivo
        </span>
      </div>

      <style>{`
        @keyframes ticker-sheen {
          0%   { transform: translateX(-100%); }
          55%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>

    {/* Faixa de urgência — redesenhada */}
    <div className="relative overflow-hidden bg-[#0f0505]" style={{ borderBottom: "1px solid rgba(239,68,68,0.25)" }}>
      {/* scan line animada */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[urgency-scan_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-red-500/[0.08] to-transparent" />
      {/* linha de glow top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

      <div className="relative flex items-center justify-center gap-3 py-2.5 px-4">
        {/* ícone de alerta pulsante */}
        <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
          <span className="absolute h-full w-full animate-ping rounded-full bg-red-500/30" />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </span>

        {/* texto */}
        <p className="font-mono text-[11.5px] sm:text-[13px] tracking-wide leading-none">
          <span className="font-black text-red-400 uppercase tracking-[0.15em]" style={{ textShadow: "0 0 12px rgba(239,68,68,0.5)" }}>
            VAGAS LIMITADAS
          </span>
          <span className="mx-2 text-red-900/80">·</span>
          <span className="text-zinc-400">Quando fechar, só na próxima abertura.</span>
          <span className="ml-1.5 font-bold text-red-500/80">Sem data prevista.</span>
        </p>

        {/* badge */}
        <span className="hidden sm:inline-flex items-center gap-1 rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 font-mono text-[9px] font-black uppercase tracking-widest text-red-400">
          urgente
        </span>
      </div>

      <style>{`
        @keyframes urgency-scan {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
    </>
  );
}
