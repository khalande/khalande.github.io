import React, { useEffect, useState } from 'react';

/** Reveals text word by word, like a streamed AI reply. */
export const StreamText: React.FC<{ text: string; speed?: number }> = ({ text, speed = 45 }) => {
  const words = text.split(' ');
  const [n, setN] = useState(words.length);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setN(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setN(i);
      if (i >= words.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span>
      {words.slice(0, n).join(' ')}
      {n < words.length && <span className="inline-block w-[2px] h-[1em] align-[-0.15em] ml-0.5 bg-cyan-300 animate-pulse" aria-hidden="true" />}
    </span>
  );
};
