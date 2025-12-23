'use client';

import { useState } from 'react';
import Image from 'next/image';
import { RESUME_DATA } from '../../components/constants';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectsPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full min-h-screen bg-background pt-32 pb-20 px-4 sm:px-6 md:px-8 lg:px-16 text-foreground">

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 border-b-4 border-border pb-8">
          <h1 className="text-7xl md:text-9xl font-black uppercase mb-4 tracking-tighter">
            WORK.
          </h1>
          <p className="text-xl font-mono text-muted-foreground max-w-2xl bg-primary text-primary-foreground inline-block px-2">
            AI ENG • FULL STACK • OPEN SOURCE
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESUME_DATA.projects.map((project, index) => {
            const isLarge = index % 5 === 0 || index % 5 === 3;
            const colSpan = isLarge ? 'md:col-span-2' : 'md:col-span-1';

            return (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative ${colSpan} bg-card text-card-foreground border-2 border-border p-0 neo-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-200 flex flex-col`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {project.image ? (
                  <div className="relative w-full h-56 md:h-64 overflow-hidden border-b-2 border-border grayscale group-hover:grayscale-0 transition-all duration-500">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-20 group-hover:opacity-0 transition-all" />
                  </div>
                ) : (
                  <div className="h-56 w-full bg-muted border-b-2 border-border flex items-center justify-center">
                    <span className="font-black text-4xl text-muted-foreground uppercase rotate-[-10deg]">No Image</span>
                  </div>
                )}

                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className="text-2xl font-black uppercase leading-none group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {project.title}
                    </h3>
                    <div className="p-1 border-2 border-border bg-foreground text-background group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 text-xs font-bold font-mono border border-border uppercase">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm font-mono text-muted-foreground leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-border border-dashed">
                    <span className="text-xs font-black uppercase text-muted-foreground">View Source</span>
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
