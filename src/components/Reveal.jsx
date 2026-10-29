/**
 * src/components/Reveal.jsx
 * Fade/slide children in when they scroll into view.
 * The animation is defined in index.css under `prefers-reduced-motion: no-preference`,
 * so visitors who prefer reduced motion see the content immediately with no movement.
 */
import { useInView } from '../hooks/useInView';

/**
 * @param {{ as?: string, delay?: number, className?: string, children: React.ReactNode }} props
 *   delay: stagger in milliseconds (handy for grids)
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      data-visible={inView}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
