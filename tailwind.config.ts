import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1A3D2B',
          light: '#2D5A3D',
          dark: '#0F2418',
        },
        ivory: {
          DEFAULT: '#FAF7F0',
          dark: '#F0EBE0',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#DFC070',
          dark: '#A8862E',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
