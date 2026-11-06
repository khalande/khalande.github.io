import React from 'react';

type Tone = 'gold' | 'cyan' | 'blue' | 'spectrum';
const CLASS: Record<Tone, string> = {
  gold: 'text-gold-blue',
  cyan: 'text-cyan-blue',
  blue: 'gradient-text',
  spectrum: 'text-spectrum',
};

/**
 * Renders `text`, colouring the part that matches `phrase` (or the part
 * after the last line break / full stop when no phrase is given).
 */
export const Highlight: React.FC<{ text: string; phrase?: string; tone?: Tone; breakBefore?: boolean }> = ({
  text,
  phrase,
  tone = 'gold',
  breakBefore = false,
}) => {
  const target = phrase ?? '';
  const i = target ? text.lastIndexOf(target) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      {breakBefore && <br />}
      <span className={CLASS[tone]}>{target}</span>
      {text.slice(i + target.length)}
    </>
  );
};

/** Tone palette for card trios / quads, as on the live Academy page. */
export const TONES = [
  { name: 'blue', color: '#4C8DFF', soft: 'rgba(76,141,255,0.12)', border: 'rgba(76,141,255,0.4)' },
  { name: 'teal', color: '#22D3EE', soft: 'rgba(34,211,238,0.10)', border: 'rgba(34,211,238,0.38)' },
  { name: 'amber', color: '#F5B544', soft: 'rgba(245,181,68,0.10)', border: 'rgba(245,181,68,0.4)' },
  { name: 'violet', color: '#A78BFA', soft: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.4)' },
  { name: 'green', color: '#34D399', soft: 'rgba(52,211,153,0.10)', border: 'rgba(52,211,153,0.38)' },
];
