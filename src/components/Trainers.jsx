/**
 * src/components/Trainers.jsx
 * Coach cards with photo, specialty, years of experience and certifications.
 * Two columns even on phones, so visitors see several coaches at a glance.
 * Photos are lazy-loaded at a fixed 4:5 ratio, so the layout never shifts.
 */
import { trainers } from '../data/trainers';
import Icon from './Icon';
import Photo from './Photo';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Trainers() {
  return (
    <section id="trainers" aria-labelledby="trainers-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="trainers-title"
          eyebrow="Coaches"
          title={
            <>
              Coached, <span className="text-volt">not just supervised</span>
            </>
          }
          intro="Four certified coaches who programme your sessions, correct your form and check in on progress."
        />

        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-6 lg:grid-cols-4">
          {trainers.map((t, i) => (
            <Reveal as="li" key={t.id} delay={i * 90} className="group">
              <div className="relative">
                <Photo
                  id={t.photo.pexelsId}
                  alt={t.photo.alt}
                  width={480}
                  height={600}
                  widths={[240, 360, 480, 720]}
                  sizes="(min-width: 1024px) 22vw, 46vw"
                  className="card aspect-[4/5] w-full p-0"
                  imgClassName="grayscale-[30%] transition duration-500 group-hover:grayscale-0 motion-safe:group-hover:scale-[1.04]"
                />
                <span aria-hidden="true" className="tag tag-volt absolute bottom-3 left-3 font-semibold">
                  {t.years} yrs
                </span>
              </div>
              <div className="mt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-volt sm:text-xs">
                  {t.specialty}
                </p>
                <h3 className="heading-display mt-1.5 text-2xl text-ink-100 sm:text-3xl">{t.name}</h3>
                <p className="sr-only">{t.years} years coaching</p>
                <ul className="mt-3 space-y-1.5" aria-label={`${t.name}'s certifications`}>
                  {t.certifications.map((cert) => (
                    <li key={cert} className="flex items-start gap-2 text-xs text-ink-100 sm:text-sm">
                      <Icon name="badge" className="mt-0.5 size-4 shrink-0 text-volt" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
