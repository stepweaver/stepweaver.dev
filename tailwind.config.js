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
        'crt-flicker': 'crt-flicker 4s infinite ease-in-out',
        'crt-scan': 'crt-scan 8s linear infinite',
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
        'crt-flicker': {
          '0%': { opacity: 0.98 },
          '2%': { opacity: 0.9 },
          '4%': { opacity: 0.98 },
          '30%': { opacity: 1 },
          '70%': { opacity: 0.98 },
          '72%': { opacity: 0.93 },
          '74%': { opacity: 0.98 },
          '100%': { opacity: 0.98 },
        },
        'crt-scan': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      textShadow: {
        crt: '0 0 5px rgba(0, 255, 65, 0.5)',
      },
      boxShadow: {
        'crt-glow': '0 0 10px rgba(0, 255, 65, 0.2)',
        'crt-inner': 'inset 0 0 150px rgba(0, 255, 65, 0.1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
