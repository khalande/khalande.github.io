import { BOOKING_URL } from '../config/media.ts';
import React, { useState } from 'react';
import { submitForm } from '../lib/submitForm.ts';
import { FALLBACK_EMAIL } from '../config/forms.ts';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDomain?: string;
  modalTitle?: string;
}

export const DOMAIN_OPTIONS = [
  "Organization & Work Architecture",
  "Workforce & Workplace Strategy",
  "Strategic HR & Transformation",
  "Integrated Talent Management",
  "Total Rewards & Recognition",
  "HR Operations, Tech & AI",
  "AI Platform Demo (InHRsight, ORBIT, etc.)",
  "BlueNXT Academy & Enterprise Upskilling"
];

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultDomain,
  modalTitle = "Schedule a Strategic Discovery Call"
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [domain, setDomain] = useState(defaultDomain || DOMAIN_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);
  const [honey, setHoney] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !company.trim()) {
      setError('Please fill in your name, work email, and company.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid work email address.');
      return;
    }
    setError('');
    setSendFailed(false);
    setSending(true);
    const result = await submitForm(
      'Contact',
      modalTitle,
      {
        'Request': modalTitle,
        'Name': name.trim(),
        'Email': email.trim(),
        'Company': company.trim(),
        'Role': role.trim(),
        'Area of interest': domain,
        'Message': message.trim(),
      },
      honey
    );
    setSending(false);
    if (result.ok) {
      setSubmitted(true);
    } else {
      setSendFailed(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setCompany('');
    setRole('');
    setMessage('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070F1E]/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-xl p-6 md:p-8 rounded-2xl bg-[#0E1830] border border-white/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Request Confirmed</h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-white font-medium">{name}</span>. Our executive transformation team will contact you at <span className="text-cyan-400">{email}</span> within 24 hours to schedule your 30-minute discovery session.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="gradient-btn px-6 py-2.5 rounded-full text-sm font-semibold text-white tracking-wide shadow-lg inline-flex items-center gap-2"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 pr-6">
              <span className="inline-block text-[13px] font-semibold uppercase tracking-widest text-cyan-400 mb-1">
                World&apos;s First HR ConsulTech
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight">{modalTitle}</h2>
              <p className="text-sm text-slate-400 mt-1">
                30-minute strategic conversation · Customised to your domain priorities · No obligation
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}
            {sendFailed && (
              <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-400/30 text-amber-100 text-sm" role="alert">
                We couldn&apos;t send your request just now. Please try again, or email us at{' '}
                <a className="underline font-semibold" href={`mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(modalTitle)}`}>{FALLBACK_EMAIL}</a>.
              </div>
            )}

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-5 flex items-center justify-between gap-3 p-3.5 rounded-xl bg-cyan-400/[0.07] border border-cyan-400/25 text-sm text-cyan-200 hover:bg-cyan-400/[0.12] transition-colors"
            >
              <span>Prefer to pick a time now? <span className="font-semibold text-white">Open the booking calendar</span></span>
              <span aria-hidden="true">↗</span>
            </a>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Spam trap: hidden from people, bots fill it in */}
              <input type="text" name="_honey" value={honey} onChange={(e) => setHoney(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Work Email <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena@enterprise.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Company / Organization <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Global Enterprise Inc."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Job Title / Role
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. CHRO / VP People"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Primary Area of Interest
                </label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  {DOMAIN_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-slate-900 text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Transformation Goals / Challenges (Optional)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your workforce priorities or legacy bottlenecks..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[13px] text-slate-400">
                  Direct connection with senior partners · No spam
                </span>
                <button
                  type="submit"
                  disabled={sending}
                  className="gradient-btn px-6 py-2.5 rounded-full text-sm font-semibold text-white tracking-wide shadow-lg inline-flex items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                >
                  {sending ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Confirm &amp; Schedule
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
