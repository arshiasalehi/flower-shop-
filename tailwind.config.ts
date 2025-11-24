import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#c6538c',
          light: '#f4d5e2',
          dark: '#8a2d57'
        },
        accent: '#f4a259',
        ink: '#1f1b24'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: [
          '"Inter"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif'
        ]
      },
      boxShadow: {
        card: '0 10px 30px rgba(0,0,0,0.08)'
      }
    }
  },
  plugins: []
};

export default config;
