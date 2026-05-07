'use client';

import React, { useState, useEffect } from 'react';
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
  isHorizontal: boolean;
}

function TimelineDot({ event, index, isActive, isVisible, isHorizontal }: TimelineDotProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: isHorizontal ? 'column' : 'row',
        alignItems: 'center',
        gap: isHorizontal ? '0.5rem' : '0.75rem',
        cursor: 'pointer',
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3, delay: index * 0.1, ease: 'easeOut' }}
    >
      <button
        aria-label={`${event.label} ${event.year}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        onTouchStart={() => setShowTooltip(true)}
        onTouchEnd={() => setTimeout(() => setShowTooltip(false), 1500)}
        style={{
          position: 'relative',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: isHorizontal ? 'column' : 'row',
          alignItems: 'center',
          gap: isHorizontal ? '0.5rem' : '0.75rem',
        }}
      >
        {/* Dot indicator */}
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

        {/* Year + label */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: isHorizontal ? 'center' : 'flex-start',
            gap: '0.15rem',
          }}
        >
          <span
            style={{
              fontSize: '1.0rem',
              fontWeight: 'bold',
              color: isActive ? '#c9a84c' : 'rgba(245, 240, 232, 0.7)',
              letterSpacing: '0.05em',
              fontFamily: 'serif',
              transition: 'color 0.3s ease',
            }}
          >
            {event.year}
          </span>
          <span
            style={{
              fontSize: isHorizontal ? '1.4rem' : '1.1rem',
              color: isActive ? 'rgba(245, 240, 232, 0.9)' : 'rgba(245, 240, 232, 0.45)',
              letterSpacing: '0.03em',
              maxWidth: isHorizontal ? '130px' : '200px',
              textAlign: isHorizontal ? 'center' : 'left',
              lineHeight: 1.3,
              transition: 'color 0.3s ease',
              wordBreak: 'break-word',
            }}
          >
            {event.label}
          </span>
        </div>

        {/* Tooltip */}
        {showTooltip && (
          <div
            role="tooltip"
            style={{
              position: 'absolute',
              bottom: isHorizontal ? 'calc(100% + 8px)' : 'auto',
              top: isHorizontal ? 'auto' : 'calc(100% + 4px)',
              left: isHorizontal ? '50%' : '0',
              transform: isHorizontal ? 'translateX(-50%)' : 'none',
              background: 'rgba(10, 10, 10, 0.92)',
              border: '1px solid rgba(201, 168, 76, 0.3)',
              borderRadius: '4px',
              padding: '0.4rem 0.6rem',
              fontSize: '1.0rem',
              color: 'rgba(245, 240, 232, 0.85)',
              whiteSpace: isHorizontal ? 'nowrap' : 'normal',
              maxWidth: isHorizontal ? 'none' : '200px',
              zIndex: 10,
              pointerEvents: 'none',
              letterSpacing: '0.02em',
              lineHeight: 1.4,
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

  // Determine layout via JS — avoids CSS class conflicts in Next.js App Router
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const sortedEvents = sortTimelineEvents(events);

  // Before mount (SSR), render horizontal by default to avoid layout shift
  const isHorizontal = !mounted || !isMobile;

  if (isHorizontal) {
    return (
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
        }}
      >
        {/* Inner container with min-width so items don't squish */}
        <div style={{ minWidth: '900px', padding: '2rem 1rem', position: 'relative' }}>
          {/* Horizontal connecting line */}
          <div
            style={{
              position: 'absolute',
              top: '2.75rem',
              left: '2rem',
              right: '2rem',
              height: '1px',
              background: 'rgba(245, 240, 232, 0.15)',
            }}
            aria-hidden="true"
          />

          {/* Events row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              position: 'relative',
              gap: '0.5rem',
            }}
          >
            {sortedEvents.map((event, index) => (
              <TimelineDot
                key={event.year}
                event={event}
                index={index}
                isActive={activeIndex === index}
                isVisible={isInView}
                isHorizontal={true}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Mobile: vertical layout
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
          top: '1rem',
          bottom: '1rem',
          left: '1.25rem',
          width: '1px',
          background: 'rgba(245, 240, 232, 0.15)',
        }}
        aria-hidden="true"
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          paddingLeft: '0.75rem',
        }}
      >
        {sortedEvents.map((event, index) => (
          <TimelineDot
            key={event.year}
            event={event}
            index={index}
            isActive={activeIndex === index}
            isVisible={isInView}
            isHorizontal={false}
          />
        ))}
      </div>
    </div>
  );
}
