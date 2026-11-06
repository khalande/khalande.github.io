import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { VideoBackdrop } from './fx/VideoBackdrop.tsx';
import { HERO_MEDIA } from '../config/media.ts';

interface Layer {
  number: string;
  name: string;
  detail: string;
}

interface VideoShowcaseProps {
  title: string;
  sub: string;
  /** Layers as listed top-to-bottom; the band plays them bottom-up (strategy → outcomes). */
  layers: Layer[];
  onOpenContact: () => void;
}

const STEP_MS = 3600;

/**
 * Full-bleed cinematic strip: the brand film under a left-weighted overlay,
 * with the five ecosystem layers captioned in the order intelligence flows.
 */
export const VideoShowcase: React.FC<VideoShowcaseProps> = ({ title, sub, layers, onOpenContact }) => {
  const flow = [...layers].reverse();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setAuto(false);
  }, []);

  useEffect(() => {
    if (!auto) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % flow.length), STEP_MS);
    return () => window.clearTimeout(id);
  }, [active, auto, flow.length]);

  const current = flow[active];

  return (
    <section className="relative isolate overflow-hidden border-y border-cyan-400/15">
      <VideoBackdrop media={HERO_MEDIA.showcase} variant="band" focus="70% center" neural scanline />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 min-h-[560px] flex flex-col justify-between gap-14">
        <div className="max-w-xl space-y-5">
          <h2 className="text-h2 font-extrabold text-white tracking-tight leading-[1.08]">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">{sub}</p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/platform"
              className="gradient-btn px-6 py-3 rounded-full text-sm font-bold text-white inline-flex items-center gap-2"
            >
              <span>Explore the platforms</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={onOpenContact}
              className="px-6 py-3 rounded-full bg-slate-950/60 hover:bg-slate-900 text-slate-200 hover:text-white border border-white/15 backdrop-blur-md text-sm font-semibold transition-colors"
            >
              Book a discovery call
            </button>
          </div>
        </div>

        {/* Layer caption ticker */}
        <div className="max-w-2xl">
          <div className="min-h-[92px]" aria-live="polite">
            <div key={active} className="caption-swap">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm text-cyan-400 tabular-nums">{current.number}</span>
                <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{current.name}</span>
              </div>
              <p className="mt-2 text-sm sm:text-base text-slate-300">{current.detail}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-2" style={{ gridTemplateColumns: `repeat(${flow.length}, minmax(0, 1fr))` }}>
            {flow.map((layer, i) => (
              <button
                key={layer.number}
                type="button"
                onClick={() => {
                  setActive(i);
                  setAuto(false);
                }}
                aria-label={`Show layer ${layer.number}: ${layer.name}`}
                aria-current={i === active}
                className="group py-2 text-left focus-visible:outline-2 focus-visible:outline-cyan-400 focus-visible:outline-offset-2 rounded"
              >
                <span className="block h-[3px] rounded-full bg-white/15 overflow-hidden">
                  <span
                    key={`${i}-${active}-${auto}`}
                    className="block h-full bg-gradient-to-r from-[#2F6BFF] to-[#22D3EE] origin-left"
                    style={{
                      transform: i < active || (i === active && !auto) ? 'scaleX(1)' : 'scaleX(0)',
                      animation: i === active && auto ? `fx-progress ${STEP_MS}ms linear forwards` : undefined,
                    }}
                  />
                </span>
                <span className="hidden sm:block mt-2 text-[13px] text-slate-400 group-hover:text-slate-200 transition-colors truncate">
                  {layer.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
