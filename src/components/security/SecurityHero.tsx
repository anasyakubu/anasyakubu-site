// src/components/security/SecurityHero.tsx
import React from 'react';
import { ChevronRight, ArrowDown, ShieldCheck } from 'lucide-react';

const SecurityHero: React.FC = () => {
  return (
    <section className="relative bg-[#7A1F47] text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=2000&q=80"
          alt="Security operations center"
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
          <a
            href="/businesses"
            className="hover:text-white transition-colors uppercase tracking-wider font-medium"
          >
            Our Businesses
          </a>
          <ChevronRight className="w-3 h-3 stroke-[2.5]" />
          <span className="uppercase tracking-wider font-medium text-white">
            Security
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-white/60" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                Division 03 — Security
              </span>
            </div>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-6">
              Security solutions
              <br />
              <span className="text-white/70">that make a difference.</span>
            </h1>

            <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl">
              BERYL Holdings is an independent organization, driven by
              passionate safety and security experts — committed to minimizing
              risks with solutions tailored to your specific situation.
            </p>
          </div>

          {/* Right: Trust signal */}
          <div className="lg:col-span-4">
            <div className="border border-white/20 rounded-lg p-6 backdrop-blur-sm bg-white/5">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  Trusted Partner
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/90">
                A valued partner within the Dutch and international security
                industry — building trust through years of experience and a
                service-oriented, professional approach.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center gap-3 text-white/60 text-xs uppercase tracking-[0.2em] font-semibold">
          <ArrowDown className="w-4 h-4 stroke-[2.5] animate-bounce" />
          <span>Discover Our Approach</span>
        </div>
      </div>

      <div className="h-1 bg-[#5C1735]" />
    </section>
  );
};

export default SecurityHero;