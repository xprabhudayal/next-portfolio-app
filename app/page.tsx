'use client';

import dynamic from 'next/dynamic';

// CRITICAL FIX: Disable SSR for 3D components (Next.js 15 + WebGL incompatibility)
// Using AdaptiveLanyard for automatic mobile optimization
const AdaptiveLanyard = dynamic(() => import('../components/AdaptiveLanyard'), {
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
      {/* 3D Lanyard with Adaptive Quality */}
      <div className="absolute inset-0">
        <AdaptiveLanyard
          className="w-full h-full"
          enablePerformanceMonitoring={true}
          enableIntersectionOptimization={true}
          onQualityChange={(quality) => {
            console.log('📊 Lanyard quality tier:', quality);
          }}
        />
      </div>
    </div>
  );
}
