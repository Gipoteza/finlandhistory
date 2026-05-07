'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import FadeInView from '@/components/animations/FadeInView';

const NEWSPAPER_HEADLINES = [
  { text: 'Февральский манифест 1899 года', rotation: -2 },
  { text: 'Финская армия подчинена империи', rotation: 1.5 },
  { text: 'Протесты охватили страну', rotation: -1 },
];

export default function ChapterRussification() {
  const sectionRef = useRef<HTMLElement>(null);
  const redOverlayRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-15% 0px' });

  // GSAP glitch effect on section enter
  useEffect(() => {
    if (!isInView) return;
    if (typeof window === 'undefined') return;

    async function runGlitch() {
      const { gsap } = await import('gsap');
      if (!redOverlayRef.current) return;

      gsap.fromTo(
        redOverlayRef.current,
        { opacity: 0 },
        {
          opacity: 0.35,
          duration: 0.12,
          ease: 'power2.in',
          yoyo: true,
          repeat: 5,
          onComplete: () => {
            if (redOverlayRef.current) {
              gsap.to(redOverlayRef.current, { opacity: 0.18, duration: 0.4 });
            }
          },
        }
      );
    }

    runGlitch();
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#0d0d0d',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        overflow: 'hidden',
      }}
    >
      {/* CSS keyframes for newspaper flicker */}
      <style>{`
        @keyframes flicker {
          0%   { opacity: 1; }
          8%   { opacity: 0.85; }
          12%  { opacity: 1; }
          20%  { opacity: 0.9; }
          25%  { opacity: 1; }
          60%  { opacity: 1; }
          65%  { opacity: 0.8; }
          70%  { opacity: 1; }
          100% { opacity: 1; }
        }
        .newspaper-headline {
          animation: flicker 4s infinite;
        }
        .newspaper-headline:nth-child(2) {
          animation-delay: 1.3s;
        }
        .newspaper-headline:nth-child(3) {
          animation-delay: 2.6s;
        }
      `}</style>

      {/* Red overlay (GSAP-controlled) */}
      <div
        ref={redOverlayRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(139, 26, 26, 0.18)',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0,
        }}
      />

      {/* Framer Motion red overlay on inView */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.15 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeIn' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(139,26,26,0.4) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '800px',
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
              fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 700,
              color: '#e8d0d0',
              textAlign: 'center',
              lineHeight: 1.25,
            }}
          >
            Русификация и сопротивление
          </h2>
        </FadeInView>

        {/* Body text */}
        <FadeInView delay={250} direction="up">
          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              fontFamily: 'sans-serif',
              color: 'rgba(245,240,232,0.6)',
              lineHeight: 1.75,
              textAlign: 'center',
              maxWidth: '580px',
            }}
          >
            В конце XIX века российские власти начали ограничивать автономию Финляндии. При
            Николае II усилилась политика русификации: русский язык, контроль Петербурга,
            ограничение самоуправления.
          </p>
        </FadeInView>

        {/* Newspaper headlines */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%',
            maxWidth: '560px',
          }}
        >
          {NEWSPAPER_HEADLINES.map((headline, index) => (
            <motion.div
              key={headline.text}
              className="newspaper-headline"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
              style={{
                transform: `rotate(${headline.rotation}deg)`,
                background: 'rgba(245,240,232,0.06)',
                border: '1px solid rgba(245,240,232,0.12)',
                borderLeft: '3px solid rgba(139,26,26,0.7)',
                padding: '0.75rem 1rem',
                fontFamily: '"Times New Roman", Georgia, serif',
                fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                color: 'rgba(245,240,232,0.8)',
                letterSpacing: '0.04em',
              }}
            >
              {headline.text}
            </motion.div>
          ))}
        </div>

        {/* Special event block — 1904 */}
        <FadeInView delay={600} direction="up">
          <div
            style={{
              border: '1px solid rgba(139,26,26,0.5)',
              borderRadius: '4px',
              padding: '1.5rem',
              background: 'rgba(139,26,26,0.08)',
              maxWidth: '560px',
              width: '100%',
            }}
          >
            <p
              style={{
                fontSize: '1.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'rgba(139,26,26,0.8)',
                fontFamily: 'sans-serif',
                marginBottom: '0.5rem',
              }}
            >
              1904
            </p>
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                fontFamily: 'sans-serif',
                color: 'rgba(245,240,232,0.65)',
                lineHeight: 1.7,
              }}
            >
              Финский националист Эйген Шауман застрелил генерал-губернатора Николая Бобрикова —
              одного из главных символов русификации.
            </p>
          </div>
        </FadeInView>

        {/* Quote */}
        <FadeInView delay={750} direction="up">
          <blockquote style={{ textAlign: 'center', maxWidth: '640px' }}>
            <p
              style={{
                fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontStyle: 'italic',
                color: 'rgba(245,240,232,0.85)',
                lineHeight: 1.6,
              }}
            >
              «Чем сильнее империя пыталась контролировать Финляндию — тем сильнее становилось
              желание независимости»
            </p>
          </blockquote>
        </FadeInView>
      </div>
    </section>
  );
}
