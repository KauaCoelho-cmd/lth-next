"use client";

import { useState, useEffect } from "react";
import { Target, Menu, X, Download } from "lucide-react";

const links = [
  { label: "Por que usar", href: "#problema" },
  { label: "Funcionalidades", href: "#planos" },
  { label: "Planos", href: "#planos" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.07] bg-[#0a0a14]/95 shadow-[0_4px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          : "border-b border-transparent bg-[#0a0a14]/60 backdrop-blur-md"
      }`}
    >
      {/* Linha de glow superior que aparece ao scrollar */}
      <div
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        {/* Logo */}
        <a
          href="#hero"
          className="group flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a14] rounded-lg"
          aria-label="Hunter X — página inicial"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/10 transition group-hover:border-violet-500/60 group-hover:bg-violet-500/20">
            <Target className="h-4 w-4 text-violet-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-[15px] font-bold tracking-tight text-white">
              Hunter X
            </span>
            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-1.5 py-px font-mono text-[9px] font-bold tracking-widest text-violet-400 uppercase">
              v2.1.0
            </span>
          </div>
        </a>

        {/* Links centrais — desktop */}
        <ul className="hidden items-center gap-1 md:flex" role="list">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="rounded-md px-3 py-1.5 font-mono text-[12px] font-medium text-zinc-400 transition hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Ações direita — desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/download"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-[12px] font-medium text-zinc-400 transition hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </a>
          <a
            href="#planos"
            className="relative overflow-hidden rounded-lg bg-violet-600 px-4 py-2 font-mono text-[12px] font-bold text-white shadow-[0_0_16px_rgba(139,92,246,0.35)] transition hover:bg-violet-500 hover:shadow-[0_0_24px_rgba(139,92,246,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a14]"
          >
            {/* shimmer */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 hover:translate-x-full" />
            Ver planos →
          </a>
        </div>

        {/* Hamburger — mobile */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-zinc-400 transition hover:border-violet-500/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Menu mobile */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          open ? "max-h-64 border-t border-white/[0.06]" : "max-h-0"
        }`}
        aria-hidden={!open}
      >
        <ul className="flex flex-col gap-1 px-4 py-3" role="list">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 font-mono text-sm text-zinc-300 transition hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/download"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-2.5 font-mono text-sm text-zinc-300 transition hover:bg-white/[0.05] hover:text-white"
            >
              <Download className="h-3.5 w-3.5" /> Download
            </a>
          </li>
          <li className="pt-1">
            <a
              href="#planos"
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-violet-600 px-4 py-2.5 text-center font-mono text-sm font-bold text-white shadow-[0_0_16px_rgba(139,92,246,0.35)] transition hover:bg-violet-500"
            >
              Ver planos →
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
