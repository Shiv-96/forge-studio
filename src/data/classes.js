/**
 * src/data/classes.js
 * Class types offered by the studio. The `id` is referenced by the timetable
 * (schedule.js) and the trial form's "preferred class" dropdown.
 * `photo.pexelsId` is a Pexels photo id (see src/utils/images.js); credits are listed in README.md.
 * Calorie ranges are rough estimates for a ~60–70 kg adult; they are shown as "approx".
 */

export const classes = [
  {
    id: 'strength',
    photo: {
      pexelsId: 5755261,
      alt: 'Man lifting a pair of dumbbells during a strength session',
      credit: 'Bhavesh Mahida',
      creditUrl: 'https://www.pexels.com/photo/man-in-blue-workout-tank-top-carrying-black-dumbbells-5755261/',
    },
    name: 'Strength',
    icon: 'dumbbell',
    level: 'All levels',
    duration: 60,
    calories: { min: 200, max: 350 },
    description: 'Barbell and dumbbell basics, taught step by step. Squat, hinge, push and pull with good form first.',
  },
  {
    id: 'hiit',
    photo: {
      pexelsId: 6455771,
      alt: 'Woman working hard with battle ropes while a coach watches',
      credit: 'Julia Larson',
      creditUrl: 'https://www.pexels.com/photo/ethnic-woman-exercising-with-battling-ropes-near-male-trainer-6455771/',
    },
    name: 'HIIT',
    icon: 'zap',
    level: 'Intermediate',
    duration: 45,
    calories: { min: 300, max: 450 },
    description: 'Short, hard intervals with rest built in. Bodyweight, kettlebells and rowers. Scaled to your level.',
  },
  {
    id: 'yoga',
    photo: {
      pexelsId: 3822668,
      alt: "Instructor adjusting a student's pose during a yoga class",
      credit: 'Elly Fairytale',
      creditUrl: 'https://www.pexels.com/photo/women-doing-yoga-3822668/',
    },
    name: 'Yoga',
    icon: 'leaf',
    level: 'Beginner-friendly',
    duration: 60,
    calories: { min: 120, max: 250 },
    description: 'Hatha-based flows for mobility, balance and breathing. A good counterweight to lifting days.',
  },
  {
    id: 'zumba',
    photo: {
      pexelsId: 8957646,
      alt: 'Women dancing through a fitness dance routine in a studio',
      credit: 'Kampus Production',
      creditUrl: 'https://www.pexels.com/photo/8957646/',
    },
    name: 'Zumba',
    icon: 'music',
    level: 'All levels',
    duration: 50,
    calories: { min: 250, max: 450 },
    description: 'Dance-based cardio to Latin and Bollywood tracks. No experience needed. Just keep moving.',
  },
];

/** Quick lookup: classById.hiit → class object. */
export const classById = Object.fromEntries(classes.map((c) => [c.id, c]));
