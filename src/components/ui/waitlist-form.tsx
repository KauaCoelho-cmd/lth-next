"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    if (email) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-6 py-4 font-mono text-sm font-bold text-green-400">
        ✓ Você está na lista! Avisaremos assim que abrir vaga.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        name="email"
        required
        placeholder="seu@email.com"
        className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white placeholder-zinc-600 outline-none transition focus:border-violet-500/50 focus:bg-white/[0.08] focus:ring-1 focus:ring-violet-500/30"
      />
      <button
        type="submit"
        className="rounded-xl bg-gradient-to-r from-violet-600 to-violet-800 px-6 py-3 font-mono text-sm font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] transition hover:opacity-90 hover:-translate-y-0.5"
      >
        Entrar na lista
      </button>
    </form>
  );
}
