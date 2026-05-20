// src/components/projects/ProjectsHero.tsx
import React from 'react';
import { ChevronRight, ArrowDown } from 'lucide-react';

const ProjectsHero: React.FC = () => {
  return (
    <section className="relative bg-[#7A1F47] text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2000&q=80"
          alt="Architectural project showcase"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#5C1735]/88" />
      </div>

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M20 0v40M0 20h40'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-white/60 mb-10">
          <a
            href="/"
            className="hover:text-white transition-colors uppercase tracking-wider font-medium"
          >
            Home
          </a>
          <ChevronRight className="w-3 h-3 stroke-[2.5]" />
          <span className="uppercase tracking-wider font-medium text-white">
            Projects
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-white/60" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                Our Portfolio
              </span>
            </div>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-6">
              The work behind
              <br />
              <span className="text-white/70">the promise.</span>
            </h1>

            <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl">
              A curated selection of projects across architecture, agriculture,
              and security — each one delivered for a client who chose
              BERYL Holdings to make their vision real.
            </p>
          </div>

          {/* Right: Portfolio stats */}
          <div className="lg:col-span-4">
            <div className="border border-white/20 rounded-lg p-6 backdrop-blur-sm bg-white/5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 mb-5">
                Portfolio Snapshot
              </div>
              <dl className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/15">
                  <dt className="text-xs text-white/70 uppercase tracking-wider">
                    Completed
                  </dt>
                  <dd className="font-display font-bold text-base">10+ Projects</dd>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/15">
                  <dt className="text-xs text-white/70 uppercase tracking-wider">
                    Divisions
                  </dt>
                  <dd className="font-display font-bold text-base">3 Active</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-xs text-white/70 uppercase tracking-wider">
                    Locations
                  </dt>
                  <dd className="font-display font-bold text-base">Nationwide</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center gap-3 text-white/60 text-xs uppercase tracking-[0.2em] font-semibold">
          <ArrowDown className="w-4 h-4 stroke-[2.5] animate-bounce" />
          <span>Explore the Portfolio</span>
        </div>
      </div>

      <div className="h-1 bg-[#5C1735]" />
    </section>
  );
};

export default ProjectsHero;