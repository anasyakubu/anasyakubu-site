// src/pages/WorkDetail.tsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Check,
} from 'lucide-react';
import { getProject, getAdjacentProjects } from '../../data/projects';
import { FaGithub } from 'react-icons/fa';

const WorkDetail: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const project = getProject(slug);
  const { prev, next } = getAdjacentProjects(slug);

  // ---------- Not found ----------
  if (!project) {
    return (
      <section className="bg-zinc-950 text-white min-h-[60vh] flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 text-center w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/30 bg-rose-500/[0.05] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-rose-300">
              Project not found
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-[-0.03em]">
            No project at{' '}
            <span className="italic text-amber-400 font-light">
              /{slug}
            </span>
          </h1>
          <Link
            to="/work"
            className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all work
          </Link>
        </div>
      </section>
    );
  }

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

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-12 pb-10 md:pt-16 md:pb-12">
          {/* Back link */}
          <Link
            to="/work"
            className="inline-flex items-center gap-2 mb-10 font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500 hover:text-amber-400 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            All work
          </Link>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-6 font-mono text-[10.5px] uppercase tracking-[0.18em]">
            <span className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.08] rounded-full text-zinc-300">
              {project.category}
            </span>
            <span className="text-zinc-500">{project.year}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="text-zinc-500">{project.role}</span>
            <span
              className={`flex items-center gap-1.5 ${project.status === 'ongoing'
                ? 'text-emerald-400'
                : 'text-zinc-500'
                }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${project.status === 'ongoing'
                  ? 'bg-emerald-400 animate-pulse'
                  : 'bg-zinc-600'
                  }`}
              />
              {project.status}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display font-medium text-white leading-[0.95] tracking-[-0.04em] text-5xl md:text-7xl lg:text-[80px] max-w-4xl">
            {project.title}
            <span className="text-amber-400 italic font-light">.</span>
          </h1>
          <p className="mt-6 text-zinc-300 text-lg md:text-xl leading-relaxed max-w-2xl font-display font-light">
            {project.tagline}
          </p>

          {/* Links */}
          {(project.links.live || project.links.github) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 px-5 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-[0.15em] font-semibold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.5} />
                  Visit live site
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:rotate-45" />
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2.5 border border-white/15 hover:border-white/40 text-white px-5 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-[0.15em] font-semibold transition-colors"
                >
                  <FaGithub className="w-3.5 h-3.5" strokeWidth={2} />
                  Source code
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:rotate-45" />
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ---------- Cover image ---------- */}
      <section className="relative bg-zinc-950">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-4">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.08] bg-zinc-900">
            <img
              src={project.cover}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.04] rounded-2xl pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ---------- Body ---------- */}
      <section className="relative bg-zinc-950 text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Description */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-8 font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
                <span>/ 02</span>
                <span className="w-8 h-px bg-zinc-700" />
                <span className="text-zinc-300">Overview</span>
              </div>

              <p className="font-display text-2xl md:text-3xl leading-[1.3] tracking-[-0.01em] text-white/95 mb-8">
                {project.summary}
              </p>

              <div className="space-y-5 text-zinc-400 text-base md:text-[17px] leading-[1.75]">
                {project.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Highlights */}
              <div className="mt-12">
                <h3 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500 mb-5">
                  / Key highlights
                </h3>
                <ul className="space-y-3">
                  {project.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-zinc-300 text-[15px]"
                    >
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center flex-shrink-0">
                        <Check
                          className="w-3 h-3 text-amber-400"
                          strokeWidth={3}
                        />
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 lg:pl-12 lg:border-l lg:border-white/[0.06]">
              <div className="lg:sticky lg:top-24 space-y-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
                <DetailRow label="Role" value={project.role} />
                <DetailRow label="Year" value={project.year} />
                <DetailRow label="Category" value={project.category} />
                <DetailRow
                  label="Status"
                  value={
                    project.status.charAt(0).toUpperCase() +
                    project.status.slice(1)
                  }
                />

                {/* Stack block */}
                <div className="bg-zinc-950 p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 mb-4">
                    Tech stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(s => (
                      <span
                        key={s}
                        className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.08] rounded-md font-mono text-[10.5px] uppercase tracking-[0.1em] text-zinc-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Prev / Next ---------- */}
      <section className="relative bg-zinc-950 text-white border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Prev */}
            {prev ? (
              <Link
                to={`/work/${prev.slug}`}
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

            {/* Next */}
            {next ? (
              <Link
                to={`/work/${next.slug}`}
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

          {/* Back to all */}
          <div className="mt-8 text-center">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 hover:text-amber-400 transition-colors"
            >
              View all projects
              <ArrowUpRight className="w-4 h-4 transition-transform hover:rotate-45" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

const DetailRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="bg-zinc-950 px-6 py-4 flex items-center justify-between">
    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
      {label}
    </span>
    <span className="font-display text-[15px] font-medium text-white">
      {value}
    </span>
  </div>
);

export default WorkDetail;