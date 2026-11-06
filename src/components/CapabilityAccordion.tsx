import React, { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Boxes,
  BrainCircuit,
  ChevronRight,
  ClipboardCheck,
  Compass,
  GitBranch,
  Layers,
  Network,
  Rocket,
  Settings2,
  Sparkles,
  Users,
} from 'lucide-react';
import { toneAt } from './ui/ToneCard.tsx';

interface CapabilityItem {
  number: string;
  name: string;
  shortDescription: string;
  tags: string[];
  cta: string;
}

interface CapabilityAccordionProps {
  capabilities: CapabilityItem[];
  onOpenContact: (domain?: string, title?: string) => void;
  domainName?: string;
  className?: string;
}

const ICONS = [Network, Layers, Compass, BarChart3, Users, GitBranch, Settings2, BrainCircuit, Boxes, ClipboardCheck, Rocket];

/** "Capabilities — What We Deliver": colour-coded list with a matching detail panel. */
export const CapabilityAccordion: React.FC<CapabilityAccordionProps> = ({
  capabilities,
  onOpenContact,
  domainName = 'Transformation',
  className = '',
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = capabilities[selectedIndex] || capabilities[0];
  const tone = toneAt(selectedIndex);
  const SelIcon = ICONS[selectedIndex % ICONS.length];

  return (
    <div className={`space-y-10 ${className}`}>
      <div className="max-w-3xl mx-auto text-center">
        <span className="eyebrow eyebrow--blue">Capabilities — What We Deliver</span>
        <h2 className="text-h2 text-white mt-3">
          Precision Capabilities <span className="text-gold-blue">Built for Impact</span>
        </h2>
        <p className="text-lead text-slate-300 mt-4">
          Comprehensive capabilities across {domainName}, ready to deploy directly into your enterprise.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Capability list */}
        <ul className="lg:col-span-5 space-y-2" role="tablist" aria-label="Capabilities">
          {capabilities.map((cap, idx) => {
            const on = selectedIndex === idx;
            const t = toneAt(idx);
            const Icon = ICONS[idx % ICONS.length];
            return (
              <li key={cap.number}>
                <button
                  role="tab"
                  aria-selected={on}
                  onClick={() => setSelectedIndex(idx)}
                  className="group w-full text-left flex items-center gap-3.5 rounded-xl border px-3.5 py-3 transition-all duration-500"
                  style={{
                    borderColor: on ? t.border : 'rgba(255,255,255,0.06)',
                    background: on ? `linear-gradient(90deg, ${t.soft}, rgba(14,24,48,0.6))` : 'rgba(255,255,255,0.02)',
                    boxShadow: on ? `0 12px 30px -18px ${t.color}` : undefined,
                  }}
                >
                  <span
                    className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-500"
                    style={on ? { color: '#fff', borderColor: 'transparent', background: `linear-gradient(135deg, ${t.color}, ${t.color}99)` } : { color: t.color, borderColor: t.border, background: t.soft }}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold tabular-nums" style={{ color: t.color }}>{cap.number}</span>
                    <span className={`block text-[15px] font-semibold leading-snug ${on ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{cap.name}</span>
                  </span>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform duration-500 ${on ? 'translate-x-1' : 'text-slate-600'}`} style={on ? { color: t.color } : undefined} />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Detail panel, recoloured for the selected capability */}
        <div
          className="lg:col-span-7 relative overflow-hidden rounded-2xl border p-7 sm:p-9 flex flex-col transition-colors duration-500"
          style={{ borderColor: tone.border, background: `linear-gradient(165deg, ${tone.soft}, rgba(14,24,48,0.7) 55%)` }}
          role="tabpanel"
        >
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${tone.color}, transparent)` }} />
          <span aria-hidden="true" className="absolute -top-20 -right-16 w-72 h-72 rounded-full blur-3xl opacity-30" style={{ background: tone.color }} />
          <span aria-hidden="true" className="absolute right-6 bottom-2 text-[8rem] font-extrabold leading-none opacity-[0.07] tabular-nums" style={{ color: tone.color, fontFamily: 'var(--font-display)' }}>
            {selected.number}
          </span>

          <div key={selected.number} className="sx-fade relative flex-1 flex flex-col">
            <div className="flex items-center gap-4">
              <span className="w-14 h-14 rounded-2xl flex items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${tone.color}, ${tone.color}99)`, boxShadow: `0 14px 30px -12px ${tone.color}` }}>
                <SelIcon className="w-7 h-7" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: tone.color }}>
                  Capability {selected.number}
                </p>
                <p className="flex items-center gap-1.5 text-sm text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Ready to deploy
                </p>
              </div>
            </div>

            <h3 className="mt-6 text-2xl sm:text-3xl font-semibold text-white leading-tight">{selected.name}</h3>
            <p className="mt-3 text-base text-slate-200 leading-relaxed max-w-2xl">{selected.shortDescription}</p>

            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">Framework focus areas</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {selected.tags.map((tag) => (
                <li key={tag} className="text-sm px-3.5 py-1.5 rounded-full border font-medium text-slate-100" style={{ borderColor: tone.border, background: 'rgba(7,15,30,0.55)' }}>
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenContact(selected.name, `Consulting: ${selected.name}`)}
                className="gradient-btn h-12 px-6 rounded-full text-sm font-semibold text-white inline-flex items-center gap-2"
              >
                {selected.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenContact(selected.name, `See in Action: ${selected.name}`)}
                className="h-12 px-5 rounded-full text-sm font-semibold text-slate-200 hover:text-white border border-white/15 hover:bg-white/5 transition-colors inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" style={{ color: tone.color }} />
                See it in action
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
