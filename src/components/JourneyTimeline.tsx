import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Step {
  step: string;
  label: string;
  headline: string;
  description: string;
}

interface JourneyTimelineProps {
  eyebrow: string;
  title: string;
  steps: Step[];
}

/**
 * Scroll-driven timeline: as the visitor scrolls, a progress line fills and
 * each stage lights up when it reaches the middle of the screen. The heading
 * column stays pinned on large screens and shows the current stage.
 */
export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ eyebrow, title, steps }) => {
  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const list = listRef.current;
      if (!list) return;
      const mid = window.innerHeight * 0.55;
      const rect = list.getBoundingClientRect();
      setProgress(Math.min(1, Math.max(0, (mid - rect.top) / rect.height)));
      let current = 0;
      itemRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < mid) current = i;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToStep = (i: number) => {
    itemRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const total = String(steps.length).padStart(2, '0');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Pinned heading with current stage */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] space-y-6">
            <div>
              <span className="eyebrow">{eyebrow}</span>
              <h2 className="text-h2 text-white mt-3">{title}</h2>
            </div>

            <div className="hidden lg:block card-glass rounded-2xl p-6" aria-live="polite">
              <div className="flex items-baseline gap-2 tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
                <span className="text-5xl font-bold gradient-text">{steps[active].step}</span>
                <span className="text-lg text-slate-500">/ {total}</span>
              </div>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em] text-cyan-300">{steps[active].label}</p>
              <div className="mt-5 flex gap-1.5">
                {steps.map((s, i) => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => scrollToStep(i)}
                    aria-label={`Go to stage ${s.step}: ${s.label}`}
                    className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/10"
                  >
                    <span
                      className={`block h-full rounded-full bg-gradient-to-r from-[#2F6BFF] to-[#22D3EE] transition-transform duration-500 origin-left ${
                        i <= active ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollToStep(0)}
              className="inline-flex items-center gap-2.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center">
                <ChevronDown className="w-4 h-4 float-soft" />
              </span>
              Scroll to explore
            </button>
          </div>
        </div>

        {/* Timeline */}
        <ol ref={listRef} className="lg:col-span-7 relative pl-10 sm:pl-14">
          <span className="absolute left-[15px] sm:left-[19px] top-2 bottom-2 w-px bg-white/10" aria-hidden="true" />
          <span
            className="absolute left-[15px] sm:left-[19px] top-2 w-px bg-gradient-to-b from-[#2F6BFF] to-[#22D3EE] origin-top"
            style={{ height: 'calc(100% - 1rem)', transform: `scaleY(${progress})` }}
            aria-hidden="true"
          />
          {steps.map((s, i) => {
            const on = i <= active;
            return (
              <li
                key={s.step}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={`relative py-8 sm:py-12 first:pt-0 last:pb-0 transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-40'}`}
              >
                <span
                  className={`absolute -left-10 sm:-left-14 top-1 sm:top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-semibold tabular-nums border transition-colors duration-500 ${
                    i === active
                      ? 'bg-gradient-to-br from-[#2F6BFF] to-[#22D3EE] text-white border-transparent shadow-[0_0_24px_-4px_rgba(34,211,238,0.8)]'
                      : on
                      ? 'bg-[#0E1830] text-cyan-300 border-cyan-400/40'
                      : 'bg-[#0E1830] text-slate-500 border-white/10'
                  }`}
                >
                  {s.step}
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan-300">{s.label}</p>
                <h3 className="mt-2 text-2xl sm:text-3xl font-semibold text-white leading-tight">{s.headline}</h3>
                <p className="mt-3 text-[15px] sm:text-base text-slate-400 leading-relaxed max-w-xl">{s.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
