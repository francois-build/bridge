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
        surface: '#F0F2F5', // Slightly cooler grey for that "Tech" feel. CRITICAL for highlights.
        'surface-raised': '#FFFFFF', // white (Cards)
        action: '#2563EB', // blue-600 (Buttons/Links)
        success: '#10B981', // emerald-600 (Badges)
        warning: '#D97706', // amber-600 (Alerts)
      },
      boxShadow: {
        // Machined Aesthetics: Sharper, more defined lighting
        'levitated': '6px 6px 12px #ced1d6, -6px -6px 12px #ffffff',
        'mechanical': '3px 3px 6px #ced1d6, -3px -3px 6px #ffffff',
        'concave': 'inset 3px 3px 6px #ced1d6, inset -3px -3px 6px #ffffff',
        'pressed': 'inset 2px 2px 5px #ced1d6, inset -2px -2px 5px #ffffff',
      },
      backgroundImage: {
        'machined-gradient': 'linear-gradient(145deg, #ffffff, #e6e6e6)',
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