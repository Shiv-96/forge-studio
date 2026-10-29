/**
 * src/components/WhyUs.jsx
 * "Why train with us": a large coaching photo beside a compact two-column
 * feature list. Deliberately not another card grid, so the page has visual rhythm.
 * Content: src/data/features.js; photo: sectionPhotos.whyUs in src/data/site.js.
 */
import { features } from '../data/features';
import { sectionPhotos } from '../data/site';
import Icon from './Icon';
import Photo from './Photo';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function WhyUs() {
  const photo = sectionPhotos.whyUs;

  return (
    <section aria-labelledby="why-title" className="pb-20 pt-28 md:pb-28 md:pt-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-8">
        <Reveal className="relative">
          <Photo
            id={photo.pexelsId}
            alt={photo.alt}
            width={800}
            height={1000}
            widths={[480, 800, 1100]}
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="card aspect-[4/5] w-full p-0"
          />
          {/* Floating proof point over the photo. */}
          <div className="absolute -bottom-6 right-4 bg-volt px-6 py-4 text-ink-950 shadow-2xl shadow-ink-950/60 sm:right-8">
            <p className="font-display text-5xl leading-none">14</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider">Max per class</p>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            id="why-title"
            eyebrow="Why FORGE"
            title={
              <>
                Built for people <span className="text-volt">who keep going</span>
              </>
            }
            intro="No mirrors-and-ego culture. Just good coaching, sensible programming and a room that notices when you show up."
          />

          <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {features.map((feature, i) => (
              <Reveal as="li" key={feature.title} delay={(i % 2) * 90} className="flex gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center bg-volt/10 text-volt">
                  <Icon name={feature.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-ink-100">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-400">{feature.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
