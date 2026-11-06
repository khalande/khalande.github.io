import React, { useEffect, useState } from 'react';
import {
  Activity,
  BarChart3,
  Brain,
  CheckCircle2,
  Compass,
  FileText,
  FlaskConical,
  Gauge,
  HeartPulse,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
  Zap,
} from 'lucide-react';

interface Buddy {
  name: string;
  description: string;
  iconName: string;
}

interface DigitalBuddyProps {
  data: {
    title: string;
    divider: string;
    sub: string;
    panelTitle: string;
    panelSub: string;
    bulletPoints: string[];
    buddies: Buddy[];
    stats: { value: string; label: string }[];
    footerLine: string;
  };
  onTryBuddy: (name: string) => void;
}

const ICONS: Record<string, React.ElementType> = { FileText, UserCheck, Target, BarChart3, HeartPulse, ShieldCheck, CheckCircle2, Compass, Sparkles };
const POINT_ICONS = [Brain, Gauge, FlaskConical, ShieldCheck, Zap, Network];
const DOTS = ['#4C8DFF', '#22D3EE', '#F5B544', '#A78BFA', '#34D399', '#F472B6', '#4C8DFF', '#22D3EE'];

/** "Experience Digital Buddy" in the live site's layout: paradigm list + buddy grid. */
export const DigitalBuddy: React.FC<DigitalBuddyProps> = ({ data, onTryBuddy }) => {
  const [point, setPoint] = useState(1);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (hovering || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => setPoint((p) => (p + 1) % data.bulletPoints.length), 2600);
    return () => window.clearTimeout(id);
  }, [point, hovering, data.bulletPoints.length]);

  const [line1, line2] = data.title.split(' Gets a ');
  const dividerParts = data.divider.split('·').map((x) => x.trim());
  const buddies = data.buddies.filter((b) => !b.name.startsWith('+'));
  const more = data.buddies.find((b) => b.name.startsWith('+'));
  const [panelLead, panelRest] = data.panelTitle.split(':');
  const [alwaysOn, alwaysRest] = data.footerLine.split('—');

  return (
    <section id="digital-buddy" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-3xl mx-auto text-center">
        <span className="eyebrow">Experience Digital Buddy</span>
        <h2 className="text-h2 text-white mt-3">
          {line1}
          {line2 && (
            <>
              <br />
              Gets a <span className="gradient-text">{line2}</span>
            </>
          )}
        </h2>
        <p className="mt-5 flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">
          {dividerParts.map((d, i) => (
            <React.Fragment key={d}>
              {i > 0 && <span aria-hidden="true" className="text-slate-600">·</span>}
              <span>{d}</span>
            </React.Fragment>
          ))}
        </p>
        <p className="text-lead text-slate-300 mt-4">{data.sub}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* New paradigm */}
        <div className="lg:col-span-5" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
          <div className="pl-5 border-l-2 border-transparent [border-image:linear-gradient(to_bottom,#2F6BFF,#22D3EE,#F5B544)_1]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">{panelLead}</p>
            <h3 className="mt-2 text-3xl sm:text-4xl font-bold text-white leading-tight">
              {(panelRest ?? '').trim().replace('New Way of Working', '')}
              <br />
              <span className="gradient-text">New Way of Working</span>
            </h3>
          </div>
          <p className="mt-6 text-[15px] text-slate-400">{data.panelSub}</p>
          <ul className="mt-4 space-y-2">
            {data.bulletPoints.map((b, i) => {
              const Icon = POINT_ICONS[i % POINT_ICONS.length];
              const on = i === point;
              return (
                <li key={b}>
                  <button
                    type="button"
                    onMouseEnter={() => setPoint(i)}
                    onFocus={() => setPoint(i)}
                    onClick={() => setPoint(i)}
                    className={`w-full flex items-center gap-3.5 rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                      on ? 'bg-[#0E1830] border-cyan-400/40 shadow-[0_8px_30px_-14px_rgba(34,211,238,0.6)]' : 'border-transparent hover:bg-white/[0.03]'
                    }`}
                  >
                    <span className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${on ? 'bg-cyan-400/15 text-cyan-300' : 'bg-white/[0.04] text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className={`flex-1 text-[15px] transition-colors ${on ? 'text-white font-semibold' : 'text-slate-300'}`}>{b}</span>
                    {on && <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Buddies */}
        <div className="lg:col-span-7 space-y-4">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {buddies.map((b, i) => {
              const Icon = ICONS[b.iconName] ?? Sparkles;
              return (
                <li key={b.name}>
                  <button
                    type="button"
                    onClick={() => onTryBuddy(b.name)}
                    className="group relative w-full h-full text-left card-glass card-glass-hover rounded-xl p-4 flex gap-3.5"
                  >
                    <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full animate-pulse" style={{ background: DOTS[i % DOTS.length], boxShadow: `0 0 10px ${DOTS[i % DOTS.length]}`, animationDelay: `${i * 0.3}s` }} />
                    <span className="shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#2F6BFF]/25 to-[#22D3EE]/10 border border-white/10 flex items-center justify-center text-cyan-300 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="pr-4">
                      <span className="block text-[15px] font-semibold text-white leading-snug">{b.name}</span>
                      <span className="block mt-1 text-sm text-slate-400 leading-relaxed">{b.description}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {more && (
            <button
              type="button"
              onClick={() => onTryBuddy(more.name)}
              className="w-full flex items-center justify-center gap-3 rounded-xl border border-dashed border-white/15 py-3.5 text-sm text-slate-300 hover:text-white hover:border-cyan-400/40 transition-colors"
              title={more.description}
            >
              <span className="flex -space-x-2" aria-hidden="true">
                {[Sparkles, Brain, Activity].map((I, k) => (
                  <span key={k} className="w-7 h-7 rounded-full bg-[#0E1830] border border-white/15 flex items-center justify-center text-cyan-300">
                    <I className="w-3.5 h-3.5" />
                  </span>
                ))}
              </span>
              <span className="font-semibold">{more.name}</span>
            </button>
          )}

          <div className="grid grid-cols-3 rounded-xl border border-white/10 bg-white/[0.02] divide-x divide-white/10">
            {data.stats.map((s) => (
              <div key={s.label} className="py-5 text-center">
                <p className="text-2xl sm:text-3xl font-bold gradient-text tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>{s.value}</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.1em] text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>

          <p className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-slate-400">
            <Activity className="w-4 h-4 shrink-0 text-cyan-300" />
            <span>
              <span className="font-semibold text-white">{alwaysOn.trim()}</span>
              {alwaysRest && <> — {alwaysRest.trim()}</>}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
