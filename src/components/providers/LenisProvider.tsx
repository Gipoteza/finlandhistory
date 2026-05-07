'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type Lenis from 'lenis';

// ============================================================
// Context
// ============================================================

export interface LenisContextValue {
  lenis: Lenis | null;
}

export const LenisContext = createContext<LenisContextValue>({ lenis: null });

// ============================================================
// Provider
// ============================================================

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    let lenisInstance: Lenis | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsapInstance: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tickerCallback: ((time: number) => void) | null = null;

    async function init() {
      // Dynamic imports for SSR safety
      const LenisClass = (await import('lenis')).default;
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);
      gsapInstance = gsap;

      // Initialize Lenis
      lenisInstance = new LenisClass({
        lerp: 0.08,
        smoothWheel: true,
        touchMultiplier: 2,
      });

      // Sync Lenis with GSAP ticker
      tickerCallback = (time: number) => {
        lenisInstance!.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      // Set up ScrollTrigger proxy so ScrollTrigger reads scroll from Lenis
      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value?: number) {
          if (arguments.length && value !== undefined) {
            lenisInstance!.scrollTo(value, { immediate: true });
          }
          return lenisInstance!.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      // Keep ScrollTrigger in sync with Lenis scroll events
      lenisInstance.on('scroll', ScrollTrigger.update);

      setLenis(lenisInstance);
    }

    init();

    return () => {
      // Clean up on unmount
      if (lenisInstance) {
        lenisInstance.destroy();
      }
      if (gsapInstance && tickerCallback) {
        gsapInstance.ticker.remove(tickerCallback);
      }
      // Kill all ScrollTriggers
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.killAll();
      });
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
}

// ============================================================
// Convenience hook (internal use — public API is in useLenis.ts)
// ============================================================

export function useLenisContext(): LenisContextValue {
  return useContext(LenisContext);
}
