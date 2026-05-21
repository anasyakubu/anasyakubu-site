// src/components/about/Principles.tsx
import React from 'react';
import { Sparkles, Layers, Users, Zap } from 'lucide-react';

const principles = [
  {
    icon: Sparkles,
    title: 'Craft over speed',
    body: 'A well-made thing ships faster in the long run. I take the extra hour.',
  },
  {
    icon: Layers,
    title: 'Whole-stack thinking',
    body: 'The UI is one face of the system. I design APIs and database shapes with the same care.',
  },
  {
    icon: Users,
    title: 'Inclusive by default',
    body: 'Accessibility, performance, and clear copy aren\'t add-ons — they\'re the work.',
  },
  {
    icon: Zap,
    title: 'Ship, then refine',
    body: 'Perfect is the enemy of shipped. I get it live, learn, and iterate fast.',
  },
];

const Principles: React.FC = () => {
  return (
    <section className="relative bg-zinc-950 text-white border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          <div className="flex items-center gap-3 mb-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
            <span>/ 03</span>
            <span className="w-8 h-px bg-zinc-700" />
            <span className="text-zinc-300">Principles</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.03em] font-medium">
            How I{' '}
            <span className="italic text-amber-400 font-light">work</span>.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="group relative bg-zinc-950 p-7 hover:bg-white/[0.02] transition-colors duration-500 overflow-hidden"
              >
                {/* Number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600 group-hover:text-amber-400 transition-colors">
                    /{String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] group-hover:bg-amber-400 group-hover:border-amber-400 flex items-center justify-center transition-all duration-300">
                    <Icon
                      className="w-4 h-4 text-amber-400 group-hover:text-zinc-950 transition-colors"
                      strokeWidth={2}
                    />
                  </div>
                </div>

                <h3 className="font-display text-xl md:text-2xl tracking-[-0.02em] font-medium text-white group-hover:text-amber-400 transition-colors mb-3">
                  {p.title}
                </h3>

                <p className="text-zinc-400 text-[14px] leading-relaxed">
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Principles;