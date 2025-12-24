'use client';

import { useEffect } from 'react';
import { AnimatedThemeToggler } from './ui/animated-theme-toggler';

export default function ThemeToggle() {
    // Initialize theme from localStorage or system preference on mount
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    return (
        <AnimatedThemeToggler
            className="p-2 border-2 border-border bg-card text-foreground transition-all hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px] neo-shadow"
            aria-label="Toggle Theme"
        />
    );
}

