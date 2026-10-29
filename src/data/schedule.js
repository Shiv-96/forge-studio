/**
 * src/data/schedule.js
 * Weekly timetable. One object per session.
 *   day       'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
 *   time      24-hour 'HH:MM' start time (displayed as 12-hour in the UI)
 *   classId   id from classes.js
 *   trainerId id from trainers.js
 *   level     free text shown as a tag
 *   seatsLeft seats still open this week (0 shows "Full")
 *   capacity  batch size
 * Keep Sunday sessions inside Sunday opening hours (7 AM – 12 PM, see site.js).
 */

const B = 'Beginner';
const A = 'All levels';
const I = 'Intermediate';

export const schedule = [
  // Monday
  { day: 'mon', time: '06:30', classId: 'strength', trainerId: 'arjun', level: B, seatsLeft: 4, capacity: 14 },
  { day: 'mon', time: '07:45', classId: 'yoga', trainerId: 'priya', level: A, seatsLeft: 9, capacity: 14 },
  { day: 'mon', time: '09:30', classId: 'hiit', trainerId: 'rohan', level: I, seatsLeft: 6, capacity: 12 },
  { day: 'mon', time: '18:00', classId: 'zumba', trainerId: 'sneha', level: A, seatsLeft: 2, capacity: 14 },
  { day: 'mon', time: '19:00', classId: 'strength', trainerId: 'arjun', level: I, seatsLeft: 0, capacity: 14 },
  { day: 'mon', time: '20:00', classId: 'hiit', trainerId: 'rohan', level: A, seatsLeft: 5, capacity: 12 },

  // Tuesday
  { day: 'tue', time: '06:30', classId: 'hiit', trainerId: 'rohan', level: I, seatsLeft: 3, capacity: 12 },
  { day: 'tue', time: '07:45', classId: 'yoga', trainerId: 'priya', level: B, seatsLeft: 10, capacity: 14 },
  { day: 'tue', time: '10:00', classId: 'strength', trainerId: 'arjun', level: A, seatsLeft: 8, capacity: 14 },
  { day: 'tue', time: '18:00', classId: 'yoga', trainerId: 'priya', level: A, seatsLeft: 1, capacity: 14 },
  { day: 'tue', time: '19:00', classId: 'hiit', trainerId: 'rohan', level: I, seatsLeft: 4, capacity: 12 },
  { day: 'tue', time: '20:00', classId: 'zumba', trainerId: 'sneha', level: A, seatsLeft: 7, capacity: 14 },

  // Wednesday
  { day: 'wed', time: '06:30', classId: 'strength', trainerId: 'arjun', level: I, seatsLeft: 5, capacity: 14 },
  { day: 'wed', time: '07:45', classId: 'zumba', trainerId: 'sneha', level: A, seatsLeft: 11, capacity: 14 },
  { day: 'wed', time: '09:30', classId: 'yoga', trainerId: 'priya', level: B, seatsLeft: 8, capacity: 14 },
  { day: 'wed', time: '18:00', classId: 'hiit', trainerId: 'rohan', level: A, seatsLeft: 2, capacity: 12 },
  { day: 'wed', time: '19:00', classId: 'strength', trainerId: 'arjun', level: B, seatsLeft: 3, capacity: 14 },
  { day: 'wed', time: '20:00', classId: 'yoga', trainerId: 'priya', level: A, seatsLeft: 6, capacity: 14 },

  // Thursday
  { day: 'thu', time: '06:30', classId: 'hiit', trainerId: 'rohan', level: A, seatsLeft: 6, capacity: 12 },
  { day: 'thu', time: '07:45', classId: 'yoga', trainerId: 'priya', level: A, seatsLeft: 9, capacity: 14 },
  { day: 'thu', time: '10:00', classId: 'zumba', trainerId: 'sneha', level: B, seatsLeft: 12, capacity: 14 },
  { day: 'thu', time: '18:00', classId: 'strength', trainerId: 'arjun', level: A, seatsLeft: 0, capacity: 14 },
  { day: 'thu', time: '19:00', classId: 'zumba', trainerId: 'sneha', level: A, seatsLeft: 3, capacity: 14 },
  { day: 'thu', time: '20:00', classId: 'hiit', trainerId: 'rohan', level: I, seatsLeft: 5, capacity: 12 },

  // Friday
  { day: 'fri', time: '06:30', classId: 'strength', trainerId: 'arjun', level: B, seatsLeft: 7, capacity: 14 },
  { day: 'fri', time: '07:45', classId: 'yoga', trainerId: 'priya', level: A, seatsLeft: 8, capacity: 14 },
  { day: 'fri', time: '09:30', classId: 'hiit', trainerId: 'rohan', level: I, seatsLeft: 4, capacity: 12 },
  { day: 'fri', time: '18:00', classId: 'zumba', trainerId: 'sneha', level: A, seatsLeft: 1, capacity: 14 },
  { day: 'fri', time: '19:00', classId: 'strength', trainerId: 'arjun', level: I, seatsLeft: 2, capacity: 14 },
  { day: 'fri', time: '20:00', classId: 'yoga', trainerId: 'priya', level: B, seatsLeft: 10, capacity: 14 },

  // Saturday
  { day: 'sat', time: '07:00', classId: 'hiit', trainerId: 'rohan', level: A, seatsLeft: 3, capacity: 12 },
  { day: 'sat', time: '08:15', classId: 'strength', trainerId: 'arjun', level: A, seatsLeft: 5, capacity: 14 },
  { day: 'sat', time: '09:30', classId: 'zumba', trainerId: 'sneha', level: A, seatsLeft: 0, capacity: 14 },
  { day: 'sat', time: '11:00', classId: 'yoga', trainerId: 'priya', level: B, seatsLeft: 9, capacity: 14 },
  { day: 'sat', time: '17:30', classId: 'strength', trainerId: 'arjun', level: B, seatsLeft: 6, capacity: 14 },
  { day: 'sat', time: '18:45', classId: 'hiit', trainerId: 'rohan', level: I, seatsLeft: 7, capacity: 12 },

  // Sunday (open 7 AM – 12 PM)
  { day: 'sun', time: '07:30', classId: 'yoga', trainerId: 'priya', level: A, seatsLeft: 4, capacity: 14 },
  { day: 'sun', time: '08:45', classId: 'zumba', trainerId: 'sneha', level: A, seatsLeft: 2, capacity: 14 },
  { day: 'sun', time: '10:00', classId: 'strength', trainerId: 'arjun', level: B, seatsLeft: 8, capacity: 14 },
  { day: 'sun', time: '11:05', classId: 'hiit', trainerId: 'rohan', level: A, seatsLeft: 6, capacity: 12 },
];
