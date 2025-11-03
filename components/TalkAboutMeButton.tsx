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
      {/* Glow effect container */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-purple to-accent-blue opacity-75 blur-2xl group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

      {/* Button */}
      <div className="relative flex items-center gap-3 px-8 py-4 rounded-full glass-strong shadow-glow transition-all duration-300 group-hover:scale-105">
        <PhoneIcon className="w-5 h-5" />
        <span className="font-medium text-apple-label">Talk about Me</span>
      </div>
    </button>
  );
}
