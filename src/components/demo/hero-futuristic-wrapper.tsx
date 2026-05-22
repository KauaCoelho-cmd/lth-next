"use client";

import dynamic from "next/dynamic";

// WebGPU only initializes in the browser — disable SSR.
const HeroFuturistic = dynamic(
  () =>
    import("@/components/ui/hero-futuristic").then((m) => m.HeroFuturistic),
  {
    ssr: false,
    loading: () => <HeroFallback />,
  }
);

function HeroFallback() {
  return (
    <div className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-[#0a0a14]">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(139,92,246,.35) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500/25 border-t-violet-400" />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-violet-300/70">
          Inicializando WebGPU…
        </span>
      </div>
    </div>
  );
}

export interface HeroFuturisticWrapperProps {
  titleWords?: string[];
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  priceLabel?: string;
  badge?: string;
}

export function HeroFuturisticWrapper(props: HeroFuturisticWrapperProps) {
  return <HeroFuturistic {...props} />;
}
