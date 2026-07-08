"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollVideo({ onEnd }: { onEnd?: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play().catch(() => {});

    const handleEnd = () => {
      setEnded(true);
      onEnd?.();
    };

    video.addEventListener("ended", handleEnd);
    return () => video.removeEventListener("ended", handleEnd);
  }, [onEnd]);

  if (ended) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src="/hero-bg.mp4"
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      />
      {/* Botão pular */}
      <button
        onClick={() => { setEnded(true); onEnd?.(); }}
        className="absolute bottom-8 right-8 font-mono text-xs text-white/40 hover:text-white/80 transition border border-white/10 hover:border-white/30 rounded-full px-4 py-2"
      >
        Pular →
      </button>
    </div>
  );
}
