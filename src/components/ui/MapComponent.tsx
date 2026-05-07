'use client';

import React, { useEffect, useRef } from 'react';

interface MapComponentProps {
  variant: 'hero' | 'transition-1809';
  className?: string;
}

// Simplified stylized SVG paths for Northern Europe (Scandinavia region)
// These are evocative shapes, not geographically precise
const SWEDEN_PATH =
  'M 120,60 L 145,50 L 160,65 L 165,90 L 155,120 L 150,155 L 140,185 L 125,210 L 110,230 L 100,215 L 95,190 L 100,160 L 105,130 L 108,100 L 110,75 Z';

const FINLAND_PATH =
  'M 165,60 L 195,50 L 225,55 L 245,70 L 255,95 L 250,125 L 240,155 L 225,175 L 210,185 L 195,180 L 180,170 L 165,155 L 158,130 L 155,105 L 158,80 Z';

const RUSSIA_PATH =
  'M 255,55 L 310,45 L 360,50 L 390,70 L 400,100 L 395,140 L 380,170 L 355,185 L 320,190 L 290,185 L 265,175 L 250,155 L 248,125 L 252,95 Z';

const BALTIC_PATH =
  'M 110,230 L 125,210 L 140,185 L 155,200 L 165,220 L 180,235 L 195,245 L 210,250 L 230,248 L 250,240 L 265,230 L 280,240 L 270,260 L 240,270 L 200,275 L 160,270 L 130,260 Z';

export default function MapComponent({ variant, className }: MapComponentProps) {
  const finlandRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    async function init() {
      const { gsap } = await import('gsap');

      if (variant === 'hero' && svgRef.current) {
        // Slow zoom in and out, looping
        gsap.to(svgRef.current, {
          scale: 1.15,
          duration: 8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          transformOrigin: '50% 50%',
        });
      }

      if (variant === 'transition-1809' && finlandRef.current && glowRef.current) {
        // Animate Finland fill from Swedish blue to Russian red
        gsap.fromTo(
          finlandRef.current,
          { fill: '#006AA7' },
          {
            fill: '#CC0000',
            duration: 2,
            ease: 'power2.inOut',
            delay: 0.5,
            onComplete: () => {
              // Pulsing glow after transition
              if (glowRef.current) {
                gsap.to(glowRef.current, {
                  opacity: 0.6,
                  duration: 1,
                  ease: 'sine.inOut',
                  yoyo: true,
                  repeat: -1,
                });
              }
            },
          }
        );
      }
    }

    init();

    return () => {
      // Cleanup handled by GSAP garbage collection on unmount
      import('gsap').then(({ gsap }) => {
        if (svgRef.current) gsap.killTweensOf(svgRef.current);
        if (finlandRef.current) gsap.killTweensOf(finlandRef.current);
        if (glowRef.current) gsap.killTweensOf(glowRef.current);
      });
    };
  }, [variant]);

  const finlandInitialFill =
    variant === 'transition-1809' ? '#006AA7' : '#2a3a2a';

  return (
    <div
      className={className}
      style={{
        background: '#0a0a0a',
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <svg
        ref={svgRef}
        viewBox="80 40 330 250"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block' }}
        aria-label="Карта Северной Европы — Швеция, Финляндия, Россия"
      >
        <defs>
          {/* Old map paper texture filter */}
          <filter id="map-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended" />
            <feComponentTransfer in="blended">
              <feFuncA type="linear" slope="1" />
            </feComponentTransfer>
          </filter>

          {/* Gold glow for Finland in hero variant */}
          <filter id="finland-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="#c9a84c" floodOpacity="0.5" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Red glow for Finland after 1809 transition */}
          <filter id="finland-red-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feFlood floodColor="#CC0000" floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dark ocean/sea background */}
        <rect x="80" y="40" width="330" height="250" fill="#0d1520" />

        {/* Baltic Sea area — slightly lighter water */}
        <path
          d={BALTIC_PATH}
          fill="#111e2e"
          stroke="#1a2a3a"
          strokeWidth="0.5"
        />

        {/* Sweden */}
        <path
          d={SWEDEN_PATH}
          fill="#1e2a1e"
          stroke="#2a3a2a"
          strokeWidth="1"
          opacity="0.9"
        />

        {/* Russia */}
        <path
          d={RUSSIA_PATH}
          fill="#1e1a1a"
          stroke="#2a2020"
          strokeWidth="1"
          opacity="0.9"
        />

        {/* Finland glow layer (for hero: gold; for transition: red after animation) */}
        <path
          ref={glowRef}
          d={FINLAND_PATH}
          fill={variant === 'hero' ? '#c9a84c' : '#CC0000'}
          filter={variant === 'hero' ? 'url(#finland-glow)' : 'url(#finland-red-glow)'}
          opacity={variant === 'hero' ? 0.3 : 0}
          style={{ pointerEvents: 'none' }}
        />

        {/* Finland main shape */}
        <path
          ref={finlandRef}
          d={FINLAND_PATH}
          fill={finlandInitialFill}
          stroke={variant === 'hero' ? '#c9a84c' : '#4a6a8a'}
          strokeWidth="1.5"
          opacity="0.95"
        />

        {/* Country labels */}
        <text
          x="128"
          y="148"
          textAnchor="middle"
          fill="rgba(245,240,232,0.45)"
          fontSize="9"
          fontFamily="serif"
          letterSpacing="1"
          transform="rotate(-5, 128, 148)"
        >
          ШВЕЦИЯ
        </text>

        <text
          x="205"
          y="125"
          textAnchor="middle"
          fill={variant === 'hero' ? 'rgba(201,168,76,0.7)' : 'rgba(245,240,232,0.55)'}
          fontSize="9"
          fontFamily="serif"
          letterSpacing="1"
          fontWeight="bold"
        >
          ФИНЛЯНДИЯ
        </text>

        <text
          x="325"
          y="120"
          textAnchor="middle"
          fill="rgba(245,240,232,0.35)"
          fontSize="9"
          fontFamily="serif"
          letterSpacing="1"
        >
          РОССИЯ
        </text>

        {/* Subtle grid lines for old map aesthetic */}
        <line x1="80" y1="100" x2="410" y2="100" stroke="rgba(245,240,232,0.04)" strokeWidth="0.5" />
        <line x1="80" y1="150" x2="410" y2="150" stroke="rgba(245,240,232,0.04)" strokeWidth="0.5" />
        <line x1="80" y1="200" x2="410" y2="200" stroke="rgba(245,240,232,0.04)" strokeWidth="0.5" />
        <line x1="150" y1="40" x2="150" y2="290" stroke="rgba(245,240,232,0.04)" strokeWidth="0.5" />
        <line x1="220" y1="40" x2="220" y2="290" stroke="rgba(245,240,232,0.04)" strokeWidth="0.5" />
        <line x1="290" y1="40" x2="290" y2="290" stroke="rgba(245,240,232,0.04)" strokeWidth="0.5" />
        <line x1="360" y1="40" x2="360" y2="290" stroke="rgba(245,240,232,0.04)" strokeWidth="0.5" />

        {/* Vignette overlay */}
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
        </radialGradient>
        <rect x="80" y="40" width="330" height="250" fill="url(#vignette)" />
      </svg>
    </div>
  );
}
