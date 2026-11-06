export interface ResourceItem {
  id: string;
  type: 'Case Study' | 'Thought Leadership' | 'Podcast' | 'Trends & Insights';
  title: string;
  description: string;
  author: string;
  meta: string;
  category: string;
  /** Card photo (Bluenxt's own image, with live-site fallback) */
  image?: { src: string; fallback: string };
}

export interface DomainData {
  slug: string;
  title: string;
  number: string;
  h1: string;
  fromTo: string;
  subtitle: string;
  caseForChangeStats: {
    stat: string;
    label: string;
    source: string;
  }[];
  journey: {
    h2: string;
    subtitle: string;
    friction: string[];
    vision: string[];
    catalyst: string[];
    outcome: string[];
  };
  approach: {
    h2: string;
    subtitle: string;
    phases: {
      phaseNumber: string;
      name: string;
      description: string;
      tags?: string[];
      /** Five capabilities shown around the hub when this shift is selected */
      hub?: string[];
    }[];
    footerPill: string;
  };
  capabilities: {
    number: string;
    name: string;
    shortDescription: string;
    tags: string[];
    cta: string;
  }[];
  scenario: {
    problemTitle: string;
    problemDescription: string;
    problemTags: string[];
    solutionTitle: string;
    solutionDescription: string;
    solutionTags: string[];
    results: {
      value: string;
      label: string;
    }[];
  };
}

export interface DigitalBuddyItem {
  name: string;
  description: string;
  iconName: string;
}

export interface PlatformItem {
  id: string;
  name: string;
  tagline: string;
  headline: string;
  description: string;
  metrics: {
    value: string;
    label: string;
  }[];
  coreCapabilities: string[];
  featureCards: {
    symbol: string;
    title: string;
    description: string;
  }[];
  liveViewLabel: string;
  querySample: string;
}

export interface ProgramItem {
  id: string;
  badge: string;
  title: string;
  duration: string;
  format: string;
  description: string;
  bullets: string[];
  category: 'Innovation Lab' | 'Leadership' | 'Digital & AI' | 'Strategy';
}
