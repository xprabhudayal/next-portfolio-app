'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'WORK', path: '/projects', activeColor: 'bg-primary text-primary-foreground' },
    { name: 'RESUME', path: '/resume', activeColor: 'bg-card text-card-foreground' },
    { name: 'LINKS', path: '/links', activeColor: 'bg-tertiary text-tertiary-foreground' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b-2 border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-3xl font-black uppercase tracking-tighter hover:bg-primary hover:text-primary-foreground px-2 border-2 border-transparent hover:border-border transition-all" onClick={() => setIsOpen(false)}>
          PDV.
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const activeClasses = isActive
              ? `${item.activeColor} border-border neo-shadow translate-x-[-2px] translate-y-[-2px]`
              : "bg-transparent text-foreground border-transparent hover:border-border hover:bg-muted";

            return (
              <Link key={item.path} href={item.path}>
                <div className={`px-5 py-2 font-bold text-sm border-2 transition-all duration-200 uppercase tracking-wide ease-snappy ${activeClasses}`}>
                  {item.name}
                </div>
              </Link>
            );
          })}
          <ThemeToggle />
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 border-2 border-border active:bg-muted"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full h-[calc(100vh-4rem)] bg-background border-t-2 border-border flex flex-col p-6 gap-4 animate-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} onClick={() => setIsOpen(false)}>
              <div className={`text-4xl font-black uppercase tracking-tighter py-4 border-b-2 border-muted hover:text-primary transition-colors ${pathname === item.path ? 'text-primary pl-4 border-l-8 border-border font-italic' : ''}`}>
                {item.name}
              </div>
            </Link>
          ))}
          <div className="pt-4 mt-auto border-t-2 border-dashed border-muted flex justify-between items-center">
            <span className="font-bold uppercase text-lg">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
