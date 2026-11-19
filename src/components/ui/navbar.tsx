"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { HunterLogo } from "./hunter-logo";

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
          ? "border-b border-[#e2d4b8] bg-white/95 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        {/* Logo */}
        <a
          href="#hero"
          className="group flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2 rounded-lg"
          aria-label="Hunter X — página inicial"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl transition group-hover:scale-105">
            <img src="/logo.png" alt="" className="h-10 w-10 object-contain mix-blend-multiply" />
          </div>
          <span className="font-display text-[20px] font-black tracking-tight text-[#2b2418]">
            Hunter <span className="text-[#9a7b3f]">X</span>
          </span>
        </a>

        {/* Links centrais — desktop */}
        <ul
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-[#e2d4b8] bg-[#f3ebdc] px-1.5 py-1 md:flex"
          role="list"
        >
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="group/link relative block rounded-full px-4 py-1.5 font-mono text-[12px] font-medium text-[#7a6a4f] transition-colors duration-200 hover:text-[#2b2418] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30"
              >
                <span className="absolute inset-0 scale-90 rounded-full bg-gray-200/60 opacity-0 transition-all duration-200 group-hover/link:scale-100 group-hover/link:opacity-100" />
                <span className="relative">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Ações direita — desktop */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/download"
            className="flex items-center gap-1.5 rounded-lg border border-[#e2d4b8] px-3.5 py-2 font-mono text-[12px] font-medium text-[#5e5139] transition-all duration-200 hover:border-[#d3c09c] hover:bg-[#f3ebdc] hover:text-[#2b2418]"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </a>
          <a
            href="/download"
            className="relative overflow-hidden rounded-lg bg-[#2b2418] px-5 py-2 font-mono text-[12px] font-bold text-white transition-all duration-300 hover:bg-[#3d3322] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#fbf7ef]" />
              </span>
              Acesso exclusivo
              <span>→</span>
            </span>
          </a>
        </div>

        {/* Hamburger — mobile */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e2d4b8] bg-[#f3ebdc] text-[#5e5139] transition hover:border-[#d3c09c] hover:text-[#2b2418] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 md:hidden"
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
          open ? "max-h-64 border-t border-[#ece1cb]" : "max-h-0"
        }`}
        aria-hidden={!open}
      >
        <ul className="flex flex-col gap-1 px-4 py-3" role="list">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 font-mono text-sm text-[#5e5139] transition hover:bg-[#ede2cd] hover:text-[#2b2418] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/download"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-2.5 font-mono text-sm text-[#5e5139] transition hover:bg-[#ede2cd] hover:text-[#2b2418]"
            >
              <Download className="h-3.5 w-3.5" /> Download
            </a>
          </li>
          <li className="pt-1">
            <a
              href="/download"
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-[#2b2418] px-4 py-2.5 text-center font-mono text-sm font-bold text-white transition hover:bg-[#3d3322]"
            >
              Acesso exclusivo →
            </a>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
}
