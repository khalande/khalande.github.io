import React, { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';

interface AcademyOrbitProps {
  nodes: string[];
}

const SIZE = 400;
const C = SIZE / 2;
const R_NODES = 136; // node orbit radius (viewBox units)

/**
 * Holographic learner-ecosystem orbit, styled after the Bluenxt brand film:
 * a glowing projector core, HUD tick rings, nodes that orbit the learner
 * (labels stay upright), and data pulses flowing out along the connectors.
 * Everything is sized in % / viewBox units so it scales to any screen.
 * Hovering pauses the orbit so labels are easy to read.
 */
export const AcademyOrbit: React.FC<AcademyOrbitProps> = ({ nodes }) => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const points = nodes.map((label, i) => {
    const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    return { label, x: C + Math.cos(a) * R_NODES, y: C + Math.sin(a) * R_NODES };
  });

  return (
    <div className="orbit-stage group relative w-full max-w-[min(100%,460px)] mx-auto aspect-square rounded-[2rem] overflow-hidden border border-cyan-400/20 bg-[radial-gradient(circle_at_50%_50%,#0E2244_0%,#081428_55%,#050C1A_100%)] shadow-[0_30px_80px_-30px_rgba(34,211,238,0.35)]">
      {/* Atmosphere: teal bloom + amber counter-light, like the film's colour grade */}
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.22),transparent_45%),radial-gradient(circle_at_85%_90%,rgba(245,181,68,0.14),transparent_40%)]" />
      <div aria-hidden="true" className="fx-grid absolute inset-0 opacity-70" />
      <div aria-hidden="true" className="fx-scanline" />

      {/* HUD corner brackets */}
      {['top-3 left-3 border-t border-l', 'top-3 right-3 border-t border-r', 'bottom-3 left-3 border-b border-l', 'bottom-3 right-3 border-b border-r'].map((c) => (
        <span key={c} aria-hidden="true" className={`absolute w-5 h-5 border-cyan-300/60 ${c}`} />
      ))}
      <span aria-hidden="true" className="absolute top-4 left-1/2 -translate-x-1/2 text-[clamp(0.5rem,1.8vw,0.62rem)] font-semibold tracking-[0.25em] text-cyan-300/70">
        LEARNER&nbsp;ECOSYSTEM&nbsp;//&nbsp;LIVE
      </span>

      {/* Static rings: HUD ticks + inner glow ring */}
      <svg aria-hidden="true" viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="ao-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#22D3EE" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#2F6BFF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ao-link" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2F6BFF" stopOpacity="0.25" />
          </linearGradient>
          <filter id="ao-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer tick ring rotates slowly the other way */}
        <g className="ao-spin-rev" style={{ transformOrigin: `${C}px ${C}px` }}>
          {Array.from({ length: 72 }).map((_, i) => {
            const a = (i / 72) * Math.PI * 2;
            const long = i % 6 === 0;
            const r1 = 186;
            const r2 = long ? 176 : 181;
            return (
              <line
                key={i}
                x1={C + Math.cos(a) * r1}
                y1={C + Math.sin(a) * r1}
                x2={C + Math.cos(a) * r2}
                y2={C + Math.sin(a) * r2}
                stroke="#22D3EE"
                strokeOpacity={long ? 0.7 : 0.3}
                strokeWidth={long ? 1.6 : 1}
              />
            );
          })}
        </g>

        {/* Segmented mid ring */}
        <g className="ao-spin-fast" style={{ transformOrigin: `${C}px ${C}px` }}>
          <circle cx={C} cy={C} r={108} fill="none" stroke="#2F6BFF" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="38 18 6 18" />
        </g>

        {/* Core */}
        <circle cx={C} cy={C} r={90} fill="url(#ao-core)" opacity="0.55" />
        <circle className="ao-ping" cx={C} cy={C} r={52} fill="none" stroke="#22D3EE" strokeWidth="1.5" style={{ transformOrigin: `${C}px ${C}px` }} />
        <circle className="ao-ping ao-ping-2" cx={C} cy={C} r={52} fill="none" stroke="#22D3EE" strokeWidth="1.5" style={{ transformOrigin: `${C}px ${C}px` }} />
      </svg>

      {/* Orbiting layer: connectors, pulses and nodes rotate together */}
      <div className="ao-orbit absolute inset-0">
        <svg aria-hidden="true" viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 w-full h-full">
          <circle cx={C} cy={C} r={R_NODES} fill="none" stroke="#22D3EE" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="2 6" />
          {points.map((p, i) => (
            <g key={p.label}>
              <line x1={C} y1={C} x2={p.x} y2={p.y} stroke="url(#ao-link)" strokeOpacity="0.5" strokeWidth="1" />
              <line
                className="ao-flow"
                x1={C}
                y1={C}
                x2={p.x}
                y2={p.y}
                stroke="#67E8F9"
                strokeWidth="1.6"
                strokeDasharray="4 14"
                style={{ animationDelay: `${i * -0.35}s` }}
              />
              {!reduced && (
                <circle r="3.2" fill="#ffffff" filter="url(#ao-glow)">
                  <animateMotion dur="2.6s" begin={`${i * 0.43}s`} repeatCount="indefinite" path={`M${C},${C} L${p.x},${p.y}`} />
                  <animate attributeName="opacity" values="0;1;1;0" dur="2.6s" begin={`${i * 0.43}s`} repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={p.x} cy={p.y} r="5" fill={i % 3 === 1 ? '#F5B544' : '#22D3EE'} filter="url(#ao-glow)" />
            </g>
          ))}
        </svg>

        {points.map((p, i) => (
          <div
            key={p.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(p.x / SIZE) * 100}%`, top: `${(p.y / SIZE) * 100}%` }}
          >
            <div className="ao-counter">
              <span
                className={`block px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#071226]/90 backdrop-blur border text-[clamp(0.6rem,2.4vw,0.75rem)] font-semibold whitespace-nowrap shadow-[0_8px_24px_-8px_rgba(0,0,0,0.8)] transition-colors ${
                  i % 3 === 1 ? 'border-amber-300/50 text-amber-100' : 'border-cyan-400/45 text-slate-100'
                } group-hover:border-cyan-300`}
              >
                {p.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Learner hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[26%] aspect-square rounded-full bg-gradient-to-br from-[#2F6BFF] to-[#22D3EE] text-white border-[3px] border-white/20 shadow-[0_0_50px_-4px_rgba(34,211,238,0.85),inset_0_2px_10px_rgba(255,255,255,0.35)] flex flex-col items-center justify-center text-center">
        <GraduationCap className="w-[30%] h-auto drop-shadow" />
        <span className="mt-1 text-[clamp(0.6rem,2.3vw,0.78rem)] font-bold uppercase tracking-wider leading-none">Learner</span>
      </div>
    </div>
  );
};
