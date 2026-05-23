// src/components/contact/ContactHero.tsx
import React from 'react';

const ContactHero: React.FC = () => {
  return (
    <section className="relative bg-zinc-950 text-white overflow-hidden">
      {/* Background atmosphere */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-400/[0.05] blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 pb-14 md:pt-24 md:pb-20">
        {/* Crumb */}
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <div className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
            <span>/ 01</span>
            <span className="w-8 h-px bg-zinc-700" />
            <span className="text-zinc-300">Contact</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-emerald-500/30 rounded-full bg-emerald-500/[0.05]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300">
              Replying within 24h
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl" role="img" aria-label="wave">
              ✉️
            </span>
            <p className="font-mono text-sm uppercase tracking-[0.18em] text-zinc-400">
              Let's connect
            </p>
          </div>

          <h1 className="font-display font-medium text-white leading-[0.95] tracking-[-0.04em] text-5xl md:text-7xl lg:text-[88px]">
            Have a project?{' '}
            <span className="italic text-amber-400 font-light">
              Let's talk
            </span>{' '}
            about it.
          </h1>

          <p className="mt-6 text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl">
            Whether it's a full build, a tricky frontend problem, freelance
            work, or just a good conversation about engineering — my inbox is
            open.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;