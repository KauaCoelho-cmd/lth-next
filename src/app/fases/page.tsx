export const metadata = {
  title: "Fases de Acesso | Hunter X",
  description: "Três fases fechadas. Uma ainda aberta. Veja o histórico de acesso do Hunter X.",
};

const fases = [
  {
    fase: "Fase 1",
    preco: "$9,90",
    status: "Encerrada",
    vagas: "50 vagas",
    desc: "Os primeiros. Pagam menos que todo mundo. Para sempre. Esses nunca vão pagar mais — independente de quantas fases abrirem.",
    atual: false,
  },
  {
    fase: "Fase 2",
    preco: "$9,90",
    status: "Encerrada",
    vagas: "100 vagas",
    desc: "Fechou em menos de 48h. Muita gente ficou pra trás esperando o momento certo.",
    atual: false,
  },
  {
    fase: "Fase 3",
    preco: "$9,90",
    status: "Encerrada",
    vagas: "200 vagas",
    desc: "Encerrada antes do prazo estimado. Virou padrão aqui.",
    atual: false,
  },
  {
    fase: "Fase 4",
    preco: "$12,90",
    status: "Aberta",
    vagas: "Vagas limitadas",
    desc: "A atual. Quando fechar, o preço sobe para $19,90 na Fase 5 — e não tem volta.",
    atual: true,
  },
];

export default function Fases() {
  return (
    <main className="min-h-screen bg-[#06090d] px-6 py-20">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="font-mono text-xs font-black tracking-[0.3em] text-violet-400 uppercase mb-4">Histórico de acesso</p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
            Três fases fechadas.<br />
            <span className="text-zinc-500">Uma ainda aberta.</span>
          </h1>
          <p className="text-zinc-500 text-sm max-w-md mx-auto leading-relaxed">
            Cada fase tem um preço. Cada fase fecha sem aviso.<br />
            Quem entrou na Fase 1 paga menos do que você pagaria hoje.
          </p>
        </div>

        {/* Timeline de fases */}
        <div className="space-y-4 mb-20">
          {fases.map(({ fase, preco, status, vagas, desc, atual }) => (
            <div
              key={fase}
              className={`relative flex flex-col md:flex-row md:items-center gap-6 p-8 border transition-all ${
                atual
                  ? "border-white bg-white/[0.02]"
                  : "border-white/5 opacity-40"
              }`}
            >
              {atual && (
                <span className="absolute -top-3 left-8 bg-white text-black font-black text-[10px] tracking-widest px-3 py-1 uppercase">
                  Agora
                </span>
              )}

              {/* Fase label */}
              <div className="md:w-28 shrink-0">
                <p className={`font-mono text-[10px] font-black tracking-[0.3em] uppercase ${atual ? "text-violet-400" : "text-zinc-600"}`}>
                  {fase}
                </p>
              </div>

              {/* Preço */}
              <div className="md:w-36 shrink-0">
                <p className={`text-2xl font-black ${atual ? "text-white" : "text-zinc-600"}`}>
                  {preco}
                  <span className="text-xs font-normal text-zinc-600">/mês</span>
                </p>
                <p className={`font-mono text-[10px] tracking-widest mt-1 ${atual ? "text-amber-400" : "text-zinc-700"}`}>
                  {status} · {vagas}
                </p>
              </div>

              {/* Desc */}
              <p className={`text-sm leading-relaxed flex-1 ${atual ? "text-zinc-400" : "text-zinc-700"}`}>
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Copy exclusividade */}
        <div className="border border-white/5 p-10 md:p-14 text-center mb-20">
          <p className="font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-6">
            Por que a Fase 4 é diferente
          </p>
          <p className="text-white text-xl font-black leading-snug mb-5">
            Não estamos tentando te vender nada.
          </p>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-lg mx-auto mb-8">
            Se você precisa de convencimento, provavelmente essa ferramenta não é pra você.
            <br /><br />
            Quem já garimpou produto na mão sabe o que significa ter isso automatizado.
            Quem ainda não sabe vai descobrir quando a Fase 4 fechar — e o preço subir.
            <br /><br />
            Não vai ter email de "última chance". Não vai ter contagem regressiva falsa.
            Vai fechar. E pronto.
          </p>
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px flex-1 bg-white/5" />
            <p className="font-mono text-[10px] text-zinc-700 tracking-widest whitespace-nowrap">
              $12,90 agora · $19,90 na Fase 5
            </p>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <a
            href="/#lista"
            className="inline-block bg-white text-black font-black text-xs tracking-[0.2em] uppercase px-12 py-4 hover:bg-violet-400 transition-colors"
          >
            Entrar antes que feche
          </a>
        </div>

        <div className="text-center">
          <a href="/" className="font-mono text-xs text-zinc-600 hover:text-violet-400 transition-colors">
            ← Voltar ao site
          </a>
        </div>

      </div>
    </main>
  );
}
