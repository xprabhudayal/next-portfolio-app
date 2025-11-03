import React from 'react';
import { PhoneIcon } from './Icons';

interface LiveButtonProps {
  onClick: () => void;
}

export default function LiveButton({ onClick }: LiveButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center gap-3 px-6 py-3 rounded-full text-white font-semibold shadow-2xl transition-all duration-300 ease-in-out group"
      style={{
        background: 'radial-gradient(circle at 50% 120%, rgba(120, 81, 255, 0.4), rgba(120, 81, 255, 0) 70%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="absolute inset-0 bg-black/50 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></div>
      <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-75 blur-lg transition-opacity duration-500"></span>
      
      <PhoneIcon className="w-5 h-5 z-10" />
      <span className="z-10">Talk about Me</span>
    </button>
  );
}
