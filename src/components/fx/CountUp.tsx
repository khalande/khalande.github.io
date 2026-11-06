import React, { useEffect, useRef, useState } from 'react';

/**
 * Counts the numeric part of a stat ("10X", "250+", "360°", "1,200") up from
 * zero the first time it scrolls into view. Non-numeric values render as-is.
 */
export const CountUp: React.FC<{ value: string; duration?: number }> = ({
  value,
  duration = 1600,
}) => {
  const raw = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  // Leave ranges and ratios ("30–40%", "24/7") untouched.
  const match = raw && !/\d/.test(raw[3]) ? raw : null;
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!match || !ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr.replace(/,/g, ''));
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
    const useCommas = numStr.includes(',');
    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      return useCommas ? Number(fixed).toLocaleString('en-US', { minimumFractionDigits: decimals }) : fixed;
    };

    setDisplay(`${prefix}${format(0)}${suffix}`);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          setDisplay(`${prefix}${format(target * eased)}${suffix}`);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
};
