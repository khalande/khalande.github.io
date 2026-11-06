import { VideoBackdrop } from '../components/fx/VideoBackdrop.tsx';
import { HERO_MEDIA } from '../config/media.ts';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PLATFORMS_DATA } from '../data/platforms.ts';
import { StatStrip } from '../components/StatStrip.tsx';
import { Marquee } from '../components/Marquee.tsx';
import { CTABand } from '../components/CTABand.tsx';
import { ScrollRow } from '../components/fx/ScrollRow.tsx';
import { Highlight, TONES } from '../components/ui/Highlight.tsx';
import { ToneCard, IconBadge } from '../components/ui/ToneCard.tsx';
import { CountUp } from '../components/fx/CountUp.tsx';
import { StreamText } from '../components/fx/StreamText.tsx';

// Sample questions for the Unified Engine demo (illustrative answers)
const SUGGESTIONS = ['Where are my biggest skills gaps?', 'Who is ready for promotion?', 'Draft a retention plan'];
const ANSWERS: Record<string, string> = {
  'Where are my biggest skills gaps?':
    'Top gaps: data literacy in Finance, people analytics in HRBPs, and AI fluency in middle management. Suggested: 3 Academy pathways and 2 internal gig assignments.',
  'Who is ready for promotion?':
    '14 employees meet the success profile for their next role. 5 are high-flight-risk: prioritise their calibration this cycle.',
  'Draft a retention plan':
    'Draft ready: targeted pay review for 3 critical roles, mobility offers for 6 high performers, and manager check-ins scheduled in the flow of work.',
};
import { Clock3, Shuffle, PiggyBank, SlidersHorizontal, ShieldCheck as ShieldIcon, Timer, BadgeCheck, Zap as ZapIcon } from 'lucide-react';
import { MessagesSquare, Bot as BotIcon, TrendingUp as TrendIcon, Plug, Radar, Workflow } from 'lucide-react';

const Bot = BotIcon;
const TrendingUp = TrendIcon;

// One colour per platform, used in the tab bar
const PLATFORM_TONES: Record<string, { color: string; soft: string; border: string }> = {
  inhrsight: TONES[0],
  orbit: TONES[1],
  talentxler: TONES[2],
  achievhr: TONES[3],
  oneclickhr: TONES[4],
  pioneers: { color: '#F472B6', soft: 'rgba(244,114,182,0.12)', border: 'rgba(244,114,182,0.4)' },
};
import {
  Sparkles,
  ArrowRight,
  Send,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Terminal,
  Cpu
} from 'lucide-react';

interface PlatformsPageProps {
  onOpenContact: (domain?: string, title?: string) => void;
}

export const PlatformsPage: React.FC<PlatformsPageProps> = ({ onOpenContact }) => {
  const { hash, key } = useLocation();
  const [activePlatformId, setActivePlatformId] = useState('inhrsight');

  // Menu links like /platform#talentxler open that platform in the switcher
  useEffect(() => {
    const id = hash.replace('#', '');
    if (!id || !PLATFORMS_DATA.suite.platforms.some((p) => p.id === id)) return;
    setActivePlatformId(id);
    requestAnimationFrame(() =>
      document.getElementById('platform-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
    // `key` changes on every click, so choosing the platform already in the URL still scrolls
  }, [hash, key]);
  const [chatMessage, setChatMessage] = useState('');
  const INTRO = [
    { sender: 'user', text: 'Who are my top engineers at risk of leaving in Q3?' },
    {
      sender: 'assistant',
      text: 'Analysis complete across 4 regional hubs: 3 senior engineers show elevated flight risk due to market comp discrepancies and low project mobility indices. Recommended action: Trigger internal mobility path & equity benchmark.'
    }
  ];
  const [chatHistory, setChatHistory] = useState<{ sender: string; text: string }[]>([]);
  const [typing, setTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Play the opening exchange once the chat scrolls into view
  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setChatHistory(INTRO);
      return;
    }
    const timers: number[] = [];
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      timers.push(window.setTimeout(() => setChatHistory([INTRO[0]]), 300));
      timers.push(window.setTimeout(() => setTyping(true), 900));
      timers.push(window.setTimeout(() => { setTyping(false); setChatHistory(INTRO); }, 2600));
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(window.clearTimeout); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the newest message in view
  useEffect(() => {
    const l = listRef.current;
    if (l) l.scrollTo({ top: l.scrollHeight, behavior: 'smooth' });
  }, [chatHistory, typing]);

  const activePlatform = PLATFORMS_DATA.suite.platforms.find(p => p.id === activePlatformId) 
    || PLATFORMS_DATA.suite.platforms[0];

  const ask = (text: string) => {
    if (!text.trim() || typing) return;
    setChatHistory(prev => [...prev, { sender: 'user', text }]);
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setChatHistory(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: ANSWERS[text] ?? `BlueNxt intelligence query dispatched across 6 platforms for: "${text}". Model recommends deploying targeted skills reallocation & checking manager engagement index.`
        }
      ]);
    }, 1800);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const userText = chatMessage;
    setChatMessage('');
    ask(userText);
  };

  return (
    <div className="relative space-y-24 sm:space-y-32 pb-20">
      {/* 1. Hero Section */}
      <section className="hero-bleed relative isolate pt-12 pb-16 overflow-hidden">
        <VideoBackdrop media={HERO_MEDIA.platform} variant="subtle" focus="center" neural scanline />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-sm font-semibold tracking-[0.06em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{PLATFORMS_DATA.hero.eyebrow}</span>
          </div>

          <h1 className="text-display font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            {PLATFORMS_DATA.hero.h1Line1} <br />
            {PLATFORMS_DATA.hero.h1Line2}{' '}
            <span className="gradient-text-live">{PLATFORMS_DATA.hero.h1Line3}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {PLATFORMS_DATA.hero.sub}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenContact(undefined, "Experience the BlueNxt AI Platform")}
              className="gradient-btn px-8 py-3.5 rounded-full text-sm font-bold text-white tracking-wide shadow-xl hover:shadow-cyan-500/25 inline-flex items-center gap-2"
            >
              <span>{PLATFORMS_DATA.hero.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Stats */}
          <div className="pt-6">
            <StatStrip stats={PLATFORMS_DATA.hero.stats} />
          </div>

          {/* Platform chips */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {PLATFORMS_DATA.hero.platformChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const targetId = chip.toLowerCase().replace(' ', '');
                  const match = PLATFORMS_DATA.suite.platforms.find(p => p.id === targetId || p.name.toLowerCase() === chip.toLowerCase());
                  if (match) setActivePlatformId(match.id);
                  const el = document.getElementById('platform-suite');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-sm font-semibold text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. The Design Philosophy (C-A-P-E) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow eyebrow--violet">Design Philosophy</span>
          <h2 className="text-h2 text-white mt-3">
            <Highlight text={PLATFORMS_DATA.designPhilosophy.title} phrase="How HR Technology Works." tone="gold" breakBefore />
          </h2>
          <p className="text-lead text-slate-300 mt-5">{PLATFORMS_DATA.designPhilosophy.body}</p>
        </div>

        <figure className="relative max-w-4xl mx-auto text-center px-6 py-8 sm:py-10">
          <span aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 -top-2 text-[7rem] leading-none text-gold-blue opacity-60 select-none" style={{ fontFamily: 'var(--font-display)' }}>&ldquo;</span>
          <blockquote className="relative text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-snug" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            <Highlight text={PLATFORMS_DATA.designPhilosophy.quote} phrase="unstoppable in its intelligence." tone="cyan" />
          </blockquote>
        </figure>

        {/* C · A · P · E */}
        <div className="relative">
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PLATFORMS_DATA.designPhilosophy.capeGrid.map((item, i) => {
              const tone = [TONES[0], TONES[1], TONES[2], TONES[3]][i % 4];
              const Icon = [MessageSquare, Bot, TrendingUp, Plug][i % 4];
              return (
                <li key={item.letter} className="group relative">
                  {/* Dot with connector segments on the same row, so the line always runs through its centre */}
                  <div aria-hidden="true" className="hidden lg:flex items-center mb-5">
                    <span
                      className={`flex-1 h-[2px] -ml-[10px] ${i === 0 ? 'invisible' : ''}`}
                      style={{ background: `linear-gradient(90deg, ${[TONES[0], TONES[1], TONES[2], TONES[3]][(i + 3) % 4].color}66, ${tone.color}aa)` }}
                    />
                    <span className="relative shrink-0 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center bg-[#070F1E]" style={{ borderColor: tone.color }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: tone.color, boxShadow: `0 0 10px ${tone.color}` }} />
                    </span>
                    <span
                      className={`flex-1 h-[2px] -mr-[10px] ${i === 3 ? 'invisible' : ''}`}
                      style={{ background: `linear-gradient(90deg, ${tone.color}aa, ${[TONES[0], TONES[1], TONES[2], TONES[3]][(i + 1) % 4].color}66)` }}
                    />
                  </div>
                  <div
                    className="relative h-full rounded-2xl p-6 sm:p-7 border overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5"
                    style={{ borderColor: tone.border, background: `linear-gradient(170deg, ${tone.soft}, rgba(14,24,48,0.55) 55%)` }}
                  >
                    <span aria-hidden="true" className="absolute -right-3 -top-6 text-[8.5rem] font-extrabold leading-none opacity-[0.13] transition-transform duration-700 group-hover:scale-110" style={{ color: tone.color, fontFamily: 'var(--font-display)' }}>
                      {item.letter}
                    </span>
                    <div className="relative flex items-center gap-3">
                      <span className="text-5xl font-extrabold leading-none" style={{ color: tone.color, fontFamily: 'var(--font-display)', textShadow: `0 0 30px ${tone.color}66` }}>
                        {item.letter}
                      </span>
                      <span className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ color: tone.color, borderColor: tone.border, background: tone.soft }}>
                        <Icon className="w-5 h-5" />
                      </span>
                    </div>
                    <h3 className="relative mt-5 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="relative mt-2 text-[15px] text-slate-300 leading-relaxed">{item.description}</p>
                    <span aria-hidden="true" className="absolute inset-x-6 bottom-0 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: tone.color }} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <p className="text-[15px] sm:text-base text-slate-400 text-center max-w-3xl mx-auto leading-relaxed">
          {PLATFORMS_DATA.designPhilosophy.closing}
        </p>
      </section>

      {/* Infinite Marquee */}
      <section className="border-y border-white/10 bg-[#070D18]">
        <Marquee items={PLATFORMS_DATA.marqueeItems} />
      </section>

      {/* 3. The Platform Suite (Tabs + Active Platform View) */}
      <section id="platform-suite" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl">
          <span className="eyebrow eyebrow--teal">
            Workforce Operating Stack
          </span>
          <h2 className="text-h2 text-white mt-3">
            One <span className="text-cyan-blue">Intelligence.</span>
            <br />
            <span className="text-spectrum">Multiple AI Platforms.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            {PLATFORMS_DATA.suite.sub}
          </p>
        </div>

        {/* Platform Tabs */}
        <div id="platform-tabs">
        <ScrollRow activeKey={activePlatformId} wrapperClassName="lg:w-fit" className="rounded-2xl bg-slate-900/80 border border-white/10">
        <div role="tablist" aria-label="AI platforms" className="flex flex-wrap lg:flex-nowrap gap-1.5 p-1.5 lg:w-max">
          {PLATFORMS_DATA.suite.platforms.map((plat) => (
            <button
              key={plat.id}
              role="tab"
              aria-selected={activePlatformId === plat.id}
              onClick={() => setActivePlatformId(plat.id)}
              className={`shrink-0 whitespace-nowrap inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                activePlatformId === plat.id ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'
              }`}
              style={
                activePlatformId === plat.id
                  ? { borderColor: PLATFORM_TONES[plat.id]?.border, background: PLATFORM_TONES[plat.id]?.soft, boxShadow: `0 8px 24px -12px ${PLATFORM_TONES[plat.id]?.color}` }
                  : undefined
              }
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: PLATFORM_TONES[plat.id]?.color, boxShadow: activePlatformId === plat.id ? `0 0 10px ${PLATFORM_TONES[plat.id]?.color}` : undefined }} />
              <span>{plat.name}</span>
              <span className="hidden sm:inline text-sm font-medium text-cyan-300/80 ml-1.5">
                {plat.tagline}
              </span>
            </button>
          ))}
        </div>
        </ScrollRow>
        </div>

        {/* Active Platform Detail Card */}
        <div className="card-glass p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-sm font-mono font-bold text-cyan-400 px-3 py-1 rounded bg-cyan-400/10 border border-cyan-400/20 inline-block mb-3">
                  {activePlatform.name} · {activePlatform.tagline}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                  {activePlatform.headline}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {activePlatform.description}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {activePlatform.metrics.map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 text-center">
                    <div className="text-xl sm:text-2xl font-mono font-bold gradient-text">
                      {m.value}
                    </div>
                    <div className="text-[13px] font-bold text-slate-400 tracking-wider mt-1 uppercase">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Core capabilities */}
              <div className="space-y-2 pt-2">
                <span className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Core Capabilities
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-300">
                  {activePlatform.coreCapabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Cards: ◎, ◈, ⬡ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {activePlatform.featureCards.map((feat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-white/5 flex flex-col justify-between">
                    <div>
                      <span className="text-cyan-400 text-base font-bold block mb-1">{feat.symbol}</span>
                      <h5 className="text-sm font-bold text-white mb-1">{feat.title}</h5>
                      <p className="text-[13px] text-slate-400 leading-snug">{feat.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenContact(activePlatform.name, `Request Demo: ${activePlatform.name}`)}
                  className="gradient-btn px-6 py-2.5 rounded-full text-sm font-bold text-white tracking-wide shadow-lg inline-flex items-center gap-2"
                >
                  <span>REQUEST A DEMO</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Side: Animated Mock Dashboard */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-cyan-400/30 bg-[#070F1E] p-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span className="text-sm font-mono font-bold text-slate-200">
                      {activePlatform.liveViewLabel}
                    </span>
                  </div>
                  <span className="text-[13px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    Connected
                  </span>
                </div>

                <div className="py-6 space-y-4">
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/5 text-sm font-mono text-slate-300">
                    <span className="text-cyan-400 block text-[13px] uppercase mb-1">Natural Language Query</span>
                    &gt; &ldquo;{activePlatform.querySample}&rdquo;
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-2">
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>Model Confidence</span>
                      <span className="text-cyan-400 font-mono">98.4%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="w-[98%] h-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                    </div>
                    <div className="flex justify-between text-[13px] text-slate-500 pt-1">
                      <span>Telemetry: 30K+ Skills Mapped</span>
                      <span>Latency: 180ms</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-sm text-slate-300 space-y-1">
                    <span className="font-bold text-cyan-300 block">Synthesized Intelligence Output:</span>
                    <p className="text-[13px] text-slate-400">
                      Instant scenario run complete. 4 tactical intervention options generated with projected retention delta of +24%.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[13px] font-mono text-slate-500">
                  <span>SYSTEM: SOC 2 TYPE II</span>
                  <span className="text-cyan-400 font-bold">ALWAYS ON</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Intelligence Layer (Cards + Interactive Chat Mock) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl">
          <span className="eyebrow">
            Unified Engine
          </span>
          <h2 className="text-h2 font-extrabold text-white tracking-tight mt-1">
            {PLATFORMS_DATA.intelligenceLayer.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            {PLATFORMS_DATA.intelligenceLayer.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Cards */}
          <ul className="lg:col-span-6 card-glass rounded-2xl border border-white/10 divide-y divide-white/[0.07] overflow-hidden">
            {PLATFORMS_DATA.intelligenceLayer.cards.map((card, idx) => {
              const Icon = [MessagesSquare, Radar, Workflow, Bot][idx % 4];
              return (
                <li key={card.title} className="group relative flex gap-5 p-6 sm:p-7 transition-colors hover:bg-white/[0.03]">
                  <span aria-hidden="true" className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full bg-gradient-to-b from-[#22D3EE] to-[#2F6BFF] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                  <span className="shrink-0 w-12 h-12 rounded-xl border border-cyan-400/30 bg-cyan-400/[0.06] text-cyan-300 flex items-center justify-center transition-colors group-hover:border-cyan-300/60 group-hover:text-cyan-200">
                    <Icon className="w-6 h-6" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{card.title}</h4>
                    <p className="mt-1.5 text-[15px] text-slate-400 leading-relaxed">{card.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Interactive Chat Mock */}
          <div ref={chatRef} className="lg:col-span-6 card-glass p-6 rounded-2xl border border-cyan-400/30 flex flex-col justify-between bg-gradient-to-b from-[#0E1830] to-[#0a1220]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <div>
                    <span className="text-sm font-bold text-white block">BlueNxt AI Assistant</span>
                    <span className="text-[13px] text-slate-400">Online · Thinking across 6 platforms</span>
                  </div>
                </div>
                <span className="text-[13px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                  TALENT SOURCING · Live Session
                </span>
              </div>

              <div ref={listRef} className="py-4 space-y-3 h-64 overflow-y-auto [scrollbar-width:thin]" aria-live="polite">
                {chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`${msg.sender === 'user' ? 'chat-in-right ml-auto bg-blue-600/30 text-white border border-blue-500/30 rounded-br-md' : 'chat-in-left bg-slate-900/80 text-slate-200 border border-white/10 rounded-bl-md'} p-3 rounded-xl text-sm leading-relaxed max-w-[88%]`}
                  >
                    {msg.sender === 'assistant' && idx === chatHistory.length - 1 ? <StreamText text={msg.text} /> : msg.text}
                  </div>
                ))}
                {typing && (
                  <div className="chat-in-left space-y-2" aria-label="Assistant is thinking">
                    <div className="inline-flex items-center gap-1 px-3.5 py-3 rounded-xl rounded-bl-md bg-slate-900/80 border border-white/10">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="w-1.5 h-1.5 rounded-full bg-cyan-300/80 animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5" aria-hidden="true">
                      {PLATFORMS_DATA.suite.platforms.map((pl, i) => (
                        <span key={pl.id} className="chat-scan px-2 py-0.5 rounded-md border border-white/10 text-[13px] text-slate-400" style={{ animationDelay: `${i * 180}ms` }}>
                          {pl.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex gap-1.5 overflow-x-auto [scrollbar-width:none]" aria-label="Suggested questions">
              {SUGGESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled={typing}
                  onClick={() => ask(q)}
                  className="shrink-0 px-3 py-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/[0.06] text-sm text-cyan-100 hover:bg-cyan-400/15 hover:border-cyan-300/50 transition-colors disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="pt-3 flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask anything about your workforce..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)] transition-shadow"
              />
              <button
                type="submit"
                className="gradient-btn px-4 py-2 rounded-xl text-sm font-semibold text-white inline-flex items-center gap-1"
              >
                <span>Ask</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 5. Measurable Impact: Proven Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow eyebrow--green">Proven Metrics</span>
          <h2 className="text-h2 text-white mt-3">
            <Highlight text={PLATFORMS_DATA.measurableImpact.title} phrase="Delivers Results" tone="gold" />
          </h2>
          <p className="text-lead text-slate-300 mt-4">{PLATFORMS_DATA.measurableImpact.sub}</p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PLATFORMS_DATA.measurableImpact.counters.map((m, i) => {
            const tone = TONES[i % TONES.length];
            const Icon = [ZapIcon, Clock3, Shuffle, PiggyBank][i % 4];
            const pct = m.value.endsWith('%') ? parseFloat(m.value) : Math.min(100, parseFloat(m.value) * 20);
            return (
              <ToneCard key={m.label} as="li" tone={tone} className="p-6 sm:p-7">
                <div className="flex items-start justify-between">
                  <IconBadge icon={Icon} tone={tone} solid />
                  <span className="text-sm font-semibold text-slate-400">0{i + 1}</span>
                </div>
                <p className="mt-6 text-5xl font-bold tabular-nums leading-none" style={{ color: tone.color, fontFamily: 'var(--font-display)', letterSpacing: '-0.035em', textShadow: `0 0 30px ${tone.color}55` }}>
                  <CountUp value={m.value} />
                </p>
                <p className="mt-3 text-base font-semibold text-white">{m.label}</p>
                <div className="mt-4 h-1.5 rounded-full bg-white/[0.07] overflow-hidden" aria-hidden="true">
                  <span className="meter-fill block h-full rounded-full origin-left" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${tone.color}88, ${tone.color})`, animationDelay: `${300 + i * 150}ms` }} />
                </div>
                <p className="mt-4 text-sm text-slate-400 leading-relaxed">{m.detail}</p>
              </ToneCard>
            );
          })}
        </ul>
      </section>

      {/* 6. Deployment & Integration: Rapid Implementation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow">Rapid Implementation</span>
          <h2 className="text-h2 text-white mt-3">
            <Highlight text={PLATFORMS_DATA.deployment.title} phrase="Running Forever." tone="cyan" />
          </h2>
          <p className="text-lead text-slate-300 mt-4">{PLATFORMS_DATA.deployment.sub}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {PLATFORMS_DATA.deployment.points.map((pt, i) => {
              const Icon = [SlidersHorizontal, Plug, MessagesSquare, ShieldIcon][i % 4];
              return (
                <li key={pt.number} className="group card-glass card-glass-hover rounded-2xl border border-white/10 p-6 sm:p-7 flex flex-col">
                  <div className="flex items-start justify-between">
                    <span className="w-11 h-11 rounded-xl border border-cyan-400/30 bg-cyan-400/[0.06] text-cyan-300 flex items-center justify-center">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </span>
                    <span
                      className="text-4xl font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgba(148,180,255,0.35)] group-hover:[-webkit-text-stroke:1px_rgba(34,211,238,0.8)] transition-all"
                      style={{ fontFamily: 'var(--font-display)' }}
                      aria-hidden="true"
                    >
                      {pt.number}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white leading-snug">{pt.title}</h3>
                  <p className="mt-2 text-[15px] text-slate-400 leading-relaxed">{pt.description}</p>
                </li>
              );
            })}
          </ul>

          {/* Deployment timeline */}
          <div className="lg:col-span-4 card-glass rounded-2xl border border-cyan-400/25 p-7 sm:p-8 flex flex-col">
            <p className="flex items-center gap-2.5 pb-5 border-b border-white/10 text-sm font-semibold uppercase tracking-[0.12em] text-cyan-300">
              <Timer className="w-4 h-4" /> Typical deployment timeline
            </p>
            <ol className="relative mt-7 space-y-7 pl-9">
              <span aria-hidden="true" className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/70 to-cyan-400/10" />
              {PLATFORMS_DATA.deployment.timelineCard.steps.map((st, i) => (
                <li key={st.label} className="relative">
                  <span aria-hidden="true" className="absolute -left-9 top-0.5 w-6 h-6 rounded-full border-2 border-cyan-400/60 bg-[#070F1E] flex items-center justify-center">
                    <span className={`w-2 h-2 rounded-full bg-cyan-300 ${i === 0 ? 'animate-pulse' : ''}`} />
                  </span>
                  <span className="text-sm font-bold tracking-wide text-cyan-200">{st.time}</span>
                  <p className="mt-1 text-base font-semibold text-white">{st.label}</p>
                </li>
              ))}
            </ol>
            <ul className="mt-auto pt-7 grid grid-cols-2 gap-2.5">
              {PLATFORMS_DATA.deployment.trustBadges.map((badge) => (
                <li key={badge.name} className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-3">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                    <BadgeCheck className="w-4 h-4 shrink-0 text-cyan-300" /> {badge.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-slate-400">{badge.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. CTA Band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CTABand
          eyebrow={PLATFORMS_DATA.cta.eyebrow}
          headline={PLATFORMS_DATA.cta.title}
          sub={PLATFORMS_DATA.cta.sub}
          primaryButtonText={PLATFORMS_DATA.cta.primaryBtn}
          onPrimaryClick={() => onOpenContact(undefined, "Book an Enterprise AI Platform Demo")}
          secondaryButtonText={PLATFORMS_DATA.cta.secondaryBtn}
          secondaryLink="/consulting"
          checks={PLATFORMS_DATA.cta.checks}
        />
      </section>
    </div>
  );
};
