/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#F8FAFC',  // Surface
          100: '#F1F5F9', // Ceramic
          200: '#E2E8F0',
          300: '#CBD5E1',
          500: '#64748B',
          700: '#334155',
          900: '#0F172A', // Ink (Primary)
        },
        blue: {
          100: '#DBEAFE',
          600: '#2563EB', // Electric Blue (Action)
        },
        amber: {
            50: '#FFFBEB',
            100: '#FEF3C7',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
        },
        emerald: {
          500: '#10B981', // Signal Green (Success)
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        // Updated shadows for "Machined Neumorphism"
        'levitated': '0_8px_30px_rgb(0,0,0,0.04)',
        'mechanical': '0_4px_14px_0_rgba(0,0,0,0.39)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'ceramic': '0_2px_8px_rgba(0,0,0,0.04)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
