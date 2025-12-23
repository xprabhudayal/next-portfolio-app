'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-primary flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-9xl font-black mb-4">404</h1>
            <div className="bg-black text-white p-4 border-2 border-black -rotate-2 mb-8 neo-shadow">
                <h2 className="text-2xl font-bold uppercase">System Error: Page Not Found</h2>
            </div>
            <p className="font-mono text-xl mb-8 max-w-md">
                The requested URL was not found on this server. It might have been deleted, moved, or never existed in this timeline.
            </p>

            <Link href="/" className="bg-white text-black px-8 py-4 font-black uppercase border-2 border-black neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-300 ease-snappy">
                Return to Safety
            </Link>
        </div>
    );
}
