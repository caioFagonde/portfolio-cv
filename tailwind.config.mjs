/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Iowan Old Style', 'Charter', 'serif'],
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'ui-monospace', 'monospace']
      },
      colors: {
        paper: {
          50: '#f7f5ef',
          100: '#f2ecdf',
          200: '#d8c9ae',
          300: '#bda886'
        },
        ink: {
          900: '#191714',
          800: '#2b2924',
          700: '#403c35',
          600: '#575149'
        },
        copper: {
          500: '#b86f3f',
          600: '#965832',
          700: '#704024'
        },
        steel: {
          500: '#4b6470',
          700: '#2f454e'
        },
        olive: {
          500: '#56664f',
          700: '#34402f'
        }
      },
      boxShadow: {
        'quiet': '0 24px 80px rgba(42, 33, 27, 0.10)'
      }
    }
  },
  plugins: []
};
