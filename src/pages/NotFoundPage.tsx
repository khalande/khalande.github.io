import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 text-center">
      <div className="card-glass p-10 sm:p-14 rounded-3xl border border-white/10 max-w-lg w-full space-y-6">
        <div className="text-6xl sm:text-7xl font-extrabold gradient-text font-mono">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          The requested transformation capability or intelligence node could not be located on this cluster.
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="gradient-btn px-6 py-2.5 rounded-full text-sm font-semibold text-white tracking-wide shadow-md inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/consulting"
            className="px-6 py-2.5 rounded-full bg-slate-900 border border-white/10 text-sm font-semibold text-slate-300 hover:text-white"
          >
            Explore Domains
          </Link>
        </div>
      </div>
    </div>
  );
};
