import { VideoBackdrop } from '../components/fx/VideoBackdrop.tsx';
import { HERO_MEDIA } from '../config/media.ts';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONSULTING_OVERVIEW } from '../data/domains.ts';
import { CTABand } from '../components/CTABand.tsx';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Layers,
  ChevronDown,
  Database,
  Building,
  Users,
  Compass,
  Cpu
} from 'lucide-react';

interface ConsultingPageProps {
  onOpenContact: (domain?: string, title?: string) => void;
}

export const ConsultingPage: React.FC<ConsultingPageProps> = ({ onOpenContact }) => {
  const [activePropTab, setActivePropTab] = useState('architecture');
  const [expandedDomain, setExpandedDomain] = useState<string | null>("01");

  const currentTab = CONSULTING_OVERVIEW.uniquePropositions.tabs.find(t => t.id === activePropTab) 
    || CONSULTING_OVERVIEW.uniquePropositions.tabs[0];

  return (
    <div className="relative space-y-24 sm:space-y-32 pb-20">
      {/* 1. Hero Section */}
      <section className="hero-bleed relative isolate pt-12 pb-16 overflow-hidden">
        <VideoBackdrop media={HERO_MEDIA.consulting} variant="subtle" focus="30% center" scanline />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-sm font-semibold tracking-[0.06em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{CONSULTING_OVERVIEW.hero.eyebrow}</span>
          </div>

          <h1 className="text-display font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            {CONSULTING_OVERVIEW.hero.titleLine1} <br />
            {CONSULTING_OVERVIEW.hero.titleLine2}{' '}
            <span className="gradient-text-live">{CONSULTING_OVERVIEW.hero.titleAccent}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {CONSULTING_OVERVIEW.hero.sub}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenContact(undefined, "Begin Your Transformation with BlueNxt")}
              className="gradient-btn px-8 py-3.5 rounded-full text-sm font-bold text-white tracking-wide shadow-xl hover:shadow-cyan-500/25 inline-flex items-center gap-2"
            >
              <span>{CONSULTING_OVERVIEW.hero.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-sm font-mono font-bold tracking-wider text-slate-400">
            {CONSULTING_OVERVIEW.hero.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-cyan-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Our Unique Propositions (tabs: Architecture / Coverage / Content Engine) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="eyebrow eyebrow--teal">
              ConsulTech Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Our Unique Propositions
            </h2>
          </div>

          <div className="flex p-1 rounded-xl bg-slate-900/80 border border-white/5 w-fit">
            {CONSULTING_OVERVIEW.uniquePropositions.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePropTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-colors ${
                  activePropTab === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="card-glass p-8 rounded-2xl border border-white/10 space-y-6">
          <p className="text-sm sm:text-base text-slate-300">
            {currentTab.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            {currentTab.items.map((it, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-slate-900/60 border border-white/5 text-center">
                <div className="text-3xl sm:text-4xl font-extrabold gradient-text font-mono tabular-nums">
                  {it.value}
                </div>
                <div className="text-sm font-semibold text-slate-200 mt-2">
                  {it.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Paradigm Shift (Work, Workforce, Workplace) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl">
          <span className="eyebrow eyebrow--amber">
            The Paradigm Shift
          </span>
          <h2 className="text-h2 font-extrabold text-white tracking-tight mt-1">
            {CONSULTING_OVERVIEW.paradigmShift.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            {CONSULTING_OVERVIEW.paradigmShift.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONSULTING_OVERVIEW.paradigmShift.dimensions.map((dim) => (
            <div
              key={dim.number}
              className="card-glass p-8 rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-sm font-mono font-bold text-cyan-400">
                  DIMENSION {dim.number}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {dim.name}
                </h3>
                <div className="text-sm font-semibold text-cyan-300 mb-6">
                  {dim.title}
                </div>

                <div className="space-y-3">
                  {dim.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-white/10 text-center">
          <p className="text-sm sm:text-base text-slate-200 font-medium max-w-3xl mx-auto leading-relaxed">
            {CONSULTING_OVERVIEW.paradigmShift.closing}
          </p>
        </div>
      </section>

      {/* 4. The Vision: Architect Your HR Like Amazon, Netflix, Uber, Airbnb */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl">
          <span className="eyebrow eyebrow--blue">
            Platform-Thinking in HR
          </span>
          <h2 className="text-h2 font-extrabold text-white tracking-tight mt-1">
            {CONSULTING_OVERVIEW.visionCards.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            {CONSULTING_OVERVIEW.visionCards.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONSULTING_OVERVIEW.visionCards.companies.map((c, idx) => (
            <div
              key={idx}
              className="card-glass p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-lg font-black tracking-widest text-white block mb-1">
                  {c.name}
                </span>
                <span className="text-sm font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-3">
                  {c.theme}
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {c.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-slate-400 text-center max-w-3xl mx-auto leading-relaxed">
          {CONSULTING_OVERVIEW.visionCards.closing}
        </p>
      </section>

      {/* 5. Ready-to-Deploy Library (The World's Most Comprehensive HR Content Engine) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl">
          <span className="eyebrow eyebrow--violet">
            Deploy Instantly
          </span>
          <h2 className="text-h2 font-extrabold text-white tracking-tight mt-1">
            {CONSULTING_OVERVIEW.readyToDeployLibrary.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            {CONSULTING_OVERVIEW.readyToDeployLibrary.sub}
          </p>

          <div className="pt-3 flex flex-wrap gap-2">
            {CONSULTING_OVERVIEW.readyToDeployLibrary.tags.map((tag, idx) => (
              <span key={idx} className="text-sm px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5 font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONSULTING_OVERVIEW.readyToDeployLibrary.cards.map((card, idx) => (
            <div
              key={idx}
              className="card-glass card-glass-hover p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col justify-between group"
            >
              <div>
                <span className="text-sm font-mono font-bold text-cyan-400 px-2.5 py-1 rounded bg-cyan-400/10 border border-cyan-400/20 inline-block mb-3">
                  {card.badge}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {card.description}
                </p>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-sm text-slate-400">
                  <span className="font-bold text-slate-200 block mb-0.5">IMPACT:</span>
                  <span>{card.impact}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5">
                <button
                  onClick={() => onOpenContact(card.title, `Explore Library: ${card.title}`)}
                  className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>{card.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. How We Help Organisations (6 Domains Accordion) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl">
          <span className="eyebrow eyebrow--green">
            Transformation Architecture
          </span>
          <h2 className="text-h2 font-extrabold text-white tracking-tight mt-1">
            Domains of Comprehensive HR Transformation
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Each domain carries a distinct BlueNxt philosophy — not just a service list, but a point of view on what great looks like and how to get there.
          </p>
        </div>

        <div className="space-y-3">
          {CONSULTING_OVERVIEW.domainsAccordion.map((domain) => {
            const isExpanded = expandedDomain === domain.number;
            return (
              <div
                key={domain.number}
                className="card-glass rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedDomain(isExpanded ? null : domain.number)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono font-bold text-cyan-400">
                      {domain.number}
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {domain.name}
                      </h3>
                      <span className="text-sm text-slate-400">
                        {domain.tagline}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-cyan-400' : ''}`} />
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/5 space-y-4 animate-in fade-in duration-150">
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {domain.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {domain.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-sm px-3 py-1 rounded-full bg-slate-800 text-cyan-300 border border-cyan-400/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2 flex items-center gap-4">
                      <Link
                        to={`/consulting/${domain.slug}`}
                        className="gradient-btn px-5 py-2 rounded-full text-sm font-semibold text-white tracking-wide inline-flex items-center gap-1.5"
                      >
                        <span>Explore Domain In-Depth</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. BN's Disruptive Offerings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl">
          <span className="eyebrow eyebrow--amber">
            Disruptive Offerings
          </span>
          <h2 className="text-h2 font-extrabold text-white tracking-tight mt-1">
            {CONSULTING_OVERVIEW.disruptiveOfferings.title}
          </h2>
          <div className="text-sm font-mono font-bold text-cyan-400 mt-1">
            {CONSULTING_OVERVIEW.disruptiveOfferings.tagline}
          </div>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            {CONSULTING_OVERVIEW.disruptiveOfferings.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONSULTING_OVERVIEW.disruptiveOfferings.cards.map((card) => (
            <div
              key={card.number}
              className="card-glass p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-mono font-bold text-cyan-400">
                    {card.number}
                  </span>
                  <span className="text-[13px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                    READY TO DEPLOY
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <span className="text-[13px] font-mono font-bold text-slate-400 block mb-1">
                  OUTCOME:
                </span>
                <p className="text-sm text-cyan-300/90 leading-relaxed">
                  {card.outcome}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onOpenContact(undefined, "Partner With Us to Win")}
            className="gradient-btn px-7 py-3 rounded-full text-sm font-bold text-white tracking-wide shadow-lg inline-flex items-center gap-2"
          >
            <span>Partner With Us to Win</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <Link
            to="/platform"
            className="px-6 py-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 text-sm font-semibold transition-all"
          >
            Experience the Platform
          </Link>
        </div>
      </section>

      {/* 8. How BlueNxt Is Different (Comparison Table + 4-Phase Timeline) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl">
          <span className="eyebrow eyebrow--teal">
            Comparative Edge
          </span>
          <h2 className="text-h2 font-extrabold text-white tracking-tight mt-1">
            {CONSULTING_OVERVIEW.differentiation.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            {CONSULTING_OVERVIEW.differentiation.sub}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Consulting (red ✕) */}
          <div className="card-glass p-8 rounded-2xl border border-red-500/20">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span>Traditional Consulting</span>
            </h3>
            <div className="space-y-4">
              {CONSULTING_OVERVIEW.differentiation.traditionalPoints.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* BlueNxt Always-On Model (cyan ✓) */}
          <div className="card-glass p-8 rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-[#0E1830] to-[#0d1e36]">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <span>BlueNxt Always-On Model</span>
            </h3>
            <div className="space-y-4">
              {CONSULTING_OVERVIEW.differentiation.blueNxtPoints.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-white font-medium">{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4-Phase Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONSULTING_OVERVIEW.differentiation.timeline.map((item) => (
            <div
              key={item.phase}
              className="card-glass p-6 rounded-2xl border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-400/10">
                    {item.timeframe}
                  </span>
                  <span className="text-sm font-mono text-slate-500">PHASE {item.phase}</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Final CTA: Generate 10X Value */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CTABand
          eyebrow={CONSULTING_OVERVIEW.finalCta.eyebrow}
          headline={CONSULTING_OVERVIEW.finalCta.title}
          sub={CONSULTING_OVERVIEW.finalCta.sub}
          primaryButtonText="Book a Discovery Call"
          onPrimaryClick={() => onOpenContact(undefined, "Book a Discovery Call - Transformation Domains")}
          secondaryButtonText="Experience the Platform"
          secondaryLink="/platform"
          checks={CONSULTING_OVERVIEW.finalCta.checks}
        />
      </section>
    </div>
  );
};
