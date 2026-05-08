// ============================================================
// Color Palettes
// ============================================================

export interface ChapterPalette {
  background: string; // CSS color
  text: string;
  accent: string;
  overlay?: string; // for color overlays (red in Screen 5)
}

// ============================================================
// Animation Timings
// ============================================================

export const ANIMATION_TIMINGS = {
  fadeInDelay: 500,       // ms — hero title fade-in delay
  fadeInDuration: 600,    // ms — default fade-in duration
  staggerDelay: 150,      // ms — stagger between icons
  glitchDuration: 800,    // ms — glitch transition duration
  parallaxScrub: 1,       // GSAP scrub value
  lenisFadeIn: 1000,      // ms — Lenis smooth scroll lerp
} as const;

// ============================================================
// Particle Config
// ============================================================

export interface ParticleConfig {
  maxDesktop: number;
  maxMobile: number;
  minCount: number;
  mobileBreakpoint: number;
}

export const PARTICLE_CONFIG: ParticleConfig = {
  maxDesktop: 200,
  maxMobile: 80,
  minCount: 50,
  mobileBreakpoint: 768,
};

// ============================================================
// Sound Config
// ============================================================

export interface SoundConfig {
  src: string;
  defaultVolume: number;
  fadeInDuration: number;
  fadeOutDuration: number;
  autoplay: boolean;
}

export const SOUND_CONFIG: SoundConfig = {
  src: "https://ia801301.us.archive.org/13/items/sibelius-violin-concerto-op.-47-karelia-suite-op.-11-isaac-stern-eugene-ormandy-dvg/(04-06)%20Sibelius%20%20-%20Karelia%20Suite%2C%20Op.%2011.mp3",
  defaultVolume: 0.35,
  fadeInDuration: 2000,
  fadeOutDuration: 1500,
  autoplay: false,
};

// ============================================================
// Timeline Events
// ============================================================

export interface TimelineEvent {
  year: string;
  label: string;
  description: string;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "1809",
    label: "Переход к России",
    description: "Фридрихсгамский мирный договор",
  },
  {
    year: "1812",
    label: "Хельсинки — столица",
    description: "Перенос столицы из Турку",
  },
  {
    year: "1835",
    label: "Калевала",
    description: "Публикация финского национального эпоса",
  },
  {
    year: "1860",
    label: "Финская марка",
    description: "Введение собственной валюты",
  },
  {
    year: "1863",
    label: "Финский язык",
    description: "Официальный статус финского языка",
  },
  {
    year: "1899",
    label: "Февральский манифест",
    description: "Начало русификации",
  },
  {
    year: "1904",
    label: "Убийство Бобрикова",
    description: "Эйген Шауман, финский националист",
  },
  {
    year: "1917",
    label: "Независимость",
    description: "6 декабря — провозглашение независимости",
  },
];

// ============================================================
// Chapter Configs
// ============================================================

export type AnimationVariant = "fade" | "glitch" | "light-burst" | "golden";
export type BackgroundTexture = "paper" | "parchment" | "none";

export interface ChapterConfig {
  id: string;
  screenNumber: number;
  title: string;
  quote: string;
  colorPalette: ChapterPalette;
  backgroundTexture?: BackgroundTexture;
  hasParallax: boolean;
  animationVariant: AnimationVariant;
}

export const CHAPTER_CONFIGS: ChapterConfig[] = [
  {
    id: "hero",
    screenNumber: 1,
    title: "Как Финляндия стала почти отдельным государством внутри Российской империи",
    quote: "История автономии, развития и пути к независимости",
    colorPalette: {
      background: "#0a0a0a",
      text: "#f5f0e8",
      accent: "#c9a84c",
    },
    backgroundTexture: "none",
    hasParallax: false,
    animationVariant: "fade",
  },
  {
    id: "chapter-1809",
    screenNumber: 2,
    title: "1809 — Финляндия переходит Российской империи",
    quote: "Финляндия больше не была шведской — но ещё не стала полностью российской",
    colorPalette: {
      background: "#0d0d1a",
      text: "#f5f0e8",
      accent: "#c9a84c",
    },
    backgroundTexture: "paper",
    hasParallax: true,
    animationVariant: "fade",
  },
  {
    id: "chapter-autonomy",
    screenNumber: 3,
    title: "Почти отдельное государство внутри империи",
    quote: "Финляндия формально принадлежала России, но жила почти как отдельное государство",
    colorPalette: {
      background: "#1a1a2e",
      text: "#f5f0e8",
      accent: "#c9a84c",
    },
    backgroundTexture: "parchment",
    hasParallax: true,
    animationVariant: "fade",
  },
  {
    id: "chapter-golden-age",
    screenNumber: 4,
    title: "Золотой век Финляндии",
    quote: "Именно в составе России начала формироваться современная Финляндия",
    colorPalette: {
      background: "#1a1500",
      text: "#f5f0e8",
      accent: "#d4a017",
    },
    backgroundTexture: "parchment",
    hasParallax: true,
    animationVariant: "golden",
  },
  {
    id: "chapter-russification",
    screenNumber: 5,
    title: "Русификация и сопротивление",
    quote: "Чем сильнее империя пыталась контролировать Финляндию — тем сильнее становилось желание независимости",
    colorPalette: {
      background: "#0d0d0d",
      text: "#f5f0e8",
      accent: "#8b1a1a",
      overlay: "rgba(139, 26, 26, 0.3)",
    },
    backgroundTexture: "parchment",
    hasParallax: true,
    animationVariant: "glitch",
  },
  {
    id: "chapter-independence",
    screenNumber: 6,
    title: "1917 — рождение независимой Финляндии",
    quote: "Автономия внутри империи стала фундаментом независимого государства",
    colorPalette: {
      background: "#0a0a1a",
      text: "#f5f0e8",
      accent: "#c9a84c",
    },
    backgroundTexture: "none",
    hasParallax: false,
    animationVariant: "light-burst",
  },
  {
    id: "final-screen",
    screenNumber: 7,
    title: "История Великого княжества Финляндского",
    quote: "История Великого княжества Финляндского — это история того, как автономия превратилась в государственность",
    colorPalette: {
      background: "#f5f0e8",
      text: "#1a1a2e",
      accent: "#c9a84c",
    },
    backgroundTexture: "none",
    hasParallax: false,
    animationVariant: "fade",
  },
];
