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
      <div className="liquid-glass rounded-apple-lg px-8 py-4 flex items-center gap-8 shadow-glass">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`
              text-sm font-medium tracking-wide transition-all duration-300
              ${
                isActive(item.path)
                  ? 'text-apple-label scale-110'
                  : 'text-apple-label-secondary hover:text-apple-label hover:scale-105'
              }
            `}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
