'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BlurText from '../components/BlurText';
import GradientText from '../components/GradientText';
import ScrollIndicator from '../components/ScrollIndicator';
import CountUp from '../components/reactbits/CountUp';
import RotatingText from '../components/reactbits/RotatingText';
import StarBorder from '../components/reactbits/StarBorder';
import ShinyText from '../components/reactbits/ShinyText';
import Magnet from '../components/reactbits/Magnet';
import { ArrowRight, Sparkles } from 'lucide-react';

// CRITICAL FIX: Disable SSR for 3D components (Next.js 15 + WebGL incompatibility)
const DraggableLanyard = dynamic(() => import('../components/DraggableLanyard'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-apple-label-secondary animate-pulse text-lg font-medium">
        Loading 3D Scene...
      </div>
    </div>
  ),
});

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Two Column Layout */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left Column - Hero Content */}
        <div className="flex-1 flex flex-col justify-between px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-28 pb-12 select-none">
          {/* Main Hero Section */}
          <div className="flex-1 flex flex-col justify-center max-w-2xl">
            {/* Status Badge with Star Border */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <StarBorder color="#bf5af2" speed="4s">
                <span className="inline-flex items-center gap-2 text-sm text-white/90">
                  <Sparkles className="w-4 h-4 text-accent-purple" />
                  <ShinyText text="Available for opportunities" speed={3} className="text-white/90" />
                </span>
              </StarBorder>
            </motion.div>

            {/* Name - Editorial Typography */}
            <div className="mb-6">
              <BlurText
                text="Prabhudayal"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-none"
                delay={80}
                animateBy="letters"
                direction="bottom"
                stepDuration={0.4}
              />
              <div className="mt-2">
                <GradientText
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-none"
                  colors={['#bf5af2', '#0a84ff', '#ff375f', '#bf5af2']}
                  animationSpeed={6}
                >
                  Vaishnav
                </GradientText>
              </div>
            </div>

            {/* Role/Title with Rotating Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mb-8"
            >
              <div className="text-xl sm:text-2xl md:text-3xl text-apple-label-secondary font-light tracking-wide flex items-center gap-2 flex-wrap">
                <RotatingText
                  texts={['AI Engineer', 'Full-Stack Developer', 'ML Researcher', 'Problem Solver']}
                  mainClassName="text-white font-medium overflow-hidden h-[1.2em]"
                  staggerFrom="last"
                  staggerDuration={0.025}
                  rotationInterval={3000}
                  transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                />
                <span className="text-apple-label-tertiary">&</span>
                <span>Builder</span>
              </div>
              <p className="text-base sm:text-lg text-apple-label-tertiary mt-3 max-w-xl leading-relaxed">
                Building intelligent systems with LangGraph, PyTorch, and Next.js. 
                Currently researching emotion detection at ESIEA Paris.
              </p>
            </motion.div>

            {/* CTA Buttons with Magnet Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="flex flex-wrap gap-4"
            >
              <Magnet padding={60} magnetStrength={3}>
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium shadow-lg transition-all duration-300 hover:shadow-glow hover:shadow-accent-purple/30"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Magnet>
              <Magnet padding={60} magnetStrength={3}>
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                >
                  <span className="font-medium text-white/90">Download Resume</span>
                </Link>
              </Magnet>
            </motion.div>
          </div>

          {/* Bottom Section - Stats with CountUp */}
          <div className="flex items-end justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="hidden md:flex gap-12"
            >
              <div className="group">
                <p className="text-3xl lg:text-4xl font-bold text-white tabular-nums">
                  <CountUp to={7} duration={2.5} delay={2} className="text-white" />
                  <span className="text-accent-purple">+</span>
                </p>
                <p className="text-sm text-apple-label-tertiary mt-1 group-hover:text-apple-label-secondary transition-colors">Projects Built</p>
              </div>
              <div className="group">
                <p className="text-3xl lg:text-4xl font-bold text-white tabular-nums">
                  <CountUp to={1} duration={1.5} delay={2.2} className="text-white" />
                  <span className="text-accent-blue">st</span>
                </p>
                <p className="text-sm text-apple-label-tertiary mt-1 group-hover:text-apple-label-secondary transition-colors">IIM Hackathon</p>
              </div>
              <div className="group">
                <p className="text-3xl lg:text-4xl font-bold text-white tabular-nums">
                  <CountUp to={88} duration={2} delay={2.4} className="text-white" />
                  <span className="text-accent-pink">%</span>
                </p>
                <p className="text-sm text-apple-label-tertiary mt-1 group-hover:text-apple-label-secondary transition-colors">RAG Accuracy</p>
              </div>
            </motion.div>
            <ScrollIndicator className="hidden lg:hidden md:flex" />
          </div>
        </div>

        {/* Right Column - 3D Lanyard */}
        <div className="flex-1 relative min-h-[50vh] lg:min-h-screen">
          <DraggableLanyard className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
