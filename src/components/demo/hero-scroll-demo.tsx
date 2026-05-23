"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 mb-6 text-xs font-mono font-semibold tracking-widest text-violet-400 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
              </span>
              Extensão Chrome · v2.1.0
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
              Encontre os{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                low tickets
              </span>{" "}
              que estão <br />
              escalando no Meta —{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                em segundos
              </span>
              , não em horas.
            </h1>

            <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
              Extensão que destaca automaticamente produtos validados na
              Biblioteca de Anúncios do Meta — com bordas coloridas, score
              viral, dias rodando e plataforma de venda.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-violet-800 px-8 py-4 text-base font-bold text-white shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:shadow-[0_0_60px_rgba(139,92,246,0.6)] transition-all hover:-translate-y-0.5"
              >
                🎯 Garantir acesso por R$29,90
              </a>
              <div className="text-xs text-zinc-500 font-mono">
                Pagamento único · Acesso vitalício
              </div>
            </div>
          </>
        }
      >
        {/* Mock browser screenshot of the extension in action */}
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop"
          alt="Hunter X — extensão em ação na Biblioteca do Meta"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-top"
          draggable={false}
          priority
        />

        {/* HUD overlay — simulates the extension UI */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 rounded-lg border border-zinc-700 bg-zinc-900/95 backdrop-blur px-4 py-2 text-xs font-mono shadow-xl">
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-base font-black text-emerald-400">23</span>
            <span className="text-zinc-500 text-[10px]">Low ticket</span>
          </div>
          <div className="h-7 w-px bg-zinc-700" />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-base font-black text-orange-400">8</span>
            <span className="text-zinc-500 text-[10px]">Mid ticket</span>
          </div>
          <div className="h-7 w-px bg-zinc-700" />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-base font-black text-blue-400">31</span>
            <span className="text-zinc-500 text-[10px]">Total</span>
          </div>
          <div className="h-7 w-px bg-zinc-700" />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-base font-black text-violet-400">🔄</span>
            <span className="text-zinc-500 text-[10px]">Auto-scroll</span>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
