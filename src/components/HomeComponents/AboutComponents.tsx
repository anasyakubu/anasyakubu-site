// src/components/home/About.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const stats = [
  { value: '3+', label: 'Years Engineering' },
  { value: '1k+', label: 'Users Reached' },
  { value: '15+', label: 'Shipped Projects' },
  { value: '∞', label: 'Anime Watched' },
];

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative bg-zinc-950 text-white border-t border-white/[0.06]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 md:py-32">
        {/* Section header */}
        <div className="flex items-end justify-between mb-14 md:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
              <span>/ 02</span>
              <span className="w-8 h-px bg-zinc-700" />
              <span className="text-zinc-300">About</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.03em] font-medium">
              About me<span className="text-amber-400 italic font-light">.</span>
            </h2>
          </div>
          <Link
            to="/about"
            className="hidden md:inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 hover:text-amber-400 transition-colors group"
          >
            Full bio
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </Link>
        </div>

        {/* Body grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Prose */}
          <div className="lg:col-span-7 space-y-6 text-zinc-300 text-base md:text-[17px] leading-[1.75]">
            <p>
              Hi, I'm Anas Yakubu{' '}
              <span role="img" aria-label="wave">
                👋
              </span>
              . I love solving problems for a living, bridging the gap between
              people and digital spaces, and I'm an anime{' '}
              <span className="text-amber-400" role="img" aria-label="castle">
                🏯
              </span>{' '}
              enthusiast.
            </p>

            <p>
              I currently work at{' '}
              <span className="text-white font-medium">
                NYM Technologies Limited
              </span>{' '}
              as a <span className="text-white font-medium">Lead Frontend Engineer</span>,
              where I design and develop inclusive web experiences that meet web
              standards for over{' '}
              <span className="text-amber-400 font-medium">1,000 users globally</span>.
              Before this role, I was an intern Full-Stack Developer at the same
              company, focusing on developing websites and software for users.
            </p>

            <p>
              I am currently studying{' '}
              <span className="text-white font-medium">
                BSc Information Technology
              </span>{' '}
              at <span className="text-white font-medium">Bayero University Kano (BUK)</span>.
              My education has provided a strong foundation in programming and
              software development, enabling me to build dynamic and interactive
              web solutions.
            </p>

            <p>
              Three years into my software engineering journey, I delivered a
              graduation speech — reflecting on our growth, challenges, and
              future prospects. It was a proud and grateful moment, celebrating
              our achievements and the bonds we formed.
            </p>
          </div>

          {/* Stats sidebar */}
          <div className="lg:col-span-5 lg:pl-12 lg:border-l lg:border-white/[0.06]">
            {/* Quote / philosophy card */}
            <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-7 mb-8">
              <div className="absolute -top-3 left-7 px-3 py-1 bg-zinc-950 border border-white/10 rounded-full">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-amber-400">
                  Philosophy
                </span>
              </div>
              <p className="font-display text-xl md:text-2xl leading-[1.3] tracking-[-0.01em] text-white/95 mt-2">
                "It's not magic —{' '}
                <span className="italic text-amber-400 font-light">
                  it's programming.
                </span>
                "
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                — Anas Yakubu, somewhere at 2 AM
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="bg-zinc-950 p-6 group hover:bg-white/[0.02] transition-colors duration-300"
                >
                  <div className="font-display text-5xl md:text-6xl leading-none tracking-[-0.04em] font-medium text-white group-hover:text-amber-400 transition-colors duration-300">
                    {s.value}
                  </div>
                  <div className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile-only "full bio" link */}
            <Link
              to="/about"
              className="md:hidden mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 hover:text-amber-400 transition-colors group"
            >
              Full bio
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;