// src/components/PageHeader.tsx
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import Banner from '../assets/banner.jpg';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  image?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs = [],
  image = Banner,
}) => {
  return (
    <section className="relative bg-[#0a2742] overflow-hidden">
      {/* Background image with solid overlay */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-[#0a2742]/80" />
      </div>

      {/* Decorative accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-[#4ab53e]/10 rounded-full -translate-y-1/2 translate-x-1/3 hidden md:block"
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#4ab53e]" />
            <span className="text-[#4ab53e] uppercase tracking-[0.2em] text-xs font-bold">
              About Us
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-5">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
              {subtitle}
            </p>
          )}

          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-sm"
            >
              <a
                href="/"
                className="flex items-center gap-1.5 text-white/60 hover:text-[#4ab53e] transition-colors"
              >
                <Home className="w-3.5 h-3.5 stroke-[2.5]" />
                Home
              </a>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5] text-white/30" />
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      className="text-white/60 hover:text-[#4ab53e] transition-colors"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-white font-medium">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;