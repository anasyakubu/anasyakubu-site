// src/components/projects/FeaturedProjects.tsx
import React from 'react';
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react';
import type { ProjectCategory } from './projectsData';
import { projects } from './projectsData';

const categoryLabels: Record<ProjectCategory, string> = {
  architecture: 'Architecture',
  agriculture: 'Agriculture',
  security: 'Security',
};

const FeaturedProjects: React.FC = () => {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const [primary, ...secondary] = featured;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 md:mb-16">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-[#7A1F47]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A1F47]">
                Featured Work
              </span>
            </div>
            <h2 className="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
              Selected
              <br />
              highlights.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-4">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Three projects that illustrate the breadth of what BERYL Holdings
              delivers — from luxury residential complexes to nationwide
              agricultural rollouts.
            </p>
          </div>
        </div>

        {/* Asymmetric featured layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Primary featured card — large */}
          {primary && (
            <a
              href={primary.href}
              className="lg:col-span-7 group block bg-white border border-gray-100 hover:border-[#7A1F47]/40 rounded-lg overflow-hidden transition-all duration-300"
            >
              <div className="aspect-[16/11] relative overflow-hidden">
                <img
                  src={primary.image}
                  alt={primary.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-[#1a1a1a]/20 to-transparent" />

                {/* Top badge */}
                <div className="absolute top-6 left-6">
                  <span className="inline-block px-3 py-1.5 bg-white text-[#7A1F47] text-[10px] font-semibold uppercase tracking-[0.15em] rounded-md">
                    {categoryLabels[primary.category]}
                  </span>
                </div>

                {/* Bottom content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <div className="flex items-center gap-4 text-xs font-medium text-white/80 mb-3">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{primary.location}</span>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{primary.year}</span>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight">
                    {primary.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">
                  Client — {primary.client}
                </div>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                  {primary.description}
                </p>
                <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                  <span className="text-[#7A1F47] text-xs font-semibold uppercase tracking-[0.15em]">
                    View Full Case Study
                  </span>
                  <span className="w-10 h-10 rounded-md bg-gray-50 group-hover:bg-[#7A1F47] flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-[#7A1F47] group-hover:text-white stroke-[2.5] transition-colors" />
                  </span>
                </div>
              </div>
            </a>
          )}

          {/* Secondary featured cards — stacked */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            {secondary.map((project) => (
              <a
                key={project.id}
                href={project.href}
                className="group flex-1 block bg-white border border-gray-100 hover:border-[#7A1F47]/40 rounded-lg overflow-hidden transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row lg:flex-col h-full">
                  <div className="sm:w-2/5 lg:w-full aspect-[16/11] sm:aspect-auto lg:aspect-[16/9] relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#7A1F47]/15 group-hover:bg-[#7A1F47]/10 transition-colors" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-2.5 py-1 bg-white text-[#7A1F47] text-[10px] font-semibold uppercase tracking-[0.15em] rounded-md">
                        {categoryLabels[project.category]}
                      </span>
                    </div>
                  </div>

                  <div className="sm:w-3/5 lg:w-full p-6 md:p-7 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-3 uppercase tracking-wider font-semibold">
                      <span>{project.location}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span>{project.year}</span>
                    </div>
                    <h3 className="font-display font-bold text-[#1a1a1a] group-hover:text-[#7A1F47] text-lg md:text-xl leading-tight mb-3 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                      <span className="text-[#7A1F47] text-[11px] font-semibold uppercase tracking-[0.15em]">
                        Case Study
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#7A1F47] stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;