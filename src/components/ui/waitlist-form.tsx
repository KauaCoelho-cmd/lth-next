"use client";

import { useState } from "react";

const COUNTRIES = [
  { code: "BR", flag: "🇧🇷", name: "Brasil" },
  { code: "PT", flag: "🇵🇹", name: "Portugal" },
  { code: "US", flag: "🇺🇸", name: "United States" },
  { code: "AR", flag: "🇦🇷", name: "Argentina" },
  { code: "MX", flag: "🇲🇽", name: "México" },
  { code: "CO", flag: "🇨🇴", name: "Colombia" },
  { code: "CL", flag: "🇨🇱", name: "Chile" },
  { code: "ES", flag: "🇪🇸", name: "España" },
  { code: "OTHER", flag: "🌍", name: "Outro país" },
];

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [country, setCountry] = useState("BR");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    if (email) {
      // Salva email + país para análise futura de expansão
      try {
        await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, country }),
        });
      } catch {
        // silencioso — não bloqueia o submit
      }
      setSubmitted(true);
    }
  }

  if (submitted) {
    const selected = COUNTRIES.find(c => c.code === country);
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-6 py-4 font-mono text-sm font-bold text-green-400">
        <span>✓ Você está na lista!</span>
        <span className="text-xs font-normal text-zinc-500">País registrado: {selected?.flag} {selected?.name}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

      {/* Email */}
      <input
        type="email"
        name="email"
        required
        placeholder="seu@email.com"
        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-mono text-sm text-white placeholder-zinc-400 outline-none transition focus:border-violet-500/50 focus:bg-white/[0.15] focus:ring-1 focus:ring-violet-500/30"
      />

      {/* País */}
      <div className="relative">
        <select
          value={country}
          onChange={e => setCountry(e.target.value)}
          className="w-full appearance-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-mono text-sm text-white outline-none transition focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 cursor-pointer"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          {COUNTRIES.map(c => (
            <option key={c.code} value={c.code} style={{ background: "#0a0a14" }}>
              {c.flag} {c.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">▾</div>
      </div>

      {/* Botão */}
      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-violet-800 px-6 py-3 font-mono text-sm font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] transition hover:opacity-90 hover:-translate-y-0.5"
      >
        Entrar na lista →
      </button>
    </form>
  );
}
