import {
  Target,
  Layers,
  Flame,
  BarChart2,
  Calendar,
  Tag,
  Keyboard,
  TrendingUp,
  Heart,
  Sparkles,
  Shield,
  UserX,
  CreditCard,
  Infinity,
  Zap,
  Wrench,
  Lightbulb,
  FolderOpen,
  Lock,
  Rocket,
  Clock,
  Eye,
  XCircle,
  CheckCircle,
  ArrowRight,
  Globe,
  Download,
} from "lucide-react";
import { HeroFuturisticWrapper as HeroFuturistic } from "@/components/demo/hero-futuristic-wrapper";
import { PricingWithChart } from "@/components/ui/pricing-with-chart";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import { WaitlistForm } from "@/components/ui/waitlist-form";
import { Navbar } from "@/components/ui/navbar";
import { CosmicParallaxBg } from "@/components/ui/parallax-cosmic-background";
import { HeroScrollVideo } from "@/components/ui/hero-scroll-video";
import { OnlineCounter } from "@/components/ui/online-counter";

/* ─── Feature card data ─── */
const features = [
  { icon: Layers,     title: "Bordas coloridas por faixa",  desc: "Verde para low ticket (R$1–R$100) e laranja para mid ticket. Identificação visual instantânea.", tag: "Visual" },
  { icon: Flame,      title: "Badge de validação",          desc: "1 chama após 7 dias no ar. 2 chamas após 30 dias. Quanto mais tempo, mais validado o produto.", tag: "Validação" },
  { icon: BarChart2,  title: "Score viral 0–100",           desc: "Cada anúncio recebe uma pontuação baseada em tempo no ar, gatilhos de copy e sinais de escala.", tag: "Análise" },
  { icon: Calendar,   title: "Dias rodando visíveis",       desc: "Veja exatamente há quantos dias cada anúncio está ativo. Use o slider para filtrar por tempo.", tag: "Filtro" },
  { icon: Tag,        title: "Detecção de plataforma",      desc: "Hotmart, Kiwify, Eduzz, Monetizze, Shopee, Amazon, Shopify e mais 7 plataformas detectadas.", tag: "Inteligente" },
  { icon: Keyboard,   title: "Atalhos de teclado",          desc: "L (só low) · S (escanear) · A (auto-scroll). HUD flutuante com contadores em tempo real.", tag: "Produtividade" },
];

const nichos = [
  {
    icon: TrendingUp,
    name: "Renda Extra",
    tag: "Alta demanda",
    tagColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/[.08]",
    accent: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    glow: "hover:shadow-[0_8px_32px_rgba(34,211,238,.12)] hover:border-cyan-500/30",
    desc: "O nicho mais competitivo do digital. Quem entra primeiro no produto certo domina. O Hunter X mostra quais anúncios de renda online já estão há semanas rodando.",
  },
  {
    icon: Zap,
    name: "Saúde & Fitness",
    tag: "Perene o ano todo",
    tagColor: "text-green-400 border-green-500/30 bg-green-500/[.08]",
    accent: "from-green-500/20 via-green-500/5 to-transparent",
    glow: "hover:shadow-[0_8px_32px_rgba(34,197,94,.12)] hover:border-green-500/30",
    desc: "Emagrecimento e bem-estar nunca saem de moda. Produtos low ticket nesse nicho escalam o ano inteiro — e o Hunter X revela quais já estão convertendo.",
  },
  {
    icon: Heart,
    name: "Relacionamento",
    tag: "Alto engajamento",
    tagColor: "text-rose-400 border-rose-500/30 bg-rose-500/[.08]",
    accent: "from-rose-500/20 via-rose-500/5 to-transparent",
    glow: "hover:shadow-[0_8px_32px_rgba(244,63,94,.12)] hover:border-rose-500/30",
    desc: "Reconquista e sedução têm dos menores CPLs do digital. Alta emoção, baixo ticket — a fórmula perfeita para escalar rápido com pouco investimento.",
  },
  {
    icon: Sparkles,
    name: "Espiritualidade",
    tag: "Público fiel",
    tagColor: "text-amber-400 border-amber-500/30 bg-amber-500/[.08]",
    accent: "from-amber-500/20 via-amber-500/5 to-transparent",
    glow: "hover:shadow-[0_8px_32px_rgba(251,191,36,.12)] hover:border-amber-500/30",
    desc: "Tarô, meditação e lei da atração. Público ultra-fidelizado que compra repetidamente. Veja quais produtos desse nicho já estão rodando há meses.",
  },
];

const trust = [
  {
    icon: Shield,
    title: "Nenhum dado sai do seu PC",
    desc: "O Hunter X roda 100% no seu navegador. Nenhum anúncio que você visualiza é enviado para fora. Arquitetura local por design, não por promessa.",
    highlight: true,
  },
  {
    icon: UserX,
    title: "Zero cadastro, zero login",
    desc: "Instale e use. Sem criar conta, sem e-mail confirmado, sem formulário. Sua chave de licença é tudo que você precisa.",
    highlight: false,
  },
  {
    icon: CreditCard,
    title: "Chave no e-mail em minutos",
    desc: "Após o pagamento, sua chave de acesso chega no e-mail automaticamente. Ative na extensão e comece a garimpar na hora.",
    highlight: false,
  },
  {
    icon: Infinity,
    title: "Cancele quando quiser",
    desc: "Sem fidelidade, sem contrato, sem taxa escondida. Um clique cancela tudo. Nenhuma pergunta, nenhuma burocracia.",
    highlight: false,
  },
];

const platforms = [
  "Hotmart","Kiwify","Eduzz","Monetizze","PerfectPay",
  "Cakto","Pepper","Shopee","Mercado Livre","Amazon",
  "Shopify","Yampi","Nuvemshop","Ticto","Lastlink",
];

const beforeItems = [
  { icon: Clock,      text: "Horas garimpando manualmente cada anúncio" },
  { icon: Eye,        text: "Sem saber o preço real do produto" },
  { icon: Calendar,   text: "Sem saber há quantos dias o anúncio está rodando" },
  { icon: Target,     text: "Chutando nicho e plataforma de venda" },
  { icon: Layers,     text: "Lendo dezenas de anúncios sem padrão" },
  { icon: TrendingUp, text: "Perdendo oportunidades enquanto outros escalam" },
];

const afterItems = [
  { icon: Layers,    text: "Produtos low ticket destacados em verde automaticamente" },
  { icon: Tag,       text: "Faixa de preço identificada em cada anúncio" },
  { icon: Flame,     text: "Dias rodando com badge de validação após 7 dias" },
  { icon: Target,    text: "Nicho e plataforma detectados automaticamente" },
  { icon: BarChart2, text: "Score viral de 0 a 100 em cada anúncio" },
  { icon: Download,  text: "Exporta em CSV/JSON com 1 clique" },
];

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">

      {/* ─── ONLINE COUNTER ─── */}
      <OnlineCounter />

      {/* ─── NAV ─── */}
      <Navbar />

      {/* ─── HERO — SCROLL VIDEO ─── */}
      <HeroScrollVideo />

      <div>

      {/* ─── BEFORE / AFTER — removido ─── */}

      {/* ─── COMO FUNCIONA + PRO — compacto, 2 colunas ─── */}
      <section id="como-funciona" className="relative py-16 md:py-24 overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/[0.06] blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-6xl px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ESQUERDA — 3 passos */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/[0.08] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-violet-300 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                Em 3 passos
              </span>

              <h2 className="mb-3 font-black tracking-tight text-white leading-tight" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
                Do clique ao{" "}
                <span style={{ background: "linear-gradient(120deg,#a78bfa,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  produto validado.
                </span>
              </h2>
              <p className="mb-8 font-mono text-sm text-zinc-400 leading-relaxed">
                Sem cadastro, sem curva de aprendizado.<br />Instale e comece a garimpar em minutos.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                {[
                  { n: "01", t: "Instale a extensão", d: "Dois cliques, cola sua chave e pronto. Ninguém pede seu nome — você entra invisível." },
                  { n: "02", t: "Abra a Biblioteca do Meta", d: "Abre como sempre abriu. O Hunter X acorda sozinho e começa a ler tudo por você." },
                  { n: "03", t: "Veja o que ninguém vê", d: "Dias rodando, score viral, plataforma — se está no ar há semanas, está pagando. Exporta e vai." },
                ].map((s) => (
                  <div key={s.n} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-black text-sm" style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa" }}>
                      {s.n}
                    </span>
                    <div>
                      <p className="font-bold text-white text-[15px] leading-tight">{s.t}</p>
                      <p className="font-mono text-[12px] text-zinc-500 mt-1 leading-relaxed">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="/download" className="inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 font-mono text-sm font-black text-white transition-transform hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)", boxShadow: "0 0 30px rgba(124,58,237,0.35)" }}>
                <Download className="w-4 h-4" />
                Instalar no Chrome →
              </a>
            </div>

            {/* DIREITA — o que faz */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-4">Ferramentas pro inclusas</p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { icon: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>, t: "Baixe vídeos de anúncios", d: "Salve o criativo de qualquer anúncio em 1 clique." },
                  { icon: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>, t: "Copie o HTML completo", d: "Acesse a estrutura para decifrar copy e gatilhos." },
                  { icon: <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>, t: "Modele ofertas validadas", d: "Decompõe o anúncio em Hook, Prova, Oferta e CTA." },
                  { icon: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>, t: "Score viral 0–100", d: "Saiba quais produtos já estão escalando de verdade." },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl p-4 transition hover:-translate-y-0.5" style={{ background: "rgba(124,58,237,0.04)", border: "1px solid rgba(124,58,237,0.12)" }}>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.22)" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                    </span>
                    <div>
                      <p className="font-bold text-white text-sm leading-tight">{f.t}</p>
                      <p className="font-mono text-[11px] text-zinc-500 mt-0.5">{f.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 font-mono text-[11px] text-zinc-400 text-center">+200 afiliados e gestores de tráfego já usam · Windows e Mac</p>
            </div>

          </div>
        </div>
      </section>


      {/* ─── NICHOS — removido ─── */}

      {/* ─── TRUST ─── */}
      {/* ─── PRIVACIDADE — removido ─── */}

      {/* ─── CTA FINAL — removido ─── */}

      {/* ─── DEPOIMENTOS — removido ─── */}

      {/* ─── SITESCOPE BENEFITS — oculto no mobile ─── */}
      <section id="sitescope" className="relative border-t border-white/5 bg-[#06090d] py-10 md:py-28 overflow-hidden hidden md:block">
        {/* Atmosfera de fundo */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-cyan-500/[0.07] blur-[140px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(34,211,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-5">

          {/* Layout 2 colunas: esquerda texto, direita mock */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ESQUERDA — copy + pontos */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/[0.08] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-300 mb-4">
                <img src="/sitescope-logo.png" alt="" className="w-3.5 h-3.5 object-contain" />
                Incluso · sem custo extra
              </span>

              <h2 className="mb-3 font-black tracking-tight text-white leading-tight" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
                Espionou no Hunter X?
                <br />
                <span style={{ background: "linear-gradient(120deg,#22d3ee,#67e8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Clone no SiteScope.
                </span>
              </h2>

              <p className="mb-8 font-mono text-sm text-zinc-400 leading-relaxed">
                Editor visual que roda <strong className="text-cyan-300">100% no seu navegador.</strong><br />
                Sem instalar nada. Sem conta. Sem código.
              </p>

              {/* Pontos essenciais */}
              <div className="flex flex-col gap-3 mb-8">
                {[
                  { icon: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>, text: "Tudo pelo navegador — zero instalação extra" },
                  { icon: <><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></>, text: "Clique em qualquer texto e edite na hora" },
                  { icon: <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></>, text: "Troca imagem com 1 clique — vê o tamanho exato" },
                  { icon: <><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></>, text: "Preview mobile e desktop lado a lado" },
                  { icon: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>, text: "Baixa o HTML final pronto pra publicar" },
                  { icon: <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></>, text: "Desbloqueado automaticamente com sua licença Hunter X" },
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.18)" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{p.icon}</svg>
                    </span>
                    <span className="font-mono text-[13px] text-zinc-200">{p.text}</span>
                  </div>
                ))}
              </div>

              <a href="/sitescope" className="inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 font-mono text-sm font-black transition-transform hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg,#0891b2,#22d3ee)", color: "#06090d", boxShadow: "0 0 30px rgba(34,211,238,0.3)" }}>
                <img src="/sitescope-logo.png" alt="" className="w-4 h-4 object-contain" />
                Abrir o SiteScope →
              </a>
            </div>

            {/* DIREITA — mock do editor */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-cyan-500/5 blur-2xl pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20" style={{ background: "#0a0f14" }}>
                {/* barra browser */}
                <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                  <span className="ml-3 flex items-center gap-1.5 rounded-md bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-cyan-300/70">
                    <img src="/sitescope-logo.png" alt="" className="w-3 h-3 object-contain" />
                    sitescope · editor visual
                  </span>
                </div>
                {/* conteúdo mockado */}
                <div className="relative p-6 min-h-[300px]">
                  <div className="relative mb-4 inline-block">
                    <div className="rounded px-3 py-1.5 ring-2 ring-cyan-400/60" style={{ background: "rgba(34,211,238,0.08)" }}>
                      <span className="font-black text-lg text-white">Sua headline aqui</span>
                    </div>
                    <span className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full border-2 border-[#0a0f14] bg-cyan-400" />
                    <span className="absolute -top-7 left-0 rounded px-1.5 py-0.5 font-mono text-[9px] font-bold" style={{ background: "#22d3ee", color: "#06090d" }}>texto</span>
                  </div>
                  <div className="mb-4 h-2 w-3/4 rounded-full bg-white/[0.06]" />
                  <div className="mb-6 h-2 w-1/2 rounded-full bg-white/[0.06]" />
                  <div className="mb-5 flex h-20 w-36 items-center justify-center rounded-lg border border-dashed border-cyan-400/30" style={{ background: "rgba(34,211,238,0.04)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                  </div>
                  <div className="inline-block rounded-lg px-5 py-2 font-mono text-xs font-bold" style={{ background: "linear-gradient(135deg,#0891b2,#22d3ee)", color: "#06090d" }}>Comprar agora</div>
                  {/* cursor */}
                  <svg className="absolute right-8 top-16 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" width="22" height="22" viewBox="0 0 24 24" fill="#22d3ee" stroke="#0a0f14" strokeWidth="1">
                    <path d="M5 3l5 16 2.5-6.5L19 10z" />
                  </svg>
                </div>
                <div className="border-t border-white/[0.06] px-6 py-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-zinc-600">O que você vê é o que você baixa.</span>
                  <span className="font-mono text-[10px] font-bold text-cyan-400">100% no navegador</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── HISTÓRICO + CAPTURA ─── */}
      <section id="lista" className="relative md:border-t border-white/5 bg-[#06060e] py-10 md:py-20 overflow-hidden">
        {/* efeito de fundo igual ao hero */}
        <div className="pointer-events-none absolute inset-0">
          {/* base roxa do chão */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 130% 80% at 50% 110%, rgba(110,30,230,0.45) 0%, transparent 60%)" }} />
          {/* god ray central */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[180px] h-full" style={{ background: "linear-gradient(to top, rgba(180,80,255,0.6) 0%, rgba(140,50,255,0.25) 30%, transparent 70%)", filter: "blur(30px)", animation: "rayBurst 3s ease-in-out infinite" }} />
          {/* metade esquerda roxa */}
          <div className="absolute inset-y-0 left-0 w-1/2" style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.3) 0%, transparent 100%)", filter: "blur(40px)", animation: "lightPulse 4s ease-in-out infinite" }} />
          {/* metade direita ciano */}
          <div className="absolute inset-y-0 right-0 w-1/2" style={{ background: "linear-gradient(270deg, rgba(34,211,238,0.25) 0%, transparent 100%)", filter: "blur(40px)", animation: "lightPulse 4s ease-in-out infinite 2s" }} />
          {/* cantos inferiores */}
          <div className="absolute bottom-0 left-0 w-72 h-48 blur-[50px]" style={{ background: "radial-gradient(ellipse at bottom left, rgba(124,58,237,0.35) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-0 w-72 h-48 blur-[50px]" style={{ background: "radial-gradient(ellipse at bottom right, rgba(34,211,238,0.25) 0%, transparent 70%)" }} />
          {/* vinheta */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 50%, rgba(4,4,12,0.7) 100%)" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* ── ESQUERDA: pricing timeline ── */}
            <div className="hidden lg:flex flex-col gap-5">

              {/* header */}
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.06] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-violet-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  Fase 4 · A porta está aberta
                </div>
                <h2 className="text-[2.6rem] font-black text-white tracking-[-0.03em] leading-[1.0]">
                  Cada porta que fecha,<br />
                  <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    fecha com o preço dentro.
                  </span>
                </h2>
                <p className="mt-2.5 text-[13px] text-zinc-500 leading-relaxed max-w-xs">
                  Quem cruzou a primeira porta paga <span className="text-zinc-300">$5.90 até hoje</span> — e nunca vai pagar mais.<br/>
                  A porta aberta agora custa <span className="text-violet-300 font-semibold">$12.90/mês</span>. Depois dela, só a névoa.
                </p>
              </div>

              {/* gráfico premium */}
              <div className="relative rounded-2xl overflow-hidden" style={{ background: "linear-gradient(145deg,#0c0a18,#080612)", border: "1px solid rgba(124,58,237,0.18)" }}>
                {/* grid sutil */}
                <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "60px 40px" }} />
                <div className="px-5 pt-4 pb-1 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-[0.15em]">Evolução de preço</span>
                  <span className="font-mono text-[9px] text-violet-500 font-bold">Jan 2024 → Hoje</span>
                </div>
                <svg viewBox="0 0 460 150" className="w-full" style={{ height: 130 }}>
                  <defs>
                    <linearGradient id="areag" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.22"/>
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
                    </linearGradient>
                    <linearGradient id="lineg" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#22d3ee"/>
                      <stop offset="100%" stopColor="#a78bfa"/>
                    </linearGradient>
                    <filter id="gl2">
                      <feGaussianBlur stdDeviation="2.5" result="b"/>
                      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>
                  {/* linhas horizontais */}
                  {[18,48,78,108,132].map((y,i) => (
                    <line key={i} x1="46" y1={y} x2="430" y2={y} stroke="rgba(255,255,255,0.035)" strokeWidth="1"/>
                  ))}
                  {/* labels Y */}
                  {([["$19.90",18],["$12.90",48],["$9.90",78],["$7.90",108],["$5.90",132]] as [string,number][]).map(([l,y]) => (
                    <text key={l} x="2" y={y+4} fontSize="7.5" fill="rgba(113,113,122,0.45)" fontFamily="monospace">{l}</text>
                  ))}
                  {/* área */}
                  <path d="M62,132 L140,108 L228,78 L316,48 L400,18 L400,140 L62,140 Z" fill="url(#areag)"/>
                  {/* sombra linha */}
                  <path d="M62,132 L140,108 L228,78 L316,48 L400,18" fill="none" stroke="#7c3aed" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.1"/>
                  {/* linha */}
                  <path d="M62,132 L140,108 L228,78 L316,48 L400,18" fill="none" stroke="url(#lineg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#gl2)"/>
                  {/* projeção fase 5 */}
                  <path d="M400,18 L450,-8" fill="none" stroke="rgba(167,139,250,0.2)" strokeWidth="1.5" strokeDasharray="4,4"/>
                  {/* pontos encerrados */}
                  {([[62,132],[140,108],[228,78]] as [number,number][]).map(([x,y],i) => (
                    <g key={i}>
                      <circle cx={x} cy={y} r="4" fill="#22c55e" stroke="#080612" strokeWidth="2"/>
                    </g>
                  ))}
                  {/* ponto atual */}
                  <circle cx="316" cy="48" r="6" fill="#7c3aed" stroke="#080612" strokeWidth="2" filter="url(#gl2)"/>
                  <circle cx="316" cy="48" r="6" fill="none" stroke="#a78bfa" strokeWidth="1.5" opacity="0.6">
                    <animate attributeName="r" from="6" to="16" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  {/* tag atual */}
                  <rect x="322" y="33" width="68" height="16" rx="3.5" fill="rgba(124,58,237,0.3)" stroke="rgba(167,139,250,0.4)" strokeWidth="1"/>
                  <text x="327" y="44.5" fontSize="8" fill="#c4b5fd" fontFamily="monospace" fontWeight="bold">$12.90 AGORA</text>
                  {/* X labels */}
                  {([["Jan'24",46],["Mai'24",122],["Nov'24",210],["Jun'25",300]] as [string,number][]).map(([l,x]) => (
                    <text key={l} x={x} y="148" fontSize="7" fill="rgba(113,113,122,0.35)" fontFamily="monospace">{l}</text>
                  ))}
                </svg>
              </div>

              {/* O corredor das fases — 3 portas fechadas, 1 aberta */}
              <div className="relative rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(124,58,237,0.18)" }}>
                <img
                  src="/fases-corredor.jpg"
                  alt="Corredor com três cofres lacrados e um aberto — a Fase 4"
                  className="w-full h-auto block"
                  style={{ animation: "keyDrift 20s ease-in-out infinite alternate" }}
                />
                {/* pulso dourado na porta aberta */}
                <div className="pointer-events-none absolute" style={{
                  left: "52%", top: "18%", width: "30%", height: "64%",
                  background: "radial-gradient(ellipse, rgba(255,200,90,0.35) 0%, transparent 70%)",
                  mixBlendMode: "screen", filter: "blur(10px)",
                  animation: "keyPulse 4s ease-in-out infinite",
                }} />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16" style={{ background: "linear-gradient(to top, rgba(6,6,14,0.95), transparent)" }} />
                <p className="absolute bottom-2.5 left-0 right-0 text-center font-mono text-[9px] font-black uppercase tracking-[0.35em] text-zinc-400">
                  Três lacradas · Uma aberta · Depois, a névoa
                </p>
                <style>{`
                  @keyframes keyPulse {
                    0%, 100% { opacity: 0.4; transform: scale(0.97); }
                    50%       { opacity: 1;   transform: scale(1.04); }
                  }
                  @keyframes keyDrift {
                    from { transform: scale(1); }
                    to   { transform: scale(1.05); }
                  }
                `}</style>
              </div>

              {/* fases — timeline vertical compacta */}
              <div className="relative flex flex-col">
                {/* linha vertical */}
                <div className="absolute left-[18px] top-4 bottom-4 w-px" style={{ background: "linear-gradient(to bottom,rgba(34,197,94,0.5),rgba(124,58,237,0.6),rgba(63,63,70,0.15))" }}/>

                {([
                  { fase: 1, price: "$5.90",  date: "Jan 2024", vagas: "200 vagas", status: "done" },
                  { fase: 2, price: "$7.90",  date: "Mai 2024", vagas: "230 vagas", status: "done" },
                  { fase: 3, price: "$9.90",  date: "Nov 2024", vagas: "260 vagas", status: "done" },
                  { fase: 4, price: "$12.90", date: "Jun 2025", vagas: "230 vagas", status: "live" },
                  { fase: 5, price: "$19.90", date: "Em breve", vagas: null,        status: "next" },
                ] as { fase: number; price: string; date: string; vagas: string | null; status: string }[]).map((f) => (
                  <div key={f.fase} className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                    f.status === "live" ? "my-1" : ""
                  }`} style={
                    f.status === "live" ? { background: "linear-gradient(135deg,rgba(124,58,237,0.1),rgba(124,58,237,0.04))", border: "1px solid rgba(124,58,237,0.3)", boxShadow: "0 0 30px rgba(124,58,237,0.08),inset 0 1px 0 rgba(167,139,250,0.08)" } :
                    f.status === "next" ? { opacity: 0.3 } : {}
                  }>
                    {/* dot */}
                    <span className={`relative z-10 flex-shrink-0 w-[9px] h-[9px] rounded-full ml-[10px] ${
                      f.status === "done" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.7)]" :
                      f.status === "live" ? "bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,1)]" :
                      "bg-zinc-700"
                    }`}/>

                    {/* fase label */}
                    <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest w-10 shrink-0">F{f.fase}</span>

                    {/* preço */}
                    <span className={`font-black text-base tracking-tight shrink-0 ${
                      f.status === "live" ? "text-white" :
                      f.status === "next" ? "text-zinc-600" :
                      "text-zinc-600 line-through decoration-zinc-700/60"
                    }`}>{f.price}<span className="text-[9px] font-normal text-zinc-600 ml-0.5">/mês</span></span>

                    {/* data */}
                    <span className="font-mono text-[10px] text-zinc-600 flex-1">{f.date}</span>

                    {/* status badge */}
                    <span className={`font-mono text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border shrink-0 ${
                      f.status === "live" ? "text-violet-300 border-violet-500/40 bg-violet-500/15" :
                      f.status === "next" ? "text-zinc-700 border-zinc-800/60" :
                      "text-green-800 border-green-900/30 bg-green-900/[0.06]"
                    }`}>
                      {f.status === "live" ? "● Aberta" : f.status === "next" ? "Em breve" : "Encerrada"}
                    </span>

                    {f.status === "live" && <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent"/>}
                  </div>
                ))}
              </div>

              {/* stats + aviso */}
              <div className="flex items-center gap-3">
                {[["3", "portas lacradas"],["$12.90","a porta aberta"],["$19.90","depois da névoa"]].map(([v,l]) => (
                  <div key={l} className="flex-1 rounded-xl py-3 text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <p className="font-black text-white text-lg tracking-tight">{v}</p>
                    <p className="font-mono text-[8px] text-zinc-600 mt-0.5 uppercase tracking-wider">{l}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl px-4 py-3 flex items-start gap-3" style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.15)" }}>
                <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <p className="font-mono text-[11px] text-zinc-400 leading-relaxed">
                  O preço da porta que você cruza é <span className="text-violet-300 font-bold">seu para sempre.</span>{" "}
                  Ninguém avisa quando ela fecha. As três primeiras fecharam sem aviso — essa não vai ser diferente.
                </p>
              </div>

            </div>

            {/* ── DIREITA: formulário ── */}
            <div className="lg:pt-8">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">

                {/* A Chave — a mão do goblin entregando */}
                <div className="relative h-52 md:h-60 overflow-hidden">
                  <img
                    src="/key-goblin.jpg"
                    alt="A chave de acesso, entregue pelo goblin"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: "50% 32%", animation: "keyDrift 18s ease-in-out infinite alternate" }}
                  />
                  {/* pulso de energia sobre a chave */}
                  <div className="pointer-events-none absolute" style={{
                    left: "42%", top: "12%", width: "42%", height: "80%",
                    background: "radial-gradient(ellipse, rgba(120,200,255,0.35) 0%, rgba(167,80,255,0.2) 45%, transparent 70%)",
                    mixBlendMode: "screen", filter: "blur(8px)",
                    animation: "keyPulse 3.5s ease-in-out infinite",
                  }} />
                  {/* fade para o card */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24" style={{ background: "linear-gradient(to top, #0a0a15, transparent)" }} />
                  {/* legenda */}
                  <p className="absolute bottom-3 left-0 right-0 text-center font-mono text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">
                    Forjada para poucos
                  </p>
                  <style>{`
                    @keyframes keyPulse {
                      0%, 100% { opacity: 0.4; transform: scale(0.97); }
                      50%       { opacity: 1;   transform: scale(1.04); }
                    }
                    @keyframes keyDrift {
                      from { transform: scale(1); }
                      to   { transform: scale(1.06); }
                    }
                  `}</style>
                </div>

                <div className="p-8 pt-6">
                {/* badge */}
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  </span>
                  Acesso Exclusivo
                </div>

                <h2 className="mb-2 text-3xl font-black uppercase tracking-tight text-white leading-tight">
                  Garanta seu<br />
                  <span style={{ background: "linear-gradient(135deg,#a78bfa,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    acesso exclusivo
                  </span>
                </h2>
                <p className="mb-6 font-mono text-sm text-zinc-300">
                  Vagas limitadas. Receba sua chave de acesso por email e comece a garimpar agora.
                </p>

                <WaitlistForm />

                <div className="mt-5 flex items-start gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <p className="font-mono text-[11px] text-zinc-300 leading-relaxed">
                    Se houver vaga disponível, você receberá um email com sua chave de acesso em minutos.
                  </p>
                </div>

                <p className="mt-3 font-mono text-[10px] text-zinc-400 text-center">Zero spam · Cancele quando quiser</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/5 bg-[#080810]">
        {/* Newsletter bar */}
        <div className="border-b border-white/5 py-10">
          <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-mono text-xs font-black tracking-[0.3em] text-violet-400 uppercase mb-1">Fique por dentro</p>
              <p className="text-sm text-zinc-400">Saiba quando a próxima fase abre — antes de todo mundo.</p>
            </div>
            <form className="flex w-full max-w-sm gap-2" action="#">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 font-mono"
              />
              <button
                type="submit"
                className="bg-white text-black font-black text-xs tracking-widest px-5 py-3 hover:bg-violet-400 transition-colors"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="mx-auto max-w-6xl px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Col 1 - Produto */}
          <div>
            <p className="font-mono text-xs font-black tracking-[0.25em] text-zinc-500 uppercase mb-5">Produto</p>
            <ul className="space-y-3">
              {[
                { label: "Início", href: "#hero" },
                { label: "Download", href: "/download" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-zinc-400 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 - Acesso */}
          <div>
            <p className="font-mono text-xs font-black tracking-[0.25em] text-zinc-500 uppercase mb-5">Acesso</p>
            <ul className="space-y-3">
              {[
                { label: "Lista VIP", href: "#lista" },
                { label: "Fase atual", href: "/fases" },
                { label: "Histórico de fases", href: "#" },
                { label: "Minha chave", href: "#lista" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-zinc-400 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Suporte */}
          <div>
            <p className="font-mono text-xs font-black tracking-[0.25em] text-zinc-500 uppercase mb-5">Suporte</p>
            <ul className="space-y-3">
              {[
                { label: "Contato", href: "mailto:suporte@hunterx.site" },
                { label: "Como instalar", href: "#" },
                { label: "Política de privacidade", href: "/privacidade" },
                { label: "Termos de uso", href: "/privacidade" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-zinc-400 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - Sobre */}
          <div>
            <p className="font-mono text-xs font-black tracking-[0.25em] text-zinc-500 uppercase mb-5">Hunter X</p>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Extensão Chrome para escanear a Biblioteca de Anúncios do Meta em tempo real. Encontre produtos validados antes de todo mundo.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6">
          <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Target className="h-4 w-4 text-violet-500" />
              <span className="font-mono text-xs text-zinc-500">© 2026 Hunter X · v2.1.0</span>
            </div>
            <p className="font-mono text-xs text-zinc-700 text-center">
              Não afiliado, endossado ou patrocinado pelo Meta Platforms, Inc.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com" className="text-zinc-600 hover:text-violet-400 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://twitter.com" className="text-zinc-600 hover:text-violet-400 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      </div>{/* fim do wrapper z-10 */}
    </main>
  );
}
