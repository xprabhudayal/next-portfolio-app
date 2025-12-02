'use client';

import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  className?: string;
}

export default function ScrollIndicator({ className = '' }: ScrollIndicatorProps) {
  return (
    <motion.div
      className={`flex flex-col items-center gap-2 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <span className="text-xs text-apple-label-tertiary tracking-widest uppercase">
        Scroll
      </span>
      <motion.div
        className="w-[1px] h-12 bg-gradient-to-b from-apple-label-tertiary to-transparent"
        animate={{ scaleY: [1, 0.5, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ transformOrigin: 'top' }}
      />
    </motion.div>
  );
}
