import React, { useEffect, useState } from 'react';
import { VideoBackdrop } from '../fx/VideoBackdrop.tsx';
import { HERO_MEDIA } from '../../config/media.ts';

interface Trend {
  title: string;
  lead: string;
  line: string;
  themes: string[];
}

interface MegaTrendsProps {
  taglines: string[];
}

const HOLD_MS = 5200;

/**
 * Full-bleed cinematic band from the live site: the brand film at low
 * brightness behind giant gradient titles that roll between Social and
 * Technological MegaTrends, with the next title ghosted below and each
 * trend's line typed out.
 */
export const MegaTrends: React.FC<MegaTrendsProps> = ({ taglines }) => {
  const trends: Trend[] = [
    {
      title: 'Social MegaTrends',
      lead: taglines[0] ?? 'Has Profound Impact in the...',
      line: taglines[2] ?? 'Redefining the Future of Work & Human Capability',
      themes: ['Hybrid & distributed work', 'Multigenerational workforce', 'Wellbeing & purpose', 'Skills over credentials'],
    },
    {
      title: 'Technological MegaTrends',
      lead: taglines[1] ?? 'Living in the World...',
      line: taglines[3] ?? 'Navigating Algorithmic Disruption & Digital Fluidity',
      themes: ['Generative AI', 'Autonomous agents', 'Automation at scale', 'Real-time workforce data'],
    },
  ];

  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(0);
  const [reduced, setReduced] = useState(false);
  const current = trends[index];
  const next = trends[(index + 1) % trends.length];

  useEffect(() => {
    const r = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduced(r);
    if (r) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % trends.length), HOLD_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Typewriter for the lead-in line
  useEffect(() => {
    if (reduced) {
      setTyped(current.lead.length);
      return;
    }
    setTyped(0);
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setTyped(n);
      if (n >= current.lead.length) window.clearInterval(id);
    }, 38);
    return () => window.clearInterval(id);
  }, [index, reduced, current.lead.length]);

  return (
    <section className="relative isolate overflow-hidden min-h-[78svh] flex items-center py-24" aria-labelledby="megatrends-title">
      <VideoBackdrop media={HERO_MEDIA.megatrends} variant="subtle" opacity={0.42} focus="center" scanline />

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm sm:text-base font-medium text-cyan-200/80 tracking-wide min-h-[1.5em]" aria-hidden="true">
          {current.lead.slice(0, typed)}
          <span className="inline-block w-[2px] h-[1.05em] align-[-0.15em] ml-0.5 bg-cyan-300 animate-pulse" />
        </p>

        {/* Title roll: current title, with the next one ghosted below */}
        <div className="relative mt-4 select-none" style={{ fontFamily: 'var(--font-display)' }}>
          <h2
            id="megatrends-title"
            key={current.title}
            className="mt-roll-in gradient-text-live font-extrabold leading-[1.02] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2.6rem, 1rem + 7vw, 7rem)' }}
          >
            {current.title}
          </h2>
          <p
            key={`ghost-${next.title}`}
            aria-hidden="true"
            className="mt-ghost-in -mt-[0.22em] font-extrabold leading-[1.02] tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-b from-[#2F6BFF]/55 to-transparent"
            style={{
              fontSize: 'clamp(2.6rem, 1rem + 7vw, 7rem)',
              maskImage: 'linear-gradient(to bottom, #000 0%, #000 40%, transparent 72%)',
              WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 40%, transparent 72%)',
            }}
          >
            {next.title}
          </p>
        </div>

        <p key={`line-${index}`} className="mt-roll-in -mt-[0.4em] text-lead text-slate-200 max-w-2xl mx-auto" style={{ animationDelay: '250ms' }}>
          {current.line}
        </p>

        <ul key={`themes-${index}`} className="mt-8 flex flex-wrap justify-center gap-2.5" aria-label={`${current.title} themes`}>
          {current.themes.map((t, i) => (
            <li
              key={t}
              className="mt-roll-in px-4 py-2 rounded-full bg-[#070F1E]/60 backdrop-blur-md border border-white/12 text-sm font-medium text-slate-200"
              style={{ animationDelay: `${350 + i * 90}ms` }}
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center gap-2" role="tablist" aria-label="MegaTrends">
          {trends.map((t, i) => (
            <button
              key={t.title}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={t.title}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-10 bg-cyan-300' : 'w-4 bg-white/25 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
