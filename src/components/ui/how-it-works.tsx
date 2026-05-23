'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Globe, ExternalLink, Zap } from 'lucide-react';

/* ── mini preview: Step 1 — instalação ──────────────────────────────────── */
function InstallPreview() {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-white/[0.07] bg-[#080812] p-3">
      <div className="flex items-center gap-2 border-b border-white/[0.05] pb-2 mb-2">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500/50" />
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/50" />
          <span className="h-1.5 w-1.5 rounded-full bg-green-500/50" />
        </div>
        <span className="font-mono text-[8px] text-zinc-600">chrome://extensions</span>
      </div>
      <div className="flex items-center gap-2 rounded-md border border-violet-500/20 bg-violet-500/[0.06] px-2 py-1.5">
        <div className="flex h-5 w-5 items-center justify-center rounded bg-violet-600/80">
          <span className="font-mono text-[7px] font-black text-white">HX</span>
        </div>
        <span className="flex-1 font-mono text-[9px] text-zinc-300">Hunter X</span>
        <span className="font-mono text-[8px] text-green-400">✓ ativo</span>
      </div>
    </div>
  );
}

/* ── mini preview: Step 2 — biblioteca ──────────────────────────────────── */
function LibraryPreview() {
  const [typed, setTyped] = useState('');
  const url = 'facebook.com/ads/library';
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(url.slice(0, i + 1));
      i++;
      if (i >= url.length) clearInterval(t);
    }, 60);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-white/[0.07] bg-[#080812] p-3">
      <div className="flex items-center gap-2 rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1.5">
        <ExternalLink className="h-2.5 w-2.5 shrink-0 text-zinc-600" />
        <span className="font-mono text-[9px] text-zinc-400 truncate">
          {typed}<span className="animate-pulse text-cyan-400">|</span>
        </span>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
        </span>
        <span className="font-mono text-[8px] text-violet-400">Hunter X detectou a página</span>
      </div>
    </div>
  );
}

/* ── mini preview: Step 3 — resultados ──────────────────────────────────── */
const RESULTS = [
  { name: 'Kit Unhas Gel', price: 'R$37', days: '14d', score: 94, lt: true },
  { name: 'Detox 21 Dias', price: 'R$47', days: '21d', score: 88, lt: true },
  { name: 'Tráfego Pago',  price: 'R$197', days: '3d', score: 61, lt: false },
];

function ResultsPreview() {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setShown((p) => Math.min(p + 1, RESULTS.length)), 400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="mt-4 space-y-1.5">
      {RESULTS.map((r, i) => (
        <div
          key={r.name}
          className={`flex items-center gap-2 rounded-md border px-2.5 py-1.5 transition-all duration-500 ${
            i < shown
              ? r.lt ? 'border-violet-500/30 bg-violet-500/[0.06] opacity-100' : 'border-white/[0.05] bg-white/[0.02] opacity-100'
              : 'border-transparent opacity-0'
          }`}
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          <span className="flex-1 font-mono text-[9px] text-zinc-300 truncate">{r.name}</span>
          <span className={`font-mono text-[8px] font-bold ${r.lt ? 'text-violet-300' : 'text-zinc-500'}`}>{r.price}</span>
          <span className="font-mono text-[8px] text-cyan-400">{r.days}</span>
          <span className={`font-mono text-[8px] font-black ${r.score >= 80 ? 'text-cyan-400' : 'text-zinc-500'}`}>{r.score}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STEPS DATA
═══════════════════════════════════════════════════════════════════════════ */
const STEPS = [
  {
    n: '01',
    time: '< 2 min',
    timeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/[0.08]',
    title: 'Instale a extensão Chrome para Meta Ads',
    desc: 'Acesse a Chrome Web Store, instale o Hunter X e ative com sua chave de licença. Sem cadastro, sem dados pessoais — pronto para usar.',
    keywords: 'extensão Chrome • Meta Ads • sem cadastro',
    Preview: InstallPreview,
  },
  {
    n: '02',
    time: 'automático',
    timeColor: 'text-violet-400 border-violet-500/30 bg-violet-500/[0.08]',
    title: 'Acesse a Biblioteca de Anúncios do Facebook',
    desc: 'Abra facebook.com/ads/library normalmente. O Hunter X ativa sozinho e começa a escanear os anúncios em tempo real — sem configuração extra.',
    keywords: 'Biblioteca de Anúncios • Facebook Ads • ativa automaticamente',
    Preview: LibraryPreview,
  },
  {
    n: '03',
    time: 'em segundos',
    timeColor: 'text-green-400 border-green-500/30 bg-green-500/[0.08]',
    title: 'Encontre produtos low ticket com dias rodando',
    desc: 'Cada anúncio mostra preço, dias rodando, score viral de 0–100 e plataforma de venda. Filtre por tempo no ar e exporte os melhores em CSV.',
    keywords: 'low ticket • dias rodando • score viral • Hotmart • Kiwify',
    Preview: ResultsPreview,
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENTE
═══════════════════════════════════════════════════════════════════════════ */
export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="border-y border-white/[0.05] bg-[#0d0d1a] py-24">
      <div className="mx-auto max-w-6xl px-5">

        {/* Header */}
        <div className="mb-4 text-center">
          <span className="inline-flex items-center gap-2 rounded border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-violet-400 uppercase">
            <Zap className="h-3 w-3" /> Como instalar a extensão
          </span>
        </div>
        <h2 className="mb-3 text-center font-display text-3xl font-bold tracking-tight md:text-5xl">
          3 passos para garimpar{' '}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            anúncios do Meta em minutos.
          </span>
        </h2>
        <p className="mb-16 text-center font-mono text-sm text-zinc-500 max-w-xl mx-auto">
          Instale a extensão Chrome, acesse a Biblioteca de Anúncios do Facebook e veja produtos low ticket com dias rodando em tempo real.
        </p>

        {/* Steps */}
        <div className="relative grid gap-6 md:grid-cols-3">

          {/* Linha conectora — desktop */}
          <div className="pointer-events-none absolute inset-x-0 top-8 hidden h-px md:block">
            <div
              className="h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent transition-all duration-1000"
              style={{ opacity: visible ? 1 : 0, transitionDelay: '600ms' }}
            />
          </div>

          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className={`relative flex flex-col rounded-2xl border border-white/[0.06] bg-[#0a0a14] p-6 transition-all duration-700 hover:border-violet-500/25 hover:shadow-[0_8px_32px_rgba(139,92,246,0.08)] ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 160}ms` }}
            >
              {/* Número fantasma de fundo */}
              <span className="pointer-events-none absolute right-4 top-2 font-display text-7xl font-black text-white/[0.03] select-none leading-none">
                {step.n}
              </span>

              {/* Topo: número + badge tempo */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/25 bg-violet-500/10">
                  <span className="font-mono text-xs font-black text-violet-400">{step.n}</span>
                </div>
                <span className={`rounded border px-2 py-0.5 font-mono text-[8px] font-bold tracking-widest uppercase ${step.timeColor}`}>
                  {step.time}
                </span>
              </div>

              {/* Conteúdo */}
              <h3 className="mb-2 font-bold text-[15px] leading-snug text-white">
                {step.title}
              </h3>
              <p className="mb-3 text-[12px] leading-relaxed text-zinc-500">
                {step.desc}
              </p>

              {/* Keywords SEO visíveis (micro-copy) */}
              <div className="mb-2 flex flex-wrap gap-1">
                {step.keywords.split(' • ').map((kw) => (
                  <span key={kw} className="rounded bg-white/[0.04] px-1.5 py-px font-mono text-[8px] text-zinc-600">
                    {kw}
                  </span>
                ))}
              </div>

              {/* Mini preview */}
              <step.Preview />

              {/* Seta conectora mobile */}
              {i < STEPS.length - 1 && (
                <div className="mt-4 flex justify-center md:hidden">
                  <ArrowRight className="h-4 w-4 rotate-90 text-violet-500/30" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA de conversão */}
        <div
          className={`mt-14 flex flex-col items-center gap-4 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          {/* Prova social micro */}
          <p className="font-mono text-[11px] text-zinc-600">
            Mais de 200 afiliados e gestores de tráfego já usam •{' '}
            <span className="text-violet-400">Ativo agora na Biblioteca do Meta</span>
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#planos"
              className="group relative overflow-hidden rounded-xl bg-violet-600 px-8 py-3.5 font-mono text-sm font-black text-white shadow-[0_0_24px_rgba(139,92,246,0.4)] transition hover:bg-violet-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] hover:-translate-y-0.5"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Instalar o Hunter X no Chrome →
            </a>
            <a
              href="/download"
              className="flex items-center gap-1.5 font-mono text-[12px] text-zinc-500 transition hover:text-zinc-300"
            >
              <Globe className="h-3.5 w-3.5" />
              Ver instruções de instalação
            </a>
          </div>

          <p className="font-mono text-[10px] text-zinc-700">
            Extensão Chrome para Windows e Mac · funciona com qualquer conta do Facebook
          </p>
        </div>

      </div>
    </section>
  );
}
