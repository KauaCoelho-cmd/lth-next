'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/* ── dados dos anúncios falsos ── */
const ADS = [
  {
    id: 1,
    gradient: 'from-rose-500/80 via-orange-400/60 to-yellow-300/40',
    product: 'Kit Unhas Gel Pro',
    price: 'R$37,90',
    platform: 'Kiwify',
    score: 94,
    days: '14',
    isLowTicket: true,
    niche: 'Beleza',
  },
  {
    id: 2,
    gradient: 'from-sky-500/80 via-cyan-400/60 to-teal-300/40',
    product: 'Curso Tráfego Pago',
    price: 'R$97,00',
    platform: 'Hotmart',
    score: 61,
    days: '3',
    isLowTicket: false,
    niche: 'Educação',
  },
  {
    id: 3,
    gradient: 'from-violet-500/80 via-purple-400/60 to-pink-300/40',
    product: 'Amuleto da Sorte',
    price: 'R$29,90',
    platform: 'Hotmart',
    score: 88,
    days: '21',
    isLowTicket: true,
    niche: 'Espiritualidade',
  },
  {
    id: 4,
    gradient: 'from-emerald-500/80 via-green-400/60 to-lime-300/40',
    product: 'Detox 21 Dias',
    price: 'R$47,00',
    platform: 'Kiwify',
    score: 76,
    days: '9',
    isLowTicket: true,
    niche: 'Saúde',
  },
];

/* ── contador animado ── */
function AnimatedScore({ target, active }: { target: number; active: boolean }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / 30);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setValue(start);
      if (start >= target) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [active, target]);
  return <>{value}</>;
}

/* ── preço com typewriter ── */
function TypewriterPrice({ price, active }: { price: string; active: boolean }) {
  const [shown, setShown] = useState('');
  useEffect(() => {
    if (!active) return;
    let i = 0;
    const timer = setInterval(() => {
      setShown(price.slice(0, i + 1));
      i++;
      if (i >= price.length) clearInterval(timer);
    }, 60);
    return () => clearInterval(timer);
  }, [active, price]);
  return <>{shown}<span className="animate-pulse">|</span></>;
}

/* ── card individual ── */
function AdCard({ ad, visible, scanProgress, className }: {
  ad: typeof ADS[0];
  visible: boolean;
  scanProgress: number;
  className?: string;
}) {
  const cardTop = ad.id <= 2 ? 0 : 0.5;
  const isScanned = scanProgress > cardTop + 0.05;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border transition-all duration-700',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        ad.isLowTicket && isScanned
          ? 'border-green-400/70 shadow-[0_0_20px_rgba(74,222,128,0.25)]'
          : 'border-white/10',
        className,
      )}
      style={{
        transitionDelay: `${(ad.id - 1) * 180}ms`,
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* imagem produto */}
      <div className={cn('relative h-16 w-full bg-gradient-to-br overflow-hidden', ad.gradient)}>
        {/* overlay escuro no bottom */}
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0d0d1a] to-transparent" />

        {/* badge plataforma */}
        <span className="absolute left-2 top-2 rounded-md bg-black/50 px-2 py-0.5 font-mono text-[9px] font-bold text-white/80 backdrop-blur-sm">
          {ad.platform}
        </span>

        {/* badge nicho */}
        <span className="absolute right-2 top-2 rounded-md bg-violet-600/70 px-2 py-0.5 font-mono text-[9px] font-bold text-white backdrop-blur-sm">
          {ad.niche}
        </span>

        {/* badge dias rodando */}
        {isScanned && (
          <span className={cn(
            'absolute bottom-2 right-2 rounded-md px-2 py-0.5 font-mono text-[9px] font-bold backdrop-blur-sm transition-all duration-500',
            Number(ad.days) >= 7
              ? 'bg-amber-500/80 text-black'
              : 'bg-white/20 text-white/70',
          )}>
            {Number(ad.days) >= 7 ? '🔥' : '⏱'} {ad.days} dias
          </span>
        )}
      </div>

      {/* corpo */}
      <div className="p-2.5">
        <p className="mb-1 truncate text-[11px] font-semibold text-slate-200">{ad.product}</p>

        <div className="flex items-center justify-between gap-1">
          {/* preço */}
          <span className={cn(
            'font-mono text-xs font-black transition-colors duration-500',
            isScanned && ad.isLowTicket ? 'text-green-400' : 'text-slate-300',
          )}>
            {isScanned ? <TypewriterPrice price={ad.price} active={isScanned} /> : '···'}
          </span>

          {/* score */}
          <div className={cn(
            'flex items-center gap-0.5 rounded px-1.5 py-0.5 font-mono text-[10px] font-black transition-all duration-500',
            isScanned
              ? ad.score >= 80
                ? 'bg-green-500/20 text-green-400'
                : ad.score >= 60
                ? 'bg-amber-500/20 text-amber-400'
                : 'bg-zinc-500/20 text-zinc-400'
              : 'bg-white/5 text-zinc-600',
          )}>
            <span className="text-[7px] font-normal opacity-70">▲</span>
            <AnimatedScore target={isScanned ? ad.score : 0} active={isScanned} />
          </div>
        </div>

        {/* LOW TICKET badge */}
        {isScanned && ad.isLowTicket && (
          <div className="mt-1.5">
            <span className="inline-flex items-center gap-1 rounded bg-green-500/15 px-1.5 py-0.5 font-mono text-[8px] font-bold text-green-400 ring-1 ring-green-500/30">
              ✓ LT
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   COMPONENTE PRINCIPAL
══════════════════════════════════════ */
export function MetaAdScanner({ className }: { className?: string }) {
  const [visible, setVisible] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const SCAN_DURATION = 2800;
  const PAUSE = 1200;

  useEffect(() => {
    const delay = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    let pausing = false;

    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;

      if (!pausing) {
        const p = Math.min(elapsed / SCAN_DURATION, 1);
        setScanProgress(p);
        if (p >= 1) {
          pausing = true;
          setTimeout(() => {
            startRef.current = 0;
            pausing = false;
            setScanProgress(0);
          }, PAUSE);
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const scanY = `${scanProgress * 100}%`;

  return (
    <div className={cn('relative flex items-center justify-center', className)}>

      {/* moldura browser chrome */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d1a] shadow-[0_0_60px_rgba(139,92,246,0.15)]">

        {/* barra de URL */}
        <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-3 py-2">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
            <span className="h-2 w-2 rounded-full bg-green-500/70" />
          </div>
          <div className="flex flex-1 items-center gap-1 rounded bg-white/5 px-2 py-0.5 min-w-0">
            <span className="font-mono text-[9px] text-zinc-500 shrink-0">🔒</span>
            <span className="font-mono text-[9px] text-zinc-500 truncate">facebook.com/ads/library</span>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded bg-violet-600/80 px-1.5 py-0.5">
            <span className="font-mono text-[8px] font-bold text-white">HX</span>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
          </div>
        </div>

        {/* área dos anúncios */}
        <div className="relative p-2.5">

          {/* linha de scan ciano */}
          <div
            className="pointer-events-none absolute inset-x-0 z-20 transition-none"
            style={{ top: scanY }}
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-90 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            <div className="h-6 w-full bg-gradient-to-b from-cyan-400/10 to-transparent" />
          </div>

          {/* header */}
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500">
              Biblioteca de Anúncios
            </span>
            <span className="font-mono text-[8px] text-violet-400">
              {visible ? '2.847' : '···'}
            </span>
          </div>

          {/* desktop: grid 2x2 */}
          <div className="hidden sm:grid grid-cols-2 gap-2">
            {ADS.map((ad) => (
              <AdCard key={ad.id} ad={ad} visible={visible} scanProgress={scanProgress} />
            ))}
          </div>

          {/* mobile: coluna única subindo em loop */}
          <div className="sm:hidden overflow-hidden" style={{ height: '260px' }}>
            <div className="flex flex-col gap-2 animate-[scroll-up_6s_linear_infinite]">
              {[...ADS, ...ADS].map((ad, i) => (
                <AdCard key={i} ad={ad} visible={visible} scanProgress={scanProgress} />
              ))}
            </div>
          </div>

          {/* rodapé */}
          <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-2">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              <span className="font-mono text-[8px] text-green-400">Hunter X ativo</span>
            </div>
            <span className="font-mono text-[8px] text-zinc-600">
              {Math.round(scanProgress * 100)}% escaneado
            </span>
          </div>
        </div>
      </div>

      {/* glow externo */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-violet-600/5 blur-3xl" />
    </div>
  );
}
