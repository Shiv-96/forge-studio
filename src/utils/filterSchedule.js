/**
 * src/utils/filterSchedule.js
 * Pure helpers for the weekly timetable: day metadata, filtering, sorting and
 * time formatting. No React here, so the logic is easy to check by eye or test.
 */

/** Days in display order. `id` matches the `day` field in schedule.js. */
export const DAYS = [
  { id: 'mon', short: 'Mon', full: 'Monday' },
  { id: 'tue', short: 'Tue', full: 'Tuesday' },
  { id: 'wed', short: 'Wed', full: 'Wednesday' },
  { id: 'thu', short: 'Thu', full: 'Thursday' },
  { id: 'fri', short: 'Fri', full: 'Friday' },
  { id: 'sat', short: 'Sat', full: 'Saturday' },
  { id: 'sun', short: 'Sun', full: 'Sunday' },
];

/** Value used by both filters to mean "no filter". */
export const ALL = 'all';

const dayOrder = Object.fromEntries(DAYS.map((d, i) => [d.id, i]));

/**
 * Convert a 24-hour "HH:MM" string to minutes after midnight.
 * @param {string} time - e.g. "18:30"
 * @returns {number} e.g. 1110
 */
export function timeToMinutes(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Format a 24-hour "HH:MM" string as a 12-hour clock time.
 * @param {string} time - e.g. "18:30"
 * @returns {string} e.g. "6:30 PM"
 */
export function formatTime(time) {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

/**
 * Filter and sort timetable sessions.
 * Sessions are sorted by day of week (Mon → Sun), then by start time.
 * The input array is never mutated.
 *
 * @param {Array<{day: string, time: string, classId: string}>} sessions
 * @param {{ day?: string, classType?: string }} [filters] - use ALL ('all') or omit for no filter
 * @returns {Array} a new, sorted array of matching sessions
 *
 * @example
 * filterSchedule(schedule, { day: 'mon', classType: 'yoga' }) // Monday yoga sessions only
 * filterSchedule(schedule, { classType: 'hiit' })             // every HIIT session, Mon → Sun
 */
export function filterSchedule(sessions, { day = ALL, classType = ALL } = {}) {
  return sessions
    .filter((s) => (day === ALL || s.day === day) && (classType === ALL || s.classId === classType))
    .sort((a, b) => dayOrder[a.day] - dayOrder[b.day] || timeToMinutes(a.time) - timeToMinutes(b.time));
}

/**
 * Get the timetable day id for a date (defaults to today in the visitor's timezone).
 * JavaScript's getDay() starts the week on Sunday (0), so it is remapped to Mon-first ids.
 * @param {Date} [date=new Date()]
 * @returns {string} 'mon' … 'sun'
 */
export function getDayId(date = new Date()) {
  return DAYS[(date.getDay() + 6) % 7].id;
}

/**
 * Find the next upcoming session that still has open seats, starting from `now`.
 * Looks through the rest of today, then the following days, wrapping around the week.
 *
 * @param {Array<{day: string, time: string, seatsLeft: number}>} sessions
 * @param {Date} [now=new Date()]
 * @returns {{ session: object, when: string } | null}
 *   when: "Today", "Tomorrow" or a weekday name; null if nothing has open seats
 *
 * @example
 * // Monday 17:10 → { session: <Mon 18:00 Zumba>, when: 'Today' }
 * getNextOpenSession(schedule, new Date('2026-10-26T17:10'))
 */
export function getNextOpenSession(sessions, now = new Date()) {
  const todayIndex = (now.getDay() + 6) % 7;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  // Check today (only sessions not yet started), then up to 7 days ahead.
  for (let offset = 0; offset <= 7; offset += 1) {
    const day = DAYS[(todayIndex + offset) % 7];
    const match = filterSchedule(sessions, { day: day.id }).find(
      (s) => s.seatsLeft > 0 && (offset > 0 || timeToMinutes(s.time) > nowMinutes),
    );
    if (match) {
      const when = offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : day.full;
      return { session: match, when };
    }
  }
  return null;
}

/**
 * Describe seat availability for the seats-left tag.
 * @param {number} seatsLeft
 * @returns {{ label: string, tone: 'full' | 'low' | 'open' }}
 */
export function seatStatus(seatsLeft) {
  if (seatsLeft <= 0) return { label: 'Full', tone: 'full' };
  if (seatsLeft <= 3) return { label: `${seatsLeft} left`, tone: 'low' };
  return { label: `${seatsLeft} seats`, tone: 'open' };
}
