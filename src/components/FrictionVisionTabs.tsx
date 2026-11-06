import React, { useState } from 'react';
import { AlertCircle, Check, Eye, Trophy, Zap } from 'lucide-react';

interface JourneyData {
  h2: string;
  subtitle: string;
  friction: string[];
  vision: string[];
  catalyst: string[];
  outcome: string[];
}

interface FrictionVisionTabsProps {
  journey: JourneyData;
  className?: string;
}

const TABS = [
  { id: 'friction', label: 'The Friction', hint: 'Where it hurts today', Icon: AlertCircle, color: '#FB7185', soft: 'rgba(251,113,133,0.10)', border: 'rgba(251,113,133,0.4)' },
  { id: 'vision', label: 'The Vision', hint: 'What good looks like', Icon: Eye, color: '#4C8DFF', soft: 'rgba(76,141,255,0.12)', border: 'rgba(76,141,255,0.4)' },
  { id: 'catalyst', label: 'The Catalyst', hint: 'How we get there', Icon: Zap, color: '#F5B544', soft: 'rgba(245,181,68,0.10)', border: 'rgba(245,181,68,0.4)' },
  { id: 'outcome', label: 'The Outcome', hint: 'What changes', Icon: Trophy, color: '#34D399', soft: 'rgba(52,211,153,0.10)', border: 'rgba(52,211,153,0.4)' },
] as const;

/** "Transformation Journey": Friction → Vision → Catalyst → Outcome. */
export const FrictionVisionTabs: React.FC<FrictionVisionTabsProps> = ({ journey, className = '' }) => {
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  const list = journey[tab.id];

  return (
    <div className={`space-y-10 ${className}`}>
      <div className="max-w-3xl mx-auto text-center">
        <span className="eyebrow eyebrow--teal">Transformation Journey</span>
        <h2 className="text-h2 text-white mt-3">{journey.h2}</h2>
        <p className="text-lead text-slate-300 mt-4">{journey.subtitle}</p>
      </div>

      {/* Stage selector with progress connector */}
      <div className="relative">
        <div aria-hidden="true" className="hidden sm:block absolute left-[12.5%] right-[12.5%] top-7 h-[2px] rounded-full bg-white/10" />
        <div
          aria-hidden="true"
          className="hidden sm:block absolute left-[12.5%] top-7 h-[2px] rounded-full bg-gradient-to-r from-[#FB7185] via-[#4C8DFF] via-40% to-[#34D399] transition-[width] duration-700"
          style={{ width: `${(active / (TABS.length - 1)) * 75}%` }}
        />
        <div role="tablist" aria-label="Transformation journey" className="relative grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TABS.map((t, i) => {
            const on = i === active;
            const done = i <= active;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className="group flex flex-col items-center text-center gap-2 rounded-2xl p-3 transition-colors"
              >
                <span
                  className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500"
                  style={
                    on
                      ? { color: '#fff', borderColor: 'transparent', background: `linear-gradient(135deg, ${t.color}, ${t.color}aa)`, boxShadow: `0 12px 30px -10px ${t.color}` }
                      : { color: done ? t.color : '#94A3B8', borderColor: done ? t.border : 'rgba(255,255,255,0.1)', background: '#0B1528' }
                  }
                >
                  <t.Icon className="w-6 h-6" />
                </span>
                <span className="text-sm sm:text-base font-semibold" style={{ color: on ? t.color : '#E2E8F0' }}>{t.label}</span>
                <span className="hidden sm:block text-sm text-slate-500">{t.hint}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage content */}
      <div
        role="tabpanel"
        className="relative overflow-hidden rounded-2xl border p-6 sm:p-9 transition-colors duration-500"
        style={{ borderColor: tab.border, background: `linear-gradient(165deg, ${tab.soft}, rgba(14,24,48,0.7) 55%)` }}
      >
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${tab.color}, transparent)` }} />
        <span aria-hidden="true" className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-25" style={{ background: tab.color }} />
        <p className="relative flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: tab.color }}>
          <tab.Icon className="w-4 h-4" /> {tab.label}
        </p>
        <ul key={tab.id} className="relative mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {list.map((bullet, i) => (
            <li key={bullet} className="sx-fade flex items-start gap-3" style={{ animationDelay: `${i * 70}ms` }}>
              <span className="mt-0.5 w-7 h-7 shrink-0 rounded-lg flex items-center justify-center" style={{ color: tab.color, background: tab.soft, border: `1px solid ${tab.border}` }}>
                {tab.id === 'friction' ? <AlertCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
              </span>
              <p className="text-[15px] sm:text-base text-slate-200 leading-relaxed">{bullet}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
