'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from './Navbar';
import TalkAboutMeButton from './TalkAboutMeButton';
import FlowingAurora from './FlowingAurora';

// Dynamically import LiveChatModal with SSR disabled
const LiveChatModal = dynamic(() => import('./LiveChatModal'), {
  ssr: false,
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* SVG Filters for Liquid Glass Effects */}
      <svg style={{ display: 'none' }}>
        {/* Apple Liquid Glass Distortion */}
        <filter id="apple-liquid-distortion" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.008"
            numOctaves={2}
            seed={92}
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation={2} result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale={70}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Refractive Glass Distortion */}
        <filter id="refractive-distortion" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.01"
            numOctaves={3}
            seed={45}
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation={1.5} result="blur" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blur"
            scale={50}
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur in="SourceGraphic" stdDeviation={0.5} result="finalBlur" />
        </filter>

        {/* Specular Highlight Filter */}
        <filter id="specular-highlight" x="0%" y="0%" width="100%" height="100%">
          <feGaussianBlur in="SourceAlpha" stdDeviation={3} result="blur"/>
          <feSpecularLighting
            in="blur"
            surfaceScale={5}
            specularConstant={0.75}
            specularExponent={20}
            lightingColor="white"
            result="specOut"
          >
            <feDistantLight azimuth={45} elevation={60}/>
          </feSpecularLighting>
          <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut2"/>
          <feComposite
            in="SourceGraphic"
            in2="specOut2"
            operator="arithmetic"
            k1={0}
            k2={1}
            k3={1}
            k4={0}
          />
        </filter>
      </svg>

      {/* Flowing Aurora Background - Present on all pages */}
      <div className="fixed inset-0 z-0">
        <FlowingAurora />
      </div>

      {/* Main content wrapper */}
      <div className="relative z-10">
        <Navbar />
        <main className="w-full min-h-screen">{children}</main>
      </div>

      <TalkAboutMeButton onClick={() => setShowModal(true)} />
      {showModal && <LiveChatModal onClose={() => setShowModal(false)} />}
    </>
  );
}
