'use client';

import React, { useEffect, useState } from 'react';

interface CosmicParallaxBgProps {
  head: string;
  text: string;
  loop?: boolean;
  className?: string;
  scrollTargetId?: string;
  onScrollDown?: () => void;
}

const CosmicParallaxBg: React.FC<CosmicParallaxBgProps> = ({
  head,
  text,
  loop = true,
  className = '',
  scrollTargetId,
  onScrollDown,
}) => {
  const [smallStars,  setSmallStars]  = useState('');
  const [mediumStars, setMediumStars] = useState('');
  const [bigStars,    setBigStars]    = useState('');

  const textParts = text.split(',').map(p => p.trim());

  const generateStarBoxShadow = (count: number): string => {
    const shadows: string[] = [];
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      shadows.push(`${x}px ${y}px #FFF`);
    }
    return shadows.join(', ');
  };

  useEffect(() => {
    setSmallStars(generateStarBoxShadow(700));
    setMediumStars(generateStarBoxShadow(200));
    setBigStars(generateStarBoxShadow(100));
    document.documentElement.style.setProperty(
      '--animation-iteration',
      loop ? 'infinite' : '1'
    );
  }, [loop]);

  return (
    <div className={`cosmic-parallax-container ${className}`}>
      {/* Stars */}
      <div className="cosmic-stars"  style={{ boxShadow: smallStars  }} />
      <div className="cosmic-stars-medium" style={{ boxShadow: mediumStars }} />
      <div className="cosmic-stars-large"  style={{ boxShadow: bigStars   }} />

      {/* Planet glow + earth */}
      <div id="horizon"><div className="glow" /></div>
      <div id="earth" />

      {/* Copy */}
      <div id="cosmic-title">{head.toUpperCase()}</div>
      <div id="cosmic-subtitle">
        {textParts.map((part, i) => (
          <React.Fragment key={i}>
            <span className={`subtitle-part-${i + 1}`}>{part.toUpperCase()}</span>
            {i < textParts.length - 1 && (
              <span className="subtitle-sep">·</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Scroll hint */}
      {(onScrollDown || scrollTargetId) && (
        <button
          onClick={() => {
            if (onScrollDown) { onScrollDown(); return; }
            if (scrollTargetId) {
              document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="cosmic-scroll-btn"
          aria-label="Rolar para baixo"
        >
          <span className="cosmic-scroll-label">COMO FUNCIONA</span>
          <svg width="16" height="16" viewBox="0 0 22 22" fill="none" className="cosmic-scroll-arrow">
            <path d="M11 5V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 12L11 17L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

export { CosmicParallaxBg };
