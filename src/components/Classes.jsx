/**
 * src/components/Classes.jsx
 * Photo class cards (Strength, HIIT, Yoga, Zumba) followed by the filterable weekly timetable.
 * Content: src/data/classes.js and src/data/schedule.js.
 */
import { classes } from '../data/classes';
import Icon from './Icon';
import Photo from './Photo';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import Timetable from './Timetable';

export default function Classes() {
  return (
    <section
      id="classes"
      aria-labelledby="classes-title"
      className="border-t border-ink-800 bg-ink-900/40 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="classes-title"
          eyebrow="Classes"
          title={
            <>
              Four ways <span className="text-volt">to train</span>
            </>
          }
          intro="Every class is coached, capped at 14 people and scaled to your level. Mix them through the week."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {classes.map((cls, i) => (
            <Reveal as="li" key={cls.id} delay={i * 90} className="card group flex flex-col">
              {/* Photo header with the class name set over a dark gradient. */}
              <div className="relative">
                <Photo
                  id={cls.photo.pexelsId}
                  alt={cls.photo.alt}
                  width={640}
                  height={480}
                  widths={[400, 640, 900]}
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
                  className="aspect-[4/3] w-full"
                  imgClassName="transition-transform duration-700 motion-safe:group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent"
                />
                <span className="tag tag-volt absolute left-4 top-4 font-semibold">{cls.level}</span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-6 pb-3">
                  <h3 className="heading-display text-4xl text-ink-100">{cls.name}</h3>
                  <Icon name={cls.icon} className="mb-1 size-7 text-volt" strokeWidth={1.75} />
                </div>
              </div>
              <div className="flex flex-1 flex-col px-6 pb-6">
                <p className="mt-3 flex-1 leading-relaxed text-ink-400">{cls.description}</p>
                <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-ink-700 pt-4 text-sm">
                  <div>
                    <dt className="flex items-center gap-1.5 text-ink-400">
                      <Icon name="timer" className="size-4" /> Duration
                    </dt>
                    <dd className="mt-1 font-semibold text-ink-100">{cls.duration} min</dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-1.5 text-ink-400">
                      <Icon name="flame" className="size-4" /> Calories
                    </dt>
                    <dd className="mt-1 font-semibold text-ink-100">
                      approx. {cls.calories.min}–{cls.calories.max}
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink-400">
          Calorie figures are rough estimates per session and vary with body weight, age and effort.
        </p>

        <Timetable />
      </div>
    </section>
  );
}
