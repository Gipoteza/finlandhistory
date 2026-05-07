import React from 'react';

interface SplitScreenProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  leftLabel: string;
  rightLabel: string;
}

export default function SplitScreen({
  leftContent,
  rightContent,
  leftLabel,
  rightLabel,
}: SplitScreenProps) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
      }}
      className="split-screen"
    >
      {/* Left panel */}
      <div
        style={{
          flex: '0 0 50%',
          width: '50%',
          position: 'relative',
          background: 'rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
        className="split-screen__left"
      >
        {/* Left label */}
        <div
          style={{
            position: 'absolute',
            top: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'rgba(245, 240, 232, 0.45)',
            whiteSpace: 'nowrap',
          }}
        >
          {leftLabel}
        </div>
        {leftContent}
      </div>

      {/* Vertical divider */}
      <div
        style={{
          width: '1px',
          background: 'rgba(245, 240, 232, 0.12)',
          flexShrink: 0,
          alignSelf: 'stretch',
        }}
        aria-hidden="true"
      />

      {/* Right panel */}
      <div
        style={{
          flex: '0 0 50%',
          width: '50%',
          position: 'relative',
          background: 'rgba(255, 255, 255, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
        className="split-screen__right"
      >
        {/* Right label */}
        <div
          style={{
            position: 'absolute',
            top: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'rgba(245, 240, 232, 0.45)',
            whiteSpace: 'nowrap',
          }}
        >
          {rightLabel}
        </div>
        {rightContent}
      </div>

      {/* Mobile: stack vertically */}
      <style>{`
        @media (max-width: 767px) {
          .split-screen {
            flex-direction: column !important;
          }
          .split-screen__left,
          .split-screen__right {
            width: 100% !important;
            flex: none !important;
          }
        }
      `}</style>
    </div>
  );
}
