// src/components/projects/ProjectsCTA.tsx
import React from 'react';
import { ArrowRight, Phone, FileText } from 'lucide-react';

const ProjectsCTA: React.FC = () => {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50/60 border border-gray-100 rounded-lg p-10 md:p-16 lg:p-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-px bg-[#7A1F47]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A1F47]">
                  Your Project, Next
                </span>
              </div>

              <h2 className="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
                Have a project
                <br />
                in mind?
              </h2>

              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
                Whether you&apos;re planning a building, scaling agricultural
                operations, or securing a facility — we&apos;d like to hear
                what you&apos;re working on. Every project starts with a
                conversation.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#7A1F47] hover:bg-[#5C1735] text-white text-sm font-semibold rounded-md transition-colors"
                >
                  Start a Conversation
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </a>
                <a
                  href="tel:+2340000000000"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#1a1a1a]/15 hover:border-[#7A1F47] text-[#1a1a1a] hover:text-[#7A1F47] text-sm font-semibold rounded-md transition-colors"
                >
                  <Phone className="w-4 h-4 stroke-[2.5]" />
                  Call Our Studio
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#7A1F47] text-white p-8 md:p-10 rounded-lg">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-6">
                  <FileText className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 mb-3">
                  Project Brief
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl leading-tight mb-4">
                  Not sure where to start?
                </h3>
                <p className="text-white/85 text-sm leading-relaxed mb-6">
                  Download our project brief template to help you think through
                  scope, budget, and timeline before reaching out.
                </p>
                <a
                  href="/downloads/project-brief.pdf"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-100 text-[#7A1F47] text-xs font-semibold uppercase tracking-[0.1em] rounded-md transition-colors"
                >
                  Download Template
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCTA;