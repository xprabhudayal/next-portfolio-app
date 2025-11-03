'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavbarProps } from '../types';

export default function Navbar({ currentPage }: NavbarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'About', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Resume', path: '/resume' },
    { name: 'Links', path: '/links' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(path);
  };

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100]">
      <div className="glass rounded-apple-lg px-6 py-3 flex items-center gap-6 shadow-glass">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`
              relative text-sm font-medium tracking-wide transition-all duration-300
              ${
                isActive(item.path)
                  ? 'text-apple-label'
                  : 'text-apple-label-secondary hover:text-apple-label'
              }
            `}
          >
            {item.name}
            {isActive(item.path) && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
