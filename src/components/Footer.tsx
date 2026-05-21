// src/components/Footer.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowUp,
  Mail,
} from 'lucide-react';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import Logo from "../assets/logo-me.png"



interface LinkItem {
  label: string;
  href: string;
  external?: boolean;
}

const navLinks: LinkItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Writing', href: '/writing' },
  { label: 'Contact', href: '/contact' },
];

const projectLinks: LinkItem[] = [
  { label: 'Daily Lab', href: '/work/daily-lab' },
  { label: 'Daily Pay', href: '/work/daily-pay' },
  { label: 'Daily Reach', href: '/work/daily-reach' },
  { label: 'Daily Invoice', href: '/work/daily-invoice' },
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/anasyakubu', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/anasyakubu', icon: FaLinkedin },
  { label: 'X', href: 'https://x.com/anasyakubu', icon: FaXTwitter },
  { label: 'Instagram', href: 'https://youtube.com/@anasyakubu', icon: FaInstagram },
];

const Footer: React.FC = () => {
  const [showTop, setShowTop] = useState(false);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Africa/Lagos',
        })
      );
    };
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-zinc-950 text-white overflow-hidden">
      {/* Subtle grid backdrop */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Amber glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-400/[0.06] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative">
        {/* CTA banner */}
        <div className="border-b border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-amber-400 mb-6 flex items-center gap-2">
                  <span className="w-8 h-px bg-amber-400/60" />
                  Let's build something
                </p>
                <h2 className="font-display text-[44px] sm:text-[64px] lg:text-[88px] leading-[0.95] tracking-[-0.03em] font-medium text-white">
                  Have a project <br />
                  in mind?{' '}
                  <span className="italic font-light text-amber-400">
                    Let's talk.
                  </span>
                </h2>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-5">
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-between gap-4 bg-white text-zinc-950 px-7 py-5 rounded-full hover:bg-amber-400 transition-colors duration-300"
                >
                  <span className="font-display text-lg font-medium">
                    Start a project
                  </span>
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                </Link>

                <a
                  href="mailto:hello@anasyakubu.dev"
                  className="group inline-flex items-center justify-between gap-4 border border-white/15 px-7 py-5 rounded-full hover:border-amber-400/60 hover:bg-white/[0.02] transition-all duration-300"
                >
                  <span className="flex items-center gap-3 font-mono text-[13px] text-zinc-300">
                    <Mail className="w-4 h-4 text-amber-400" />
                    hello@anasyakubu.dev
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 group-hover:rotate-45 transition-all duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sitemap */}
        <div className="border-b border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
            <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
              {/* Brand block */}
              <div className="col-span-2 md:col-span-5">
                <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
                  <img width={"60px"} src={Logo} alt='Anas Yakubu' />
                  <span className="font-display text-xl font-medium tracking-tight">
                    Anas Yakubu
                  </span>
                </Link>

                <p className="text-zinc-400 text-[15px] leading-relaxed max-w-sm mb-6">
                  Senior full-stack engineer building products at the intersection
                  of craft and scale. Founder of{' '}
                  <span className="text-white">Daily Lab</span>.
                </p>

                <div className="flex items-center gap-2">
                  {socialLinks.map(s => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="w-10 h-10 rounded-full border border-white/10 hover:border-amber-400 hover:bg-amber-400 text-zinc-400 hover:text-zinc-950 flex items-center justify-center transition-all duration-300"
                      >
                        <Icon className="w-4 h-4" strokeWidth={1.8} />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Navigation column */}
              <div className="md:col-span-3 md:col-start-7">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500 mb-5">
                  / Navigation
                </p>
                <ul className="space-y-3">
                  {navLinks.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={link.href}
                        className="group inline-flex items-center gap-2 text-zinc-300 hover:text-amber-400 text-[15px] transition-colors"
                      >
                        <span className="font-mono text-[10px] text-zinc-600 group-hover:text-amber-400 transition-colors">
                          0{i + 1}
                        </span>
                        <span className="relative">
                          {link.label}
                          <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projects column */}
              <div className="md:col-span-3">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500 mb-5">
                  / Projects
                </p>
                <ul className="space-y-3">
                  {projectLinks.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={link.href}
                        className="group inline-flex items-center gap-2 text-zinc-300 hover:text-amber-400 text-[15px] transition-colors"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-amber-400 transition-colors" />
                        <span className="relative">
                          {link.label}
                          <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="border-b border-white/[0.06] overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
            <h3 className="font-display text-[20vw] md:text-[18vw] lg:text-[200px] xl:text-[240px] leading-[0.85] tracking-[-0.05em] font-medium text-white/[0.04] select-none whitespace-nowrap">
              Anas<span className="text-amber-400/20 italic font-light">.</span>
            </h3>
          </div>
        </div>

        {/* Meta strip */}
        <div className="bg-black/40">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
                <span>
                  © {new Date().getFullYear()} Anas Yakubu
                </span>
                <span className="hidden sm:inline text-zinc-700">/</span>
                <span>All rights reserved</span>
                <span className="hidden md:inline text-zinc-700">/</span>
                <span className="hidden md:inline">
                  Designed & built in Kano
                </span>
              </div>

              <div className="flex items-center gap-5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  <span className="text-zinc-300">Online</span>
                </div>
                <span className="text-zinc-700">/</span>
                <span className="tabular-nums text-zinc-300">
                  WAT {time || '00:00'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 group w-12 h-12 bg-amber-400 hover:bg-white text-zinc-950 rounded-full shadow-[0_10px_40px_-10px_rgba(251,191,36,0.5)] flex items-center justify-center transition-all duration-300 z-40 hover:scale-105"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5] transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      )}
    </footer>
  );
};

export default Footer;