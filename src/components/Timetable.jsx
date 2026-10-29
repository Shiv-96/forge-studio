/**
 * src/components/Timetable.jsx
 * Weekly class timetable with two filters (day and class type).
 * - Filters are toggle buttons (aria-pressed), so they work with keyboard and screen readers.
 * - Filtering/sorting lives in src/utils/filterSchedule.js (pure function).
 * - 768px and up: a table. Below: a stacked list that fits a 360px phone without sideways scrolling.
 * - Defaults to today's day so visitors see what is on right now.
 */
import { useMemo, useState } from 'react';
import { classes, classById } from '../data/classes';
import { schedule } from '../data/schedule';
import { trainerById } from '../data/trainers';
import { ALL, DAYS, filterSchedule, formatTime, getDayId, seatStatus } from '../utils/filterSchedule';

const dayName = Object.fromEntries(DAYS.map((d) => [d.id, d]));

function SeatsTag({ seatsLeft }) {
  const { label, tone } = seatStatus(seatsLeft);
  const toneClass = tone === 'low' ? 'tag-volt' : tone === 'full' ? 'text-ink-400 line-through' : 'text-ink-100';
  return <span className={`tag ${toneClass}`}>{label}</span>;
}

/** A labelled row of toggle buttons. Only one option can be pressed at a time. */
function FilterGroup({ label, options, value, onChange }) {
  return (
    <div role="group" aria-label={label} className="min-w-0">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-400" aria-hidden="true">
        {label}
      </p>
      {/* Wraps onto extra rows on small screens, so every option stays visible (no hidden scroll). */}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className="chip"
            aria-pressed={value === opt.value}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const dayOptions = [{ value: ALL, label: 'All days' }, ...DAYS.map((d) => ({ value: d.id, label: d.short }))];
const classOptions = [{ value: ALL, label: 'All classes' }, ...classes.map((c) => ({ value: c.id, label: c.name }))];

export default function Timetable() {
  const [day, setDay] = useState(() => getDayId());
  const [classType, setClassType] = useState(ALL);

  const sessions = useMemo(() => filterSchedule(schedule, { day, classType }), [day, classType]);
  const showDay = day === ALL;

  const summary = `${sessions.length} ${sessions.length === 1 ? 'class' : 'classes'}${
    classType === ALL ? '' : ` of ${classById[classType].name}`
  } ${showDay ? 'this week' : `on ${dayName[day].full}`}`;

  return (
    <div className="mt-20">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <h3 id="timetable-title" className="heading-display text-3xl text-ink-100 sm:text-4xl">
          Weekly timetable
        </h3>
        <p className="text-sm text-ink-400" aria-live="polite">
          Showing {summary}
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_auto] lg:gap-10">
        <FilterGroup label="Day" options={dayOptions} value={day} onChange={setDay} />
        <FilterGroup label="Class" options={classOptions} value={classType} onChange={setClassType} />
      </div>

      {sessions.length === 0 ? (
        <div className="mt-8 border border-dashed border-ink-700 p-8 text-center">
          <p className="text-ink-100">No classes match these filters.</p>
          <button
            type="button"
            className="mt-3 text-sm font-semibold text-volt underline underline-offset-4"
            onClick={() => {
              setDay(ALL);
              setClassType(ALL);
            }}
          >
            Show the full week
          </button>
        </div>
      ) : (
        <>
          {/* Tablet/desktop: table */}
          <div className="mt-8 hidden border border-ink-700 md:block">
            <table className="w-full text-left">
              <caption className="sr-only">Class timetable, {summary}</caption>
              <thead className="bg-ink-800 text-xs uppercase tracking-wider text-ink-400">
                <tr>
                  {showDay && (
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Day
                    </th>
                  )}
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Time
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Class
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Trainer
                  </th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Level
                  </th>
                  <th scope="col" className="px-5 py-3 text-right font-semibold">
                    Seats
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-800">
                {sessions.map((s) => (
                  <tr key={`${s.day}-${s.time}`} className="transition-colors hover:bg-ink-800/60">
                    {showDay && <td className="px-5 py-4 text-ink-400">{dayName[s.day].short}</td>}
                    <td className="px-5 py-4 font-semibold tabular-nums text-ink-100">{formatTime(s.time)}</td>
                    <td className="px-5 py-4">
                      <span className="font-semibold text-ink-100">{classById[s.classId].name}</span>
                      <span className="ml-2 text-sm text-ink-400">{classById[s.classId].duration} min</span>
                    </td>
                    <td className="px-5 py-4 text-ink-400">{trainerById[s.trainerId].name}</td>
                    <td className="px-5 py-4 text-ink-400">{s.level}</td>
                    <td className="px-5 py-4 text-right">
                      <SeatsTag seatsLeft={s.seatsLeft} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: stacked list */}
          <ul className="mt-6 space-y-3 md:hidden" aria-label={`Class timetable, ${summary}`}>
            {sessions.map((s) => (
              <li key={`${s.day}-${s.time}`} className="flex gap-4 border border-ink-700 bg-ink-900 p-4">
                <div className="w-20 shrink-0 border-r border-ink-700 pr-3">
                  {showDay && (
                    <p className="text-xs font-semibold uppercase tracking-wider text-volt">{dayName[s.day].short}</p>
                  )}
                  <p className="font-display text-xl leading-tight text-ink-100">{formatTime(s.time)}</p>
                  <p className="text-xs text-ink-400">{classById[s.classId].duration} min</p>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-ink-100">{classById[s.classId].name}</p>
                    <SeatsTag seatsLeft={s.seatsLeft} />
                  </div>
                  <p className="mt-1 text-sm text-ink-400">with {trainerById[s.trainerId].name}</p>
                  <p className="mt-1 text-sm text-ink-400">{s.level}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="mt-4 text-sm text-ink-400">Seat counts are for this week and update at the front desk.</p>
    </div>
  );
}
