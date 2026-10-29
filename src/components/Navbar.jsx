/**
 * src/components/Navbar.jsx
 * Sticky site header with anchor links, a "Free trial" call to action and an
 * accessible mobile menu:
 *   - the toggle exposes aria-expanded / aria-controls
 *   - Esc closes the menu and returns focus to the toggle
 *   - choosing a link closes the menu
 *   - resizing to desktop width closes it
 */
import { useEffect, useRef, useState } from 'react';
import { navLinks } from '../data/site';
import { useScrolled } from '../hooks/useScrolled';
import Icon from './Icon';
import Logo from './Logo';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const toggleRef = useRef(null);

  // Esc to close, with focus returned to the button that opened the menu.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // The mobile panel is hidden at md and up, so make sure state matches.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        solid
          ? 'border-b border-ink-700/70 bg-ink-950/90 backdrop-blur-md'
          : 'border-b border-transparent bg-ink-950/40'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium uppercase tracking-wider text-ink-400 transition-colors hover:text-ink-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#trial" className="btn btn-primary hidden min-h-10 px-5 py-2 text-xs sm:inline-flex">
            Free trial
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center text-ink-100 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <Icon name={open ? 'close' : 'menu'} className="size-7" />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel. `hidden` removes it from the tab order when closed. */}
      <div id="mobile-menu" hidden={!open} className="border-t border-ink-700 bg-ink-950 md:hidden">
        <ul className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="heading-display flex min-h-12 items-center justify-between border-b border-ink-800 text-2xl text-ink-100 hover:text-volt"
              >
                {link.label}
                <Icon name="arrowRight" className="size-5 text-ink-400" />
              </a>
            </li>
          ))}
        </ul>
        <div className="px-4 pb-6 sm:px-6">
          <a href="#trial" onClick={() => setOpen(false)} className="btn btn-primary w-full">
            Book a free trial
          </a>
        </div>
      </div>
    </header>
  );
}
