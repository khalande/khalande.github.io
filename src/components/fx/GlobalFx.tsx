import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Site-wide motion layer:
 *  - thin gradient scroll-progress bar under the sticky header
 *  - sections rise in as they enter the viewport, grid items stagger
 *  - cursor spotlight on every .card-glass (as on the business card bento grid)
 * All of it is switched off by prefers-reduced-motion in index.css.
 */
export const GlobalFx: React.FC = () => {
  const { pathname } = useLocation();
  const barRef = useRef<HTMLDivElement>(null);

  // Scroll progress
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? el.scrollTop / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
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

  // Scroll reveal, re-armed on every route change
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section'));
    sections.forEach((section, sIdx) => {
      // The first section is the hero: it has its own load sequence.
      if (sIdx === 0) return;
      section.classList.add('reveal');
      section.querySelectorAll<HTMLElement>('.grid').forEach((grid) => {
        Array.from(grid.children).forEach((child, i) => {
          (child as HTMLElement).style.setProperty('--i', String(Math.min(i, 8)));
        });
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );
    sections.forEach((s) => s.classList.contains('reveal') && io.observe(s));
    return () => io.disconnect();
  }, [pathname]);

  // Card spotlight follows the cursor
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const card = (e.target as Element | null)?.closest?.('.card-glass') as HTMLElement | null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 h-[2px] z-[60] pointer-events-none" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-[#2F6BFF] via-[#22D3EE] to-[#2F6BFF]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};
