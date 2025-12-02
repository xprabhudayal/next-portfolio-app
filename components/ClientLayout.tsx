'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from './Navbar';
import TalkAboutMeButton from './TalkAboutMeButton';

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
      <div className="relative z-10">
        <Navbar />
        <main className="w-full min-h-screen">{children}</main>
      </div>

      <TalkAboutMeButton onClick={() => setShowModal(true)} />
      {showModal && <LiveChatModal onClose={() => setShowModal(false)} />}
    </>
  );
}
