'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../../components/constants';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectsPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full min-h-screen bg-black pt-32 pb-20 px-4 sm:px-6 md:px-8 lg:px-16">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-white">
            Projects
          </h1>
          <p className="text-lg text-white/40 max-w-xl mx-auto">
            A collection of my work in AI, full-stack development, and open source
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESUME_DATA.projects.map((project, index) => {
            const isLarge = index % 5 === 0 || index % 5 === 3;
            const colSpan = isLarge ? 'md:col-span-2' : 'md:col-span-1';

            return (
              <motion.a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group relative ${colSpan} rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.04] transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.08]`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {project.image && (
                  <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>
                )}

                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-violet-300 transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className={`w-5 h-5 text-white/20 group-hover:text-white/60 transition-all ${hoveredIndex === index ? 'translate-x-0.5 -translate-y-0.5' : ''}`} />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 text-xs rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-white/30 leading-relaxed">
                    {project.description}
                  </p>

                  {project.points.length > 0 && (
                    <ul className="space-y-1.5 text-sm text-white/40">
                      {project.points.slice(0, isLarge ? 3 : 2).map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-violet-400 mt-0.5">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
