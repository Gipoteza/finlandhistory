import { useContext, useEffect, useState } from 'react';
import { LenisContext } from '@/components/providers/LenisProvider';
import type Lenis from 'lenis';

// ============================================================
// Types
// ============================================================

export interface UseLenisReturn {
  lenis: Lenis | null;
  scrollY: number;
  scrollProgress: number;
}

// ============================================================
// Hook
// ============================================================

export function useLenis(): UseLenisReturn {
  // SSR guard: return safe defaults when window is not available
  if (typeof window === 'undefined') {
    return { lenis: null, scrollY: 0, scrollProgress: 0 };
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { lenis } = useContext(LenisContext);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [scrollY, setScrollY] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [scrollProgress, setScrollProgress] = useState(0);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!lenis) return;

    const handleScroll = (lenisInstance: Lenis) => {
      const y = lenisInstance.scroll;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0;

      setScrollY(y);
      setScrollProgress(progress);
    };

    lenis.on('scroll', handleScroll);

    return () => {
      lenis.off('scroll', handleScroll);
    };
  }, [lenis]);

  return { lenis, scrollY, scrollProgress };
}

export default useLenis;
