import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        amp: {
          bg: '#09090d',
          text: '#f0ede8',
          orange: '#f06030',
          pink: '#f03d78',
          purple: '#b840b8',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}

export default config
