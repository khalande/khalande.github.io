import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HOME_DATA } from '../data/home.ts';
import { StatStrip } from '../components/StatStrip.tsx';
import { ResourceCards } from '../components/ResourceCards.tsx';
import { CTABand } from '../components/CTABand.tsx';
import { NeuralGlowGraphic } from '../components/NeuralGlowGraphic.tsx';
import { VideoBackdrop } from '../components/fx/VideoBackdrop.tsx';
import { HERO_MEDIA, IMAGES } from '../config/media.ts';
import { SmartImage } from '../components/fx/SmartImage.tsx';
import { CountUp } from '../components/fx/CountUp.tsx';
import { VideoShowcase } from '../components/VideoShowcase.tsx';
import { MegaTrends } from '../components/home/MegaTrends.tsx';
import { ShiftsExplorer } from '../components/home/ShiftsExplorer.tsx';
import { ProgressiveImperative } from '../components/home/ProgressiveImperative.tsx';
import { EcosystemStack } from '../components/home/EcosystemStack.tsx';
import { DigitalBuddy } from '../components/home/DigitalBuddy.tsx';
import {
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  GraduationCap,
  Bot,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Brain,
  ShieldCheck,
  Target,
  FileText,
  UserCheck,
  BarChart3,
  HeartPulse,
  Compass,
  Building2,
  Users,
  Globe2,
  Zap
} from 'lucide-react';

interface HomePageProps {
  onOpenContact: (domain?: string, title?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenContact }) => {
  const [activeShift, setActiveShift] = useState(0);

  const getBuddyIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText className="w-5 h-5 text-cyan-400" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-blue-400" />;
      case 'Target': return <Target className="w-5 h-5 text-amber-400" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-cyan-300" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-red-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-blue-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-cyan-400" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="relative space-y-24 sm:space-y-32 pb-20">
      {/* 1. Hero: Bluenxt's hand-and-AI visual, as on the live site */}
      <section className="hero-bleed relative isolate min-h-[92svh] flex items-center pb-20 overflow-hidden">
        <VideoBackdrop media={HERO_MEDIA.home} variant="hero" focus="72% center" opacity={0.95} tint={false} neural />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-6">
            <div className="hero-in inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-sm font-semibold tracking-[0.06em] uppercase backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{HOME_DATA.hero.eyebrow}</span>
            </div>

            <h1 className="text-white" style={{ fontSize: 'clamp(2.6rem, 1.3rem + 3.6vw, 4.1rem)', lineHeight: 1.02, letterSpacing: '-0.035em' }}>
              <span className="line-mask">
                <span style={{ '--d': '120ms' } as React.CSSProperties}>{HOME_DATA.hero.titleLine1}</span>
              </span>
              <span className="line-mask mt-1">
                <span className="gradient-text-live" style={{ '--d': '260ms' } as React.CSSProperties}>
                  {HOME_DATA.hero.titleLine2}
                </span>
              </span>
            </h1>

            <p className="hero-in text-lead text-slate-200 max-w-xl [text-shadow:0_1px_12px_rgba(7,15,30,0.8)]" style={{ '--d': '480ms' } as React.CSSProperties}>
              {HOME_DATA.hero.sub}
            </p>

            <div className="hero-in pt-3 flex flex-wrap items-center gap-3" style={{ '--d': '620ms' } as React.CSSProperties}>
              <button
                onClick={() => onOpenContact(undefined, "Architect the Future with BlueNxt")}
                className="gradient-btn h-13 pl-2 pr-6 py-2 rounded-full text-sm font-semibold text-white inline-flex items-center gap-3"
              >
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center"><Compass className="w-4.5 h-4.5" /></span>
                {HOME_DATA.hero.primaryCta}
              </button>
              <a
                href="#operating-model-shift"
                className="h-13 pl-2 pr-6 py-2 rounded-full bg-[#070F1E]/70 backdrop-blur-md hover:bg-[#0E1830] text-white border border-white/15 text-sm font-semibold transition-colors inline-flex items-center gap-3"
              >
                <span className="w-9 h-9 rounded-full bg-white/[0.07] flex items-center justify-center text-cyan-300"><ArrowRight className="w-4 h-4" /></span>
                {HOME_DATA.hero.secondaryCta}
              </a>
            </div>
          </div>
        </div>

        <a href="#megatrends" aria-label="Scroll to the next section" className="hero-in absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-sm font-medium tracking-[0.2em] uppercase text-slate-400 hover:text-white transition-colors" style={{ '--d': '900ms' } as React.CSSProperties}>
          Scroll
          <span className="w-6 h-10 rounded-full border border-white/25 flex justify-center pt-2"><span className="w-1 h-2 rounded-full bg-cyan-300 float-soft" /></span>
        </a>
      </section>

      {/* 2. Social MegaTrends: brand film behind rolling titles */}
      <div id="megatrends" className="scroll-mt-[var(--header-h)]">
        <MegaTrends taglines={HOME_DATA.socialMegaTrends.taglines} />
      </div>

      {/* 3. The Operating Model Shift */}
      <section id="operating-model-shift" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="eyebrow">
            The Operating Model Shift
          </span>
          <h2 className="text-h2 font-extrabold text-white tracking-tight leading-tight">
            The Operating Model of Work <br />
            <span className="gradient-text">Is Being Rewritten</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {HOME_DATA.operatingModelShift.body}
          </p>

          {/* Pain chips */}
          <div className="pt-2 flex flex-wrap justify-center gap-2">
            {HOME_DATA.operatingModelShift.painChips.map((chip, idx) => (
              <span
                key={idx}
                className="text-sm px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 font-medium"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Three Pillars: Work, Workforce, Workplace */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {HOME_DATA.operatingModelShift.pillars.map((pillar, idx) => {
            const look = [
              { Icon: Building2, color: '#4C8DFF' },
              { Icon: Users, color: '#22D3EE' },
              { Icon: Globe2, color: '#F5B544' },
            ][idx % 3];
            return (
              <div key={pillar.name} className="group relative card-glass card-glass-hover rounded-2xl p-8 text-center overflow-hidden">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${look.color}, transparent)` }} />
                <span aria-hidden="true" className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 0%, ${look.color}22, transparent 60%)` }} />
                <span className="relative mx-auto w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:-translate-y-1" style={{ background: look.color, boxShadow: `0 12px 30px -10px ${look.color}` }}>
                  <look.Icon className="w-7 h-7" />
                </span>
                <h3 className="relative mt-5 text-3xl font-bold text-white">{pillar.name}</h3>
                <p className="relative mt-1 text-sm font-semibold" style={{ color: look.color }}>{pillar.descriptor}</p>
                <p className="relative mt-4 text-[15px] text-slate-400 leading-relaxed">{pillar.summary}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Shifts Redefining the Future of HR: FROM → TO with capability hub */}
      <ShiftsExplorer
        shifts={HOME_DATA.structuralShifts.shifts}
        sub={HOME_DATA.structuralShifts.sub}
        closingLine={HOME_DATA.structuralShifts.closingLine}
        cta={HOME_DATA.structuralShifts.cta}
      />

      {/* 5. The Progressive HR Imperative + stats + ADOPT */}
      <ProgressiveImperative
        title={HOME_DATA.progressiveImperative.title}
        sub={HOME_DATA.progressiveImperative.sub}
        cards={HOME_DATA.progressiveImperative.cards}
        stats={HOME_DATA.progressiveImperative.statStrip}
        adopt={HOME_DATA.adoptBanner}
        onSchedule={() => onOpenContact(undefined, "Schedule an Executive Discovery Call")}
      />

      {/* 6b. Cinematic video showcase: the ecosystem in motion */}
      <VideoShowcase
        title="Watch intelligence flow from strategy to outcomes"
        sub="Strategy sets the direction. Culture and enablers carry it. Workforce architecture delivers it. Infrastructure keeps it governed. Outcomes show up in business terms."
        layers={HOME_DATA.ecosystemLayers.layers}
        onOpenContact={() => onOpenContact(undefined, "Book a Discovery Call")}
      />

      {/* 7. The Workforce Operating Ecosystem™: interactive layers */}
      <EcosystemStack
        title={HOME_DATA.ecosystemLayers.title}
        sub={HOME_DATA.ecosystemLayers.sub}
        centreBadge={HOME_DATA.ecosystemLayers.centreBadge}
        centreSub={HOME_DATA.ecosystemLayers.centreSub}
        layers={HOME_DATA.ecosystemLayers.layers}
      />

      {/* 8. What BlueNxt Offers: proven results + three offerings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow">{HOME_DATA.advantage.eyebrow}</span>
          <h2 className="text-h2 text-white mt-3">
            What Blue<span className="gradient-text">Nxt</span> Offers
          </h2>
          <p className="text-lead text-slate-300 mt-4">Complete HR Operating System &amp; Transformation Partner</p>
        </div>

        {/* Proven Results */}
        <div className="space-y-6">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 text-lg font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              <Sparkles className="w-5 h-5 text-cyan-300" /> Proven Results
            </p>
            <p className="text-sm text-slate-400">The Impact We Create</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {HOME_DATA.advantage.stats.map((stat, i) => {
              const look = [
                { Icon: CheckCircle2, color: '#4C8DFF' },
                { Icon: Zap, color: '#22D3EE' },
                { Icon: Users, color: '#F5B544' },
              ][i % 3];
              return (
                <div
                  key={stat.label}
                  className="relative rounded-2xl p-6 border overflow-hidden"
                  style={{ borderColor: `${look.color}55`, background: `linear-gradient(160deg, ${look.color}1F, rgba(14,24,48,0.6) 60%)` }}
                >
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ color: look.color, borderColor: `${look.color}55`, background: `${look.color}1A` }}>
                    <look.Icon className="w-5 h-5" />
                  </span>
                  <p className="mt-4 text-4xl font-bold tabular-nums" style={{ color: look.color, fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-1 font-semibold text-white">{stat.label}</p>
                  <p className="text-sm text-slate-400">{stat.detail}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center pt-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Our <span className="gradient-text">Offerings</span>
          </h3>
          <p className="mt-2 text-[15px] sm:text-base text-slate-400">{HOME_DATA.advantage.offeringsIntro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {HOME_DATA.advantage.offerings.map((offering, idx) => {
            const image = [IMAGES.offerConsulting, IMAGES.offerPlatforms, IMAGES.offerAcademy][idx];
            const href = ['/consulting', '/platform', '/academy'][idx];
            const span = ['', '', 'md:col-span-2 lg:col-span-1'][idx];
            const preview = offering.domains.slice(0, 3);
            const more = offering.domains.length - preview.length;
            return (
              <article
                key={offering.title}
                className={`group card-glass rounded-3xl overflow-hidden flex flex-col ${span}`}
              >
                <Link to={href} className="relative block h-48 sm:h-64 overflow-hidden" tabIndex={-1} aria-hidden="true">
                  <SmartImage
                    src={image}
                    alt=""
                    wrapperClassName="absolute inset-0"
                    className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1830]/80 via-transparent to-[#070F1E]/40" />
                  <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-full bg-[#070F1E]/75 backdrop-blur-md border border-white/10 text-sm font-semibold text-cyan-200">
                    {offering.badge}
                  </span>
                </Link>
                <div className="flex-1 flex flex-col p-6 sm:p-8 relative">
                  <h3 className="text-2xl sm:text-[1.7rem] font-semibold text-white">
                    <Link to={href} className="hover:text-cyan-200 transition-colors">{offering.title}</Link>
                  </h3>
                  <p className="mt-2 text-[15px] text-slate-300 leading-relaxed">{offering.description}</p>
                  <ul className="mt-5 pt-4 border-t border-white/[0.07] space-y-1 flex-1">
                    {preview.map((item) => (
                      <li key={item.name}>
                        <Link to={item.path} className="block py-2 group/link">
                          <span className="block text-[15px] font-medium text-slate-100 group-hover/link:text-cyan-300 transition-colors">{item.name}</span>
                          <span className="block text-sm text-slate-400">{item.note}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link to={href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:gap-2.5 transition-all">
                    {more > 0 ? `Explore all ${offering.domains.length}` : 'Explore'} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Humans + AI: deep-navy band with photo collage */}
      <section className="relative isolate overflow-hidden py-20 sm:py-28 bg-[#0A1426] border-y border-white/[0.06]">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_20%_50%,rgba(47,107,255,0.16),transparent_70%),radial-gradient(ellipse_40%_50%_at_90%_20%,rgba(34,211,238,0.08),transparent_70%)]" />
        <div aria-hidden="true" className="fx-grid absolute inset-0 -z-10 opacity-60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          {/* Photo collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-6 grid-rows-6 gap-3 sm:gap-4 aspect-[5/4]">
              <SmartImage src={IMAGES.peopleA} alt="HR professional working at a laptop" wrapperClassName="col-span-4 row-span-4 rounded-3xl shadow-2xl ring-1 ring-white/10" />
              <SmartImage src={IMAGES.peopleB} alt="Two colleagues reviewing work together" wrapperClassName="col-span-2 row-span-3 rounded-3xl shadow-2xl ring-1 ring-white/10" />
              <SmartImage src={IMAGES.peopleC} alt="Leadership team in a planning meeting" wrapperClassName="col-start-3 col-span-4 row-span-2 rounded-3xl shadow-2xl ring-1 ring-white/10" />
            </div>
            {/* Floating Digital Buddy chips */}
            <div className="float-soft absolute -right-2 sm:-right-6 top-[46%] flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0E1830]/90 backdrop-blur-md shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] border border-white/10">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2F6BFF] to-[#22D3EE] flex items-center justify-center text-white"><Bot className="w-5 h-5" /></span>
              <span className="text-sm leading-tight">
                <span className="block font-semibold text-white">Job profile drafted</span>
                <span className="block text-slate-400">Ready for your review</span>
              </span>
            </div>
            <div className="float-soft-delay absolute -left-2 sm:-left-6 bottom-[8%] flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#070F1E]/90 backdrop-blur-md border border-amber-300/20 text-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_12px_#F5B544]" />
              <span className="text-sm font-medium">3 roles flagged for skills gaps</span>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 lg:pl-4">
            <span className="eyebrow">Human + AI</span>
            <h2 className="text-h2 mt-3 text-white">
              Your people stay in charge. Their Digital Buddy does the heavy lifting.
            </h2>
            <p className="text-lead mt-5 text-slate-300 max-w-xl">
              Every HR professional is paired with an embedded intelligence layer. People bring judgement, empathy and context. AI brings speed, pattern-finding and round-the-clock availability.
            </p>
            <ul className="mt-8 space-y-5 max-w-xl">
              {[
                { Icon: UserCheck, title: 'Judgement stays human', body: 'Decisions about people are made by people, with better evidence in front of them.' },
                { Icon: Sparkles, title: 'Work moves faster', body: 'Drafting, analysis and routine queries are handled in the flow of work.' },
                { Icon: Layers, title: 'One operating system', body: 'Consulting, platforms and learning connect, so insight turns into action.' },
              ].map(({ Icon, title, body }) => (
                <li key={title} className="flex gap-4">
                  <span className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#2F6BFF]/25 to-[#22D3EE]/10 border border-white/10 text-cyan-300 flex items-center justify-center"><Icon className="w-5 h-5" /></span>
                  <span>
                    <span className="block text-lg font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>{title}</span>
                    <span className="block mt-0.5 text-[15px] text-slate-400 leading-relaxed">{body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#digital-buddy" className="gradient-btn inline-flex items-center gap-2 h-12 px-6 rounded-full text-white text-sm font-semibold">
                Meet the Digital Buddy <ArrowRight className="w-4 h-4" />
              </a>
              <Link to="/platform" className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/15 text-white text-sm font-semibold hover:bg-white/5 transition-colors">
                Explore the platforms
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Experience Digital Buddy */}
      <DigitalBuddy
        data={HOME_DATA.digitalBuddy}
        onTryBuddy={(name) => onOpenContact(name, `Test Drive: ${name}`)}
      />

      {/* 10. CTA Band: Ready to Build the HR of Tomorrow? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CTABand
          image={IMAGES.ctaTeam}
          headline={HOME_DATA.ctaBand.headline}
          sub={HOME_DATA.ctaBand.sub}
          primaryButtonText={HOME_DATA.ctaBand.buttonText}
          onPrimaryClick={() => onOpenContact(undefined, "Schedule a Live Demo of BlueNxt")}
          secondaryButtonText="Experience the Platform"
          secondaryLink="/platform"
          checks={[
            "Live system walkthrough",
            "Customised to your enterprise domain",
            "No obligation"
          ]}
        />
      </section>

      {/* 11. Knowledge Hub Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ResourceCards limit={6} onOpenContact={onOpenContact} />
      </section>
    </div>
  );
};
