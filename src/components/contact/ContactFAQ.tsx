// src/components/contact/ContactFAQ.tsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  {
    q: 'What kind of work do you take on?',
    a: 'Frontend-heavy web apps, full-stack builds, and freelance engagements. I\'m strongest with React, TypeScript, and Node — and I care just as much about the API and database layers as the UI.',
  },
  {
    q: 'Are you available for full-time roles?',
    a: 'I currently lead frontend at NYM Technologies, so I\'m selective. I\'m open to interesting freelance projects and conversations — reach out and we\'ll see if it\'s a fit.',
  },
  {
    q: 'How fast do you reply?',
    a: 'Usually within 24 hours on weekdays. If it\'s urgent, mention it in the subject line and I\'ll prioritise it.',
  },
  {
    q: 'Do you work with clients outside Nigeria?',
    a: 'Absolutely. I work remotely on WAT (GMT+1) and have shipped products for users globally. Timezone overlap is rarely a problem.',
  },
  {
    q: 'What should I include in my first message?',
    a: 'A short description of the project, your rough timeline, and what success looks like to you. The more context, the better my first reply.',
  },
];

const ContactFAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-zinc-950 text-white border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <div className="flex items-center gap-3 mb-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
              <span>/ 04</span>
              <span className="w-8 h-px bg-zinc-700" />
              <span className="text-zinc-300">FAQ</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-[-0.03em] font-medium">
              Before you{' '}
              <span className="italic text-amber-400 font-light">ask</span>.
            </h2>
            <p className="mt-5 text-zinc-400 text-[15px] leading-relaxed max-w-sm">
              A few quick answers to the questions I get most often.
            </p>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-8">
            <div className="border-t border-white/[0.06]">
              {faqs.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div key={i} className="border-b border-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full flex items-start justify-between gap-6 py-5 text-left group"
                    >
                      <div className="flex items-baseline gap-4">
                        <span
                          className={`font-mono text-[11px] transition-colors ${isOpen
                              ? 'text-amber-400'
                              : 'text-zinc-600 group-hover:text-amber-400'
                            }`}
                        >
                          /{String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`font-display text-lg md:text-xl tracking-[-0.01em] font-medium transition-colors ${isOpen
                              ? 'text-amber-400'
                              : 'text-white group-hover:text-amber-400'
                            }`}
                        >
                          {item.q}
                        </span>
                      </div>
                      <span
                        className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen
                            ? 'bg-amber-400 border-amber-400 rotate-45'
                            : 'border-white/15 group-hover:border-amber-400/50'
                          }`}
                      >
                        <Plus
                          className={`w-3.5 h-3.5 transition-colors ${isOpen ? 'text-zinc-950' : 'text-zinc-400'
                            }`}
                          strokeWidth={2.5}
                        />
                      </span>
                    </button>

                    {/* Answer */}
                    <div
                      className={`grid transition-all duration-300 ease-out ${isOpen
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                        }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-6 pl-9 text-zinc-400 text-[15px] leading-relaxed max-w-2xl">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ;