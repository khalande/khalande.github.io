import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  Award,
  BarChart3,
  Bot,
  BrainCircuit,
  ChevronDown,
  Cpu,
  GraduationCap,
  Menu,
  Network,
  Orbit,
  Rocket,
  Sprout,
  Target,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { CONSULTING_OVERVIEW } from '../data/domains.ts';
import { PLATFORMS_DATA } from '../data/platforms.ts';
import { IMAGES } from '../config/media.ts';
import { SmartImage } from './fx/SmartImage.tsx';

interface HeaderProps {
  onOpenContact: (domain?: string, title?: string) => void;
}

type MenuId = 'consulting' | 'platforms' | null;

const DOMAIN_ICONS: Record<string, React.ElementType> = {
  'organization-work-architecture': Network,
  'workforce-workplace-strategy': Users,
  'strategic-hr-transformation': Target,
  'integrated-talent-management': Sprout,
  'total-rewards-recognition': Award,
  'hr-operations-tech-ai': Cpu,
};

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  inhrsight: BarChart3,
  orbit: Orbit,
  talentxler: Rocket,
  achievhr: Target,
  oneclickhr: Zap,
  pioneers: GraduationCap,
};

const domains = CONSULTING_OVERVIEW.domainsAccordion.map((d) => ({
  name: d.name,
  tagline: d.tagline,
  path: `/consulting/${d.slug}`,
  Icon: DOMAIN_ICONS[d.slug] ?? Network,
}));

const platforms = PLATFORMS_DATA.suite.platforms.map((p) => ({
  name: p.name,
  tagline: p.tagline,
  path: `/platform#${p.id}`,
  Icon: PLATFORM_ICONS[p.id] ?? BrainCircuit,
}));

const COMMUNITY_URL = 'https://community.bluenxt.ai/';

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  const { pathname, key: locationKey } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSection, setDrawerSection] = useState<MenuId>(null);
  const openTimer = useRef<number | undefined>(undefined);
  const closeTimer = useRef<number | undefined>(undefined);
  // Ignore hover for a moment after navigating, so the menu doesn't reopen under a still mouse
  const suppressHoverUntil = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close everything on any navigation (including /platform#id links on the same page)
  useEffect(() => {
    setOpenMenu(null);
    setDrawerOpen(false);
    setDrawerSection(null);
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
    suppressHoverUntil.current = Date.now() + 900;
  }, [pathname, locationKey]);

  // Escape closes menus; lock page scroll behind the mobile drawer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  // Hover intent: small delay to open, longer grace period to close
  const hoverOpen = useCallback((id: MenuId) => {
    if (Date.now() < suppressHoverUntil.current) return;
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => setOpenMenu(id), 70);
  }, []);
  const hoverClose = useCallback(() => {
    window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 180);
  }, []);

  const isConsulting = pathname.startsWith('/consulting');
  const isPlatforms = pathname.startsWith('/platform') || pathname === '/digital-agents';
  const solid = scrolled || openMenu !== null || drawerOpen;

  const triggerClass = (active: boolean, open: boolean) =>
    `nav-link inline-flex items-center gap-1.5 py-2 text-[15px] font-medium transition-colors ${
      active || open ? 'text-white' : 'text-slate-300 hover:text-white'
    }`;

  return (
    <>
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        solid
          ? 'bg-[#070F1E]/85 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-[#070F1E]/80 to-transparent border-b border-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      onMouseLeave={hoverClose}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[var(--header-h)] flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="shrink-0 rounded-md" aria-label="Bluenxt ConsulTech, home">
          <img src="/logo-white.png" alt="bluenxt ConsulTech" className="h-8 sm:h-9 w-auto" width={113} height={36} />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
          <div onMouseEnter={() => hoverOpen('consulting')}>
            <button
              type="button"
              className={triggerClass(isConsulting, openMenu === 'consulting')}
              data-active={isConsulting}
              aria-expanded={openMenu === 'consulting'}
              aria-controls="menu-consulting"
              onClick={() => setOpenMenu(openMenu === 'consulting' ? null : 'consulting')}
            >
              Consulting
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openMenu === 'consulting' ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div onMouseEnter={() => hoverOpen('platforms')}>
            <button
              type="button"
              className={triggerClass(isPlatforms, openMenu === 'platforms')}
              data-active={isPlatforms}
              aria-expanded={openMenu === 'platforms'}
              aria-controls="menu-platforms"
              onClick={() => setOpenMenu(openMenu === 'platforms' ? null : 'platforms')}
            >
              AI Platforms
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openMenu === 'platforms' ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <Link
            to="/academy"
            onMouseEnter={hoverClose}
            className={triggerClass(pathname === '/academy', false)}
            data-active={pathname === '/academy'}
          >
            Academy
          </Link>
          <Link
            to="/about"
            onMouseEnter={hoverClose}
            className={triggerClass(pathname === '/about', false)}
            data-active={pathname === '/about'}
          >
            About
          </Link>
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-5 shrink-0" onMouseEnter={hoverClose}>
          <a
            href={COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[15px] font-medium text-slate-300 hover:text-white transition-colors"
          >
            Community
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={() => onOpenContact(undefined, 'Book a Discovery Call')}
            className="gradient-btn h-11 px-5 rounded-full text-sm font-semibold text-white inline-flex items-center gap-2"
          >
            Book a discovery call
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setDrawerOpen((o) => !o)}
          className="lg:hidden -mr-2 w-11 h-11 inline-flex items-center justify-center rounded-xl text-slate-200 hover:bg-white/5"
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={drawerOpen}
          aria-controls="mobile-drawer"
        >
          {drawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* ===== Mega menu: Consulting ===== */}
        {openMenu === 'consulting' && (
          <div
            id="menu-consulting"
            className="hidden lg:block absolute left-4 right-4 xl:left-8 xl:right-8 top-full pt-2"
            onMouseEnter={() => hoverOpen('consulting')}
          >
            <div className="mega-panel grid grid-cols-12 gap-2 p-2 rounded-3xl bg-[#0B1528] border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)]">
              <Link to="/consulting" className="group col-span-4 relative overflow-hidden rounded-2xl min-h-[260px] flex flex-col justify-end p-6 bg-[#0E1830]">
                <SmartImage src={IMAGES.offerConsulting} alt="" wrapperClassName="absolute inset-0" className="transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070F1E] via-[#070F1E]/70 to-[#2F6BFF]/20" />
                <div className="relative">
                  <p className="text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                    Transformation domains
                  </p>
                  <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
                    Six domains of workforce design and delivery, from org architecture to HR tech and AI.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 group-hover:gap-2.5 transition-all">
                    See all domains <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>

              <ul className="col-span-8 grid grid-cols-2 gap-x-2 gap-y-1 p-3 content-start">
                {domains.map(({ name, tagline, path, Icon }) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className={`group flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-colors hover:bg-white/[0.05] ${
                        pathname === path ? 'bg-white/[0.05]' : ''
                      }`}
                    >
                      <span className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#2F6BFF]/25 to-[#22D3EE]/10 border border-white/10 flex items-center justify-center text-cyan-300 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span>
                        <span className="block text-[15px] font-semibold text-white leading-snug">{name}</span>
                        <span className="block mt-0.5 text-sm text-slate-400 group-hover:text-slate-300">{tagline}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ===== Mega menu: AI Platforms ===== */}
        {openMenu === 'platforms' && (
          <div
            id="menu-platforms"
            className="hidden lg:block absolute left-4 right-4 xl:left-8 xl:right-8 top-full pt-2"
            onMouseEnter={() => hoverOpen('platforms')}
          >
            <div className="mega-panel grid grid-cols-12 gap-2 p-2 rounded-3xl bg-[#0B1528] border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)]">
              <div className="col-span-8 p-3">
                <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {platforms.map(({ name, tagline, path, Icon }) => (
                    <li key={path}>
                      <Link to={path} className="group flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-colors hover:bg-white/[0.05]">
                        <span className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#2F6BFF]/25 to-[#22D3EE]/10 border border-white/10 flex items-center justify-center text-cyan-300 group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" />
                        </span>
                        <span>
                          <span className="block text-[15px] font-semibold text-white">{name}</span>
                          <span className="block mt-0.5 text-sm text-slate-400 group-hover:text-slate-300">{tagline}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/platform"
                  className="mt-2 mx-3 inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-cyan-300 hover:text-white transition-colors"
                >
                  Compare all six platforms <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <Link to="/digital-agents" className="group col-span-4 relative overflow-hidden rounded-2xl min-h-[260px] flex flex-col justify-end p-6 bg-[#0E1830]">
                <SmartImage src={IMAGES.offerAgents} alt="" wrapperClassName="absolute inset-0" className="transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070F1E] via-[#070F1E]/70 to-[#22D3EE]/15" />
                <div className="relative">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/30 text-sm font-semibold text-amber-200">
                    <Bot className="w-3.5 h-3.5" /> Coming soon
                  </span>
                  <p className="mt-3 text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                    Digital Agents
                  </p>
                  <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
                    Autonomous AI agents that take on the operational load so your people can focus on judgement.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 group-hover:gap-2.5 transition-all">
                    Get early access <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>

    </header>

      {/* ===== Mobile drawer ===== */}
      {drawerOpen && (
        <div
          id="mobile-drawer"
          className="drawer-in lg:hidden fixed z-40 inset-x-0 bottom-0 top-[calc(var(--header-h)+env(safe-area-inset-top,0px))] bg-[#070F1E] border-t border-white/[0.07] overflow-y-auto overscroll-contain"
        >
          <nav className="px-4 sm:px-6 pt-2 pb-40" aria-label="Mobile">
            {(
              [
                { id: 'consulting', label: 'Consulting', overview: { label: 'All transformation domains', path: '/consulting' }, items: domains },
                { id: 'platforms', label: 'AI Platforms', overview: { label: 'Compare all platforms', path: '/platform' }, items: [...platforms, { name: 'Digital Agents', tagline: 'Coming soon', path: '/digital-agents', Icon: Bot }] },
              ] as const
            ).map((section) => {
              const open = drawerSection === section.id;
              return (
                <div key={section.id} className="border-b border-white/[0.07]">
                  <button
                    type="button"
                    onClick={() => setDrawerSection(open ? null : section.id)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between py-5 text-left text-2xl font-semibold text-white"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {section.label}
                    <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${open ? 'rotate-180 text-cyan-300' : ''}`} />
                  </button>
                  {open && (
                    <ul className="drawer-in pb-4 space-y-0.5">
                      <li>
                        <Link
                          to={section.overview.path}
                          className="flex items-center justify-between min-h-12 px-3 mb-1.5 rounded-xl bg-white/[0.04] text-[15px] font-semibold text-cyan-300"
                        >
                          {section.overview.label} <ArrowRight className="w-4 h-4" />
                        </Link>
                      </li>
                      {section.items.map(({ name, tagline, path, Icon }) => (
                        <li key={path}>
                          <Link to={path} className="flex items-center gap-3 min-h-12 px-3 py-2 rounded-xl active:bg-white/[0.05]">
                            <span className="shrink-0 w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-cyan-300">
                              <Icon className="w-4 h-4" />
                            </span>
                            <span>
                              <span className="block text-[15px] font-medium text-white leading-snug">{name}</span>
                              <span className="block text-sm text-slate-400">{tagline}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}

            {[
              { label: 'Academy', path: '/academy' },
              { label: 'About', path: '/about' },
            ].map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className="flex items-center justify-between py-5 border-b border-white/[0.07] text-2xl font-semibold text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {l.label}
                <ArrowRight className="w-5 h-5 text-slate-500" />
              </Link>
            ))}
            <a
              href={COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-5 text-lg font-medium text-slate-300"
            >
              Bluenxt Community
              <ArrowUpRight className="w-5 h-5 text-slate-500" />
            </a>
          </nav>

          <div className="fixed inset-x-0 bottom-0 p-4 sm:px-6 bg-gradient-to-t from-[#070F1E] via-[#070F1E] to-transparent" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}>
            <button
              type="button"
              onClick={() => {
                setDrawerOpen(false);
                onOpenContact(undefined, 'Book a Discovery Call');
              }}
              className="gradient-btn w-full h-14 rounded-2xl text-base font-semibold text-white"
            >
              Book a discovery call
            </button>
          </div>
        </div>
      )}
    </>
  );
};
