'use client';

export default function FlowingAurora() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient - Deep black to dark grey */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#000000]" />

      {/* Soft radial glow 1 - Dark grey */}
      <div
        className="absolute top-[20%] left-[30%] w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #2a2a2a 0%, #1a1a1a 50%, transparent 70%)',
          animation: 'subtle-float-1 25s ease-in-out infinite',
        }}
      />

      {/* Soft radial glow 2 - Medium grey */}
      <div
        className="absolute top-[40%] right-[25%] w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, #3a3a3a 0%, #252525 50%, transparent 70%)',
          animation: 'subtle-float-2 30s ease-in-out infinite',
          animationDelay: '-10s',
        }}
      />

      {/* Soft radial glow 3 - Light grey accent */}
      <div
        className="absolute bottom-[25%] left-[45%] w-[550px] h-[550px] rounded-full opacity-18 blur-[110px]"
        style={{
          background: 'radial-gradient(circle, #404040 0%, #2d2d2d 50%, transparent 70%)',
          animation: 'subtle-float-3 35s ease-in-out infinite',
          animationDelay: '-20s',
        }}
      />

      <style jsx>{`
        @keyframes subtle-float-1 {
          0%, 100% {
            transform: translate(0%, 0%);
          }
          50% {
            transform: translate(10%, -5%);
          }
        }

        @keyframes subtle-float-2 {
          0%, 100% {
            transform: translate(0%, 0%);
          }
          50% {
            transform: translate(-8%, 8%);
          }
        }

        @keyframes subtle-float-3 {
          0%, 100% {
            transform: translate(0%, 0%);
          }
          50% {
            transform: translate(6%, -6%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          div[style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
