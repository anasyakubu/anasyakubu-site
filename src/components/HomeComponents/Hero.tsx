// src/components/home/Hero.tsx
import React from 'react';
import { ArrowUpRight, Mail, FileDown } from 'lucide-react';

const Hero: React.FC = () => {
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
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-amber-400/[0.05] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-400/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-20 pb-28 md:pt-28 md:pb-36">
        {/* Top meta strip */}
        <div className="flex items-center justify-between mb-14 md:mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-300">
              Available for select projects · Q3 2026
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
            <span>/ 01</span>
            <span className="w-8 h-px bg-zinc-700" />
            <span className="text-zinc-300">Introduction</span>
          </div>
        </div>

        {/* Greeting line */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-2xl" role="img" aria-label="wave">
            👋
          </span>
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-zinc-400">
            Hi, my name is
          </p>
        </div>

        {/* Big name */}
        <h1 className="font-display font-medium text-white leading-[0.92] tracking-[-0.04em] text-[64px] sm:text-[96px] md:text-[128px] lg:text-[160px] xl:text-[180px]">
          Anas
          <br />
          <span className="inline-flex items-baseline gap-3 md:gap-6">
            Yakubu
            <span className="text-amber-400 italic font-light text-[0.85em]">.</span>
          </span>
        </h1>

        {/* Subtitle */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <p className="font-display text-2xl md:text-3xl lg:text-[34px] leading-[1.2] tracking-[-0.01em] text-white/90">
              It's not magic —{' '}
              <span className="italic text-amber-400 font-light">
                it's programming.
              </span>
            </p>
            <p className="mt-6 text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl">
              A software engineer who enjoys seamlessly bridging the gap between
              people and digital space by day, and an anime lover by night.
            </p>
          </div>

          {/* CTAs */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-3">
            <a
              href="mailto:yakubuanas04@gmail.com"
              className="group inline-flex items-center justify-between gap-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 pl-6 pr-2 py-2 rounded-full transition-colors duration-300"
            >
              <span className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.15em] font-semibold">
                <Mail className="w-3.5 h-3.5" strokeWidth={2.5} />
                Get in touch
              </span>
              <span className="w-10 h-10 rounded-full bg-zinc-950 text-amber-400 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
              </span>
            </a>

            <a
              href="https://drive.google.com/file/d/1oG55p4bcGIOqqi66xYZjqAmssKo2Ph5t/view"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-between gap-4 border border-white/15 hover:border-white/40 text-white pl-6 pr-2 py-2 rounded-full transition-colors duration-300"
            >
              <span className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.15em] font-semibold">
                <FileDown className="w-3.5 h-3.5" strokeWidth={2.5} />
                View Resume
              </span>
              <span className="w-10 h-10 rounded-full bg-white/[0.06] group-hover:bg-white/10 text-white flex items-center justify-center transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" strokeWidth={2.5} />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative border-t border-b border-white/[0.06] bg-black/30 backdrop-blur-sm overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-5">
          {Array.from({ length: 2 }).map((_, copy) => (
            <div key={copy} className="flex items-center gap-8 px-4">
              {[
                'Frontend Engineering',
                '◆',
                'Full-Stack Development',
                '◆',
                'Product Design',
                '◆',
                'React · Next · TypeScript',
                '◆',
                'Lead Frontend @ NYM Technologies',
                '◆',
                'Based in Kano',
                '◆',
                'Anime Enthusiast',
                '◆',
              ].map((item, i) => (
                <span
                  key={i}
                  className={`font-display text-3xl md:text-4xl tracking-tight ${item === '◆'
                      ? 'text-amber-400 text-xl'
                      : 'text-white/70 italic font-light'
                    }`}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Marquee keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;