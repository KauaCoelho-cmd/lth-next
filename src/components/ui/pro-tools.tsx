'use client';

import { useEffect, useRef, useState } from 'react';
import { Download, Code2, Sparkles, ArrowRight } from 'lucide-react';

/* ─── 1. Preview: Download de vídeo ─────────────────────────────────────── */
function VideoDownloadPreview({ active }: { active: boolean }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [speed, setSpeed] = useState('0 MB/s');

  useEffect(() => {
    if (!active) { setProgress(0); setDone(false); setSpeed('0 MB/s'); return; }
    setDone(false);
    let p = 0;
    const speeds = ['1.2 MB/s', '2.8 MB/s', '3.4 MB/s', '4.1 MB/s', '3.9 MB/s'];
    let si = 0;
    const t = setInterval(() => {
      p = Math.min(p + Math.random() * 4 + 2, 100);
      setProgress(p);
      setSpeed(speeds[si++ % speeds.length]);
      if (p >= 100) { clearInterval(t); setDone(true); }
    }, 80);
    return () => clearInterval(t);
  }, [active]);

  return (
    <div className="flex flex-col gap-3">
      {/* Thumbnail */}
      <div className="relative overflow-hidden rounded-lg bg-[#0d0d1a] border border-white/[0.06] aspect-video flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 to-cyan-900/20" />
        {/* fake video frames */}
        <div className="absolute inset-0 flex">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-1 border-r border-white/[0.03] last:border-0" />
          ))}
        </div>
        {/* play icon */}
        <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500 ${done ? 'border-cyan-400/50 bg-cyan-500/20' : 'border-white/20 bg-white/5'}`}>
          {done
            ? <span className="font-mono text-[10px] font-black text-cyan-400">✓</span>
            : <div className="h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-white/60 ml-0.5" />
          }
        </div>
        {/* timecode */}
        <span className="absolute bottom-1.5 right-2 font-mono text-[8px] text-white/40">0:28</span>
        {/* META badge */}
        <span className="absolute top-1.5 left-2 rounded bg-blue-600/60 px-1.5 py-px font-mono text-[7px] font-bold text-white/80">META AD</span>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] text-zinc-500">
            {done ? 'video_anuncio_14d.mp4' : 'baixando...'}
          </span>
          <span className={`font-mono text-[9px] font-bold tabular-nums transition-colors ${done ? 'text-cyan-400' : 'text-zinc-400'}`}>
            {done ? '✓ 100%' : `${Math.round(progress)}%`}
          </span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] text-zinc-600">12.4 MB</span>
          <span className="font-mono text-[8px] text-zinc-600">{done ? '—' : speed}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── 2. Preview: Copiar HTML ────────────────────────────────────────────── */
const HTML_LINES = [
  { indent: 0, tag: '<div', attr: ' class="ad-card"', close: '>' },
  { indent: 1, tag: '<video', attr: ' src="ad.mp4"', close: ' />' },
  { indent: 1, tag: '<h2', attr: ' class="headline"', close: '>' },
  { indent: 2, tag: '"Perca 10kg em 21 dias"', attr: '', close: '' },
  { indent: 1, tag: '</h2>', attr: '', close: '' },
  { indent: 1, tag: '<span', attr: ' class="price"', close: '>' },
  { indent: 2, tag: 'R$47,00', attr: '', close: '' },
  { indent: 1, tag: '</span>', attr: '', close: '' },
  { indent: 0, tag: '</div>', attr: '', close: '' },
];

function CopyHtmlPreview({ active }: { active: boolean }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!active) { setVisibleLines(0); setCopied(false); return; }
    let i = 0;
    const t = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= HTML_LINES.length) {
        clearInterval(t);
        setTimeout(() => setCopied(true), 400);
      }
    }, 140);
    return () => clearInterval(t);
  }, [active]);

  return (
    <div className="flex flex-col gap-2">
      {/* Terminal */}
      <div className="relative overflow-hidden rounded-lg border border-white/[0.07] bg-[#080812] p-3 font-mono text-[9px] leading-5 min-h-[120px]">
        {/* line numbers */}
        <div className="absolute inset-y-0 left-0 w-6 border-r border-white/[0.04] bg-white/[0.01]" />
        <div className="pl-7 space-y-0">
          {HTML_LINES.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="flex">
              <span className="absolute left-1 text-zinc-700 select-none w-4 text-right">{i + 1}</span>
              <span style={{ paddingLeft: `${line.indent * 10}px` }}>
                <span className="text-cyan-400">{line.tag}</span>
                <span className="text-violet-300">{line.attr}</span>
                <span className="text-cyan-400">{line.close}</span>
              </span>
            </div>
          ))}
          {/* cursor */}
          {visibleLines < HTML_LINES.length && (
            <span className="inline-block h-3 w-1.5 animate-pulse bg-cyan-400" />
          )}
        </div>
      </div>

      {/* Botão copiar */}
      <button
        className={`flex w-full items-center justify-center gap-2 rounded-lg border py-2 font-mono text-[10px] font-bold transition-all duration-400 ${
          copied
            ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400'
            : 'border-white/[0.07] bg-white/[0.03] text-zinc-500'
        }`}
      >
        <Code2 className="h-3 w-3" />
        {copied ? '✓ HTML copiado!' : 'Copiar HTML'}
      </button>
    </div>
  );
}

/* ─── 3. Preview: Modelar oferta ─────────────────────────────────────────── */
const OFFER_PARTS = [
  { label: 'HOOK', text: 'Perca 10kg em 21 dias', color: 'text-violet-400', border: 'border-violet-500/30', bg: 'bg-violet-500/8' },
  { label: 'PROVA', text: '14 dias no ar · 88 score', color: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/8' },
  { label: 'OFERTA', text: 'R$47 · Kiwify', color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/8' },
  { label: 'CTA', text: 'Quero começar hoje →', color: 'text-indigo-400', border: 'border-indigo-500/30', bg: 'bg-indigo-500/8' },
];

function OfferModelPreview({ active }: { active: boolean }) {
  const [revealed, setRevealed] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!active) { setRevealed(0); setCopied(false); return; }
    let i = 0;
    const t = setInterval(() => {
      i++;
      setRevealed(i);
      if (i >= OFFER_PARTS.length) {
        clearInterval(t);
        setTimeout(() => setCopied(true), 500);
      }
    }, 300);
    return () => clearInterval(t);
  }, [active]);

  return (
    <div className="flex flex-col gap-2">
      {/* Anatomia do anúncio */}
      <div className="space-y-1.5">
        {OFFER_PARTS.map((p, i) => (
          <div
            key={p.label}
            className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 transition-all duration-500 ${p.border} ${p.bg} ${
              i < revealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
            }`}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <span className={`w-10 shrink-0 font-mono text-[8px] font-black tracking-widest uppercase ${p.color}`}>
              {p.label}
            </span>
            <div className="h-3 w-px bg-white/[0.08] shrink-0" />
            <span className="font-mono text-[9px] text-zinc-300 truncate">{p.text}</span>
          </div>
        ))}
      </div>

      {/* Usar como modelo */}
      <button
        className={`flex w-full items-center justify-center gap-2 rounded-lg border py-2 font-mono text-[10px] font-bold transition-all duration-400 ${
          copied
            ? 'border-violet-500/40 bg-violet-500/10 text-violet-400'
            : 'border-white/[0.07] bg-white/[0.03] text-zinc-500'
        }`}
      >
        <Sparkles className="h-3 w-3" />
        {copied ? '✓ Modelo copiado!' : 'Usar como modelo'}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SEÇÃO PRINCIPAL
═══════════════════════════════════════════════════════════════════════════ */
const TOOLS = [
  {
    id: 'video',
    icon: Download,
    title: 'Baixe vídeos de anúncios do Meta',
    desc: 'Salve o vídeo de qualquer anúncio da Biblioteca do Facebook Ads em um clique. Estude criativos que estão dias rodando sem precisar copiar link.',
    tag: 'Download · 1 clique',
    tagColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/8',
    Preview: VideoDownloadPreview,
  },
  {
    id: 'html',
    icon: Code2,
    title: 'Copie o HTML de anúncios do Facebook',
    desc: 'Acesse a estrutura HTML completa de anúncios da Biblioteca do Meta para decifrar a copy e os gatilhos de produtos que estão escalando.',
    tag: 'HTML · Facebook Ads',
    tagColor: 'text-violet-400 border-violet-500/30 bg-violet-500/8',
    Preview: CopyHtmlPreview,
  },
  {
    id: 'offer',
    icon: Sparkles,
    title: 'Modele ofertas de produtos low ticket',
    desc: 'O Hunter X decompõe qualquer anúncio validado em Hook, Prova, Oferta e CTA — use como base para criar produtos low ticket que já têm mercado.',
    tag: 'Low ticket · Oferta',
    tagColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/8',
    Preview: OfferModelPreview,
  },
];

export function ProTools() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Ativa o primeiro card quando a seção entra no viewport
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveId('video'); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="border-t border-white/[0.05] bg-[#0a0a14] py-24">
      <div className="mx-auto max-w-6xl px-5">

        {/* Header */}
        <div className="mb-4 text-center">
          <span className="inline-flex items-center gap-2 rounded border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-violet-400 uppercase">
            <Sparkles className="h-3 w-3" /> Extensão Chrome · Ferramentas pro
          </span>
        </div>
        <h2 className="mb-4 text-center font-display text-3xl font-bold tracking-tight md:text-5xl">
          Baixe, copie e modele{' '}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            anúncios da Biblioteca do Meta.
          </span>
        </h2>
        <p className="mb-16 text-center font-mono text-sm text-zinc-500 max-w-lg mx-auto">
          Do vídeo do anúncio ao HTML completo — extraia dados de anúncios do Facebook Ads sem sair da Biblioteca de Anúncios.
        </p>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {TOOLS.map((tool) => {
            const isActive = activeId === tool.id;
            return (
              <div
                key={tool.id}
                onClick={() => setActiveId(tool.id)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
                  isActive
                    ? 'border-violet-500/30 bg-violet-500/[0.04] shadow-[0_0_40px_rgba(139,92,246,0.1)]'
                    : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.03]'
                }`}
              >
                {/* Linha de glow no topo */}
                <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />

                {/* Ícone + tag */}
                <div className="mb-4 flex items-start justify-between">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-300 ${isActive ? 'border-violet-500/40 bg-violet-500/15' : 'border-white/[0.07] bg-white/[0.04]'}`}>
                    <tool.icon className={`h-4 w-4 transition-colors duration-300 ${isActive ? 'text-violet-400' : 'text-zinc-500'}`} />
                  </div>
                  <span className={`rounded border px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest uppercase transition-all duration-300 ${isActive ? tool.tagColor : 'border-white/[0.06] bg-white/[0.03] text-zinc-600'}`}>
                    {tool.tag}
                  </span>
                </div>

                {/* Preview animado */}
                <div className="mb-4">
                  <tool.Preview active={isActive} />
                </div>

                {/* Texto */}
                <div className="border-t border-white/[0.05] pt-4">
                  <h3 className={`mb-1.5 font-bold text-sm leading-snug transition-colors ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                    {tool.title}
                  </h3>
                  <p className="text-[12px] leading-relaxed text-zinc-500">
                    {tool.desc}
                  </p>
                </div>

                {/* Indicador clicável */}
                {!isActive && (
                  <div className="mt-3 flex items-center gap-1 font-mono text-[9px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>ver em ação</span>
                    <ArrowRight className="h-2.5 w-2.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
