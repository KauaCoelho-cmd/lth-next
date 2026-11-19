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
import { HunterLogo } from "@/components/ui/hunter-logo";

/* ─── Feature card data ─── */
const features = [
  { icon: Layers,     title: "Bordas coloridas por faixa",  desc: "Verde para low ticket (R$1–R$100) e laranja para mid ticket. Identificação visual instantânea.", tag: "Visual" },
  { icon: Flame,      title: "Badge de validação",          desc: "1 chama após 7 dias no ar. 2 chamas após 30 dias. Quanto mais tempo, mais validado o produto.", tag: "Validação" },
  { icon: BarChart2,  title: "Score viral 0–100",           desc: "Cada anúncio recebe uma pontuação baseada em tempo no ar, gatilhos de copy e sinais de escala.", tag: "Análise" },
  { icon: Calendar,   title: "Dias rodando visíveis",       desc: "Veja exatamente há quantos dias cada anúncio está ativo. Use o slider para filtrar por tempo.", tag: "Filtro" },
  { icon: Tag,        title: "Detecção de plataforma",      desc: "Hotmart, Kiwify, Eduzz, Monetizze, Shopee, Amazon, Shopify e mais 7 plataformas detectadas.", tag: "Inteligente" },
  { icon: Keyboard,   title: "Atalhos de teclado",          desc: "L (só low) · S (escanear) · A (auto-scroll). HUD flutuante com contadores em tempo real.", tag: "Produtividade" },
];

const platforms = [
  "Hotmart","Kiwify","Eduzz","Monetizze","PerfectPay",
  "Cakto","Pepper","Shopee","Mercado Livre","Amazon",
  "Shopify","Yampi","Nuvemshop","Ticto","Lastlink",
];

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-[#fbf7ef]">

      {/* ─── ONLINE COUNTER ─── */}
      <OnlineCounter />

      {/* ─── NAV ─── */}
      <Navbar />

      {/* ─── HERO — SCROLL VIDEO ─── */}
      <HeroScrollVideo />

      <div>

      {/* ─── COMO FUNCIONA ─── */}
      <section id="como-funciona" className="relative py-16 md:py-24 bg-[#fbf7ef] overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-amber-50 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-6xl px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ESQUERDA — 3 passos */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#e8d6a8] bg-amber-50 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#9a7b3f] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Em 3 passos
              </span>

              <h2 className="mb-3 font-black tracking-tight text-[#2b2418] leading-tight" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
                Do clique ao{" "}
                <span className="text-[#9a7b3f]">produto validado.</span>
              </h2>
              <p className="mb-8 font-mono text-sm text-[#7a6a4f] leading-relaxed">
                Sem cadastro, sem curva de aprendizado.<br />Instale e comece a garimpar em minutos.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                {[
                  { n: "01", t: "Instale a extensão", d: "Dois cliques, cola sua chave e pronto. Ninguém pede seu nome — você entra invisível." },
                  { n: "02", t: "Abra a biblioteca de anúncios", d: "Abre como sempre abriu. O Hunter X acorda sozinho e começa a ler tudo por você." },
                  { n: "03", t: "Veja o que ninguém vê", d: "Dias rodando, score viral, plataforma — se está no ar há semanas, está pagando. Exporta e vai." },
                ].map((s) => (
                  <div key={s.n} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-black text-sm bg-amber-50 border border-amber-50 text-[#9a7b3f]">
                      {s.n}
                    </span>
                    <div>
                      <p className="font-bold text-[#2b2418] text-[15px] leading-tight">{s.t}</p>
                      <p className="font-mono text-[12px] text-[#7a6a4f] mt-1 leading-relaxed">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="/download" className="inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 font-mono text-sm font-black text-white transition-transform hover:-translate-y-0.5 bg-[#2b2418] hover:bg-[#3d3322]">
                <Download className="w-4 h-4" />
                Instalar no navegador →
              </a>
            </div>

            {/* DIREITA — ferramentas pro */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9a8a6c] mb-4">Ferramentas pro inclusas</p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { icon: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>, t: "Baixe vídeos de anúncios", d: "Salve o criativo de qualquer anúncio em 1 clique." },
                  { icon: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>, t: "Estude o HTML completo", d: "Decifre a estrutura, a copy e os gatilhos que convertem." },
                  { icon: <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>, t: "Modele ofertas validadas", d: "Decompõe o anúncio em Hook, Prova, Oferta e CTA." },
                  { icon: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>, t: "Score viral 0–100", d: "Saiba quais produtos já estão escalando de verdade." },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl p-4 transition hover:-translate-y-0.5 bg-[#f3ebdc] border border-[#ece1cb] hover:border-[#e2d4b8]">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fbf7ef] border border-[#e2d4b8]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9a7b3f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                    </span>
                    <div>
                      <p className="font-bold text-[#2b2418] text-sm leading-tight">{f.t}</p>
                      <p className="font-mono text-[11px] text-[#7a6a4f] mt-0.5">{f.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 font-mono text-[11px] text-[#9a8a6c] text-center">+200 afiliados e gestores de tráfego já usam · Windows e Mac</p>
            </div>

          </div>
        </div>
      </section>


      {/* ─── SITESCOPE BENEFITS ─── */}
      <section id="sitescope" className="relative border-t border-[#ece1cb] bg-[#f3ebdc] py-10 md:py-28 overflow-hidden hidden md:block">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-amber-50 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-6xl px-5">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ESQUERDA — copy + pontos */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#e8d6a8] bg-amber-50 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#9a7b3f] mb-4">
                <img src="/sitescope-logo.png" alt="" className="w-3.5 h-3.5 object-contain mix-blend-multiply" />
                Incluso · sem custo extra
              </span>

              <h2 className="mb-3 font-black tracking-tight text-[#2b2418] leading-tight" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
                Achou a página vencedora?
                <br />
                <span className="text-[#9a7b3f]">Modele a sua no SiteScope.</span>
              </h2>

              <p className="mb-8 font-mono text-sm text-[#7a6a4f] leading-relaxed">
                Editor visual que roda <strong className="text-[#2b2418]">100% no seu navegador.</strong><br />
                Sem instalar nada. Sem conta. Sem código.
              </p>

              <div className="flex flex-col gap-3 mb-8">
                {[
                  { icon: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>, text: "Tudo pelo navegador — zero instalação extra" },
                  { icon: <><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></>, text: "Clique em qualquer texto e edite na hora" },
                  { icon: <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></>, text: "Troca imagem com 1 clique — vê o tamanho exato" },
                  { icon: <><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></>, text: "Preview mobile e desktop lado a lado" },
                  { icon: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>, text: "Baixa a sua página final pronta pra publicar" },
                  { icon: <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></>, text: "Desbloqueado automaticamente com sua licença Hunter X" },
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fbf7ef] border border-[#e2d4b8]">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9a7b3f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{p.icon}</svg>
                    </span>
                    <span className="font-mono text-[13px] text-[#4a3f2c]">{p.text}</span>
                  </div>
                ))}
              </div>

              <a href="/sitescope" className="inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 font-mono text-sm font-black transition-transform hover:-translate-y-0.5 bg-[#2b2418] text-white hover:bg-[#3d3322]">
                <img src="/sitescope-logo.png" alt="" className="w-4 h-4 object-contain mix-blend-multiply" />
                Abrir o SiteScope →
              </a>
            </div>

            {/* DIREITA — mock do editor */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#e2d4b8] bg-[#fbf7ef] shadow-sm">
                {/* barra browser */}
                <div className="flex items-center gap-2 border-b border-[#ece1cb] px-4 py-3 bg-[#f3ebdc]">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                  <span className="ml-3 flex items-center gap-1.5 rounded-md bg-[#fbf7ef] border border-[#e2d4b8] px-2.5 py-1 font-mono text-[10px] text-[#7a6a4f]">
                    <img src="/sitescope-logo.png" alt="" className="w-3 h-3 object-contain mix-blend-multiply" />
                    sitescope · editor visual
                  </span>
                </div>
                {/* conteúdo mockado */}
                <div className="relative p-6 min-h-[300px]">
                  <div className="relative mb-4 inline-block">
                    <div className="rounded px-3 py-1.5 ring-2 ring-[#b8924a]/40 bg-amber-50">
                      <span className="font-black text-lg text-[#2b2418]">Sua headline aqui</span>
                    </div>
                    <span className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full border-2 border-white bg-[#b8924a]" />
                    <span className="absolute -top-7 left-0 rounded px-1.5 py-0.5 font-mono text-[9px] font-bold bg-amber-500 text-white">texto</span>
                  </div>
                  <div className="mb-4 h-2 w-3/4 rounded-full bg-[#ede2cd]" />
                  <div className="mb-6 h-2 w-1/2 rounded-full bg-[#ede2cd]" />
                  <div className="mb-5 flex h-20 w-36 items-center justify-center rounded-lg border border-dashed border-[#e2d4b8] bg-[#f3ebdc]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                  </div>
                  <div className="inline-block rounded-lg px-5 py-2 font-mono text-xs font-bold bg-[#2b2418] text-white">Comprar agora</div>
                </div>
                <div className="border-t border-[#ece1cb] px-6 py-3 flex items-center justify-between bg-[#f3ebdc]">
                  <span className="font-mono text-[10px] text-[#9a8a6c]">O que você vê é o que você baixa.</span>
                  <span className="font-mono text-[10px] font-bold text-[#9a7b3f]">100% no navegador</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── HISTÓRICO + CAPTURA ─── */}
      <section id="lista" className="relative border-t border-[#ece1cb] bg-[#fbf7ef] py-10 md:py-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 60% at 50% 110%, rgba(184,146,74,0.06) 0%, transparent 60%)" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* ── ESQUERDA: pricing timeline ── */}
            <div className="hidden lg:flex flex-col gap-5">

              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#e8d6a8] bg-amber-50 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#9a7b3f]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Fase 4 · A porta está aberta
                </div>
                <h2 className="text-[2.6rem] font-black text-[#2b2418] tracking-[-0.03em] leading-[1.0]">
                  Cada porta que fecha,<br />
                  <span className="text-[#9a7b3f]">
                    fecha com o preço dentro.
                  </span>
                </h2>
                <p className="mt-2.5 text-[13px] text-[#7a6a4f] leading-relaxed max-w-xs">
                  Quem cruzou a primeira porta paga <span className="text-[#2b2418]">$5.90 até hoje</span> — e nunca vai pagar mais.<br/>
                  A porta aberta agora custa <span className="text-[#9a7b3f] font-semibold">$12.90/mês</span>. Depois dela, só a névoa.
                </p>
              </div>

              {/* corredor das fases */}
              <div className="relative rounded-2xl overflow-hidden border border-[#e2d4b8]">
                <img
                  src="/fases-angel.jpg"
                  alt="Corredor com três cofres lacrados e um aberto — a Fase 4"
                  className="w-full h-auto block"
                  style={{ animation: "keyDrift 20s ease-in-out infinite alternate" }}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16" style={{ background: "linear-gradient(to top, rgba(255,255,255,0.95), transparent)" }} />
                <p className="absolute bottom-2.5 left-0 right-0 text-center font-mono text-[9px] font-black uppercase tracking-[0.35em] text-[#9a8a6c]">
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

              {/* fases — timeline vertical */}
              <div className="relative flex flex-col">
                <div className="absolute left-[18px] top-4 bottom-4 w-px" style={{ background: "linear-gradient(to bottom,rgba(34,197,94,0.5),rgba(184,146,74,0.5),rgba(209,213,219,0.3))" }}/>

                {([
                  { fase: 1, price: "$5.90",  date: "Jan 2024", vagas: "200 vagas", status: "done" },
                  { fase: 2, price: "$7.90",  date: "Mai 2024", vagas: "230 vagas", status: "done" },
                  { fase: 3, price: "$9.90",  date: "Nov 2024", vagas: "260 vagas", status: "done" },
                  { fase: 4, price: "$12.90", date: "Jun 2025", vagas: "230 vagas", status: "live" },
                  { fase: 5, price: "$19.90", date: "Em breve", vagas: null,        status: "next" },
                ] as { fase: number; price: string; date: string; vagas: string | null; status: string }[]).map((f) => (
                  <div key={f.fase} className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                    f.status === "live" ? "my-1 bg-amber-50 border border-amber-50" : ""
                  }`} style={f.status === "next" ? { opacity: 0.35 } : {}}>
                    <span className={`relative z-10 flex-shrink-0 w-[9px] h-[9px] rounded-full ml-[10px] ${
                      f.status === "done" ? "bg-green-500" :
                      f.status === "live" ? "bg-amber-500 shadow-[0_0_10px_rgba(184,146,74,0.6)]" :
                      "bg-gray-300"
                    }`}/>
                    <span className="font-mono text-[9px] text-[#9a8a6c] uppercase tracking-widest w-10 shrink-0">F{f.fase}</span>
                    <span className={`font-black text-base tracking-tight shrink-0 ${
                      f.status === "live" ? "text-[#2b2418]" :
                      f.status === "next" ? "text-[#9a8a6c]" :
                      "text-[#9a8a6c] line-through"
                    }`}>{f.price}<span className="text-[9px] font-normal text-[#9a8a6c] ml-0.5">/mês</span></span>
                    <span className="font-mono text-[10px] text-[#9a8a6c] flex-1">{f.date}</span>
                    <span className={`font-mono text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border shrink-0 ${
                      f.status === "live" ? "text-[#9a7b3f] border-[#e8d6a8] bg-amber-50" :
                      f.status === "next" ? "text-[#9a8a6c] border-[#e2d4b8]" :
                      "text-green-700 border-green-200 bg-green-50"
                    }`}>
                      {f.status === "live" ? "● Aberta" : f.status === "next" ? "Em breve" : "Encerrada"}
                    </span>
                  </div>
                ))}
              </div>

              {/* stats */}
              <div className="flex items-center gap-3">
                {[["3", "portas lacradas"],["$12.90","a porta aberta"],["$19.90","depois da névoa"]].map(([v,l]) => (
                  <div key={l} className="flex-1 rounded-xl py-3 text-center border border-[#ece1cb] bg-[#f3ebdc]">
                    <p className="font-black text-[#2b2418] text-lg tracking-tight">{v}</p>
                    <p className="font-mono text-[8px] text-[#9a8a6c] mt-0.5 uppercase tracking-wider">{l}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl px-4 py-3 flex items-start gap-3 bg-amber-50 border border-amber-50">
                <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9a7b3f" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <p className="font-mono text-[11px] text-[#5e5139] leading-relaxed">
                  O preço da porta que você cruza é <span className="text-[#9a7b3f] font-bold">seu para sempre.</span>{" "}
                  Ninguém avisa quando ela fecha. As três primeiras fecharam sem aviso — essa não vai ser diferente.
                </p>
              </div>

            </div>

            {/* ── DIREITA: formulário ── */}
            <div className="lg:pt-8">
              <div className="rounded-2xl border border-[#e2d4b8] bg-[#fbf7ef] overflow-hidden shadow-sm">

                {/* Imagem hero do card */}
                <div className="relative h-52 md:h-60 overflow-hidden bg-[#ede2cd]">
                  <img
                    src="/key-angel.jpg"
                    alt="A chave de acesso"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: "50% 32%", animation: "keyDrift 18s ease-in-out infinite alternate" }}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24" style={{ background: "linear-gradient(to top, white, transparent)" }} />
                  <p className="absolute bottom-3 left-0 right-0 text-center font-mono text-[9px] font-black uppercase tracking-[0.4em] text-[#9a8a6c]">
                    Forjada para poucos
                  </p>
                </div>

                <div className="p-8 pt-6">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e8d6a8] bg-amber-50 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#9a7b3f]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#b8924a] opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                    </span>
                    Acesso Exclusivo
                  </div>

                  <h2 className="mb-2 text-3xl font-black uppercase tracking-tight text-[#2b2418] leading-tight">
                    Garanta seu<br />
                    <span className="text-[#9a7b3f]">acesso exclusivo</span>
                  </h2>
                  <p className="mb-6 font-mono text-sm text-[#7a6a4f]">
                    Vagas limitadas. Receba sua chave de acesso por email e comece a garimpar agora.
                  </p>

                  <WaitlistForm />

                  <div className="mt-5 flex items-start gap-2 rounded-xl border border-[#ece1cb] bg-[#f3ebdc] px-4 py-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <p className="font-mono text-[11px] text-[#5e5139] leading-relaxed">
                      Se houver vaga disponível, você receberá um email com sua chave de acesso em minutos.
                    </p>
                  </div>

                  <p className="mt-3 font-mono text-[10px] text-[#9a8a6c] text-center">Zero spam · Cancele quando quiser</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-[#ece1cb] bg-[#f3ebdc]">
        {/* Newsletter bar */}
        <div className="border-b border-[#ece1cb] py-10">
          <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-mono text-xs font-black tracking-[0.3em] text-[#9a7b3f] uppercase mb-1">Fique por dentro</p>
              <p className="text-sm text-[#7a6a4f]">Saiba quando a próxima fase abre — antes de todo mundo.</p>
            </div>
            <form className="flex w-full max-w-sm gap-2" action="#">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 bg-[#fbf7ef] border border-[#e2d4b8] rounded-none px-4 py-3 text-sm text-[#2b2418] placeholder-gray-400 focus:outline-none focus:border-[#b8924a] font-mono"
              />
              <button
                type="submit"
                className="bg-[#2b2418] text-white font-black text-xs tracking-widest px-5 py-3 hover:bg-[#3d3322] transition-colors"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="mx-auto max-w-6xl px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <p className="font-mono text-xs font-black tracking-[0.25em] text-[#9a8a6c] uppercase mb-5">Produto</p>
            <ul className="space-y-3">
              {[
                { label: "Início", href: "#hero" },
                { label: "Download", href: "/download" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-[#7a6a4f] hover:text-[#2b2418] transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs font-black tracking-[0.25em] text-[#9a8a6c] uppercase mb-5">Acesso</p>
            <ul className="space-y-3">
              {[
                { label: "Lista VIP", href: "#lista" },
                { label: "Fase atual", href: "/fases" },
                { label: "Histórico de fases", href: "#" },
                { label: "Minha chave", href: "#lista" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-[#7a6a4f] hover:text-[#2b2418] transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs font-black tracking-[0.25em] text-[#9a8a6c] uppercase mb-5">Suporte</p>
            <ul className="space-y-3">
              {[
                { label: "Contato", href: "mailto:suporte@hunterx.site" },
                { label: "Como instalar", href: "#" },
                { label: "Política de privacidade", href: "/privacidade" },
                { label: "Termos de uso", href: "/termos" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-[#7a6a4f] hover:text-[#2b2418] transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs font-black tracking-[0.25em] text-[#9a8a6c] uppercase mb-5">Hunter X</p>
            <p className="text-sm text-[#7a6a4f] leading-relaxed">
              Extensão de navegador para ler bibliotecas públicas de anúncios em tempo real. Encontre produtos validados antes de todo mundo.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#ece1cb] py-6">
          <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="" className="h-6 w-6 object-contain mix-blend-multiply" />
              <span className="font-mono text-xs text-[#9a8a6c]">© 2026 Hunter X · v2.1.0</span>
            </div>
            <p className="font-mono text-xs text-[#b8a888] text-center">
              Produto independente. Não somos afiliados, endossados nem patrocinados por nenhuma plataforma de anúncios.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com" className="text-[#b8a888] hover:text-[#4a3f2c] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://twitter.com" className="text-[#b8a888] hover:text-[#4a3f2c] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      </div>
    </main>
  );
}
