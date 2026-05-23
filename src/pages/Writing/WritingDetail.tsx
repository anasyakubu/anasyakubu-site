// src/pages/WritingDetail.tsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { getPost, getAdjacentPosts, formatDate } from '../../data/posts';
import Markdown from '../../components/writing/Markdown';

const WritingDetail: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const post = getPost(slug);
  const { prev, next } = getAdjacentPosts(slug);

  // ---------- Not found ----------
  if (!post) {
    return (
      <section className="bg-zinc-950 text-white min-h-[60vh] flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 text-center w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/30 bg-rose-500/[0.05] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-rose-300">
              Post not found
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-[-0.03em]">
            No post at{' '}
            <span className="italic text-amber-400 font-light">/{slug}</span>
          </h1>
          <Link
            to="/writing"
            className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all writing
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ---------- Header ---------- */}
      <section className="relative bg-zinc-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative max-w-[820px] mx-auto px-6 lg:px-10 pt-12 pb-8 md:pt-16">
          {/* Back */}
          <Link
            to="/writing"
            className="inline-flex items-center gap-2 mb-10 font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500 hover:text-amber-400 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            All writing
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map(t => (
              <span
                key={t}
                className="px-3 py-1 bg-white/[0.03] border border-white/[0.08] rounded-full font-mono text-[10px] uppercase tracking-[0.15em] text-amber-400"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display font-medium text-white leading-[1.02] tracking-[-0.03em] text-4xl md:text-5xl lg:text-[56px]">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-5 text-zinc-400 text-lg leading-relaxed font-display font-light">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="mt-7 flex flex-wrap items-center gap-5 font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
            <span className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* ---------- Cover ---------- */}
      <section className="relative bg-zinc-950">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-6">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.08] bg-zinc-900">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ---------- Body ---------- */}
      <section className="relative bg-zinc-950 text-white">
        <article className="max-w-[820px] mx-auto px-6 lg:px-10 py-10 md:py-16">
          <Markdown content={post.content} />

          {/* Signature */}
          <div className="mt-16 pt-8 border-t border-white/[0.06] flex items-center gap-4">
            <div className="w-11 h-11 bg-amber-400 flex items-center justify-center rounded-sm flex-shrink-0">
              <span className="font-display font-black text-zinc-950 text-base leading-none">
                AY
              </span>
            </div>
            <div>
              <p className="font-display text-base font-medium text-white">
                Anas Yakubu
              </p>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-zinc-500 mt-0.5">
                Lead Frontend Engineer · Kano, NG
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* ---------- Prev / Next ---------- */}
      <section className="relative bg-zinc-950 text-white border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prev ? (
              <Link
                to={`/writing/${prev.slug}`}
                className="group flex items-center gap-4 p-6 bg-white/[0.02] border border-white/[0.06] hover:border-amber-400/30 rounded-2xl transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-zinc-500 group-hover:text-amber-400 transition-all group-hover:-translate-x-1 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                    Previous
                  </div>
                  <div className="font-display text-lg font-medium text-white group-hover:text-amber-400 transition-colors truncate">
                    {prev.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div className="hidden md:block" />
            )}

            {next ? (
              <Link
                to={`/writing/${next.slug}`}
                className="group flex items-center justify-end gap-4 p-6 bg-white/[0.02] border border-white/[0.06] hover:border-amber-400/30 rounded-2xl transition-all text-right"
              >
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                    Next
                  </div>
                  <div className="font-display text-lg font-medium text-white group-hover:text-amber-400 transition-colors truncate">
                    {next.title}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-amber-400 transition-all group-hover:translate-x-1 flex-shrink-0" />
              </Link>
            ) : (
              <div className="hidden md:block" />
            )}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/writing"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 hover:text-amber-400 transition-colors"
            >
              View all writing
              <ArrowUpRight className="w-4 h-4 transition-transform hover:rotate-45" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default WritingDetail;