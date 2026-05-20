// src/components/security/SecurityServices.tsx
import React from 'react';
import {
  Camera,
  Lock,
  Bell,
  Flame,
  Radio,
  KeyRound,
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

const services: Service[] = [
  {
    id: '01',
    title: 'CCTV &amp; Surveillance',
    description:
      'High-resolution camera systems with intelligent monitoring, designed for clear identification and 24/7 oversight of your premises.',
    icon: <Camera className="w-5 h-5 stroke-[2.2]" />,
    image:
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '02',
    title: 'Access Control Systems',
    description:
      'Card readers, biometric scanners, and digital access management — controlling exactly who enters which areas, and when.',
    icon: <KeyRound className="w-5 h-5 stroke-[2.2]" />,
    image:
      'https://images.unsplash.com/photo-1614064743397-7e6e9c1cb20a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '03',
    title: 'Intrusion Detection',
    description:
      'Motion sensors, perimeter alerts, and intelligent alarm systems that detect threats before they escalate.',
    icon: <Bell className="w-5 h-5 stroke-[2.2]" />,
    image:
      'https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '04',
    title: 'Fire &amp; Safety Systems',
    description:
      'Smoke detection, fire alarms, and integrated safety appliances — protecting people and property from fire-related risks.',
    icon: <Flame className="w-5 h-5 stroke-[2.2]" />,
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '05',
    title: 'Smart Lock Solutions',
    description:
      'Electronic locks, master key systems, and remote access controls — modern locking infrastructure for residential and commercial sites.',
    icon: <Lock className="w-5 h-5 stroke-[2.2]" />,
    image:
      'https://images.unsplash.com/photo-1564540583246-934409427776?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '06',
    title: 'Communication Systems',
    description:
      'Two-way radios, intercoms, and emergency communication infrastructure — keeping your team connected when it matters most.',
    icon: <Radio className="w-5 h-5 stroke-[2.2]" />,
    image:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
  },
];

const SecurityServices: React.FC = () => {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 md:mb-16">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-[#7A1F47]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A1F47]">
                Our Services
              </span>
            </div>
            <h2 className="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
              Comprehensive
              <br />
              security solutions.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-4">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              From electronic surveillance to physical access control — we
              design and deploy integrated security infrastructure tailored to
              the specific needs of your organization, site, or facility.
            </p>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <article
              key={service.id}
              className="group bg-white border border-gray-100 hover:border-[#7A1F47]/40 rounded-lg overflow-hidden transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title.replace(/&amp;/g, '&')}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#7A1F47]/30 group-hover:bg-[#7A1F47]/20 transition-colors duration-300" />

                {/* Number badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1.5 bg-white text-[#7A1F47] text-[10px] font-semibold uppercase tracking-[0.15em] rounded-md">
                    Service {service.id}
                  </span>
                </div>

                {/* Icon badge */}
                <div className="absolute bottom-4 right-4 w-11 h-11 rounded-lg bg-white/95 flex items-center justify-center">
                  <span className="text-[#7A1F47]">{service.icon}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7 md:p-8">
                <h3
                  className="font-display font-bold text-[#1a1a1a] group-hover:text-[#7A1F47] text-lg md:text-xl mb-3 leading-tight transition-colors"
                  dangerouslySetInnerHTML={{ __html: service.title }}
                />
                <p
                  className="text-gray-600 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityServices;