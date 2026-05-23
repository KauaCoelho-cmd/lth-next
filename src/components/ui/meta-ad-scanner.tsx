'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/* ─── Dados dos anúncios ─────────────────────────────────────────────────── */
const ADS = [
  {
    id: 1,
    gradient: 'from-violet-600 via-fuchsia-500 to-pink-400',
    product: 'Kit Unhas Gel Pro',
    price: 'R$37,90',
    platform: 'Kiwify',
    score: 94,
    days: 14,
    isLowTicket: true,
    niche: 'Beleza',
    momentum: [30, 55, 48, 72, 88, 94],
  },
  {
    id: 2,
    gradient: 'from-blue-600 via-cyan-500 to-teal-400',
    product: 'Curso Tráfego Pago',
    price: 'R$97,00',
    platform: 'Hotmart',
    score: 61,
    days: 3,
    isLowTicket: false,
    niche: 'Educação',
    momentum: [20, 35, 40, 55, 58, 61],
  },
  {
    id: 3,
    gradient: 'from-indigo-600 via-violet-500 to-purple-400',
    product: 'Amuleto da Sorte',
    price: 'R$29,90',
    platform: 'Hotmart',
    score: 88,
    days: 21,
    isLowTicket: true,
    niche: 'Espirit.',
    momentum: [25, 42, 60, 70, 82, 88],
  },
  {
    id: 4,
    gradient: 'from-sky-600 via-blue-500 to-indigo-400',
    product: 'Detox 21 Dias',
    price: 'R$47,00',
    platform: 'Kiwify',
    score: 76,
    days: 9,
    isLowTicket: true,
    niche: 'Saúde',
    momentum: [15, 30, 44, 58, 70, 76],
  },
];

/* ─── Mini gráfico de barras ─────────────────────────────────────────────── */
function MiniChart({ data, active }: { data: number[]; active: boolean }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-px h-5">
      {data.map((v, i) => (
        <div
          key={i}
          className="w-1 rounded-sm transition-all duration-500"
          style={{
            height: active ? `${(v / max) * 100}%` : '10%',
            transitionDelay: `${i * 80}ms`,
            background: active
              ? `hsl(${260 + i * 8}, 80%, ${55 + i * 4}%)`
              : 'rgba(255,255,255,0.08)',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Contador animado ───────────────────────────────────────────────────── */
function AnimatedNumber({ target, active, suffix = '' }: { target: number; active: boolean; suffix?: string }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0;
    const step = Math.ceil(target / 28);
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      setValue(cur);
      if (cur >= target) clearInterval(t);
    }, 40);
    return () => clearInterval(t);
  }, [active, target]);
  return <>{value}{suffix}</>;
}

/* ─── Preço typewriter ───────────────────────────────────────────────────── */
function TypewriterPrice({ price, active }: { price: string; active: boolean }) {
  const [shown, setShown] = useState('');
  useEffect(() => {
    if (!active) { setShown(''); return; }
    let i = 0;
    const t = setInterval(() => {
      setShown(price.slice(0, i + 1));
      i++;
      if (i >= price.length) clearInterval(t);
    }, 55);
    return () => clearInterval(t);
  }, [active, price]);
  return (
    <span>
      {shown || <span className="text-zinc-600">···</span>}
      {shown.length > 0 && shown.length < price.length && (
        <span className="animate-pulse text-cyan-400">|</span>
      )}
    </span>
  );
}

/* ─── Card de anúncio ────────────────────────────────────────────────────── */
function AdCard({ ad, visible, isScanned }: {
  ad: typeof ADS[0];
  visible: boolean;
  isScanned: boolean;
}) {
  const isHot = ad.days >= 7;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border transition-all duration-700',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        isScanned && ad.isLowTicket
          ? 'border-violet-400/60 shadow-[0_0_24px_rgba(139,92,246,0.3),inset_0_0_24px_rgba(139,92,246,0.04)]'
          : 'border-white/[0.07]',
      )}
      style={{
        transitionDelay: `${(ad.id - 1) * 160}ms`,
        background: isScanned && ad.isLowTicket
          ? 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(10,10,20,0.95) 60%)'
          : 'rgba(255,255,255,0.02)',
      }}
    >
      {/* Linha de glow no topo quando scaneado */}
      {isScanned && ad.isLowTicket && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
      )}

      {/* Imagem produto */}
      <div className={cn('relative h-20 w-full overflow-hidden bg-gradient-to-br', ad.gradient)}>
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.06] mix-blend-overlay" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0a0a14] to-transparent" />

        {/* badges topo */}
        <div className="absolute inset-x-0 top-2 flex items-center justify-between px-2">
          <span className="rounded border border-white/10 bg-black/50 px-1.5 py-px font-mono text-[8px] font-bold text-white/70 backdrop-blur-sm">
            {ad.platform}
          </span>
          <span className="rounded border border-violet-500/30 bg-violet-600/50 px-1.5 py-px font-mono text-[8px] font-bold text-violet-200 backdrop-blur-sm">
            {ad.niche}
          </span>
        </div>

        {/* dias rodando */}
        {isScanned && (
          <div className={cn(
            'absolute bottom-2 right-2 flex items-center gap-1 rounded border px-1.5 py-px font-mono text-[8px] font-bold backdrop-blur-sm transition-all duration-500',
            isHot
              ? 'border-cyan-500/40 bg-cyan-500/20 text-cyan-300'
              : 'border-white/10 bg-white/10 text-white/50',
          )}>
            {isHot ? '🔥' : '⏱'} {ad.days}d
          </div>
        )}
      </div>

      {/* Corpo */}
      <div className="p-3">
        <p className="mb-2 truncate text-[11px] font-semibold text-slate-200 leading-tight">
          {ad.product}
        </p>

        <div className="flex items-end justify-between gap-2">
          {/* Preço + badge LT */}
          <div>
            <p className={cn(
              'font-mono text-sm font-black leading-none transition-colors duration-500',
              isScanned && ad.isLowTicket ? 'text-violet-300' : 'text-slate-300',
            )}>
              <TypewriterPrice price={ad.price} active={isScanned} />
            </p>
            {isScanned && ad.isLowTicket && (
              <span className="mt-1.5 inline-flex items-center gap-1 rounded border border-violet-500/30 bg-violet-500/10 px-1.5 py-px font-mono text-[7px] font-bold text-violet-400 tracking-widest uppercase">
                ◉ LOW TICKET
              </span>
            )}
          </div>

          {/* Score + mini chart */}
          <div className="flex flex-col items-end gap-1">
            <MiniChart data={ad.momentum} active={isScanned} />
            <div className={cn(
              'flex items-center gap-0.5 rounded px-1.5 py-0.5 font-mono text-[10px] font-black transition-all duration-500',
              isScanned
                ? ad.score >= 80 ? 'bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/20'
                  : ad.score >= 60 ? 'bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/20'
                  : 'bg-white/5 text-zinc-400'
                : 'bg-white/5 text-zinc-600',
            )}>
              <AnimatedNumber target={isScanned ? ad.score : 0} active={isScanned} />
              <span className="text-[7px] opacity-60">/100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════════════════════════════════════ */
export function MetaAdScanner({ className }: { className?: string }) {
  const [visible, setVisible] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [totalScanned, setTotalScanned] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const SCAN_DURATION = 3000;
  const PAUSE = 1400;

  useEffect(() => {
    const d = setTimeout(() => setVisible(true), 250);
    return () => clearTimeout(d);
  }, []);

  useEffect(() => {
    let pausing = false;
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      if (!pausing) {
        const p = Math.min(elapsed / SCAN_DURATION, 1);
        setScanProgress(p);
        setTotalScanned((prev) => Math.min(prev + 1, 2847));
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

  const lowTicketFound = ADS.filter((a) => a.isLowTicket && scanProgress > (a.id <= 2 ? 0.3 : 0.7)).length;
  const scanY = `${scanProgress * 100}%`;

  return (
    <div className={cn('relative flex items-center justify-center', className)}>

      {/* Glow difuso de fundo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-violet-600/10 blur-[80px]" />
        <div className="absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-cyan-600/8 blur-[60px]" />
      </div>

      {/* Moldura browser */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a14] shadow-[0_0_80px_rgba(139,92,246,0.18),0_0_0_1px_rgba(139,92,246,0.06)]">

        {/* Linha de glow no topo da moldura */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

        {/* ── Barra URL ── */}
        <div className="flex items-center gap-2.5 border-b border-white/[0.05] bg-white/[0.02] px-3.5 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
          </div>
          <div className="flex flex-1 items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.04] px-2.5 py-1 min-w-0">
            <span className="font-mono text-[9px] text-zinc-500 shrink-0">🔒</span>
            <span className="font-mono text-[9px] text-zinc-400 truncate">facebook.com/ads/library</span>
          </div>
          {/* Badge Hunter X ativo */}
          <div className="flex shrink-0 items-center gap-1.5 rounded-md border border-violet-500/30 bg-violet-600/20 px-2 py-1">
            <span className="font-mono text-[9px] font-black text-violet-300 tracking-widest">HX</span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </span>
          </div>
        </div>

        {/* ── Barra de métricas ao vivo ── */}
        <div className="flex items-center gap-0 border-b border-white/[0.05] bg-white/[0.015] divide-x divide-white/[0.05]">
          {[
            { label: 'ESCANEADOS', value: totalScanned.toLocaleString('pt-BR'), color: 'text-zinc-400' },
            { label: 'LOW TICKET', value: lowTicketFound.toString(), color: 'text-violet-400' },
            { label: 'PLATAFORMAS', value: '8', color: 'text-cyan-400' },
            { label: 'SCAN', value: `${Math.round(scanProgress * 100)}%`, color: 'text-violet-300' },
          ].map((m) => (
            <div key={m.label} className="flex flex-1 flex-col items-center py-2 px-1">
              <span className={cn('font-mono text-[11px] font-black tabular-nums', m.color)}>{m.value}</span>
              <span className="font-mono text-[7px] tracking-widest text-zinc-600 uppercase">{m.label}</span>
            </div>
          ))}
        </div>

        {/* ── Área de anúncios ── */}
        <div className="relative p-3.5">

          {/* Linha de scan */}
          <div
            className="pointer-events-none absolute inset-x-0 z-20 transition-none"
            style={{ top: `calc(${scanY} + 3.5rem)` }}
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_16px_rgba(34,211,238,0.9)]" />
            <div className="h-8 w-full bg-gradient-to-b from-cyan-400/12 to-transparent" />
          </div>

          {/* Grid de cards */}
          <div className="grid grid-cols-2 gap-2.5">
            {ADS.map((ad) => {
              const threshold = ad.id <= 2 ? 0.25 : 0.65;
              const isScanned = scanProgress > threshold;
              return (
                <AdCard key={ad.id} ad={ad} visible={visible} isScanned={isScanned} />
              );
            })}
          </div>

          {/* Rodapé */}
          <div className="mt-3 flex items-center justify-between border-t border-white/[0.05] pt-2.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
              </span>
              <span className="font-mono text-[9px] font-bold text-violet-400">Hunter X v2.1.0 ativo</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-1 w-24 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300"
                  style={{ width: `${Math.round(scanProgress * 100)}%` }}
                />
              </div>
              <span className="font-mono text-[8px] text-zinc-600 tabular-nums w-7 text-right">
                {Math.round(scanProgress * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
