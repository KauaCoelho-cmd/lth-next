"use client";

import { useEffect, useState } from "react";

const CHAVE = "hx-goblin-media";
const SEGREDO = "1234";

/**
 * Bloco da chave no card de acesso.
 *
 * Mostra o vídeo por padrão. Digitar 1234 em qualquer lugar da página
 * alterna para a imagem antiga — e digitar de novo volta pro vídeo.
 * A escolha fica salva no navegador, então sobrevive ao recarregar.
 */
export default function KeyGoblinMedia() {
  const [mostrarVideo, setMostrarVideo] = useState(true);

  // Lê a preferência salva depois da montagem (evita divergência com o HTML do servidor)
  useEffect(() => {
    try {
      if (localStorage.getItem(CHAVE) === "imagem") setMostrarVideo(false);
    } catch {}
  }, []);

  // Escuta a sequência secreta
  useEffect(() => {
    let digitado = "";

    function aoTeclar(e: KeyboardEvent) {
      // Não intercepta quem está preenchendo o formulário
      const alvo = e.target as HTMLElement | null;
      if (alvo) {
        const tag = alvo.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || alvo.isContentEditable) return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (!/^[0-9]$/.test(e.key)) { digitado = ""; return; }

      digitado = (digitado + e.key).slice(-SEGREDO.length);
      if (digitado !== SEGREDO) return;

      digitado = "";
      setMostrarVideo((atual) => {
        const proximo = !atual;
        try { localStorage.setItem(CHAVE, proximo ? "video" : "imagem"); } catch {}
        return proximo;
      });
    }

    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, []);

  return (
    <div className="relative h-52 md:h-60 overflow-hidden">
      {mostrarVideo ? (
        <video
          key="video"
          src="/key-goblin.mp4"
          poster="/key-goblin-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="A chave de acesso, entregue pelo goblin"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "50% 32%" }}
        />
      ) : (
        <img
          key="imagem"
          src="/key-goblin.jpg"
          alt="A chave de acesso, entregue pelo goblin"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "50% 32%", animation: "keyDrift 18s ease-in-out infinite alternate" }}
        />
      )}

      {/* fade para o card */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{ background: "linear-gradient(to top, #0a0a15, transparent)" }}
      />
      {/* legenda */}
      <p className="absolute bottom-3 left-0 right-0 text-center font-mono text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">
        Forjada para poucos
      </p>

      <style>{`
        @keyframes keyDrift {
          from { transform: scale(1); }
          to   { transform: scale(1.06); }
        }
      `}</style>
    </div>
  );
}
