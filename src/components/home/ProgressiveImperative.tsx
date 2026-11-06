import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Lightbulb, Phone, Target } from 'lucide-react';
import { StatStrip } from '../StatStrip.tsx';

interface Card {
  number: string;
  title: string;
  desc: string;
  details: string;
}

interface ProgressiveImperativeProps {
  title: string;
  sub: string;
  cards: Card[];
  stats: { value: string; label: string }[];
  adopt: { headline: string; subhead: string; primaryCta: string; secondaryCta: string };
  onSchedule: () => void;
}

const LOOKS = [
  { Icon: Lightbulb, tint: 'text-[#4C8DFF]', ring: 'from-[#2F6BFF]/25', ghost: 'text-[#2F6BFF]/[0.12]' },
  { Icon: Target, tint: 'text-cyan-300', ring: 'from-cyan-400/25', ghost: 'text-cyan-300/[0.10]' },
  { Icon: BrainCircuit, tint: 'text-amber-300', ring: 'from-amber-400/25', ghost: 'text-amber-300/[0.10]' },
];

export const ProgressiveImperative: React.FC<ProgressiveImperativeProps> = ({ title, sub, cards, stats, adopt, onSchedule }) => {
  // "Progressive HR Partner with BlueNxt to" → highlight the brand name
  const [before, after] = title.split('BlueNxt');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
      <div className="max-w-3xl mx-auto text-center">
        <span className="eyebrow">The Progressive HR Imperative</span>
        <h2 className="text-h2 text-white mt-3">
          {after !== undefined ? (
            <>
              {before}
              <span className="gradient-text">BlueNxt</span>
              {after}&hellip;
            </>
          ) : (
            <>{title}&hellip;</>
          )}
        </h2>
        <p className="text-lead text-slate-300 mt-4">{sub}</p>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card, i) => {
          const look = LOOKS[i % LOOKS.length];
          return (
            <li key={card.number} className="group relative card-glass card-glass-hover rounded-2xl p-6 sm:p-8 overflow-hidden flex flex-col">
              <span
                aria-hidden="true"
                className={`absolute -top-3 right-4 text-[6.5rem] font-extrabold leading-none tabular-nums ${look.ghost} transition-transform duration-700 group-hover:-translate-y-1`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {card.number}
              </span>
              <span className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${look.ring} to-transparent border border-white/10 flex items-center justify-center`}>
                <look.Icon className={`w-7 h-7 ${look.tint}`} />
              </span>
              <h3 className="relative mt-6 text-xl sm:text-2xl font-semibold text-white leading-tight">{card.title}</h3>
              <p className={`relative mt-1.5 text-[15px] font-medium ${look.tint}`}>{card.desc}</p>
              <p className="relative mt-4 pt-4 border-t border-white/[0.07] text-[15px] text-slate-400 leading-relaxed">{card.details}</p>
            </li>
          );
        })}
      </ol>

      <StatStrip stats={stats} />

      {/* ADOPT */}
      <div className="relative text-center pt-6">
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[140%] bg-[radial-gradient(ellipse,rgba(47,107,255,0.18),transparent_65%)] -z-10" />
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Adopt</p>
        <p className="mt-3 text-sm sm:text-base font-semibold text-cyan-300">{adopt.headline}</p>
        <h2 className="mt-3 text-white font-bold" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem, 1.1rem + 3.4vw, 3.6rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
          {adopt.subhead.split('10×').map((part, i, arr) =>
            i < arr.length - 1 ? (
              <React.Fragment key={i}>
                {part}
                <span className="gradient-text-live">10×</span>
              </React.Fragment>
            ) : (
              <React.Fragment key={i}>{part}</React.Fragment>
            )
          )}
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/platform" className="gradient-btn h-12 px-6 rounded-full text-sm font-semibold text-white inline-flex items-center gap-2">
            {adopt.primaryCta} <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={onSchedule}
            className="h-12 px-6 rounded-full border border-white/15 text-sm font-semibold text-white hover:bg-white/5 transition-colors inline-flex items-center gap-2"
          >
            <Phone className="w-4 h-4" /> {adopt.secondaryCta}
          </button>
        </div>
      </div>
    </section>
  );
};
