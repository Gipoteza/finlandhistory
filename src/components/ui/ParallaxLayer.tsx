'use client';

import React, { useEffect, useRef } from 'react';

interface ParallaxLayerProps {
  speed: number; // coefficient 0.2–0.5, controls how much the layer moves
  children: React.ReactNode;
  className?: string;
}

export default function ParallaxLayer({ speed, children, className }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;

    let gsapInstance: typeof import('gsap').gsap | null = null;
    let scrollTriggerInstance: ReturnType<typeof import('gsap/ScrollTrigger').ScrollTrigger.create> | null = null;

    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      gsapInstance = gsap;

      if (!ref.current) return;

      const tween = gsap.to(ref.current, {
        yPercent: speed * -100,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Store the ScrollTrigger instance for cleanup
      scrollTriggerInstance = tween.scrollTrigger ?? null;
    }

    init();

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      if (gsapInstance && ref.current) {
        gsapInstance.killTweensOf(ref.current);
      }
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
