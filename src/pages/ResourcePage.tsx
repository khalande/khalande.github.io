import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Headphones, Play, User } from 'lucide-react';
import { RESOURCES, findResource, resourceSlug } from '../data/resources.ts';
import { IMAGES } from '../config/media.ts';
import { SmartImage } from '../components/fx/SmartImage.tsx';
import { DraftNotice } from '../components/DraftNotice.tsx';
import { NotFoundPage } from './NotFoundPage.tsx';

interface ResourcePageProps {
  onOpenContact: (domain?: string, title?: string) => void;
}

const COVERS = [IMAGES.offerConsulting, IMAGES.peopleC, IMAGES.offerPlatforms, IMAGES.peopleB, IMAGES.offerAcademy, IMAGES.peopleA];

type Block = { heading: string; body: string[]; points?: string[] };

/** Sample write-ups by type. Replace with the real content before launch. */
function contentFor(type: string, title: string, description: string): Block[] {
  if (type === 'Case Study') {
    return [
      {
        heading: 'The challenge',
        body: [
          'The organisation had grown faster than its HR operating model. Roles were defined by legacy job descriptions, workforce data sat in disconnected systems, and leaders were making people decisions on quarterly reports that were already out of date.',
          'HR was spending most of its time on administration, with little capacity left for the strategic work the business was asking for.',
        ],
      },
      {
        heading: 'Our approach',
        body: ['Bluenxt worked as one integrated team across consulting, platforms and learning:'],
        points: [
          'Consulting: redesigned work architecture around skills and outcomes, not static roles.',
          'Platforms: connected workforce data into a single intelligence layer with real-time dashboards.',
          'Academy: built the HR team’s capability to run the new model without ongoing dependency.',
        ],
      },
      {
        heading: 'The outcome',
        body: [
          description,
          'Just as importantly, the new way of working became part of how the organisation operates day to day, so the gains held after the engagement ended.',
        ],
      },
    ];
  }
  if (type === 'Podcast') {
    return [
      {
        heading: 'Episode overview',
        body: [
          description,
          'In this conversation, senior HR leaders share how they are moving from job-based to skills-based organisations, what has worked, and what they would do differently.',
        ],
      },
      {
        heading: 'Topics covered',
        body: [],
        points: [
          'Why job descriptions are giving way to skills profiles',
          'Building a skills taxonomy people actually use',
          'Internal mobility and talent marketplaces in practice',
          'Where AI helps, and where human judgement must stay in charge',
        ],
      },
    ];
  }
  return [
    {
      heading: 'Introduction',
      body: [
        description,
        'HR has spent decades optimising processes designed for a different era. The organisations pulling ahead now treat HR as an operating system for the enterprise: always on, data-driven and built around skills.',
      ],
    },
    {
      heading: 'Key ideas',
      body: [],
      points: [
        'Work is being redesigned around skills and outcomes, not fixed roles.',
        'Intelligence is moving from annual reports to real-time decision support.',
        'Every HR professional can be paired with AI that takes on routine analysis and drafting.',
        'Capability-building has to be continuous, not a one-off programme.',
      ],
    },
    {
      heading: 'What this means for HR leaders',
      body: [
        'Start with the operating model, not the technology. Decide what decisions HR needs to make faster and better, then design the data, platforms and skills to support them.',
        `“${title}” is part of the Bluenxt Knowledge Hub. Talk to our team to explore how these ideas apply to your organisation.`,
      ],
    },
  ];
}

export const ResourcePage: React.FC<ResourcePageProps> = ({ onOpenContact }) => {
  const { slug = '' } = useParams();
  const item = findResource(slug);
  if (!item) return <NotFoundPage />;

  const index = RESOURCES.indexOf(item);
  const blocks = contentFor(item.type, item.title, item.description);
  const related = RESOURCES.filter((r) => r !== item).sort((a, b) => Number(b.type === item.type) - Number(a.type === item.type)).slice(0, 3);
  const isPodcast = item.type === 'Podcast';

  return (
    <div className="pb-24">
      {/* Header */}
      <section className="hero-bleed relative isolate overflow-hidden pb-14">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_60%_at_70%_20%,rgba(47,107,255,0.22),transparent_70%)]" />
        <div aria-hidden="true" className="fx-grid absolute inset-0 -z-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/resources" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Resources &amp; insights
          </Link>
          <p className="mt-8">
            <span className="eyebrow">{item.type}</span>
          </p>
          <h1 className="text-display text-white mt-4" style={{ fontSize: 'clamp(2.1rem, 1.4rem + 3vw, 3.6rem)' }}>
            {item.title}
          </h1>
          <p className="text-lead text-slate-300 mt-5 max-w-2xl">{item.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2"><User className="w-4 h-4" /> {item.author}</span>
            <span className="inline-flex items-center gap-2">{isPodcast ? <Headphones className="w-4 h-4" /> : <Clock className="w-4 h-4" />} {item.meta}</span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <DraftNotice>
          Sample {item.type.toLowerCase()} content. Replace it with the real {isPodcast ? 'episode' : 'write-up'} in <code>src/pages/ResourcePage.tsx</code> before launch.
        </DraftNotice>

        <SmartImage
          src={item.image?.src ?? COVERS[index % COVERS.length]}
          fallbackSrc={item.image?.fallback}
          alt=""
          loading="eager"
          wrapperClassName="aspect-[16/8] rounded-3xl border border-white/10"
        />

        {isPodcast && (
          <div className="card-glass rounded-2xl p-5 sm:p-6 flex items-center gap-5">
            <button
              type="button"
              onClick={() => onOpenContact(undefined, `Get notified: ${item.title}`)}
              className="gradient-btn shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-white"
              aria-label="Play episode"
            >
              <Play className="w-6 h-6 ml-0.5" />
            </button>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">{item.description}</p>
              <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden"><span className="block h-full w-0 bg-cyan-400" /></div>
              <p className="mt-1.5 text-sm text-slate-500">Audio player placeholder: add the episode link here</p>
            </div>
          </div>
        )}

        <article className="space-y-10">
          {blocks.map((b) => (
            <section key={b.heading}>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white">{b.heading}</h2>
              {b.body.map((para) => (
                <p key={para} className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">{para}</p>
              ))}
              {b.points && (
                <ul className="mt-5 space-y-3">
                  {b.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-base sm:text-lg text-slate-300 leading-relaxed">
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        <div className="card-glass rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">See what this could look like for you</h2>
            <p className="mt-2 text-slate-400">A 30-minute conversation with a Bluenxt consultant, focused on your priorities.</p>
          </div>
          <button
            type="button"
            onClick={() => onOpenContact(undefined, 'Book a Discovery Call')}
            className="gradient-btn shrink-0 h-12 px-6 rounded-full text-sm font-semibold text-white inline-flex items-center gap-2"
          >
            Book a discovery call <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <section>
          <h2 className="text-2xl font-semibold text-white">More from the Knowledge Hub</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/resources/${resourceSlug(r)}`}
                className="card-glass card-glass-hover rounded-2xl p-5 flex flex-col"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan-300">{r.type}</span>
                <span className="mt-2 font-semibold text-white leading-snug" style={{ fontFamily: 'var(--font-display)' }}>{r.title}</span>
                <span className="mt-auto pt-4 text-sm text-slate-500">{r.meta}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
