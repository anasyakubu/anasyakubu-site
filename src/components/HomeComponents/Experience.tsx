// src/components/home/Experience.tsx
import React from 'react';

interface TimelineItem {
  year: string;
  role: string;
  company: string;
  type: 'work' | 'education' | 'milestone';
  description: string;
  current?: boolean;
}

const timeline: TimelineItem[] = [
  {
    year: '2024 — Now',
    role: 'Lead Frontend Engineer',
    company: 'NYM Technologies Limited',
    type: 'work',
    description:
      'Designing and developing inclusive web experiences that meet modern web standards for 1,000+ users globally.',
    current: true,
  },
  {
    year: '2023',
    role: 'Graduation Speech',
    company: 'Three-Year Engineering Milestone',
    type: 'milestone',
    description:
      'Delivered a speech reflecting on growth, challenges, and the bonds formed across three years of engineering practice.',
  },
  {
    year: '2023',
    role: 'Full-Stack Developer (Intern)',
    company: 'NYM Technologies Limited',
    type: 'work',
    description:
      'Built websites and software end-to-end — frontend, APIs, and database design — under the mentorship of senior engineers.',
  },
  {
    year: 'Ongoing',
    role: 'BSc Information Technology',
    company: 'Bayero University Kano (BUK)',
    type: 'education',
    description:
      'Foundation in programming, systems, and software development. Translating coursework into shipped product work.',
  },
];

const typeColors: Record<TimelineItem['type'], string> = {
  work: 'bg-amber-400',
  education: 'bg-sky-400',
  milestone: 'bg-rose-400',
};

const typeLabels: Record<TimelineItem['type'], string> = {
  work: 'WORK',
  education: 'EDU',
  milestone: 'MILESTONE',
};

const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative bg-zinc-950 text-white border-t border-white/[0.06]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 md:py-32">
        {/* Section header */}
        <div className="mb-14 md:mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
            <span>/ 04</span>
            <span className="w-8 h-px bg-zinc-700" />
            <span className="text-zinc-300">Journey</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.03em] font-medium">
            The path so{' '}
            <span className="italic text-amber-400 font-light">far</span>.
          </h2>
          <p className="mt-5 text-zinc-400 text-base md:text-lg leading-relaxed">
            Roles, milestones, and the education that grounds them — in
            chronological order.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />

          <div className="space-y-12 md:space-y-16">
            {timeline.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative grid grid-cols-[24px_1fr] md:grid-cols-2 gap-6 md:gap-12 ${isEven ? 'md:[&>*:last-child]:order-first' : ''
                    }`}
                >
                  {/* Dot */}
                  <div className="absolute left-3 md:left-1/2 md:-translate-x-1/2 top-2 z-10">
                    <div className="relative w-2 h-2 rounded-full bg-zinc-950 border-2 border-white/20">
                      {item.current && (
                        <>
                          <span className="absolute -inset-1 rounded-full bg-amber-400/30 animate-ping" />
                          <span className="absolute inset-0 rounded-full bg-amber-400 border-2 border-zinc-950" />
                        </>
                      )}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`col-start-2 md:col-start-auto ${isEven ? 'md:text-right md:pr-12' : 'md:pl-12'
                      }`}
                  >
                    <div
                      className={`group inline-block ${isEven ? 'md:text-right' : 'text-left'
                        }`}
                    >
                      {/* Type + year */}
                      <div
                        className={`flex items-center gap-3 mb-3 ${isEven ? 'md:justify-end' : ''
                          }`}
                      >
                        <span
                          className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${typeColors[item.type]
                              }`}
                          />
                          {typeLabels[item.type]}
                        </span>
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
                          {item.year}
                        </span>
                      </div>

                      {/* Role */}
                      <h3 className="font-display text-2xl md:text-3xl tracking-[-0.02em] font-medium text-white group-hover:text-amber-400 transition-colors duration-300">
                        {item.role}
                      </h3>

                      {/* Company */}
                      <p className="mt-1 font-display text-lg italic font-light text-zinc-400">
                        {item.company}
                      </p>

                      {/* Description */}
                      <p
                        className={`mt-4 text-zinc-400 text-[15px] leading-relaxed max-w-md ${isEven ? 'md:ml-auto' : ''
                          }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty cell on opposite side (desktop) */}
                  <div className="hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;