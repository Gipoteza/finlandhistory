'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  drift: number; // horizontal drift
}

interface UseParticlesProps {
  count: number;
  mobileCount: number;
  canvasWidth: number;
  canvasHeight: number;
}

interface UseParticlesReturn {
  particles: Particle[];
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function createParticle(canvasWidth: number, canvasHeight: number): Particle {
  return {
    x: randomBetween(0, canvasWidth),
    y: randomBetween(0, canvasHeight),
    radius: randomBetween(0.5, 2.5),
    speed: randomBetween(0.3, 1.5),
    opacity: randomBetween(0.3, 0.9),
    drift: randomBetween(-0.3, 0.3),
  };
}

export function useParticles({
  count,
  mobileCount,
  canvasWidth,
  canvasHeight,
}: UseParticlesProps): UseParticlesReturn {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const resolvedCount = window.innerWidth < 768 ? mobileCount : count;

    const initialParticles: Particle[] = Array.from({ length: resolvedCount }, () =>
      createParticle(canvasWidth, canvasHeight)
    );

    setParticles(initialParticles);

    let rafId: number;
    let currentParticles = initialParticles;

    function tick() {
      currentParticles = currentParticles.map((p) => {
        let newY = p.y + p.speed;
        let newX = p.x + p.drift;

        // Reset to top when particle goes off-screen bottom
        if (newY > canvasHeight + p.radius) {
          newY = -p.radius;
          newX = randomBetween(0, canvasWidth);
        }

        // Wrap horizontally
        if (newX < -p.radius) newX = canvasWidth + p.radius;
        if (newX > canvasWidth + p.radius) newX = -p.radius;

        return { ...p, x: newX, y: newY };
      });

      setParticles([...currentParticles]);
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [count, mobileCount, canvasWidth, canvasHeight]);

  return { particles, canvasRef };
}
