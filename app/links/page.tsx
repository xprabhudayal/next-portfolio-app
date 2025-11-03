'use client';

import { useState } from 'react';
import { RESUME_DATA } from '../../components/constants';

export default function LinksPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full h-full bg-apple-black flex items-center justify-center px-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 gradient-3d-text">
            Connect
          </h1>
          <p className="text-apple-label-secondary text-lg">
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
                className="block group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`
                    liquid-glass rounded-apple px-8 py-6
                    transition-all duration-500 ease-out
                    ${hoveredIndex === index ? 'scale-105 shadow-glow' : ''}
                  `}
                >
                  <div className="flex items-center gap-6">
                    {/* Icon Container */}
                    <div
                      className={`
                        w-14 h-14 rounded-full glass-strong flex items-center justify-center
                        transition-all duration-500
                        ${hoveredIndex === index ? 'bg-accent-purple/20 glow-purple' : ''}
                      `}
                    >
                      <Icon
                        className={`
                          w-7 h-7 transition-all duration-500
                          ${hoveredIndex === index ? 'text-accent-purple scale-110' : 'text-apple-label'}
                        `}
                      />
                    </div>

                    {/* Link Info */}
                    <div className="flex-1">
                      <h3
                        className={`
                          text-2xl font-semibold transition-colors duration-300
                          ${hoveredIndex === index ? 'text-accent-purple' : 'text-apple-label'}
                        `}
                      >
                        {link.name}
                      </h3>
                      <p className="text-apple-label-tertiary text-sm mt-1">
                        {link.url.replace('https://', '').replace('mailto:', '')}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div
                      className={`
                        transition-all duration-300
                        ${hoveredIndex === index ? 'translate-x-2 text-accent-purple' : 'text-apple-label-tertiary'}
                      `}
                    >
                      <svg
                        className="w-6 h-6"
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
