import { WaitlistForm } from "@/components/ui/waitlist-form";
import { Navbar } from "@/components/ui/navbar";
import { HeroScrollVideo } from "@/components/ui/hero-scroll-video";

const ink = "#2b2418";
const muted = "#6b5d45";
const gold = "#9a7b3f";

const steps = [
  { n: "01", t: "Cole o endereço", d: "O link da página que caiu, do site antigo ou da versão que você quer de volta." },
  { n: "02", t: "Ajuste no editor", d: "Clique em qualquer texto para reescrever, troque imagens e cores, veja no celular e no computador." },
  { n: "03", t: "Baixe o HTML", d: "Um arquivo pronto para subir na sua hospedagem nova, sem depender de quem fez o site." },
];

const cases = [
  { t: "A hospedagem venceu", d: "O plano expirou, o servidor apagou os arquivos e ninguém tinha backup." },
  { t: "O desenvolvedor sumiu", d: "Quem fez o site não responde mais e você não tem acesso ao painel." },
  { t: "A conta foi bloqueada", d: "A plataforma travou o acesso, mas a página ainda está publicada ou em cache." },
  { t: "Você quer mudar de casa", d: "Sair de um construtor fechado levando a página que já funciona." },
];

const tools = [
  "Edita qualquer texto com um clique",
  "Troca imagens e mostra o tamanho exato",
  "Muda cores de fundo e de texto",
  "Preview de celular e computador lado a lado",
  "Galeria com todas as imagens da página",
  "Baixa o HTML final pronto para publicar",
];

export default function Home() {
  return (
    <main className="relative overflow-x-hidden" style={{ background: "#fbf7ef", color: ink }}>
      <Navbar />
      <HeroScrollVideo />

      <section id="como-funciona" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-4 text-sm font-medium" style={{ color: gold }}>Como funciona</p>
          <h2 className="max-w-2xl leading-[1.05]" style={{ fontSize: "clamp(2rem,4.5vw,3.4rem)" }}>
            Três passos entre a página perdida e o site no ar.
          </h2>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border p-8 transition hover:-translate-y-0.5" style={{ borderColor: "#e2d4b8", background: "#fffdf8" }}>
                <span className="text-3xl" style={{ color: gold }}>{s.n}</span>
                <h3 className="mt-6 text-2xl">{s.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed" style={{ color: muted }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t py-24 md:py-32" style={{ borderColor: "#ece1cb", background: "#f3ebdc" }}>
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "#e2d4b8" }}>
            <img src="/fases-angel.jpg" alt="Corredor de portas douradas, uma delas aberta" className="block h-full w-full object-cover transition duration-700 hover:scale-[1.03]" />
          </div>
          <div>
            <p className="mb-4 text-sm font-medium" style={{ color: gold }}>Quando usar</p>
            <h2 className="leading-[1.05]" style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}>
              Feito para quem ficou sem a chave do próprio site.
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {cases.map((c) => (
                <div key={c.t}>
                  <h3 className="text-xl">{c.t}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed" style={{ color: muted }}>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="sitescope" className="py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-medium" style={{ color: gold }}>O editor</p>
            <h2 className="leading-[1.05]" style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}>
              Recuperou? Agora deixe a página do seu jeito.
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed" style={{ color: muted }}>
              Tudo roda no navegador. Sem instalar programa, sem saber código.
            </p>
            <ul className="mt-8 space-y-3">
              {tools.map((t) => (
                <li key={t} className="flex items-center gap-3 text-[15px]">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#b8924a" }} />
                  {t}
                </li>
              ))}
            </ul>
            <a href="/sitescope" className="mt-10 inline-block rounded-full px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5" style={{ background: ink }}>
              Abrir o SiteScope
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border shadow-sm" style={{ borderColor: "#e2d4b8", background: "#fffdf8" }}>
            <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: "#ece1cb", background: "#f3ebdc" }}>
              <span className="h-2.5 w-2.5 rounded-full bg-[#e0a99a]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e8d08f]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#a9c79a]" />
              <span className="ml-3 rounded-md border bg-white px-3 py-1 text-[11px]" style={{ borderColor: "#e2d4b8", color: muted }}>meusite.com.br · recuperado</span>
            </div>
            <div className="space-y-4 p-8">
              <span className="inline-block rounded px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: "#b8924a" }}>editando texto</span>
              <div className="rounded-md px-3 py-2" style={{ background: "#faf3e3", outline: "2px solid #d8bf86" }}>
                <span className="text-2xl" >Doces artesanais desde 1998</span>
              </div>
              <div className="h-2 w-3/4 rounded-full" style={{ background: "#ece1cb" }} />
              <div className="h-2 w-1/2 rounded-full" style={{ background: "#ece1cb" }} />
              <div className="overflow-hidden rounded-lg">
                <img src="/key-angel.jpg" alt="Imagem recuperada da página" className="h-40 w-full object-cover" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="rounded-full px-5 py-2 text-xs font-semibold text-white" style={{ background: ink }}>Fazer pedido</span>
                <span className="font-mono text-[11px] font-bold" style={{ color: gold }}>Baixar HTML ↓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="lista" className="border-t py-24 md:py-32" style={{ borderColor: "#ece1cb", background: "#f3ebdc" }}>
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-medium" style={{ color: gold }}>Acesso</p>
            <h2 className="leading-[1.05]" style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}>
              Receba sua chave do SiteScope por email.
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed" style={{ color: muted }}>
              Criei o SiteScope recuperando sites de clientes. Agora qualquer pessoa pode fazer o mesmo sozinha, no próprio navegador.
            </p>
          </div>
          <div className="rounded-2xl border p-8 md:p-10" style={{ borderColor: "#e2d4b8", background: "#fffdf8" }}>
            <WaitlistForm />
            <p className="mt-5 text-center text-[12px]" style={{ color: muted }}>A chave chega no seu email em minutos.</p>
          </div>
        </div>
      </section>

      <footer className="border-t" style={{ borderColor: "#ece1cb" }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 py-10 md:flex-row">
          <div className="flex items-center gap-3">
            <img src="/sitescope-logo.png" alt="" className="h-8 w-8 object-contain mix-blend-multiply" />
            <span className="text-sm" style={{ color: muted }}>© 2026 Hunter X · SiteScope</span>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm" style={{ color: muted }}>
            <a href="/sitescope" className="hover:underline">SiteScope</a>
            <a href="/privacidade" className="hover:underline">Privacidade</a>
            <a href="/termos" className="hover:underline">Termos</a>
            <a href="mailto:suporte@hunterx.site" className="hover:underline">Contato</a>
          </nav>
        </div>
        <p className="pb-8 text-center text-[11px]" style={{ color: "#9a8a6c" }}>
          Use o SiteScope para recuperar páginas que são suas ou que você tem autorização para restaurar.
        </p>
      </footer>
    </main>
  );
}
