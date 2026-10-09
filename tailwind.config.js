/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fafaf9',
          100: '#f4f4f3',
          200: '#eae9e7',
          300: '#dcdad6',
          400: '#c6c3c0',
          500: '#a8a29e',
        },
        charcoal: {
          DEFAULT: '#1c1917',
          50: '#292524',
          100: '#1c1917',
          200: '#141210',
          900: '#0a0908',
        },
        hype: {
          purple: '#aa94ff',
          'purple-light': '#aa94ff22',
          amber: '#ffa952',
          'amber-light': '#ffa95222',
          pink: '#ffa8f2',
          'pink-light': '#ffa8f222',
          blue: '#19b4ff',
          'blue-light': '#19b4ff22',
          mint: '#9ef483',
          'mint-light': '#9ef48322',
          royal: '#2d7afe',
          muted: '#78716c',
          textMuted: '#8a8f98',
        },
        nutz: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
          brand: '#1c1917',
          accent: '#aa94ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        script: ['Sacramento', 'cursive'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'marquee-fast': 'marquee 20s linear infinite',
        'marquee-slow': 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
