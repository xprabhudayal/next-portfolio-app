'use client';

import { PhoneIcon } from './Icons';
import { TalkButtonProps } from '../types';

export default function TalkAboutMeButton({ onClick }: TalkButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-50 group"
      aria-label="Talk about me with AI"
    >
      {/* Glow effect - only on hover */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-purple to-accent-blue opacity-0 group-hover:opacity-75 blur-2xl transition-opacity duration-500 animate-pulse"></div>

      {/* Button */}
      <div className="relative flex items-center gap-3 px-8 py-4 rounded-full liquid-glass shadow-glass transition-all duration-300 group-hover:scale-105 group-hover:glow-gradient">
        <PhoneIcon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
        <span className="font-medium text-apple-label">Talk about Me</span>
      </div>
    </button>
  );
}
