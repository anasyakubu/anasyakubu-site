// src/components/projects/ProjectStats.tsx
import React from 'react';
import { TrendingUp, Users, Award, Map } from 'lucide-react';

const stats = [
  {
    id: '01',
    value: '10',
    suffix: '+',
    label: 'Projects Delivered',
    description: 'Completed across three divisions in Nigeria and beyond.',
    icon: <TrendingUp className="w-5 h-5 stroke-[2.2]" />,
  },
  {
    id: '02',
    value: '50',
    suffix: '+',
    label: 'Investment Areas',
    description: 'Distinct service categories within our active portfolio.',
    icon: <Map className="w-5 h-5 stroke-[2.2]" />,
  },
  {
    id: '03',
    value: '100',
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'Built on transparent communication and delivered results.',
    icon: <Users className="w-5 h-5 stroke-[2.2]" />,
  },
  {
    id: '04',
    value: 'Multi',
    suffix: '',
    label: 'Sector Expertise',
    description: 'Architecture, agriculture, and security under one roof.',
    icon: <Award className="w-5 h-5 stroke-[2.2]" />,
  },
];

const ProjectStats: React.FC = () => {
  return (
    <section className="relative bg-[#7A1F47] text-white py-20 md:py-28 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2000&q=80"
          alt="Portfolio background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#5C1735]/92" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M20 0v40M0 20h40'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-white/60" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
              By the Numbers
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
            A portfolio
            <br />
            measured in trust.
          </h2>
          <p className="text-white/85 text-base md:text-lg leading-relaxed">
            Every project in our portfolio represents a relationship — built on
            careful planning, honest communication, and the consistent delivery
            of what was promised.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/15 rounded-lg overflow-hidden">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-[#7A1F47] p-8 md:p-10 hover:bg-[#5C1735] transition-colors"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center">
                  <span className="text-white">{stat.icon}</span>
                </div>
                <span className="font-display font-bold text-white/15 text-xl tabular-nums">
                  {stat.id}
                </span>
              </div>

              <div className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-3">
                {stat.value}
                <span className="text-white/60">{stat.suffix}</span>
              </div>
              <div className="font-display font-bold text-base text-white mb-2">
                {stat.label}
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectStats;