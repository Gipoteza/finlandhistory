'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { TimelineEvent } from '@/lib/constants';
import { sortTimelineEvents } from '@/lib/utils';

interface TimelineProps {
  events: TimelineEvent[];
  activeIndex?: number;
}

interface TimelineDotProps {
  event: TimelineEvent;
  index: number;
  isActive: boolean;
  isVisible: boolean;
}

function TimelineDot({ event, index, isActive, isVisible }: TimelineDotProps) {
  return (
    <motion.div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '1rem',
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: 'easeOut' }}
    >
      {/* Dot */}
      <div
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: isActive ? '#c9a84c' : 'rgba(245, 240, 232, 0.35)',
          border: isActive ? '2px solid #d4a017' : '1px solid rgba(245, 240, 232, 0.2)',
          boxShadow: isActive ? '0 0 8px rgba(201, 168, 76, 0.6)' : 'none',
          flexShrink: 0,
          marginTop: '0.4rem',
        }}
      />

      {/* Text block */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {/* Year + label */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: isActive ? '#c9a84c' : 'rgba(245, 240, 232, 0.85)',
              letterSpacing: '0.05em',
              fontFamily: 'serif',
              flexShrink: 0,
            }}
          >
            {event.year}
          </span>
          <span
            style={{
              fontSize: '1.1rem',
              color: isActive ? '#c9a84c' : 'rgba(245, 240, 232, 0.7)',
              letterSpacing: '0.02em',
              lineHeight: 1.3,
            }}
          >
            {event.label}
          </span>
        </div>

        {/* Description */}
        {event.description && (
          <p
            style={{
              fontSize: '0.9rem',
              color: 'rgba(245, 240, 232, 0.45)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: '520px',
            }}
          >
            {event.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function Timeline({ events, activeIndex }: TimelineProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });
  const sortedEvents = sortTimelineEvents(events);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        padding: '1rem 0',
      }}
    >
      {/* Vertical connecting line */}
      <div
        style={{
          position: 'absolute',
          top: '0.75rem',
          bottom: '0.75rem',
          left: '4px',
          width: '1px',
          background: 'rgba(245, 240, 232, 0.15)',
        }}
        aria-hidden="true"
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem',
          paddingLeft: '1.5rem',
        }}
      >
        {sortedEvents.map((event, index) => (
          <TimelineDot
            key={event.year}
            event={event}
            index={index}
            isActive={activeIndex === index}
            isVisible={isInView}
          />
        ))}
      </div>
    </div>
  );
}
