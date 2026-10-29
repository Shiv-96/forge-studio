/**
 * src/components/Logo.jsx
 * FORGE wordmark: slanted lime block + condensed type. Links back to the top of the page.
 */

export default function Logo({ className = '' }) {
  return (
    <a
      href="#top"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="FORGE Studio, back to top"
    >
      <span aria-hidden="true" className="block h-6 w-5 -skew-x-12 bg-volt transition-transform group-hover:skew-x-0" />
      <span aria-hidden="true" className="font-display text-2xl leading-none tracking-wider text-ink-100">
        FORGE<span className="ml-1.5 text-volt">STUDIO</span>
      </span>
    </a>
  );
}
