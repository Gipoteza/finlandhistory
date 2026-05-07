'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from '@/components/ui/ParticleSystem';
import FadeInView from '@/components/animations/FadeInView';

const KEY_DATES = [
  'Февраль 1917 — Революция в России',
  '6 декабря 1917 — Провозглашение независимости',
  '31 декабря 1917 — Признание Лениным',
];

function FinnishFlagSVG() {
  return (
    <svg
      width="200"
      height="120"
      viewBox="0 0 200 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Флаг Финляндии"
      role="img"
    >
      {/* White background */}
      <rect width="200" height="120" fill="#ffffff" />
      {/* Blue horizontal bar — full width, 3/8 height, centered vertically */}
      {/* Height = 120 * 3/8 = 45. Center = 60. Top = 60 - 22.5 = 37.5 */}
      <rect x="0" y="37.5" width="200" height="45" fill="#003580" />
      {/* Blue vertical bar — full height, 3/8 width, positioned 1/4 from left */}
      {/* Width = 200 * 3/8 = 75. Left = 200 * 1/4 = 50 */}
      <rect x="50" y="0" width="75" height="120" fill="#003580" />
    </svg>
  );
}

export default function ChapterIndependence() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger: animate background from dark to light blue
  useEffect(() => {
    if (typeof window === 'undefined') return;

    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!bgRef.current || !sectionRef.current) return;

      gsap.fromTo(
        bgRef.current,
        { backgroundColor: '#0a0a1a' },
        {
          backgroundColor: '#1a3a5c',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }

    init();

    return () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.vars.trigger === sectionRef.current) t.kill();
        });
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        overflow: 'hidden',
      }}
    >
      {/* Animated background div */}
      <div
        ref={bgRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#0a0a1a',
          zIndex: 0,
        }}
      />

      {/* Light overlay fading in */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.15 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.3) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Particle system */}
      <ParticleSystem
        type="snow"
        count={80}
        mobileCount={40}
        className="independence-particles"
      />

      <div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '800px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          textAlign: 'center',
        }}
      >
        {/* Heading */}
        <FadeInView delay={100} direction="up">
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 700,
              color: '#f5f0e8',
              lineHeight: 1.25,
            }}
          >
            1917 — рождение независимой Финляндии
          </h2>
        </FadeInView>

        {/* Body text */}
        <FadeInView delay={250} direction="up">
          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              fontFamily: 'sans-serif',
              color: 'rgba(245,240,232,0.65)',
              lineHeight: 1.75,
              maxWidth: '560px',
            }}
          >
            В 1917 году Российская империя начала распадаться. Финляндия воспользовалась
            историческим моментом. 6 декабря 1917 года страна объявила независимость.
          </p>
        </FadeInView>

        {/* Finnish flag */}
        <FadeInView delay={400} direction="none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            style={{
              boxShadow: '0 4px 32px rgba(0,53,128,0.4)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <FinnishFlagSVG />
          </motion.div>
        </FadeInView>

        {/* Key dates */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            alignItems: 'center',
          }}
        >
          {KEY_DATES.map((date, index) => (
            <FadeInView key={date} delay={550 + index * 150} direction="up">
              <p
                style={{
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                  fontFamily: 'sans-serif',
                  color: 'rgba(245,240,232,0.7)',
                  letterSpacing: '0.03em',
                }}
              >
                {date}
              </p>
            </FadeInView>
          ))}
        </div>

        {/* Quote */}
        <FadeInView delay={900} direction="up">
          <blockquote>
            <p
              style={{
                fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontStyle: 'italic',
                color: '#c9a84c',
                lineHeight: 1.6,
                maxWidth: '600px',
              }}
            >
              «Автономия внутри империи стала фундаментом независимого государства»
            </p>
          </blockquote>
        </FadeInView>
      </div>

      <style>{`
        .independence-particles {
          position: absolute !important;
          inset: 0;
          z-index: 2;
        }
      `}</style>
    </section>
  );
}
