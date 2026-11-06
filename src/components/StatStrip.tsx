import React from 'react';
import {
  Activity,
  BarChart3,
  BookOpen,
  Building2,
  Clock,
  Cpu,
  Gauge,
  Layers,
  LayoutGrid,
  RefreshCw,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from 'lucide-react';
import { StatTile, toneAt, type Tone } from './ui/ToneCard.tsx';

interface StatItem {
  value: string;
  label: string;
  detail?: string;
}

interface StatStripProps {
  stats: StatItem[];
  className?: string;
  columns?: number;
  /** Start the colour cycle at a different tone. */
  toneOffset?: number;
  /** Use one colour for every tile instead of cycling. */
  tone?: Tone;
  /** Minimal shadows. */
  flat?: boolean;
}

// Pick an icon that fits the stat's label
const ICON_RULES: [RegExp, React.ElementType][] = [
  [/industr/i, Building2],
  [/platform|ai-powered/i, Cpu],
  [/skill|librar/i, BookOpen],
  [/profile/i, UserCheck],
  [/coach|mentor|people|professional/i, Users],
  [/always|access|24\/7|on$/i, Activity],
  [/faster|speed|decision/i, Zap],
  [/admin|time|hour/i, Clock],
  [/value|growth|roi|improve/i, TrendingUp],
  [/layer|architecture|in-1|consulting/i, Layers],
  [/domain/i, LayoutGrid],
  [/transform/i, RefreshCw],
  [/efficien|productiv/i, Gauge],
  [/project|deliver|report/i, BarChart3],
];
const iconFor = (label: string) => ICON_RULES.find(([re]) => re.test(label))?.[1] ?? Sparkles;

/** Row of colour-coded stat tiles with icons and counting numbers. */
export const StatStrip: React.FC<StatStripProps> = ({ stats, className = '', columns, toneOffset = 0, tone, flat = false }) => {
  const colClass =
    columns === 3 ? 'grid-cols-1 md:grid-cols-3' : columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 lg:grid-cols-4';

  return (
    <div className={`grid ${colClass} gap-3 sm:gap-5 ${className}`}>
      {stats.map((stat, idx) => (
        <StatTile
          key={stat.label}
          value={stat.value}
          label={stat.label}
          detail={stat.detail}
          icon={iconFor(stat.label)}
          tone={tone ?? toneAt(idx + toneOffset)}
          flat={flat}
        />
      ))}
    </div>
  );
};
