import { Link } from "react-router-dom";
import { LockKeyhole, Mail, MapPin, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { PORTAL_URL } from "../services/api";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.24 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.91h-2.33V22C18.34 21.24 22 17.08 22 12.06Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23.5 7.2c-.3-1.2-1.2-2.1-2.4-2.4C18.9 4.2 12 4.2 12 4.2s-6.9 0-9.1.6C1.7 5.1.8 6 .5 7.2 0 9.4 0 12 0 12s0 2.6.5 4.8c.3 1.2 1.2 2.1 2.4 2.4 2.2.6 9.1.6 9.1.6s6.9 0 9.1-.6c1.2-.3 2.1-1.2 2.4-2.4.5-2.2.5-4.8.5-4.8s0-2.6-.5-4.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink-950 text-parchment">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.25] bg-noise"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gold-500/15 blur-[120px]"
      />

      <div className="container-page relative">
        <div className="grid gap-12 py-20 lg:grid-cols-[1.2fr,1fr,1fr,1.3fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-parchment/70">
              We spread God's Word through impactful publications and transformative content —
              empowering nonprofits and ministries to make a lasting Kingdom impact.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-parchment/15 text-parchment/80 transition hover:border-gold-400 hover:text-gold-300"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-parchment/15 text-parchment/80 transition hover:border-gold-400 hover:text-gold-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-parchment/15 text-parchment/80 transition hover:border-gold-400 hover:text-gold-300"
                aria-label="YouTube"
              >
                <YoutubeIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">
              Explore
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-parchment/80">
              <li><Link className="link-underline" to="/about">About</Link></li>
              <li><Link className="link-underline" to="/books">Books</Link></li>
              <li><Link className="link-underline" to="/listen">Audio Series</Link></li>
              <li><Link className="link-underline" to="/store">Store</Link></li>
              <li><Link className="link-underline" to="/newsletter">Newsletter Archive</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">
              Get Involved
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-parchment/80">
              <li><Link className="link-underline" to="/contact">Contact Us</Link></li>
              <li><Link className="link-underline" to="/about#impact">Our Impact</Link></li>
              <li>
                <a className="link-underline" href="mailto:hello@kbpublish.org">
                  Submit a Manuscript
                </a>
              </li>
              <li>
                <a
                  className="link-underline inline-flex items-center gap-1.5"
                  href={PORTAL_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LockKeyhole className="h-3.5 w-3.5" /> Admin Portal
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">
              Stay in Touch
            </h4>
            <p className="mt-5 text-sm leading-relaxed text-parchment/70">
              Receive new releases, ministry stories, and devotional notes — straight to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex items-center rounded-full border border-parchment/20 bg-parchment/[0.04] p-1.5"
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="flex-1 bg-transparent px-4 py-2 text-sm text-parchment placeholder:text-parchment/40 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-4 py-2 text-xs font-semibold text-ink-950 transition hover:bg-gold-300"
              >
                Subscribe <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
            <ul className="mt-6 space-y-2 text-sm text-parchment/70">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold-300" />
                <a className="link-underline" href="mailto:hello@kbpublish.org">
                  hello@kbpublish.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold-300" />
                <span>United States</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-parchment/10 py-6 text-xs text-parchment/60 sm:flex-row sm:items-center">
          <p>© {year} Kingdom Builders Publishing. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-400" />
            "Unless the Lord builds the house, the builders labor in vain." — Psalm 127:1
          </p>
        </div>
      </div>
    </footer>
  );
}
