'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SplitScreen from '@/components/ui/SplitScreen';
import FadeInView from '@/components/animations/FadeInView';
import StaggerReveal from '@/components/animations/StaggerReveal';

const AUTONOMY_ATTRIBUTES = [
  { emoji: '🏛️', label: 'Парламент (Сейм)' },
  { emoji: '💰', label: 'Собственная валюта' },
  { emoji: '⚔️', label: 'Армия' },
  { emoji: '📜', label: 'Законы' },
  { emoji: '🎭', label: 'Культура и язык' },
  { emoji: '📮', label: 'Почта' },
];

function RussianEagleSVG() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Российский имперский орёл"
    >
      {/* Simplified double-headed eagle silhouette */}
      <ellipse cx="40" cy="45" rx="18" ry="22" fill="rgba(245,240,232,0.15)" />
      {/* Left head */}
      <ellipse cx="26" cy="24" rx="8" ry="7" fill="rgba(245,240,232,0.15)" />
      {/* Right head */}
      <ellipse cx="54" cy="24" rx="8" ry="7" fill="rgba(245,240,232,0.15)" />
      {/* Left wing */}
      <ellipse cx="16" cy="40" rx="14" ry="8" fill="rgba(245,240,232,0.1)" transform="rotate(-20 16 40)" />
      {/* Right wing */}
      <ellipse cx="64" cy="40" rx="14" ry="8" fill="rgba(245,240,232,0.1)" transform="rotate(20 64 40)" />
      {/* Crown left */}
      <polygon points="26,17 22,12 26,14 30,12 26,17" fill="#c9a84c" opacity="0.6" />
      {/* Crown right */}
      <polygon points="54,17 50,12 54,14 58,12 54,17" fill="#c9a84c" opacity="0.6" />
    </svg>
  );
}

function FinnishLionSVG() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Финский лев"
    >
      {/* Simplified lion silhouette */}
      <ellipse cx="40" cy="48" rx="20" ry="18" fill="rgba(201,168,76,0.2)" />
      {/* Head */}
      <circle cx="40" cy="28" r="14" fill="rgba(201,168,76,0.2)" />
      {/* Mane */}
      <circle cx="40" cy="28" r="18" fill="rgba(201,168,76,0.1)" />
      {/* Crown */}
      <polygon points="40,10 35,16 40,14 45,16 40,10" fill="#c9a84c" opacity="0.7" />
      {/* Sword */}
      <line x1="55" y1="20" x2="65" y2="10" stroke="#c9a84c" strokeWidth="2" opacity="0.6" />
      <polygon points="65,10 62,13 68,13" fill="#c9a84c" opacity="0.6" />
    </svg>
  );
}

export default function ChapterAutonomy() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#1a1a2e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        overflow: 'hidden',
      }}
    >
      {/* Heading */}
      <div
        style={{
          maxWidth: '800px',
          width: '100%',
          textAlign: 'center',
          marginBottom: '3rem',
        }}
      >
        <FadeInView delay={100} direction="up">
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 700,
              color: '#f5f0e8',
              lineHeight: 1.3,
            }}
          >
            Почти отдельное государство внутри империи
          </h2>
        </FadeInView>
      </div>

      {/* SplitScreen comparison */}
      <FadeInView delay={250} direction="none" className="autonomy-splitscreen-wrapper">
        <div style={{ width: '100%', height: '260px' }}>
          <SplitScreen
            leftLabel="Российская империя"
            rightLabel="Великое княжество Финляндское"
            leftContent={
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                <RussianEagleSVG />
                <p style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.6)', fontFamily: 'sans-serif', textAlign: 'center' }}>
                  Единая империя
                </p>
              </div>
            }
            rightContent={
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                <FinnishLionSVG />
                <p style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.6)', fontFamily: 'sans-serif', textAlign: 'center' }}>
                  Особый статус
                </p>
              </div>
            }
          />
        </div>
      </FadeInView>

      {/* Autonomy attributes grid */}
      <div style={{ maxWidth: '700px', width: '100%', marginBottom: '3rem' }}>
        <StaggerReveal
          staggerDelay={150}
          className="autonomy-grid"
        >
          {AUTONOMY_ATTRIBUTES.map((attr) => (
            <motion.div
              key={attr.label}
              whileHover={{ scale: 1.1, filter: 'brightness(1.3)' }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '8px',
                border: '1px solid rgba(201,168,76,0.15)',
                cursor: 'default',
              }}
            >
              <span style={{ fontSize: '1.75rem' }} role="img" aria-label={attr.label}>
                {attr.emoji}
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  color: 'rgba(245,240,232,0.7)',
                  fontFamily: 'sans-serif',
                  textAlign: 'center',
                  letterSpacing: '0.03em',
                }}
              >
                {attr.label}
              </span>
            </motion.div>
          ))}
        </StaggerReveal>
      </div>

      {/* Quote */}
      <FadeInView delay={400} direction="up">
        <blockquote
          style={{
            maxWidth: '680px',
            textAlign: 'center',
            margin: '0 auto 2rem',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontStyle: 'italic',
              color: '#c9a84c',
              lineHeight: 1.6,
            }}
          >
            «Финляндия формально принадлежала России, но жила почти как отдельное государство»
          </p>
        </blockquote>
      </FadeInView>

      {/* Additional text */}
      <FadeInView delay={550} direction="up">
        <p
          style={{
            maxWidth: '560px',
            textAlign: 'center',
            fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
            fontFamily: 'sans-serif',
            color: 'rgba(245,240,232,0.5)',
            lineHeight: 1.7,
          }}
        >
          Александр I понимал: чтобы сохранить спокойствие, финнам нужно оставить их традиции
          и самоуправление.
        </p>
      </FadeInView>

      <style>{`
        .autonomy-splitscreen-wrapper {
          width: 100%;
          max-width: 800px;
          margin-bottom: 3rem;
        }
        .autonomy-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        @media (max-width: 767px) {
          .autonomy-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
