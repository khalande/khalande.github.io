import { LINKEDIN_URL, FACEBOOK_URL, INSTAGRAM_URL } from '../config/media.ts';
import React, { useState } from 'react';
import { submitForm } from '../lib/submitForm.ts';
import { FALLBACK_EMAIL } from '../config/forms.ts';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2, Users, ArrowUpRight, Globe, Shield, Heart, Linkedin, Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  onOpenContact?: (domain?: string, title?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterSending, setNewsletterSending] = useState(false);
  const [newsletterHoney, setNewsletterHoney] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail || !regex.test(newsletterEmail)) {
      setNewsletterError('Please provide a valid email address.');
      return;
    }
    setNewsletterError('');
    setNewsletterSending(true);
    const result = await submitForm('Newsletter', 'Newsletter signup', { 'Email': newsletterEmail.trim() }, newsletterHoney);
    setNewsletterSending(false);
    if (result.ok) setNewsletterSubmitted(true);
    else setNewsletterError(`Couldn't subscribe just now. Please try again, or email ${FALLBACK_EMAIL}.`);
  };

  return (
    <footer className="relative bg-[#070B14] border-t border-white/[0.08] text-slate-400 text-sm">
      {/* Pre-footer Section (On Every Page) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Newsletter Box */}
          <div className="p-8 rounded-2xl bg-[#0E1830]/70 border border-white/10 backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-2">
                <Mail className="w-4 h-4" />
                <span>Executive Insights</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-sm text-slate-400 mt-2 max-w-md">
                Get the latest HR insights & trends delivered to your inbox.
              </p>
            </div>

            <div className="mt-6 relative z-10">
              {newsletterSubmitted ? (
                <div className="flex items-center gap-2 p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Thank you for subscribing! The next executive edition is on its way.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your work email"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-500"
                    />
                    <input type="text" name="_honey" value={newsletterHoney} onChange={(e) => setNewsletterHoney(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                    <button
                      type="submit"
                      disabled={newsletterSending}
                      className="gradient-btn px-6 py-2.5 rounded-xl text-sm font-semibold text-white tracking-wide shadow-md whitespace-nowrap inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                    >
                      {newsletterSending ? <><span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" aria-hidden="true" /> Subscribing…</> : 'Subscribe'}
                    </button>
                  </div>
                  {newsletterError && (
                    <span className="text-sm text-red-400 block">{newsletterError}</span>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Community Card */}
          <div className="p-8 rounded-2xl bg-[#0E1830]/70 border border-white/10 backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-2">
                <Users className="w-4 h-4" />
                <span>Join Our Community</span>
              </div>
              <span className="text-sm font-mono text-slate-400">
                Connect with 10,000+ HR professionals
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
                Join the BlueNxt Community
              </h3>
              <p className="text-sm text-slate-400 mt-2 max-w-md">
                Access exclusive resources, webinars, and networking opportunities.
              </p>
            </div>

            <div className="mt-6 relative z-10">
              <a
                href="https://community.bluenxt.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-cyan-400/30 bg-cyan-500/5 hover:bg-cyan-500/15 text-white text-sm font-semibold transition-all hover:border-cyan-400 group"
              >
                <span>Access Community Hub</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Global Footer Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Brand & Tagline Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block" aria-label="Bluenxt ConsulTech, home">
              <img src="/logo-white.png" alt="bluenxt ConsulTech" className="h-10 w-auto" width={125} height={40} loading="lazy" />
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              World&apos;s First HR ConsulTech. Transforming Human Resources through AI-powered platforms and strategic consulting.
            </p>

            <div className="space-y-1.5 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <a href="mailto:connect@bluenxt.com" className="hover:text-white transition-colors">
                  connect@bluenxt.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>UAE • India • South Africa</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="text-sm uppercase font-bold text-white tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">About BlueNxt</Link>
              </li>
              <li>
                <Link to="/about#our-story" className="hover:text-cyan-400 transition-colors">Our Story</Link>
              </li>
              <li>
                <Link to="/about#leadership" className="hover:text-cyan-400 transition-colors">Leadership Team</Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-cyan-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <button
                  onClick={() => onOpenContact?.(undefined, "Contact BlueNxt")}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-3">
            <h4 className="text-sm uppercase font-bold text-white tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/consulting" className="hover:text-cyan-400 transition-colors">Transformation Domains</Link>
              </li>
              <li>
                <Link to="/platform" className="hover:text-cyan-400 transition-colors">AI Platforms</Link>
              </li>
              <li>
                <Link to="/digital-agents" className="hover:text-cyan-400 transition-colors">Digital Agents</Link>
              </li>
              <li>
                <Link to="/academy" className="hover:text-cyan-400 transition-colors">BlueNXT Academy</Link>
              </li>
            </ul>
          </div>

          {/* Resources & Connect Links */}
          <div className="space-y-3">
            <h4 className="text-sm uppercase font-bold text-white tracking-wider">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/resources" className="hover:text-cyan-400 transition-colors">Case Studies</Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-cyan-400 transition-colors">Thought Leadership</Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-cyan-400 transition-colors">Podcasts</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">HR Trends Report</Link>
              </li>
              <li>
                <a href="https://community.bluenxt.ai/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Blog</a>
              </li>
            </ul>

            <h4 className="text-sm uppercase font-bold text-white tracking-wider pt-2">Connect</h4>
            <ul className="flex gap-2" aria-label="Social media">
              {[
                { href: LINKEDIN_URL, label: 'Bluenxt on LinkedIn', Icon: Linkedin },
                { href: FACEBOOK_URL, label: 'Bluenxt on Facebook', Icon: Facebook },
                { href: INSTAGRAM_URL, label: 'Bluenxt on Instagram', Icon: Instagram },
              ].map(({ href, label, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-500">
              <Link to="/privacy-policy" className="hover:text-slate-200 transition-colors">Privacy Policy</Link>
              <span aria-hidden="true">·</span>
              <Link to="/terms-of-service" className="hover:text-slate-200 transition-colors">Terms of Service</Link>
              <span aria-hidden="true">·</span>
              <Link to="/cookie-policy" className="hover:text-slate-200 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 gap-4">
          <p>© 2026 BlueNxt 4U Consulting. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" /> by Webetron
          </p>
        </div>
      </div>
    </footer>
  );
};
