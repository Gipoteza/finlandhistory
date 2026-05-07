'use client';

import React from 'react';
import { useSound } from '@/hooks/useSound';
import { SOUND_CONFIG } from '@/lib/constants';

// ============================================================
// SoundToggle — floating button to toggle ambient music
// Fixed position, top-right corner
// ============================================================

export default function SoundToggle() {
  const { isPlaying, toggle } = useSound(SOUND_CONFIG);

  return (
    <button
      onClick={toggle}
      aria-label={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
      title={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
      style={{
        position: 'fixed',
        top: '1.25rem',
        right: '1.25rem',
        zIndex: 1000,
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '50%',
        border: '1px solid rgba(201, 168, 76, 0.4)',
        background: 'rgba(10, 10, 10, 0.7)',
        backdropFilter: 'blur(8px)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'border-color 0.2s, background 0.2s',
        color: isPlaying ? '#c9a84c' : 'rgba(245, 240, 232, 0.5)',
      }}
    >
      {isPlaying ? (
        // Speaker with sound waves
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      ) : (
        // Speaker muted
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
}
