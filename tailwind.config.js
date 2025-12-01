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
          900: '#0F172A', // Ink (Primary)
        },
        blue: {
          600: '#2563EB', // Electric Blue (Action)
        },
        emerald: {
          600: '#10B981', // Signal Green (Success)
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'levitated': '0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'concave': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
