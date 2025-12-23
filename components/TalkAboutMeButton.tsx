'use client';

import { Phone } from 'lucide-react';
import { TalkButtonProps } from '../types';

export default function TalkAboutMeButton({ onClick }: TalkButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Talk about me with AI"
    >
      <div className="flex items-center gap-3 px-6 py-4 bg-white border-2 border-black text-black active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-y-1 transition-all duration-200">
        <div className="p-1 bg-black text-white">
          <Phone className="w-5 h-5" />
        </div>
        <span className="text-sm font-black uppercase tracking-tight">Talk to AI</span>
      </div>
    </button>
  );
}
