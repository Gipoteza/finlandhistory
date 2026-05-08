'use client';

import React from 'react';
import FadeInView from '@/components/animations/FadeInView';

const HEROES = [
  { name: 'Вяйнямёйнен', role: 'мудрый старец и маг' },
  { name: 'Ильмаринен', role: 'кузнец, создатель мира' },
  { name: 'Лемминкяйнен', role: 'воин и авантюрист' },
];

const THEMES = [
  { emoji: '⚔️', text: 'Герои и битвы' },
  { emoji: '✨', text: 'Магия и руны' },
  { emoji: '🌲', text: 'Природа Карелии' },
  { emoji: '🌍', text: 'Создание мира' },
  { emoji: '🔥', text: 'Боги и духи' },
  { emoji: '❤️', text: 'Любовь и судьба' },
];

export default function ChapterKalevala() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#12100a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 2rem',
        overflow: 'hidden',
      }}
    >
      {/* Warm glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(212,160,23,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '820px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
          textAlign: 'center',
        }}
      >
        {/* Label */}
        <FadeInView delay={100} direction="none">
          <p style={{
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: '#d4a017',
            fontFamily: 'sans-serif',
          }}>
            1835
          </p>
        </FadeInView>

        {/* Heading */}
        <FadeInView delay={200} direction="up">
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontWeight: 700,
            color: '#d4a017',
            lineHeight: 1.2,
          }}>
            «Калевала» — душа финского народа
          </h2>
        </FadeInView>

        {/* Comparison */}
        <FadeInView delay={300} direction="up">
          <div style={{
            background: 'rgba(212,160,23,0.06)',
            border: '1px solid rgba(212,160,23,0.2)',
            borderRadius: '8px',
            padding: '1.5rem 2rem',
            maxWidth: '600px',
          }}>
            <p style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              color: 'rgba(245,240,232,0.7)',
              lineHeight: 1.7,
              marginBottom: '0.75rem',
            }}>
              Для финнов «Калевала» — это примерно как:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[
                'былины — для славян',
                'мифы — для Древней Греции',
                '«Илиада» — для греков',
              ].map((item) => (
                <p key={item} style={{
                  fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
                  fontFamily: 'sans-serif',
                  color: 'rgba(245,240,232,0.55)',
                  lineHeight: 1.5,
                }}>
                  — {item}
                </p>
              ))}
            </div>
          </div>
        </FadeInView>

        {/* Main message */}
        <FadeInView delay={400} direction="up">
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            fontFamily: 'sans-serif',
            color: 'rgba(245,240,232,0.65)',
            lineHeight: 1.75,
            maxWidth: '580px',
          }}>
            Эпос помог финнам почувствовать: <em style={{ color: '#d4a017' }}>«У нас есть собственная культура, история и народ»</em>. Это было особенно важно, пока Финляндия находилась внутри Российской империи.
          </p>
        </FadeInView>

        {/* Themes grid */}
        <FadeInView delay={500} direction="none">
          <div>
            <p style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(212,160,23,0.5)',
              fontFamily: 'sans-serif',
              marginBottom: '1rem',
            }}>
              О чём эпос
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              maxWidth: '480px',
              margin: '0 auto',
            }}>
              {THEMES.map((t) => (
                <div key={t.text} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.75rem',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '6px',
                  border: '1px solid rgba(212,160,23,0.1)',
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{t.emoji}</span>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.5)', fontFamily: 'sans-serif', textAlign: 'center' }}>{t.text}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeInView>

        {/* Heroes */}
        <FadeInView delay={600} direction="up">
          <div style={{ width: '100%', maxWidth: '560px' }}>
            <p style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(212,160,23,0.5)',
              fontFamily: 'sans-serif',
              marginBottom: '1rem',
            }}>
              Главные герои
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {HEROES.map((h) => (
                <div key={h.name} style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.75rem',
                  textAlign: 'left',
                }}>
                  <span style={{ color: '#d4a017', fontFamily: 'serif', fontSize: '1rem', flexShrink: 0 }}>—</span>
                  <p style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)', fontFamily: 'sans-serif', color: 'rgba(245,240,232,0.7)', lineHeight: 1.5 }}>
                    <strong style={{ color: 'rgba(245,240,232,0.9)' }}>{h.name}</strong> — {h.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeInView>

        {/* Quote */}
        <FadeInView delay={700} direction="up">
          <blockquote style={{ maxWidth: '600px' }}>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontStyle: 'italic',
              color: '#d4a017',
              lineHeight: 1.6,
            }}>
              «Калевала» стала символом роста финского национального самосознания в XIX веке
            </p>
          </blockquote>
        </FadeInView>
      </div>
    </section>
  );
}
