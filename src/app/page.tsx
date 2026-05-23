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
  { icon: TrendingUp, name: "Renda Extra",      desc: "Métodos, renda online, afiliado, dropshipping." },
  { icon: Zap,        name: "Saúde / Fitness",  desc: "Emagrecimento, dieta, treino e bem-estar." },
  { icon: Heart,      name: "Relacionamento",   desc: "Reconquista, sedução, casamento." },
  { icon: Sparkles,   name: "Espiritualidade",  desc: "Lei da atração, tarô, meditação." },
];

const trust = [
  { icon: Shield,   title: "100% local",       desc: "Nada vai para servidor externo. Seus dados ficam só no seu PC." },
  { icon: UserX,    title: "Sem cadastro",      desc: "Não precisa criar conta, fazer login ou fornecer e-mail." },
  { icon: CreditCard, title: "Chave por email",  desc: "Receba sua chave de acesso imediatamente após o pagamento." },
  { icon: Infinity, title: "Cancele quando quiser", desc: "Sem fidelidade. Cancele a qualquer momento sem burocracia." },
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

      {/* ─── NAV ─── */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a14]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#" className="flex items-center gap-2 font-mono text-sm font-bold">
            <Target className="h-4 w-4 text-violet-400" />
            <span className="text-slate-100">Low Ticket Hunter</span>
            <span className="rounded bg-violet-600 px-1.5 py-0.5 text-[10px] text-white">v1.3.0</span>
          </a>
          <a
            href="#planos"
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] transition hover:bg-violet-700"
          >
            Ver planos
          </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section id="hero">
        <HeroFuturistic
          titleWords={["VEJA", "ANALISE", "LUCRE"]}
          subtitle="A primeira extensão Chrome que escaneia a Biblioteca de Anúncios do Meta em tempo real e revela os produtos low ticket que já estão escalando."
          ctaLabel="Ver planos"
          ctaHref="#planos"
          priceLabel="Mensal · R$29,90 · Cancele quando quiser"
          badge="EXTENSÃO CHROME · v1.3.0"
        />
      </section>

      <div>

      {/* ─── BEFORE / AFTER ─── */}
      <section id="problema" className="mx-auto max-w-6xl px-5 py-24">
        <div className="mb-4 text-center">
          <span className="inline-flex items-center gap-2 rounded border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-violet-400 uppercase">
            <Zap className="h-3 w-3" /> O problema real
          </span>
        </div>
        <h2 className="mb-12 text-center font-display text-3xl font-bold tracking-tight md:text-5xl">
          Você passa horas na biblioteca{" "}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            sem saber o que olhar.
          </span>
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Sem a extensão */}
          <div className="rounded-2xl border border-red-900/40 bg-red-950/20 p-8">
            <span className="mb-5 inline-flex items-center gap-2 rounded border border-red-800/40 bg-red-900/20 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-red-400 uppercase">
              <XCircle className="h-3 w-3" /> Sem a extensão
            </span>
            <ul className="space-y-3">
              {beforeItems.map((item) => (
                <li key={item.text} className="flex items-start gap-3 text-sm text-zinc-400">
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-red-500/70" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Com a extensão */}
          <div className="rounded-2xl border border-violet-500/25 bg-violet-950/20 p-8">
            <span className="mb-5 inline-flex items-center gap-2 rounded border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-violet-400 uppercase">
              <CheckCircle className="h-3 w-3" /> Com a extensão
            </span>
            <ul className="space-y-3">
              {afterItems.map((item) => (
                <li key={item.text} className="flex items-start gap-3 text-sm text-slate-200">
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="border-y border-white/5 bg-[#11111c] py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-4 text-center">
            <span className="inline-flex items-center gap-2 rounded border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-violet-400 uppercase">
              <Rocket className="h-3 w-3" /> Como funciona
            </span>
          </div>
          <h2 className="mb-14 text-center font-display text-3xl font-bold tracking-tight md:text-5xl">
            3 passos. 2 minutos. Resultados imediatos.
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { n: "1", Icon: Globe,   title: "Compre e instale no Chrome",       desc: "Processo simples em menos de 2 minutos. Sem cadastro obrigatório." },
              { n: "2", Icon: Eye,      title: "Acesse a Biblioteca do Meta",       desc: "Abra facebook.com/ads/library normalmente. A extensão ativa automaticamente." },
              { n: "3", Icon: BarChart2, title: "Veja os produtos em tempo real",  desc: "Low tickets em verde, mid tickets em laranja. Score, dias rodando e plataforma — tudo visível." },
            ].map((s) => (
              <div key={s.n} className="rounded-xl border border-white/5 bg-violet-500/[.04] p-8 text-center transition hover:border-violet-500/30">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-400">
                  <s.Icon className="h-5 w-5" />
                </div>
                <div className="mb-3 font-mono text-xs font-bold tracking-widest text-violet-500/60 uppercase">Passo {s.n}</div>
                <h3 className="mb-2 font-bold">{s.title}</h3>
                <p className="text-sm text-zinc-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="mb-4 text-center">
          <span className="inline-flex items-center gap-2 rounded border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-violet-400 uppercase">
            <Wrench className="h-3 w-3" /> Funcionalidades
          </span>
        </div>
        <h2 className="mb-14 text-center font-display text-3xl font-bold tracking-tight md:text-5xl">
          Tudo que você precisa para{" "}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">garimpar como profissional.</span>
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="group relative overflow-hidden rounded-xl border border-white/5 bg-[#17172a]/60 p-7 transition hover:-translate-y-1 hover:border-violet-500/35 hover:shadow-[0_8px_32px_rgba(139,92,246,.12)]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10">
                <f.icon className="h-5 w-5 text-violet-400" />
              </div>
              <h3 className="mb-2 font-bold">{f.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
              <span className="inline-block rounded border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest text-violet-400 uppercase">{f.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PRICE ANCHOR ─── */}
      <section className="border-y border-white/5 bg-[#11111c] py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-4 text-center">
            <span className="inline-flex items-center gap-2 rounded border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-violet-400 uppercase">
              <Lightbulb className="h-3 w-3" /> Ancoragem de valor
            </span>
          </div>
          <h2 className="mb-12 text-center font-display text-3xl font-bold tracking-tight md:text-5xl">Quanto você cobra por hora do seu tempo?</h2>
          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-6 text-xl font-bold leading-relaxed md:text-2xl">
                Se você gasta <span className="text-violet-400">3 horas por semana</span> garimpando produto, em um mês são <span className="text-violet-400">12 horas perdidas</span>. A extensão recupera esse tempo no primeiro dia de uso.
              </p>
              <ul className="space-y-3 font-mono text-sm text-zinc-400">
                {[
                  "3h/semana × 4 semanas = 12h/mês desperdiçadas",
                  <>Com a extensão, você faz isso em <strong className="text-violet-400">minutos</strong></>,
                  <>R$29,90 ÷ 30 dias = <strong className="text-violet-400">menos de R$1 por dia no 1º mês</strong></>,
                  <>Anual? <strong className="text-violet-400">R$197 e economize R$161 no ano.</strong></>,
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 shrink-0 text-cyan-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              {/* Mensal */}
              <div className="rounded-2xl border border-violet-500/30 bg-[#0a0a14] p-6 text-center shadow-[0_0_40px_rgba(139,92,246,.15)]">
                <div className="mb-1 font-mono text-xs text-zinc-500">Mensal</div>
                <div className="font-mono text-4xl font-black text-violet-400">R$29,90</div>
                <div className="mt-1 font-mono text-xs text-zinc-500">por mês · cancele quando quiser</div>
                <a href="https://pay.hotmart.com/T105952095U?off=cin50me1" target="_blank" rel="noopener" className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-violet-600/80 px-6 py-2.5 text-sm font-bold text-white transition hover:opacity-90 hover:-translate-y-0.5">
                  <Target className="h-4 w-4" /> Assinar mensal
                </a>
              </div>
              {/* Anual */}
              <div className="rounded-2xl border border-violet-400/50 bg-[#0a0a14] p-6 text-center shadow-[0_0_50px_rgba(139,92,246,.25)] relative overflow-hidden">
                <div className="absolute inset-x-[20%] top-0 h-px bg-gradient-to-r from-transparent via-violet-400/80 to-transparent" />
                <span className="mb-2 inline-block rounded bg-violet-600 px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase tracking-widest">Melhor valor</span>
                <div className="mb-1 font-mono text-xs text-zinc-500">Anual</div>
                <div className="font-mono text-4xl font-black text-violet-300">R$197</div>
                <div className="mt-1 font-mono text-xs text-green-400 font-bold">Economize R$161 no ano</div>
                <a href="https://pay.hotmart.com/T105952095U?off=8yp00f2l&checkoutMode=6" target="_blank" rel="noopener" className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-violet-800 px-6 py-2.5 text-sm font-bold text-white shadow-[0_0_24px_rgba(139,92,246,.4)] transition hover:opacity-90 hover:-translate-y-0.5">
                  <Target className="h-4 w-4" /> Assinar anual
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PLATFORMS ─── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-6 text-center font-mono text-[11px] tracking-widest text-zinc-600 uppercase">Plataformas detectadas automaticamente</p>
          <div className="flex flex-wrap justify-center gap-2">
            {platforms.map((p) => (
              <span key={p} className="rounded-md border border-white/5 bg-violet-500/[.06] px-4 py-1.5 font-mono text-xs font-semibold text-zinc-400 transition hover:border-violet-500/30 hover:text-violet-400">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NICHOS ─── */}
      <section className="border-t border-white/5 bg-[#11111c] py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-4 text-center">
            <span className="inline-flex items-center gap-2 rounded border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-violet-400 uppercase">
              <FolderOpen className="h-3 w-3" /> Nichos detectados
            </span>
          </div>
          <h2 className="mb-12 text-center font-display text-3xl font-bold tracking-tight md:text-5xl">Os 4 nichos mais lucrativos do mercado digital.</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {nichos.map((n) => (
              <div key={n.name} className="rounded-xl border border-white/5 bg-violet-500/[.04] p-8 text-center transition hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-[0_12px_40px_rgba(139,92,246,.12)]">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">
                  <n.icon className="h-6 w-6 text-violet-400" />
                </div>
                <h3 className="mb-2 font-bold">{n.name}</h3>
                <p className="text-sm text-zinc-400">{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST ─── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-4 text-center">
            <span className="inline-flex items-center gap-2 rounded border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-violet-400 uppercase">
              <Lock className="h-3 w-3" /> Privacidade & segurança
            </span>
          </div>
          <h2 className="mb-12 text-center font-display text-3xl font-bold tracking-tight md:text-5xl">100% local. Seus dados ficam só com você.</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((t) => (
              <div key={t.title} className="rounded-xl border border-white/5 bg-violet-500/[.04] p-7 text-center transition hover:border-violet-500/25">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">
                  <t.icon className="h-6 w-6 text-violet-400" />
                </div>
                <h3 className="mb-2 font-bold">{t.title}</h3>
                <p className="text-sm text-zinc-400">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="planos" className="border-t border-white/5 bg-[#0a0a14] py-24">
        <div className="mx-auto max-w-6xl px-5">
          <PricingWithChart />
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section
        id="cta-final"
        className="py-28"
        style={{ background: "radial-gradient(ellipse 70% 70% at 50% 110%, rgba(139,92,246,.13) 0%, transparent 65%)" }}
      >
        <div className="mx-auto max-w-3xl px-5">
          <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-violet-500/[.05] p-14 text-center shadow-[0_0_100px_rgba(139,92,246,.08)]">
            <div className="absolute inset-x-[15%] top-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
            <span className="mb-6 inline-flex items-center gap-2 rounded border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-violet-400 uppercase">
              <Flame className="h-3 w-3" /> Oferta de lançamento
            </span>
            <h2 className="mb-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
              Chega de garimpar no{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">escuro.</span>
            </h2>
            <p className="mb-8 text-zinc-400">Escolha o plano ideal e receba sua chave de acesso imediatamente por email — direto na Biblioteca do Meta.</p>

            {/* Planos */}
            <div className="mb-8 flex flex-col sm:flex-row items-stretch justify-center gap-4">
              {/* Mensal */}
              <div className="flex flex-col items-center rounded-2xl border border-violet-500/25 bg-violet-500/[.05] px-8 py-6 min-w-[200px]">
                <span className="font-mono text-xs text-zinc-500 mb-1">Mensal</span>
                <span className="font-mono text-4xl font-black text-violet-400">R$29,90</span>
                <span className="font-mono text-xs text-zinc-500 mt-1 mb-4">/mês</span>
                <a href="https://pay.hotmart.com/T105952095U?off=cin50me1" target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-xl bg-violet-600/80 px-7 py-3 text-sm font-black text-white transition hover:opacity-90 hover:-translate-y-0.5">
                  <Target className="h-4 w-4" /> Assinar mensal
                </a>
              </div>
              {/* Anual */}
              <div className="relative flex flex-col items-center rounded-2xl border border-violet-400/50 bg-violet-500/[.08] px-8 py-6 min-w-[200px] shadow-[0_0_50px_rgba(139,92,246,.2)] overflow-hidden">
                <div className="absolute inset-x-[15%] top-0 h-px bg-gradient-to-r from-transparent via-violet-400/80 to-transparent" />
                <span className="mb-1 rounded bg-violet-600 px-2.5 py-0.5 font-mono text-[10px] font-bold text-white uppercase tracking-widest">Melhor valor</span>
                <span className="font-mono text-xs text-zinc-500 mb-1">Anual</span>
                <span className="font-mono text-4xl font-black text-violet-300">R$197</span>
                <span className="font-mono text-xs text-green-400 font-bold mt-1 mb-4">Economize R$161/ano</span>
                <a href="https://pay.hotmart.com/T105952095U?off=8yp00f2l&checkoutMode=6" target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-violet-800 px-7 py-3 text-sm font-black text-white shadow-[0_0_30px_rgba(139,92,246,.4)] transition hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(139,92,246,.65)]">
                  <Target className="h-4 w-4" /> Assinar anual
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── DEPOIMENTOS ─── */}
      {(() => {
        const testimonials = [
          {
            text: "Cara, eu perdia horas garimpando anúncio manualmente. Com o Hunter X eu abro a biblioteca, já aparece tudo destacado. Em 10 minutos tenho 5 produtos pra testar.",
            name: "Rafael Mendonça",
            role: "Afiliado Hotmart · SP",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          {
            text: "Achei que era mais um curso ou ferramenta furada. Não é. Instalei em 2 minutos e no mesmo dia já encontrei um produto com 45 dias rodando que eu não ia achar nunca.",
            name: "Camila Freitas",
            role: "Dropshipping · MG",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          },
          {
            text: "O filtro de dias rodando é o que faz a diferença pra mim. Só mostro anúncios com mais de 14 dias, aí sei que o produto tá convertendo de verdade.",
            name: "Diego Alves",
            role: "Media buyer · RJ",
            avatar: "https://randomuser.me/api/portraits/men/15.jpg",
          },
          {
            text: "Uso todo dia antes de criar campanha nova. O painel aparece do lado, já mostra nicho, tempo rodando, se tem vídeo... economizo pelo menos 2h por dia fácil.",
            name: "Juliana Rocha",
            role: "Gestora de tráfego · RS",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
          },
          {
            text: "Testei uns 3 produtos que encontrei com o Hunter X esse mês. Dois deram lucro na primeira semana. Antes eu ficava no escuro sem saber o que tava rodando.",
            name: "Thiago Barbosa",
            role: "Infoprodutor · CE",
            avatar: "https://randomuser.me/api/portraits/men/77.jpg",
          },
          {
            text: "Trabalho com e-commerce e o destaque verde nos produtos low ticket me ajuda demais. Não preciso mais ler card por card, já vejo na hora o que vale a pena copiar.",
            name: "Fernanda Lima",
            role: "E-commerce · BA",
            avatar: "https://randomuser.me/api/portraits/women/22.jpg",
          },
          {
            text: "Ontem encontrei um anúncio de 60 dias rodando num nicho que ninguém tava olhando. Produto de R$47, baixa concorrência. Esse tipo de info não tem preço.",
            name: "Bruno Carvalho",
            role: "Afiliado Kiwify · GO",
            avatar: "https://randomuser.me/api/portraits/men/55.jpg",
          },
          {
            text: "Minha equipe inteira usa. Quando alguém encontra um produto bom exporta o CSV e compartilha no grupo. Virou parte do processo de pesquisa aqui.",
            name: "Larissa Nunes",
            role: "Agência de tráfego · PR",
            avatar: "https://randomuser.me/api/portraits/women/10.jpg",
          },
          {
            text: "Simples e direto. Abre a biblioteca, aparece o painel, filtro por dias, exporto. Sem enrolação. Exatamente o que eu precisava sem ter que aprender nada novo.",
            name: "Marcos Vieira",
            role: "Copywriter · SC",
            avatar: "https://randomuser.me/api/portraits/men/41.jpg",
          },
        ];
        const col1 = testimonials.slice(0, 3);
        const col2 = testimonials.slice(3, 6);
        const col3 = testimonials.slice(6, 9);

        return (
          <section className="relative border-t border-white/5 bg-[#0a0a14] py-24 overflow-hidden">
            {/* Glow de fundo */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

            <div className="relative z-10 mx-auto max-w-6xl px-5">
              {/* Header */}
              <div className="mb-14 flex flex-col items-center text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-violet-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-300" />
                  </span>
                  Quem já usa o Hunter X
                </div>
                <h2
                  className="font-black uppercase leading-none tracking-tight text-white"
                  style={{ fontSize: "clamp(1.8rem, 5vw, 3.2rem)" }}
                >
                  Resultados de quem{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    parou de adivinhar
                  </span>
                </h2>
                <p className="mt-4 max-w-md font-mono text-sm text-zinc-500">
                  Afiliados, gestores de tráfego e donos de e-commerce usando dados reais para escolher produtos.
                </p>
              </div>

              {/* Colunas com máscara fade top/bottom */}
              <div className="flex justify-center gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[620px] overflow-hidden">
                <TestimonialsColumn testimonials={col1} duration={22} />
                <TestimonialsColumn testimonials={col2} duration={28} className="hidden md:block" />
                <TestimonialsColumn testimonials={col3} duration={25} className="hidden lg:block" />
              </div>
            </div>
          </section>
        );
      })()}

      {/* ─── CAPTURA DE LEAD ─── */}
      <section id="lista" className="border-t border-white/5 bg-[#070710] py-20">
        <div className="mx-auto max-w-xl px-5 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300" />
            </span>
            Avisa quando abrir nova vaga
          </div>
          <h2 className="mb-3 text-2xl font-black uppercase tracking-tight text-white">
            Lista VIP de{" "}
            <span style={{ background: "linear-gradient(135deg,#a78bfa,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              acesso antecipado
            </span>
          </h2>
          <p className="mb-8 font-mono text-sm text-zinc-500">
            Receba desconto exclusivo e acesso antes de todo mundo quando abrirmos novas vagas.
          </p>
          <WaitlistForm />
          <p className="mt-4 font-mono text-[11px] text-zinc-700">Zero spam. Cancele quando quiser.</p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/5 py-10 text-center">
        <nav className="mb-6 flex flex-wrap justify-center gap-6 font-mono text-xs text-zinc-600">
          <a href="#hero" className="transition hover:text-violet-400">Início</a>
          <a href="#problema" className="transition hover:text-violet-400">Por que usar</a>
          <a href="#planos" className="transition hover:text-violet-400">Planos</a>
          <a href="/download" className="transition hover:text-violet-400">Download</a>
          <a href="#lista" className="transition hover:text-violet-400">Lista VIP</a>
          <a href="mailto:suporte@hunterx.site" className="transition hover:text-violet-400">Suporte</a>
        </nav>
        <p className="flex items-center justify-center gap-2 font-mono text-xs text-zinc-600">
          <Target className="h-3 w-3 text-violet-600" />
          Hunter X · v2.1.0 · Extensão para Google Chrome
        </p>
        <p className="mt-2 font-mono text-xs text-zinc-700">Este produto não é afiliado, endossado ou patrocinado pelo Meta Platforms, Inc.</p>
      </footer>

      </div>{/* fim do wrapper z-10 */}
    </main>
  );
}
