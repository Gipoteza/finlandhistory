'use client';

import React from 'react';
import MapComponent from '@/components/ui/MapComponent';
import ParallaxLayer from '@/components/ui/ParallaxLayer';
import FadeInView from '@/components/animations/FadeInView';

export default function Chapter1809() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#0d0d1a',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Parchment/paper texture via CSS gradient */}
      <ParallaxLayer speed={0.3} className="">
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")
            `,
            backgroundRepeat: 'repeat',
            opacity: 0.5,
            pointerEvents: 'none',
          }}
        />
      </ParallaxLayer>

      {/* Two-column layout */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '4rem 2rem',
          gap: '3rem',
        }}
        className="chapter-1809-layout"
      >
        {/* Left: Map */}
        <div
          style={{
            flex: '0 0 45%',
            minHeight: '400px',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
          className="chapter-1809-map"
        >
          <MapComponent
            variant="transition-1809"
            className="chapter-1809-map-inner"
          />
        </div>

        {/* Right: Text content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
          className="chapter-1809-text"
        >
          {/* Label */}
          <FadeInView delay={100} direction="none">
            <p
              style={{
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                color: '#c9a84c',
                fontFamily: 'sans-serif',
              }}
            >
              1808 — 1809
            </p>
          </FadeInView>

          {/* Heading */}
          <FadeInView delay={200} direction="up">
            <h2
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 700,
                color: '#f5f0e8',
                lineHeight: 1.3,
              }}
            >
              1809 — Финляндия переходит Российской империи
            </h2>
          </FadeInView>

          {/* Body text */}
          <FadeInView delay={350} direction="up">
            <p
              style={{
                fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                fontFamily: 'sans-serif',
                color: 'rgba(245, 240, 232, 0.7)',
                lineHeight: 1.7,
                maxWidth: '480px',
              }}
            >
              До 1809 года Финляндия была частью Швеции. После Фридрихсгамского мирного договора
              Швеция уступила Финляндию России. Так появилось Великое княжество Финляндское.
            </p>
          </FadeInView>

          {/* Quote block */}
          <FadeInView delay={500} direction="up">
            <blockquote
              style={{
                borderLeft: '3px solid #c9a84c',
                paddingLeft: '1.25rem',
                margin: '0.5rem 0',
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontStyle: 'italic',
                  color: '#c9a84c',
                  lineHeight: 1.5,
                }}
              >
                «Финляндия больше не была шведской — но ещё не стала полностью российской»
              </p>
            </blockquote>
          </FadeInView>

          {/* Decorative seal SVG */}
          <FadeInView delay={650} direction="none">
            <div aria-hidden="true" style={{ opacity: 0.35 }}>
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="32" cy="32" r="30" stroke="#c9a84c" strokeWidth="1.5" />
                <circle cx="32" cy="32" r="24" stroke="#c9a84c" strokeWidth="0.75" />
                <text
                  x="32"
                  y="28"
                  textAnchor="middle"
                  fill="#c9a84c"
                  fontSize="8"
                  fontFamily="serif"
                  letterSpacing="1"
                >
                  ВЕЛИКОЕ
                </text>
                <text
                  x="32"
                  y="38"
                  textAnchor="middle"
                  fill="#c9a84c"
                  fontSize="8"
                  fontFamily="serif"
                  letterSpacing="1"
                >
                  КНЯЖЕСТВО
                </text>
                <text
                  x="32"
                  y="48"
                  textAnchor="middle"
                  fill="#c9a84c"
                  fontSize="6"
                  fontFamily="serif"
                  letterSpacing="1"
                >
                  1809
                </text>
              </svg>
            </div>
          </FadeInView>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        .chapter-1809-layout {
          flex-direction: row;
        }
        .chapter-1809-map-inner {
          width: 100%;
          height: 100%;
          min-height: 400px;
        }
        @media (max-width: 767px) {
          .chapter-1809-layout {
            flex-direction: column !important;
          }
          .chapter-1809-map {
            flex: none !important;
            width: 100% !important;
            min-height: 260px !important;
          }
          .chapter-1809-map-inner {
            min-height: 260px;
          }
        }
      `}</style>
    </section>
  );
}
