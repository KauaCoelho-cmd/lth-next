'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import { Mesh } from 'three';

import {
  abs,
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  pass,
  mix,
  add,
} from 'three/tsl';

const DEFAULT_TEXTURE = 'https://i.postimg.cc/XYwvXN8D/img-4.png';
const DEFAULT_DEPTH = 'https://i.postimg.cc/2SHKQh2q/raw-4.webp';

extend(THREE as any);

/* ─── Post-processing: bloom + violet scan-line ─── */
const PostProcessing = ({
  strength = 1,
  threshold = 1,
  fullScreenEffect = true,
}: {
  strength?: number;
  threshold?: number;
  fullScreenEffect?: boolean;
}) => {
  const { gl, scene, camera } = useThree();
  const progressRef = useRef({ value: 0 });

  const render = useMemo(() => {
    const postProcessing = new THREE.PostProcessing(gl as any);
    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode('output');
    const bloomPass = bloom(scenePassColor, strength, 0.5, threshold);

    const uScanProgress = uniform(0);
    progressRef.current = uScanProgress;

    const scanPos = float(uScanProgress.value);
    const uvY = uv().y;
    const scanWidth = float(0.05);
    const scanLine = smoothstep(0, scanWidth, abs(uvY.sub(scanPos)));
    const violetOverlay = vec3(0.6, 0, 1.0).mul(oneMinus(scanLine)).mul(0.5);

    const withScanEffect = mix(
      scenePassColor,
      add(scenePassColor, violetOverlay),
      fullScreenEffect ? smoothstep(0.9, 1.0, oneMinus(scanLine)) : 1.0
    );

    const final = withScanEffect.add(bloomPass);
    postProcessing.outputNode = final;
    return postProcessing;
  }, [camera, gl, scene, strength, threshold, fullScreenEffect]);

  useFrame(({ clock }) => {
    progressRef.current.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    render.renderAsync();
  }, 1);

  return null;
};

/* ─── Scene: depth-map parallax mesh ─── */
const WIDTH = 300;
const HEIGHT = 300;

const Scene = ({ textureSrc, depthSrc }: { textureSrc: string; depthSrc: string }) => {
  const [rawMap, depthMap] = useTexture([textureSrc, depthSrc]);
  const meshRef = useRef<Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (rawMap && depthMap) setVisible(true);
  }, [rawMap, depthMap]);

  const { material, uniforms } = useMemo(() => {
    const uPointer = uniform(new THREE.Vector2(0));
    const uProgress = uniform(0);

    const strength = 0.015;
    const tDepthMap = texture(depthMap);

    // Mouse parallax: depth map drives UV distortion
    const tMap = texture(rawMap, uv().add(tDepthMap.r.mul(uPointer).mul(strength)));

    const aspect = float(WIDTH).div(HEIGHT);
    const tUv = vec2(uv().x.mul(aspect), uv().y);

    const tiling = vec2(120.0);
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);

    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));

    const dist = float(tiledUv.length());
    const dot = float(smoothstep(0.5, 0.49, dist)).mul(brightness);

    const depth = tDepthMap.r;
    const flow = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));
    const mask = dot.mul(flow).mul(vec3(10, 0, 14));

    const final = blendScreen(tMap, mask);

    const material = new THREE.MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 0,
    });

    return { material, uniforms: { uPointer, uProgress } };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    uniforms.uProgress.value = Math.sin(t * 0.5) * 0.5 + 0.5;

    if (meshRef.current) {
      // Rotação 3D suave — oscila em Y e X sem virar de costas
      meshRef.current.rotation.y = Math.sin(t * 0.25) * 0.35;
      meshRef.current.rotation.x = Math.sin(t * 0.18) * 0.12;
      // Leve flutuação vertical
      meshRef.current.position.y = Math.sin(t * 0.4) * 0.05;

      const mat = meshRef.current.material as any;
      if ('opacity' in mat) mat.opacity = THREE.MathUtils.lerp(mat.opacity, visible ? 1 : 0, 0.05);
    }
  });

  useFrame(({ pointer }) => { uniforms.uPointer.value = pointer; });

  return (
    <mesh ref={meshRef} scale={[w * 0.55, h * 0.55, 1]} material={material}>
      <planeGeometry />
    </mesh>
  );
};

/* ─── HUD corner brackets (cyber frame) ─── */
const CornerBrackets = () => (
  <div className="pointer-events-none absolute inset-6 z-10">
    <span className="absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2 border-violet-400/50" />
    <span className="absolute right-0 top-0 h-7 w-7 border-r-2 border-t-2 border-violet-400/50" />
    <span className="absolute bottom-0 left-0 h-7 w-7 border-b-2 border-l-2 border-violet-400/50" />
    <span className="absolute bottom-0 right-0 h-7 w-7 border-b-2 border-r-2 border-violet-400/50" />
    <span className="absolute left-9 top-0 -translate-y-1/2 font-mono text-[8px] uppercase tracking-[0.2em] text-violet-400/40">SYS:ACTIVE</span>
    <span className="absolute bottom-0 right-9 translate-y-1/2 font-mono text-[8px] uppercase tracking-[0.2em] text-violet-400/40">WebGPU:OK</span>
  </div>
);

/* ─── Blinking cursor ─── */
const Cursor = () => (
  <span className="ml-1 inline-block h-[0.7em] w-[2px] animate-[hero-flicker_1s_steps(1)_infinite] bg-violet-400 align-middle" />
);

/* ─── HUD metric chip ─── */
const Metric = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-start gap-0.5">
    <span className="font-mono text-lg font-black leading-none tabular-nums text-violet-300">{value}</span>
    <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">{label}</span>
  </div>
);

/* ═══════════════════════════════════════════════
   HERO FUTURISTIC — main export
═══════════════════════════════════════════════ */
export interface HeroFuturisticProps {
  titleWords?: string[];
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  priceLabel?: string;
  badge?: string;
  textureSrc?: string;
  depthSrc?: string;
}

export const HeroFuturistic = ({
  titleWords = ['VEJA', 'ANALISE', 'LUCRE'],
  subtitle = 'A primeira extensão Chrome que escaneia a Biblioteca do Meta em tempo real e revela os produtos low ticket que já estão escalando.',
  ctaLabel = '🎯 Garantir acesso por R$29,90',
  ctaHref = '#cta-final',
  priceLabel = 'Pagamento único · Acesso vitalício · Sem mensalidade',
  badge = 'EXTENSÃO CHROME · v1.3.0',
  textureSrc = DEFAULT_TEXTURE,
  depthSrc = DEFAULT_DEPTH,
}: HeroFuturisticProps) => {
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [delays, setDelays] = useState<number[]>([]);
  const [subtitleDelay, setSubtitleDelay] = useState(0);

  useEffect(() => {
    setDelays(titleWords.map(() => Math.random() * 0.07));
    setSubtitleDelay(Math.random() * 0.1);
  }, [titleWords.length]);

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const t = setTimeout(() => setVisibleWords(v => v + 1), 400);
      return () => clearTimeout(t);
    }
    const s = setTimeout(() => setSubtitleVisible(true), 500);
    const c = setTimeout(() => setCtaVisible(true), 1200);
    return () => { clearTimeout(s); clearTimeout(c); };
  }, [visibleWords, titleWords.length]);

  return (
    <div className="relative h-svh w-full overflow-hidden bg-[#0a0a14]">

      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.9) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Horizontal accent lines */}
      <div className="pointer-events-none absolute inset-x-0 top-[32%] z-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[22%] z-0 h-px bg-gradient-to-r from-transparent via-violet-500/12 to-transparent" />

      {/* ── WebGPU Canvas — right side, fades left ── */}
      <div className="absolute inset-0 z-0">
        {/* Left-to-right fade so text area stays legible */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(to right, #0a0a14 25%, rgba(10,10,20,0.65) 42%, rgba(10,10,20,0.05) 62%, transparent 78%)',
          }}
        />
        <Canvas
          flat
          gl={async (props) => {
            const renderer = new THREE.WebGPURenderer(props as any);
            await renderer.init();
            return renderer;
          }}
        >
          <PostProcessing fullScreenEffect />
          <Scene textureSrc={textureSrc} depthSrc={depthSrc} />
        </Canvas>
        <CornerBrackets />
      </div>

      {/* ── LEFT: Copy + CTA ── */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-30 flex w-full flex-col justify-center px-8 md:px-14 lg:max-w-[58%] xl:px-20 2xl:px-28">

        {/* Status badge */}
        <div
          className={`mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-violet-300 backdrop-blur-sm transition-all duration-700 ${
            subtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
          }`}
        >
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-300" />
          </span>
          ◉ {badge}
          <Cursor />
        </div>

        {/* Stacked title — one word per line for impact */}
        <h1 className="font-display font-black uppercase leading-[0.88] tracking-tight text-white"
          style={{ fontSize: 'clamp(3.2rem,7.5vw,6.5rem)' }}>
          {titleWords.map((word, i) => (
            <div
              key={i}
              className={`block ${i < visibleWords ? 'hero-fade-in' : ''}`}
              style={{
                animationDelay: `${i * 0.12 + (delays[i] || 0)}s`,
                opacity: i < visibleWords ? undefined : 0,
                ...(i === Math.floor(titleWords.length / 2)
                  ? {
                      background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }
                  : {}),
              }}
            >
              {word}
            </div>
          ))}
        </h1>

        {/* Accent separator */}
        <div
          className={`my-6 h-[2px] bg-gradient-to-r from-violet-500 via-cyan-500 to-transparent transition-all duration-1000 ${
            subtitleVisible ? 'opacity-100 w-24' : 'opacity-0 w-4'
          }`}
          style={{ transitionDelay: '150ms' }}
        />

        {/* Subtitle */}
        <p
          className={`max-w-md text-[15px] leading-[1.65] text-zinc-300/75 md:text-base xl:text-lg ${
            subtitleVisible ? 'hero-fade-in-subtitle' : ''
          }`}
          style={{
            animationDelay: `${titleWords.length * 0.12 + 0.1 + subtitleDelay}s`,
            opacity: subtitleVisible ? undefined : 0,
          }}
        >
          {subtitle}
        </p>

        {/* CTA group */}
        <div
          className={`pointer-events-auto mt-8 flex flex-col items-start gap-3 transition-all duration-700 ${
            ctaVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}
        >
          <a
            href={ctaHref}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl border border-violet-400/30 bg-gradient-to-b from-violet-500 to-violet-700 px-8 py-4 text-base font-bold text-white shadow-[0_0_40px_rgba(139,92,246,.4),inset_0_1px_0_rgba(255,255,255,.15)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_72px_rgba(139,92,246,.7)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">{ctaLabel}</span>
          </a>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            {priceLabel}
          </span>
        </div>

        {/* HUD metrics */}
        <div
          className={`mt-8 flex items-center gap-7 border-t border-white/[0.06] pt-6 transition-all duration-700 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
          style={{ transitionDelay: '250ms' }}
        >
          <Metric value="23K+" label="Anúncios/dia" />
          <div className="h-5 w-px bg-white/10" />
          <Metric value="15" label="Plataformas" />
          <div className="h-5 w-px bg-white/10" />
          <Metric value="0–100" label="Score viral" />
        </div>
      </div>

      {/* ── Scroll CTA ── */}
      <button
        className="hero-explore-btn"
        style={{ animationDelay: '2.4s' }}
        onClick={() => document.querySelector('#problema')?.scrollIntoView({ behavior: 'smooth' })}
      >
        Como funciona
        <span className="hero-explore-arrow">
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-arrow-svg">
            <path d="M11 5V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 12L11 17L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>

    </div>
  );
};

export default HeroFuturistic;
