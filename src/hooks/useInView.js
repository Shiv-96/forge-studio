/**
 * src/hooks/useInView.js
 * Tell a component when its element scrolls into the viewport.
 * Used for scroll reveal animations and to lazy-mount the Google Maps embed.
 */
import { useEffect, useRef, useState } from 'react';

/**
 * @param {{ rootMargin?: string, threshold?: number, once?: boolean }} [options]
 *   once: stop observing after the first time the element is visible (default true)
 * @returns {[import('react').RefObject<HTMLElement>, boolean]} a ref to attach, and whether it is in view
 */
export function useInView({ rootMargin = '0px 0px -10% 0px', threshold = 0.1, once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Very old browsers: show content immediately rather than leaving it hidden.
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return [ref, inView];
}
