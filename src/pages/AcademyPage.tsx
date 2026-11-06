import { VideoBackdrop } from '../components/fx/VideoBackdrop.tsx';
import { HERO_MEDIA } from '../config/media.ts';
import { ScrollRow } from '../components/fx/ScrollRow.tsx';
import { AcademyOrbit } from '../components/AcademyOrbit.tsx';
import { LogoMarquee } from '../components/LogoMarquee.tsx';
import { Highlight, TONES } from '../components/ui/Highlight.tsx';
import { ToneCard, IconBadge } from '../components/ui/ToneCard.tsx';
import { CountUp } from '../components/fx/CountUp.tsx';
import { LibraryBig, Radar, FileCheck2, Users2, PlayCircle, Building2 as BuildingIcon, Landmark, Cpu as CpuIcon } from 'lucide-react';

const Building2 = BuildingIcon;
const Cpu = CpuIcon;
// Programme colour by category
const PROG_TONE = (category: string) =>
  ({ 'Innovation Lab': TONES[1], Leadership: TONES[2], 'Digital & AI': TONES[0], Strategy: TONES[3] } as Record<string, (typeof TONES)[number]>)[category] ?? TONES[0];
import { ScanSearch, BookOpenCheck, Hammer, Rocket as RocketIcon, CheckCircle2 as CheckIcon, ArrowRight as ArrowIcon } from 'lucide-react';
import React, { useState } from 'react';
import { ACADEMY_DATA } from '../data/academy.ts';
import { StatStrip } from '../components/StatStrip.tsx';
import { Marquee } from '../components/Marquee.tsx';
import { CTABand } from '../components/CTABand.tsx';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Briefcase,
  GraduationCap,
  Calendar,
  Layers,
  Award,
  Globe
} from 'lucide-react';

interface AcademyPageProps {
  onOpenContact: (domain?: string, title?: string) => void;
}

export const AcademyPage: React.FC<AcademyPageProps> = ({ onOpenContact }) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Innovation Lab' | 'Leadership' | 'Digital & AI' | 'Strategy'>('All');

  const filteredProgrammes = ACADEMY_DATA.signatureProgrammes.programmes.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );
  const programmeTabs = ['All', ...ACADEMY_DATA.signatureProgrammes.filterTabs] as const;
  // Grid adapts to how many programmes are showing, so there are no empty columns
  const programmeGrid =
    filteredProgrammes.length === 1
      ? 'grid-cols-1'
      : filteredProgrammes.length === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  const singleProgramme = filteredProgrammes.length === 1;

  return (
    <div className="relative space-y-24 sm:space-y-32 pb-20">
      {/* 1. Hero Section */}
      <section className="hero-bleed relative isolate pt-12 pb-16 overflow-hidden">
        <VideoBackdrop media={HERO_MEDIA.academy} variant="subtle" focus="center 35%" scanline />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-sm font-semibold tracking-[0.06em] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{ACADEMY_DATA.hero.eyebrow}</span>
              </div>

              <h1 className="text-display font-extrabold text-white tracking-tight leading-[1.1]">
                {ACADEMY_DATA.hero.titleLine1} <br />
                <span className="text-gold-blue">
                  {ACADEMY_DATA.hero.titleLine2} <br />
                  {ACADEMY_DATA.hero.titleLine3}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                {ACADEMY_DATA.hero.sub}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenContact(undefined, "Start Free Skills Assessment - BlueNXT Academy")}
                  className="gradient-btn px-7 py-3.5 rounded-full text-sm font-bold text-white tracking-wide shadow-xl hover:shadow-cyan-500/25 inline-flex items-center gap-2"
                >
                  <span>{ACADEMY_DATA.hero.primaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#learner-journey"
                  className="px-6 py-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 text-sm font-semibold transition-all"
                >
                  {ACADEMY_DATA.hero.secondaryCta}
                </a>
              </div>
            </div>

            {/* Holographic learner orbit */}
            <div className="lg:col-span-5">
              <AcademyOrbit nodes={ACADEMY_DATA.hero.orbitNodes} />
            </div>
          </div>

          <div className="pt-12">
            <StatStrip stats={ACADEMY_DATA.hero.stats} />
          </div>
        </div>
      </section>

      {/* 2. Rethinking Professional Learning */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl">
          <span className="eyebrow eyebrow--amber">
            A New Standard
          </span>
          <h2 className="text-h2 font-extrabold text-white tracking-tight mt-1">
            <Highlight text={ACADEMY_DATA.rethinking.title} phrase="We Fixed It." tone="gold" breakBefore />
          </h2>
          <p className="text-base text-slate-300 mt-3 leading-relaxed">
            {ACADEMY_DATA.rethinking.body}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-cyan-950/30 border border-cyan-400/20 italic text-cyan-300 text-sm sm:text-base font-semibold">
          &ldquo;{ACADEMY_DATA.rethinking.pullLine}&rdquo;
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACADEMY_DATA.rethinking.cards.map((card, idx) => (
            <div
              key={idx}
              className="card-glass p-8 rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-sm line-through text-slate-500 font-mono block mb-1">
                  {card.oldConcept}
                </span>
                <div className="text-cyan-400 text-sm font-mono font-bold uppercase tracking-wider mb-2">
                  BECOMES →
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {card.newConcept}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-slate-400 text-center max-w-3xl mx-auto leading-relaxed">
          {ACADEMY_DATA.rethinking.closing}
        </p>
      </section>

      {/* 3. The Learner Journey (I - IV) */}
      <section id="learner-journey" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow eyebrow--teal">
            Four-Stage Architecture
          </span>
          <h2 className="text-h2 font-extrabold text-white tracking-tight mt-1">
            <Highlight text={ACADEMY_DATA.learnerJourney.title} phrase="to Innovating" tone="gold" breakBefore />
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            {ACADEMY_DATA.learnerJourney.sub}
          </p>
        </div>

        <div className="relative">
          {/* Dot timeline joining the four stages */}
          <div aria-hidden="true" className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-[9px] h-[2px] rounded-full bg-gradient-to-r from-[#F5B544] via-[#22D3EE] via-50% to-[#A78BFA]" />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {ACADEMY_DATA.learnerJourney.stages.map((st, i) => {
              const tone = [TONES[2], TONES[1], TONES[0], TONES[3]][i % 4];
              const Icon = [ScanSearch, BookOpenCheck, Hammer, RocketIcon][i % 4];
              return (
                <li key={st.numeral} className="group relative flex flex-col">
                  <span aria-hidden="true" className="hidden lg:flex mx-auto w-5 h-5 rounded-full items-center justify-center bg-[#070F1E] border-2" style={{ borderColor: tone.color }}>
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: tone.color, boxShadow: `0 0 12px ${tone.color}`, animationDelay: `${i * 0.4}s` }} />
                  </span>
                  {i < 3 && (
                    <span aria-hidden="true" className="hidden lg:flex absolute top-[3.7rem] -right-[1.05rem] z-10 w-6 h-6 rounded-full bg-[#0B1528] border border-white/15 items-center justify-center text-slate-300">
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <div
                    className="relative flex-1 lg:mt-5 rounded-2xl p-6 sm:p-7 border overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5"
                    style={{ borderColor: tone.border, background: `linear-gradient(175deg, ${tone.soft}, rgba(14,24,48,0.6) 50%)` }}
                  >
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${tone.color}, transparent)` }} />
                    <span aria-hidden="true" className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" style={{ background: tone.color }} />

                    <div className="relative flex items-end justify-between">
                      <span
                        className="text-6xl font-extrabold leading-none bg-clip-text text-transparent"
                        style={{ fontFamily: 'var(--font-display)', backgroundImage: `linear-gradient(180deg, ${tone.color}, ${tone.color}33)` }}
                      >
                        {st.numeral}
                      </span>
                      <span className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105" style={{ background: `linear-gradient(135deg, ${tone.color}, ${tone.color}aa)`, boxShadow: `0 10px 24px -10px ${tone.color}` }}>
                        <Icon className="w-5 h-5" />
                      </span>
                    </div>
                    <span className="relative mt-3 block h-[3px] w-12 rounded-full transition-all duration-500 group-hover:w-20" style={{ background: tone.color }} />

                    <p className="relative mt-5 text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ color: tone.color }}>{st.stageLabel}</p>
                    <h3 className="relative mt-1 text-xl sm:text-2xl font-semibold text-white">{st.title}</h3>
                    <p className="relative mt-3 text-[15px] text-slate-300 leading-relaxed">{st.description}</p>

                    <ul className="relative mt-5 pt-5 border-t border-white/[0.08] space-y-2.5">
                      {st.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <CheckIcon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: tone.color }} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 4. The Skills Foundation & 12 Industry Chips */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl">
          <span className="eyebrow eyebrow--blue">
            Skills Foundation
          </span>
          <h2 className="text-h2 font-extrabold text-white tracking-tight mt-1">
            <Highlight text={ACADEMY_DATA.skillsFoundation.title} phrase="HR Skills Architecture" tone="blue" breakBefore />
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            {ACADEMY_DATA.skillsFoundation.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Blueprints */}
          <div className="card-glass p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-3">
              {ACADEMY_DATA.skillsFoundation.blueprints.headline}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {ACADEMY_DATA.skillsFoundation.blueprints.description}
            </p>
            <div className="space-y-2.5">
              {ACADEMY_DATA.skillsFoundation.blueprints.bullets.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Mapped */}
          <div className="card-glass p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-3">
              {ACADEMY_DATA.skillsFoundation.skillsMapped.headline}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {ACADEMY_DATA.skillsFoundation.skillsMapped.description}
            </p>
            <div className="space-y-2.5">
              {ACADEMY_DATA.skillsFoundation.skillsMapped.bullets.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 12 Industry Chips */}
        <div className="card-glass p-6 rounded-2xl border border-white/5 space-y-3">
          <span className="text-sm font-semibold tracking-[0.06em] uppercase text-cyan-400 block">
            {ACADEMY_DATA.skillsFoundation.industriesLabel}
          </span>
          <div className="flex flex-wrap gap-2">
            {ACADEMY_DATA.skillsFoundation.industries.map((ind, idx) => (
              <span
                key={idx}
                className="text-sm px-3.5 py-1.5 rounded-full bg-slate-900 border border-white/10 text-slate-200 font-medium"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. From Assessment to Development Plan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow eyebrow--teal">From Assessment to Development Plan</span>
          <h2 className="text-h2 text-white mt-3">
            <Highlight text={ACADEMY_DATA.assessmentToIdp.title} phrase="Immediate." tone="cyan" breakBefore />
          </h2>
          <p className="text-lead text-slate-300 mt-4">{ACADEMY_DATA.assessmentToIdp.sub}</p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {ACADEMY_DATA.assessmentToIdp.steps.map((st, i) => {
            const tone = TONES[1];
            return (
              <li key={st.stepNumber} className="relative">
                {i < 2 && (
                  <span aria-hidden="true" className="hidden md:flex absolute top-9 -right-[1.1rem] z-10 w-7 h-7 rounded-full bg-[#0B1528] border border-white/15 items-center justify-center text-slate-300">
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </span>
                )}
                <ToneCard tone={tone} className="p-6 sm:p-7 h-full">
                  <div className="flex items-center gap-4">
                    <span
                      className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-xl font-bold tabular-nums text-white"
                      style={{ fontFamily: 'var(--font-display)', background: `linear-gradient(135deg, ${tone.color}, ${tone.color}99)`, boxShadow: `0 10px 24px -10px ${tone.color}` }}
                    >
                      {st.stepNumber}
                    </span>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">{st.title}</h3>
                  </div>
                  <p className="mt-4 text-[15px] text-slate-300 leading-relaxed">{st.description}</p>
                  <ul className="mt-5 pt-5 border-t border-white/[0.08] space-y-2.5">
                    {st.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckIcon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: tone.color }} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </ToneCard>
              </li>
            );
          })}
        </ol>
      </section>

      {/* 6. Signature Programmes (Tabs & Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl">
          <span className="eyebrow eyebrow--teal">Signature Programmes</span>
          <h2 className="text-h2 text-white mt-3">
            <Highlight text={ACADEMY_DATA.signatureProgrammes.title} phrase="Exist Anywhere Else" tone="gold" breakBefore />
          </h2>
          <p className="text-lead text-slate-300 mt-4">
            {ACADEMY_DATA.signatureProgrammes.sub}
          </p>
        </div>

        <ScrollRow activeKey={activeCategory} wrapperClassName="sm:w-fit" className="rounded-2xl bg-slate-900/80 border border-white/10">
        <div role="tablist" aria-label="Programme categories" className="flex gap-1.5 p-1.5 w-max">
          {programmeTabs.map((tab) => {
            const count = tab === 'All'
              ? ACADEMY_DATA.signatureProgrammes.programmes.length
              : ACADEMY_DATA.signatureProgrammes.programmes.filter((p) => p.category === tab).length;
            const active = activeCategory === tab;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(tab)}
                className={`shrink-0 whitespace-nowrap inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  active
                    ? 'bg-gradient-to-r from-blue-600/40 to-cyan-500/30 text-white border border-cyan-400/40'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {tab === 'All' ? 'All programmes' : tab}
                <span className={`text-sm tabular-nums px-1.5 rounded-md ${active ? 'bg-white/15' : 'bg-white/5'}`}>{count}</span>
              </button>
            );
          })}
        </div>
        </ScrollRow>

        <div className={`grid ${programmeGrid} gap-6`}>
          {filteredProgrammes.map((prog) => (
            <article
              key={prog.id}
              className={`group relative overflow-hidden rounded-2xl border p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 ${
                singleProgramme ? 'lg:grid lg:grid-cols-12 lg:gap-12' : 'flex flex-col'
              }`}
              style={{ borderColor: PROG_TONE(prog.category).border, background: `linear-gradient(170deg, ${PROG_TONE(prog.category).soft}, rgba(14,24,48,0.6) 55%)` }}
            >
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${PROG_TONE(prog.category).color}, transparent)` }} />
              <div className={singleProgramme ? 'lg:col-span-7' : ''}>
                <span className="text-sm font-semibold px-2.5 py-1 rounded-md inline-block mb-4 border" style={{ color: PROG_TONE(prog.category).color, borderColor: PROG_TONE(prog.category).border, background: PROG_TONE(prog.category).soft }}>
                  {prog.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-cyan-200 transition-colors">
                  {prog.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  {prog.duration} <span aria-hidden="true">|</span> {prog.format}
                </p>
                <p className="mt-4 text-[15px] text-slate-300 leading-relaxed">{prog.description}</p>
              </div>

              <div className={`${singleProgramme ? 'lg:col-span-5 mt-6 lg:mt-0' : 'mt-6 flex-1 flex flex-col'}`}>
                <ul className={`space-y-2.5 pt-5 border-t border-white/[0.07] ${singleProgramme ? 'lg:pt-0 lg:border-t-0' : 'flex-1'}`}>
                  {prog.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                      <CheckIcon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: PROG_TONE(prog.category).color }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onOpenContact(prog.title, `Explore Programme: ${prog.title}`)}
                  className="gradient-btn mt-6 w-full h-12 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-1.5"
                >
                  Explore programme
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Wide Cards: Enterprise Custom Programmes & 40+ Programmes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {ACADEMY_DATA.signatureProgrammes.wideCards.map((wide, idx) => {
            const tone = TONES[0];
            const Icon = idx === 0 ? Building2 : LibraryBig;
            return (
              <ToneCard key={wide.title} tone={tone} className="p-7 sm:p-8">
                <div className="flex h-full flex-col sm:flex-row gap-5">
                  <IconBadge icon={Icon} tone={tone} size="lg" solid />
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">{wide.title}</h3>
                    <p className="mt-2 text-[15px] text-slate-300 leading-relaxed">{wide.description}</p>
                    <button
                      onClick={() => onOpenContact(wide.title, wide.title)}
                      className="mt-6 self-start h-11 px-5 rounded-full border text-sm font-semibold transition-colors inline-flex items-center gap-2 hover:bg-white/5"
                      style={{ borderColor: tone.border, color: tone.color }}
                    >
                      {wide.cta}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </ToneCard>
            );
          })}
        </div>
      </section>

      {/* 7. Delivery Modes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow eyebrow--violet">Delivery Modes</span>
          <h2 className="text-h2 text-white mt-3">
            <Highlight text={ACADEMY_DATA.deliveryModes.title} phrase="Public, On-Demand, Custom" tone="cyan" breakBefore />
          </h2>
          <p className="text-lead text-slate-300 mt-4">{ACADEMY_DATA.deliveryModes.sub}</p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {ACADEMY_DATA.deliveryModes.modes.map((mode, i) => {
            const tone = [TONES[0], TONES[1], TONES[2]][i % 3];
            const Icon = [Users2, PlayCircle, Building2][i % 3];
            return (
              <ToneCard key={mode.name} as="li" tone={tone} className="p-7 sm:p-8 text-center">
                <div className="flex justify-center">
                  <IconBadge icon={Icon} tone={tone} size="lg" solid />
                </div>
                <h3 className="mt-5 text-xl sm:text-2xl font-semibold text-white">{mode.name}</h3>
                <p className="mt-2 text-[15px] text-slate-300 leading-relaxed">{mode.description}</p>
                <ul className="mt-6 pt-5 border-t border-white/[0.08] space-y-2.5 text-left">
                  {mode.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckIcon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: tone.color }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </ToneCard>
            );
          })}
        </ul>
      </section>

      {/* 8. Expert Guidance & Real Opportunity */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow eyebrow--amber">Expert Guidance &amp; Real Opportunity</span>
          <h2 className="text-h2 text-white mt-3">
            <Highlight text={ACADEMY_DATA.guidanceAndOpportunity.title} phrase="Without Opportunity is Theoretical." tone="gold" breakBefore />
          </h2>
          <p className="text-lead text-slate-300 mt-4">{ACADEMY_DATA.guidanceAndOpportunity.sub}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {[
            { block: ACADEMY_DATA.guidanceAndOpportunity.coachNetwork, tone: TONES[0], Icon: GraduationCap, ghost: '500+' },
            { block: ACADEMY_DATA.guidanceAndOpportunity.talentMarketplace, tone: TONES[2], Icon: Briefcase, ghost: '5K+' },
          ].map(({ block, tone, Icon, ghost }) => (
            <ToneCard key={block.headline} tone={tone} className="p-7 sm:p-9">
              <span aria-hidden="true" className="absolute right-4 top-2 text-[5.5rem] sm:text-[7rem] font-extrabold leading-none opacity-[0.08]" style={{ color: tone.color, fontFamily: 'var(--font-display)' }}>
                {ghost}
              </span>
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-4">
                  <IconBadge icon={Icon} tone={tone} size="lg" solid />
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white leading-tight">{block.headline}</h3>
                </div>
                <p className="mt-5 text-[15px] sm:text-base text-slate-300 leading-relaxed">{block.description}</p>
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5">
                  {block.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-slate-200">
                      <CheckIcon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: tone.color }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7 grid grid-cols-2 gap-3">
                  {block.stats.map((st) => (
                    <div key={st.label} className="rounded-xl p-4 text-center border" style={{ borderColor: tone.border, background: 'rgba(7,15,30,0.55)' }}>
                      <p className="text-3xl font-bold tabular-nums" style={{ color: tone.color, fontFamily: 'var(--font-display)' }}>
                        <CountUp value={st.value} />
                      </p>
                      <p className="mt-1 text-sm text-slate-400">{st.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ToneCard>
          ))}
        </div>
      </section>

      {/* 9. Partnerships (Cards + Marquee Wordmarks) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow eyebrow--blue">
            Partnerships
          </span>
          <h2 className="text-h2 text-white mt-3">
            <Highlight text={ACADEMY_DATA.partnerships.title} phrase="Institutions & Corporates" tone="cyan" breakBefore />
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            {ACADEMY_DATA.partnerships.sub}
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {ACADEMY_DATA.partnerships.cards.map((c, i) => {
            const tone = TONES[0];
            const Icon = [Landmark, Building2, Cpu][i % 3];
            return (
              <ToneCard key={c.title} as="li" tone={tone} className="p-7">
                <IconBadge icon={Icon} tone={tone} solid />
                <h3 className="mt-5 text-lg sm:text-xl font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-[15px] text-slate-300 leading-relaxed">{c.description}</p>
              </ToneCard>
            );
          })}
        </ul>

        {/* Partner logos */}
        <div className="py-6 border-y border-white/10">
          <LogoMarquee items={ACADEMY_DATA.partnerships.logos} />
        </div>
      </section>

      {/* 10. CTA Band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CTABand
          headline={ACADEMY_DATA.cta.headline}
          sub={ACADEMY_DATA.cta.sub}
          primaryButtonText={ACADEMY_DATA.cta.primaryBtn}
          onPrimaryClick={() => onOpenContact(undefined, "Start Free Assessment - BlueNXT Academy")}
          secondaryButtonText={ACADEMY_DATA.cta.secondaryBtn}
          secondaryLink="/consulting"
          checks={ACADEMY_DATA.cta.ticker}
        />
      </section>
    </div>
  );
};
