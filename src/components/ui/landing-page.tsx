"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  Mail,
  AtSign,
  Share2,
  ExternalLink,
  ArrowUpRight,
  Target,
  Zap,
  Layers,
  BarChart2,
  Calendar,
  Tag,
  Flame,
  Shield,
  Infinity,
  UserX,
  CreditCard,
  Globe,
  Download,
  TrendingUp,
  Heart,
  Sparkles,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

/* ─── Animation variants ─────────────────────────────────────────────────── */
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

/* ─── Btn component (adapts to HX dark theme) ───────────────────────────── */
function Btn({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  type,
}: {
  children: React.ReactNode
  variant?: "primary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  href?: string
  type?: "submit" | "button"
}) {
  const base =
    "group relative inline-flex items-center justify-center overflow-hidden font-mono font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70 disabled:opacity-50"
  const sizes = {
    sm: "rounded-xl px-4 py-2 text-[12px]",
    md: "rounded-xl px-6 py-2.5 text-[13px]",
    lg: "rounded-xl px-8 py-3.5 text-sm",
  }
  const variants = {
    primary:
      "bg-violet-600 text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:bg-violet-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.55)] hover:-translate-y-0.5",
    outline:
      "border border-white/[0.12] bg-white/[0.03] text-zinc-300 hover:border-violet-500/40 hover:text-white hover:bg-violet-500/[0.06] hover:-translate-y-0.5",
    ghost: "text-zinc-400 hover:text-white hover:bg-white/[0.04]",
  }
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`
  const shimmer = (
    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
  )
  if (href)
    return (
      <a href={href} className={cls}>
        {shimmer}
        {children}
      </a>
    )
  return (
    <button type={type} className={cls}>
      {shimmer}
      {children}
    </button>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const navLinks = [
    { label: "Por que usar", href: "#problema" },
    { label: "Funcionalidades", href: "#funcionalidades" },
    { label: "Planos", href: "#planos" },
    { label: "Contato", href: "#contato" },
  ]

  const features = [
    {
      icon: Layers,
      title: "Bordas coloridas por faixa",
      desc: "Verde para low ticket (R$1–R$100) e laranja para mid ticket. Identificação visual instantânea sem precisar ler o anúncio.",
      tag: "Visual",
    },
    {
      icon: Flame,
      title: "Badge de validação",
      desc: "1 chama após 7 dias no ar. 2 chamas após 30 dias. Quanto mais tempo rodando, mais validado o produto.",
      tag: "Validação",
    },
    {
      icon: BarChart2,
      title: "Score viral 0–100",
      desc: "Pontuação baseada em tempo no ar, gatilhos de copy e sinais de escala. Veja de um relance o potencial de cada anúncio.",
      tag: "Análise",
    },
    {
      icon: Calendar,
      title: "Dias rodando visíveis",
      desc: "Veja exatamente há quantos dias cada anúncio está ativo e use o slider para filtrar por tempo mínimo.",
      tag: "Filtro",
    },
    {
      icon: Tag,
      title: "Detecção de plataforma",
      desc: "Hotmart, Kiwify, Eduzz, Monetizze, Shopee, Amazon, Shopify e mais 7 plataformas detectadas automaticamente.",
      tag: "Inteligente",
    },
    {
      icon: Download,
      title: "Exportação CSV",
      desc: "Exporte todos os anúncios filtrados em CSV ou JSON com um clique. Leve os dados para onde quiser.",
      tag: "Produtividade",
    },
  ]

  const nichos = [
    {
      icon: TrendingUp,
      name: "Renda Extra",
      tag: "Alta demanda",
      accent: "from-cyan-500/20 via-cyan-500/5 to-transparent",
      tagCls: "text-cyan-400 border-cyan-500/30 bg-cyan-500/[.08]",
      glow: "hover:shadow-[0_8px_32px_rgba(34,211,238,.12)] hover:border-cyan-500/30",
      desc: "Métodos, renda online, afiliado e dropshipping. O Hunter X mostra quais já estão há semanas convertendo.",
    },
    {
      icon: Zap,
      name: "Saúde & Fitness",
      tag: "Perene",
      accent: "from-green-500/20 via-green-500/5 to-transparent",
      tagCls: "text-green-400 border-green-500/30 bg-green-500/[.08]",
      glow: "hover:shadow-[0_8px_32px_rgba(34,197,94,.12)] hover:border-green-500/30",
      desc: "Emagrecimento e bem-estar nunca saem de moda. Produtos low ticket nesse nicho escalam o ano inteiro.",
    },
    {
      icon: Heart,
      name: "Relacionamento",
      tag: "Alto engajamento",
      accent: "from-rose-500/20 via-rose-500/5 to-transparent",
      tagCls: "text-rose-400 border-rose-500/30 bg-rose-500/[.08]",
      glow: "hover:shadow-[0_8px_32px_rgba(244,63,94,.12)] hover:border-rose-500/30",
      desc: "Reconquista e sedução têm dos menores CPLs do digital. Alta emoção, baixo ticket — fórmula perfeita.",
    },
    {
      icon: Sparkles,
      name: "Espiritualidade",
      tag: "Público fiel",
      accent: "from-amber-500/20 via-amber-500/5 to-transparent",
      tagCls: "text-amber-400 border-amber-500/30 bg-amber-500/[.08]",
      glow: "hover:shadow-[0_8px_32px_rgba(251,191,36,.12)] hover:border-amber-500/30",
      desc: "Tarô, meditação e lei da atração. Público ultra-fidelizado que compra repetidamente.",
    },
  ]

  const trust = [
    {
      icon: Shield,
      title: "100% local",
      desc: "Roda 100% no seu navegador. Nenhum dado é enviado para fora.",
      highlight: true,
    },
    {
      icon: UserX,
      title: "Sem cadastro",
      desc: "Sem criar conta, login ou e-mail confirmado. Instale e use.",
      highlight: false,
    },
    {
      icon: CreditCard,
      title: "Chave por e-mail",
      desc: "Após o pagamento, a chave chega no e-mail em minutos.",
      highlight: false,
    },
    {
      icon: Infinity,
      title: "Cancele quando quiser",
      desc: "Sem fidelidade, sem contrato, sem taxa. Um clique e acabou.",
      highlight: false,
    },
  ]

  const platforms = [
    "Hotmart","Kiwify","Eduzz","Monetizze","PerfectPay",
    "Cakto","Pepper","Shopee","Mercado Livre","Amazon","Shopify","Yampi",
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#07070f]">

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/[0.07] bg-[#0a0a14]/95 shadow-[0_4px_32px_rgba(0,0,0,.4)] backdrop-blur-xl"
            : "border-b border-transparent bg-[#0a0a14]/60 backdrop-blur-md"
        }`}
      >
        <div
          className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#hero" className="flex items-center gap-2.5">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/10"
            >
              <Target className="h-4 w-4 text-violet-400" />
            </motion.div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-[15px] font-bold tracking-tight text-white">Hunter X</span>
              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-1.5 py-px font-mono text-[9px] font-bold tracking-widest text-violet-400 uppercase">
                v2.1.0
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="rounded-md px-3 py-1.5 font-mono text-[12px] font-medium text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <a href="/download" className="flex items-center gap-1.5 font-mono text-[12px] text-zinc-400 transition hover:text-white">
              <Download className="h-3.5 w-3.5" /> Download
            </a>
            <Btn href="#planos" size="sm">Ver planos →</Btn>
          </div>

          {/* Hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-zinc-400 transition hover:text-white md:hidden"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#0a0a14] md:hidden"
        >
          <div className="flex h-16 items-center justify-between px-5">
            <span className="font-display text-[15px] font-bold text-white">Hunter X</span>
            <button onClick={() => setIsMenuOpen(false)} className="text-zinc-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
          <motion.nav
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-1 px-4 pb-8"
          >
            {navLinks.map((l) => (
              <motion.div key={l.label} variants={itemFadeIn}>
                <a
                  href={l.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.05] hover:text-white"
                >
                  {l.label}
                  <ChevronRight className="h-4 w-4 text-zinc-600" />
                </a>
              </motion.div>
            ))}
            <motion.div variants={itemFadeIn} className="flex flex-col gap-3 pt-4">
              <Btn href="#planos" size="md" className="w-full justify-center">Ver planos →</Btn>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}

      <main className="flex-1">

        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <section id="hero" className="relative overflow-hidden py-24 md:py-32 lg:py-40">
          {/* Dot grid */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.9) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[60%] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(139,92,246,0.12),transparent)]" />

          <div className="relative z-10 mx-auto max-w-6xl px-5">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="mx-auto max-w-3xl text-center"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-violet-300 backdrop-blur-sm"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-300" />
                </span>
                ◉ Extensão Chrome · v2.1.0
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mb-6 font-display font-black uppercase leading-[0.88] tracking-tight text-white"
                style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
              >
                Veja.{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Analise.
                </span>{" "}
                Lucre.
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mx-auto mb-10 max-w-xl text-[15px] leading-relaxed text-zinc-400 md:text-base"
              >
                A primeira extensão Chrome que escaneia a Biblioteca de Anúncios do Meta em tempo real e revela os
                produtos low ticket que já estão escalando.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
              >
                <Btn href="#planos" size="lg">
                  <Target className="mr-2 h-4 w-4" />
                  Ver planos e começar agora
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Btn>
                <Btn href="/download" variant="outline" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download gratuito
                </Btn>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
                className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600"
              >
                Mensal · R$29,90 · Cancele quando quiser
              </motion.p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06]"
            >
              {[
                { value: "23K+", label: "Anúncios/dia" },
                { value: "15", label: "Plataformas" },
                { value: "0–100", label: "Score viral" },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  variants={itemFadeIn}
                  className="flex flex-col items-center bg-[#0a0a14] py-6"
                >
                  <span className="font-mono text-2xl font-black text-violet-300">{s.value}</span>
                  <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-zinc-600">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── PLATFORMS ──────────────────────────────────────────────────────── */}
        <section className="py-14">
          <div className="mx-auto max-w-6xl px-5">
            <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-widest text-zinc-700">
              Plataformas detectadas automaticamente
            </p>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-2"
            >
              {platforms.map((p) => (
                <motion.span
                  key={p}
                  variants={itemFadeIn}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="rounded-lg border border-white/[0.05] bg-violet-500/[.05] px-4 py-1.5 font-mono text-xs font-semibold text-zinc-500 transition hover:border-violet-500/30 hover:text-violet-400"
                >
                  {p}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FEATURES ───────────────────────────────────────────────────────── */}
        <section id="funcionalidades" className="border-t border-white/[0.05] bg-[#0d0d1a] py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mx-auto max-w-6xl px-5"
          >
            <div className="mb-4 text-center">
              <span className="inline-flex items-center gap-2 rounded border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-violet-400 uppercase">
                <Zap className="h-3 w-3" /> Funcionalidades
              </span>
            </div>
            <h2 className="mb-3 text-center font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
              Tudo que você precisa para{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                garimpar como profissional.
              </span>
            </h2>
            <p className="mb-14 mx-auto max-w-xl text-center font-mono text-sm text-zinc-500">
              Cada funcionalidade foi desenhada para eliminar o trabalho manual e revelar os dados que importam.
            </p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  variants={itemFadeIn}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-[#0a0a14] p-7 transition hover:border-violet-500/30 hover:shadow-[0_8px_32px_rgba(139,92,246,.1)]"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10">
                    <f.icon className="h-5 w-5 text-violet-400" />
                  </div>
                  <h3 className="mb-2 font-bold text-white">{f.title}</h3>
                  <p className="mb-4 text-[13px] leading-relaxed text-zinc-500">{f.desc}</p>
                  <span className="inline-block rounded border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest text-violet-400 uppercase">
                    {f.tag}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── NICHOS (Bento) ─────────────────────────────────────────────────── */}
        <section className="border-t border-white/[0.05] bg-[#11111c] py-24">
          <div className="mx-auto max-w-6xl px-5">
            <div className="mb-4 text-center">
              <span className="inline-flex items-center gap-2 rounded border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-violet-400 uppercase">
                ◉ Nichos detectados
              </span>
            </div>
            <h2 className="mb-3 text-center font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
              Onde os produtos low ticket{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                mais escalam.
              </span>
            </h2>
            <p className="mb-14 mx-auto max-w-lg text-center font-mono text-sm text-zinc-500">
              O Hunter X identifica o nicho de cada anúncio em tempo real. Foque nos mercados onde o dinheiro circula.
            </p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {nichos.map((n) => (
                <motion.div
                  key={n.name}
                  variants={itemFadeIn}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a14] p-7 transition-all duration-300 ${n.glow}`}
                >
                  <div className={`absolute inset-x-0 top-0 h-20 bg-gradient-to-b ${n.accent} opacity-60`} />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="relative">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.04]">
                      <n.icon className="h-5 w-5 text-white/60" />
                    </div>
                    <span className={`mb-3 inline-block rounded border px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest uppercase ${n.tagCls}`}>
                      {n.tag}
                    </span>
                    <h3 className="mb-2 font-bold text-white">{n.name}</h3>
                    <p className="text-[12px] leading-relaxed text-zinc-500">{n.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── TRUST ──────────────────────────────────────────────────────────── */}
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-5">
            <div className="mb-4 text-center">
              <span className="inline-flex items-center gap-2 rounded border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-violet-400 uppercase">
                <Shield className="h-3 w-3" /> Privacidade por arquitetura
              </span>
            </div>
            <h2 className="mb-3 text-center font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
              Nenhum dado seu sai{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                do seu computador.
              </span>
            </h2>
            <p className="mb-14 mx-auto max-w-lg text-center font-mono text-sm text-zinc-500">
              Diferente de outras ferramentas, o Hunter X roda 100% no seu navegador. Nenhum servidor nosso processa seus dados.
            </p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {trust.map((t) => (
                <motion.div
                  key={t.title}
                  variants={itemFadeIn}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className={`group relative overflow-hidden rounded-2xl border p-7 transition-all duration-300 ${
                    t.highlight
                      ? "border-violet-500/30 bg-violet-500/[.06] shadow-[0_0_40px_rgba(139,92,246,.08)]"
                      : "border-white/[0.05] bg-white/[0.02] hover:border-violet-500/20"
                  }`}
                >
                  {t.highlight && (
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
                  )}
                  <div
                    className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg border ${
                      t.highlight ? "border-violet-500/30 bg-violet-500/15" : "border-white/[0.06] bg-white/[0.04]"
                    }`}
                  >
                    <t.icon className={`h-5 w-5 ${t.highlight ? "text-violet-400" : "text-zinc-500"}`} />
                  </div>
                  <h3 className={`mb-2 font-bold text-[14px] ${t.highlight ? "text-white" : "text-zinc-200"}`}>
                    {t.title}
                  </h3>
                  <p className="text-[12px] leading-relaxed text-zinc-500">{t.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── PRICING ────────────────────────────────────────────────────────── */}
        <section id="planos" className="border-t border-white/[0.05] bg-[#0a0a14] py-24">
          <div className="mx-auto max-w-4xl px-5">
            <div className="mb-4 text-center">
              <span className="inline-flex items-center gap-2 rounded border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-violet-400 uppercase">
                <Flame className="h-3 w-3" /> Planos
              </span>
            </div>
            <h2 className="mb-3 text-center font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
              Escolha seu plano
            </h2>
            <p className="mb-16 text-center font-mono text-sm text-zinc-500">
              Receba sua chave de acesso imediatamente por e-mail após o pagamento.
            </p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-5 md:grid-cols-2"
            >
              {/* Mensal */}
              <motion.div
                variants={itemFadeIn}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d1a] p-8"
              >
                <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-zinc-600">Mensal</p>
                <div className="mb-1 flex items-end gap-2">
                  <span className="font-mono text-5xl font-black text-white">R$29</span>
                  <span className="mb-1.5 font-mono text-xl font-bold text-zinc-400">,90</span>
                </div>
                <p className="mb-8 font-mono text-xs text-zinc-600">por mês · cancele quando quiser</p>
                <ul className="mb-8 space-y-2.5">
                  {["Acesso completo a todos os filtros","Score viral em tempo real","Exportação CSV/JSON","Suporte por e-mail"].map((item) => (
                    <li key={item} className="flex items-center gap-2 font-mono text-[12px] text-zinc-400">
                      <span className="text-cyan-400">◉</span> {item}
                    </li>
                  ))}
                </ul>
                <Btn href="https://pay.hotmart.com/T105952095U?off=cin50me1" size="lg" variant="outline" className="w-full justify-center">
                  <Target className="mr-2 h-4 w-4" /> Assinar mensal
                </Btn>
              </motion.div>

              {/* Anual */}
              <motion.div
                variants={itemFadeIn}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="relative overflow-hidden rounded-2xl border border-violet-400/40 bg-[#0d0d1a] p-8 shadow-[0_0_50px_rgba(139,92,246,.18)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/80 to-transparent" />
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-600">Anual</p>
                  <span className="rounded-full bg-violet-600 px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-widest text-white uppercase">
                    Melhor valor
                  </span>
                </div>
                <div className="mb-1 flex items-end gap-2">
                  <span className="font-mono text-5xl font-black text-violet-300">R$197</span>
                </div>
                <p className="mb-1 font-mono text-xs text-green-400 font-bold">Economize R$161 no ano</p>
                <p className="mb-8 font-mono text-[11px] text-zinc-600">equivale a R$16,40/mês</p>
                <ul className="mb-8 space-y-2.5">
                  {["Tudo do plano mensal","Prioridade no suporte","Acesso a futuras funcionalidades","Preço de lançamento garantido"].map((item) => (
                    <li key={item} className="flex items-center gap-2 font-mono text-[12px] text-zinc-300">
                      <span className="text-violet-400">◉</span> {item}
                    </li>
                  ))}
                </ul>
                <Btn href="https://pay.hotmart.com/T105952095U?off=8yp00f2l&checkoutMode=6" size="lg" className="w-full justify-center">
                  <Target className="mr-2 h-4 w-4" /> Assinar anual
                </Btn>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── CONTACT ────────────────────────────────────────────────────────── */}
        <section id="contato" className="border-t border-white/[0.05] bg-[#0d0d1a] py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mx-auto max-w-5xl px-5"
          >
            <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a14]">
              <div className="grid lg:grid-cols-2">
                {/* Left */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="border-b border-white/[0.05] p-10 lg:border-b-0 lg:border-r"
                >
                  <span className="mb-5 inline-block font-mono text-[10px] uppercase tracking-widest text-violet-400">
                    ◉ Contato
                  </span>
                  <h2 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">
                    Fale com a gente
                  </h2>
                  <p className="mb-8 font-mono text-sm leading-relaxed text-zinc-500">
                    Dúvida sobre a extensão, suporte técnico ou parceria? Respondo em até 24h úteis.
                  </p>

                  <div className="space-y-5">
                    {[
                      {
                        icon: Mail,
                        label: "E-mail",
                        value: "suporte@hunterx.site",
                      },
                      {
                        icon: Globe,
                        label: "Site",
                        value: "hunterx.site",
                      },
                    ].map((item) => (
                      <motion.div
                        key={item.label}
                        whileHover={{ x: 5 }}
                        className="flex items-start gap-3"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10">
                          <item.icon className="h-4 w-4 text-violet-400" />
                        </div>
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">{item.label}</p>
                          <p className="font-mono text-sm text-zinc-300">{item.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 flex gap-3">
                    {[
                      { icon: AtSign, label: "Instagram" },
                      { icon: Share2, label: "Twitter" },
                      { icon: ExternalLink, label: "LinkedIn" },
                    ].map((s) => (
                      <motion.a
                        key={s.label}
                        href="#"
                        whileHover={{ y: -4, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-zinc-500 transition hover:border-violet-500/30 hover:text-violet-400"
                      >
                        <s.icon className="h-4 w-4" />
                        <span className="sr-only">{s.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* Right — Form */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="p-10"
                >
                  <h3 className="mb-1 font-bold text-white">Envie uma mensagem</h3>
                  <p className="mb-6 font-mono text-[12px] text-zinc-600">Respondo em até 24h úteis.</p>
                  <form className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">Nome</label>
                        <Input placeholder="Seu nome" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">E-mail</label>
                        <Input type="email" placeholder="seu@email.com" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">Assunto</label>
                      <Input placeholder="Dúvida, suporte, parceria..." />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">Mensagem</label>
                      <Textarea placeholder="Sua mensagem..." className="min-h-[120px]" />
                    </div>
                    <Btn type="submit" size="lg" className="w-full justify-center">
                      Enviar mensagem
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Btn>
                  </form>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.05]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4"
        >
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/10">
                <Target className="h-4 w-4 text-violet-400" />
              </div>
              <span className="font-display text-[15px] font-bold text-white">Hunter X</span>
            </div>
            <p className="font-mono text-[12px] leading-relaxed text-zinc-600">
              Extensão Chrome que escaneia a Biblioteca do Meta e revela produtos low ticket escalando em tempo real.
            </p>
            <div className="flex gap-2">
              {[AtSign, Share2, ExternalLink].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3 }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-zinc-600 transition hover:text-violet-400"
                >
                  <Icon className="h-3.5 w-3.5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              heading: "Produto",
              links: [
                { label: "Por que usar", href: "#problema" },
                { label: "Funcionalidades", href: "#funcionalidades" },
                { label: "Planos", href: "#planos" },
                { label: "Download", href: "/download" },
              ],
            },
            {
              heading: "Suporte",
              links: [
                { label: "Contato", href: "#contato" },
                { label: "Suporte por e-mail", href: "mailto:suporte@hunterx.site" },
                { label: "Lista VIP", href: "#lista" },
              ],
            },
            {
              heading: "Legal",
              links: [
                { label: "Política de Privacidade", href: "#" },
                { label: "Termos de Uso", href: "#" },
              ],
            },
          ].map((col) => (
            <div key={col.heading} className="space-y-4">
              <h4 className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">{col.heading}</h4>
              <nav className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="font-mono text-[12px] text-zinc-600 transition hover:text-violet-400"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </motion.div>

        <div className="border-t border-white/[0.04]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 md:flex-row">
            <p className="font-mono text-[11px] text-zinc-700">
              © {new Date().getFullYear()} Hunter X · v2.1.0 · Extensão para Google Chrome
            </p>
            <p className="font-mono text-[11px] text-zinc-700">
              Este produto não é afiliado, endossado ou patrocinado pelo Meta Platforms, Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
