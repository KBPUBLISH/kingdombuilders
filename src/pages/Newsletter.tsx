import { ArrowRight, Mail } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { NewsletterCTA } from "../components/NewsletterCTA";
import { newsletters } from "../data/content";

export function Newsletter() {
  return (
    <>
      <PageHero
        eyebrow="Newsletter Archive"
        title={<>Past issues, stories, and devotionals.</>}
        description="Access every newsletter we've sent. Read what God is doing through our authors, partners, and readers — and join the family for new issues."
      >
        <NewsletterCTA variant="inline" />
      </PageHero>

      <section className="section pt-0">
        <div className="container-page">
          <ul className="grid gap-6 lg:grid-cols-2">
            {newsletters.map((n, i) => (
              <li key={n.id}>
                <a
                  href="#"
                  className="group block h-full rounded-3xl border border-ink-900/10 bg-white/80 p-7 shadow-soft transition hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-ink-700">
                    <span className="inline-flex items-center gap-2 text-gold-700">
                      <Mail className="h-3.5 w-3.5" /> Issue #{n.issue}
                    </span>
                    <span>{n.date}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug text-ink-950 sm:text-3xl">
                    {n.title}
                  </h3>
                  <p className="mt-3 text-ink-700">{n.excerpt}</p>
                  <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 group-hover:text-gold-700">
                    Read this issue
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </p>
                  {i === 0 && (
                    <span className="ml-3 inline-block rounded-full bg-gold-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold-700">
                      Latest
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
