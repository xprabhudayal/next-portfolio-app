'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import TalkAboutMeButton from './TalkAboutMeButton';
import LiveChatModal from './LiveChatModal';
import BetaWarningModal from './BetaWarningModal'; // Import new component
import { ProgressiveBlur } from './ui/progressive-blur';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  return (
    <>
      <ProgressiveBlur className="fixed top-0 left-0 right-0 h-40 z-40" direction="top" blurIntensity="10px" />
      <Navbar />
      <main className="w-full min-h-screen pt-16 bg-background">
        {children}
      </main>

      <TalkAboutMeButton onClick={() => setShowWarning(true)} />

      {showWarning && (
        <BetaWarningModal
          onClose={() => setShowWarning(false)}
          onStart={() => {
            setShowWarning(false);
            setShowModal(true);
          }}
        />
      )}

      {showModal && <LiveChatModal onClose={() => setShowModal(false)} />}
    </>
  );
}
