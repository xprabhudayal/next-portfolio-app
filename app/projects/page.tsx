'use client';

import { useState } from 'react';
import Image from 'next/image';
import { RESUME_DATA } from '../../components/constants';
import { ExternalLink } from 'lucide-react';

export default function ProjectsPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full h-full overflow-y-auto pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 gradient-3d-text gradient-text-blur page-title">
            Projects
          </h1>
          <p className="page-description px-4">
            A collection of my work in AI, full-stack development, and open source
          </p>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {RESUME_DATA.projects.map((project, index) => {
            // Create asymmetric layout
            const isLarge = index % 5 === 0 || index % 5 === 3;
            const colSpan = isLarge ? 'md:col-span-2' : 'md:col-span-1';

            return (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative ${colSpan} glass rounded-apple-lg overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-glow`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image */}
                {project.image && (
                  <div className="relative w-full h-48 sm:h-56 md:h-64 bg-apple-gray-200">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-apple-black via-apple-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  </div>
                )}

                {/* Content */}
                <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                  {/* Title with External Link */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="card-title text-xl sm:text-2xl group-hover:text-accent-purple transition-colors duration-300">
                      {project.title}
                    </h3>
                    <ExternalLink
                      className={`w-4 h-4 sm:w-5 sm:h-5 text-subtle group-hover:text-accent-blue transition-all duration-300 flex-shrink-0 ${
                        hoveredIndex === index ? 'translate-x-1 -translate-y-1' : ''
                      }`}
                    />
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 sm:px-3 py-1 text-xs font-medium rounded-full glass text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="card-description text-sm">
                    {project.description}
                  </p>

                  {/* Key Points */}
                  {project.points.length > 0 && (
                    <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted">
                      {project.points.slice(0, isLarge ? 3 : 2).map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-accent-purple mt-1 flex-shrink-0">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
