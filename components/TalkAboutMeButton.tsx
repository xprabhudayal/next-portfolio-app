'use client';

import { motion } from 'framer-motion';
import { PhoneIcon } from './Icons';
import { TalkButtonProps } from '../types';

export default function TalkAboutMeButton({ onClick }: TalkButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 2 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Talk about me with AI"
    >
      <div className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] transition-all duration-300 group-hover:bg-white/[0.06] group-hover:border-white/[0.1]">
        <PhoneIcon className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors" />
        <span className="text-sm font-medium text-white/60 group-hover:text-white/90 transition-colors">Talk about Me</span>
      </div>
    </motion.button>
  );
}
