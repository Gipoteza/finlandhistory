'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface StaggerRevealProps {
  children: React.ReactNode;
  staggerDelay?: number; // ms between elements, default: 150
  className?: string;
}

export default function StaggerReveal({
  children,
  staggerDelay = 150,
  className,
}: StaggerRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: (index * staggerDelay) / 1000,
                duration: 0.4,
                ease: 'easeOut',
              },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
