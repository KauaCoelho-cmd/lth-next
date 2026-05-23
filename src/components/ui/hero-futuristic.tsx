'use client';

import React from 'react';
import { ScannerShowcase } from '@/components/ui/scanner-showcase';
import { NeonButton } from '@/components/ui/neon-button';

/* ─── HUD corner brackets (cyber frame) ─── */
const CornerBrackets = () => (
  <div className="pointer-events-none absolute inset-6 z-10">
    <span className="absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2 border-violet-400/50" />
    <span className="absolute right-0 top-0 h-7 w-7 border-r-2 border-t-2 border-violet-400/50" />
    <span className="absolute bottom-0 left-0 h-7 w-7 border-b-2 border-l-2 border-violet-400/50" />
    <span className="absolute bottom-0 right-0 h-7 w-7 border-b-2 border-r-2 border-violet-400/50" />
    <span className="absolute left-9 top-0 -translate-y-1/2 font-mono text-[8px] uppercase tracking-[0.2em] text-violet-400/40">SYS:ACTIVE</span>
    <span className="absolute bottom-0 right-9 translate-y-1/2 font-mono text-[8px] uppercase tracking-[0.2em] text-violet-400/40">WebGPU:OK</span>
  </div>
);

/* ─── Blinking cursor ─── */
const Cursor = () => (
  <span className="ml-1 inline-block h-[0.7em] w-[2px] animate-[hero-flicker_1s_steps(1)_infinite] bg-violet-400 align-middle" />
);

/* ─── HUD metric chip ─── */
const Metric = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-start gap-0.5">
    <span className="font-mono text-lg font-black leading-none tabular-nums text-violet-300">{value}</span>
    <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">{label}</span>
  </div>
);

/* ═══════════════════════════════════════════════
   HERO FUTURISTIC — main export
═══════════════════════════════════════════════ */
export interface HeroFuturisticProps {
  titleWords?: string[];
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  priceLabel?: string;
  badge?: string;
}

export const HeroFuturistic = ({
  titleWords = ['VEJA', 'ANALISE', 'LUCRE'],
  subtitle = 'A primeira extensão Chrome que escaneia a Biblioteca do Meta em tempo real e revela os produtos low ticket que já estão escalando.',
  ctaLabel = '🎯 Ver planos',
  ctaHref = '#planos',
  priceLabel = 'Mensal · R$29,90 · Cancele quando quiser',
  badge = 'EXTENSÃO CHROME · v1.3.0',
}: HeroFuturisticProps) => {

  return (
    <div className="relative w-full overflow-hidden bg-[#0a0a14]" style={{ minHeight: '100svh' }}>
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.9) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Glow central */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[60%] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(139,92,246,0.12),transparent)]" />

      {/* ══ LAYOUT RESPONSIVO ══
          Mobile : coluna única (texto → scanner)
          Desktop: duas colunas (texto | scanner)
      */}
      <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col items-center gap-12 px-5 py-24 lg:flex-row lg:items-center lg:gap-0 lg:py-0 xl:px-10">

        {/* ─ COLUNA ESQUERDA: copy ─ */}
        <div className="flex w-full flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left lg:pr-10 xl:pr-16">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-violet-300 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-300" />
            </span>
            ◉ {badge}
          </div>

          {/* Título */}
          <h1
            className="font-display font-black uppercase leading-[0.88] tracking-tight text-white"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}
          >
            {titleWords.map((word, i) => (
              <div
                key={i}
                className="block"
                style={i === Math.floor(titleWords.length / 2) ? {
                  background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                } : {}}
              >
                {word}
              </div>
            ))}
          </h1>

          {/* Linha separadora */}
          <div className="my-5 h-[2px] w-20 bg-gradient-to-r from-violet-500 via-cyan-500 to-transparent lg:mx-0" />

          {/* Subtitle */}
          <p className="max-w-sm text-[15px] leading-relaxed text-zinc-400 md:text-base">
            {subtitle}
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-center gap-3 lg:items-start">
            <a href={ctaHref}>
              <NeonButton
                variant="violet"
                size="lg"
                className="shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] transition-shadow duration-300"
              >
                {ctaLabel}
              </NeonButton>
            </a>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              {priceLabel}
            </span>
          </div>

          {/* Métricas */}
          <div className="mt-8 flex items-center gap-6 border-t border-white/[0.06] pt-6">
            <Metric value="23K+" label="Anúncios/dia" />
            <div className="h-5 w-px bg-white/10" />
            <Metric value="15" label="Plataformas" />
            <div className="h-5 w-px bg-white/10" />
            <Metric value="0–100" label="Score viral" />
          </div>
        </div>

        {/* ─ COLUNA DIREITA: scanner ─ */}
        <div className="flex w-full items-center justify-center lg:w-1/2 lg:justify-end">
          <div className="pointer-events-none absolute right-0 hidden h-[500px] w-[500px] rounded-full bg-violet-600/8 blur-[80px] lg:block" />
          <ScannerShowcase compact />
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <button
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600 transition hover:text-violet-400 lg:flex"
        onClick={() => document.querySelector('#problema')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span>Como funciona</span>
        <svg width="16" height="16" viewBox="0 0 22 22" fill="none" className="animate-bounce">
          <path d="M11 5V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 12L11 17L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

    </div>
  );
};

export default HeroFuturistic;
