'use client';

import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import CountUp from '../components/reactbits/CountUp';
import Magnet from '../components/reactbits/Magnet';
import { ArrowRight, Sparkles, Code2, Brain } from 'lucide-react';
import { useState, useEffect } from 'react';

const DraggableLanyard = dynamic(() => import('../components/DraggableLanyard'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-white/30 animate-pulse text-base font-light">Loading 3D...</div>
    </div>
  ),
});

const roles = ['AI Engineer', 'Full-Stack Developer', 'ML Researcher', 'Problem Solver'];

export default function HomePage() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Animated Mesh Gradient Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-black to-indigo-950/30" />
        
        {/* Animated Orbs */}
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-600/30 to-fuchsia-600/20 blur-[120px]"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-600/25 to-cyan-500/15 blur-[140px]"
        />
        <motion.div
          animate={{ 
            x: [0, 60, 0],
            y: [0, -60, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/10 blur-[100px]"
        />
      </div>

      {/* Grid Pattern */}
      <div 
        className="fixed inset-0 z-[1] opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left Column */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 pt-32 pb-16 lg:pt-0">
          <div className="max-w-2xl">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-sm text-white/60 font-medium">Available for opportunities</span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4"
            >
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter text-white leading-[0.85]">
                Prabhudayal
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter leading-[0.85] bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Vaishnav
              </h1>
            </motion.div>

            {/* Animated Role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-6 h-14 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIndex}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="text-3xl sm:text-4xl md:text-5xl font-light text-white/80 tracking-tight"
                >
                  {roles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-lg sm:text-xl text-white/40 max-w-lg leading-relaxed mb-10"
            >
              Building intelligent systems with{' '}
              <span className="text-violet-400">LangGraph</span>,{' '}
              <span className="text-fuchsia-400">PyTorch</span>, and{' '}
              <span className="text-pink-400">Next.js</span>.
              <br />Currently researching emotion detection at ESIEA Paris.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-wrap gap-4"
            >
              <Magnet padding={50} magnetStrength={3}>
                <Link href="/projects" className="group">
                  <button className="relative px-8 py-4 rounded-full bg-white text-black font-semibold text-base overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                    <span className="relative z-10 flex items-center gap-2">
                      View Projects
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </Link>
              </Magnet>
              <Magnet padding={50} magnetStrength={3}>
                <Link href="/resume">
                  <button className="px-8 py-4 rounded-full bg-white/[0.05] border border-white/[0.1] text-white font-medium text-base backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.1] hover:border-white/[0.2]">
                    Download Resume
                  </button>
                </Link>
              </Magnet>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="mt-16 pt-8 border-t border-white/[0.06]"
            >
              <div className="flex flex-wrap gap-12">
                {[
                  { value: 7, suffix: '+', label: 'Projects', icon: Code2 },
                  { value: 1, suffix: 'st', label: 'IIM Hackathon', icon: Sparkles },
                  { value: 88, suffix: '%', label: 'RAG Accuracy', icon: Brain },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-4xl font-bold text-white tabular-nums">
                        <CountUp to={stat.value} duration={2} delay={1.8 + index * 0.2} />
                      </span>
                      <span className="text-2xl font-bold text-white/50">{stat.suffix}</span>
                    </div>
                    <p className="text-sm text-white/30 font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column - 3D */}
        <div className="flex-1 relative min-h-[50vh] lg:min-h-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="w-full h-full"
          >
            <DraggableLanyard className="w-full h-full" />
          </motion.div>
          
          {/* Tech Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="absolute bottom-10 left-6 right-6 hidden lg:flex flex-wrap gap-2 justify-center"
          >
            {['Python', 'TypeScript', 'React', 'PyTorch', 'LangChain'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 2.1 + i * 0.08 }}
                className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/40 text-sm backdrop-blur-sm hover:bg-white/[0.06] hover:text-white/60 transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-3"
      >
        <span className="text-[10px] text-white/20 tracking-[0.25em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/30" />
        </motion.div>
      </motion.div>
    </div>
  );
}
