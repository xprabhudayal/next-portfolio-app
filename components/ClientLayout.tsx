'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import TalkAboutMeButton from './TalkAboutMeButton';
import LiveChatModal from './LiveChatModal';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen pt-16 bg-background">
        {children}
      </main>

      <TalkAboutMeButton onClick={() => setShowModal(true)} />
      {showModal && <LiveChatModal onClose={() => setShowModal(false)} />}
    </>
  );
}
