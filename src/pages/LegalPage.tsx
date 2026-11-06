import React from 'react';
import { Link } from 'react-router-dom';
import type { LegalDoc } from '../data/legal.ts';
import { DraftNotice } from '../components/DraftNotice.tsx';

const LEGAL_LINKS = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms of Service', path: '/terms-of-service' },
  { label: 'Cookie Policy', path: '/cookie-policy' },
];

/** Readable legal document with a sticky contents list on large screens. */
export const LegalPage: React.FC<{ doc: LegalDoc; path: string }> = ({ doc, path }) => (
  <div className="pb-24">
    <section className="hero-bleed relative isolate overflow-hidden pb-12 border-b border-white/[0.06]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_70%_at_80%_0%,rgba(47,107,255,0.18),transparent_70%)]" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Legal" className="flex flex-wrap gap-2">
          {LEGAL_LINKS.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              aria-current={l.path === path ? 'page' : undefined}
              className={`px-3.5 py-2 rounded-full text-sm font-medium border transition-colors ${
                l.path === path ? 'bg-white/10 border-white/20 text-white' : 'border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <h1 className="text-display text-white mt-8">{doc.title}</h1>
        <p className="text-lead text-slate-300 mt-4 max-w-2xl">{doc.summary}</p>
        <p className="mt-4 text-sm text-slate-500">Last updated {doc.updated}</p>
      </div>
    </section>

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
      <aside className="hidden lg:block lg:col-span-3">
        <nav aria-label="On this page" className="sticky top-[calc(var(--header-h)+2rem)]">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-500">On this page</p>
          <ul className="mt-4 space-y-1 border-l border-white/10">
            {doc.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="block -ml-px pl-4 py-1.5 border-l border-transparent text-sm text-slate-400 hover:text-white hover:border-cyan-400 transition-colors">
                  {s.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <article className="lg:col-span-9 max-w-3xl space-y-10">
        <DraftNotice>
          This is template text. Have it reviewed by a qualified lawyer and fill in the details in [square brackets] (edit <code>src/data/legal.ts</code>) before launch.
        </DraftNotice>
        {doc.sections.map((s) => (
          <section key={s.id} id={s.id}>
            <h2 className="text-2xl font-semibold text-white">{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p} className="mt-3 text-base text-slate-300 leading-relaxed">{p}</p>
            ))}
            {s.points && (
              <ul className="mt-4 space-y-2.5">
                {s.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-base text-slate-300 leading-relaxed">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" aria-hidden="true" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    </div>
  </div>
);
