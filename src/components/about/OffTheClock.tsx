// src/components/about/OffTheClock.tsx
import React from 'react';

const interests = [
  { label: 'Watching anime', detail: 'Shōnen, seinen, anything with great pacing' },
  { label: 'Reading docs', detail: 'Yes, for fun. The good ones are literature.' },
  { label: 'Tinkering with side projects', detail: 'Daily Lab, the lab, never sleeps' },
  { label: 'Mentoring juniors', detail: 'Pay it forward — someone did this for me' },
  { label: 'Coffee', detail: 'Strong, black, no sugar' },
  { label: 'Open source', detail: 'Contributing where I can, learning everywhere' },
];

const OffTheClock: React.FC = () => {
  return (
    <section className="relative bg-zinc-950 text-white border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
              <span>/ 04</span>
              <span className="w-8 h-px bg-zinc-700" />
              <span className="text-zinc-300">Off the clock</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.03em] font-medium">
              When I'm{' '}
              <span className="italic text-amber-400 font-light">
                not coding
              </span>
              .
            </h2>
            <p className="mt-5 text-zinc-400 text-[15px] leading-relaxed max-w-sm">
              The things that keep me sharp, curious, and human in between
              commits.
            </p>
          </div>

          {/* List */}
          <div className="lg:col-span-8">
            <ul className="border-t border-white/[0.06]">
              {interests.map((item, i) => (
                <li
                  key={i}
                  className="group flex items-baseline justify-between gap-6 py-5 border-b border-white/[0.06] hover:pl-3 transition-all duration-300"
                >
                  <div className="flex items-baseline gap-4 min-w-0">
                    <span className="font-mono text-[11px] text-zinc-600 group-hover:text-amber-400 transition-colors flex-shrink-0">
                      /{String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-xl md:text-2xl tracking-[-0.02em] font-medium text-white group-hover:text-amber-400 transition-colors truncate">
                      {item.label}
                    </span>
                  </div>
                  <span className="hidden md:block font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500 text-right flex-shrink-0">
                    {item.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffTheClock;