/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sf-pro': ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        // Apple Dark Mode Colors
        apple: {
          black: '#000000',
          'gray-100': '#1c1c1e',
          'gray-200': '#2c2c2e',
          'gray-300': '#3a3a3c',
          'gray-400': '#48484a',
          'gray-500': '#636366',
          'gray-600': '#8e8e93',
          label: '#ffffff',
          'label-secondary': 'rgba(235, 235, 245, 0.6)',
          'label-tertiary': 'rgba(235, 235, 245, 0.3)',
          separator: 'rgba(84, 84, 88, 0.6)',
        },
        // Apple accent colors
        accent: {
          blue: '#0a84ff',
          purple: '#bf5af2',
          pink: '#ff375f',
          orange: '#ff9f0a',
        },
      },
      backdropBlur: {
        'apple': '20px',
      },
      borderRadius: {
        'apple': '20px',
        'apple-lg': '28px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow': '0 0 20px rgba(191, 90, 242, 0.4)',
      },
    },
  },
  plugins: [],
};