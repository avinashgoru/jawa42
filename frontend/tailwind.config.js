/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,jsx,mdx}',
    './src/app/**/*.{js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A0A0A',
        secondary: '#111111',
        surface: '#1A1A1A',
        border: '#2A2A2A',
        accent: '#B5121B',
        'accent-hover': '#D61C29',
        'text-sec': '#B3B3B3',
      },
      fontFamily: {
        heading: ['Satoshi', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        specs: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.15em',
      },
    },
  },
  plugins: [],
};
