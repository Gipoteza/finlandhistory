'use client';

import { useEffect, useRef, useState } from 'react';
import type { SoundConfig } from '@/lib/constants';

// ============================================================
// useSound hook
// Manages background audio with fade-in/fade-out via RAF
// SSR-safe: Audio element created only in useEffect
// ============================================================

interface UseSoundReturn {
  isPlaying: boolean;
  toggle: () => void;
}

export function useSound(config: SoundConfig): UseSoundReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fadeRafRef = useRef<number | null>(null);

  // Create audio element only on client (SSR-safe)
  useEffect(() => {
    const audio = new Audio(config.src);
    audio.loop = true;
    audio.volume = 0;
    audio.crossOrigin = 'anonymous';
    audio.preload = 'none'; // don't preload — load on first play
    audioRef.current = audio;

    return () => {
      if (fadeRafRef.current !== null) {
        cancelAnimationFrame(fadeRafRef.current);
        fadeRafRef.current = null;
      }
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [config.src]);

  // Cancel any ongoing fade
  const cancelFade = () => {
    if (fadeRafRef.current !== null) {
      cancelAnimationFrame(fadeRafRef.current);
      fadeRafRef.current = null;
    }
  };

  // Gradually increase volume from 0 to targetVolume over duration ms
  const fadeIn = (targetVolume: number, duration: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    cancelFade();

    const startVolume = audio.volume;
    const volumeDelta = targetVolume - startVolume;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      audio.volume = startVolume + volumeDelta * progress;

      if (progress < 1) {
        fadeRafRef.current = requestAnimationFrame(step);
      } else {
        audio.volume = targetVolume;
        fadeRafRef.current = null;
      }
    };

    fadeRafRef.current = requestAnimationFrame(step);
  };

  // Gradually decrease volume from current to 0 over duration ms, then pause
  const fadeOut = (duration: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    cancelFade();

    const startVolume = audio.volume;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      audio.volume = startVolume * (1 - progress);

      if (progress < 1) {
        fadeRafRef.current = requestAnimationFrame(step);
      } else {
        audio.volume = 0;
        audio.pause();
        fadeRafRef.current = null;
      }
    };

    fadeRafRef.current = requestAnimationFrame(step);
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      // Start playing with fade-in
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          fadeIn(config.defaultVolume, config.fadeInDuration);
        })
        .catch((error: unknown) => {
          setIsPlaying(false);
          // Log non-autoplay errors for debugging
          if (
            error instanceof DOMException &&
            error.name !== 'NotAllowedError'
          ) {
            console.warn('[useSound] playback error:', error.name, error.message);
          }
        });
    } else {
      // Fade out then pause
      setIsPlaying(false);
      fadeOut(config.fadeOutDuration);
    }
  };

  return { isPlaying, toggle };
}
