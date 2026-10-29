/**
 * src/data/trainers.js
 * Coach profiles. Trainers are fictional; photos are free stock images from Pexels
 * (credited in README.md and in `photo.credit`). `photo.pexelsId` feeds the image
 * helpers in src/utils/images.js. To use your own photos, drop files in public/images/
 * and replace `pexelsId` with a `src` field in Trainers.jsx.
 */

export const trainers = [
  {
    id: 'arjun',
    name: 'Arjun Mehta',
    specialty: 'Strength and conditioning',
    years: 8,
    certifications: ['ACE Certified Personal Trainer', 'First Aid and CPR'],
    photo: {
      pexelsId: 31918891,
      alt: 'Arjun, a strength coach, standing in the gym with arms crossed',
      credit: 'Foad Shariyati',
      creditUrl: 'https://www.pexels.com/photo/confident-man-standing-in-gym-with-crossed-arms-31918891/',
    },
  },
  {
    id: 'priya',
    name: 'Priya Nair',
    specialty: 'Yoga and mobility',
    years: 6,
    certifications: ['RYT-200, Yoga Alliance', 'Pre and postnatal yoga'],
    photo: {
      pexelsId: 4498516,
      alt: 'Priya, a yoga coach, smiling and holding a rolled yoga mat',
      credit: 'Karola G',
      creditUrl: 'https://www.pexels.com/photo/slim-sportswoman-with-folded-yoga-mat-at-home-4498516/',
    },
  },
  {
    id: 'rohan',
    name: 'Rohan Kulkarni',
    specialty: 'HIIT and functional training',
    years: 5,
    certifications: ['NASM Certified Personal Trainer', 'Kettlebell Level 1'],
    photo: {
      pexelsId: 32695885,
      alt: 'Rohan, a HIIT coach, posing confidently in the gym',
      credit: 'assomyron',
      creditUrl: 'https://www.pexels.com/photo/fitness-coach-in-gym-setting-showing-confidence-32695885/',
    },
  },
  {
    id: 'sneha',
    name: 'Sneha Joshi',
    specialty: 'Zumba and dance fitness',
    years: 4,
    certifications: ['Licensed Zumba Instructor', 'ACE Group Fitness Instructor'],
    photo: {
      pexelsId: 6739931,
      alt: 'Sneha, a dance fitness coach, smiling in a grey hoodie',
      credit: 'Mikhail Nilov',
      creditUrl: 'https://www.pexels.com/photo/woman-wearing-gray-hoodie-and-black-leggings-6739931/',
    },
  },
];

/** Quick lookup: trainerById.priya → trainer object. */
export const trainerById = Object.fromEntries(trainers.map((t) => [t.id, t]));
