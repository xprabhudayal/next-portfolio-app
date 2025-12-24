'use client';

import React from 'react';
import { RESUME_DATA } from "@/components/constants";
import Footer from "@/components/Footer";
import { ArrowUpRight } from 'lucide-react';

export default function LinksPage() {
    const { contact: { links, email, portfolio } } = RESUME_DATA;

    const allLinks = [
        ...links,
        { name: "Portfolio", url: portfolio, icon: undefined },
    ];

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <div className="flex-grow pt-32 pb-20 px-4 md:px-8 max-w-3xl mx-auto w-full">
                <h1 className="text-6xl md:text-8xl font-black uppercase mb-12 border-b-4 border-border pb-4 text-center md:text-left">
                    Links.
                </h1>

                <div className="flex flex-col gap-6">
                    {allLinks.map((link) => {
                        return (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block"
                            >
                                {/* Shadow layer - stays fixed */}
                                <div className="absolute inset-0 bg-border dark:bg-white translate-x-1 translate-y-1" />
                                {/* Main card - pushes DOWN on hover (neo-brutal style) */}
                                <div className="relative bg-card text-card-foreground border-2 border-border p-6 flex items-center justify-between transition-all duration-150 group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-active:translate-x-[4px] group-active:translate-y-[4px]">
                                    <div className="flex items-center gap-4">
                                        {link.icon && React.createElement(link.icon as React.ComponentType<{ size: number }>, { size: 32 })}
                                        <span className="text-2xl md:text-3xl font-bold uppercase">{link.name}</span>
                                    </div>
                                    <ArrowUpRight size={32} className="group-hover:rotate-45 transition-transform duration-300" />
                                </div>
                            </a>
                        );
                    })}

                    {/* Email CTA - uses primary highlight */}
                    <a
                        href={`mailto:${email}`}
                        className="group relative block mt-8"
                    >
                        <div className="absolute inset-0 bg-primary translate-x-1 translate-y-1" />
                        <div className="relative bg-primary text-primary-foreground border-2 border-border p-6 flex items-center justify-center transition-all duration-150 group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-active:translate-x-[4px] group-active:translate-y-[4px]">
                            <span className="text-2xl md:text-3xl font-black uppercase tracking-widest">
                                SEND EMAIL
                            </span>
                        </div>
                    </a>
                </div>
            </div>
            <Footer />
        </main>
    );
}
