import { ResourceItem } from './types.ts';
import { BRAND } from '../config/media.ts';

export const RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    image: BRAND.caseStudy1,
    type: 'Case Study',
    title: 'Global Bank Transforms HR with AI-Powered Talent Management',
    description: 'How a Fortune 500 bank achieved 45% reduction in hiring time and 3X improvement in employee retention.',
    author: 'BlueNxt Research',
    meta: '8 min read',
    category: 'Case Studies'
  },
  {
    id: 'res-2',
    image: BRAND.caseStudy2,
    type: 'Case Study',
    title: 'Manufacturing Giant Redesigns Workforce Architecture',
    description: 'Strategic HR transformation enabling 10,000+ employee organization to embrace Industry 4.0.',
    author: 'BlueNxt Consulting',
    meta: '6 min read',
    category: 'Case Studies'
  },
  {
    id: 'res-3',
    image: BRAND.caseStudy3,
    type: 'Case Study',
    title: 'Tech Startup Scales HR Operations 10X',
    description: 'From 50 to 500 employees in 18 months with zero HR bottlenecks using BlueNxt platforms.',
    author: 'BlueNxt Team',
    meta: '5 min read',
    category: 'Case Studies'
  },
  {
    id: 'res-4',
    image: BRAND.thoughtLeadership1,
    type: 'Thought Leadership',
    title: 'The Death of Traditional HR: Why 2025 Changes Everything',
    description: 'A deep dive into how AI, automation, and changing workforce expectations are reshaping HR forever.',
    author: 'Dr. Arun Kumar',
    meta: '12 min read',
    category: 'Thought Leadership'
  },
  {
    id: 'res-5',
    image: BRAND.thoughtLeadership2,
    type: 'Thought Leadership',
    title: 'Building the HR Operating System of Tomorrow',
    description: 'Strategic frameworks for creating integrated, AI-powered HR ecosystems.',
    author: 'Sarah Chen',
    meta: '10 min read',
    category: 'Thought Leadership'
  },
  {
    id: 'res-6',
    image: BRAND.podcast1,
    type: 'Podcast',
    title: 'HR Disruptors: Conversations with Industry Leaders',
    description: 'Episode 45: The Future of Skills-Based Organizations with leading CHROs.',
    author: 'BlueNxt Podcast',
    meta: '45 min listen',
    category: 'Podcasts'
  }
];

/** URL-friendly slug for a resource, e.g. "global-bank-transforms-hr-with-ai-powered-talent-management" */
export const resourceSlug = (item: ResourceItem) =>
  item.title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const findResource = (slug: string) => RESOURCES.find((r) => resourceSlug(r) === slug);
