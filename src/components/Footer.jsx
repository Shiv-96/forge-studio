/**
 * src/components/Footer.jsx
 * Site footer: brand, quick links, social icons, copyright and the sample-project note.
 */
import { navLinks, site, socialLinks } from '../data/site';
import Icon from './Icon';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-800 bg-ink-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-ink-400">{site.tagline}</p>
            <a href="#trial" className="btn btn-primary mt-6">
              Book a free trial
            </a>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">Quick links</h2>
            <ul className="mt-4 space-y-1">
              {[...navLinks, { label: 'Free trial', href: '#trial' }].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="inline-flex min-h-10 items-center text-ink-100 hover:text-volt">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">Follow</h2>
            <ul className="mt-4 flex gap-3">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-11 items-center justify-center border border-ink-700 text-ink-100 transition-colors hover:border-volt hover:text-volt"
                  >
                    <Icon name={s.icon} className="size-5" />
                    <span className="sr-only">{s.label} (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-400">
              {site.address.line2}
              <br />
              <a href={site.phoneHref} className="hover:text-volt">
                {site.phoneDisplay}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-800 pt-6 text-sm text-ink-400 md:flex-row md:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>
            <span className="tag tag-volt mr-2 font-semibold uppercase tracking-wider">Sample project</span>
            Fictional studio built as a portfolio demo. Photos from Pexels.
          </p>
        </div>
      </div>
    </footer>
  );
}
