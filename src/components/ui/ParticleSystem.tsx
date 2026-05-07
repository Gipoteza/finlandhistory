'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  drift: number;
}

interface ParticleSystemProps {
  count?: number;       // default: 100
  mobileCount?: number; // default: 50
  type: 'snow' | 'fog';
  className?: string;
}

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function createParticle(width: number, height: number): Particle {
  return {
    x: randomBetween(0, width),
    y: randomBetween(0, height),
    radius: randomBetween(0.5, 2.5),
    speed: randomBetween(0.3, 1.5),
    opacity: randomBetween(0.3, 0.9),
    drift: randomBetween(-0.3, 0.3),
  };
}

export default function ParticleSystem({
  count = 100,
  mobileCount = 50,
  type,
  className,
}: ParticleSystemProps) {
  const [isMounted, setIsMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  // SSR guard: only render on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resolvedCount = window.innerWidth < 768 ? mobileCount : count;

    // Size canvas to parent
    const parent = canvas.parentElement;
    const width = parent ? parent.offsetWidth : window.innerWidth;
    const height = parent ? parent.offsetHeight : window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Initialize particles
    particlesRef.current = Array.from({ length: resolvedCount }, () =>
      createParticle(width, height)
    );

    function drawFrame() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.map((p) => {
        // Update position
        let newY = p.y + p.speed;
        let newX = p.x + p.drift;

        if (newY > canvas.height + p.radius) {
          newY = -p.radius;
          newX = randomBetween(0, canvas.width);
        }
        if (newX < -p.radius) newX = canvas.width + p.radius;
        if (newX > canvas.width + p.radius) newX = -p.radius;

        const updated = { ...p, x: newX, y: newY };

        // Draw particle
        ctx.save();
        if (type === 'snow') {
          ctx.globalAlpha = updated.opacity;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(updated.x, updated.y, updated.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // fog: larger, blurred circles
          const fogRadius = updated.radius * 8;
          ctx.globalAlpha = updated.opacity * 0.15;
          ctx.filter = 'blur(4px)';
          const gradient = ctx.createRadialGradient(
            updated.x, updated.y, 0,
            updated.x, updated.y, fogRadius
          );
          gradient.addColorStop(0, 'rgba(200, 200, 220, 0.8)');
          gradient.addColorStop(1, 'rgba(200, 200, 220, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(updated.x, updated.y, fogRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.filter = 'none';
        }
        ctx.restore();

        return updated;
      });

      rafRef.current = requestAnimationFrame(drawFrame);
    }

    rafRef.current = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMounted, count, mobileCount, type]);

  if (!isMounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  );
}
