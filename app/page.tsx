'use client';

import dynamic from 'next/dynamic';

// CRITICAL FIX: Disable SSR for 3D components (Next.js 15 + WebGL incompatibility)
const DraggableLanyard = dynamic(() => import('../components/DraggableLanyard'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <div className="text-apple-label-secondary animate-pulse text-lg font-medium">
        Loading 3D Scene...
      </div>
    </div>
  ),
});

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      {/* 3D Lanyard - Behind navbar (z-0) */}
      <div className="absolute inset-0 z-0">
        <DraggableLanyard className="w-full h-full" />
      </div>
    </div>
  );
}
