// src/components/about/AboutCTA.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, FileDown } from 'lucide-react';

const AboutCTA: React.FC = () => {
  return (
    <section className="relative bg-zinc-950 text-white border-t border-white/[0.06] overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-400/[0.06] blur-[120px] rounded-full pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-6 font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
            <span className="w-8 h-px bg-zinc-700" />
            <span className="text-amber-400">/ 05 · End</span>
            <span className="w-8 h-px bg-zinc-700" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1] tracking-[-0.03em] font-medium">
            That's me in a{' '}
            <span className="italic text-amber-400 font-light">
              nutshell
            </span>
            .
            <br />
            Want to build something?
          </h2>

          <p className="mt-6 text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            I'm open to interesting projects, freelance work, and good
            conversations about engineering, craft, or anime.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:yakubuanas04@gmail.com"
              className="group inline-flex items-center justify-between gap-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 pl-6 pr-2 py-2 rounded-full transition-colors duration-300"
            >
              <span className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.15em] font-semibold">
                <Mail className="w-3.5 h-3.5" strokeWidth={2.5} />
                Get in touch
              </span>
              <span className="w-10 h-10 rounded-full bg-zinc-950 text-amber-400 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
              </span>
            </a>

            <a
              href="https://drive.google.com/file/d/1oG55p4bcGIOqqi66xYZjqAmssKo2Ph5t/view"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-between gap-4 border border-white/15 hover:border-white/40 text-white pl-6 pr-2 py-2 rounded-full transition-colors duration-300"
            >
              <span className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.15em] font-semibold">
                <FileDown className="w-3.5 h-3.5" strokeWidth={2.5} />
                Download Resume
              </span>
              <span className="w-10 h-10 rounded-full bg-white/[0.06] group-hover:bg-white/10 text-white flex items-center justify-center transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" strokeWidth={2.5} />
              </span>
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-600">
            <span>or find me at</span>
            <Link
              to="/contact"
              className="text-zinc-300 hover:text-amber-400 transition-colors underline underline-offset-4 decoration-zinc-700 hover:decoration-amber-400"
            >
              /contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;