// src/components/home/TechStack.tsx
import React, { useState } from 'react';

interface Tech {
  name: string;
  category: 'language' | 'framework' | 'database' | 'tool';
}

const techs: Tech[] = [
  // Languages
  { name: 'JavaScript', category: 'language' },
  { name: 'TypeScript', category: 'language' },
  { name: 'Python', category: 'language' },
  { name: 'PHP', category: 'language' },
  { name: 'SQL', category: 'language' },
  // Frameworks
  { name: 'React.js', category: 'framework' },
  { name: 'Next.js', category: 'framework' },
  { name: 'Node.js', category: 'framework' },
  { name: 'Tailwind CSS', category: 'framework' },
  { name: 'SCSS', category: 'framework' },
  { name: 'REST API', category: 'framework' },
  // Databases
  { name: 'MongoDB', category: 'database' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'Supabase', category: 'database' },
  { name: 'Firebase', category: 'database' },
  // Tools
  { name: 'Git', category: 'tool' },
];

const categoryColors: Record<Tech['category'], string> = {
  language: 'text-amber-400',
  framework: 'text-sky-300',
  database: 'text-emerald-300',
  tool: 'text-rose-300',
};

const categoryLabels: Record<Tech['category'], string> = {
  language: 'LANG',
  framework: 'FWK',
  database: 'DB',
  tool: 'TOOL',
};

const filters: Array<Tech['category'] | 'all'> = [
  'all',
  'language',
  'framework',
  'database',
  'tool',
];

const TechStack: React.FC = () => {
  const [active, setActive] = useState<Tech['category'] | 'all'>('all');

  const visible =
    active === 'all' ? techs : techs.filter(t => t.category === active);

  return (
    <section
      id="stack"
      className="relative bg-zinc-950 text-white border-t border-white/[0.06]"
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-24 md:py-32">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
              <span>/ 03</span>
              <span className="w-8 h-px bg-zinc-700" />
              <span className="text-zinc-300">Stack</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.03em] font-medium">
              Tools of the{' '}
              <span className="italic text-amber-400 font-light">trade</span>.
            </h2>
            <p className="mt-5 max-w-xl text-zinc-400 text-base md:text-lg leading-relaxed">
              A few technologies I've been working with recently — across the
              full stack.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-full font-mono text-[10.5px] uppercase tracking-[0.18em] border transition-all duration-300 ${active === f
                    ? 'bg-amber-400 border-amber-400 text-zinc-950 font-semibold'
                    : 'bg-transparent border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
                  }`}
              >
                {f === 'all' ? 'All' : categoryLabels[f]}
              </button>
            ))}
          </div>
        </div>

        {/* Tech grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {visible.map((tech, idx) => (
            <div
              key={tech.name}
              className="group relative bg-zinc-950 p-6 md:p-7 hover:bg-white/[0.025] transition-colors duration-500 overflow-hidden"
            >
              {/* Number */}
              <div className="font-mono text-[10.5px] text-zinc-600 mb-4">
                /{String(idx + 1).padStart(2, '0')}
              </div>

              {/* Tech name */}
              <div className="font-display text-2xl md:text-3xl tracking-[-0.02em] font-medium text-white group-hover:text-amber-400 transition-colors duration-300">
                {tech.name}
              </div>

              {/* Category tag */}
              <div className="mt-5 flex items-center justify-between">
                <span
                  className={`font-mono text-[9.5px] uppercase tracking-[0.2em] ${categoryColors[tech.category]
                    } opacity-80`}
                >
                  · {categoryLabels[tech.category]}
                </span>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ACTIVE
                </span>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="mt-8 font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-600 text-center">
          {visible.length} of {techs.length} technologies shown
        </p>
      </div>
    </section>
  );
};

export default TechStack;