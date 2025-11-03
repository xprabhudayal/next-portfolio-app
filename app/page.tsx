'use client';

import DraggableLanyard from '../components/DraggableLanyard';

export default function HomePage() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-apple-black">
      {/* 3D Lanyard */}
      <DraggableLanyard className="w-full h-full" />
    </div>
  );
}
