import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#06090d] px-6 py-16 text-center">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10">
        <Image
          src="/404-goblin.png"
          alt="Goblin perdido no escuro"
          width={1376}
          height={768}
          className="h-auto w-full"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06090d] via-transparent to-transparent" />
      </div>

      <p className="mt-8 font-mono text-xs font-black tracking-[0.3em] text-violet-400">ERRO 404</p>

      <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">
        Essa sala não existe.
      </h1>

      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
        Você abriu uma porta que nem o goblin conhece. As placas não ajudam,
        a tocha só mostra poeira — e o tesouro definitivamente não está aqui.
      </p>

      <p className="mt-2 font-mono text-xs text-zinc-600">
        Se você chegou até aqui garimpando... respeito. Mas os produtos validados ficam do outro lado.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 font-mono text-sm font-black text-white transition-transform hover:-translate-y-0.5"
        style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)", boxShadow: "0 0 30px rgba(124,58,237,0.35)" }}
      >
        ← Voltar pra caçada
      </Link>
    </div>
  );
}
