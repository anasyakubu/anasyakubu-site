// src/components/security/SecurityCTA.tsx
import React from 'react';
import { ArrowRight, Phone, Mail } from 'lucide-react';

const SecurityCTA: React.FC = () => {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#7A1F47] text-white rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Persuasion */}
            <div className="lg:col-span-7 p-10 md:p-14 lg:p-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-px bg-white/60" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                  Schedule a Risk Assessment
                </span>
              </div>

              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
                Ready to take
                <br />
                control of your risks?
              </h2>

              <p className="text-white/85 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
                Let our security experts assess your current setup, identify
                gaps, and recommend solutions tailored to your environment.
                Every consultation starts with listening.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-gray-100 text-[#7A1F47] text-sm font-semibold rounded-md transition-colors"
                >
                  Request a Site Visit
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </a>
                <a
                  href="/businesses"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/30 hover:border-white text-white text-sm font-semibold rounded-md transition-colors"
                >
                  Explore Other Divisions
                </a>
              </div>
            </div>

            {/* Right: Contact */}
            <div className="lg:col-span-5 bg-[#5C1735] p-10 md:p-14 lg:p-16">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 mb-6">
                Security Desk
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 pb-6 border-b border-white/15">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60 uppercase tracking-wider mb-1">
                      Direct Line
                    </div>
                    <a
                      href="tel:+2340000000000"
                      className="font-display font-bold text-base md:text-lg hover:text-white/80 transition-colors"
                    >
                      +234 000 000 0000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-6 border-b border-white/15">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Mail className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60 uppercase tracking-wider mb-1">
                      Security Team
                    </div>
                    <a
                      href="mailto:security@berylholdings.com"
                      className="font-display font-bold text-sm md:text-base hover:text-white/80 transition-colors break-all"
                    >
                      security@berylholdings.com
                    </a>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-white/60 uppercase tracking-wider mb-2">
                    Response Window
                  </div>
                  <div className="text-sm leading-relaxed">
                    Initial response within 24 hours.
                    <br />
                    Emergency consultations available.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityCTA;