'use client';

import DraggableLanyard from '../components/DraggableLanyard';

export default function HomePage() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-apple-black">
      {/* 3D Lanyard - Behind navbar (z-0) */}
      <div className="absolute inset-0 z-0">
        <DraggableLanyard className="w-full h-full" />
      </div>
    </div>
  );
}
