/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Oswald', 'sans-serif'], // Bold, Condensed
                mono: ['Courier Prime', 'monospace'], // Raw value
            },
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                card: {
                    DEFAULT: 'var(--card)',
                    foreground: 'var(--card-foreground)'
                },
                primary: {
                    DEFAULT: 'var(--primary)',
                    foreground: 'var(--primary-foreground)'
                },
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    foreground: 'var(--secondary-foreground)'
                },
                tertiary: {
                    DEFAULT: 'var(--tertiary)',
                    foreground: 'var(--tertiary-foreground)'
                },
                accent: {
                    DEFAULT: 'var(--accent)',
                    foreground: 'var(--accent-foreground)'
                },
                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)'
                },
                destructive: {
                    DEFAULT: 'var(--destructive)',
                    foreground: 'var(--destructive-foreground)'
                },
                border: 'var(--border)',
                input: 'var(--input)',
                ring: 'var(--ring)',
            },
            boxShadow: {
                'neo': '4px 4px 0px 0px var(--border)',
                'neo-lg': '8px 8px 0px 0px var(--border)',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
                marquee2: 'marquee2 25s linear infinite',
            },
            transitionTimingFunction: {
                'snappy': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                marquee2: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
            },
        }
    },
    plugins: [],
};
