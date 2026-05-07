# Implementation Plan: Finland History Presentation

## Overview

Реализация кинематографического storytelling-сайта «Великое княжество Финляндское (1809–1917)» на Next.js (App Router) с TypeScript. Задачи выстроены инкрементально: сначала фундамент (провайдеры, глобальные стили, утилиты), затем компоненты UI, затем главы, и наконец — интеграция всего в единое целое.

## Tasks

- [x] 1. Инициализация проекта и базовая конфигурация
  - Создать Next.js проект с App Router, TypeScript, TailwindCSS (если не создан)
  - Установить зависимости: `lenis`, `gsap`, `framer-motion`, `fast-check`, `vitest`, `@testing-library/react`
  - Создать `src/lib/constants.ts` с цветовыми палитрами глав, таймингами анимаций, `ParticleConfig`, `SoundConfig` и `TIMELINE_EVENTS`
  - Создать `src/lib/gsap.ts` — регистрация GSAP плагинов (ScrollTrigger)
  - Настроить `tailwind.config.ts`: тёмная тема, кастомные цвета (#0a0a0a–#1a1a2e), шрифты serif/sans-serif
  - Создать `src/app/globals.css`: базовые стили, film grain CSS-анимация, подключение шрифтов
  - _Requirements: 1.1, 12.1, 12.2, 13.1, 13.4_

- [x] 2. LenisProvider и система плавной прокрутки
  - [x] 2.1 Создать `src/components/providers/LenisProvider.tsx`
    - Инициализировать Lenis с `lerp: 0.08`, `smoothWheel: true`, `touchMultiplier: 2`
    - Синхронизировать с GSAP ticker: `gsap.ticker.add((time) => lenis.raf(time * 1000))`
    - Настроить `ScrollTrigger.scrollerProxy` для корректной работы с Lenis
    - Подписать `ScrollTrigger.update` на событие `scroll` Lenis
    - Предоставить инстанс Lenis через React Context (`LenisContextValue`)
    - Пометить директивой `'use client'`
    - _Requirements: 1.1, 1.2_
  - [x] 2.2 Создать хук `src/hooks/useLenis.ts`
    - Возвращать `{ lenis, scrollY, scrollProgress }` из контекста
    - _Requirements: 1.2, 1.3_

- [x] 3. Глобальные layout-компоненты
  - [x] 3.1 Создать `src/components/layout/FilmGrainOverlay.tsx`
    - Реализовать через SVG `feTurbulence` фильтр и CSS-анимацию смещения
    - Фиксированное позиционирование, `pointer-events: none`, `opacity: 0.035`
    - _Requirements: 11.2_
  - [x] 3.2 Создать `src/hooks/useSound.ts`
    - Управлять `HTMLAudioElement` через `useRef`
    - Реализовать плавный fade-in/fade-out через `requestAnimationFrame` (1000 мс)
    - Инициализировать в состоянии `isPlaying: false`
    - Перехватывать `NotAllowedError` без пробрасывания в UI
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_
  - [x] 3.3 Создать `src/components/layout/SoundController.tsx`
    - Использовать хук `useSound`
    - Фиксированная позиция (fixed, top-right), `aria-label` для кнопки
    - Отображать переключатель Sound ON/OFF
    - _Requirements: 9.1, 9.4_
  - [x] 3.4 Обновить `src/app/layout.tsx`
    - Подключить `LenisProvider`, `FilmGrainOverlay`, `SoundController`
    - _Requirements: 1.1, 11.2, 9.1_

- [-] 4. Анимационные обёртки (Framer Motion)
  - [x] 4.1 Создать `src/components/animations/FadeInView.tsx`
    - `motion.div` с `whileInView`, `viewport={{ once: true }}`
    - Поддержка `delay`, `duration`, `direction` (up/down/left/right/none)
    - _Requirements: 2.3, 3.3, 7.2_
  - [x] 4.2 Создать `src/components/animations/StaggerReveal.tsx`
    - Framer Motion stagger wrapper с `staggerDelay` (default: 150 мс)
    - Каждый дочерний элемент получает задержку `index * staggerDelay`
    - _Requirements: 4.5_
  - [ ] 4.3 Написать property-тест для StaggerReveal (Property 4)
    - **Property 4: Stagger reveal interval invariant**
    - Реализовать `computeStaggerDelays(iconCount, staggerDelay)` в `src/lib/utils.ts`
    - Написать тест с `fast-check`: для любого `iconCount` (1–12) и `staggerDelay` (0–150) разница между соседними задержками не превышает 150 мс
    - **Validates: Requirements 4.5**

- [-] 5. Утилиты и вспомогательные хуки
  - [x] 5.1 Создать `src/lib/utils.ts`
    - Реализовать `resolveParticleCount(requestedCount, viewportWidth)`: возвращает количество частиц с учётом ограничений viewport
    - Реализовать `computeStaggerDelays(iconCount, staggerDelay)`: возвращает массив задержек
    - Реализовать `sortTimelineEvents(events)`: сортировка по году (ascending)
    - Реализовать `simulateSoundToggles(toggleSequence, targetVolume)`: симуляция состояния звука
    - _Requirements: 11.3, 11.4, 4.5, 10.1, 9.2, 9.3_
  - [ ] 5.2 Написать property-тест для системы частиц (Property 1)
    - **Property 1: Particle count respects viewport constraints**
    - Написать тест с `fast-check`: для любого `viewportWidth` (320–2560) и `requestedCount` (50–200) результат `resolveParticleCount` соответствует ограничениям (desktop: 50–200, mobile: 0–80)
    - **Validates: Requirements 11.3, 11.4**
  - [ ] 5.3 Написать property-тест для Timeline (Property 3)
    - **Property 3: Timeline events are in chronological order**
    - Написать тест с `fast-check`: для любого перемешанного подмножества `TIMELINE_EVENTS` функция `sortTimelineEvents` возвращает строго возрастающий порядок годов
    - **Validates: Requirements 10.1**
  - [ ] 5.4 Написать property-тест для SoundController (Property 2)
    - **Property 2: Sound fade timing invariant**
    - Написать тест с `fast-check`: для любой последовательности toggle-действий (1–20) и `targetVolume` (0.1–1.0) функция `simulateSoundToggles` возвращает корректный финальный volume
    - **Validates: Requirements 9.2, 9.3**

- [x] 6. Checkpoint — базовые утилиты и провайдеры
  - Убедиться, что все тесты проходят, спросить пользователя при возникновении вопросов.

- [x] 7. UI-компоненты
  - [x] 7.1 Создать `src/components/ui/ParallaxLayer.tsx`
    - GSAP ScrollTrigger `scrub` для параллакс-смещения дочерних элементов
    - Принимать `speed` (0.2–0.5)
    - Пометить `'use client'`
    - _Requirements: 3.6, 13.5_
  - [x] 7.2 Создать `src/components/ui/ScrollIndicator.tsx`
    - Отображать текст «Scroll to begin ↓»
    - Framer Motion анимация пульсации/bounce
    - _Requirements: 2.5_
  - [x] 7.3 Создать `src/hooks/useParticles.ts`
    - RAF-цикл для обновления массива частиц (`Particle[]`)
    - Адаптировать количество к ширине viewport: `window.innerWidth < 768 ? mobileCount : count`
    - _Requirements: 11.1, 11.3, 11.4_
  - [x] 7.4 Создать `src/components/ui/ParticleSystem.tsx`
    - Canvas-based компонент, использующий `useParticles`
    - Рендерить `null` на сервере (SSR-safe)
    - Поддержка `type: 'snow' | 'fog'`
    - _Requirements: 11.1, 11.3, 11.4_
  - [x] 7.5 Создать `src/components/ui/MapComponent.tsx`
    - SVG-карта Европы начала XIX века
    - Вариант `'hero'`: GSAP `scale` zoom-анимация
    - Вариант `'transition-1809'`: GSAP анимация `fill`/`stroke` финской территории (шведские цвета → российские)
    - Пометить `'use client'`
    - _Requirements: 2.1, 2.6, 3.2_
  - [x] 7.6 Создать `src/components/ui/SplitScreen.tsx`
    - Левая панель: символика Российской империи
    - Правая панель: символы автономной Финляндии
    - Принимать `leftContent`, `rightContent`, `leftLabel`, `rightLabel`
    - _Requirements: 4.2_
  - [x] 7.7 Создать `src/components/ui/Timeline.tsx`
    - Горизонтальная (desktop) / вертикальная (mobile) шкала
    - Каждая точка — `<button>` с `aria-label` и tooltip при hover
    - Активация точек через Framer Motion `useInView` или GSAP ScrollTrigger
    - Использовать `sortTimelineEvents` для гарантии хронологического порядка
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [x] 8. Checkpoint — UI-компоненты
  - Убедиться, что все тесты проходят, спросить пользователя при возникновении вопросов.

- [-] 9. HeroSection (Экран 1)
  - [x] 9.1 Создать `src/components/sections/HeroSection.tsx`
    - Высота 100vh, тёмный фон (#0a0a0a–#1a1a2e)
    - Подключить `MapComponent` (вариант `'hero'`) с кинематографическим zoom через GSAP
    - Подключить `ParticleSystem` (тип `'snow'`, count: 100, mobileCount: 50)
    - Заголовок «Как Финляндия стала почти отдельным государством внутри Российской империи» с `FadeInView` (delay: 500 мс)
    - Подзаголовок «1809–1917» и фраза «История автономии, развития и пути к независимости»
    - Подключить `ScrollIndicator`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_
  - [ ] 9.2 Написать unit-тест для HeroSection
    - Проверить наличие заголовка, подзаголовка «1809–1917» и индикатора «Scroll to begin ↓»
    - _Requirements: 2.3, 2.4, 2.5_

- [~] 10. Chapter1809 (Экран 2)
  - [x] 10.1 Создать `src/components/sections/Chapter1809.tsx`
    - Заголовок «1809 — Финляндия переходит Российской империи»
    - Подключить `MapComponent` (вариант `'transition-1809'`) — анимация смены границ при входе в viewport
    - `FadeInView` для исторических документов и печатей
    - Цитата: «Финляндия больше не была шведской — но ещё не стала полностью российской»
    - Портрет Александра I как визуальный элемент (next/image с lazy loading)
    - `ParallaxLayer` для фоновых элементов (speed: 0.3)
    - Текстура старой бумаги/пергамента как фон
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 13.3_

- [~] 11. ChapterAutonomy (Экран 3)
  - [x] 11.1 Создать `src/components/sections/ChapterAutonomy.tsx`
    - Заголовок «Почти отдельное государство внутри империи»
    - Подключить `SplitScreen` (левая: символика России, правая: символы Финляндии)
    - 6 иконок атрибутов автономии (парламент, валюта, армия, документы, культура, язык) через `StaggerReveal` (staggerDelay: 150 мс)
    - Hover-анимация свечения иконок через Framer Motion `whileHover`
    - Цитата: «Финляндия формально принадлежала России, но жила почти как отдельное государство»
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [~] 12. ChapterGoldenAge (Экран 4)
  - [x] 12.1 Создать `src/components/sections/ChapterGoldenAge.tsx`
    - Заголовок «Золотой век Финляндии»
    - Золотистая цветовая палитра (accent: gold/amber), контрастирующая с тёмными главами
    - Подключить `Timeline` с `TIMELINE_EVENTS` (события 1809–1917)
    - GSAP ScrollTrigger анимация роста городской инфраструктуры вдоль Timeline при входе в viewport
    - Цитата: «Именно в составе России начала формироваться современная Финляндия»
    - Исторические фотографии Хельсинки через `next/image` с lazy loading
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 12.5_

- [~] 13. ChapterRussification (Экран 5)
  - [x] 13.1 Создать `src/components/sections/ChapterRussification.tsx`
    - Заголовок «Русификация и сопротивление»
    - GSAP glitch-переход при входе в viewport (затемнение + красные цветовые наложения)
    - Анимированные газетные заголовки с CSS-эффектом мерцания (flickering)
    - Специальный блок о событии 1904 года: убийство Бобрикова Эйгеном Шауманом
    - Цитата: «Чем сильнее империя пыталась контролировать Финляндию — тем сильнее становилось желание независимости»
    - Визуальные элементы: протесты, политическое напряжение, драматические тени
    - Текстура пергамента как фон
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 13.3_

- [~] 14. ChapterIndependence (Экран 6)
  - [x] 14.1 Создать `src/components/sections/ChapterIndependence.tsx`
    - Заголовок «1917 — рождение независимой Финляндии»
    - GSAP анимация перехода от тёмной атмосферы к светлой (тьма → свет) при входе в viewport
    - `FadeInView` для финского флага (плавное появление)
    - Подключить `ParticleSystem` (тип `'snow'`, count: 100, mobileCount: 50) на фоне рассвета
    - Цитата: «Автономия внутри империи стала фундаментом независимого государства»
    - Ключевые даты: революция 1917 года, 6 декабря 1917 — провозглашение независимости, признание Лениным
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

- [~] 15. FinalScreen (Экран 7)
  - [x] 15.1 Создать `src/components/sections/FinalScreen.tsx`
    - Финальный текст: «История Великого княжества Финляндского — это история того, как автономия превратилась в государственность»
    - Визуальные элементы современной Финляндии (Хельсинки, природа, флаг) через `next/image` с lazy loading
    - Кнопка «Спасибо за внимание» с `aria-label`, Framer Motion анимация при клике
    - Светлая, спокойная цветовая палитра
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  - [ ] 15.2 Написать unit-тест для FinalScreen
    - Проверить наличие кнопки «Спасибо за внимание» и её кликабельность
    - _Requirements: 8.3, 8.4_

- [x] 16. Checkpoint — все секции
  - Убедиться, что все тесты проходят, спросить пользователя при возникновении вопросов.

- [x] 17. Сборка главной страницы и адаптивность
  - [x] 17.1 Обновить `src/app/page.tsx`
    - Подключить все 7 секций в правильном порядке: HeroSection → Chapter1809 → ChapterAutonomy → ChapterGoldenAge → ChapterRussification → ChapterIndependence → FinalScreen
    - _Requirements: 1.2, 13.6_
  - [x] 17.2 Реализовать адаптивные стили для всех компонентов
    - Mobile (до 768px): упрощённые анимации, отключить glitch и параллакс через `prefers-reduced-motion` и `matchMedia`
    - Tablet (768px–1024px) и Desktop (более 1024px): полные анимации
    - Адаптировать шрифты, отступы, компоновку через TailwindCSS breakpoints
    - _Requirements: 12.1, 12.2, 12.4_
  - [x] 17.3 Добавить lazy loading для всех изображений
    - Использовать `next/image` с `loading="lazy"` и обязательным `alt` для всех изображений
    - CSS-градиентный placeholder при недоступности изображения
    - _Requirements: 12.5_

- [ ] 18. Unit-тесты для ключевых компонентов
  - [ ] 18.1 Написать unit-тест для SoundController
    - Проверить `isPlaying === false` при монтировании
    - Проверить, что ошибка `NotAllowedError` не пробрасывается в UI
    - _Requirements: 9.4, 9.5_
  - [ ] 18.2 Написать unit-тест для FilmGrainOverlay
    - Проверить рендеринг с `pointer-events: none`
    - _Requirements: 11.2_
  - [ ] 18.3 Написать unit-тест для ScrollIndicator
    - Проверить отображение текста «Scroll to begin ↓»
    - _Requirements: 2.5_
  - [ ] 18.4 Написать unit-тест для Timeline
    - Проверить появление tooltip при hover на точку Timeline
    - _Requirements: 10.4_

- [x] 19. Финальный checkpoint — полная интеграция
  - Убедиться, что все тесты проходят, спросить пользователя при возникновении вопросов.

## Notes

- Задачи, отмеченные `*`, являются опциональными и могут быть пропущены для более быстрого MVP
- Все компоненты, использующие браузерные API (GSAP, Lenis, Canvas), помечаются директивой `'use client'`
- `LenisProvider` инициализируется только в `useEffect` для корректной работы с SSR
- `ParticleSystem` рендерит `null` на сервере
- Property-тесты используют библиотеку `fast-check` (минимум 100 итераций каждый)
- Unit-тесты используют Vitest + React Testing Library
- Каждая задача ссылается на конкретные требования для трассируемости
