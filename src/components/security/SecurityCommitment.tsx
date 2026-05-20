// src/components/security/SecurityCommitment.tsx
import React from 'react';
import { Target, Users, Award } from 'lucide-react';

const SecurityCommitment: React.FC = () => {
  const stats = [
    {
      value: 'Years',
      suffix: '+',
      figure: '10',
      label: 'Of Industry Experience',
      icon: <Award className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      value: 'Risks',
      suffix: '%',
      figure: '100',
      label: 'Identified &amp; Addressed',
      icon: <Target className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      value: 'Clients',
      suffix: '',
      figure: 'Trusted',
      label: 'By Organizations Globally',
      icon: <Users className="w-5 h-5 stroke-[2.2]" />,
    },
  ];

  return (
    <section className="relative bg-[#7A1F47] text-white py-20 md:py-28 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2000&q=80"
          alt="Security professional"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#5C1735]/92" />
      </div>

      {/* Pattern */}
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
              Our Commitment
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
            We take responsibility
            <br />
            for your security.
          </h2>
          <p className="text-white/85 text-base md:text-lg leading-relaxed">
            Our solutions enable you to manage your physical risks and provide
            measurable control. We don&apos;t just install equipment — we
            commit to the realization of your safety, every step of the way.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/15 rounded-lg overflow-hidden">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#7A1F47] p-8 md:p-10 hover:bg-[#5C1735] transition-colors"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center">
                  <span className="text-white">{stat.icon}</span>
                </div>
                <span className="font-display font-bold text-white/15 text-xl tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-2">
                {stat.figure}
                <span className="text-white/60">{stat.suffix}</span>
              </div>
              <div className="text-sm font-display font-bold text-white/90 mb-1">
                {stat.value}
              </div>
              <div
                className="text-xs text-white/60 uppercase tracking-wider"
                dangerouslySetInnerHTML={{ __html: stat.label }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityCommitment;