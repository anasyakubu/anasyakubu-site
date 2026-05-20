// src/components/security/SecurityApproach.tsx
import React from 'react';
import { Search, Lightbulb, Settings, ShieldCheck } from 'lucide-react';

interface ApproachStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: ApproachStep[] = [
  {
    id: '01',
    title: 'Identify the Risks',
    description:
      'We start by understanding your environment, your assets, and the specific threats you face — no generic templates.',
    icon: <Search className="w-5 h-5 stroke-[2.2]" />,
  },
  {
    id: '02',
    title: 'Translate into Solutions',
    description:
      'We turn identified risks into effective, practical responses — combining proven products with custom components when needed.',
    icon: <Lightbulb className="w-5 h-5 stroke-[2.2]" />,
  },
  {
    id: '03',
    title: 'Implement &amp; Integrate',
    description:
      'Our team installs and configures systems with precision — testing every layer to ensure reliable performance.',
    icon: <Settings className="w-5 h-5 stroke-[2.2]" />,
  },
  {
    id: '04',
    title: 'Take Responsibility',
    description:
      'We take ownership of the outcome. Your security is our promise — measurable, accountable, ongoing.',
    icon: <ShieldCheck className="w-5 h-5 stroke-[2.2]" />,
  },
];

const SecurityApproach: React.FC = () => {
  return (
    <section className="bg-gray-50/60 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading + featured image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-14 md:mb-16 items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-[#7A1F47]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A1F47]">
                Our Approach
              </span>
            </div>
            <h2 className="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
              We unburden
              <br />
              our clients.
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              BERYL Holdings wants to unburden our clients when it comes to
              safety and security. We identify risks and translate them into
              effective, practical solutions — enabling you to manage your
              physical risks with measurable control.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80"
                alt="Security camera installation"
                className="w-full h-auto object-cover aspect-[5/4]"
              />
              <div className="absolute inset-0 bg-[#7A1F47]/10" />
            </div>
          </div>
        </div>

        {/* Approach steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100 rounded-lg overflow-hidden">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className="bg-white p-8 md:p-9 hover:bg-gray-50/80 transition-colors group relative"
            >
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 right-0 w-px h-8 bg-[#7A1F47]/20" />
              )}

              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-lg bg-[#7A1F47]/10 group-hover:bg-[#7A1F47] flex items-center justify-center transition-colors">
                  <span className="text-[#7A1F47] group-hover:text-white transition-colors">
                    {step.icon}
                  </span>
                </div>
                <span className="font-display font-bold text-gray-200 text-xl tabular-nums">
                  {step.id}
                </span>
              </div>

              <h3
                className="font-display font-bold text-[#1a1a1a] text-base md:text-lg mb-3 leading-tight"
                dangerouslySetInnerHTML={{ __html: step.title }}
              />
              <p
                className="text-gray-600 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: step.description }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityApproach;