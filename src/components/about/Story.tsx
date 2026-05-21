// src/components/about/Story.tsx
import React from 'react';

const beats = [
  {
    n: '01',
    title: 'How it started',
    body: 'Curiosity. A laptop, a free tutorial, and the feeling that this was the thing. I taught myself the basics, then formalized it with a BSc in Information Technology at Bayero University Kano.',
  },
  {
    n: '02',
    title: 'How it\'s going',
    body: 'Three years in, I lead frontend at NYM Technologies — designing and shipping web experiences for 1,000+ users globally. I went from intern to lead by treating every ticket like a craft project.',
  },
  {
    n: '03',
    title: 'What\'s next',
    body: 'Building Daily Lab into a studio that ships software people actually want. Writing more. Mentoring more. Watching more anime when the deploys are clean.',
  },
];

const Story: React.FC = () => {
  return (
    <section className="relative bg-zinc-950 text-white border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
              <span>/ 02</span>
              <span className="w-8 h-px bg-zinc-700" />
              <span className="text-zinc-300">Story</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.03em] font-medium">
              In three{' '}
              <span className="italic text-amber-400 font-light">acts</span>.
            </h2>
          </div>
        </div>

        {/* Beats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {beats.map((b, i) => (
            <div
              key={i}
              className="group bg-zinc-950 p-7 md:p-8 hover:bg-white/[0.02] transition-colors duration-500"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600 group-hover:text-amber-400 transition-colors">
                  / {b.n}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-amber-400 transition-colors" />
              </div>

              <h3 className="font-display text-2xl md:text-3xl tracking-[-0.02em] font-medium text-white group-hover:text-amber-400 transition-colors mb-4">
                {b.title}
              </h3>

              <p className="text-zinc-400 text-[15px] leading-relaxed">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Story;