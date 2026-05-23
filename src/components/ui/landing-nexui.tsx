"use client"

import { useState, useEffect, useRef } from "react"
import { Target, Download, Layers, Flame, BarChart2, Tag, Shield, Calendar } from "lucide-react"

/* ══════════════════════════════════════════════════════════════
   CANVAS — particles + drifting blobs + dot grid
══════════════════════════════════════════════════════════════ */
function CanvasBG() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let W = 0, H = 0, raf = 0

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const rand = (a: number, b: number) => a + Math.random() * (b - a)
    const COLS = ["124,106,255", "56,189,248", "167,139,250"]

    type Dot = { x: number; y: number; r: number; vx: number; vy: number; a: number; c: string }
    const spawn = (): Dot => ({
      x: rand(0, W), y: rand(0, H),
      r: rand(0.5, 2.5), vx: rand(-0.2, 0.2), vy: rand(-0.3, -0.05),
      a: rand(0.2, 0.6), c: COLS[Math.floor(Math.random() * 3)],
    })
    const dots: Dot[] = Array.from({ length: 120 }, spawn)

    const blobs = [
      { x: 0.2,  y: 0.3, r: 350, c: "124,106,255", a: 0.06, vx:  0.0003, vy:  0.0002 },
      { x: 0.75, y: 0.5, r: 400, c: "56,189,248",  a: 0.04, vx: -0.0002, vy:  0.0003 },
      { x: 0.5,  y: 0.8, r: 300, c: "167,139,250", a: 0.04, vx:  0.0001, vy: -0.0004 },
    ]

    const tick = () => {
      ctx.clearRect(0, 0, W, H)

      blobs.forEach(b => {
        b.x += b.vx; b.y += b.vy
        if (b.x < 0.1 || b.x > 0.9) b.vx *= -1
        if (b.y < 0.1 || b.y > 0.9) b.vy *= -1
        const g = ctx.createRadialGradient(b.x * W, b.y * H, 0, b.x * W, b.y * H, b.r)
        g.addColorStop(0, `rgba(${b.c},${b.a})`)
        g.addColorStop(1, "transparent")
        ctx.fillStyle = g
        ctx.fillRect(0, 0, W, H)
      })

      ctx.strokeStyle = "rgba(255,255,255,0.025)"
      ctx.lineWidth = 1
      for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
      for (let y = 0; y < H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }

      dots.forEach((d, i) => {
        d.x += d.vx; d.y += d.vy; d.a -= 0.001
        if (d.y < -10 || d.a < 0) dots[i] = spawn()
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${d.c},${d.a})`; ctx.fill()
      })

      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf) }
  }, [])

  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />
}

/* ══════════════════════════════════════════════════════════════
   THEME CONSTANTS
══════════════════════════════════════════════════════════════ */
const C = {
  bg:      "#030712",
  surface: "rgba(255,255,255,0.04)",
  surf2:   "rgba(255,255,255,0.07)",
  border:  "rgba(255,255,255,0.08)",
  border2: "rgba(255,255,255,0.14)",
  text:    "#f0f6fc",
  muted:   "#8b9ab1",
  accent:  "#7c6aff",
  acc2:    "#a78bfa",
  acc3:    "#38bdf8",
  green:   "#34d399",
  pink:    "#f472b6",
}

/* ══════════════════════════════════════════════════════════════
   SECTION WRAPPER — used to center & pad every section
══════════════════════════════════════════════════════════════ */
function Sec({ children, id, style }: { children: React.ReactNode; id?: string; style?: React.CSSProperties }) {
  return (
    <section
      id={id}
      style={{ position: "relative", zIndex: 1, padding: "100px 24px", maxWidth: 1200, margin: "0 auto", ...style }}
    >
      {children}
    </section>
  )
}

function Divider() {
  return (
    <div style={{
      position: "relative", zIndex: 1, height: 1,
      background: `linear-gradient(90deg,transparent,${C.accent},transparent)`, opacity: 0.35,
    }} />
  )
}

/* ══════════════════════════════════════════════════════════════
   LANDING PAGE
══════════════════════════════════════════════════════════════ */
export function LandingNexUI() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  /* scroll-reveal */
  useEffect(() => {
    const els = document.querySelectorAll(".nx-reveal")
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("nx-in") }),
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  /* ── data ── */
  const navLinks = [
    { label: "Por que usar",    href: "#problema" },
    { label: "Funcionalidades", href: "#features"  },
    { label: "Planos",          href: "#planos"    },
    { label: "Download",        href: "/download"  },
  ]

  const marqueeItems = [
    "Score Viral", "Dias Rodando", "Low Ticket", "Hotmart", "Kiwify",
    "Detecção de Preço", "Badge de Validação", "Exportação CSV", "Filtro por Tempo",
    "Score 0-100", "15 Plataformas", "Biblioteca do Meta", "Tráfego Pago",
    "Afiliados", "E-commerce", "Reconquista", "Saúde & Fitness", "Renda Extra",
  ]

  const features = [
    { icon: Layers,   title: "Bordas coloridas",       tag: "Visual",       desc: "Verde para low ticket (R$1–R$100), laranja para mid ticket. Identificação instantânea sem precisar ler o anúncio." },
    { icon: Flame,    title: "Badge de validação",      tag: "Validação",    desc: "1 chama após 7 dias, 2 chamas após 30. Quanto mais tempo rodando, mais validado o produto." },
    { icon: BarChart2,title: "Score viral 0–100",       tag: "Análise",      desc: "Algoritmo analisa tempo no ar, gatilhos de copy e sinais de escala. Um número para decidir na hora." },
    { icon: Calendar, title: "Dias rodando visíveis",   tag: "Filtro",       desc: "Veja exatamente há quantos dias cada anúncio está ativo e use o slider para filtrar por tempo mínimo." },
    { icon: Tag,      title: "Detecção de plataforma",  tag: "Inteligente",  desc: "Hotmart, Kiwify, Eduzz, Monetizze, Amazon, Shopify e mais 8 plataformas detectadas automaticamente." },
    { icon: Download, title: "Exportação CSV/JSON",     tag: "Produtividade",desc: "Exporte todos os anúncios filtrados em CSV ou JSON com um clique. Leve os dados para onde precisar." },
  ]

  const testimonials = [
    { text: "Cara, eu perdia horas garimpando anúncio manualmente. Com o Hunter X eu abro a biblioteca, já aparece tudo destacado. Em 10 minutos tenho 5 produtos pra testar.",         name: "Rafael Mendonça", role: "Afiliado Hotmart · SP",     av: "RM", grad: "linear-gradient(135deg,#7c6aff,#a855f7)" },
    { text: "Achei que era mais um curso ou ferramenta furada. Não é. Instalei em 2 minutos e no mesmo dia já encontrei um produto com 45 dias rodando que eu não ia achar nunca.",  name: "Camila Freitas",   role: "Dropshipping · MG",          av: "CF", grad: "linear-gradient(135deg,#38bdf8,#6366f1)" },
    { text: "O filtro de dias rodando é o que faz a diferença pra mim. Só mostro anúncios com mais de 14 dias, aí sei que o produto tá convertendo de verdade.",                     name: "Diego Alves",      role: "Media buyer · RJ",           av: "DA", grad: "linear-gradient(135deg,#34d399,#0891b2)" },
    { text: "Uso todo dia antes de criar campanha nova. O painel aparece do lado, já mostra nicho, tempo rodando, se tem vídeo... economizo pelo menos 2h por dia fácil.",           name: "Juliana Rocha",    role: "Gestora de tráfego · RS",    av: "JR", grad: "linear-gradient(135deg,#f472b6,#f97316)" },
    { text: "Testei uns 3 produtos que encontrei com o Hunter X esse mês. Dois deram lucro na primeira semana. Antes eu ficava no escuro sem saber o que tava rodando.",             name: "Thiago Barbosa",   role: "Infoprodutor · CE",          av: "TB", grad: "linear-gradient(135deg,#fbbf24,#a78bfa)" },
    { text: "Minha equipe inteira usa. Quando alguém encontra um produto bom exporta o CSV e compartilha no grupo. Virou parte do processo de pesquisa aqui.",                       name: "Larissa Nunes",    role: "Agência de tráfego · PR",    av: "LN", grad: "linear-gradient(135deg,#f472b6,#7c3aed)" },
  ]

  const mensal  = ["Todos os filtros", "Score viral em tempo real", "Exportação CSV/JSON", "Suporte por e-mail"]
  const anual   = ["Tudo do plano mensal", "Preço de lançamento garantido", "Prioridade no suporte", "Acesso a novas funcionalidades"]
  const agencia = ["Tudo do anual", "Múltiplas licenças", "Onboarding dedicado", "SLA prioritário"]

  /* ── helpers ── */
  const BtnPrimary = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      background: `linear-gradient(135deg,${C.accent},#a855f7)`,
      color: "#fff", padding: "14px 32px", borderRadius: 14,
      fontSize: "1rem", fontWeight: 700, textDecoration: "none",
      boxShadow: "0 0 40px rgba(124,106,255,.4),0 4px 20px rgba(0,0,0,.4)",
      transition: "all .25s",
    }}>
      {children}
    </a>
  )

  const BtnOutline = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      background: C.surface, border: `1px solid ${C.border2}`,
      color: C.text, padding: "14px 32px", borderRadius: 14,
      fontSize: "1rem", fontWeight: 600, textDecoration: "none",
      backdropFilter: "blur(12px)", transition: "all .25s",
    }}>
      {children}
    </a>
  )

  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <div style={{ fontSize: ".75rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: C.acc2, marginBottom: 16 }}>
      {children}
    </div>
  )

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16, color: C.text }}>
      {children}
    </div>
  )

  /* ════════════════════════ JSX ════════════════════════ */
  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Inter',system-ui,sans-serif", lineHeight: 1.6, overflowX: "hidden", minHeight: "100vh" }}>

      {/* ─ keyframes & reveal ─ */}
      <style>{`
        @keyframes nx-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes nx-pulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(1.4)} }
        @keyframes nx-shimmer { to{transform:translateX(200%)} }
        @keyframes nx-marquee { to{transform:translateX(-50%)} }
        @keyframes nx-breathe { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.15)} }
        @keyframes nx-fadeup  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

        .nx-reveal { opacity:0; transform:translateY(32px); transition:opacity .7s ease,transform .7s ease; }
        .nx-in     { opacity:1; transform:translateY(0); }

        .nx-fa { animation:nx-float 6s ease-in-out infinite; }
        .nx-fb { animation:nx-float 6s 1.5s ease-in-out infinite; }
        .nx-fc { animation:nx-float 6s 3s ease-in-out infinite; }
        .nx-fd { animation:nx-float 6s 4.5s ease-in-out infinite; }
        .nx-dot { animation:nx-pulse 2s infinite; }
        .nx-mq  { animation:nx-marquee 30s linear infinite; }
        .nx-breathe { animation:nx-breathe 6s ease-in-out infinite; }

        .a0 { animation:nx-fadeup .6s ease both; }
        .a1 { animation:nx-fadeup .6s .12s ease both; }
        .a2 { animation:nx-fadeup .6s .24s ease both; }
        .a3 { animation:nx-fadeup .6s .36s ease both; }
        .a4 { animation:nx-fadeup .6s .48s ease both; }

        .nx-card-hover { transition:all .3s; }
        .nx-card-hover:hover { border-color:rgba(255,255,255,0.14)!important; transform:translateY(-4px); box-shadow:0 20px 60px rgba(0,0,0,.4); }

        .nx-feat-hover { transition:all .3s; }
        .nx-feat-hover:hover { border-color:rgba(255,255,255,0.14)!important; transform:translateY(-3px); }

        .nx-a-hover:hover { opacity:.8; }

        @media(max-width:900px){
          .nx-hide-mob { display:none!important; }
          .nx-bento { grid-template-columns:1fr!important; }
          .nx-bento > * { grid-column:span 1!important; }
          .nx-three { grid-template-columns:1fr!important; }
          .nx-footer { flex-direction:column; text-align:center; }
        }
      `}</style>

      <CanvasBG />

      {/* ══ NAV ════════════════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 40px",
        background: scrolled ? "rgba(3,7,18,0.9)" : "rgba(3,7,18,0.65)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.border}`,
        transition: "all .3s",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,.4)" : "none",
      }}>
        {scrolled && <div style={{ position: "absolute", inset: "0 0 auto 0", height: 1, background: `linear-gradient(90deg,transparent,${C.accent},transparent)`, opacity: .5 }} />}

        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(124,106,255,.15)", border: "1px solid rgba(124,106,255,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Target size={17} color={C.acc2} />
          </div>
          <span style={{ fontSize: "1.15rem", fontWeight: 800, letterSpacing: "-0.02em", background: `linear-gradient(135deg,#fff,${C.acc2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Hunter X
          </span>
          <span style={{ fontSize: ".68rem", padding: "2px 8px", borderRadius: 100, border: "1px solid rgba(124,106,255,.3)", color: C.acc2, fontWeight: 700, letterSpacing: ".08em" }}>
            v2.1.0
          </span>
        </a>

        {/* Desktop links */}
        <div className="nx-hide-mob" style={{ display: "flex", gap: 32 }}>
          {navLinks.map(l => (
            <a key={l.label} href={l.href} className="nx-a-hover" style={{ color: C.muted, textDecoration: "none", fontSize: ".9rem", fontWeight: 500, transition: "color .2s" }}>
              {l.label}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href="/download" className="nx-hide-mob" style={{ background: "transparent", border: `1px solid ${C.border2}`, color: C.text, padding: "8px 18px", borderRadius: 10, fontSize: ".875rem", fontWeight: 500, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, transition: "all .2s" }}>
            <Download size={14} /> Download
          </a>
          <a href="#planos" style={{ background: `linear-gradient(135deg,${C.accent},#a855f7)`, color: "#fff", padding: "8px 20px", borderRadius: 10, fontSize: ".875rem", fontWeight: 600, textDecoration: "none", boxShadow: "0 0 20px rgba(124,106,255,.35)", transition: "all .2s", display: "inline-block" }}>
            Ver planos →
          </a>
        </div>
      </nav>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px", overflow: "hidden" }}>

        {/* Floating cards */}
        {[
          { cls: "nx-fa nx-hide-mob", pos: { top: "22%", left: "6%" },  col: C.green, txt: "◉ Score 94/100"       },
          { cls: "nx-fb nx-hide-mob", pos: { top: "56%", left: "4%" },  col: C.acc3,  txt: "⬡ 14 dias rodando"    },
          { cls: "nx-fc nx-hide-mob", pos: { top: "22%", right: "6%" }, col: C.pink,  txt: "❋ R$37,90 detectado"  },
          { cls: "nx-fd nx-hide-mob", pos: { top: "60%", right: "4%" }, col: C.acc2,  txt: "◆ Low Ticket"         },
        ].map((fc, i) => (
          <div key={i} className={fc.cls} style={{
            position: "absolute", ...fc.pos,
            background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12,
            padding: "10px 16px", backdropFilter: "blur(20px)",
            fontSize: ".78rem", fontFamily: "'JetBrains Mono',monospace",
            color: fc.col, pointerEvents: "none",
          }}>
            {fc.txt}
          </div>
        ))}

        {/* Badge */}
        <div className="a0" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,106,255,.12)", border: "1px solid rgba(124,106,255,.3)", color: C.acc2, padding: "6px 18px", borderRadius: 100, fontSize: ".78rem", fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 32 }}>
          <span className="nx-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, boxShadow: `0 0 8px ${C.accent}`, flexShrink: 0 }} />
          Extensão Chrome · v2.1.0 · Ao vivo na Biblioteca do Meta
        </div>

        {/* Title */}
        <h1 className="a1" style={{ fontSize: "clamp(2.8rem,7vw,6.5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 24 }}>
          <span style={{ display: "block", color: C.text }}>Escaneia. Filtra.</span>
          <span style={{ display: "block", background: `linear-gradient(135deg,${C.acc2},${C.acc3},${C.pink})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 40px rgba(124,106,255,.4))" }}>
            Você lucra.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="a2" style={{ maxWidth: 540, fontSize: "1.1rem", color: C.muted, marginBottom: 40, margin: "0 auto 40px" }}>
          A extensão Chrome que escaneia a Biblioteca do Facebook Ads em tempo real e revela os produtos low ticket que já estão escalando — com score, dias rodando e plataforma.
        </p>

        {/* CTAs */}
        <div className="a3" style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <BtnPrimary href="#planos"><Target size={18} /> Ver planos →</BtnPrimary>
          <BtnOutline href="/download"><Download size={18} /> Download gratuito</BtnOutline>
        </div>

        {/* Stats */}
        <div className="a4" style={{ display: "flex", gap: 48, marginTop: 72, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { num: "23K", suf: "+",  label: "Anúncios/dia"  },
            { num: "15",  suf: "",   label: "Plataformas"   },
            { num: "0–100", suf: "", label: "Score viral"   },
            { num: "100", suf: "%",  label: "Local & Privado"},
          ].map(st => (
            <div key={st.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: C.text, letterSpacing: "-0.03em" }}>
                {st.num}<span style={{ color: C.acc2 }}>{st.suf}</span>
              </div>
              <div style={{ fontSize: ".78rem", color: C.muted, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".08em", marginTop: 2 }}>{st.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ MARQUEE ═══════════════════════════════════════════════ */}
      <div style={{ position: "relative", zIndex: 1, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "18px 0", overflow: "hidden", background: "rgba(3,7,18,.9)" }}>
        <div className="nx-mq" style={{ display: "flex", gap: 48, width: "max-content" }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 10, color: C.muted, fontSize: ".875rem", fontWeight: 500, whiteSpace: "nowrap" }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: C.accent, flexShrink: 0 }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══ BENTO FEATURES ════════════════════════════════════════ */}
      <Sec id="features">
        <div className="nx-reveal">
          <SectionLabel>Por que Hunter X</SectionLabel>
          <SectionTitle>Tudo que você precisa,<br />nada que não precisa.</SectionTitle>
          <div style={{ fontSize: "1.05rem", color: C.muted, maxWidth: 520 }}>
            Cada funcionalidade foi desenhada para eliminar trabalho manual e mostrar os dados que realmente importam.
          </div>
        </div>

        {/* Bento grid */}
        <div className="nx-reveal nx-bento" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 56 }}>

          {/* Span-2: install preview */}
          <div className="nx-card-hover" style={{ gridColumn: "span 2", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, position: "relative", overflow: "hidden" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", marginBottom: 20, background: "rgba(124,106,255,.15)", border: "1px solid rgba(124,106,255,.25)" }}>⚡</div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 8, color: C.text }}>Instale e use em 2 minutos</h3>
            <p style={{ fontSize: ".875rem", color: C.muted, lineHeight: 1.65 }}>Sem cadastro, sem servidor, sem configuração. Instale no Chrome, cole sua chave de licença e abra a Biblioteca do Meta.</p>
            <div style={{ marginTop: 20, background: "rgba(0,0,0,.45)", border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px", fontFamily: "'JetBrains Mono',monospace", fontSize: ".78rem", color: C.muted, lineHeight: 1.9 }}>
              <div><span style={{ color: "#4b5563" }}># 1 — instale a extensão</span></div>
              <div><span style={{ color: C.acc2 }}>chrome</span>://extensions → <span style={{ color: C.acc3 }}>Hunter X</span> → <span style={{ color: C.green }}>Ativar</span></div>
              <div style={{ marginTop: 6 }}><span style={{ color: "#4b5563" }}># 2 — acesse a biblioteca</span></div>
              <div><span style={{ color: C.acc3 }}>facebook</span>.com/<span style={{ color: C.acc2 }}>ads/library</span></div>
              <div style={{ marginTop: 6 }}><span style={{ color: C.green }}>✓ Hunter X detectado · escaneando anúncios em tempo real...</span></div>
            </div>
          </div>

          {/* Low ticket detection */}
          <div className="nx-card-hover" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", marginBottom: 20, background: "rgba(244,114,182,.15)", border: "1px solid rgba(244,114,182,.25)" }}>🎯</div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 8, color: C.text }}>Low ticket automático</h3>
            <p style={{ fontSize: ".875rem", color: C.muted, lineHeight: 1.65 }}>Borda verde em cada produto R$1–R$100. Laranja para mid ticket. Identificação visual imediata.</p>
            <div style={{ marginTop: 20, background: "rgba(0,0,0,.3)", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { label: "R$37 · LT", bg: "rgba(52,211,153,.2)",  bc: "rgba(52,211,153,.35)",  col: C.green  },
                { label: "R$97 · MT", bg: "rgba(251,146,60,.2)",  bc: "rgba(251,146,60,.35)",  col: "#fb923c" },
                { label: "R$497 · HT", bg: "rgba(139,92,246,.2)", bc: "rgba(139,92,246,.35)", col: C.acc2   },
              ].map(chip => (
                <span key={chip.label} style={{ padding: "5px 12px", borderRadius: 8, fontSize: ".75rem", fontWeight: 600, background: chip.bg, border: `1px solid ${chip.bc}`, color: chip.col }}>
                  {chip.label}
                </span>
              ))}
            </div>
          </div>

          {/* Score */}
          <div className="nx-card-hover" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", marginBottom: 20, background: "rgba(56,189,248,.15)", border: "1px solid rgba(56,189,248,.25)" }}>📊</div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 8, color: C.text }}>Score viral 0–100</h3>
            <p style={{ fontSize: ".875rem", color: C.muted, lineHeight: 1.65 }}>Um número para cada anúncio. Algoritmo analisa tempo no ar, gatilhos de copy e sinais de escala.</p>
          </div>

          {/* Local */}
          <div className="nx-card-hover" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", marginBottom: 20, background: "rgba(52,211,153,.15)", border: "1px solid rgba(52,211,153,.25)" }}>🔒</div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 8, color: C.text }}>100% local & privado</h3>
            <p style={{ fontSize: ".875rem", color: C.muted, lineHeight: 1.65 }}>Tudo roda no seu navegador. Nenhum dado sai do seu computador. Privacidade por arquitetura.</p>
          </div>

          {/* Big stat */}
          <div className="nx-card-hover" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28 }}>
            <div style={{ fontSize: "3.5rem", fontWeight: 900, letterSpacing: "-0.04em", color: C.text, marginTop: 16 }}>
              15<span style={{ color: C.acc2 }}>+</span>
            </div>
            <div style={{ color: C.muted, fontSize: ".875rem", marginTop: 4 }}>Plataformas detectadas automaticamente</div>
          </div>

        </div>
      </Sec>

      <Divider />

      {/* ══ HOW IT WORKS ══════════════════════════════════════════ */}
      <Sec>
        <div className="nx-reveal">
          <SectionLabel>Como funciona</SectionLabel>
          <SectionTitle>Instale. Acesse.<br />Lucre.</SectionTitle>
        </div>
        <div className="nx-reveal nx-three" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 56 }}>
          {[
            { n: "01", title: "Instale a extensão Chrome",      desc: "Acesse o Chrome Web Store, instale o Hunter X e ative com sua chave de licença. Sem cadastro, sem dados pessoais — pronto em 2 minutos." },
            { n: "02", title: "Acesse a Biblioteca do Meta",    desc: "Abra facebook.com/ads/library normalmente. O Hunter X ativa sozinho e começa a escanear todos os anúncios em tempo real." },
            { n: "03", title: "Encontre produtos escalando",    desc: "Cada anúncio mostra preço, dias rodando, score viral e plataforma. Filtre pelo tempo e exporte os melhores em CSV." },
          ].map(step => (
            <div key={step.n} className="nx-feat-hover" style={{ padding: "32px 28px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16 }}>
              <div style={{ fontSize: ".75rem", fontWeight: 700, letterSpacing: ".1em", color: C.acc2, marginBottom: 16 }}>{step.n}</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 10, color: C.text }}>{step.title}</h3>
              <p style={{ fontSize: ".875rem", color: C.muted, lineHeight: 1.65 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </Sec>

      <Divider />

      {/* ══ FEATURES GRID ═════════════════════════════════════════ */}
      <Sec id="problema">
        <div className="nx-reveal">
          <SectionLabel>Funcionalidades</SectionLabel>
          <SectionTitle>Cada detalhe importa.</SectionTitle>
          <div style={{ fontSize: "1.05rem", color: C.muted, maxWidth: 520 }}>Construído para gestores de tráfego, afiliados e e-commerces que precisam de dados reais, não suposições.</div>
        </div>
        <div className="nx-reveal nx-three" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 56 }}>
          {features.map((f, i) => (
            <div key={i} className="nx-feat-hover" style={{ padding: "32px 28px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 100, height: 100, borderRadius: "50%", background: "rgba(124,106,255,.08)", transition: "all .3s" }} />
              <div style={{ position: "relative" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(124,106,255,.15)", border: "1px solid rgba(124,106,255,.25)", marginBottom: 20 }}>
                  <f.icon size={20} color={C.acc2} />
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 8, color: C.text }}>{f.title}</h3>
                <p style={{ fontSize: ".875rem", color: C.muted, lineHeight: 1.65, marginBottom: 16 }}>{f.desc}</p>
                <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 100, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "rgba(124,106,255,.15)", border: "1px solid rgba(124,106,255,.3)", color: C.acc2 }}>
                  {f.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Sec>

      <Divider />

      {/* ══ TESTIMONIALS ══════════════════════════════════════════ */}
      <Sec>
        <div className="nx-reveal">
          <SectionLabel>Quem usa</SectionLabel>
          <SectionTitle>O que os afiliados dizem</SectionTitle>
        </div>
        <div className="nx-reveal nx-three" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 56 }}>
          {testimonials.map((t, i) => (
            <div key={i} className="nx-feat-hover" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ color: "#fbbf24", fontSize: ".9rem", letterSpacing: 2 }}>★★★★★</div>
              <p style={{ fontSize: ".875rem", color: C.text, lineHeight: 1.7, fontStyle: "italic", flex: 1 }}>&ldquo;{t.text}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: ".85rem", background: t.grad, flexShrink: 0 }}>{t.av}</div>
                <div>
                  <div style={{ fontSize: ".875rem", fontWeight: 600, color: C.text }}>{t.name}</div>
                  <div style={{ fontSize: ".78rem", color: C.muted }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Sec>

      <Divider />

      {/* ══ PRICING ═══════════════════════════════════════════════ */}
      <Sec id="planos">
        <div className="nx-reveal" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
          <SectionLabel>Planos</SectionLabel>
          <SectionTitle>Preço simples, sem surpresa</SectionTitle>
          <div style={{ fontSize: "1.05rem", color: C.muted }}>Chave de acesso no e-mail em minutos após o pagamento. Cancele quando quiser.</div>
        </div>

        <div className="nx-reveal nx-three" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 56 }}>

          {/* Mensal */}
          <div className="nx-card-hover" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "36px 32px", display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <div style={{ fontSize: ".875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: C.muted }}>Mensal</div>
              <div style={{ fontSize: "2.8rem", fontWeight: 900, letterSpacing: "-0.04em", color: C.text }}>
                <sup style={{ fontSize: "1.3rem", verticalAlign: "super" }}>R$</sup>29,90
                <span style={{ fontSize: "1rem", color: C.muted, fontWeight: 400 }}>/mês</span>
              </div>
              <div style={{ fontSize: ".875rem", color: C.muted, marginTop: -8 }}>Cancele quando quiser.</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
              {mensal.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: ".875rem", color: C.text }}>
                  <span style={{ color: C.green }}>✓</span> {f}
                </div>
              ))}
            </div>
            <a href="https://pay.hotmart.com/T105952095U?off=cin50me1" style={{ padding: 12, borderRadius: 12, fontWeight: 700, fontSize: ".9rem", background: "transparent", border: `1px solid ${C.border2}`, color: C.text, textAlign: "center", textDecoration: "none", display: "block", transition: "all .25s" }}>
              Assinar mensal
            </a>
          </div>

          {/* Anual (featured) */}
          <div className="nx-card-hover" style={{
            background: "linear-gradient(160deg,rgba(124,106,255,.15),rgba(168,85,247,.08))",
            border: "1px solid rgba(124,106,255,.4)", borderRadius: 16, padding: "36px 32px",
            display: "flex", flexDirection: "column", gap: 24,
            position: "relative", overflow: "hidden",
            boxShadow: "0 0 60px rgba(124,106,255,.15)",
          }}>
            <div style={{ position: "absolute", top: 16, right: 16, background: `linear-gradient(135deg,${C.accent},#a855f7)`, color: "#fff", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 100 }}>Popular</div>
            <div>
              <div style={{ fontSize: ".875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: C.muted }}>Anual</div>
              <div style={{ fontSize: "2.8rem", fontWeight: 900, letterSpacing: "-0.04em", color: C.text }}>
                <sup style={{ fontSize: "1.3rem", verticalAlign: "super" }}>R$</sup>197
                <span style={{ fontSize: "1rem", color: C.muted, fontWeight: 400 }}>/ano</span>
              </div>
              <div style={{ fontSize: ".875rem", color: C.green, fontWeight: 600, marginTop: -4 }}>Economize R$161 — menos de R$17/mês</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
              {anual.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: ".875rem", color: C.text }}>
                  <span style={{ color: C.green }}>✓</span> {f}
                </div>
              ))}
            </div>
            <a href="https://pay.hotmart.com/T105952095U?off=8yp00f2l&checkoutMode=6" style={{ padding: 12, borderRadius: 12, fontWeight: 700, fontSize: ".9rem", background: `linear-gradient(135deg,${C.accent},#a855f7)`, border: "none", color: "#fff", textAlign: "center", textDecoration: "none", display: "block", boxShadow: "0 0 24px rgba(124,106,255,.4)", transition: "all .25s" }}>
              Assinar anual
            </a>
          </div>

          {/* Agência */}
          <div className="nx-card-hover" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "36px 32px", display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <div style={{ fontSize: ".875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: C.muted }}>Agência</div>
              <div style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.04em", color: C.text, marginTop: 8 }}>Fale conosco</div>
              <div style={{ fontSize: ".875rem", color: C.muted, marginTop: 8 }}>Para times e gestoras com múltiplos usuários.</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
              {agencia.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: ".875rem", color: C.text }}>
                  <span style={{ color: C.green }}>✓</span> {f}
                </div>
              ))}
            </div>
            <a href="mailto:suporte@hunterx.site" style={{ padding: 12, borderRadius: 12, fontWeight: 700, fontSize: ".9rem", background: "transparent", border: `1px solid ${C.border2}`, color: C.text, textAlign: "center", textDecoration: "none", display: "block", transition: "all .25s" }}>
              Falar com vendas
            </a>
          </div>

        </div>
      </Sec>

      {/* ══ CTA ═══════════════════════════════════════════════════ */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "120px 24px", overflow: "hidden" }}>
        <div className="nx-breathe" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 800, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(124,106,255,.12),transparent 70%)", pointerEvents: "none" }} />
        <h2 className="nx-reveal" style={{ position: "relative", fontSize: "clamp(2.2rem,5vw,4.5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.07, marginBottom: 20, color: C.text }}>
          Chega de garimpar<br />
          <span style={{ background: `linear-gradient(135deg,${C.acc2},${C.acc3},${C.pink})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>no escuro.</span>
        </h2>
        <p className="nx-reveal" style={{ position: "relative", fontSize: "1.1rem", color: C.muted, maxWidth: 480, margin: "0 auto 40px" }}>
          Junte-se aos afiliados e gestores que já usam dados reais para escolher produtos e bater metas.
        </p>
        <div className="nx-reveal" style={{ position: "relative", display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <BtnPrimary href="#planos"><Target size={18} /> Ver planos →</BtnPrimary>
          <BtnOutline href="/download"><Download size={18} /> Download gratuito</BtnOutline>
        </div>
      </div>

      {/* ══ FOOTER ════════════════════════════════════════════════ */}
      <footer className="nx-footer" style={{ position: "relative", zIndex: 1, borderTop: `1px solid ${C.border}`, padding: "48px 40px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ fontWeight: 800, fontSize: "1.1rem", background: `linear-gradient(135deg,#fff,${C.acc2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Hunter X</div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[
            { label: "Por que usar", href: "#problema"                      },
            { label: "Planos",       href: "#planos"                        },
            { label: "Download",     href: "/download"                      },
            { label: "Suporte",      href: "mailto:suporte@hunterx.site"    },
          ].map(l => (
            <a key={l.label} href={l.href} className="nx-a-hover" style={{ color: C.muted, fontSize: ".85rem", textDecoration: "none", transition: "color .2s" }}>{l.label}</a>
          ))}
        </div>
        <div style={{ color: C.muted, fontSize: ".78rem" }}>© {new Date().getFullYear()} Hunter X · Não afiliado ao Meta Platforms, Inc.</div>
      </footer>

    </div>
  )
}
