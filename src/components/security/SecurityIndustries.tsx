// src/components/security/SecurityIndustries.tsx
import React from 'react';
import {
  Building2,
  Landmark,
  Factory,
  Hotel,
  GraduationCap,
  ShoppingBag,
} from 'lucide-react';

interface Industry {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const industries: Industry[] = [
  {
    id: '01',
    name: 'Corporate Offices',
    description:
      'Multi-tenant buildings, headquarters, and business parks requiring layered access control.',
    icon: <Building2 className="w-5 h-5 stroke-[2.2]" />,
  },
  {
    id: '02',
    name: 'Government &amp; Institutional',
    description:
      'Public sector facilities with strict compliance and high-stakes security requirements.',
    icon: <Landmark className="w-5 h-5 stroke-[2.2]" />,
  },
  {
    id: '03',
    name: 'Industrial &amp; Manufacturing',
    description:
      'Plants, warehouses, and supply-chain facilities protecting assets and operations.',
    icon: <Factory className="w-5 h-5 stroke-[2.2]" />,
  },
  {
    id: '04',
    name: 'Hospitality',
    description:
      'Hotels, resorts, and event venues balancing guest experience with discreet protection.',
    icon: <Hotel className="w-5 h-5 stroke-[2.2]" />,
  },
  {
    id: '05',
    name: 'Education',
    description:
      'Schools, universities, and training facilities prioritising student and staff safety.',
    icon: <GraduationCap className="w-5 h-5 stroke-[2.2]" />,
  },
  {
    id: '06',
    name: 'Retail &amp; Commercial',
    description:
      'Stores, malls, and commercial complexes guarding inventory and high foot-traffic spaces.',
    icon: <ShoppingBag className="w-5 h-5 stroke-[2.2]" />,
  },
];

const SecurityIndustries: React.FC = () => {
  return (
    <section className="bg-gray-50/60 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 md:mb-16">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-[#7A1F47]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A1F47]">
                Who We Serve
              </span>
            </div>
            <h2 className="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
              Industries
              <br />
              we protect.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-4">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Every sector has its own risk profile. Our team designs security
              infrastructure that respects the operational realities of your
              industry — and the people who work and visit your spaces every
              day.
            </p>
          </div>
        </div>

        {/* Industries grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-lg overflow-hidden">
          {industries.map((industry) => (
            <div
              key={industry.id}
              className="bg-white p-8 md:p-10 hover:bg-gray-50/80 transition-colors group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-lg bg-[#7A1F47]/10 group-hover:bg-[#7A1F47] flex items-center justify-center transition-colors">
                  <span className="text-[#7A1F47] group-hover:text-white transition-colors">
                    {industry.icon}
                  </span>
                </div>
                <span className="font-display font-bold text-gray-200 text-2xl tabular-nums">
                  {industry.id}
                </span>
              </div>

              <h3
                className="font-display font-bold text-[#1a1a1a] text-lg md:text-xl mb-3 leading-tight"
                dangerouslySetInnerHTML={{ __html: industry.name }}
              />
              <p
                className="text-gray-600 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: industry.description }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityIndustries;