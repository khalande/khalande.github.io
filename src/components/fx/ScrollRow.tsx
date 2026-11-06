import React, { useCallback, useEffect, useRef, useState } from 'react';

interface ScrollRowProps {
  /** Classes for the scrolling row itself (flex, gap, padding, background). */
  className?: string;
  /** Classes for the outer wrapper (width). */
  wrapperClassName?: string;
  /** Change this when the selected tab changes, to keep it in view. */
  activeKey?: string;
  children: React.ReactNode;
}

/**
 * A single row of tabs that scrolls sideways when it doesn't fit.
 * Fades whichever edge has more tabs hidden, and keeps the selected
 * tab (aria-selected="true") scrolled into view.
 */
export const ScrollRow: React.FC<ScrollRowProps> = ({ className = '', wrapperClassName = '', activeKey, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [fade, setFade] = useState({ left: false, right: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setFade({ left: el.scrollLeft > 4, right: max > 4 && el.scrollLeft < max - 4 });
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  useEffect(() => {
    const el = ref.current;
    const active = el?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!el || !active) return;
    const target = active.offsetLeft - (el.clientWidth - active.offsetWidth) / 2;
    el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [activeKey]);

  const mask =
    fade.left && fade.right
      ? 'linear-gradient(to right, transparent, #000 48px, #000 calc(100% - 48px), transparent)'
      : fade.right
      ? 'linear-gradient(to right, #000 calc(100% - 56px), transparent)'
      : fade.left
      ? 'linear-gradient(to right, transparent, #000 56px)'
      : undefined;

  return (
    <div className={`relative max-w-full ${wrapperClassName}`}>
      <div
        ref={ref}
        onScroll={update}
        className={`overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
        style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
      >
        {children}
      </div>
    </div>
  );
};
