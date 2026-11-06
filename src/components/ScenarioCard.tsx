import React from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, Gauge, Layers, Sparkles, Trophy } from 'lucide-react';
import { CountUp } from './fx/CountUp.tsx';
import { TONES } from './ui/Highlight.tsx';

interface ScenarioProps {
  scenario: {
    problemTitle: string;
    problemDescription: string;
    problemTags: string[];
    solutionTitle: string;
    solutionDescription: string;
    solutionTags: string[];
    results: {
      value: string;
      label: string;
    }[];
  };
  className?: string;
}

const RESULT_TONES = [TONES[0], TONES[1], TONES[2]];
const RESULT_ICONS = [Gauge, Layers, Trophy];

/** "In Practice — Transformation Scenario": challenge → solution → outcome. */
export const ScenarioCard: React.FC<ScenarioProps> = ({ scenario, className = '' }) => {
  return (
    <div className={`space-y-10 ${className}`}>
      <div className="max-w-3xl mx-auto text-center">
        <span className="eyebrow eyebrow--teal">In Practice</span>
        <h2 className="text-h2 text-white mt-3">
          Transformation <span className="text-cyan-blue">Scenario</span>
        </h2>
        <p className="text-lead text-slate-300 mt-4">How this plays out in a real organisation, from the problem to measurable results.</p>
      </div>

      {/* 01 Challenge → 02 Solution */}
      <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_5rem_minmax(0,7fr)] gap-0 items-stretch">
        <article className="relative rounded-2xl p-6 sm:p-8 border border-rose-400/30 bg-[linear-gradient(170deg,rgba(244,63,94,0.10),rgba(14,24,48,0.6)_55%)] flex flex-col">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-400/40 text-rose-300 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-rose-300">01 · The Challenge</p>
          </div>
          <h3 className="mt-5 text-xl sm:text-2xl font-semibold text-white leading-snug">{scenario.problemTitle}</h3>
          <p className="mt-3 text-[15px] text-slate-300 leading-relaxed">{scenario.problemDescription}</p>
          <ul className="mt-auto pt-6 flex flex-wrap gap-2">
            {scenario.problemTags.map((tag) => (
              <li key={tag} className="text-sm px-3 py-1.5 rounded-full bg-rose-500/10 text-rose-200 border border-rose-400/25 font-medium">
                {tag}
              </li>
            ))}
          </ul>
        </article>

        {/* Bridge: rose challenge → cyan solution */}
        <div aria-hidden="true" className="relative flex items-center justify-center h-16 lg:h-auto">
          {/* line: vertical on phones, horizontal on desktop */}
          <span className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] lg:hidden bg-gradient-to-b from-rose-400/80 to-cyan-300/80" />
          <span className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-1 -right-1 h-[2px] bg-gradient-to-r from-rose-400/80 to-cyan-300/80" />
          <span className="scn-dot hidden lg:block absolute top-1/2 -mt-[3px] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_3px_rgba(103,232,249,0.8)]" />
          <span className="scn-dot-v lg:hidden absolute left-1/2 -ml-[3px] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_3px_rgba(103,232,249,0.8)]" />
          {/* node */}
          <span className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full p-[2px] bg-gradient-to-br from-rose-400 to-cyan-300 shadow-[0_0_30px_-4px_rgba(34,211,238,0.6)]">
            <span className="absolute inset-0 rounded-full border-2 border-cyan-300/50 scn-ping" />
            <span className="w-full h-full rounded-full bg-[#0A1426] flex items-center justify-center text-white">
              <ArrowRight className="w-5 h-5 rotate-90 lg:rotate-0" />
            </span>
          </span>
        </div>

        <article className="relative overflow-hidden rounded-2xl p-6 sm:p-8 border border-cyan-400/35 bg-[linear-gradient(170deg,rgba(34,211,238,0.12),rgba(14,24,48,0.65)_55%)] flex flex-col shadow-[0_30px_80px_-40px_rgba(34,211,238,0.6)]">
          <span aria-hidden="true" className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="relative flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2F6BFF] to-[#22D3EE] text-white flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5" />
            </span>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">02 · {scenario.solutionTitle}</p>
          </div>
          <h3 className="relative mt-5 text-xl sm:text-2xl font-semibold text-white leading-snug">Engineered for immediate value</h3>
          <p className="relative mt-3 text-[15px] text-slate-200 leading-relaxed">{scenario.solutionDescription}</p>
          <ul className="relative mt-auto pt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {scenario.solutionTags.map((tag) => (
              <li key={tag} className="flex items-center gap-2 text-sm text-slate-100">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-cyan-300" />
                {tag}
              </li>
            ))}
          </ul>
        </article>
      </div>

      {/* 03 Outcome */}
      <div>
        <p className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-amber-300">03 · The Outcome</p>
        <ul className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {scenario.results.map((res, i) => {
            const tone = RESULT_TONES[i % RESULT_TONES.length];
            const Icon = RESULT_ICONS[i % RESULT_ICONS.length];
            return (
              <li
                key={res.label}
                className="group relative overflow-hidden rounded-2xl p-6 border text-center transition-transform duration-500 hover:-translate-y-1"
                style={{ borderColor: tone.border, background: `linear-gradient(170deg, ${tone.soft}, rgba(14,24,48,0.55) 60%)` }}
              >
                <span className="mx-auto w-10 h-10 rounded-xl flex items-center justify-center border" style={{ color: tone.color, borderColor: tone.border, background: tone.soft }}>
                  <Icon className="w-5 h-5" />
                </span>
                <p className="mt-4 text-4xl sm:text-5xl font-bold tabular-nums" style={{ color: tone.color, fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
                  <CountUp value={res.value} />
                </p>
                <p className="mt-2 text-sm font-medium text-slate-300">{res.label}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
