import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Bot, Briefcase, Compass, HeartPulse, Layers, Network, Server, ShieldCheck, TrendingUp } from 'lucide-react';

interface Layer {
  number: string;
  name: string;
  detail: string;
  description: string;
}

interface EcosystemStackProps {
  title: string;
  sub: string;
  centreBadge: string;
  centreSub: string;
  layers: Layer[]; // listed 05 → 01
}

interface Agent {
  name: string;
  task: string;
  Icon: React.ElementType;
  messages: string[];
}

// Layer colours and icons as on the live bluenxt.ai home page
const LOOK: Record<string, { color: string; Icon: React.ElementType; agent: Agent }> = {
  '05': {
    color: '#F5B544',
    Icon: TrendingUp,
    agent: {
      name: 'OUTCOME AI AGENT',
      task: 'Value Realisation',
      Icon: BarChart3,
      messages: [
        'Speed-to-competency is up across priority roles this quarter.',
        'Regretted attrition is trending down in the targeted teams.',
        'Executive value report drafted in business terms, ready to share.',
      ],
    },
  },
  '04': {
    color: '#22D3EE',
    Icon: Server,
    agent: {
      name: 'GOVERNANCE AI AGENT',
      task: 'Compliance Checks',
      Icon: ShieldCheck,
      messages: [
        'Scanned this week’s policy changes against regional regulations.',
        'Data access audit complete: no exceptions outside approved roles.',
        'Two items routed to HR for human review before sign-off.',
      ],
    },
  },
  '03': {
    color: '#4C8DFF',
    Icon: Network,
    agent: {
      name: 'TALENT AI AGENT',
      task: 'Shortlisting Pipeline',
      Icon: Briefcase,
      messages: [
        'Screening new applications for the Senior Data Analyst role…',
        'Matched profiles against the role’s skills blueprint.',
        'Shortlist ready for hiring-manager review, with interview guides.',
      ],
    },
  },
  '02': {
    color: '#A78BFA',
    Icon: Layers,
    agent: {
      name: 'CULTURE AI AGENT',
      task: 'Engagement Signals',
      Icon: HeartPulse,
      messages: [
        'Pulse survey analysed across all teams.',
        'Hotspot found: workload concerns in two delivery teams.',
        'Suggested action plans shared with the people leaders involved.',
      ],
    },
  },
  '01': {
    color: '#34D399',
    Icon: ShieldCheck,
    agent: {
      name: 'STRATEGY AI AGENT',
      task: 'Goal Cascade',
      Icon: Compass,
      messages: [
        'Enterprise goals for the year ingested from the strategy plan.',
        'Workforce implications mapped for each business unit.',
        'Priorities set for the six workforce architecture domains.',
      ],
    },
  },
};

const STEP_MS = 6200;
const MSG_GAP = 1500;

/**
 * "The Workforce Operating Ecosystem™" as on the live site: five layer cards,
 * the BlueNxt Operating Model emblem in the centre, and an AI agent working
 * live on the right. The agent panel follows the selected layer and types out
 * what it is doing.
 */
export const EcosystemStack: React.FC<EcosystemStackProps> = ({ title, sub, centreBadge, centreSub, layers }) => {
  const order = [...layers].reverse(); // 01 → 05
  const [step, setStep] = useState(2); // start on 03, the Talent AI Agent, as on the live site
  const [shown, setShown] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const picked = useRef(false);

  useEffect(() => setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches), []);

  useEffect(() => {
    if (paused || reduced || picked.current) return;
    const id = window.setTimeout(() => setStep((s) => (s + 1) % order.length), STEP_MS);
    return () => window.clearTimeout(id);
  }, [step, paused, reduced, order.length]);

  useEffect(() => {
    if (reduced) {
      setShown(3);
      return;
    }
    setShown(0);
    const timers = [1, 2, 3].map((n) => window.setTimeout(() => setShown(n), n * MSG_GAP));
    return () => timers.forEach(window.clearTimeout);
  }, [step, reduced]);

  const active = order[step];
  const look = LOOK[active.number] ?? LOOK['03'];
  const agent = look.agent;
  const [, possibilities] = centreBadge.split(',').map((x) => x.trim());
  const [lead, ...rest] = sub.split('Five');
  const titleParts = title.split(' for ');
  const [leadA, leadB] = lead.split('Human');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-3xl mx-auto text-center">
        <span className="eyebrow">The Workforce Operating Ecosystem™</span>
        <h2 className="text-h2 mt-3">
          <span className="gradient-text">{titleParts[0]}</span>
          {titleParts[1] && <span className="text-white"> for {titleParts[1]}</span>}
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-slate-300">
          <span className="font-semibold text-white">{leadA.trim()}</span>{' '}
          {leadB !== undefined && <span className="font-semibold text-cyan-300">Human{leadB}</span>}
        </p>
        {rest.length > 0 && <p className="mt-2 text-[15px] sm:text-base text-slate-400">Five{rest.join('Five')}</p>}
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Layer cards, 05 at the top */}
        <ol className="lg:col-span-4 space-y-3 order-1">
          {layers.map((layer) => {
            const idx = order.indexOf(layer);
            const on = idx === step;
            const L = LOOK[layer.number] ?? LOOK['03'];
            return (
              <li key={layer.number}>
                <button
                  type="button"
                  onClick={() => {
                    picked.current = true;
                    setStep(idx);
                  }}
                  aria-pressed={on}
                  className="w-full text-left flex items-center gap-3 rounded-xl border p-3 sm:p-3.5 transition-all duration-500"
                  style={{
                    borderColor: on ? L.color : `${L.color}40`,
                    background: on ? `linear-gradient(90deg, ${L.color}26, ${L.color}0A)` : `${L.color}0F`,
                    boxShadow: on ? `0 0 0 1px ${L.color}55, 0 14px 34px -18px ${L.color}` : undefined,
                    transform: on ? 'translateX(4px)' : undefined,
                  }}
                >
                  <span
                    className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white"
                    style={{ background: `linear-gradient(135deg, ${L.color}, ${L.color}AA)`, boxShadow: on ? `0 8px 22px -8px ${L.color}` : undefined }}
                  >
                    <L.Icon className="w-5 h-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-2">
                      <span className="text-sm font-bold tabular-nums" style={{ color: L.color }}>{layer.number}</span>
                      <span className="text-[15px] font-bold text-white leading-tight">{layer.name}</span>
                    </span>
                    <span className="block mt-0.5 text-sm text-slate-400 leading-snug">{layer.detail}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Operating Model emblem: layers orbit the core, a beam points at the active one */}
        <div className="lg:col-span-4 order-3 lg:order-2 flex flex-col items-center py-4 lg:py-0">
          <div className="relative w-[300px] h-[300px] md:w-[340px] md:h-[340px]">
            {/* atmosphere + radar sweep */}
            <div aria-hidden="true" className="absolute inset-0 rounded-full transition-[background] duration-700" style={{ background: `radial-gradient(circle, ${look.color}33 0%, rgba(47,107,255,0.14) 40%, transparent 68%)` }} />
            <div aria-hidden="true" className="eco-sweep absolute inset-[6%] rounded-full" style={{ background: `conic-gradient(from 0deg, transparent 0deg, ${look.color}00 250deg, ${look.color}40 345deg, ${look.color}00 360deg)` }} />

            <svg aria-hidden="true" viewBox="0 0 340 340" className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="eco-beam" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor={look.color} stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <g className="ao-spin-rev" style={{ transformOrigin: '170px 170px' }}>
                <circle cx="170" cy="170" r="160" fill="none" stroke="#22D3EE" strokeOpacity="0.22" strokeDasharray="1 7" strokeWidth="2" />
              </g>
              <g className="ao-spin-fast" style={{ transformOrigin: '170px 170px' }}>
                <circle cx="170" cy="170" r="98" fill="none" stroke="#4C8DFF" strokeOpacity="0.35" strokeDasharray="30 14 4 14" strokeWidth="1.5" />
              </g>
              <circle cx="170" cy="170" r="132" fill="none" stroke="#ffffff" strokeOpacity="0.07" />
            </svg>

            {/* orbiting layer nodes (they rotate together; labels stay upright) */}
            <div className="sx-orbit absolute inset-0">
              <svg aria-hidden="true" viewBox="0 0 340 340" className="absolute inset-0 w-full h-full">
                {order.map((layer, i) => {
                  const a = (i / order.length) * Math.PI * 2 - Math.PI / 2;
                  const x = 170 + Math.cos(a) * 132;
                  const y = 170 + Math.sin(a) * 132;
                  return i === step ? (
                    <g key={layer.number}>
                      <line x1="170" y1="170" x2={x} y2={y} stroke="url(#eco-beam)" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
                      <line className="ao-flow" x1="170" y1="170" x2={x} y2={y} stroke="#ffffff" strokeWidth="1.2" strokeDasharray="2 10" />
                    </g>
                  ) : (
                    <line key={layer.number} x1="170" y1="170" x2={x} y2={y} stroke="#ffffff" strokeOpacity="0.06" />
                  );
                })}
              </svg>
              {order.map((layer, i) => {
                const a = (i / order.length) * Math.PI * 2 - Math.PI / 2;
                const L = LOOK[layer.number] ?? LOOK['03'];
                const on = i === step;
                return (
                  <div
                    key={layer.number}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${50 + Math.cos(a) * 38.8}%`, top: `${50 + Math.sin(a) * 38.8}%` }}
                  >
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-hidden="true"
                      onClick={() => {
                        picked.current = true;
                        setStep(i);
                      }}
                      className="sx-counter relative flex items-center justify-center rounded-full text-sm font-bold text-white transition-all duration-500"
                      style={{
                        width: on ? 46 : 34,
                        height: on ? 46 : 34,
                        background: on ? `linear-gradient(135deg, ${L.color}, ${L.color}AA)` : '#0B1528',
                        border: `2px solid ${L.color}`,
                        boxShadow: on ? `0 0 26px ${L.color}` : `0 0 10px ${L.color}55`,
                        color: on ? '#fff' : L.color,
                      }}
                    >
                      {on && <span className="absolute inset-0 rounded-full border-2 ao-ping" style={{ borderColor: L.color }} />}
                      {layer.number}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* hexagon frame (counter-rotating) */}
            <svg aria-hidden="true" viewBox="0 0 340 340" className="absolute inset-0 w-full h-full pointer-events-none">
              <g className="ao-spin-fast" style={{ transformOrigin: '170px 170px' }}>
                <polygon
                  points={Array.from({ length: 6 }, (_, k) => {
                    const a = (k / 6) * Math.PI * 2;
                    return `${170 + Math.cos(a) * 84},${170 + Math.sin(a) * 84}`;
                  }).join(' ')}
                  fill="none"
                  stroke={look.color}
                  strokeOpacity="0.45"
                  strokeWidth="1.4"
                  strokeDasharray="10 6"
                />
              </g>
            </svg>

            {/* core orb */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <span aria-hidden="true" className="absolute inset-0 rounded-full ao-ping" style={{ border: `2px solid ${look.color}` }} />
              <div
                className="relative w-[136px] h-[136px] rounded-full flex flex-col items-center justify-center text-center border transition-[box-shadow,border-color] duration-700"
                style={{
                  background: `radial-gradient(circle at 35% 30%, ${look.color}55, #0B1528 62%)`,
                  borderColor: `${look.color}88`,
                  boxShadow: `0 0 60px -6px ${look.color}, inset 0 0 30px ${look.color}33`,
                }}
              >
                <span className="text-[1.6rem] font-bold leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                  <span className="text-white">Blue</span>
                  <span className="text-cyan-blue">Nxt</span>
                </span>
                <span className="mt-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-slate-200">Operating</span>
                <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-slate-200">Model</span>
              </div>
            </div>

            {/* data streams: layers → core → agent (desktop) */}
            <svg aria-hidden="true" viewBox="0 0 520 40" preserveAspectRatio="none" className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-[90px] w-[calc(100%+180px)] h-10 pointer-events-none">
              <line className="ao-flow" x1="0" y1="20" x2="190" y2="20" stroke={look.color} strokeOpacity="0.7" strokeWidth="1.6" strokeDasharray="3 9" />
              <line className="ao-flow" x1="330" y1="20" x2="520" y2="20" stroke={look.color} strokeOpacity="0.7" strokeWidth="1.6" strokeDasharray="3 9" />
              {!reduced && (
                <>
                  <circle r="3.5" fill="#fff">
                    <animateMotion dur="2.2s" repeatCount="indefinite" path="M0,20 L190,20" />
                    <animate attributeName="opacity" values="0;1;1;0" dur="2.2s" repeatCount="indefinite" />
                  </circle>
                  <circle r="3.5" fill="#fff">
                    <animateMotion dur="2.2s" begin="1.1s" repeatCount="indefinite" path="M330,20 L520,20" />
                    <animate attributeName="opacity" values="0;1;1;0" dur="2.2s" begin="1.1s" repeatCount="indefinite" />
                  </circle>
                </>
              )}
            </svg>
          </div>

          {/* caption */}
          <div className="mt-6 text-center">
            <p className="text-sm font-semibold gradient-text">{possibilities ?? 'Architecting New Possibilities'}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/25">
              <span className="text-sm font-bold text-cyan-300">+</span>
              <span className="text-sm font-medium text-slate-300">{centreSub}</span>
            </p>
          </div>
        </div>

        {/* Live AI agent */}
        <div className="lg:col-span-4 order-2 lg:order-3" aria-live="polite">
          <div className="rounded-2xl border bg-[#0B1528]/80 backdrop-blur-md overflow-hidden transition-colors duration-500 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]" style={{ borderColor: `${look.color}55` }}>
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08]" style={{ background: `linear-gradient(90deg, ${look.color}1A, transparent)` }}>
              <span className="w-10 h-10 rounded-lg flex items-center justify-center border" style={{ color: look.color, borderColor: `${look.color}55`, background: `${look.color}14` }}>
                <agent.Icon className="w-5 h-5" />
              </span>
              <div key={agent.name} className="sx-fade min-w-0 flex-1">
                <p className="text-sm font-bold tracking-[0.08em] truncate" style={{ color: look.color }}>{agent.name}</p>
                <p className="text-sm text-slate-400 truncate">{agent.task}</p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)] animate-pulse" aria-label="Online" />
            </div>

            <ul className="p-4 space-y-3 min-h-[248px]">
              {agent.messages.slice(0, shown).map((m, i) => (
                <li key={`${agent.name}-${i}`} className="sx-fade flex items-start gap-2.5">
                  <span className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.06] border border-white/10" style={{ color: look.color }}>
                    <Bot className="w-4 h-4" />
                  </span>
                  <p className="rounded-2xl rounded-tl-sm bg-white/[0.05] border border-white/[0.08] px-3.5 py-2.5 text-sm text-slate-200 leading-relaxed">{m}</p>
                </li>
              ))}
              {shown < agent.messages.length && (
                <li className="flex items-center gap-2.5">
                  <span className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.06] border border-white/10" style={{ color: look.color }}>
                    <Bot className="w-4 h-4" />
                  </span>
                  <span className="flex gap-1 rounded-full bg-white/[0.05] border border-white/[0.08] px-3.5 py-3" aria-label="Agent is typing">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                    ))}
                  </span>
                </li>
              )}
            </ul>

            <div className="flex items-center gap-2 px-4 py-3 border-t border-white/[0.08] text-sm text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: look.color }} />
              Layer {active.number} · {active.name}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Link to="/about" className="gradient-btn h-12 px-7 rounded-full text-sm font-semibold text-white inline-flex items-center gap-2">
          Discover the BlueNxt Advantage <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
