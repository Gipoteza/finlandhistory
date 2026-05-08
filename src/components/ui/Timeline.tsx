'use client';

import React, { useState } from 'react';
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
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '1rem',
        cursor: 'pointer',
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: 'easeOut' }}
    >
      {/* Dot */}
      <div
        style={{
          width: isActive ? '14px' : '10px',
          height: isActive ? '14px' : '10px',
          borderRadius: '50%',
          background: isActive ? '#c9a84c' : 'rgba(245, 240, 232, 0.35)',
          border: isActive ? '2px solid #d4a017' : '1px solid rgba(245, 240, 232, 0.2)',
          boxShadow: isActive ? '0 0 8px rgba(201, 168, 76, 0.6)' : 'none',
          transition: 'all 0.3s ease',
          flexShrink: 0,
        }}
      />

      {/* Text */}
      <button
        aria-label={`${event.label} ${event.year}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        onTouchStart={() => setShowTooltip(true)}
        onTouchEnd={() => setTimeout(() => setShowTooltip(false), 1800)}
        style={{
          position: 'relative',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: '0.75rem',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: isActive ? '#c9a84c' : 'rgba(245, 240, 232, 0.8)',
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
            color: isActive ? 'rgba(245, 240, 232, 0.95)' : 'rgba(245, 240, 232, 0.55)',
            letterSpacing: '0.02em',
            lineHeight: 1.4,
          }}
        >
          {event.label}
        </span>

        {/* Tooltip — description on hover */}
        {showTooltip && event.description && (
          <div
            role="tooltip"
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              background: 'rgba(10, 10, 10, 0.92)',
              border: '1px solid rgba(201, 168, 76, 0.3)',
              borderRadius: '4px',
              padding: '0.4rem 0.7rem',
              fontSize: '0.9rem',
              color: 'rgba(245, 240, 232, 0.85)',
              whiteSpace: 'normal',
              maxWidth: '260px',
              zIndex: 10,
              pointerEvents: 'none',
              lineHeight: 1.5,
            }}
          >
            {event.description}
          </div>
        )}
      </button>
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
          gap: '1.25rem',
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
