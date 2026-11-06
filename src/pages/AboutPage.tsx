import { VideoBackdrop } from '../components/fx/VideoBackdrop.tsx';
import { HERO_MEDIA } from '../config/media.ts';
import { JourneyTimeline } from '../components/JourneyTimeline.tsx';
import { Highlight } from '../components/ui/Highlight.tsx';
import { ToneCard, IconBadge, toneAt } from '../components/ui/ToneCard.tsx';
import { SmartImage } from '../components/fx/SmartImage.tsx';
import { LEADERSHIP } from '../data/about.ts';
import { CornerDownRight, CalendarDays, Mail as MailIcon, IdCard, Linkedin } from 'lucide-react';
import { BRAND, LEADERSHIP_PHOTO, BROCHURE_PDF } from '../config/media.ts';
import { AlertCircle, Lightbulb, Target, Compass, Users, Cpu, TrendingUp, ShieldCheck, ClipboardList, Mic, Presentation, Newspaper } from 'lucide-react';
import React from 'react';
import { ABOUT_DATA } from '../data/about.ts';
import { StatStrip } from '../components/StatStrip.tsx';
import { CTABand } from '../components/CTABand.tsx';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  FileText,
  Download,
  Quote,
  Shield,
  Layers,
  Check
} from 'lucide-react';

interface AboutPageProps {
  onOpenContact: (domain?: string, title?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenContact }) => {

  return (
    <div className="relative space-y-24 sm:space-y-32 pb-20">
      {/* 1. Hero Section */}
      <section className="hero-bleed relative isolate pt-12 pb-16 overflow-hidden text-center">
        <VideoBackdrop media={HERO_MEDIA.about} variant="subtle" focus="center" scanline />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-sm font-semibold tracking-[0.06em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{ABOUT_DATA.hero.eyebrow}</span>
          </div>

          <h1 className="text-display font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            {ABOUT_DATA.hero.titleLine1} <br />
            <span className="gradient-text-live">{ABOUT_DATA.hero.titleLine2}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {ABOUT_DATA.hero.sub}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenContact(undefined, "Book a Discovery Call - About BlueNxt")}
              className="gradient-btn px-8 py-3.5 rounded-full text-sm font-bold text-white tracking-wide shadow-xl hover:shadow-cyan-500/25 inline-flex items-center gap-2"
            >
              <span>{ABOUT_DATA.hero.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* DNA Badge */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-cyan-400/25 text-sm font-semibold text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>{ABOUT_DATA.hero.dnaBadge}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="pt-8">
            <StatStrip stats={ABOUT_DATA.hero.stats} />
          </div>
        </div>
      </section>

      {/* 2. Our Story: Origin & Mission */}
      <section id="our-story" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)] space-y-8">
              <div>
                <span className="eyebrow eyebrow--amber">Origin &amp; Mission</span>
                <h2 className="text-h2 text-white mt-3">
                  <Highlight text={ABOUT_DATA.ourStory.title} phrase="Fundamental Frustration" tone="gold" breakBefore />
                </h2>
              </div>
              <ToneCard tone={toneAt(2)} className="p-7 sm:p-8">
                <Quote className="w-9 h-9 text-amber-300/70" />
                <blockquote className="mt-3 text-xl sm:text-2xl font-semibold text-white leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                  &ldquo;{ABOUT_DATA.ourStory.quote}&rdquo;
                </blockquote>
                <p className="mt-4 text-sm font-semibold text-amber-200">— {ABOUT_DATA.ourStory.author}</p>
              </ToneCard>
            </div>
          </div>

          <ol className="lg:col-span-7 space-y-4">
            {ABOUT_DATA.ourStory.paragraphs.map((para, idx) => {
              const tone = toneAt(idx === 0 ? 4 : idx === 1 ? 1 : 0);
              const step = [
                { label: 'The frustration', Icon: AlertCircle },
                { label: 'The insight', Icon: Lightbulb },
                { label: 'The mission', Icon: Target },
              ][idx] ?? { label: 'Our story', Icon: Sparkles };
              return (
                <ToneCard key={idx} as="li" tone={tone} className="p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <IconBadge icon={step.Icon} tone={tone} size="sm" solid />
                    <span className="text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: tone.color }}>
                      0{idx + 1} · {step.label}
                    </span>
                  </div>
                  <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">{para}</p>
                </ToneCard>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 3. The Journey: scroll-driven timeline */}
      <JourneyTimeline
        eyebrow="The Evolution"
        title={ABOUT_DATA.journeyTimeline.title}
        steps={ABOUT_DATA.journeyTimeline.steps}
      />

      {/* 4. Impact, By the Numbers: Scale & Authority */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow eyebrow--teal">Scale &amp; Authority</span>
          <h2 className="text-h2 text-white mt-3">
            Impact, <span className="text-cyan-blue">By the Numbers</span>
          </h2>
        </div>
        <StatStrip stats={ABOUT_DATA.impactStats} tone={toneAt(1)} flat />
      </section>

      {/* 4b. Leadership Team */}
      <section id="leadership" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow eyebrow--amber">{LEADERSHIP.eyebrow}</span>
          <h2 className="text-h2 text-white mt-3">
            <Highlight text={LEADERSHIP.title} phrase="Multidisciplinary delivery." tone="gold" breakBefore />
          </h2>
        </div>

        {/* Founder feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 relative overflow-hidden rounded-3xl border border-white/10 min-h-[340px]">
            <SmartImage src={LEADERSHIP_PHOTO} alt="Bluenxt leadership in a client boardroom" wrapperClassName="absolute inset-0" className="ken-burns" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070F1E] via-[#070F1E]/20 to-transparent" />
            <div className="absolute left-5 right-5 bottom-5 rounded-2xl bg-[#0B1528]/85 backdrop-blur-md border border-white/10 p-5">
              <p className="text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>{LEADERSHIP.people[0].name}</p>
              <p className="text-sm text-slate-300">{LEADERSHIP.people[0].title}</p>
            </div>
          </div>
          <div className="lg:col-span-7 card-glass rounded-3xl border border-white/10 p-7 sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-amber-300">Founder credentials</p>
            <ul className="mt-5 divide-y divide-white/[0.07]">
              {LEADERSHIP.founderCredentials.map((c) => (
                <li key={c} className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
                  <CornerDownRight className="w-4 h-4 mt-1 shrink-0 text-[#4C8DFF]" />
                  <span className="text-[15px] sm:text-base text-slate-200 leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Profiles */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {LEADERSHIP.people.map((p, i) => (
            <li key={p.name} className="group card-glass card-glass-hover rounded-2xl border border-white/10 p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <span
                  className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-display)', background: i === 0 ? 'linear-gradient(135deg,#2F6BFF,#22D3EE)' : 'linear-gradient(135deg,#F5B544,#4C8DFF)' }}
                >
                  {p.initials}
                </span>
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold text-white">{p.name}</h3>
                  <p className="text-sm text-slate-400">{p.title}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <a href={p.booking} target="_blank" rel="noopener noreferrer" className="gradient-btn h-10 px-4 rounded-full text-sm font-semibold text-white inline-flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" /> Book a meeting
                </a>
                <a href={`mailto:${p.email}`} className="h-10 px-4 rounded-full border border-white/15 text-sm font-medium text-slate-200 hover:bg-white/5 transition-colors inline-flex items-center gap-2">
                  <MailIcon className="w-4 h-4" /> {p.email}
                </a>
                <a href={p.card} className="h-10 px-4 rounded-full border border-white/15 text-sm font-medium text-slate-200 hover:bg-white/5 transition-colors inline-flex items-center gap-2">
                  <IdCard className="w-4 h-4" /> Digital card
                </a>
                {p.linkedin && (
                  <a href={p.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on LinkedIn`} className="w-10 h-10 rounded-full border border-white/15 text-slate-200 hover:bg-white/5 transition-colors inline-flex items-center justify-center">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Representative organisations */}
        <div className="card-glass rounded-2xl border border-white/10 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">Representative organisations served</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {LEADERSHIP.organisations.map((o) => (
              <li key={o} className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-sm font-medium text-slate-200">{o}</li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-slate-500 leading-relaxed">{LEADERSHIP.disclaimer}</p>
          <a href={BROCHURE_PDF} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-white transition-colors">
            <Download className="w-4 h-4" /> Download the corporate brochure (PDF)
          </a>
        </div>
      </section>

      {/* 5. What We Believe: Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow eyebrow--violet">Principles</span>
          <h2 className="text-h2 text-white mt-3">{ABOUT_DATA.beliefs.title}</h2>
          <p className="text-lead text-slate-300 mt-4">{ABOUT_DATA.beliefs.sub}</p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {ABOUT_DATA.beliefs.items.map((b, i) => {
            const tone = toneAt(i);
            const Icon = [Compass, Users, Cpu, Layers, Target, TrendingUp, ShieldCheck][i % 7];
            const featured = i === 0;
            return (
              <ToneCard key={b.number} as="li" tone={tone} className={`p-6 sm:p-7 ${featured ? 'sm:col-span-2 lg:row-span-1' : ''}`}>
                <span aria-hidden="true" className="absolute -right-1 -top-4 text-[6rem] font-extrabold leading-none opacity-[0.10] tabular-nums" style={{ color: tone.color, fontFamily: 'var(--font-display)' }}>
                  {b.number}
                </span>
                <IconBadge icon={Icon} tone={tone} solid={featured} />
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: tone.color }}>Belief {b.number}</p>
                <h3 className={`mt-1 font-semibold text-white leading-snug ${featured ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>{b.title}</h3>
                <p className={`mt-2 text-slate-300 leading-relaxed ${featured ? 'text-base sm:text-lg max-w-xl' : 'text-sm'}`}>{b.description}</p>
              </ToneCard>
            );
          })}
        </ol>
      </section>

      {/* 6. Thought Leadership: Research & Publications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow eyebrow--blue">Research &amp; Publications</span>
          <h2 className="text-h2 text-white mt-3">{ABOUT_DATA.thoughtLeadership.title}</h2>
          <p className="text-lead text-slate-300 mt-4">{ABOUT_DATA.thoughtLeadership.sub}</p>
        </div>

        {/* Featured: Blue Book */}
        <ToneCard tone={toneAt(0)} className="rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 relative min-h-[240px] lg:min-h-full">
              <SmartImage
                src={BRAND.blueBook.src}
                fallbackSrc={BRAND.blueBook.fallback}
                alt="The Bluenxt Blue Book"
                wrapperClassName="absolute inset-0"
                className="transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-transparent to-[#0E1830]/90" />
              <span className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#070F1E]/80 backdrop-blur border border-[#4C8DFF]/50 text-sm font-semibold text-blue-100">
                <BookOpen className="w-4 h-4" /> {ABOUT_DATA.thoughtLeadership.featured.type}
              </span>
            </div>
            <div className="lg:col-span-7 p-7 sm:p-10 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-semibold text-white">{ABOUT_DATA.thoughtLeadership.featured.title}</h3>
              <p className="text-base text-slate-300 leading-relaxed">{ABOUT_DATA.thoughtLeadership.featured.description}</p>
              <p className="text-sm font-semibold text-blue-200">{ABOUT_DATA.thoughtLeadership.featured.meta}</p>
              <button
                onClick={() => onOpenContact(undefined, "Download Flagship Blue Book")}
                className="gradient-btn mt-2 h-12 px-6 rounded-full text-sm font-semibold text-white inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {ABOUT_DATA.thoughtLeadership.featured.cta}
              </button>
            </div>
          </div>
        </ToneCard>

        {/* White paper & playbook */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ABOUT_DATA.thoughtLeadership.cards.map((c, idx) => {
            const tone = toneAt(idx === 0 ? 1 : 2);
            return (
              <ToneCard key={c.title} tone={tone} className="p-7 sm:p-8">
                <div className="flex h-full flex-col">
                  <div className="flex items-center gap-3">
                    <IconBadge icon={idx === 0 ? FileText : ClipboardList} tone={tone} solid />
                    <span className="text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: tone.color }}>{c.type}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{c.title}</h3>
                  <p className="mt-2 text-[15px] text-slate-300 leading-relaxed">{c.description}</p>
                  <p className="mt-3 text-sm text-slate-500">{c.meta}</p>
                  <button
                    onClick={() => onOpenContact(undefined, `Read Paper: ${c.title}`)}
                    className="mt-6 self-start h-11 px-5 rounded-full border text-sm font-semibold transition-colors inline-flex items-center gap-1.5 hover:bg-white/5"
                    style={{ borderColor: tone.border, color: tone.color }}
                  >
                    {c.cta} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </ToneCard>
            );
          })}
        </div>

        <ul className="flex flex-wrap justify-center gap-2.5 pt-2">
          {ABOUT_DATA.thoughtLeadership.formatChips.map((chip, i) => {
            const tone = toneAt(i);
            const Icon = [BookOpen, FileText, ClipboardList, Mic, Presentation, Newspaper][i % 6];
            return (
              <li key={chip} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium text-slate-200 bg-white/[0.02]" style={{ borderColor: tone.border }}>
                <Icon className="w-4 h-4" style={{ color: tone.color }} /> {chip}
              </li>
            );
          })}
        </ul>
      </section>

      {/* 7. CTA Band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CTABand
          headline={ABOUT_DATA.cta.headline}
          sub={ABOUT_DATA.cta.sub}
          primaryButtonText={ABOUT_DATA.cta.primaryBtn}
          onPrimaryClick={() => onOpenContact(undefined, "Book a Discovery Call - About BlueNxt")}
          secondaryButtonText={ABOUT_DATA.cta.secondaryBtn}
          secondaryLink="/platform"
          checks={ABOUT_DATA.cta.checks}
        />
      </section>
    </div>
  );
};
