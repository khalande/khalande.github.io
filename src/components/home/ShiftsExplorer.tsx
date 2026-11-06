import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Boxes,
  BrainCircuit,
  ChevronRight,
  Cpu,
  GitBranch,
  Layers,
  Network,
  Radar,
  RefreshCw,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
  Zap,
} from 'lucide-react';

interface Shift {
  id: string;
  from: string;
  fromDetail: string;
  to: string;
  toDetail: string;
  hub?: string[];
}

interface ShiftsExplorerProps {
  shifts: Shift[];
  sub: string;
  closingLine: string;
  cta: string;
}

const TO_ICONS = [Sparkles, GitBranch, Cpu, Zap, BrainCircuit, Radar];
const HUB_ICONS = [Target, RefreshCw, BarChart3, Scale, Workflow, ShieldCheck, Network, Users, Boxes, Layers];
const STEP_MS = 5000;
const SIZE = 400;
const C = SIZE / 2;
const R = 150;

/**
 * "Shifts Redefining the Future of HR" from the live site: FROM → TO rows on
 * the left, and a hub on the right showing the selected shift with its five
 * capabilities. Cycles automatically; hovering or choosing a shift pauses it.
 */
export const ShiftsExplorer: React.FC<ShiftsExplorerProps> = ({ shifts, sub, closingLine, cta }) => {
  const [active, setActive] = useState(Math.min(3, shifts.length - 1));
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const userPicked = useRef(false);

  useEffect(() => setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches), []);

  useEffect(() => {
    if (paused || reduced || userPicked.current) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % shifts.length), STEP_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, reduced, shifts.length]);

  const pick = (i: number) => {
    userPicked.current = true;
    setActive(i);
  };

  const shift = shifts[active];
  const hub = (shift.hub ?? []).slice(0, 5);
  const ToIcon = TO_ICONS[active % TO_ICONS.length];
  const nodes = hub.map((label, i) => {
    const a = (i / hub.length) * Math.PI * 2 - Math.PI / 2;
    return { label, x: C + Math.cos(a) * R, y: C + Math.sin(a) * R, Icon: HUB_ICONS[(active * 2 + i) % HUB_ICONS.length] };
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-3xl mx-auto text-center">
        <span className="eyebrow">Workforce Re-Architecture</span>
        <h2 className="text-h2 text-white mt-3">
          Shifts Redefining the <span className="gradient-text">Future of HR</span>
        </h2>
        <p className="text-lead text-slate-300 mt-4">{sub}</p>
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* FROM → TO rows */}
        <ol className="lg:col-span-7 space-y-2.5">
          <li className="hidden sm:grid grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] gap-3 px-1 pb-1 text-[13px] font-semibold uppercase tracking-[0.1em]">
            <span className="text-rose-300/80">From</span>
            <span />
            <span className="text-cyan-300">To</span>
          </li>
          {shifts.map((s, i) => {
            const on = i === active;
            const Icon = TO_ICONS[i % TO_ICONS.length];
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => pick(i)}
                  aria-pressed={on}
                  className="group w-full grid grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] sm:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] gap-2 sm:gap-3 items-center text-left"
                >
                  <span
                    className={`flex items-center justify-between gap-3 rounded-xl border px-3.5 py-3 sm:px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      on ? 'bg-rose-500/10 border-rose-400/50' : 'bg-white/[0.02] border-white/[0.07] group-hover:border-white/20'
                    }`}
                  >
                    <span className="min-w-0">
                      <span className={`block text-[15px] sm:text-base font-semibold leading-tight ${on ? 'text-rose-200' : 'text-rose-300/70'}`}>{s.from}</span>
                      <span className="block text-sm text-slate-500 truncate">{s.fromDetail}</span>
                    </span>
                    <span className={`hidden sm:flex shrink-0 w-8 h-8 rounded-lg items-center justify-center text-sm font-semibold tabular-nums ${on ? 'bg-rose-500/25 text-rose-100' : 'bg-white/[0.04] text-slate-500'}`}>
                      {s.id}
                    </span>
                  </span>

                  <span className={`justify-self-center w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${on ? 'bg-gradient-to-br from-[#2F6BFF] to-[#22D3EE] text-white shadow-[0_0_20px_-2px_rgba(34,211,238,0.7)]' : 'bg-white/[0.04] text-slate-500'}`}>
                    <ArrowRight className="w-4 h-4" />
                  </span>

                  <span
                    className={`flex items-center justify-between gap-3 rounded-xl border px-3.5 py-3 sm:px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      on ? 'bg-cyan-400/10 border-cyan-300/50 shadow-[0_0_30px_-12px_rgba(34,211,238,0.6)]' : 'bg-white/[0.02] border-white/[0.07] group-hover:border-white/20'
                    }`}
                  >
                    <span className="min-w-0">
                      <span className={`block text-[15px] sm:text-base font-semibold leading-tight ${on ? 'text-white' : 'text-slate-300'}`}>{s.to}</span>
                      <span className="block text-sm text-slate-500 truncate">{s.toDetail}</span>
                    </span>
                    <span className={`hidden sm:flex shrink-0 w-8 h-8 rounded-lg items-center justify-center ${on ? 'bg-cyan-400/20 text-cyan-200' : 'bg-white/[0.04] text-slate-500'}`}>
                      <Icon className="w-4 h-4" />
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Hub */}
        <div className="lg:col-span-5">
          <div className="relative w-full max-w-[440px] mx-auto aspect-square" aria-live="polite">
            <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_65%)]" />
            <svg aria-hidden="true" viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 w-full h-full">
              <g className="ao-spin-rev" style={{ transformOrigin: `${C}px ${C}px` }}>
                <circle cx={C} cy={C} r={R + 32} fill="none" stroke="#22D3EE" strokeOpacity="0.18" strokeDasharray="2 7" />
              </g>
              <circle cx={C} cy={C} r={R} fill="none" stroke="#2F6BFF" strokeOpacity="0.3" strokeWidth="1" />
            </svg>

            {/* Centre */}
            <div className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[46%] aspect-square rounded-full bg-[#0A1630]/95 border border-cyan-400/35 shadow-[0_0_60px_-10px_rgba(34,211,238,0.55)] flex items-center justify-center text-center px-3">
              <div key={`centre-${active}`} className="sx-fade flex flex-col items-center">
              <span className="flex items-center gap-1.5">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-500/20 border border-rose-400/40 text-rose-200 text-sm font-semibold flex items-center justify-center">{shift.id}</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-400/20 border border-cyan-300/50 text-cyan-100 flex items-center justify-center">
                  <ToIcon className="w-4 h-4" aria-hidden="true" />
                </span>
              </span>
              <span className="mt-2 text-[clamp(0.85rem,3.4vw,1.15rem)] font-semibold text-white leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                {shift.to}
              </span>
              <span className="mt-1 text-[clamp(0.6rem,2.3vw,0.72rem)] text-slate-400 leading-snug">{shift.toDetail}</span>
              </div>
            </div>

            {/* Capability nodes: stable slots on a slow orbit; only their text crossfades */}
            <div className="sx-orbit absolute inset-0">
              <svg aria-hidden="true" viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 w-full h-full">
                {nodes.map((n, i) => (
                  <g key={i}>
                    <line x1={C} y1={C} x2={n.x} y2={n.y} stroke="#22D3EE" strokeOpacity="0.2" />
                    <line className="ao-flow" x1={C} y1={C} x2={n.x} y2={n.y} stroke="#67E8F9" strokeWidth="1.4" strokeDasharray="3 12" style={{ animationDelay: `${i * -0.3}s` }} />
                  </g>
                ))}
              </svg>
              {nodes.map((n, i) => (
                <div
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-[25%]"
                  style={{ left: `${(n.x / SIZE) * 100}%`, top: `${(n.y / SIZE) * 100}%` }}
                >
                  <div className="sx-counter flex flex-col items-center gap-1 rounded-xl bg-[#081428]/90 backdrop-blur border border-white/12 px-1.5 py-2 text-center shadow-lg">
                    <span key={`${active}-${i}`} className="sx-fade flex flex-col items-center gap-1" style={{ animationDelay: `${i * 60}ms` }}>
                      <n.Icon className="w-4 h-4 text-cyan-300" aria-hidden="true" />
                      <span className="text-[clamp(0.55rem,2.2vw,0.7rem)] font-semibold text-slate-100 leading-tight">{n.label}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-2 text-center text-sm text-slate-500">
            Shift {shift.id} of {String(shifts.length).padStart(2, '0')} <span aria-hidden="true">·</span> {shift.from} to {shift.to}
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900/30 via-slate-900/40 to-cyan-900/30 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <p className="text-[15px] sm:text-base text-slate-200 font-medium max-w-3xl">{closingLine}</p>
        <Link
          to="/consulting"
          className="gradient-btn self-start md:self-auto h-12 px-6 rounded-full text-sm font-semibold text-white shrink-0 inline-flex items-center gap-1.5"
        >
          {cta}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
