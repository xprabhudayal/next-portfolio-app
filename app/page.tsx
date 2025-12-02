'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BlurText from '../components/BlurText';
import GradientText from '../components/GradientText';
import ScrollIndicator from '../components/ScrollIndicator';
import { ArrowRight, Sparkles } from 'lucide-react';

// CRITICAL FIX: Disable SSR for 3D components (Next.js 15 + WebGL incompatibility)
const DraggableLanyard = dynamic(() => import('../components/DraggableLanyard'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-apple-label-secondary animate-pulse text-lg font-medium z-10">
        Loading 3D Scene...
      </div>
    </div>
  ),
});

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* 3D Lanyard - Positioned to the right */}
      <div className="absolute inset-0 z-0">
        <DraggableLanyard className="w-full h-full" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between px-6 sm:px-8 md:px-12 lg:px-20 pt-28 pb-12 pointer-events-none">
        {/* Main Hero Section */}
        <div className="flex-1 flex flex-col justify-center max-w-4xl pointer-events-auto select-none">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-apple-label-secondary">
              <Sparkles className="w-4 h-4 text-accent-purple" />
              <span>Available for opportunities</span>
            </span>
          </motion.div>

          {/* Name - Editorial Typography */}
          <div className="mb-6">
            <BlurText
              text="Prabhudayal"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white leading-none"
              delay={80}
              animateBy="letters"
              direction="bottom"
              stepDuration={0.4}
            />
            <div className="mt-2">
              <GradientText
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-none"
                colors={['#bf5af2', '#0a84ff', '#ff375f', '#bf5af2']}
                animationSpeed={6}
              >
                Vaishnav
              </GradientText>
            </div>
          </div>

          {/* Role/Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mb-8"
          >
            <p className="text-xl sm:text-2xl md:text-3xl text-apple-label-secondary font-light tracking-wide">
              AI Engineer & Full-Stack Developer
            </p>
            <p className="text-base sm:text-lg text-apple-label-tertiary mt-2 max-w-xl">
              Building intelligent systems with LangGraph, PyTorch, and Next.js. 
              Currently researching emotion detection at ESIEA Paris.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full liquid-glass shadow-glass transition-all duration-300 hover:scale-[1.02] hover:shadow-glow"
            >
              <span className="font-medium text-white">View Projects</span>
              <ArrowRight className="w-5 h-5 text-accent-purple transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-apple-separator transition-all duration-300 hover:bg-white/5 hover:border-apple-label-tertiary"
            >
              <span className="font-medium text-apple-label-secondary">Download Resume</span>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-end justify-between pointer-events-auto select-none">
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="hidden md:flex gap-12"
          >
            <div>
              <p className="text-3xl font-bold text-white">7+</p>
              <p className="text-sm text-apple-label-tertiary">Projects Built</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">1st</p>
              <p className="text-sm text-apple-label-tertiary">IIM Hackathon</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">88%</p>
              <p className="text-sm text-apple-label-tertiary">RAG Accuracy</p>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <ScrollIndicator className="hidden md:flex" />
        </div>
      </div>
    </div>
  );
}
