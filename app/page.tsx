'use client';

import dynamic from 'next/dynamic';
import FlowingAurora from '../components/FlowingAurora';

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
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Flowing Aurora Background - Deepest layer (z-0) */}
      <FlowingAurora />

      {/* 3D Lanyard - Above aurora (z-10) */}
      <div className="absolute inset-0 z-10">
        <DraggableLanyard className="w-full h-full" />
      </div>
    </div>
  );
}
