import React, { useState } from 'react';

export interface LogoItem {
  name: string;
  /** File name (without extension) inside public/logos/, e.g. "microsoft" */
  file: string;
}

/**
 * Shows the official logo from public/logos/<file>.svg (or .png) when it exists,
 * otherwise a clean text wordmark, so the strip never looks broken.
 * Logos are shown in white at reduced opacity and brighten on hover.
 */
const Logo: React.FC<{ item: LogoItem }> = ({ item }) => {
  const [ext, setExt] = useState<'svg' | 'png' | null>('svg');

  if (!ext) {
    return (
      <span
        className="text-lg sm:text-xl font-semibold tracking-tight text-slate-400 whitespace-nowrap"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {item.name}
      </span>
    );
  }
  return (
    <img
      src={`/logos/${item.file}.${ext}`}
      alt={item.name}
      loading="lazy"
      onError={() => setExt(ext === 'svg' ? 'png' : null)}
      className="h-7 sm:h-8 w-auto max-w-[140px] object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
    />
  );
};

export const LogoMarquee: React.FC<{ items: LogoItem[] }> = ({ items }) => (
  <div
    className="relative overflow-hidden py-2"
    style={{
      maskImage: 'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
      WebkitMaskImage: 'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
    }}
  >
    <ul className="flex w-max items-center gap-14 sm:gap-20 animate-marquee" aria-label="Partners">
      {[...items, ...items].map((item, i) => (
        <li key={`${item.file}-${i}`} aria-hidden={i >= items.length} className="shrink-0 flex items-center h-10">
          <Logo item={item} />
        </li>
      ))}
    </ul>
  </div>
);
