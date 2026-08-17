/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F6F5E8',
        'paper-dark': '#E8E6D3',
        ink: '#1a1a1a',
        'ink-light': '#333333',
        accent: '#FF6B6B',
        'accent-blue': '#4ECDC4',
        'accent-yellow': '#FFE66D',
        border: '#1a1a1a',
      },
      fontFamily: {
        mono: ['var(--font-pixel)', 'Courier New', 'monospace'],
        sans: ['var(--font-sans)', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #1a1a1a',
        'brutal-lg': '6px 6px 0px 0px #1a1a1a',
        'brutal-xl': '8px 8px 0px 0px #1a1a1a',
        'brutal-hover': '6px 6px 0px 0px #1a1a1a',
        'brutal-active': '2px 2px 0px 0px #1a1a1a',
        'inner-pixel': 'inset 2px 2px 0px 0px rgba(0,0,0,0.1)',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}
