import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Floating "back to top" button. Appears after one screen of scrolling;
 * its ring fills to show how far down the page you are.
 */
export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setVisible(el.scrollTop > window.innerHeight * 0.8);
      setProgress(max > 0 ? el.scrollTop / max : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const R = 21;
  const C = 2 * Math.PI * R;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed z-40 right-4 sm:right-6 w-12 h-12 rounded-full bg-[#0B1528]/90 backdrop-blur-md border border-white/10 text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.8)] flex items-center justify-center transition-all duration-500 hover:border-cyan-400/60 hover:-translate-y-0.5 group ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <svg aria-hidden="true" viewBox="0 0 48 48" className="absolute inset-0 w-full h-full -rotate-90">
        <defs>
          <linearGradient id="stt-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5B544" />
            <stop offset="55%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#4C8DFF" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
        <circle cx="24" cy="24" r={R} fill="none" stroke="url(#stt-ring)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - progress)} />
      </svg>
      <ArrowUp className="relative w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
};
