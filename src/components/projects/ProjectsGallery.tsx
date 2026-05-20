// src/components/projects/ProjectsGallery.tsx
import React, { useState, useMemo } from 'react';
import {
  ArrowUpRight,
  MapPin,
  Calendar,
  Grid3x3,
  Building2,
  Sprout,
  ShieldCheck,
  Search,
  X,
} from 'lucide-react';
import { projects, } from './projectsData';
import type { ProjectCategory } from './projectsData';

type FilterCategory = 'all' | ProjectCategory;

interface Filter {
  id: FilterCategory;
  label: string;
  icon: React.ReactNode;
}

const filters: Filter[] = [
  {
    id: 'all',
    label: 'All Projects',
    icon: <Grid3x3 className="w-4 h-4 stroke-[2.2]" />,
  },
  {
    id: 'architecture',
    label: 'Architecture',
    icon: <Building2 className="w-4 h-4 stroke-[2.2]" />,
  },
  {
    id: 'agriculture',
    label: 'Agriculture',
    icon: <Sprout className="w-4 h-4 stroke-[2.2]" />,
  },
  {
    id: 'security',
    label: 'Security',
    icon: <ShieldCheck className="w-4 h-4 stroke-[2.2]" />,
  },
];

const categoryLabels: Record<ProjectCategory, string> = {
  architecture: 'Architecture',
  agriculture: 'Agriculture',
  security: 'Security',
};

const ProjectsGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    let result = projects;

    if (activeFilter !== 'all') {
      result = result.filter((p) => p.category === activeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.client.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [activeFilter, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: projects.length,
      architecture: projects.filter((p) => p.category === 'architecture').length,
      agriculture: projects.filter((p) => p.category === 'agriculture').length,
      security: projects.filter((p) => p.category === 'security').length,
    };
  }, []);

  return (
    <section className="bg-gray-50/60 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 md:mb-14">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-[#7A1F47]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A1F47]">
                Complete Portfolio
              </span>
            </div>
            <h2 className="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
              Browse all
              <br />
              our projects.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-4">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Filter by division or search by client, location, or service type
              to find work most relevant to your interests.
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white border border-gray-100 rounded-lg p-4 md:p-5 mb-8 md:mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
            {/* Filter tabs */}
            <div className="flex flex-wrap items-center gap-2 flex-1">
              {filters.map((filter) => {
                const isActive = activeFilter === filter.id;
                const count = counts[filter.id];
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${isActive
                      ? 'bg-[#7A1F47] text-white'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-[#1a1a1a]'
                      }`}
                  >
                    {filter.icon}
                    <span>{filter.label}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] tabular-nums ${isActive
                        ? 'bg-white/15 text-white'
                        : 'bg-white text-gray-400'
                        }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative lg:w-72 lg:flex-shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 stroke-[2.2]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-transparent focus:bg-white focus:border-[#7A1F47] focus:ring-1 focus:ring-[#7A1F47] rounded-md text-sm placeholder:text-gray-400 outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3 text-gray-600 stroke-[2.5]" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-gray-600">
            Showing{' '}
            <span className="font-display font-bold text-[#1a1a1a] tabular-nums">
              {filteredProjects.length}
            </span>{' '}
            of{' '}
            <span className="font-display font-bold text-[#1a1a1a] tabular-nums">
              {projects.length}
            </span>{' '}
            projects
          </p>
        </div>

        {/* Grid or Empty state */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-lg p-16 md:p-20 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-50 flex items-center justify-center mb-6">
              <Search className="w-6 h-6 text-gray-400 stroke-[2]" />
            </div>
            <h3 className="font-display font-bold text-[#1a1a1a] text-xl mb-3">
              No projects found
            </h3>
            <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
              We couldn&apos;t find projects matching your filters. Try
              adjusting your search or clearing the filters.
            </p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7A1F47] hover:bg-[#5C1735] text-white text-sm font-semibold rounded-md transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <article key={project.id} className="group">
                <a
                  href={project.href}
                  className="block bg-white border border-gray-100 hover:border-[#7A1F47]/40 rounded-lg overflow-hidden transition-all duration-300 h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 via-transparent to-transparent" />

                    {/* Top badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                      <span className="inline-block px-2.5 py-1 bg-white text-[#7A1F47] text-[10px] font-semibold uppercase tracking-[0.15em] rounded-md">
                        {categoryLabels[project.category]}
                      </span>
                      {project.status === 'ongoing' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#7A1F47] text-white text-[10px] font-semibold uppercase tracking-[0.15em] rounded-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          Ongoing
                        </span>
                      )}
                    </div>

                    {/* Bottom meta */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 text-white text-[11px] font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 stroke-[2.5]" />
                        <span>{project.location}</span>
                      </div>
                      <span className="w-1 h-1 rounded-full bg-white/50" />
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 stroke-[2.5]" />
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-7 flex-1 flex flex-col">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">
                      Client — {project.client}
                    </div>
                    <h3 className="font-display font-bold text-[#1a1a1a] group-hover:text-[#7A1F47] text-base md:text-lg leading-tight mb-3 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-0.5 bg-gray-50 text-gray-600 text-[10px] font-medium rounded border border-gray-100"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 2 && (
                        <span className="inline-block px-2 py-0.5 text-gray-400 text-[10px] font-medium">
                          +{project.tags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-[#7A1F47] text-[11px] font-semibold uppercase tracking-[0.15em]">
                        Case Study
                      </span>
                      <span className="w-8 h-8 rounded-md bg-gray-50 group-hover:bg-[#7A1F47] flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#7A1F47] group-hover:text-white stroke-[2.5] transition-colors" />
                      </span>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsGallery;