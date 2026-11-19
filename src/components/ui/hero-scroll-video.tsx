export function HeroScrollVideo() {
  return (
    <section id="hero" className="relative w-full min-h-[calc(100vh-4rem)] flex items-center overflow-hidden" style={{ background: "#f7f1e6" }}>
      <img
        src="/hero-angel.jpg"
        alt="Anjo de mármore segurando uma mira dourada"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ animation: "heroBreath 24s ease-in-out infinite alternate" }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(247,241,230,0.96) 0%, rgba(247,241,230,0.82) 38%, rgba(247,241,230,0) 70%)" }} />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-20">
        <div className="max-w-xl" style={{ animation: "heroIn 0.9s cubic-bezier(0.16,1,0.3,1) both" }}>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#9a7b3f" }}>
            Extensão para Chrome · Biblioteca de Anúncios
          </p>
          <h1 className="font-serif font-medium leading-[1.02] tracking-tight" style={{ color: "#2b2418", fontSize: "clamp(2.6rem,6vw,4.8rem)" }}>
            Encontre os produtos que já estão vendendo.
          </h1>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed" style={{ color: "#6b5d45" }}>
            O Hunter X lê a biblioteca pública de anúncios e mostra há quantos dias cada oferta está no ar, a faixa de preço e o score viral de 0 a 100.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="/download" className="rounded-full px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 active:translate-y-0" style={{ background: "#2b2418" }}>
              Instalar a extensão
            </a>
            <a href="#como-funciona" className="rounded-full border px-7 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5" style={{ borderColor: "#d8c9a8", color: "#2b2418" }}>
              Ver como funciona
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroBreath { from { transform: scale(1); } to { transform: scale(1.05); } }
        @keyframes heroIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { #hero * { animation: none !important; } }
      `}</style>
    </section>
  );
}
