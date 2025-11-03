'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Download } from 'lucide-react';

export default function ResumePage() {
  const router = useRouter();

  const handleDownload = () => {
    // Create a temporary link to download the PDF
    const link = document.createElement('a');
    link.href = '/docs/updated_2page_resume.pdf';
    link.download = 'Prabhudayal_Vaishnav_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-full bg-apple-black flex items-center justify-center px-8">
      <div className="text-center max-w-2xl">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 rounded-full glass-strong flex items-center justify-center glow-blue">
            <Download className="w-16 h-16 text-accent-blue" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
          Resume
        </h1>
        <p className="text-apple-label-secondary text-lg mb-12 leading-relaxed">
          Download my resume to learn more about my experience, skills, and achievements
        </p>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="group liquid-glass rounded-apple px-10 py-5 inline-flex items-center gap-4 shadow-glass transition-all duration-500 hover:scale-105 hover:shadow-glow"
        >
          <Download className="w-6 h-6 text-accent-blue group-hover:animate-bounce" />
          <span className="text-xl font-semibold text-apple-label">Download Resume</span>
        </button>

        {/* Additional Info */}
        <div className="mt-12 space-y-4">
          <div className="glass rounded-apple p-6">
            <h3 className="text-apple-label font-medium mb-2">What's Inside</h3>
            <ul className="text-apple-label-secondary text-sm space-y-2">
              <li>• Research Internship at ESIEA Paris</li>
              <li>• 7+ AI/ML Projects including Voice AI Systems</li>
              <li>• Full-stack Development Experience</li>
              <li>• Open Source Contributions</li>
              <li>• Hackathon Winner - IIM Nagpur</li>
            </ul>
          </div>
        </div>

        {/* Navigation Back */}
        <button
          onClick={() => router.push('/')}
          className="mt-8 text-apple-label-secondary hover:text-accent-purple transition-colors duration-300"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
