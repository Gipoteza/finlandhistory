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
              fontSize: '0.7rem',
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
              fontSize: '0.6rem',
              color: isActive ? 'rgba(245, 240, 232, 0.9)' : 'rgba(245, 240, 232, 0.45)',
              letterSpacing: '0.03em',
              maxWidth: isHorizontal ? '80px' : '120px',
              textAlign: isHorizontal ? 'center' : 'left',
              lineHeight: 1.3,
              transition: 'color 0.3s ease',
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
              left: isHorizontal ? '50%' : 'calc(100% + 8px)',
              top: isHorizontal ? 'auto' : '50%',
              transform: isHorizontal
                ? 'translateX(-50%)'
                : 'translateY(-50%)',
              background: 'rgba(10, 10, 10, 0.92)',
              border: '1px solid rgba(201, 168, 76, 0.3)',
              borderRadius: '4px',
              padding: '0.4rem 0.6rem',
              fontSize: '0.65rem',
              color: 'rgba(245, 240, 232, 0.85)',
              whiteSpace: 'nowrap',
              zIndex: 10,
              pointerEvents: 'none',
              letterSpacing: '0.02em',
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
    <>
      {/* Desktop: horizontal timeline */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          padding: '2rem 1rem',
        }}
        className="timeline-desktop"
      >
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

      {/* Mobile: vertical timeline */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          padding: '1rem 1.5rem',
        }}
        className="timeline-mobile"
      >
        {/* Vertical connecting line */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            bottom: '1rem',
            left: '2rem',
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
            paddingLeft: '1rem',
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

      {/* Responsive visibility */}
      <style>{`
        .timeline-mobile {
          display: none;
        }
        @media (max-width: 767px) {
          .timeline-desktop {
            display: none;
          }
          .timeline-mobile {
            display: block;
          }
        }
      `}</style>
    </>
  );
}
