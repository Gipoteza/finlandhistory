import { describe, it } from 'vitest';
import * as fc from 'fast-check';
import {
  resolveParticleCount,
  computeStaggerDelays,
  sortTimelineEvents,
  simulateSoundToggles,
} from '@/lib/utils';
import { TIMELINE_EVENTS } from '@/lib/constants';

describe('Utils — Property-Based Tests', () => {
  // Feature: finland-history-presentation, Property 1: particle count respects viewport constraints
  // Validates: Requirements 11.3, 11.4
  it('particle count stays within bounds for any viewport width', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 2560 }),
        fc.integer({ min: 50, max: 200 }),
        (viewportWidth, requestedCount) => {
          const count = resolveParticleCount(requestedCount, viewportWidth);
          if (viewportWidth < 768) {
            return count <= 80 && count >= 0;
          }
          return count <= 200 && count >= 50;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: finland-history-presentation, Property 3: timeline events are in chronological order
  // Validates: Requirements 10.1
  it('timeline events are always in ascending year order', () => {
    fc.assert(
      fc.property(
        fc.shuffledSubarray(TIMELINE_EVENTS, { minLength: 2 }),
        (events) => {
          const sorted = sortTimelineEvents(events);
          for (let i = 1; i < sorted.length; i++) {
            if (parseInt(sorted[i].year) < parseInt(sorted[i - 1].year)) return false;
          }
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: finland-history-presentation, Property 2: sound fade timing invariant
  // Validates: Requirements 9.2, 9.3
  it('volume reaches target after fade regardless of toggle sequence', () => {
    fc.assert(
      fc.property(
        fc.array(fc.boolean(), { minLength: 1, maxLength: 20 }),
        fc.float({ min: Math.fround(0.1), max: Math.fround(1.0) }),
        (toggleSequence, targetVolume) => {
          const finalState = simulateSoundToggles(toggleSequence, targetVolume);
          if (finalState.isPlaying) {
            return Math.abs(finalState.volume - targetVolume) < 0.001;
          } else {
            return Math.abs(finalState.volume - 0) < 0.001;
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: finland-history-presentation, Property 4: stagger reveal interval invariant
  // Validates: Requirements 4.5
  it('stagger delays between icons never exceed 150ms', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 12 }),
        fc.integer({ min: 0, max: 150 }),
        (iconCount, staggerDelay) => {
          const delays = computeStaggerDelays(iconCount, staggerDelay);
          for (let i = 1; i < delays.length; i++) {
            if (delays[i] - delays[i - 1] > 150) return false;
          }
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
