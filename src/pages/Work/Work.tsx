// src/pages/Work.tsx
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { projects, getCategories } from '../../data/projects';

const Work: React.FC = () => {
  const categories = useMemo(() => getCategories(), []);
  const [active, setActive] = useState<string>('All');

  const visible = useMemo(
    () =>
      active === 'All'
        ? projects
        : projects.filter(p => p.category === active),
    [active]
  );

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative bg-zinc-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-amber-400/[0.05] blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="flex items-center justify-between mb-10 md:mb-14">
            <div className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
              <span>/ 01</span>
              <span className="w-8 h-px bg-zinc-700" />
              <span className="text-zinc-300">Work</span>
            </div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
              {projects.length} projects
            </span>
          </div>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl" role="img" aria-label="folder">
                🗂️
              </span>
              <p className="font-mono text-sm uppercase tracking-[0.18em] text-zinc-400">
                Selected projects
              </p>
            </div>
            <h1 className="font-display font-medium text-white leading-[0.95] tracking-[-0.04em] text-5xl md:text-7xl lg:text-[88px]">
              Things I've{' '}
              <span className="italic text-amber-400 font-light">built</span>.
            </h1>
            <p className="mt-6 text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl">
              A look at the products, platforms, and sites I've designed and
              engineered — from SaaS suites to institutional websites.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Grid ---------- */}
      <section className="relative bg-zinc-950 text-white border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14 md:py-20">
          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-10 md:mb-14">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 rounded-full font-mono text-[10.5px] uppercase tracking-[0.15em] border transition-all duration-300 ${active === c
                    ? 'bg-amber-400 border-amber-400 text-zinc-950 font-semibold'
                    : 'bg-transparent border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
                  }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {visible.map((p, idx) => (
              <Link
                key={p.slug}
                to={`/work/${p.slug}`}
                className="group relative bg-white/[0.02] border border-white/[0.06] hover:border-amber-400/30 rounded-2xl overflow-hidden transition-all duration-500"
              >
                {/* Cover */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.04] transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                  {/* Top tags */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-zinc-950/70 backdrop-blur-md border border-white/10 rounded-full font-mono text-[9.5px] uppercase tracking-[0.18em] text-zinc-300">
                      {p.category}
                    </span>
                    {p.featured && (
                      <span className="px-2.5 py-1 bg-amber-400 rounded-full font-mono text-[9.5px] uppercase tracking-[0.18em] text-zinc-950 font-semibold">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Index */}
                  <span className="absolute top-4 right-4 font-mono text-[10.5px] text-zinc-400">
                    /{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                    <span>{p.year}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    <span>{p.role}</span>
                    <span
                      className={`ml-auto flex items-center gap-1.5 ${p.status === 'ongoing'
                          ? 'text-emerald-400'
                          : 'text-zinc-500'
                        }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${p.status === 'ongoing'
                            ? 'bg-emerald-400'
                            : 'bg-zinc-600'
                          }`}
                      />
                      {p.status}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl tracking-[-0.02em] font-medium text-white group-hover:text-amber-400 transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-zinc-400 text-[14.5px] leading-relaxed">
                    {p.tagline}
                  </p>

                  {/* Stack */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map(s => (
                      <span
                        key={s}
                        className="px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded-md font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-400"
                      >
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 4 && (
                      <span className="px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-600">
                        +{p.stack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-400 group-hover:text-amber-400 transition-colors">
                      View case study
                    </span>
                    <span className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.06] group-hover:bg-amber-400 group-hover:border-amber-400 flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight
                        className="w-4 h-4 text-amber-400 group-hover:text-zinc-950 transition-colors"
                        strokeWidth={2.5}
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {visible.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                No projects in this category yet
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Work;