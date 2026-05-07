'use client';

import React from 'react';
import Timeline from '@/components/ui/Timeline';
import FadeInView from '@/components/animations/FadeInView';
import { TIMELINE_EVENTS } from '@/lib/constants';

function KalevalaSVG() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Калевала — финский национальный эпос"
    >
      {/* Book shape */}
      <rect x="12" y="10" width="48" height="52" rx="3" fill="rgba(212,160,23,0.15)" stroke="#d4a017" strokeWidth="1" />
      {/* Spine */}
      <rect x="12" y="10" width="8" height="52" rx="2" fill="rgba(212,160,23,0.25)" />
      {/* Lines representing text */}
      <line x1="26" y1="24" x2="52" y2="24" stroke="rgba(212,160,23,0.4)" strokeWidth="1" />
      <line x1="26" y1="30" x2="52" y2="30" stroke="rgba(212,160,23,0.4)" strokeWidth="1" />
      <line x1="26" y1="36" x2="52" y2="36" stroke="rgba(212,160,23,0.4)" strokeWidth="1" />
      <line x1="26" y1="42" x2="44" y2="42" stroke="rgba(212,160,23,0.4)" strokeWidth="1" />
      {/* Decorative rune symbol */}
      <text x="36" y="56" textAnchor="middle" fill="#d4a017" fontSize="10" fontFamily="serif" opacity="0.7">
        ᚲ
      </text>
    </svg>
  );
}

export default function ChapterGoldenAge() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#1a1500',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        overflow: 'hidden',
      }}
    >
      {/* Warm golden radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(212,160,23,0.12) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '900px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        {/* Heading */}
        <FadeInView delay={100} direction="up">
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 700,
              color: '#d4a017',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Золотой век Финляндии
          </h2>
        </FadeInView>

        {/* Subheading */}
        <FadeInView delay={250} direction="up">
          <p
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              fontFamily: 'sans-serif',
              color: 'rgba(212,160,23,0.65)',
              textAlign: 'center',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            XIX век — время расцвета
          </p>
        </FadeInView>

        {/* Body text */}
        <FadeInView delay={350} direction="up">
          <p
            style={{
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              fontFamily: 'sans-serif',
              color: 'rgba(245,240,232,0.65)',
              lineHeight: 1.75,
              textAlign: 'center',
              maxWidth: '600px',
            }}
          >
            Автономия дала Финляндии возможность активно развиваться. Хельсинки стал новой
            столицей. Финский язык стал частью национальной идентичности. Появился национальный
            эпос «Калевала».
          </p>
        </FadeInView>

        {/* Timeline */}
        <FadeInView delay={450} direction="none" className="golden-timeline-wrapper">
          <div style={{ width: '100%' }}>
            <Timeline events={TIMELINE_EVENTS} />
          </div>
        </FadeInView>

        {/* Quote */}
        <FadeInView delay={600} direction="up">
          <blockquote style={{ textAlign: 'center', maxWidth: '640px' }}>
            <p
              style={{
                fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontStyle: 'italic',
                color: '#d4a017',
                lineHeight: 1.6,
              }}
            >
              «Именно в составе России начала формироваться современная Финляндия»
            </p>
          </blockquote>
        </FadeInView>

        {/* Decorative Kalevala book */}
        <FadeInView delay={700} direction="none">
          <div aria-hidden="true" style={{ opacity: 0.6 }}>
            <KalevalaSVG />
          </div>
        </FadeInView>
      </div>

      <style>{`
        .golden-timeline-wrapper {
          width: 100%;
        }
      `}</style>
    </section>
  );
}
