/**
 * src/components/Testimonials.jsx
 * Member stories in a responsive grid (1 → 2 → 4 columns). A grid rather than a
 * carousel keeps every story readable without extra controls on mobile.
 * Content: src/data/testimonials.js.
 */
import { testimonials } from '../data/testimonials';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Testimonials() {
  return (
    <section aria-labelledby="stories-title" className="border-t border-ink-800 bg-ink-900/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="stories-title"
          eyebrow="Member stories"
          title={
            <>
              Progress, <span className="text-volt">in their words</span>
            </>
          }
        />

        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 90} className="card flex flex-col p-6">
              <figure className="flex h-full flex-col">
                <span aria-hidden="true" className="font-display text-6xl leading-none text-volt">
                  “
                </span>
                <blockquote className="mt-2 flex-1 leading-relaxed text-ink-100">
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption className="mt-6 border-t border-ink-700 pt-4">
                  <div className="flex items-center gap-3">
                    {/* Initials avatar: warmer than a bare name, without needing member photos. */}
                    <span
                      aria-hidden="true"
                      className="inline-flex size-10 shrink-0 -skew-x-6 items-center justify-center bg-volt font-display text-lg text-ink-950"
                    >
                      {t.name
                        .split(' ')
                        .map((part) => part[0])
                        .join('')}
                    </span>
                    <p className="font-semibold text-ink-100">{t.name}</p>
                  </div>
                  <dl className="mt-2 flex flex-wrap gap-2 text-xs">
                    <div className="tag text-ink-100">
                      <dt className="sr-only">Goal</dt>
                      <dd>{t.goal}</dd>
                    </div>
                    <div className="tag text-ink-100">
                      <dt className="sr-only">Member for</dt>
                      <dd>{t.duration}</dd>
                    </div>
                  </dl>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-400">
          Results vary from person to person and depend on consistency, sleep, nutrition and health history. Stories on
          this sample site are illustrative.
        </p>
      </div>
    </section>
  );
}
