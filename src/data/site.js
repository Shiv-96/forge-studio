/**
 * src/data/site.js
 * Studio-wide details: brand, contact, opening hours, navigation and social links.
 * Edit this file to rebrand the site for a real client. index.html (meta tags,
 * JSON-LD) and public/sitemap.xml + robots.txt hold the domain separately.
 */

export const site = {
  name: 'FORGE Studio',
  shortName: 'FORGE',
  tagline: 'Stronger, one session at a time.',
  url: 'https://forge-studio-demo.netlify.app',

  // Fictional contact details for the sample. Replace before using for a real business.
  phoneDisplay: '+91 20 4000 1234',
  phoneHref: 'tel:+912040001234',
  email: 'hello@forgestudio.example',
  address: {
    line1: '2nd Floor, Sai Plaza, Baner Road',
    line2: 'Baner, Pune 411045',
    region: 'Maharashtra, India',
  },
  // Used for the Google Maps embed and the "Get directions" link.
  mapQuery: 'Baner Road, Baner, Pune, Maharashtra 411045',

  hours: [
    { days: 'Mon – Sat', time: '6:00 AM – 10:00 PM' },
    { days: 'Sunday', time: '7:00 AM – 12:00 PM' },
  ],

  // Shown in the hero stats row. Trainer and class counts are derived from the data files.
  membersLabel: '600+',
};

/**
 * Section photos (Pexels ids, credited in README.md). Swap ids to change the imagery.
 * The hero id is also preloaded in index.html, so update both together.
 */
export const sectionPhotos = {
  hero: { pexelsId: 2105493, credit: 'Kuldeep Singhania' },
  whyUs: {
    pexelsId: 7444444,
    alt: 'A coach guiding two members through an exercise on the gym floor',
    credit: 'Saulo Leite',
  },
  trial: { pexelsId: 6339358, credit: 'Pavel Danilyuk' },
};

/** Anchor links in the navbar and footer. `href` must match a section id. */
export const navLinks = [
  { label: 'Classes', href: '#classes' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Plans', href: '#plans' },
  { label: 'BMI', href: '#bmi' },
  { label: 'Contact', href: '#contact' },
];

/** Social profiles. Replace with the client's real profile URLs. */
export const socialLinks = [
  { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/' },
  { label: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/' },
  { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/' },
];
