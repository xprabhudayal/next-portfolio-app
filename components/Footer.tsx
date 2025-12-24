'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Marquee } from "@/components/ui/Marquee";

export default function Footer() {
    return (
        <footer className="w-full bg-foreground text-background dark:bg-primary dark:text-black transition-colors duration-300">

            {/* Caution Tape Border */}
            <Marquee className="w-full bg-primary dark:bg-black border-t-4 border-b-4 border-border py-2 text-primary-foreground dark:text-primary font-black uppercase text-lg md:text-xl tracking-widest select-none" pauseOnHover>
                <span className="mx-4">
                    ⚠ CAUTION: CONSTRUCTING INTELLIGENT SYSTEMS ⚠ AI ENGINEER AT WORK ⚠ BREAKING CODES & BUILDING DREAMS ⚠
                </span>
            </Marquee>

            <div className="px-6 md:px-12 pt-16 pb-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">

                    {/* Brand */}
                    <div>
                        <h2 className="text-8xl md:text-9xl font-black uppercase leading-[0.8] tracking-tighter text-background dark:text-black mix-blend-difference dark:mix-blend-normal">
                            PDV.
                        </h2>
                        <p className="font-mono text-white dark:text-black/80 max-w-sm mt-4 font-bold">
                            Building digital chaos across the web.
                            <br />Based in India, working worldwide.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                        {['GitHub', 'Twitter', 'LinkedIn', 'Instagram'].map((link) => (
                            <Link key={link} href="#" className="flex items-center justify-between text-2xl font-bold uppercase border-b border-muted dark:border-black/20 py-2 hover:text-primary dark:hover:text-white hover:border-primary dark:hover:border-white transition-colors group text-background dark:text-black">
                                {link}
                                <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-muted dark:border-black/20 flex flex-col md:flex-row justify-between items-center text-sm font-mono text-muted-foreground dark:text-black/60">
                    <p>© 2025 PDV. ALL RIGHTS RESERVED.</p>
                    <p>DESIGNED WITH <span className="text-primary dark:text-black">♥</span> AND NO ROUNDED CORNERS.</p>
                </div>
            </div>

            {/* Bottom Yellow Bar */}
            <div className="w-full h-4 bg-primary dark:bg-black border-t-2 border-border"></div>
        </footer>
    );
}
