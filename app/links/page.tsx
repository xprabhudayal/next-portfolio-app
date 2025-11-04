'use client';

import { useState } from 'react';
import { RESUME_DATA } from '../../components/constants';

export default function LinksPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full min-h-full overflow-y-auto py-20 px-4 sm:px-6 md:px-8 lg:px-16 pt-32">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 gradient-3d-text gradient-text-blur page-title">
            Connect
          </h1>
          <p className="page-description">
            Find me across the web
          </p>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          {RESUME_DATA.contact.links.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group link-card"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`
                    liquid-glass rounded-apple px-4 sm:px-6 md:px-8 py-5 md:py-6
                    transition-all duration-300 ease-out
                    ${hoveredIndex === index ? 'scale-[1.02] shadow-glow' : ''}
                  `}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Icon Container */}
                    <div
                      className={`
                        w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-strong flex items-center justify-center
                        transition-all duration-300
                        ${hoveredIndex === index ? 'bg-accent-purple/10' : ''}
                      `}
                    >
                      <Icon
                        className={`
                          w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300
                          ${hoveredIndex === index ? 'text-accent-purple scale-110' : 'text-apple-label'}
                        `}
                      />
                    </div>

                    {/* Link Info */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`
                          platform-name text-lg sm:text-xl md:text-2xl font-semibold transition-colors duration-300
                          ${hoveredIndex === index ? 'text-accent-purple' : ''}
                        `}
                      >
                        {link.name}
                      </h3>
                      <p className="platform-url text-xs sm:text-sm mt-1 truncate">
                        {link.url.replace('https://', '').replace('mailto:', '')}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div
                      className={`
                        transition-all duration-300 flex-shrink-0
                        ${hoveredIndex === index ? 'translate-x-1 text-accent-purple' : 'text-apple-label-tertiary'}
                      `}
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
