import React, { useState } from 'react';
import { submitForm } from '../lib/submitForm.ts';
import { FALLBACK_EMAIL } from '../config/forms.ts';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, CheckCircle2, Bot, Send } from 'lucide-react';
import { NeuralGlowGraphic } from '../components/NeuralGlowGraphic.tsx';
import { VideoBackdrop } from '../components/fx/VideoBackdrop.tsx';
import { HERO_MEDIA } from '../config/media.ts';

export const DigitalAgentsPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [notified, setNotified] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [honey, setHoney] = useState('');

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !regex.test(email)) {
      setError('Please enter a valid work email.');
      return;
    }
    setError('');
    setSending(true);
    const result = await submitForm('Notify Me', 'Digital Agents early access', { 'Email': email.trim(), 'Interest': 'Digital Agents launch' }, honey);
    setSending(false);
    if (result.ok) setNotified(true);
    else setError(`Couldn't save your request just now. Please try again, or email ${FALLBACK_EMAIL}.`);
  };

  return (
    <div className="hero-bleed relative isolate min-h-[85vh] flex items-center justify-center py-20 overflow-hidden">
      <VideoBackdrop media={HERO_MEDIA.agents} variant="subtle" focus="center" neural scanline />
      {/* Background glowing orb and neural network */}
      <div className="absolute inset-0 pointer-events-none">
        <NeuralGlowGraphic variant="orbit" className="w-full h-full opacity-60" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-cyan-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-sm font-semibold tracking-[0.06em] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Coming Soon</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-display font-extrabold text-white tracking-tight">
            Digital Agents
          </h1>
          <h2 className="text-2xl sm:text-3xl font-extrabold gradient-text-live tracking-tight">
            Your Workforce Just Got Superpowers.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto pt-2">
            Autonomous AI agents that handle the operational grind—so your people can focus on what truly moves the needle.
          </p>
        </div>

        {/* Notification Form / State */}
        <div className="beam-border relative max-w-md mx-auto card-glass p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
          {notified ? (
            <div className="space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">You&apos;re On the VIP List!</h3>
              <p className="text-sm text-slate-400">
                We&apos;ll notify <span className="text-cyan-400 font-mono">{email}</span> the moment Digital Agents opens for early preview.
              </p>
            </div>
          ) : (
            <form onSubmit={handleNotifySubmit} className="space-y-4">
              <div className="text-sm font-mono text-slate-400 uppercase tracking-wider text-left">
                Get Notified at Launch
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
                />
                <input type="text" name="_honey" value={honey} onChange={(e) => setHoney(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <button
                  type="submit"
                  disabled={sending}
                  className="gradient-btn px-5 py-2.5 rounded-xl text-sm font-semibold text-white tracking-wide shrink-0 inline-flex items-center gap-1.5 disabled:opacity-70 disabled:cursor-wait"
                >
                  {sending ? <><span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" aria-hidden="true" /> <span>Saving…</span></> : <><span>Notify Me</span><Send className="w-3.5 h-3.5" /></>}
                </button>
              </div>
              {error && <span className="text-sm text-red-400 block text-left">{error}</span>}
            </form>
          )}

          <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-center gap-4">
            <Link
              to="/"
              className="text-sm font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Explore Home →
            </Link>
            <span className="text-slate-600">·</span>
            <Link
              to="/platform"
              className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Explore AI Platforms →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
