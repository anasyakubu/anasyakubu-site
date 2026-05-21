// src/components/about/AboutHero.tsx
import React from 'react';
import { MapPin, Briefcase, GraduationCap } from 'lucide-react';
import Logo from "../../assets/logo-me.png"

const AboutHero: React.FC = () => {
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
      <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-amber-400/[0.05] blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Crumb */}
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <div className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
            <span>/ 01</span>
            <span className="w-8 h-px bg-zinc-700" />
            <span className="text-zinc-300">About</span>
          </div>
          <div className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-full bg-white/[0.02]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-300">
              Available
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <div className="relative inline-block">
              {/* Decorative offset border */}
              <div className="absolute -inset-px border border-amber-400/40 rounded-2xl translate-x-3 translate-y-3 -z-10" />
              <div className="relative w-full max-w-sm aspect-[4/5] bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/[0.08] rounded-2xl overflow-hidden">
                {/* Replace src with your photo */}
                <img
                  src={Logo}
                  alt="Anas Yakubu"
                  className="w-full h-full object-cover opacity-90"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
                {/* Corner tag */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-zinc-950/70 backdrop-blur-md border border-white/10 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-300">
                    Engineer · 2026
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Intro */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl" role="img" aria-label="wave">
                👋
              </span>
              <p className="font-mono text-sm uppercase tracking-[0.18em] text-zinc-400">
                Hi, I'm Anas
              </p>
            </div>

            <h1 className="font-display font-medium text-white leading-[0.95] tracking-[-0.04em] text-5xl md:text-6xl lg:text-7xl">
              A software engineer who{' '}
              <span className="italic text-amber-400 font-light">
                solves problems
              </span>{' '}
              for a living.
            </h1>

            <p className="mt-6 text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl">
              I bridge the gap between people and digital spaces — and watch
              far too much anime{' '}
              <span role="img" aria-label="castle">
                🏯
              </span>{' '}
              in the off-hours.
            </p>

            {/* Inline meta */}
            <div className="mt-8 flex flex-wrap gap-3">
              <MetaPill
                icon={<Briefcase className="w-3.5 h-3.5" strokeWidth={2} />}
                label="Lead Frontend @ NYM"
              />
              <MetaPill
                icon={<GraduationCap className="w-3.5 h-3.5" strokeWidth={2} />}
                label="BSc IT · BUK"
              />
              <MetaPill
                icon={<MapPin className="w-3.5 h-3.5" strokeWidth={2} />}
                label="Kano, Nigeria"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MetaPill: React.FC<{ icon: React.ReactNode; label: string }> = ({
  icon,
  label,
}) => (
  <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/[0.03] border border-white/[0.08] rounded-full">
    <span className="text-amber-400">{icon}</span>
    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-300">
      {label}
    </span>
  </div>
);

export default AboutHero;