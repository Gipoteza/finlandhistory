'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;       // ms, default: 0
  duration?: number;    // ms, default: 600
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'; // default: 'up'
  className?: string;
}

function getInitialOffset(direction: FadeInViewProps['direction']): { x?: number; y?: number } {
  switch (direction) {
    case 'up':    return { y: 30 };
    case 'down':  return { y: -30 };
    case 'left':  return { x: 30 };
    case 'right': return { x: -30 };
    case 'none':
    default:      return {};
  }
}

export default function FadeInView({
  children,
  delay = 0,
  duration = 600,
  direction = 'up',
  className,
}: FadeInViewProps) {
  const offset = getInitialOffset(direction);

  const initial = { opacity: 0, ...offset };
  const animate = {
    opacity: 1,
    ...(offset.y !== undefined ? { y: 0 } : {}),
    ...(offset.x !== undefined ? { x: 0 } : {}),
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true }}
      transition={{
        delay: delay / 1000,
        duration: duration / 1000,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}
