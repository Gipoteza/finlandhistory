'use client';

// ============================================================
// FilmGrainOverlay
// Global film grain effect overlay — covers entire viewport
// ============================================================

interface FilmGrainOverlayProps {
  opacity?: number; // default: 0.035
}

export default function FilmGrainOverlay({ opacity = 0.035 }: FilmGrainOverlayProps) {
  return (
    <div
      className="film-grain"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
