/**
 * src/components/SectionHeading.jsx
 * Consistent eyebrow + title + intro block used at the top of each section.
 * Pass `id` to link the section's aria-labelledby to this heading.
 */
import Reveal from './Reveal';

/**
 * @param {{ id: string, eyebrow: string, title: React.ReactNode, intro?: string, align?: 'left' | 'center' }} props
 */
export default function SectionHeading({ id, eyebrow, title, intro, align = 'left' }) {
  const centered = align === 'center';
  return (
    <Reveal className={`mb-10 max-w-2xl md:mb-14 ${centered ? 'mx-auto text-center' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="heading-display mt-4 text-4xl text-ink-100 sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-ink-400">{intro}</p>}
    </Reveal>
  );
}
