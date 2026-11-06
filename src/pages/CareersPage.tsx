import React, { useState } from 'react';
import { ArrowRight, Briefcase, Globe2, GraduationCap, Layers, MapPin, Rocket, Clock } from 'lucide-react';
import { VideoBackdrop } from '../components/fx/VideoBackdrop.tsx';
import { HERO_MEDIA } from '../config/media.ts';
import { CONTACT_EMAIL } from '../config/site.ts';
import { DraftNotice } from '../components/DraftNotice.tsx';
import { ScrollRow } from '../components/fx/ScrollRow.tsx';

interface CareersPageProps {
  onOpenContact: (domain?: string, title?: string) => void;
}

// Sample roles: replace with real openings (or connect a jobs board) before launch.
const ROLES = [
  { title: 'Senior Consultant, HR Transformation', team: 'Consulting', location: 'Dubai, UAE', type: 'Full-time', summary: 'Lead operating-model and work-architecture engagements with CHROs and their teams.' },
  { title: 'Workforce Analytics Lead', team: 'Platforms', location: 'Mumbai, India (hybrid)', type: 'Full-time', summary: 'Turn workforce data into decisions, and shape how InHRsight presents intelligence to leaders.' },
  { title: 'AI Product Manager, HR Platforms', team: 'Platforms', location: 'Remote', type: 'Full-time', summary: 'Own the roadmap for Digital Buddy capabilities used by HR professionals every day.' },
  { title: 'Learning Experience Designer', team: 'Academy', location: 'Bengaluru, India', type: 'Full-time', summary: 'Design immersive, skills-based programmes that change how HR professionals work.' },
  { title: 'Full-stack Engineer', team: 'Platforms', location: 'Remote', type: 'Full-time', summary: 'Build the products behind the Workforce Operating Ecosystem™, from data layer to interface.' },
  { title: 'Business Development Manager', team: 'Growth', location: 'Johannesburg, South Africa', type: 'Full-time', summary: 'Open new enterprise relationships across Southern Africa.' },
];

const REASONS = [
  { Icon: Rocket, title: 'Work on what’s next', body: 'Help define a new category, ConsulTech, rather than repeat what consulting has always done.' },
  { Icon: Layers, title: 'One team, three disciplines', body: 'Consultants, technologists and learning designers work side by side on the same clients.' },
  { Icon: GraduationCap, title: 'Keep learning', body: 'Full access to BlueNXT Academy programmes, coaching and certifications.' },
  { Icon: Globe2, title: 'Work across regions', body: 'Collaborate with clients and colleagues in the UAE, India and South Africa.' },
];

const PROCESS = [
  { title: 'Apply', body: 'Send your application or CV. We read every one.' },
  { title: 'First conversation', body: 'A 30-minute call about your experience and what you are looking for.' },
  { title: 'Case discussion', body: 'Work through a real-world problem with the team you would join.' },
  { title: 'Meet the founders', body: 'A conversation about values, ambition and how we work.' },
];

export const CareersPage: React.FC<CareersPageProps> = ({ onOpenContact }) => {
  const teams = ['All teams', ...Array.from(new Set(ROLES.map((r) => r.team)))];
  const [team, setTeam] = useState('All teams');
  const roles = ROLES.filter((r) => team === 'All teams' || r.team === team);

  return (
    <div className="relative space-y-24 sm:space-y-32 pb-24">
      {/* Hero */}
      <section className="hero-bleed relative isolate overflow-hidden pb-16 text-center">
        <VideoBackdrop media={HERO_MEDIA.careers} variant="subtle" focus="center 40%" scanline />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="eyebrow">Careers at Bluenxt</span>
          <h1 className="text-display text-white">Help build the future of HR</h1>
          <p className="text-lead text-slate-300 max-w-2xl mx-auto">
            We bring together HR consultants, technologists and learning designers to change how organisations work. If that sounds like your kind of problem, we’d like to meet you.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <a href="#open-roles" className="gradient-btn h-12 px-6 rounded-full text-sm font-semibold text-white inline-flex items-center gap-2">
              See open roles <ArrowRight className="w-4 h-4" />
            </a>
            <a href={`mailto:${CONTACT_EMAIL}?subject=Careers`} className="h-12 px-6 rounded-full border border-white/15 text-sm font-semibold text-white inline-flex items-center hover:bg-white/5 transition-colors">
              Send us your CV
            </a>
          </div>
        </div>
      </section>

      {/* Why join */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl">
          <span className="eyebrow">Why join us</span>
          <h2 className="text-h2 text-white mt-3">Do the most meaningful work of your career</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REASONS.map(({ Icon, title, body }) => (
            <div key={title} className="card-glass rounded-2xl p-6">
              <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2F6BFF]/25 to-[#22D3EE]/10 border border-white/10 flex items-center justify-center text-cyan-300">
                <Icon className="w-5 h-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-[15px] text-slate-400 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open roles */}
      <section id="open-roles" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Open roles</span>
            <h2 className="text-h2 text-white mt-3">Current openings</h2>
          </div>
          <ScrollRow activeKey={team} className="rounded-2xl bg-slate-900/80 border border-white/10">
            <div role="tablist" aria-label="Filter by team" className="flex gap-1.5 p-1.5 w-max">
              {teams.map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={team === t}
                  onClick={() => setTeam(t)}
                  className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-colors border ${
                    team === t ? 'bg-gradient-to-r from-blue-600/40 to-cyan-500/30 text-white border-cyan-400/40' : 'text-slate-400 hover:text-white border-transparent'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </ScrollRow>
        </div>

        <DraftNotice>These are sample roles. Replace them with real openings in <code>src/pages/CareersPage.tsx</code>.</DraftNotice>

        <ul className="space-y-3">
          {roles.map((r) => (
            <li key={r.title} className="card-glass card-glass-hover rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-white">{r.title}</h3>
                <p className="mt-1.5 text-[15px] text-slate-400">{r.summary}</p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate-400">
                  <span className="inline-flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-cyan-300" />{r.team}</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4 text-cyan-300" />{r.location}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4 text-cyan-300" />{r.type}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpenContact(undefined, `Apply: ${r.title}`)}
                className="shrink-0 self-start md:self-auto h-11 px-5 rounded-full border border-cyan-400/40 text-sm font-semibold text-cyan-200 hover:bg-cyan-400/10 transition-colors inline-flex items-center gap-2"
              >
                Apply <ArrowRight className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl">
          <span className="eyebrow">How we hire</span>
          <h2 className="text-h2 text-white mt-3">A clear, respectful process</h2>
          <p className="text-lead text-slate-300 mt-4">Most candidates hear back within two weeks of applying.</p>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS.map((p, i) => (
            <li key={p.title} className="card-glass rounded-2xl p-6">
              <span className="text-4xl font-bold gradient-text tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
                0{i + 1}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-1.5 text-[15px] text-slate-400 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Open application */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="beam-border relative card-glass rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-h2 text-white">Don’t see the right role?</h2>
          <p className="text-lead text-slate-300 mt-4 max-w-xl mx-auto">
            We’re always glad to hear from people who want to change how HR works. Tell us what you’d bring.
          </p>
          <a href={`mailto:${CONTACT_EMAIL}?subject=Open application`} className="gradient-btn mt-8 h-12 px-6 rounded-full text-sm font-semibold text-white inline-flex items-center gap-2">
            Send an open application <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
};
