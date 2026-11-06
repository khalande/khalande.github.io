import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RESOURCES, resourceSlug } from '../data/resources.ts';
import { ArrowRight, BookOpen, Clock, FileText, Headphones, Lightbulb, TrendingUp, User } from 'lucide-react';
import { SmartImage } from './fx/SmartImage.tsx';
import { ScrollRow } from './fx/ScrollRow.tsx';

interface ResourceCardsProps {
  limit?: number;
  showFilters?: boolean;
  onOpenContact?: (domain?: string, title?: string) => void;
  className?: string;
}

const CATEGORIES = [
  { label: 'All Resources', Icon: BookOpen },
  { label: 'Case Studies', Icon: FileText },
  { label: 'Thought Leadership', Icon: Lightbulb },
  { label: 'Podcasts', Icon: Headphones },
  { label: 'Trends & Insights', Icon: TrendingUp },
];

const BADGE: Record<string, string> = {
  'Case Study': 'bg-[#2F6BFF]/25 text-blue-100 border-[#4C8DFF]/50',
  'Thought Leadership': 'bg-amber-400/20 text-amber-100 border-amber-300/50',
  Podcast: 'bg-emerald-400/20 text-emerald-100 border-emerald-300/50',
  'Trends & Insights': 'bg-cyan-400/20 text-cyan-100 border-cyan-300/50',
};

export const ResourceCards: React.FC<ResourceCardsProps> = ({ limit, showFilters = true, className = '' }) => {
  const [activeCategory, setActiveCategory] = useState('All Resources');
  const filtered = RESOURCES.filter((item) => activeCategory === 'All Resources' || item.category === activeCategory);
  const items = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div id="knowledge-hub" className={`space-y-10 ${className}`}>
      <div className="max-w-3xl mx-auto text-center">
        <span className="eyebrow">Knowledge Hub</span>
        <h2 className="text-h2 text-white mt-3">
          Resources &amp; <span className="gradient-text">Insights</span>
        </h2>
        <p className="text-lead text-slate-300 mt-4">
          Stay ahead with our latest case studies, thought leadership, podcasts, and industry trends.
        </p>
      </div>

      {showFilters && (
        <div className="flex justify-center">
          <ScrollRow activeKey={activeCategory} wrapperClassName="w-full sm:w-auto">
            <div role="tablist" aria-label="Filter resources" className="flex gap-2 w-max mx-auto">
              {CATEGORIES.map(({ label, Icon }) => {
                const on = activeCategory === label;
                return (
                  <button
                    key={label}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActiveCategory(label)}
                    className={`shrink-0 inline-flex items-center gap-2 h-11 px-4 rounded-full text-sm font-semibold border transition-colors ${
                      on ? 'gradient-btn text-white border-transparent' : 'bg-white/[0.03] border-white/10 text-slate-300 hover:text-white hover:border-white/25'
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </button>
                );
              })}
            </div>
          </ScrollRow>
        </div>
      )}

      {items.length === 0 ? (
        <p className="text-center text-slate-400 py-10">New {activeCategory.toLowerCase()} are on the way. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <article key={item.id} className="group relative card-glass card-glass-hover rounded-2xl overflow-hidden flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <SmartImage
                  src={item.image?.src ?? ''}
                  fallbackSrc={item.image?.fallback}
                  alt=""
                  wrapperClassName="absolute inset-0"
                  className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1830] via-[#0E1830]/25 to-transparent" />
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full border backdrop-blur-md text-sm font-semibold ${BADGE[item.type] ?? BADGE['Case Study']}`}>
                  {item.type}
                </span>
              </div>
              <div className="flex-1 flex flex-col p-6">
                <h3 className="text-lg font-semibold text-white leading-snug group-hover:text-cyan-200 transition-colors">
                  <Link to={`/resources/${resourceSlug(item)}`} className="after:absolute after:inset-0">
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-2 text-[15px] text-slate-400 leading-relaxed line-clamp-3">{item.description}</p>
                <div className="mt-auto pt-5 flex items-center justify-between gap-3 text-sm text-slate-400">
                  <span className="flex items-center gap-4 min-w-0">
                    <span className="inline-flex items-center gap-1.5 truncate"><User className="w-4 h-4 shrink-0" />{item.author}</span>
                    <span className="inline-flex items-center gap-1.5 shrink-0">
                      {item.type === 'Podcast' ? <Headphones className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      {item.meta}
                    </span>
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0 text-cyan-300 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {limit !== undefined && (
        <div className="flex justify-center">
          <Link
            to="/resources"
            className="h-12 px-6 rounded-full border border-white/15 text-sm font-semibold text-white hover:bg-white/5 transition-colors inline-flex items-center gap-2"
          >
            Explore All Resources <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
};
