// =============================================================
// ALL SITE MEDIA LIVES HERE
// -------------------------------------------------------------
// Photos: Bluenxt's own brochure photography, stored in public/photos/.
// Every image has a built-in fallback: if one ever fails to load,
// a branded gradient panel is shown instead, so nothing looks broken.
//
// Videos (all hosted on the site itself, in public/media/):
//   megatrends  bn-ecosystem-future-of-hr.mp4  Bluenxt brand film (home, Social MegaTrends band)
//   consulting  consulting.mp4  3D org network reshaping, HUD callouts, city bokeh
//   domain      domain.mp4      3D hex lattice of rising skill columns
//   platform    platform.mp4    holographic HUD panels: gauge, hex emblem, charts
//   academy     academy.mp4     holographic projector, learners rising through levels
//   about       about.mp4       holographic globe linking Dubai, Mumbai, Johannesburg
//   agents      agents.mp4      flight over a circuit-board city to an AI core
// (generated with tools/render_videos.py in the brand film's colour and style)
// Each page's photo is the fallback if its video can't play. Leave `video`
// empty to show the photo with a slow cinematic drift instead.
//
// To add a free stock video to a page (Pexels / Mixkit / Coverr):
//   1. Open the video page, click Download, pick the HD (1280 or 1920) size
//   2. Put the .mp4 file in  public/media/  e.g. public/media/consulting.mp4
//   3. Set  video: '/media/consulting.mp4'  for that page below
// Keep each file under ~4 MB so pages load fast on mobile.
// =============================================================

/**
 * Bluenxt's own images. Each is served from public/brand/ once downloaded
 * (run:  npm run fetch-brand-assets), and falls back to the live bluenxt.ai
 * address until then. Images that fail entirely show a branded panel.
 */
export interface BrandImage {
  src: string;
  fallback: string;
}
const brand = (file: string, remote: string): BrandImage => ({
  src: `/brand/${file}`,
  fallback: `https://bluenxt.ai/assets/${remote}`,
});

export const BRAND = {
  heroVisual: brand('hero-visual.png', 'hero-visual-BlYRseKS.png'),
  caseStudy1: brand('case-study-1.jpg', 'case-study-1-BtNQAlg3.jpg'),
  caseStudy2: brand('case-study-2.jpg', 'case-study-2-DtUhrQwH.jpg'),
  caseStudy3: brand('case-study-3.jpg', 'case-study-3-YW4uIZRK.jpg'),
  thoughtLeadership1: brand('thought-leadership-1.jpg', 'thought-leadership-1-8HpqVWai.jpg'),
  thoughtLeadership2: brand('thought-leadership-2.jpg', 'thought-leadership-2-DENbimNu.jpg'),
  podcast1: brand('podcast-1.jpg', 'podcast-1-gP3XB4KQ.jpg'),
  aboutBg: brand('about-ai-bg.png', 'about-ai-bg-C5V3cdFh.png'),
  blueBook: brand('blue-book.jpg', 'blue-book-DLfPj9sc.jpg'),
  aiAgents: brand('ai-agents.jpg', 'ai-agents-Y9sNnutI.jpg'),
};

export interface HeroMedia {
  /** Background video (muted loop). Leave empty to use the photo instead. */
  video?: string;
  /** Second address to try if `image` fails (e.g. the live bluenxt.ai copy). */
  imageFallback?: string;
  /** Still frame shown while the video loads. Only set it when it matches the video. */
  poster?: string;
  /** Photo used when there is no video, or if the video can't play. */
  image: string;
}

export const HERO_MEDIA: Record<
  'home' | 'megatrends' | 'consulting' | 'domain' | 'platform' | 'academy' | 'about' | 'agents' | 'showcase' | 'careers',
  HeroMedia
> = {
  // Bluenxt brand film (same one used on the digital business cards)
  // Home hero: Bluenxt's hand-and-AI hero visual, as on the live site
  home: {
    image: '/brand/hero-visual.png',
    imageFallback: 'https://bluenxt.ai/assets/hero-visual-BlYRseKS.png',
  },
  // Social MegaTrends band: the Bluenxt brand film
  megatrends: {
    video: '/media/bn-ecosystem-future-of-hr.mp4',
    poster: '/media/bn-ecosystem-poster.jpg',
    image: '/media/bn-ecosystem-poster.jpg',
  },
  // Strategy workshop / leadership team around a table
  consulting: { video: '/media/consulting.mp4', image: '/photos/future-city-terraces.jpg' },
  // Business people in discussion
  domain: { video: '/media/domain.mp4', image: '/photos/glass-walkway-banner.jpg' },
  // Analytics dashboard on a laptop
  platform: { video: '/media/platform.mp4', image: '/photos/lounge-office-banner.jpg' },
  // Learners in a workshop
  academy: { video: '/media/academy.mp4', image: '/photos/library-hall-banner.jpg' },
  // Modern office
  about: { video: '/media/about.mp4', image: '/photos/glass-terrace-wide.jpg' },
  // Abstract AI
  agents: { video: '/media/agents.mp4', image: '/photos/lobby-banner.jpg' },
  // Team collaborating with laptops (home cinematic band)
  showcase: { video: '', image: '/photos/team-at-work-banner.jpg' },
  // Careers: young professionals collaborating
  careers: { video: '', image: '/photos/workplace-market-banner.jpg' },
};

export const IMAGES = {
  // Offer cards on the home page
  offerConsulting: '/photos/team-at-work-banner.jpg',
  offerPlatforms: '/photos/lounge-office-banner.jpg',
  offerAcademy: '/photos/library-hall-banner.jpg',
  // Digital Agents card in the AI Platforms menu
  offerAgents: '/photos/lobby-banner.jpg',

  // "Humans + AI" collage on the home page
  peopleA: '/photos/glass-terrace-portrait.jpg',
  peopleB: '/photos/future-city-terraces.jpg',
  peopleC: '/photos/boardroom.jpg',

  // Closing call-to-action on the home page
  ctaTeam: '/photos/glass-walkway-banner.jpg',
};

// Backwards-compatible names
export const HERO_VIDEO_SRC = HERO_MEDIA.home.video!;
export const HERO_POSTER_SRC = HERO_MEDIA.home.image;

// Verified from the Bluenxt digital business cards
export const BOOKING_URL = 'https://bookings.cloud.microsoft/book/bluenxt@bluenxt.com/';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/bluenxt-consultech-9691481a3/';
// From the live bluenxt.ai footer
export const FACEBOOK_URL = 'https://www.facebook.com/p/Bluenxtconsulting-61569302812247/';
export const INSTAGRAM_URL = 'https://www.instagram.com/bluenxtconsulting/';

// Leadership (About page)
export const LEADERSHIP_PHOTO = '/photos/boardroom.jpg';
export const BROCHURE_PDF = '/bluenxt-corporate-brochure.pdf';
