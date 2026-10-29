/**
 * src/components/NextClassCard.jsx
 * "Next class with open spots" card for the hero, worked out live from the
 * timetable and the visitor's current time. Gives a concrete, time-limited
 * reason to book now, and links straight to the trial form.
 */
import { useState } from 'react';
import { classById } from '../data/classes';
import { schedule } from '../data/schedule';
import { trainerById } from '../data/trainers';
import { formatTime, getNextOpenSession, seatStatus } from '../utils/filterSchedule';
import Icon from './Icon';

export default function NextClassCard({ className = '' }) {
  // Computed once on mount; the page is rendered in the browser, so this is the visitor's local time.
  const [next] = useState(() => getNextOpenSession(schedule));
  if (!next) return null;

  const { session, when } = next;
  const cls = classById[session.classId];
  const trainer = trainerById[session.trainerId];
  const seats = seatStatus(session.seatsLeft);

  return (
    <aside aria-label="Next class with open spots" className={`card bg-ink-950/80 p-6 backdrop-blur-md ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow">Next open class</p>
        <span className="relative flex size-2.5" aria-hidden="true">
          <span className="absolute inline-flex size-full rounded-full bg-volt opacity-75 motion-safe:animate-ping" />
          <span className="relative inline-flex size-2.5 rounded-full bg-volt" />
        </span>
      </div>

      <p className="mt-5 text-sm font-medium uppercase tracking-wider text-ink-400">{when}</p>
      <p className="font-display text-6xl leading-none text-ink-100">{formatTime(session.time)}</p>

      <div className="mt-5 flex items-center gap-4 border-t border-ink-700 pt-5">
        <span className="inline-flex size-12 shrink-0 items-center justify-center bg-volt/10 text-volt">
          <Icon name={cls.icon} className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold text-ink-100">{cls.name}</p>
          <p className="text-sm text-ink-400">
            with {trainer.name} · {cls.duration} min
          </p>
        </div>
        <span className={`tag ${seats.tone === 'low' ? 'tag-volt' : 'text-ink-100'}`}>{seats.label}</span>
      </div>

      <a href="#trial" className="btn btn-primary mt-6 w-full">
        Try it free
        <Icon name="arrowRight" className="size-5" />
      </a>
    </aside>
  );
}
