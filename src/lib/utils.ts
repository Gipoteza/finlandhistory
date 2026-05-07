import { TimelineEvent } from '@/lib/constants';

/**
 * Resolves the actual particle count based on viewport width constraints.
 * - Mobile (< 768px): capped at 80
 * - Desktop (>= 768px): clamped to 50–200
 */
export function resolveParticleCount(requestedCount: number, viewportWidth: number): number {
  if (viewportWidth < 768) {
    return Math.min(requestedCount, 80);
  }
  return Math.min(Math.max(requestedCount, 50), 200);
}

/**
 * Computes an array of stagger delays for a given number of icons.
 * Each delay = index * staggerDelay (ms).
 */
export function computeStaggerDelays(iconCount: number, staggerDelay: number): number[] {
  return Array.from({ length: iconCount }, (_, index) => index * staggerDelay);
}

/**
 * Returns a new array of timeline events sorted by year in ascending order.
 * Does NOT mutate the input array.
 */
export function sortTimelineEvents(events: TimelineEvent[]): TimelineEvent[] {
  return [...events].sort((a, b) => parseInt(a.year) - parseInt(b.year));
}

/**
 * Simulates the sound state after a sequence of toggle actions.
 * true = toggle ON (isPlaying: true, volume: targetVolume)
 * false = toggle OFF (isPlaying: false, volume: 0)
 */
export function simulateSoundToggles(
  toggleSequence: boolean[],
  targetVolume: number
): { isPlaying: boolean; volume: number } {
  let state = { isPlaying: false, volume: 0 };

  for (const toggle of toggleSequence) {
    if (toggle) {
      state = { isPlaying: true, volume: targetVolume };
    } else {
      state = { isPlaying: false, volume: 0 };
    }
  }

  return state;
}
