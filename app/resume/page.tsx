'use client';

import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

export default function ResumePage() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/docs/updated_2page_resume.pdf';
    link.download = 'Prabhudayal_Vaishnav_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center py-20 px-4 pt-32">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-violet-600/10 via-fuchsia-600/10 to-pink-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex"
        >
          <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
            <FileText className="w-8 h-8 text-white/50" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl font-bold mb-4 text-white"
        >
          Resume
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-white/40 mb-10"
        >
          Download my resume to learn more about my experience and skills
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={handleDownload}
          className="group px-8 py-4 rounded-full bg-white text-black font-semibold inline-flex items-center gap-3 transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]"
        >
          <Download className="w-5 h-5" />
          Download Resume
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex items-center justify-center gap-6 text-sm text-white/30"
        >
          <span>2 Pages</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>PDF Format</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Updated Dec 2025</span>
        </motion.div>
      </div>
    </div>
  );
}
