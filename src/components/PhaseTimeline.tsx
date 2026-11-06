import React from 'react';
import { ArrowRight, Hammer, Map, Rocket, Search, Sparkles } from 'lucide-react';
import { TONES } from './ui/Highlight.tsx';

interface Phase {
  phaseNumber: string;
  name: string;
  description: string;
  tags?: string[];
}

interface PhaseTimelineProps {
  h2?: string;
  subtitle?: string;
  phases: Phase[];
  footerPill?: string;
  className?: string;
}

const PHASE_TONES = [TONES[0], TONES[1], TONES[2], TONES[3], TONES[4]];
const PHASE_ICONS = [Search, Map, Hammer, Rocket, Sparkles];

/** "Our Approach": colour-coded phases on a dot timeline. */
export const PhaseTimeline: React.FC<PhaseTimelineProps> = ({ h2, subtitle, phases, footerPill, className = '' }) => {
  const total = String(phases.length).padStart(2, '0');
  return (
    <div className={`space-y-12 ${className}`}>
      {(h2 || subtitle) && (
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow eyebrow--amber">Our Approach</span>
          {h2 && <h2 className="text-h2 text-white mt-3">{h2}</h2>}
          {subtitle && <p className="text-lead text-slate-300 mt-4">{subtitle}</p>}
        </div>
      )}

      <div className="relative">
        <div aria-hidden="true" className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-[9px] h-[2px] rounded-full bg-gradient-to-r from-[#4C8DFF] via-[#22D3EE] via-40% to-[#A78BFA]" />
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {phases.map((phase, idx) => {
            const tone = PHASE_TONES[idx % PHASE_TONES.length];
            const Icon = PHASE_ICONS[idx % PHASE_ICONS.length];
            return (
              <li key={phase.name} className="group relative flex flex-col">
                <span aria-hidden="true" className="hidden lg:flex mx-auto w-5 h-5 rounded-full items-center justify-center bg-[#070F1E] border-2" style={{ borderColor: tone.color }}>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: tone.color, boxShadow: `0 0 12px ${tone.color}`, animationDelay: `${idx * 0.4}s` }} />
                </span>
                {idx < phases.length - 1 && (
                  <span aria-hidden="true" className="hidden lg:flex absolute top-[3.7rem] -right-[1.05rem] z-10 w-6 h-6 rounded-full bg-[#0B1528] border border-white/15 items-center justify-center text-slate-300">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                )}
                <div
                  className="relative flex-1 lg:mt-5 rounded-2xl p-6 sm:p-7 border overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5"
                  style={{ borderColor: tone.border, background: `linear-gradient(175deg, ${tone.soft}, rgba(14,24,48,0.6) 50%)` }}
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${tone.color}, transparent)` }} />
                  <div className="flex items-center justify-between">
                    <span
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${tone.color}, ${tone.color}aa)`, boxShadow: `0 10px 24px -10px ${tone.color}` }}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-sm font-semibold tabular-nums text-slate-500">
                      {String(idx + 1).padStart(2, '0')} / {total}
                    </span>
                  </div>
                  <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: tone.color }}>{phase.phaseNumber}</p>
                  <h3 className="mt-1 text-xl font-semibold text-white">{phase.name}</h3>
                  <p className="mt-2 text-[15px] text-slate-300 leading-relaxed">{phase.description}</p>
                  {phase.tags && phase.tags.length > 0 && (
                    <ul className="mt-5 pt-4 border-t border-white/[0.08] flex flex-wrap gap-1.5">
                      {phase.tags.map((tag) => (
                        <li key={tag} className="text-sm px-2.5 py-1 rounded-full border text-slate-200" style={{ borderColor: tone.border, background: 'rgba(7,15,30,0.5)' }}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {footerPill && (
        <div className="flex justify-center">
          <p className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#0E1830] border border-cyan-400/30 text-sm font-semibold text-cyan-200 text-center">
            <span className="w-2 h-2 shrink-0 rounded-full bg-cyan-400 animate-pulse" />
            {footerPill}
          </p>
        </div>
      )}
    </div>
  );
};
