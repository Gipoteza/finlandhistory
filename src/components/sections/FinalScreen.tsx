'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeInView from '@/components/animations/FadeInView';

const KEY_POINTS = [
  'Россия дала Финляндии автономию',
  'Автономия помогла сформировать собственную культуру и политическую систему',
  'Это привело страну к независимости',
];

function FinnishFlagSVG() {
  return (
    <svg
      width="240"
      height="144"
      viewBox="0 0 200 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Флаг Финляндии"
      role="img"
      style={{ borderRadius: '2px', boxShadow: '0 4px 24px rgba(0,53,128,0.25)' }}
    >
      {/* White background */}
      <rect width="200" height="120" fill="#ffffff" />
      {/* Blue horizontal bar */}
      <rect x="0" y="37.5" width="200" height="45" fill="#003580" />
      {/* Blue vertical bar */}
      <rect x="50" y="0" width="75" height="120" fill="#003580" />
    </svg>
  );
}

export default function FinalScreen() {
  const [showFlash, setShowFlash] = useState(false);

  const handleFinish = () => {
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 1200);
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#f5f0e8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 2rem',
        overflow: 'hidden',
      }}
    >
      {/* Finale flash overlay */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            aria-hidden="true"
            style={{
              position: 'fixed',
              inset: 0,
              background: '#ffffff',
              zIndex: 9999,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      <div
        style={{
          maxWidth: '760px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
          textAlign: 'center',
        }}
      >
        {/* Main heading */}
        <FadeInView delay={100} direction="up">
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 700,
              color: '#1a1a2e',
              lineHeight: 1.3,
            }}
          >
            История Великого княжества Финляндского
          </h2>
        </FadeInView>

        {/* Subheading */}
        <FadeInView delay={250} direction="up">
          <p
            style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontStyle: 'italic',
              color: 'rgba(26,26,46,0.65)',
              lineHeight: 1.6,
              maxWidth: '580px',
            }}
          >
            это история того, как автономия превратилась в государственность
          </p>
        </FadeInView>

        {/* Key points */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%',
            maxWidth: '560px',
          }}
        >
          {KEY_POINTS.map((point, index) => (
            <FadeInView key={point} delay={400 + index * 150} direction="up">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    color: '#c9a84c',
                    fontFamily: 'serif',
                    fontSize: '1.1rem',
                    lineHeight: 1.5,
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  —
                </span>
                <p
                  style={{
                    fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                    fontFamily: 'sans-serif',
                    color: 'rgba(26,26,46,0.75)',
                    lineHeight: 1.65,
                  }}
                >
                  {point}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>

        {/* Finnish flag */}
        <FadeInView delay={850} direction="none">
          <FinnishFlagSVG />
        </FadeInView>

        {/* Finish button */}
        <FadeInView delay={1000} direction="up">
          <motion.button
            aria-label="Завершить презентацию"
            onClick={handleFinish}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: '#1a1a2e',
              color: '#f5f0e8',
              border: '1px solid #c9a84c',
              borderRadius: '4px',
              padding: '0.85rem 2.5rem',
              fontSize: '0.9rem',
              fontFamily: 'sans-serif',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
          >
            Спасибо за внимание
          </motion.button>
        </FadeInView>
      </div>
    </section>
  );
}
