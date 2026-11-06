import React from 'react';
import { ResourceCards } from '../components/ResourceCards.tsx';

/** All Knowledge Hub resources with category filters. */
export const ResourcesPage: React.FC = () => (
  <div className="pb-24">
    <section className="hero-bleed relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(47,107,255,0.22),transparent_70%)]" />
      <div aria-hidden="true" className="fx-grid absolute inset-0 -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ResourceCards />
      </div>
    </section>
  </div>
);
