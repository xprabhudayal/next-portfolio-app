import Navbar from '../components/Navbar';
import AnimatedBackground from '../components/AnimatedBackground';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <AnimatedBackground />
      <Navbar />
      
      <div className="container max-w-screen-xl mx-auto px-6 z-10 mt-24">
        <div className="hero-content flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium mb-6 opacity-90">
            Your Name
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl opacity-70 mb-12">
            Creative Developer & Digital Experience Designer
          </p>
          <div className="cta-button inline-block">
            <a href="/projects" className="border border-white px-8 py-4 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300">
              View Projects
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}