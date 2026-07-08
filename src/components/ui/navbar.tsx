"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import Image from "next/image";

const links = [
  { label: "Início", href: "#hero" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "SiteScope", href: "#sitescope" },
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
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
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
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/10 transition group-hover:border-violet-500/60 group-hover:bg-violet-500/20 overflow-hidden">
            <Image src="/logo.png" alt="Hunter X" width={36} height={36} className="object-contain" />
          </div>
          <span className="font-display text-[20px] font-black tracking-tight text-white">
            Hunter <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">X</span>
          </span>
        </a>

        {/* Links centrais — desktop · pílula segmentada */}
        <ul
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.02] px-1.5 py-1 backdrop-blur-md md:flex"
          role="list"
        >
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="group/link relative block rounded-full px-4 py-1.5 font-mono text-[12px] font-medium text-zinc-400 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70"
              >
                {/* fundo hover */}
                <span className="absolute inset-0 scale-90 rounded-full bg-violet-500/10 opacity-0 transition-all duration-200 group-hover/link:scale-100 group-hover/link:opacity-100" />
                {/* underline reveal */}
                <span className="absolute bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-violet-400 to-cyan-400 transition-all duration-300 group-hover/link:w-1/2" />
                <span className="relative">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Ações direita — desktop */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/download"
            className="group/dl flex items-center gap-1.5 rounded-lg border border-white/[0.07] px-3.5 py-2 font-mono text-[12px] font-medium text-zinc-300 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.04] hover:text-white"
          >
            <Download className="h-3.5 w-3.5 transition-transform duration-200 group-hover/dl:translate-y-0.5" />
            Download
          </a>
          <a
            href="/download"
            className="group/cta relative overflow-hidden rounded-lg bg-gradient-to-r from-violet-600 to-violet-500 px-5 py-2 font-mono text-[12px] font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300 hover:shadow-[0_0_32px_rgba(139,92,246,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a14]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />
            <span className="relative flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              Acesso exclusivo
              <span className="transition-transform duration-200 group-hover/cta:translate-x-0.5">→</span>
            </span>
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
              href="/download"
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-violet-600 px-4 py-2.5 text-center font-mono text-sm font-bold text-white shadow-[0_0_16px_rgba(139,92,246,0.35)] transition hover:bg-violet-500"
            >
              Acesso exclusivo →
            </a>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
}
