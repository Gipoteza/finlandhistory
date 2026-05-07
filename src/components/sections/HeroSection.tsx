'use client';

import React from 'react';
import MapComponent from '@/components/ui/MapComponent';
import ParticleSystem from '@/components/ui/ParticleSystem';
import ScrollIndicator from '@/components/ui/ScrollIndicator';
import FadeInView from '@/components/animations/FadeInView';

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Vignette overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Map background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          zIndex: 0,
        }}
      >
        <MapComponent variant="hero" className="hero-map-fill" />
      </div>

      {/* Particle system */}
      <ParticleSystem
        type="snow"
        count={100}
        mobileCount={50}
        className="hero-particles"
      />

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          maxWidth: '900px',
          width: '100%',
        }}
      >
        {/* Date label */}
        <FadeInView delay={200} direction="none">
          <p
            style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: '#c9a84c',
              marginBottom: '1rem',
              fontFamily: 'sans-serif',
            }}
          >
            1809 — 1917
          </p>
        </FadeInView>

        {/* Subheading year */}
        <FadeInView delay={300} direction="up">
          <p
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontFamily: 'Georgia, serif',
              color: '#c9a84c',
              marginBottom: '1.5rem',
              fontWeight: 400,
            }}
          >
            1809–1917
          </p>
        </FadeInView>

        {/* Main heading */}
        <FadeInView delay={500} direction="up">
          <h1
            style={{
              fontSize: 'clamp(1.6rem, 4.5vw, 3rem)',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 700,
              color: '#f5f0e8',
              lineHeight: 1.25,
              maxWidth: '800px',
              marginBottom: '1.5rem',
            }}
          >
            Как Финляндия стала почти отдельным государством внутри Российской империи
          </h1>
        </FadeInView>

        {/* Subtitle */}
        <FadeInView delay={800} direction="up">
          <p
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
              fontFamily: 'sans-serif',
              color: 'rgba(245, 240, 232, 0.6)',
              letterSpacing: '0.04em',
              maxWidth: '560px',
            }}
          >
            История автономии, развития и пути к независимости
          </p>
        </FadeInView>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
        }}
      >
        <ScrollIndicator />
      </div>

      {/* Bottom gradient transition */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: 'linear-gradient(to bottom, transparent, #0a0a0a)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      <style>{`
        .hero-map-fill {
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
        }
        .hero-particles {
          position: absolute !important;
          inset: 0;
          z-index: 2;
        }
      `}</style>
    </section>
  );
}
