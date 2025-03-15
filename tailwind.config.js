/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          DEFAULT: '#0D1A15',
          light: '#14231C',
          border: '#2D3E35',
          green: '#00FF41',
          yellow: '#FFFF00',
          red: '#F97583',
          blue: '#79B8FF',
          text: '#E6EDF3',
          muted: '#8B949E',
        },
      },
      fontFamily: {
        terminus: ['var(--font-terminus)'],
        hack: ['var(--font-hack)'],
        mono: [
          'var(--font-hack)',
          'ui-monospace',
          'SFMono-Regular',
          'monospace',
        ],
      },
      animation: {
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'matrix-rain': 'matrix-rain 10s linear infinite',
        'text-typing': 'text-typing 3.5s steps(40, end)',
      },
      keyframes: {
        'cursor-blink': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'text-typing': {
          from: { width: '0' },
          to: { width: '100%' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
