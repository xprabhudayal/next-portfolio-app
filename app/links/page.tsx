'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../../components/constants';
import { ArrowRight } from 'lucide-react';

export default function LinksPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full min-h-screen bg-black py-20 px-4 sm:px-6 md:px-8 lg:px-16 pt-32">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-white">Connect</h1>
          <p className="text-lg text-white/40">Find me across the web</p>
        </motion.div>

        <div className="space-y-3">
          {RESUME_DATA.contact.links.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="block group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`rounded-xl px-5 py-4 bg-white/[0.02] border border-white/[0.04] transition-all duration-300 ${hoveredIndex === index ? 'bg-white/[0.04] border-white/[0.08] scale-[1.01]' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center transition-all ${hoveredIndex === index ? 'bg-violet-500/10 border-violet-500/20' : ''}`}>
                      <Icon className={`w-5 h-5 transition-colors ${hoveredIndex === index ? 'text-violet-400' : 'text-white/50'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium transition-colors ${hoveredIndex === index ? 'text-white' : 'text-white/70'}`}>{link.name}</h3>
                      <p className="text-sm text-white/30 truncate">{link.url.replace('https://', '').replace('mailto:', '')}</p>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-all ${hoveredIndex === index ? 'text-white/60 translate-x-1' : 'text-white/20'}`} />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
