'use client';

import React from 'react';
import { motion, Transition } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function GlowButton({ 
  children, 
  className = '', 
  variant = 'primary',
  showArrow = true,
  onClick
}: GlowButtonProps) {
  const glowColors = ['#0ea5e9', '#6366f1', '#8b5cf6', '#0ea5e9'];
  const scale = 1.4;
  const duration = 4;

  const breatheEffect = {
    background: glowColors.map(
      (color) => `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`
    ),
    scale: [1 * scale, 1.1 * scale, 1 * scale],
    transition: {
      repeat: Infinity,
      duration: duration,
      repeatType: 'mirror',
      ease: 'easeInOut',
    } as Transition,
  };

  const isPrimary = variant === 'primary';

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        group relative inline-flex items-center justify-center overflow-hidden rounded-full 
        px-8 py-4 font-medium transition-all duration-300
        ${isPrimary 
          ? 'bg-white/10 backdrop-blur-md text-white border border-white/20' 
          : 'bg-white/5 backdrop-blur-md text-white/80 border border-white/10'
        }
        hover:border-white/30 hover:shadow-2xl
        ${className}
      `}
      onClick={onClick}
    >
      {isPrimary && (
        <motion.div
          animate={breatheEffect}
          className="pointer-events-none absolute inset-0 z-0 transform-gpu blur-xl opacity-60"
          style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
        />
      )}
      <span className="relative z-10 flex items-center gap-3 text-base tracking-wide">
        {children}
        {showArrow && (
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </motion.button>
  );
}
