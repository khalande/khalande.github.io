import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ConsultingPage } from './pages/ConsultingPage.tsx';
import { DomainDetailPage } from './pages/DomainDetailPage.tsx';
import { PlatformsPage } from './pages/PlatformsPage.tsx';
import { AcademyPage } from './pages/AcademyPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { DigitalAgentsPage } from './pages/DigitalAgentsPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';
import { CareersPage } from './pages/CareersPage.tsx';
import { ResourcePage } from './pages/ResourcePage.tsx';
import { ResourcesPage } from './pages/ResourcesPage.tsx';
import { LegalPage } from './pages/LegalPage.tsx';
import { PRIVACY_POLICY, TERMS_OF_SERVICE, COOKIE_POLICY } from './data/legal.ts';
import { findResource } from './data/resources.ts';
import { GlobalFx } from './components/fx/GlobalFx.tsx';

import { ScrollToTop } from './components/ScrollToTop.tsx';

// Scroll to top on route change & update SEO page title
/** Hands over to a static page in public/ (the digital business cards). */
function StaticPage({ href }: { href: string }) {
  useEffect(() => {
    // Full page load so the server serves the card itself. If the host isn't set up
    // for clean URLs and sends the app back, fall back to the file path once.
    const key = `card-redirect:${href}`;
    const target = sessionStorage.getItem(key) ? `${href}/index.html` : href;
    sessionStorage.setItem(key, '1');
    window.location.replace(target);
  }, [href]);
  return null;
}

function ScrollToTopAndSEO() {
  const { pathname, key } = useLocation();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    } else if (!pathname.startsWith('/platform')) {
      // Scroll to #section links such as /about#leadership once the page has rendered
      let tries = 0;
      const seek = () => {
        const el = document.getElementById(decodeURIComponent(hash));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else if (tries++ < 20) window.setTimeout(seek, 50);
      };
      window.setTimeout(seek, 60);
    }

    // Dynamic Title Management
    let title = "BlueNxt | World's First HR ConsulTech";
    if (pathname === '/consulting') {
      title = "Transformation Domains | BlueNxt - HR ConsulTech";
    } else if (pathname.startsWith('/consulting/')) {
      const slug = pathname.replace('/consulting/', '');
      const formatted = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      title = `${formatted} | BlueNxt - HR ConsulTech`;
    } else if (pathname === '/platform') {
      title = "AI Platforms | BlueNxt - Workforce Operating Stack";
    } else if (pathname === '/academy') {
      title = "BlueNXT Academy | Skills-Based HR Transformation";
    } else if (pathname === '/about') {
      title = "About BlueNxt | World's First HR ConsulTech";
    } else if (pathname === '/digital-agents') {
      title = "Digital Agents | BlueNxt Autonomous AI Workforce";
    } else if (pathname === '/careers') {
      title = "Careers | Bluenxt ConsulTech";
    } else if (pathname === '/resources') {
      title = "Resources & Insights | Bluenxt Knowledge Hub";
    } else if (pathname.startsWith('/resources/')) {
      const item = findResource(pathname.replace('/resources/', ''));
      if (item) title = `${item.title} | Bluenxt Knowledge Hub`;
    } else if (pathname === '/privacy-policy') {
      title = "Privacy Policy | Bluenxt ConsulTech";
    } else if (pathname === '/terms-of-service') {
      title = "Terms of Service | Bluenxt ConsulTech";
    } else if (pathname === '/cookie-policy') {
      title = "Cookie Policy | Bluenxt ConsulTech";
    }
    document.title = title;
  }, [pathname, key]);

  return null;
}

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactDomain, setContactDomain] = useState<string | undefined>(undefined);
  const [contactTitle, setContactTitle] = useState<string | undefined>(undefined);

  const handleOpenContact = (domain?: string, title?: string) => {
    setContactDomain(domain);
    setContactTitle(title);
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  return (
    <BrowserRouter>
      <ScrollToTopAndSEO />
      <GlobalFx />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header onOpenContact={handleOpenContact} />

        <main className="flex-1 pt-[var(--header-h)]">
          <Routes>
            <Route path="/" element={<HomePage onOpenContact={handleOpenContact} />} />
            <Route path="/consulting" element={<ConsultingPage onOpenContact={handleOpenContact} />} />
            <Route path="/consulting/:slug" element={<DomainDetailPage onOpenContact={handleOpenContact} />} />
            <Route path="/platform" element={<PlatformsPage onOpenContact={handleOpenContact} />} />
            <Route path="/academy" element={<AcademyPage onOpenContact={handleOpenContact} />} />
            <Route path="/about" element={<AboutPage onOpenContact={handleOpenContact} />} />
            <Route path="/digital-agents" element={<DigitalAgentsPage />} />
            <Route path="/careers" element={<CareersPage onOpenContact={handleOpenContact} />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/:slug" element={<ResourcePage onOpenContact={handleOpenContact} />} />
            <Route path="/privacy-policy" element={<LegalPage doc={PRIVACY_POLICY} path="/privacy-policy" />} />
            <Route path="/terms-of-service" element={<LegalPage doc={TERMS_OF_SERVICE} path="/terms-of-service" />} />
            <Route path="/cookie-policy" element={<LegalPage doc={COOKIE_POLICY} path="/cookie-policy" />} />
            <Route path="/manish" element={<StaticPage href="/manish" />} />
            <Route path="/sneha" element={<StaticPage href="/sneha" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer onOpenContact={handleOpenContact} />

        <ContactModal
          isOpen={isContactOpen}
          onClose={handleCloseContact}
          defaultDomain={contactDomain}
          modalTitle={contactTitle}
        />
      </div>
    </BrowserRouter>
  );
}
