import React from 'react';

interface MarqueeProps {
  items: string[];
  speed?: 'normal' | 'slow' | 'fast';
  direction?: 'left' | 'right';
  className?: string;
  separator?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  speed = 'normal',
  direction = 'left',
  className = '',
  separator = '•'
}) => {
  const durationClass = speed === 'slow' ? 'duration-[45s]' : speed === 'fast' ? 'duration-[20s]' : 'duration-[30s]';

  return (
    <div className={`relative overflow-hidden w-full whitespace-nowrap py-3 ${className}`}>
      {/* Edge gradient masks for seamless flow */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#070F1E] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#070F1E] to-transparent z-10 pointer-events-none" />

      <div className={`inline-flex items-center gap-6 animate-marquee ${durationClass} ${direction === 'right' ? 'animate-marquee-reverse' : ''}`}>
        {items.map((item, idx) => (
          <React.Fragment key={`marquee-1-${idx}`}>
            <span className="text-sm font-bold tracking-widest uppercase text-slate-300">
              {item}
            </span>
            <span className="text-cyan-400/60 font-black text-sm">{separator}</span>
          </React.Fragment>
        ))}
        {items.map((item, idx) => (
          <React.Fragment key={`marquee-2-${idx}`}>
            <span className="text-sm font-bold tracking-widest uppercase text-slate-300">
              {item}
            </span>
            <span className="text-cyan-400/60 font-black text-sm">{separator}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
