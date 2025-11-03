// app/layout.tsx
'use client';

import './globals.css';
import Navbar from '../components/Navbar';
import TalkAboutMeButton from '../components/TalkAboutMeButton';
import LiveChatModal from '../components/LiveChatModal';
import { useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>Prabhudayal Vaishnav - AI Engineer & Full-Stack Developer</title>
        <meta
          name="description"
          content="Portfolio of Prabhudayal Vaishnav - AI Engineer, Full-Stack Developer, and Research Intern at ESIEA Paris"
        />
      </head>
      <body>
        <Navbar />
        <main className="w-full h-screen overflow-hidden">{children}</main>
        <TalkAboutMeButton onClick={() => setShowModal(true)} />
        {showModal && <LiveChatModal onClose={() => setShowModal(false)} />}
      </body>
    </html>
  );
}