'use client';

import { useSound } from '@/hooks/useSound';
import { SOUND_CONFIG } from '@/lib/constants';

// ============================================================
// SoundController
// Fixed-position sound toggle button — dark academia style
// ============================================================

// Speaker icon with sound waves (playing state)
function SpeakerOnIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Speaker body */}
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      {/* Sound waves */}
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

// Speaker icon without waves (muted state)
function SpeakerOffIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Speaker body */}
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      {/* Mute X */}
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

export default function SoundController() {
  const { isPlaying, toggle } = useSound(SOUND_CONFIG);

  return (
    <button
      onClick={toggle}
      aria-label={isPlaying ? 'Выключить звук' : 'Включить звук'}
      className="fixed top-6 right-6 z-50 flex items-center gap-1.5 px-3 py-2 rounded-sm
        bg-black/60 backdrop-blur-sm border border-white/10
        text-cinema-cream/70 text-xs tracking-widest uppercase
        transition-all duration-300 ease-in-out
        hover:border-[#c9a84c]/60 hover:text-[#c9a84c] hover:bg-black/80
        focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c]/50"
      title={isPlaying ? 'Выключить звук' : 'Включить звук'}
    >
      {isPlaying ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
      <span className="font-light" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        {isPlaying ? 'ON' : 'OFF'}
      </span>
    </button>
  );
}
