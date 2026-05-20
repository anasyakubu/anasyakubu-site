// src/components/security/SecurityIntro.tsx
import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const SecurityIntro: React.FC = () => {
  const principles = [
    'Independent, experience-led security expertise.',
    'Carefully selected, innovative products from trusted manufacturers.',
    'Custom-made components when off-the-shelf isn\u0027t enough.',
    'Practical solutions that contribute to operational continuity.',
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-[#7A1F47]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A1F47]">
                Electrical &amp; Security Appliances
              </span>
            </div>

            <h2 className="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
              Independent.
              <br />
              Experienced.
              <br />
              Trusted.
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
              BERYL Holdings is an independent organization, driven by
              passionate safety and security experts. With our years of
              experience and service-oriented, professional approach, we have
              grown into a serious and valued partner within the security
              industry.
            </p>

            <p className="text-gray-600 text-base leading-relaxed mb-8">
              We distinguish ourselves by developing security solutions that
              truly make a difference — solutions that minimize risks and are
              specific to your situation. We use carefully selected, innovative
              products and complement these, when necessary, with custom-made
              components.
            </p>

            <ul className="space-y-3.5 mb-10">
              {principles.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#7A1F47] flex-shrink-0 mt-0.5 stroke-[2.2]" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#7A1F47] hover:bg-[#5C1735] text-white text-sm font-semibold rounded-md transition-colors"
            >
              Talk to Our Security Team
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>

          {/* Right: Image */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=1200&q=80"
                  alt="Security control room with monitoring screens"
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
              </div>

              {/* Floating accent card */}
              <div className="absolute -bottom-6 -left-6 md:-left-10 bg-[#7A1F47] text-white p-6 md:p-8 rounded-lg shadow-xl max-w-[260px] hidden sm:block">
                <div className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-1">
                  24<span className="text-white/60">/7</span>
                </div>
                <div className="text-xs text-white/70 uppercase tracking-wider mb-2">
                  Operational Continuity
                </div>
                <p className="text-sm text-white/85 leading-relaxed">
                  Solutions that keep your organization running.
                </p>
              </div>

              {/* Back outline */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[#7A1F47] rounded-lg -z-10 hidden md:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityIntro;