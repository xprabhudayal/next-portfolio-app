/** @type {import('tailwindcss').Config} */
// Refresh
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
            borderWidth: {
                DEFAULT: '1px',
                '0': '0',
                '2': 'var(--border-width)',
                '3': '3px',
                '4': '4px',
                '8': '8px',
            },
            keyframes: {
                marquee: {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(calc(-100% - var(--gap)))" },
                },
                "marquee-vertical": {
                    from: { transform: "translateY(0)" },
                    to: { transform: "translateY(calc(-100% - var(--gap)))" },
                },
                blink: {
                    "0%, 100%": { filter: "brightness(1)" },
                    "50%": { filter: "brightness(0.7)" },
                },
            },
            animation: {
                marquee: "marquee var(--duration) linear infinite",
                "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
                blink: "blink 0.2s ease-in-out",
            },
        }
    },
    plugins: [],
};
