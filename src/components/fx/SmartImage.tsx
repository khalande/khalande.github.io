import React, { useState } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  /** Tried if `src` fails, before showing the branded panel. */
  fallbackSrc?: string;
  alt: string;
  /** Classes for the wrapper (size, rounding). */
  wrapperClassName?: string;
}

/**
 * Lazy image that fades in when loaded. If the image fails, a branded
 * gradient panel with a soft grid takes its place, so layouts never break.
 */
export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  wrapperClassName = '',
  loading = 'lazy',
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [current, setCurrent] = useState(src);

  // Only default to `relative` when the caller hasn't positioned the wrapper itself:
  // with both `relative` and `absolute` on one element, Tailwind's CSS order makes
  // `relative` win, and the image would collapse to its natural height.
  const positioned = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(wrapperClassName);

  return (
    <div className={`${positioned ? '' : 'relative'} overflow-hidden bg-[#0E1830] ${wrapperClassName}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 75% 20%, rgba(34,211,238,0.28), transparent 55%), radial-gradient(circle at 15% 85%, rgba(47,107,255,0.4), transparent 60%), linear-gradient(160deg, #0E1830, #070F1E)',
        }}
      >
        <div className="fx-grid absolute inset-0 opacity-60" />
      </div>
      {!failed && (
        <img
          src={current}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => (fallbackSrc && current !== fallbackSrc ? setCurrent(fallbackSrc) : setFailed(true))}
          className={`img-fade absolute inset-0 w-full h-full object-cover ${loaded ? 'is-loaded' : ''} ${className}`}
          {...rest}
        />
      )}
    </div>
  );
};
