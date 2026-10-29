/**
 * src/hooks/useScrolled.js
 * Report whether the page has scrolled past a given offset.
 * The navbar uses it to switch from transparent to solid.
 */
import { useEffect, useState } from 'react';

/**
 * @param {number} [offset=24] - pixels from the top before it counts as scrolled
 * @returns {boolean}
 */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll(); // correct state on load, e.g. when the page opens at an anchor
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return scrolled;
}
