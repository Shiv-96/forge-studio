/**
 * src/components/Hero.jsx
 * Full-bleed hero: darkened background photo, headline, two CTAs, stats row,
 * and (on large screens) a live "next open class" card.
 * The photo is the Largest Contentful Paint element, so it loads eagerly with high
 * priority and is also preloaded from index.html (keep the srcset in sync there).
 * If the photo fails, the striped brand frame and lime glow keep the hero from looking empty.
 */
import { useState } from 'react';
import { sectionPhotos, site } from '../data/site';
import { trainers } from '../data/trainers';
import { schedule } from '../data/schedule';
import { pexelsSrcSet, pexelsUrl } from '../utils/images';
import Icon from './Icon';
import NextClassCard from './NextClassCard';

const HERO_PHOTO_ID = sectionPhotos.hero.pexelsId;

// Stats come from the data files where possible, so they stay accurate after edits.
const stats = [
  { value: site.membersLabel, label: 'Members' },
  { value: trainers.length, label: 'Certified coaches' },
  { value: schedule.length, label: 'Classes a week' },
];

export default function Hero() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate -mt-16 flex min-h-[92svh] items-end overflow-hidden pt-16"
    >
      <div aria-hidden="true" className="photo-frame absolute inset-0 -z-20">
        {!photoFailed && (
          <img
            src={pexelsUrl(HERO_PHOTO_ID, { w: 1280 })}
            srcSet={pexelsSrcSet(HERO_PHOTO_ID, [640, 960, 1280, 1920])}
            sizes="100vw"
            width="1920"
            height="1280"
            alt=""
            fetchPriority="high"
            decoding="async"
            onError={() => setPhotoFailed(true)}
            className="absolute inset-0 size-full object-cover object-[70%_center]"
          />
        )}
      </div>
      {/* Overlays: even darkening, a bottom-up gradient for text contrast, and a soft lime glow. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink-950/55" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/80 via-transparent to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-32 -z-10 size-[36rem] rounded-full bg-volt/10 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-7xl items-end gap-10 px-4 pb-14 sm:px-6 md:pb-20 lg:grid-cols-[1fr_22rem] lg:px-8 xl:grid-cols-[1fr_24rem]">
        <div>
          <p className="eyebrow">
            Baner, Pune<span className="hidden sm:inline"> · Strength · HIIT · Yoga · Zumba</span>
          </p>

          <h1
            id="hero-title"
            className="heading-display mt-5 max-w-4xl text-[3.4rem] text-ink-100 sm:text-7xl lg:text-8xl xl:text-[7.5rem]"
          >
            Show up.
            <span className="block text-volt">Get stronger.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-100/90 sm:text-xl">
            A neighborhood studio with small batches and coaches who watch your form. Your first class is on us.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#trial" className="btn btn-primary">
              Start free trial
              <Icon name="arrowRight" className="size-5" />
            </a>
            <a href="#plans" className="btn btn-ghost bg-ink-950/30 backdrop-blur-sm">
              View plans
            </a>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-ink-700/80 pt-6 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs font-medium uppercase tracking-wider text-ink-400 sm:text-sm">
                  {stat.label}
                </dt>
                <dd className="font-display text-4xl leading-none text-ink-100 sm:text-5xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <NextClassCard className="hidden lg:block" />
      </div>
    </section>
  );
}
