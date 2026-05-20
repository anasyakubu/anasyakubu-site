// src/pages/Page404.tsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, Home, Search } from 'lucide-react';

interface SuggestedRoute {
  label: string;
  href: string;
  description: string;
}

const suggestions: SuggestedRoute[] = [
  {
    label: 'Home',
    href: '/',
    description: 'Start from the top',
  },
  {
    label: 'About',
    href: '/about',
    description: 'Who I am & what I do',
  },
  {
    label: 'Work',
    href: '/work',
    description: 'Selected projects',
  },
  {
    label: 'Contact',
    href: '/contact',
    description: 'Let\'s talk',
  },
];

const Page404: React.FC = () => {
  const location = useLocation();
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'Africa/Lagos',
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-160px)] bg-zinc-950 text-white overflow-hidden flex items-center">
      {/* Background atmosphere */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-400/[0.06] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-rose-500/[0.04] blur-[120px] rounded-full pointer-events-none" />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, white, white 1px, transparent 1px, transparent 3px)',
        }}
      />

      <div className="relative w-full max-w-[1400px] mx-auto px-6 lg:px-10 py-20 md:py-24">
        {/* Top status bar */}
        <div className="flex items-center justify-between mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-rose-500/30 rounded-full bg-rose-500/[0.05] backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-400" />
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-rose-300">
              System · Route not resolved
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
            <span>/ ERR</span>
            <span className="w-8 h-px bg-zinc-700" />
            <span className="text-zinc-300">404</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: big 404 + headline */}
          <div className="lg:col-span-7">
            {/* Glitch 404 */}
            <div className="relative inline-block">
              <h1 className="font-display font-medium text-white leading-[0.85] tracking-[-0.05em] text-[180px] sm:text-[240px] md:text-[320px] lg:text-[360px] select-none">
                4
                <span className="text-amber-400 italic font-light animate-pulse-slow">
                  0
                </span>
                4
              </h1>
              {/* Glitch shadow */}
              <h1
                aria-hidden
                className="absolute inset-0 font-display font-medium text-rose-500/20 leading-[0.85] tracking-[-0.05em] text-[180px] sm:text-[240px] md:text-[320px] lg:text-[360px] select-none translate-x-1 translate-y-1 -z-10 pointer-events-none"
              >
                404
              </h1>
            </div>

            <div className="mt-6 md:mt-10 max-w-xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl" role="img" aria-label="thinking">
                  🛸
                </span>
                <p className="font-mono text-sm uppercase tracking-[0.18em] text-zinc-400">
                  Page not found
                </p>
              </div>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] font-medium">
                Looks like this page{' '}
                <span className="italic text-amber-400 font-light">
                  wandered off
                </span>
                .
              </h2>

              <p className="mt-5 text-zinc-400 text-base md:text-lg leading-relaxed">
                The link might be broken, the page may have moved, or you typed
                an address that doesn't exist yet. Don't worry — it happens to
                the best of us.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/"
                  className="group inline-flex items-center justify-between gap-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 pl-6 pr-2 py-2 rounded-full transition-colors duration-300"
                >
                  <span className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.15em] font-semibold">
                    <Home className="w-3.5 h-3.5" strokeWidth={2.5} />
                    Take me home
                  </span>
                  <span className="w-10 h-10 rounded-full bg-zinc-950 text-amber-400 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                  </span>
                </Link>

                <button
                  onClick={() => window.history.back()}
                  className="group inline-flex items-center justify-between gap-4 border border-white/15 hover:border-white/40 text-white pl-6 pr-2 py-2 rounded-full transition-colors duration-300"
                >
                  <span className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.15em] font-semibold">
                    <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
                    Go back
                  </span>
                  <span className="w-10 h-10 rounded-full bg-white/[0.06] group-hover:bg-white/10 text-white flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 -rotate-90 transition-transform duration-300 group-hover:-translate-x-0.5" strokeWidth={2.5} />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: terminal log + suggestions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Terminal card */}
            <div className="relative bg-black/50 border border-white/[0.08] rounded-xl overflow-hidden backdrop-blur-sm">
              {/* Terminal header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  error.log
                </span>
                <span className="font-mono text-[10px] text-zinc-600 tabular-nums">
                  {time}
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-5 font-mono text-[12px] leading-relaxed">
                <div className="flex gap-3 mb-2">
                  <span className="text-zinc-600 select-none">$</span>
                  <span className="text-zinc-300">
                    <span className="text-emerald-400">GET</span>{' '}
                    <span className="text-white break-all">
                      {location.pathname}
                    </span>
                  </span>
                </div>
                <div className="flex gap-3 mb-2">
                  <span className="text-zinc-600 select-none">→</span>
                  <span className="text-rose-400">
                    HTTP 404 · Resource not found
                  </span>
                </div>
                <div className="flex gap-3 mb-2">
                  <span className="text-zinc-600 select-none">→</span>
                  <span className="text-zinc-500">
                    No route matches this path
                  </span>
                </div>
                <div className="flex gap-3 mb-4">
                  <span className="text-zinc-600 select-none">→</span>
                  <span className="text-zinc-500">
                    Suggesting fallback routes
                    <span className="inline-block w-2 h-3.5 bg-amber-400/90 ml-1 align-middle animate-blink" />
                  </span>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10.5px] uppercase tracking-[0.18em]">
                  <span className="text-zinc-600">stack</span>
                  <span className="text-zinc-500">portfolio · client</span>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="border border-white/[0.06] rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-2.5 bg-white/[0.02]">
                <Search className="w-3.5 h-3.5 text-amber-400" strokeWidth={2.5} />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-400">
                  Try one of these
                </span>
              </div>

              <div>
                {suggestions.map((s, i) => (
                  <Link
                    key={s.href}
                    to={s.href}
                    className="group flex items-center justify-between px-5 py-4 hover:bg-white/[0.03] transition-colors border-b border-white/[0.04] last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-zinc-600 group-hover:text-amber-400 transition-colors">
                        /{String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <div className="font-display text-base font-medium text-white group-hover:text-amber-400 transition-colors">
                          {s.label}
                        </div>
                        <div className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-zinc-500 mt-0.5">
                          {s.description}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Local animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.55; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1.1s steps(1) infinite;
        }
      `}</style>
    </section>
  );
};

export default Page404;