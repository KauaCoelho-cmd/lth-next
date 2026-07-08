'use client';

import { useState, useEffect } from 'react';

const STEPS = [
  {
    icon: '⬇️',
    text: 'Baixe o arquivo .zip',
    detail: 'Clique no botão acima e salve o arquivo no seu computador',
  },
  {
    icon: '📂',
    text: 'Extraia a pasta',
    detail: 'Clique com botão direito no .zip → "Extrair tudo" (Windows) ou duplo-clique (Mac)',
  },
  {
    icon: '🧩',
    text: 'Abra chrome://extensions',
    detail: 'Cole esse endereço na barra do Chrome e pressione Enter',
    tag: 'chrome://extensions',
  },
  {
    icon: '🔧',
    text: 'Ative o Modo Desenvolvedor',
    detail: 'Clique no botão "Modo do desenvolvedor" no canto superior direito da página',
  },
  {
    icon: '📁',
    text: 'Clique em "Carregar sem compactação"',
    detail: 'Um botão vai aparecer no topo esquerdo após ativar o modo desenvolvedor',
  },
  {
    icon: '🚀',
    text: 'Selecione a pasta extraída',
    detail: 'Navegue até a pasta do Hunter X que você extraiu e clique em "Selecionar pasta"',
  },
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
                <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-violet-500/30 bg-[#0d0d1a] overflow-hidden">
                  <img src="/logo.png" alt="Hunter X" className="w-20 h-20 object-contain" />
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
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="#38bdf8">
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
                </svg>
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
            <div className="w-full">
              <a
                href="/instalar-hunter-x.command"
                download
                className="group flex items-center gap-3 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 transition hover:border-violet-500/30 hover:bg-violet-500/5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="#a78bfa">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-mono text-xs font-bold text-white">Instalador Mac</p>
                  <p className="font-mono text-[10px] text-zinc-600">Clique direito → Abrir · instala sozinho</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600 group-hover:text-violet-400 transition">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </a>
              {/* Aviso Mac */}
              <div className="mt-2 flex items-start gap-2 rounded-lg bg-amber-500/5 border border-amber-500/20 px-3 py-2">
                <span className="text-sm shrink-0">⚠️</span>
                <p className="font-mono text-[9px] text-amber-400/80 leading-relaxed">
                  No Mac: após baixar, faça <strong className="text-amber-300">clique direito → Abrir</strong> (não duplo-clique). Na primeira vez o Mac pede confirmação — clique <strong className="text-amber-300">&quot;Abrir&quot;</strong> para continuar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Steps de instalação */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
          <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
            Passo a passo de instalação
          </p>
          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="flex gap-3 transition-all duration-500"
                style={{
                  opacity: activeStep >= i ? 1 : 0,
                  transform: activeStep >= i ? 'translateX(0)' : 'translateX(-10px)',
                }}
              >
                {/* Número + linha conectora */}
                <div className="flex flex-col items-center">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] font-bold transition-all duration-500"
                    style={{
                      borderColor: activeStep >= i ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.06)',
                      background: activeStep >= i ? 'rgba(139,92,246,0.12)' : 'transparent',
                      color: activeStep >= i ? '#a78bfa' : '#3f3f46',
                    }}
                  >
                    {i + 1}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="mt-1 w-px flex-1 bg-white/[0.05]" style={{ minHeight: 16 }} />
                  )}
                </div>

                {/* Conteúdo */}
                <div className="pb-2 flex-1">
                  <p className="font-mono text-xs font-bold text-white mb-0.5">{step.text}</p>
                  <p className="font-mono text-[10px] text-zinc-500 leading-relaxed">{step.detail}</p>
                  {'tag' in step && step.tag && (
                    <button
                      onClick={() => navigator.clipboard.writeText(step.tag!)}
                      className="mt-1.5 inline-flex items-center gap-1.5 rounded bg-violet-500/10 px-2 py-1 font-mono text-[10px] text-violet-400 ring-1 ring-violet-500/20 hover:bg-violet-500/20 transition"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                      {step.tag}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Nota final */}
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-green-500/5 border border-green-500/20 px-3 py-2.5">
            <span className="text-sm shrink-0">✅</span>
            <p className="font-mono text-[10px] text-green-400/80 leading-relaxed">
              Após selecionar a pasta, o Hunter X aparece na barra de extensões do Chrome. Clique no ícone e insira sua chave de licença para ativar.
            </p>
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
