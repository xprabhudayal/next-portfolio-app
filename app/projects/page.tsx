'use client';

import { useState } from 'react';
import Image from 'next/image';
import { RESUME_DATA } from '../../components/constants';
import { ExternalLink } from 'lucide-react';

export default function ProjectsPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full h-full bg-apple-black overflow-y-auto pt-32 pb-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-apple-label-secondary text-lg">
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
                  <div className="relative w-full h-64 bg-apple-gray-200">
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
                <div className="p-6 space-y-4">
                  {/* Title with External Link */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-2xl font-semibold text-apple-label group-hover:text-accent-purple transition-colors duration-300">
                      {project.title}
                    </h3>
                    <ExternalLink
                      className={`w-5 h-5 text-apple-label-tertiary group-hover:text-accent-blue transition-all duration-300 ${
                        hoveredIndex === index ? 'translate-x-1 -translate-y-1' : ''
                      }`}
                    />
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full glass text-apple-label-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-apple-label-secondary text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Points */}
                  {project.points.length > 0 && (
                    <ul className="space-y-2 text-sm text-apple-label-tertiary">
                      {project.points.slice(0, isLarge ? 3 : 2).map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-accent-purple mt-1">•</span>
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
