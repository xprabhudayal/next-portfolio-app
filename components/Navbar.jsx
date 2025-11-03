// components/Navbar.js
'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-5 left-0 w-full px-5 z-50">
      <div className="flex justify-center items-center w-full">
        <div className="bg-black/10 backdrop-blur-xl rounded-lg py-3 px-6 flex items-center gap-8">
          <Link href="/about" className="hover:opacity-70 transition-opacity">
            ABOUT
          </Link>
          <Link href="/projects" className="hover:opacity-70 transition-opacity">
            PROJECTS
          </Link>
          <Link href="/resume" className="hover:opacity-70 transition-opacity">
            RESUME
          </Link>
          <Link href="/contact" className="hover:opacity-70 transition-opacity">
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;