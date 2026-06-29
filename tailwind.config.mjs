/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Fraunces', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'ui-monospace', 'monospace']
      },
      colors: {
        paper: {
          50: '#fffaf0',
          100: '#f7eddc',
          200: '#ead8bd',
          300: '#d6bc95'
        },
        ink: {
          900: '#1a1410',
          800: '#2a211b',
          700: '#403329',
          600: '#5d4c3f'
        },
        copper: {
          500: '#b86f3f',
          600: '#965832',
          700: '#704024'
        }
      },
      boxShadow: {
        'quiet': '0 24px 80px rgba(42, 33, 27, 0.10)'
      }
    }
  },
  plugins: []
};
