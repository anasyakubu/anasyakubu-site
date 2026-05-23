// src/components/Navbar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from "../assets/logo-me.png"

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  { label: 'Index', href: '/' },
  {
    label: 'About',
    dropdown: [
      { label: 'Who I Am', href: '/about', description: 'Background & philosophy' },
      { label: 'Experience', href: '/about#experience', description: 'Roles & milestones' },
      { label: 'Stack', href: '/about#stack', description: 'Tools I reach for' },
    ],
  },
  {
    label: 'Work',
    dropdown: [
      { label: 'Daily Lab', href: '/work/daily-lab', description: 'Software studio' },
      { label: 'Daily Pay', href: '/work/daily-pay', description: 'Payment aggregation' },
      { label: 'Daily Reach', href: '/work/daily-reach', description: 'Marketing platform' },
    ],
  },
  { label: 'Writing', href: '/writing' },
  { label: 'Contact', href: '/contact' },
];

const Navbar: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);
  // Lazy initializer – avoids calling setState synchronously in the effect
  const [scrolled, setScrolled] = useState(() => window.scrollY > 40);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const handleToggle = (label: string) => {
    setOpenDropdown(prev => (prev === label ? null : label));
  };

  // Close all menus – used by every navigation link
  const closeAllMenus = () => {
    setOpenDropdown(null);
    setMobileOpen(false);
    setMobileSubOpen(null);
  };

  // Outside click – close desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll listener – no more synchronous setState on mount
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll on mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-40 transition-all duration-500 ease-out ${scrolled
        ? 'bg-zinc-950/85 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]'
        : 'bg-zinc-950 border-b border-white/[0.04]'
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Desktop */}
        <div
          className={`hidden lg:flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-14' : 'h-16'
            }`}
        >
          {/* Left: Compact monogram (only on scroll) */}
          <div
            className={`flex items-center gap-3 transition-all duration-500 ${scrolled
              ? 'opacity-100 translate-x-0 w-auto'
              : 'opacity-0 -translate-x-4 w-0 overflow-hidden pointer-events-none'
              }`}
          >
            <Link to="/" onClick={closeAllMenus} className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 flex items-center justify-center rounded-sm">
                <img src={Logo} alt='Anas Yakubu' />
              </div>
              <span className="font-display text-sm font-medium tracking-tight text-white">
                Anas Yakubu
              </span>
            </Link>
          </div>

          {/* Center: Nav items */}
          <div className="flex items-center gap-1">
            {navItems.map((item, idx) => {
              const active = item.href ? isActive(item.href) : false;
              return (
                <div key={idx} className="relative">
                  {item.dropdown ? (
                    <button
                      onClick={() => handleToggle(item.label)}
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      className={`group relative px-4 py-2 font-mono text-[11.5px] uppercase tracking-[0.15em] transition-colors flex items-center gap-1.5 ${openDropdown === item.label
                        ? 'text-amber-400'
                        : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                      <span className="text-zinc-600 group-hover:text-amber-400/60 transition-colors">
                        0{idx + 1}
                      </span>
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3 h-3 stroke-[2] transition-transform duration-300 ${openDropdown === item.label ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.href || '#'}
                      onClick={closeAllMenus}
                      onMouseEnter={() => setOpenDropdown(null)}
                      className={`group relative px-4 py-2 font-mono text-[11.5px] uppercase tracking-[0.15em] flex items-center gap-1.5 transition-colors ${active ? 'text-amber-400' : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                      <span
                        className={`transition-colors ${active
                          ? 'text-amber-400/60'
                          : 'text-zinc-600 group-hover:text-amber-400/60'
                          }`}
                      >
                        0{idx + 1}
                      </span>
                      <span>{item.label}</span>
                      {active && (
                        <span className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-1 h-1 rounded-full bg-amber-400" />
                      )}
                    </Link>
                  )}

                  {/* Dropdown panel */}
                  {item.dropdown && openDropdown === item.label && (
                    <div
                      onMouseLeave={() => setOpenDropdown(null)}
                      className="absolute left-0 top-full pt-3 w-80 z-50 animate-[fadeSlide_180ms_ease-out]"
                    >
                      <div className="bg-zinc-900 border border-white/[0.08] rounded-xl shadow-[0_24px_64px_-24px_rgba(0,0,0,0.8)] overflow-hidden">
                        <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                            {item.label} / {item.dropdown.length}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400/70">
                            →
                          </span>
                        </div>

                        <div className="py-1.5">
                          {item.dropdown.map((sub, i) => (
                            <Link
                              key={i}
                              to={sub.href}
                              onClick={closeAllMenus}
                              className="group/item flex items-start gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors"
                            >
                              <span className="font-mono text-[10px] text-zinc-600 mt-1 group-hover/item:text-amber-400 transition-colors">
                                /{String(i + 1).padStart(2, '0')}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="font-display text-[14px] font-medium text-white group-hover/item:text-amber-400 transition-colors">
                                    {sub.label}
                                  </span>
                                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 -translate-x-1 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-amber-400 transition-all" />
                                </div>
                                {sub.description && (
                                  <p className="text-[11.5px] text-zinc-500 mt-0.5 leading-snug">
                                    {sub.description}
                                  </p>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: CTA */}
          <div className="flex items-center gap-3">
            <a
              href="/cv.pdf"
              onClick={closeAllMenus}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 hover:text-white transition-colors"
            >
              CV ↗
            </a>
            <span className="h-4 w-px bg-white/10" />
            <Link
              to="/contact"
              onClick={closeAllMenus}
              className="group inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 px-4 py-2 rounded-md font-mono text-[11px] uppercase tracking-[0.15em] font-semibold transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 animate-pulse" />
              <span>Let's Talk</span>
            </Link>
          </div>
        </div>

        {/* Mobile trigger */}
        <div className="flex lg:hidden items-center justify-between h-14">
          <Link to="/" onClick={closeAllMenus} className="flex items-center gap-2.5">
            <div className="w-7 h-7flex items-center justify-center rounded-sm">
              <img src={Logo} alt='Anas Yakubu' />
            </div>
            <span className="font-display text-sm font-medium tracking-tight text-white">
              Anas Yakubu
            </span>
          </Link>

          <button
            onClick={() => setMobileOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-white/10 hover:border-amber-400/50 hover:bg-white/[0.03] transition-colors"
            aria-label="Open menu"
          >
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-300">
              Menu
            </span>
            <Menu className="w-4 h-4 text-zinc-300" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-[88%] max-w-sm bg-zinc-950 border-l border-white/[0.06] shadow-2xl overflow-y-auto animate-[slideInRight_300ms_cubic-bezier(0.16,1,0.3,1)]">
            {/* Drawer header */}
            <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-amber-400 flex items-center justify-center rounded-sm">
                  <span className="font-display font-black text-zinc-950 text-[11px] leading-none">
                    AY
                  </span>
                </div>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
                  Navigation
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-md border border-white/10 hover:bg-white/[0.04] flex items-center justify-center text-zinc-300"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer nav */}
            <div className="py-2">
              {navItems.map((item, idx) => (
                <div key={idx} className="border-b border-white/[0.04]">
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() =>
                          setMobileSubOpen(prev => (prev === item.label ? null : item.label))
                        }
                        className="w-full flex items-center justify-between px-5 py-4 text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[10.5px] text-zinc-600">
                            0{idx + 1}
                          </span>
                          <span className="font-display text-base text-white group-hover:text-amber-400 transition-colors">
                            {item.label}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-zinc-500 transition-transform ${mobileSubOpen === item.label
                            ? 'rotate-180 text-amber-400'
                            : ''
                            }`}
                        />
                      </button>
                      {mobileSubOpen === item.label && (
                        <div className="bg-white/[0.02] border-t border-white/[0.04]">
                          {item.dropdown.map((sub, i) => (
                            <Link
                              key={i}
                              to={sub.href}
                              onClick={closeAllMenus}
                              className="block px-5 py-3 pl-12 hover:bg-white/[0.03] transition-colors group"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[14px] text-zinc-300 group-hover:text-amber-400 transition-colors">
                                  {sub.label}
                                </span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-amber-400 transition-colors" />
                              </div>
                              {sub.description && (
                                <p className="text-[11px] text-zinc-500 mt-0.5">
                                  {sub.description}
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href || '#'}
                      onClick={closeAllMenus}
                      className="w-full flex items-center justify-between px-5 py-4 group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10.5px] text-zinc-600">
                          0{idx + 1}
                        </span>
                        <span className="font-display text-base text-white group-hover:text-amber-400 transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 transition-colors" />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Drawer footer */}
            <div className="p-5 mt-2 space-y-3">
              <Link
                to="/contact"
                onClick={closeAllMenus}
                className="block w-full text-center px-5 py-3.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-mono text-[11px] uppercase tracking-[0.18em] font-semibold rounded-md transition-colors"
              >
                Let's Talk
              </Link>
              <a
                href="/cv.pdf"
                onClick={closeAllMenus}
                className="block w-full text-center px-5 py-3.5 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white font-mono text-[11px] uppercase tracking-[0.18em] rounded-md transition-colors"
              >
                Download CV ↗
              </a>

              <div className="pt-4 mt-4 border-t border-white/[0.06] space-y-2">
                <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  <span className="text-zinc-300">Available for work</span>
                </div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-600">
                  Kano, Nigeria · WAT
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Local keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;