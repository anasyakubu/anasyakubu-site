// src/pages/Writing.tsx
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search, Clock } from 'lucide-react';
import { posts, getTags, formatDate } from '../../data/posts';

const Writing: React.FC = () => {
  const tags = useMemo(() => getTags(), []);
  const [activeTag, setActiveTag] = useState('All');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    return posts.filter(p => {
      const matchesTag =
        activeTag === 'All' || p.tags.includes(activeTag);
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === '' ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [activeTag, query]);

  const featured = posts.find(p => p.featured);

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
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-amber-400/[0.05] blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="flex items-center justify-between mb-10 md:mb-14">
            <div className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
              <span>/ 01</span>
              <span className="w-8 h-px bg-zinc-700" />
              <span className="text-zinc-300">Writing</span>
            </div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
              {posts.length} posts
            </span>
          </div>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl" role="img" aria-label="writing">
                ✍️
              </span>
              <p className="font-mono text-sm uppercase tracking-[0.18em] text-zinc-400">
                Notes & essays
              </p>
            </div>
            <h1 className="font-display font-medium text-white leading-[0.95] tracking-[-0.04em] text-5xl md:text-7xl lg:text-[88px]">
              Thoughts on{' '}
              <span className="italic text-amber-400 font-light">
                code & craft
              </span>
              .
            </h1>
            <p className="mt-6 text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl">
              Essays on engineering, career growth, and the occasional deep
              dive into something I built.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Featured ---------- */}
      {featured && activeTag === 'All' && query === '' && (
        <section className="relative bg-zinc-950 border-t border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 md:py-16">
            <Link
              to={`/writing/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white/[0.02] border border-white/[0.06] hover:border-amber-400/30 rounded-2xl overflow-hidden p-6 md:p-8 transition-all duration-500"
            >
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-zinc-900 order-1 lg:order-none">
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                />
                <span className="absolute top-4 left-4 px-2.5 py-1 bg-amber-400 rounded-full font-mono text-[9.5px] uppercase tracking-[0.18em] text-zinc-950 font-semibold">
                  Featured
                </span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  <span>{formatDate(featured.date)}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {featured.readingTime} min read
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] font-medium text-white group-hover:text-amber-400 transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-4 text-zinc-400 text-[15px] md:text-base leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-amber-400">
                  Read essay
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ---------- List ---------- */}
      <section className="relative bg-zinc-950 text-white border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 md:py-20">
          {/* Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-10 md:mb-12">
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              {tags.map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTag(t)}
                  className={`px-4 py-2 rounded-full font-mono text-[10.5px] uppercase tracking-[0.15em] border transition-all duration-300 ${activeTag === t
                    ? 'bg-amber-400 border-amber-400 text-zinc-950 font-semibold'
                    : 'bg-transparent border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative lg:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search posts…"
                className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/50 rounded-full pl-10 pr-4 py-2.5 text-[14px] text-white placeholder:text-zinc-600 outline-none transition-colors font-mono"
              />
            </div>
          </div>

          {/* Posts */}
          {visible.length > 0 ? (
            <div className="border-t border-white/[0.06]">
              {visible.map((p, idx) => (
                <Link
                  key={p.slug}
                  to={`/writing/${p.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-5 md:gap-8 items-center py-7 border-b border-white/[0.06] hover:bg-white/[0.015] hover:px-4 transition-all duration-300"
                >
                  {/* Index + date */}
                  <div className="flex md:flex-col gap-3 md:gap-1">
                    <span className="font-mono text-[11px] text-zinc-600 group-hover:text-amber-400 transition-colors">
                      /{String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-zinc-500">
                      {formatDate(p.date)}
                    </span>
                  </div>

                  {/* Title + excerpt */}
                  <div className="min-w-0">
                    <h3 className="font-display text-xl md:text-2xl tracking-[-0.02em] font-medium text-white group-hover:text-amber-400 transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-zinc-400 text-[14px] leading-relaxed line-clamp-2">
                      {p.excerpt}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {p.tags.map(t => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-white/[0.03] border border-white/[0.06] rounded font-mono text-[9.5px] uppercase tracking-[0.1em] text-zinc-500"
                        >
                          {t}
                        </span>
                      ))}
                      <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.15em] text-zinc-600">
                        <Clock className="w-3 h-3" />
                        {p.readingTime} min
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <span className="hidden md:flex w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.06] group-hover:bg-amber-400 group-hover:border-amber-400 items-center justify-center transition-all duration-300">
                    <ArrowUpRight
                      className="w-4 h-4 text-amber-400 group-hover:text-zinc-950 transition-colors"
                      strokeWidth={2.5}
                    />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                No posts match your search
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Writing;