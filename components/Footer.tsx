'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full bg-foreground text-background">

            {/* Caution Tape Border */}
            <div className="w-full bg-primary border-t-4 border-b-4 border-border py-3 overflow-hidden">
                <div className="flex whitespace-nowrap select-none">
                    <div className="animate-marquee flex-shrink-0 font-black uppercase text-lg md:text-xl tracking-widest text-primary-foreground">
                        ⚠ CAUTION: CONSTRUCTING INTELLIGENT SYSTEMS ⚠ AI ENGINEER AT WORK ⚠ BREAKING CODES & BUILDING DREAMS ⚠&nbsp;
                    </div>
                    <div className="animate-marquee flex-shrink-0 font-black uppercase text-lg md:text-xl tracking-widest text-primary-foreground">
                        ⚠ CAUTION: CONSTRUCTING INTELLIGENT SYSTEMS ⚠ AI ENGINEER AT WORK ⚠ BREAKING CODES & BUILDING DREAMS ⚠&nbsp;
                    </div>
                </div>
            </div>

            <div className="px-6 md:px-12 pt-16 pb-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">

                    {/* Brand */}
                    <div>
                        <h2 className="text-8xl md:text-9xl font-black uppercase leading-[0.8] tracking-tighter">
                            PDV.
                        </h2>
                        <p className="font-mono text-muted-foreground max-w-sm mt-4">
                            Building digital chaos across the web.
                            <br />Based in India, working worldwide.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                        {['GitHub', 'Twitter', 'LinkedIn', 'Instagram'].map((link) => (
                            <Link key={link} href="#" className="flex items-center justify-between text-2xl font-bold uppercase border-b border-muted py-2 hover:text-primary hover:border-primary transition-colors group">
                                {link}
                                <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-muted flex flex-col md:flex-row justify-between items-center text-sm font-mono text-muted-foreground">
                    <p>© 2025 PDV. ALL RIGHTS RESERVED.</p>
                    <p>DESIGNED WITH <span className="text-primary">♥</span> AND NO ROUNDED CORNERS.</p>
                </div>
            </div>

            {/* Bottom Yellow Bar */}
            <div className="w-full h-4 bg-primary border-t-2 border-border"></div>
        </footer>
    );
}
