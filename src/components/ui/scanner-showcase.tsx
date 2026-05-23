'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Target } from 'lucide-react';

/* ─── Dados ─────────────────────────────────────────────────────────────── */
const ADS = [
  { id: 1, gradient: 'from-violet-600 via-fuchsia-500 to-pink-400',   product: 'Kit Unhas Gel Pro',    price: 'R$37,90', platform: 'Kiwify',   score: 94, days: 14, lt: true,  niche: 'Beleza',     momentum: [30,55,48,72,88,94] },
  { id: 2, gradient: 'from-blue-600 via-cyan-500 to-teal-400',        product: 'Curso Tráfego Pago',   price: 'R$97,00', platform: 'Hotmart',  score: 61, days:  3, lt: false, niche: 'Educação',   momentum: [20,35,40,55,58,61] },
  { id: 3, gradient: 'from-indigo-600 via-violet-500 to-purple-400',  product: 'Amuleto da Sorte',     price: 'R$29,90', platform: 'Hotmart',  score: 88, days: 21, lt: true,  niche: 'Espirit.',   momentum: [25,42,60,70,82,88] },
  { id: 4, gradient: 'from-sky-600 via-blue-500 to-indigo-400',       product: 'Detox 21 Dias',        price: 'R$47,00', platform: 'Kiwify',   score: 76, days:  9, lt: true,  niche: 'Saúde',      momentum: [15,30,44,58,70,76] },
  { id: 5, gradient: 'from-rose-600 via-pink-500 to-fuchsia-400',     product: 'Receitas Ceto 21d',    price: 'R$27,00', platform: 'Kiwify',   score: 91, days: 33, lt: true,  niche: 'Emagrecim.', momentum: [18,38,54,70,84,91] },
  { id: 6, gradient: 'from-amber-600 via-orange-500 to-yellow-400',   product: 'Método Reconquista',   price: 'R$47,00', platform: 'Hotmart',  score: 83, days: 17, lt: true,  niche: 'Relac.',     momentum: [22,40,58,68,78,83] },
];

/* ─── Gráfico mini ───────────────────────────────────────────────────────── */
function MiniChart({ data, active }: { data: number[]; active: boolean }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-px h-5">
      {data.map((v, i) => (
        <div key={i} className="w-1 rounded-sm transition-all duration-500"
          style={{ height: active ? `${(v/max)*100}%` : '8%', transitionDelay: `${i*70}ms`,
            background: active ? `hsl(${260+i*8},80%,${55+i*4}%)` : 'rgba(255,255,255,0.06)' }} />
      ))}
    </div>
  );
}

/* ─── Número animado ─────────────────────────────────────────────────────── */
function AnimNum({ target, active }: { target: number; active: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0; const step = Math.ceil(target/26);
    const t = setInterval(() => { cur = Math.min(cur+step,target); setV(cur); if(cur>=target) clearInterval(t); }, 40);
    return () => clearInterval(t);
  }, [active, target]);
  return <>{v}</>;
}

/* ─── Preço typewriter ───────────────────────────────────────────────────── */
function Price({ price, active }: { price: string; active: boolean }) {
  const [s, setS] = useState('');
  useEffect(() => {
    if (!active) { setS(''); return; }
    let i = 0;
    const t = setInterval(() => { setS(price.slice(0,i+1)); i++; if(i>=price.length) clearInterval(t); }, 50);
    return () => clearInterval(t);
  }, [active, price]);
  return <span>{s||<span className="text-zinc-600">···</span>}{s.length>0&&s.length<price.length&&<span className="animate-pulse text-cyan-400">|</span>}</span>;
}

/* ─── Card de anúncio ────────────────────────────────────────────────────── */
function AdCard({ ad, visible, scanned }: { ad: typeof ADS[0]; visible: boolean; scanned: boolean }) {
  return (
    <div className={cn(
      'group relative overflow-hidden rounded-xl border transition-all duration-700',
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
      scanned && ad.lt
        ? 'border-violet-400/50 shadow-[0_0_20px_rgba(139,92,246,0.25),inset_0_0_20px_rgba(139,92,246,0.03)]'
        : 'border-white/[0.06]',
    )} style={{ transitionDelay: `${(ad.id-1)*120}ms`, background: scanned&&ad.lt ? 'linear-gradient(135deg,rgba(139,92,246,0.07) 0%,rgba(10,10,20,0.95) 60%)' : 'rgba(255,255,255,0.02)' }}>
      {scanned && ad.lt && <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent" />}

      {/* Imagem */}
      <div className={cn('relative h-24 w-full overflow-hidden bg-gradient-to-br', ad.gradient)}>
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0a0a14] to-transparent" />
        <div className="absolute inset-x-0 top-2 flex items-center justify-between px-2">
          <span className="rounded border border-white/10 bg-black/50 px-1.5 py-px font-mono text-[8px] font-bold text-white/70 backdrop-blur-sm">{ad.platform}</span>
          <span className="rounded border border-violet-500/30 bg-violet-600/50 px-1.5 py-px font-mono text-[8px] font-bold text-violet-200 backdrop-blur-sm">{ad.niche}</span>
        </div>
        {scanned && (
          <div className={cn('absolute bottom-2 right-2 flex items-center gap-1 rounded border px-1.5 py-px font-mono text-[8px] font-bold backdrop-blur-sm transition-all duration-500', ad.days>=7 ? 'border-cyan-500/40 bg-cyan-500/20 text-cyan-300' : 'border-white/10 bg-white/10 text-white/50')}>
            {ad.days>=7?'🔥':'⏱'} {ad.days}d
          </div>
        )}
      </div>

      {/* Corpo */}
      <div className="p-3">
        <p className="mb-2 truncate text-[11px] font-semibold text-slate-200 leading-tight">{ad.product}</p>
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className={cn('font-mono text-sm font-black leading-none transition-colors duration-500', scanned&&ad.lt ? 'text-violet-300' : 'text-slate-300')}>
              <Price price={ad.price} active={scanned} />
            </p>
            {scanned && ad.lt && (
              <span className="mt-1.5 inline-flex items-center gap-1 rounded border border-violet-500/30 bg-violet-500/10 px-1.5 py-px font-mono text-[7px] font-bold text-violet-400 tracking-widest uppercase">◉ LOW TICKET</span>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <MiniChart data={ad.momentum} active={scanned} />
            <div className={cn('flex items-center gap-0.5 rounded px-1.5 py-0.5 font-mono text-[10px] font-black transition-all duration-500', scanned ? ad.score>=80 ? 'bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/20' : ad.score>=60 ? 'bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/20' : 'bg-white/5 text-zinc-400' : 'bg-white/5 text-zinc-600')}>
              <AnimNum target={scanned?ad.score:0} active={scanned} /><span className="text-[7px] opacity-60">/100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCANNER SHOWCASE
═══════════════════════════════════════════════════════════════════════════ */
export function ScannerShowcase() {
  const [visible, setVisible] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [totalScanned, setTotalScanned] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const SCAN_DURATION = 3200;
  const PAUSE = 1600;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
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
        if (p >= 1) { pausing = true; setTimeout(() => { startRef.current = 0; pausing = false; setScanProgress(0); }, PAUSE); }
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const ltFound = ADS.filter(a => a.lt && scanProgress > (a.id <= 3 ? 0.25 : 0.6)).length;
  const scanY = `${scanProgress * 100}%`;

  return (
    <section ref={sectionRef} className="border-t border-white/[0.05] bg-[#070710] py-24">
      <div className="mx-auto max-w-6xl px-5">

        {/* ── Título ── */}
        <div className={`mb-14 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-violet-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
            </span>
            Ao vivo · Biblioteca de Anúncios do Meta
          </div>
          <h2 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-white md:text-5xl">
            Veja produtos low ticket{' '}
            <span style={{ background: 'linear-gradient(135deg,#a78bfa 0%,#38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              escalando agora
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-mono text-sm text-zinc-500">
            O Hunter X escaneia cada anúncio da Biblioteca do Facebook Ads e mostra score, dias rodando e plataforma — em tempo real.
          </p>
        </div>

        {/* ── Dashboard ── */}
        <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a14] shadow-[0_0_100px_rgba(139,92,246,0.15),0_0_0_1px_rgba(139,92,246,0.05)]">
            {/* glow topo */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

            {/* URL bar */}
            <div className="flex items-center gap-3 border-b border-white/[0.05] bg-white/[0.02] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/60" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <span className="h-3 w-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.04] px-3 py-1.5">
                <span className="font-mono text-[10px] text-zinc-500">🔒</span>
                <span className="font-mono text-[10px] text-zinc-400">facebook.com/ads/library</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-violet-500/30 bg-violet-600/20 px-3 py-1.5">
                <span className="font-mono text-[10px] font-black text-violet-300 tracking-widest">HX</span>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                </span>
              </div>
            </div>

            {/* Métricas ao vivo */}
            <div className="grid grid-cols-4 divide-x divide-white/[0.05] border-b border-white/[0.05] bg-white/[0.01]">
              {[
                { label: 'ESCANEADOS', value: totalScanned.toLocaleString('pt-BR'), color: 'text-zinc-300' },
                { label: 'LOW TICKET', value: ltFound.toString(), color: 'text-violet-400' },
                { label: 'PLATAFORMAS', value: '8', color: 'text-cyan-400' },
                { label: 'SCAN', value: `${Math.round(scanProgress*100)}%`, color: 'text-violet-300' },
              ].map(m => (
                <div key={m.label} className="flex flex-col items-center py-3 px-2">
                  <span className={cn('font-mono text-lg font-black tabular-nums leading-none', m.color)}>{m.value}</span>
                  <span className="mt-1 font-mono text-[8px] tracking-widest text-zinc-600 uppercase">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Cards area */}
            <div className="relative p-4">
              {/* Scan line */}
              <div className="pointer-events-none absolute inset-x-0 z-20 transition-none" style={{ top: `calc(${scanY} + 4rem)` }}>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,1)]" />
                <div className="h-10 w-full bg-gradient-to-b from-cyan-400/10 to-transparent" />
              </div>

              {/* Grid 3 colunas */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {ADS.map((ad) => {
                  const threshold = ad.id <= 3 ? 0.22 : 0.62;
                  return <AdCard key={ad.id} ad={ad} visible={visible} scanned={scanProgress > threshold} />;
                })}
              </div>

              {/* Status bar */}
              <div className="mt-3 flex items-center justify-between border-t border-white/[0.05] pt-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
                  </span>
                  <span className="font-mono text-[9px] font-bold text-violet-400">Hunter X v2.1.0 ativo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-32 overflow-hidden rounded-full bg-white/[0.05]">
                    <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300" style={{ width: `${Math.round(scanProgress*100)}%` }} />
                  </div>
                  <span className="font-mono text-[8px] text-zinc-600 tabular-nums w-8">{Math.round(scanProgress*100)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className={`mt-12 flex flex-col items-center gap-4 transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="font-mono text-[11px] text-zinc-600">
            Score viral · dias rodando · plataforma detectada · exportação CSV · filtros em tempo real
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <a href="#planos"
              className="group relative overflow-hidden rounded-xl bg-violet-600 px-10 py-4 font-mono text-sm font-black text-white shadow-[0_0_30px_rgba(139,92,246,0.45)] transition hover:bg-violet-500 hover:shadow-[0_0_50px_rgba(139,92,246,0.65)] hover:-translate-y-0.5">
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Target className="mr-2 inline-block h-4 w-4" />
              Ver planos e começar agora →
            </a>
            <span className="font-mono text-[10px] text-zinc-600">Mensal R$29,90 · Anual R$197 · Cancele quando quiser</span>
          </div>
        </div>

      </div>
    </section>
  );
}
