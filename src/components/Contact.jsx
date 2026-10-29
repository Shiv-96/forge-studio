/**
 * src/components/Contact.jsx
 * Address, phone, email, opening hours and a Google Maps embed.
 * The map iframe is only created once the section nears the viewport, so the
 * heavy Google Maps scripts never load for visitors who do not scroll this far
 * (and do not count against the initial page load). It also uses loading="lazy".
 */
import { site } from '../data/site';
import { useInView } from '../hooks/useInView';
import Icon from './Icon';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapQuery)}`;

function ContactRow({ icon, label, children }) {
  return (
    <div className="flex gap-4">
      <span className="inline-flex size-11 shrink-0 items-center justify-center bg-volt/10 text-volt">
        <Icon name={icon} className="size-5" />
      </span>
      <div>
        <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">{label}</dt>
        <dd className="mt-1 text-ink-100">{children}</dd>
      </div>
    </div>
  );
}

export default function Contact() {
  const [mapRef, mapVisible] = useInView({ rootMargin: '300px 0px' });

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t border-ink-800 bg-ink-900/40 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="contact-title"
          eyebrow="Visit us"
          title={
            <>
              Drop in. <span className="text-volt">Say hello.</span>
            </>
          }
          intro="Two minutes from Baner Road. Street parking and a bike stand out front."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <address className="not-italic">
              <dl className="space-y-6">
                <ContactRow icon="mapPin" label="Address">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  <span className="text-ink-400">{site.address.region}</span>
                </ContactRow>
                <ContactRow icon="phone" label="Phone">
                  <a
                    href={site.phoneHref}
                    className="underline decoration-ink-500 underline-offset-4 hover:text-volt hover:decoration-volt"
                  >
                    {site.phoneDisplay}
                  </a>
                </ContactRow>
                <ContactRow icon="mail" label="Email">
                  <a
                    href={`mailto:${site.email}`}
                    className="break-all underline decoration-ink-500 underline-offset-4 hover:text-volt hover:decoration-volt"
                  >
                    {site.email}
                  </a>
                </ContactRow>
                <ContactRow icon="clock" label="Opening hours">
                  <ul className="space-y-1">
                    {site.hours.map((h) => (
                      <li key={h.days} className="flex flex-wrap gap-x-3">
                        <span className="w-24 text-ink-400">{h.days}</span>
                        <span>{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </ContactRow>
              </dl>
            </address>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={site.phoneHref} className="btn btn-primary">
                <Icon name="phone" className="size-5" /> Call the studio
              </a>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Get directions <Icon name="external" className="size-4" />
                <span className="sr-only">(opens Google Maps in a new tab)</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              ref={mapRef}
              className="card relative aspect-[4/3] w-full overflow-hidden p-0 lg:aspect-auto lg:h-full lg:min-h-[26rem]"
            >
              {mapVisible ? (
                <iframe
                  title={`Map showing ${site.name} at ${site.address.line1}, ${site.address.line2}`}
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full border-0 grayscale invert-[0.92] hue-rotate-180"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-ink-400">Loading map…</div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
