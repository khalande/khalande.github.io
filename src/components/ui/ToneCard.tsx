import React from 'react';
import { TONES } from './Highlight.tsx';
import { CountUp } from '../fx/CountUp.tsx';

export type Tone = (typeof TONES)[number];

/** Pick a tone by position, cycling blue → teal → amber → violet → green. */
export const toneAt = (i: number): Tone => TONES[((i % TONES.length) + TONES.length) % TONES.length];

interface ToneCardProps {
  tone: Tone;
  children: React.ReactNode;
  className?: string;
  /** Show the coloured accent line along the top edge. */
  accent?: boolean;
  as?: 'div' | 'li' | 'article';
  /** Minimal version: no glow, no hover shadow. */
  flat?: boolean;
}

/**
 * The site's standard tile: tinted border and gradient wash in one tone,
 * a soft glow that wakes up on hover, and a gentle lift.
 */
export const ToneCard: React.FC<ToneCardProps> = ({ tone, children, className = '', accent = true, as = 'div', flat = false }) => {
  const Tag = as;
  return (
    <Tag
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1 ${flat ? 'shadow-[0_6px_18px_-12px_rgba(0,0,0,0.65)] hover:shadow-[0_10px_24px_-14px_rgba(0,0,0,0.75)]' : 'hover:shadow-[0_24px_50px_-28px_var(--tone)]'} ${className}`}
      style={
        {
          '--tone': tone.color,
          borderColor: tone.border,
          background: `linear-gradient(170deg, ${tone.soft}, rgba(14,24,48,0.6) 55%)`,
        } as React.CSSProperties
      }
    >
      {accent && (
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${tone.color}, transparent)` }} />
      )}
      {!flat && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-45 transition-opacity duration-700"
          style={{ background: tone.color }}
        />
      )}
      <div className="relative h-full">{children}</div>
    </Tag>
  );
};

interface IconBadgeProps {
  icon: React.ElementType;
  tone: Tone;
  size?: 'sm' | 'md' | 'lg';
  solid?: boolean;
}

/** Rounded icon tile in a tone; `solid` fills it with the tone gradient. */
export const IconBadge: React.FC<IconBadgeProps> = ({ icon: Icon, tone, size = 'md', solid = false }) => {
  const box = { sm: 'w-9 h-9 rounded-lg', md: 'w-11 h-11 rounded-xl', lg: 'w-14 h-14 rounded-2xl' }[size];
  const ico = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-7 h-7' }[size];
  return (
    <span
      className={`shrink-0 ${box} flex items-center justify-center border transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3`}
      style={
        solid
          ? { color: '#fff', borderColor: 'transparent', background: `linear-gradient(135deg, ${tone.color}, ${tone.color}99)`, boxShadow: `0 10px 24px -10px ${tone.color}` }
          : { color: tone.color, borderColor: tone.border, background: tone.soft }
      }
    >
      <Icon className={ico} />
    </span>
  );
};

interface StatTileProps {
  value: string;
  label: string;
  detail?: string;
  icon?: React.ElementType;
  tone: Tone;
  align?: 'left' | 'center';
  className?: string;
  flat?: boolean;
}

/** Number tile: icon, counting value in the tone colour, label and detail. */
export const StatTile: React.FC<StatTileProps> = ({ value, label, detail, icon, tone, align = 'left', className = '', flat = false }) => (
  <ToneCard tone={tone} flat={flat} className={`p-5 sm:p-6 ${align === 'center' ? 'text-center' : ''} ${className}`}>
    {icon && (
      <div className={align === 'center' ? 'flex justify-center' : ''}>
        <IconBadge icon={icon} tone={tone} size="sm" />
      </div>
    )}
    <p
      className={`${icon ? 'mt-4' : ''} text-3xl sm:text-4xl font-bold tabular-nums leading-none`}
      style={{ color: tone.color, fontFamily: 'var(--font-display)', letterSpacing: '-0.03em', textShadow: flat ? undefined : `0 0 28px ${tone.color}55` }}
    >
      <CountUp value={value} />
    </p>
    <p className="mt-2 text-sm sm:text-[15px] font-semibold text-white leading-snug">{label}</p>
    {detail && <p className="mt-0.5 text-sm text-slate-400 leading-snug">{detail}</p>}
  </ToneCard>
);
