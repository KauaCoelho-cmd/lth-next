'use client';

import { useState, useEffect } from 'react';

const STEPS = [
  { icon: '⬇️', text: 'Baixe o arquivo .zip' },
  { icon: '📂', text: 'Extraia a pasta' },
  { icon: '🧩', text: 'Abra chrome://extensions' },
  { icon: '🔧', text: 'Ative o Modo Desenvolvedor' },
  { icon: '📁', text: 'Carregar sem compactação' },
  { icon: '🚀', text: 'Selecione a pasta e pronto!' },
];

function FloatingParticle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="pointer-events-none absolute rounded-full bg-violet-500/20 blur-xl animate-pulse"
      style={style}
    />
  );
}

export default function DownloadPage() {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    // Anima os steps sequencialmente ao carregar
    STEPS.forEach((_, i) => {
      setTimeout(() => setActiveStep(i), 200 + i * 150);
    });
  }, []);

  const handleDownload = () => {
    if (downloading || done) return;
    setDownloading(true);
    setProgress(0);

    // Simula progresso visual
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 8;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setDownloading(false);
          // Dispara o download real
          const a = document.createElement('a');
          a.href = '/hunter-x.zip';
          a.download = 'hunter-x.zip';
          a.click();
        }, 300);
      }
      setProgress(Math.min(p, 100));
    }, 80);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080810] flex flex-col items-center justify-center px-5 py-16">

      {/* Partículas de fundo */}
      <FloatingParticle style={{ width: 400, height: 400, top: '-10%', left: '-10%', animationDuration: '6s' }} />
      <FloatingParticle style={{ width: 300, height: 300, bottom: '-5%', right: '-5%', animationDuration: '8s', animationDelay: '2s' }} />
      <FloatingParticle style={{ width: 200, height: 200, top: '40%', right: '10%', animationDuration: '5s', animationDelay: '1s' }} />

      {/* Grid de pontos */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.9) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 w-full max-w-lg">

        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-violet-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-300" />
            </span>
            EXTENSÃO CHROME · GRATUITA
          </div>
        </div>

        {/* Título */}
        <div className="mb-3 text-center">
          <h1
            className="font-black uppercase leading-none tracking-tight text-white"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontFamily: 'var(--font-display, system-ui)' }}
          >
            HUNTER
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              X
            </span>
          </h1>
          <p className="mt-3 font-mono text-sm text-zinc-500">
            Escaneia a Biblioteca do Meta em tempo real
          </p>
        </div>

        {/* Card de download */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">

          {/* Header do card */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-5 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
            </div>
            <span className="font-mono text-[10px] text-zinc-600">hunter-x-extension.zip · 577 KB</span>
          </div>

          <div className="p-6">
            {/* Ícone da extensão */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-violet-500/20 blur-xl" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-violet-500/30 bg-[#0d0d1a]">
                  <span style={{ fontSize: '3rem' }}>🎯</span>
                </div>
                {/* Anel pulsante */}
                <div className="absolute -inset-2 rounded-2xl border border-violet-500/20 animate-ping" style={{ animationDuration: '2s' }} />
              </div>
            </div>

            {/* Botão de download */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="group relative mb-4 w-full overflow-hidden rounded-xl py-4 font-mono text-sm font-bold uppercase tracking-widest transition-all duration-300 disabled:cursor-not-allowed"
              style={{
                background: done
                  ? 'linear-gradient(135deg, #16a34a, #15803d)'
                  : 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                boxShadow: done
                  ? '0 0 40px rgba(22,163,74,0.4)'
                  : '0 0 40px rgba(124,58,237,0.4)',
              }}
            >
              {/* Shimmer */}
              {!downloading && !done && (
                <span className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              )}

              {/* Barra de progresso */}
              {downloading && (
                <span
                  className="absolute inset-y-0 left-0 bg-white/10 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              )}

              <span className="relative flex items-center justify-center gap-2 text-white">
                {done ? (
                  <>✓ Download concluído!</>
                ) : downloading ? (
                  <>{Math.round(progress)}% baixando…</>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:animate-bounce">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                    Baixar Extensão
                  </>
                )}
              </span>
            </button>

            <p className="text-center font-mono text-[10px] text-zinc-600 mb-4">
              Compatível com Chrome, Brave e Edge · Grátis
            </p>

            {/* Divisor */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-700">ou</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            {/* Instalador automático Windows */}
            <a
              href="/instalar-hunter-x.bat"
              download
              className="group flex items-center gap-3 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 transition hover:border-cyan-500/30 hover:bg-cyan-500/5 mb-2"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-lg border border-cyan-500/20">
                🪟
              </div>
              <div className="flex-1 text-left">
                <p className="font-mono text-xs font-bold text-white">Instalador Windows</p>
                <p className="font-mono text-[10px] text-zinc-600">Duplo-clique no .bat · instala sozinho</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600 group-hover:text-cyan-400 transition">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
            {/* Instalador automático Mac */}
            <a
              href="/instalar-hunter-x.command"
              download
              className="group flex items-center gap-3 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 transition hover:border-violet-500/30 hover:bg-violet-500/5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-lg border border-violet-500/20">
                🍎
              </div>
              <div className="flex-1 text-left">
                <p className="font-mono text-xs font-bold text-white">Instalador Mac</p>
                <p className="font-mono text-[10px] text-zinc-600">Duplo-clique no .command · instala sozinho</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600 group-hover:text-violet-400 transition">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Steps de instalação */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
          <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
            Como instalar
          </p>
          <div className="space-y-3">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="flex items-center gap-3 transition-all duration-500"
                style={{
                  opacity: activeStep >= i ? 1 : 0,
                  transform: activeStep >= i ? 'translateX(0)' : 'translateX(-10px)',
                }}
              >
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-sm transition-all duration-500"
                  style={{
                    borderColor: activeStep >= i ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.06)',
                    background: activeStep >= i ? 'rgba(139,92,246,0.1)' : 'transparent',
                  }}
                >
                  {step.icon}
                </div>
                <span className="font-mono text-xs text-zinc-400">{step.text}</span>
                {i === 2 && (
                  <span className="ml-auto rounded bg-violet-500/10 px-1.5 py-0.5 font-mono text-[8px] text-violet-400 ring-1 ring-violet-500/20">
                    copie o link
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <a href="/" className="font-mono text-[10px] text-zinc-700 transition hover:text-violet-400 uppercase tracking-widest">
            ← Voltar para hunterx.site
          </a>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
