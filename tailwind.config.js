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
  			'sf-pro': [
  				'SF Pro Display',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'sans-serif'
  			]
  		},
  		colors: {
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
  				separator: 'rgba(84, 84, 88, 0.6)'
  			},
  			accent: {
  				blue: '#0a84ff',
  				purple: '#bf5af2',
  				pink: '#ff375f',
  				orange: '#ff9f0a',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backdropBlur: {
  			apple: '20px'
  		},
  		borderRadius: {
  			apple: '20px',
  			'apple-lg': '28px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  			glow: '0 0 20px rgba(191, 90, 242, 0.4)'
  		},
  		keyframes: {
  			gradient: {
  				'0%': {
  					backgroundPosition: '0% 50%'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%'
  				},
  				'100%': {
  					backgroundPosition: '0% 50%'
  				}
  			},
  			shine: {
  				'0%': {
  					backgroundPosition: '100%'
  				},
  				'100%': {
  					backgroundPosition: '-100%'
  				}
  			},
  			'star-movement-bottom': {
  				'0%': {
  					transform: 'translate(0%, 0%)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'translate(-100%, 0%)',
  					opacity: '0'
  				}
  			},
  			'star-movement-top': {
  				'0%': {
  					transform: 'translate(0%, 0%)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'translate(100%, 0%)',
  					opacity: '0'
  				}
  			}
  		},
  		animation: {
  			gradient: 'gradient 8s linear infinite',
  			shine: 'shine 5s linear infinite',
  			'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
  			'star-movement-top': 'star-movement-top linear infinite alternate'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};