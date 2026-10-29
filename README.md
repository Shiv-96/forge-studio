# FORGE Studio — Fitness Studio Website

> **Sample project.** FORGE Studio is a fictional neighborhood gym in Baner, Pune, built as a portfolio demo. All contact details are placeholders.

A fast, accessible, single-page website for a modern fitness studio offering strength training, HIIT, yoga and Zumba. It is built to turn mobile visitors into **free-trial signups**, with calling or visiting the studio as the secondary goal.

**Live demo:** [forge-studio-demo.netlify.app](https://forge-studio-demo.netlify.app/)

![Desktop screenshot](docs/screenshot-desktop.png)
![Mobile screenshot](docs/screenshot-mobile.png)

*(Screenshot placeholders: add your own captures to `docs/`.)*

---

## Features

- **Sticky navbar** with an accessible mobile menu (aria-expanded, closes on Esc and on link click, focus returns to the toggle)
- **Hero** with a darkened background photo, two calls to action, live stats, and a **"next open class" card** worked out from the timetable and the visitor's current time
- **Scrolling lime marquee** of disciplines (static for reduced-motion users)
- **Why us**: large coaching photo beside a compact feature list
- **Photo class cards** and a **weekly timetable**, filterable by day and class type. A table on tablet/desktop, a stacked list on phones. Defaults to today.
- **Photo fallbacks**: every image sits in a branded striped frame, so a slow or failed photo never leaves a blank box
- **Trainer profiles** with photo, specialty, certifications and years of experience
- **Membership plans** with a Monthly / Quarterly / Yearly switch (10% and 20% discounts) and a "Most popular" badge
- **BMI calculator** with validation, WHO categories, a visual gauge, an aria-live result and a clear medical disclaimer
- **Member stories** with an honest "results vary" note
- **Free-trial form** on Netlify Forms: validation, honeypot spam trap, loading, success and error states
- **Contact section** with hours, click-to-call and a Google Maps embed that only loads when scrolled near
- **SEO**: title, description, canonical, Open Graph, Twitter card, favicon, JSON-LD `HealthClub` schema, robots.txt, sitemap.xml
- **Accessibility**: skip link, semantic landmarks, visible focus states, keyboard-operable menu, filters and forms, WCAG AA contrast
- **Motion** that respects `prefers-reduced-motion`

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | React 19 (plain JavaScript, no TypeScript) |
| Build tool | Vite 7 |
| Styling | Tailwind CSS v4 (configured in CSS with `@theme`) |
| Fonts | Anton + Inter, self-hosted via Fontsource |
| Icons | Inline SVG component (no icon library) |
| Forms | Netlify Forms (submitted with `fetch`) |
| Hosting | Netlify |

Runtime dependencies: `react`, `react-dom` and two font packages. Nothing else.

## Project structure

```
forge-studio/
├── index.html               # SEO meta, JSON-LD, hero preload, hidden Netlify form
├── netlify.toml             # Build settings and headers
├── vite.config.js
├── package.json
├── public/
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── og-image.jpg         # 1200×630 social preview
│   ├── robots.txt
│   └── sitemap.xml
├── docs/
│   └── marketing.md         # LinkedIn post, Fiverr gig, launch checklist
└── src/
    ├── main.jsx             # Entry point
    ├── App.jsx              # Page layout and section order
    ├── index.css            # Tailwind theme, components, motion
    ├── components/          # One file per section + shared UI
    ├── data/                # All editable content
    ├── hooks/               # useInView, useScrolled
    └── utils/               # Pure logic: timetable, BMI, pricing, form, images
```

## Getting started

Requires **Node.js 20.19+ or 22.12+**.

```powershell
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build locally
```

> **About the form locally:** in `npm run dev` the trial form simulates a successful submission (see the console). In `npm run preview` there is no Netlify backend, so you will see the error message. That is expected. Test real submissions on Netlify.

## Deploying to Netlify (via GitHub)

1. Push the project to a new GitHub repository.
2. In Netlify, choose **Add new site → Import an existing project → GitHub**, then pick the repository.
3. Netlify reads `netlify.toml`, so the build command (`npm run build`) and publish folder (`dist`) are already set. Click **Deploy**.
4. In **Site configuration → Forms**, make sure form detection is enabled. If you enable it after the first deploy, trigger a new deploy.
5. Open the live site, submit the free-trial form, then check **Forms → free-trial** in the dashboard for the entry.
6. Optional: under **Forms → Form notifications**, add an email notification for new submissions.

After you know your final URL, replace `https://forge-studio-demo.netlify.app` in `index.html`, `public/robots.txt`, `public/sitemap.xml` and `src/data/site.js`.

## Customization guide

Almost everything a client would change lives in `src/data/`:

| File | What it controls |
| --- | --- |
| `site.js` | Studio name, tagline, phone, email, address, map location, hours, nav and social links |
| `features.js` | "Why us" cards |
| `classes.js` | Class names, levels, durations, calorie ranges, descriptions |
| `schedule.js` | The weekly timetable (one line per session) |
| `trainers.js` | Coach names, specialties, certifications, photos |
| `plans.js` | Plan prices, features and billing discounts |
| `testimonials.js` | Member stories |

**Colours and fonts:** edit the `@theme` block at the top of `src/index.css`. Changing `--color-volt` recolours the whole site. Keep text on the accent dark for contrast.

**Images:** photos load from the Pexels CDN (WebP where supported). To change one, swap its Pexels id in `src/data/site.js` (`sectionPhotos`), `classes.js` or `trainers.js`. To use your own files, put them in `public/images/` and give `src/components/Photo.jsx` a `src` instead of an id. Keep `width`/`height` so the layout does not shift. If you change the hero photo, update the preload in `index.html` too.

**Form fields:** if you add or rename a field in `TrialForm.jsx`, make the same change in the hidden form in `index.html`, or Netlify will drop that field.

**SEO details:** title, description, social tags and the JSON-LD block are in `index.html`.

## Performance notes

- Hero image is preloaded with `fetchpriority="high"` and a responsive `srcset`.
- All other images lazy-load with explicit dimensions.
- Fonts are self-hosted with `font-display: swap`; only the Latin subset downloads.
- Google Maps is mounted only when its section approaches the viewport.
- Build assets get long-term cache headers via `netlify.toml`.

## Image credits

All photos are free to use under the [Pexels License](https://www.pexels.com/license/).

- Preview every photo, plus alternates you can swap in: open `docs/image-gallery.html` in a browser.
- Download them into `public/images/`: run `.\scripts\download-images.ps1` in PowerShell (add `-All` for the alternates). The list lives in `scripts/images.json`.

| Used for | Photographer | Source |
| --- | --- | --- |
| Hero background | Kuldeep Singhania | [Pexels](https://www.pexels.com/photo/man-holding-black-dumbbells-2105493/) |
| "Why us" coaching photo | Saulo Leite | [Pexels](https://www.pexels.com/photo/back-view-of-a-man-7444444/) |
| Strength class | Bhavesh Mahida | [Pexels](https://www.pexels.com/photo/man-in-blue-workout-tank-top-carrying-black-dumbbells-5755261/) |
| HIIT class | Julia Larson | [Pexels](https://www.pexels.com/photo/ethnic-woman-exercising-with-battling-ropes-near-male-trainer-6455771/) |
| Yoga class | Elly Fairytale | [Pexels](https://www.pexels.com/photo/women-doing-yoga-3822668/) |
| Zumba class | Kampus Production | [Pexels](https://www.pexels.com/photo/8957646/) |
| Free-trial background | Pavel Danilyuk | [Pexels](https://www.pexels.com/photo/group-of-people-exercising-together-6339358/) |
| Arjun Mehta (trainer) | Foad Shariyati | [Pexels](https://www.pexels.com/photo/confident-man-standing-in-gym-with-crossed-arms-31918891/) |
| Priya Nair (trainer) | Karola G | [Pexels](https://www.pexels.com/photo/slim-sportswoman-with-folded-yoga-mat-at-home-4498516/) |
| Rohan Kulkarni (trainer) | assomyron | [Pexels](https://www.pexels.com/photo/fitness-coach-in-gym-setting-showing-confidence-32695885/) |
| Sneha Joshi (trainer) | Mikhail Nilov | [Pexels](https://www.pexels.com/photo/woman-wearing-gray-hoodie-and-black-leggings-6739931/) |

The people in these photos are models, not the fictional trainers named on the site.

## License

Code: MIT. Photos: Pexels License (see above). "Zumba" is a trademark of Zumba Fitness, LLC.
