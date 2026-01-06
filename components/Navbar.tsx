'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, House, Briefcase, FileText, Link as LinkIcon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

// Separate component to handle individual blink state
function NavButton({ item, isActive }: { item: any, isActive: boolean }) {
  const [isBlinking, setIsBlinking] = useState(false);

  const handleClick = () => {
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 200);
  };

  return (
    <Link href={item.path} onClick={handleClick}>
      <div
        className={`
          h-12 flex items-center gap-2 px-6 font-bold text-sm border-2 border-border transition-all duration-200 uppercase tracking-wide
          ${isActive
            ? 'bg-primary text-primary-foreground translate-x-[4px] translate-y-[4px] shadow-none'
            : 'bg-background text-foreground neo-shadow hover:bg-primary hover:text-primary-foreground hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none'
          }
          ${isBlinking ? 'animate-blink' : ''}
        `}
      >
        <item.icon size={18} />
        <span>{item.name}</span>
      </div>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'HOME', path: '/', icon: House },
    { name: 'WORK', path: '/projects', icon: Briefcase },
    { name: 'RESUME', path: '/resume', icon: FileText },
    { name: 'LINKS', path: '/links', icon: LinkIcon },
  ];

  return (
    <>
      <nav className="fixed top-8 w-full px-6 md:px-0 md:w-auto md:left-1/2 md:-translate-x-1/2 z-50 flex items-center justify-between md:justify-center md:gap-4 pointer-events-none">

        {/* Mobile Hamburger - Left */}
        <button
          className="md:hidden pointer-events-auto h-12 w-12 flex items-center justify-center border-2 border-border neo-shadow bg-background text-foreground active:animate-blink transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Items - Center */}
        <div className="hidden md:flex items-center gap-4 pointer-events-auto">
          {navItems.map((item) => (
            <NavButton key={item.path} item={item} isActive={pathname === item.path} />
          ))}
        </div>

        {/* Theme Toggle - Right on Mobile, Last on Desktop */}
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center md:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-6 w-full max-w-xs px-6">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} onClick={() => setIsOpen(false)}>
                <div
                  className={`
                      h-16 flex items-center justify-center gap-4 font-black text-2xl border-2 border-border transition-all uppercase w-full
                      ${pathname === item.path
                      ? 'bg-primary text-primary-foreground translate-x-[4px] translate-y-[4px] shadow-none'
                      : 'bg-background text-foreground neo-shadow active:translate-x-[4px] active:translate-y-[4px] active:shadow-none'
                    }
                    `}
                >
                  <item.icon size={28} />
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
