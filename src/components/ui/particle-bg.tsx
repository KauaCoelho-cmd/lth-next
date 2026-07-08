"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  alphaDir: number;
  color: string;
}

export function ParticleBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let particles: Particle[] = [];

    const COLORS = [
      "rgba(167,139,250,",   // violet-400
      "rgba(124,58,237,",    // violet-600
      "rgba(34,211,238,",    // cyan-400
      "rgba(192,132,252,",   // purple-400
    ];

    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
      init();
    }

    function init() {
      if (!canvas) return;
      const count = Math.floor((canvas.width * canvas.height) / 18000);
      particles = Array.from({ length: count }, () => spawn(canvas!));
    }

    function spawn(c: HTMLCanvasElement): Particle {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        alphaDir: (Math.random() - 0.5) * 0.008,
        color,
      };
    }

    function tick() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaDir;

        if (p.alpha <= 0.05 || p.alpha >= 0.65) p.alphaDir *= -1;
        if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particles[i] = spawn(canvas);
          return;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.shadowColor = p.color + "0.8)";
        ctx.shadowBlur = p.size * 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      raf = requestAnimationFrame(tick);
    }

    // Observe document height changes (page grows as user scrolls)
    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    resize();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.35,
      }}
    />
  );
}
