/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: '#0F172A', // slate-900 (Trust/Ink)
        'primary-muted': '#64748B', // slate-500
        surface: '#F1F5F9', // slate-100 (Canvas)
        'surface-raised': '#FFFFFF', // white (Cards)
        action: '#2563EB', // blue-600 (Buttons/Links)
        success: '#10B981', // emerald-600 (Badges)
        warning: '#D97706', // amber-600 (Alerts)
      },
      boxShadow: {
        mechanical: '5px 5px 10px #a3a3a3, -5px -5px 10px #ffffff',
        levitated: '10px 10px 20px #a3a3a3, -10px -10px 20px #ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
