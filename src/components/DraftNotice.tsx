import React from 'react';
import { PencilLine } from 'lucide-react';
import { SHOW_DRAFT_NOTICES } from '../config/site.ts';

/** Marks placeholder content. Hidden everywhere when SHOW_DRAFT_NOTICES is false. */
export const DraftNotice: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!SHOW_DRAFT_NOTICES) return null;
  return (
    <div className="flex gap-3 p-4 rounded-xl bg-amber-400/[0.07] border border-amber-300/25 text-sm text-amber-100/90 leading-relaxed">
      <PencilLine className="w-4 h-4 shrink-0 mt-0.5 text-amber-300" aria-hidden="true" />
      <p className="[&_code]:px-1 [&_code]:rounded [&_code]:bg-white/10 [&_code]:text-[0.85em]">{children}</p>
    </div>
  );
};
