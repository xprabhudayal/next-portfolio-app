// File: app/contact/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import Navbar from '../../components/Navbar';
import AnimatedBackground from '../../components/AnimatedBackground';
import VerificationModal from '../../components/VerificationModal';

// Contact data
const contactData = {
  email: "your.email@example.com",
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/yourusername",
      label: "github.com/yourusername"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      label: "linkedin.com/in/yourusername"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourusername",
      label: "@yourusername"
    }
  ]
};

export default function Contact() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const contentRef = useRef(null);
  
  // Animation on page load
  useEffect(() => {
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('.animate-item');
      
      gsap.fromTo(elements, 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.6, 
          ease: 'power3.out',
          delay: 0.3
        }
      );
    }
  }, []);
  
  const handleVerifyEmail = () => {
    setIsEmailVisible(true);
    setIsEmailModalOpen(false);
  };

  return (
    <main className="min-h-screen flex flex-col relative">
      <AnimatedBackground />
      <Navbar />
      
      <div className="container max-w-screen-md mx-auto px-6 z-10 flex flex-col justify-center items-center min-h-screen">
        <div 
          ref={contentRef}
          className="contact-content text-center max-w-md"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-8 animate-item">
            Let's Connect
          </h1>
          
          <p className="text-lg md:text-xl font-light opacity-80 mb-12 animate-item">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          
          {/* Email section */}
          <div className="email-section mb-16 animate-item">
            <h2 className="text-2xl font-medium mb-4">Email</h2>
            
            {isEmailVisible ? (
              <a 
                href={`mailto:${contactData.email}`}
                className="text-xl md:text-2xl hover:opacity-80 transition-opacity underline"
              >
                {contactData.email}
              </a>
            ) : (
              <button
                onClick={() => setIsEmailModalOpen(true)}
                className="text-xl md:text-2xl blur-sm hover:blur-md select-none transition-all opacity-70"
                aria-label="Reveal email address"
              >
                {contactData.email.replace(/./g, '•')}
              </button>
            )}
            
            {!isEmailVisible && (
              <div className="mt-4 animate-item">
                <button 
                  onClick={() => setIsEmailModalOpen(true)}
                  className="px-5 py-3 border border-white hover:bg-white hover:text-black transition-colors text-sm uppercase tracking-wide"
                >
                  Reveal Email
                </button>
              </div>
            )}
          </div>
          
          {/* Social links */}
          <div className="social-section animate-item">
            <h2 className="text-2xl font-medium mb-6">Connect on Social</h2>
            
            <div className="social-links flex flex-col gap-6">
              {contactData.socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link flex flex-col items-center group transition-opacity hover:opacity-70"
                >
                  <div className="font-medium text-lg">{link.name}</div>
                  <div className="text-sm opacity-60 group-hover:opacity-100 transition-opacity">{link.label}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Verification Modal */}
      <VerificationModal 
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onVerify={handleVerifyEmail}
        verificationType="contact"
      />
    </main>
  );
}