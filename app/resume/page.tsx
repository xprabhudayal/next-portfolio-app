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
    <div className="w-full min-h-full overflow-y-auto py-20 px-4 sm:px-6 md:px-8 lg:px-16 pt-32">
      <div className="text-center max-w-2xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 gradient-3d-text gradient-text-blur page-title">
          Resume
        </h1>
        <p className="page-description mb-8 px-4">
          Download my resume to learn more about my experience, skills, and achievements
        </p>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="group liquid-glass rounded-apple px-8 sm:px-10 py-4 sm:py-5 inline-flex items-center gap-3 sm:gap-4 shadow-glass transition-all duration-300 hover:scale-[1.02] hover:shadow-glow mb-8"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-strong flex items-center justify-center transition-all duration-300 group-hover:bg-accent-blue/10">
            <Download className="w-5 h-5 sm:w-6 sm:h-6 text-accent-blue group-hover:animate-bounce" />
          </div>
          <span className="text-lg sm:text-xl font-semibold platform-name">Download Resume</span>
        </button>
      </div>
    </div>
  );
}
