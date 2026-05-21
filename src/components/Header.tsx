// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo-me.png"

const Header: React.FC = () => {
  return (
    <header className="bg-zinc-950 text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between py-6">
          {/* Left: Logotype */}
          <Link to="/" className="group flex items-center gap-3.5">
            {/* Monogram block */}
            <div className="relative">
              <div className="w-11 h-11 flex items-center justify-center rounded-sm transition-transform duration-500 group-hover:rotate-[-6deg]">
                <img src={Logo} alt='Anas Yakubu' />
              </div>
              <div className="absolute -inset-px border border-amber-400/30 rounded-sm translate-x-1 translate-y-1 -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
            </div>

            {/* Wordmark */}
            <div className="leading-none">
              <div className="flex items-baseline gap-2">
                <h1 className="font-display text-[22px] font-medium tracking-tight text-white">
                  Anas Yakubu
                </h1>
                <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400/80 translate-y-[-2px]">
                  ®
                </span>
              </div>
              <p className="hidden sm:block font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500 mt-1.5">
                Senior Full-Stack Engineer
              </p>
            </div>
          </Link>

          {/* Right: Meta */}
          <div className="hidden lg:flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            <div className="flex flex-col items-end leading-none gap-1.5">
              <span className="text-zinc-600">Currently</span>
              <span className="text-white">Building Daily Lab</span>
            </div>

            <div className="h-8 w-px bg-white/10" />

            <Link
              to="/contact"
              className="group inline-flex items-center gap-2.5 bg-white text-zinc-950 px-5 py-2.5 rounded-full font-medium tracking-wider hover:bg-amber-400 transition-colors duration-300"
            >
              <span>Start a Project</span>
              <span className="w-1 h-1 rounded-full bg-zinc-950 group-hover:bg-zinc-950 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;