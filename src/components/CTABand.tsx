import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { NeuralCanvas } from './fx/NeuralCanvas.tsx';
import { SmartImage } from './fx/SmartImage.tsx';

interface CTABandProps {
  eyebrow?: string;
  headline: string;
  sub: string;
  primaryButtonText?: string;
  onPrimaryClick: () => void;
  secondaryButtonText?: string;
  secondaryLink?: string;
  checks?: string[];
  className?: string;
  /** Optional photo behind the band, tinted to the brand. */
  image?: string;
}

export const CTABand: React.FC<CTABandProps> = ({
  eyebrow,
  headline,
  sub,
  primaryButtonText = "Schedule a Demo",
  onPrimaryClick,
  secondaryButtonText = "Experience the Platform",
  secondaryLink = "/platform",
  checks,
  className = '',
  image
}) => {
  return (
    <div className={`beam-border relative isolate overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/10 bg-gradient-to-br from-[#0E1830] via-[#0d1626] to-[#080d17] text-center ${className}`}>
      {/* Background ambient lighting + neural constellation */}
      {image && (
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <SmartImage src={image} alt="" wrapperClassName="absolute inset-0" className="ken-burns opacity-60" />
          <div className="fx-tint absolute inset-0" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(7,15,30,0.82),rgba(7,15,30,0.55))]" />
        </div>
      )}
      <div className="absolute inset-0 -z-10 opacity-70" aria-hidden="true">
        <NeuralCanvas density={0.6} linkDistance={130} />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-12 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        {eyebrow && (
          <span className="inline-block text-sm font-mono font-bold uppercase tracking-widest text-cyan-400">
            {eyebrow}
          </span>
        )}

        <h2 className="text-h2 font-extrabold text-white tracking-tight leading-tight">
          {headline}
        </h2>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          {sub}
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onPrimaryClick}
            className="gradient-btn px-8 py-3.5 rounded-full text-sm font-bold text-white tracking-wide shadow-xl hover:shadow-cyan-500/25 inline-flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <span>{primaryButtonText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {secondaryButtonText && (
            <Link
              to={secondaryLink}
              className="px-7 py-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 text-sm font-semibold transition-all inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <span>{secondaryButtonText}</span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </Link>
          )}
        </div>

        {checks && checks.length > 0 && (
          <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
            {checks.map((check, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>{check}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
