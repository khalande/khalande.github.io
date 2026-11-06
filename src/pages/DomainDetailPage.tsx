import { VideoBackdrop } from '../components/fx/VideoBackdrop.tsx';
import { HERO_MEDIA } from '../config/media.ts';
import { ToneCard, IconBadge, toneAt } from '../components/ui/ToneCard.tsx';
import { CountUp } from '../components/fx/CountUp.tsx';
import { TrendingDown, AlertTriangle, Activity, LineChart, Quote } from 'lucide-react';
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { DOMAINS_DATA } from '../data/domains.ts';
import { FrictionVisionTabs } from '../components/FrictionVisionTabs.tsx';
import { PhaseTimeline } from '../components/PhaseTimeline.tsx';
import { CapabilityAccordion } from '../components/CapabilityAccordion.tsx';
import { ScenarioCard } from '../components/ScenarioCard.tsx';
import { ResourceCards } from '../components/ResourceCards.tsx';
import { CTABand } from '../components/CTABand.tsx';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

interface DomainDetailPageProps {
  onOpenContact: (domain?: string, title?: string) => void;
}

export const DomainDetailPage: React.FC<DomainDetailPageProps> = ({ onOpenContact }) => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !DOMAINS_DATA[slug]) {
    return <Navigate to="/consulting" replace />;
  }

  const domain = DOMAINS_DATA[slug];

  return (
    <div className="relative space-y-24 sm:space-y-32 pb-20">
      {/* 1. Hero Section */}
      <section className="hero-bleed relative isolate pt-10 pb-16 overflow-hidden">
        <VideoBackdrop media={HERO_MEDIA.domain} variant="subtle" focus="center 30%" neural scanline />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              to="/consulting"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Transformation Domains</span>
            </Link>
          </div>

          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-sm font-semibold tracking-[0.06em] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>TRANSFORMATION DOMAIN {domain.number}</span>
            </div>

            <h1 className="text-display font-extrabold text-white tracking-tight leading-[1.1]">
              {domain.h1}
            </h1>

            {/* From → To Line */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 w-fit text-sm font-mono">
              <span className="text-red-400 font-bold">FROM: </span>
              <span className="text-slate-300">{domain.fromTo.split('→')[0]}</span>
              <span className="text-cyan-400 font-bold mx-2">→</span>
              <span className="text-cyan-300 font-bold">TO: </span>
              <span className="text-white font-bold">{domain.fromTo.split('→')[1]}</span>
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {domain.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenContact(domain.title, `Start Transformation: ${domain.title}`)}
                className="gradient-btn px-7 py-3.5 rounded-full text-sm font-bold text-white tracking-wide shadow-xl hover:shadow-cyan-500/25 inline-flex items-center gap-2"
              >
                <span>Start Your Transformation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#capabilities"
                className="px-6 py-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 text-sm font-semibold transition-all"
              >
                Explore Capabilities
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Case for Change: market signals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow eyebrow--amber">Market Signals</span>
          <h2 className="text-h2 text-white mt-3">
            The Case for <span className="text-gold-blue">Change</span>
          </h2>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {domain.caseForChangeStats.map((item, idx) => {
            const tone = toneAt(idx);
            const Icon = [TrendingDown, AlertTriangle, Activity, LineChart][idx % 4];
            return (
              <ToneCard key={item.label} as="li" tone={tone} className="p-6 sm:p-7">
                <div className="flex h-full flex-col">
                  <IconBadge icon={Icon} tone={tone} />
                  <p className="mt-5 text-4xl sm:text-5xl font-bold tabular-nums leading-none" style={{ color: tone.color, fontFamily: 'var(--font-display)', letterSpacing: '-0.035em', textShadow: `0 0 30px ${tone.color}55` }}>
                    <CountUp value={item.stat} />
                  </p>
                  <p className="mt-3 text-[15px] font-medium text-slate-200 leading-snug">{item.label}</p>
                  <p className="mt-auto pt-5 flex items-center gap-1.5 text-sm text-slate-400">
                    <Quote className="w-3.5 h-3.5 shrink-0" style={{ color: tone.color }} />
                    Source: <span className="font-semibold text-slate-300">{item.source}</span>
                  </p>
                </div>
              </ToneCard>
            );
          })}
        </ul>
      </section>

      {/* 3. Transformation Journey: 4-Tab Switcher */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FrictionVisionTabs journey={domain.journey} />
      </section>

      {/* 4. Our Approach: 4-Phase Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PhaseTimeline
          h2={domain.approach.h2}
          subtitle={domain.approach.subtitle}
          phases={domain.approach.phases}
          footerPill={domain.approach.footerPill}
        />
      </section>

      {/* 5. Capabilities — What We Deliver */}
      <section id="capabilities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CapabilityAccordion
          capabilities={domain.capabilities}
          onOpenContact={onOpenContact}
          domainName={domain.title}
        />
      </section>

      {/* 6. In Practice — Transformation Scenario */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScenarioCard scenario={domain.scenario} />
      </section>

      {/* 7. Knowledge Hub (3 Relevant Cards + Explore All) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ResourceCards limit={3} showFilters={false} onOpenContact={onOpenContact} />
      </section>

      {/* 8. CTA Band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CTABand
          eyebrow="READY TO TRANSFORM?"
          headline="Stop Redesigning. Start Architecting."
          sub="Your organization deserves a structural foundation built for the future — skills-first, AI-ready, and deployed in weeks, not months."
          primaryButtonText="Book a Discovery Call"
          onPrimaryClick={() => onOpenContact(domain.title, `Book a Discovery Call: ${domain.title}`)}
          secondaryButtonText="Experience the Platform"
          secondaryLink="/platform"
          checks={[
            "30-minute discovery conversation",
            "Customized to your industry & scale",
            "No obligation — just clarity"
          ]}
        />
      </section>
    </div>
  );
};
