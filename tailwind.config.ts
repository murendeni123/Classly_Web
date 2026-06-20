import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        classly: {
          blue: '#1E88E5',
          cyan: '#2BB0F0',
          deep: '#1565C0',
          green: '#6FBF3B',
          'green-deep': '#54A025',
          navy: '#16245C',
          yellow: '#FFC83D',
          orange: '#F5A623',
        },
        ink: '#334155',
        muted: '#64748B',
        line: '#E2E8F0',
        offwhite: '#F5F9FC',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(22, 36, 92, 0.18)',
        lift: '0 24px 48px -18px rgba(22, 36, 92, 0.28)',
      },
      backgroundImage: {
        'classly-dark':
          'linear-gradient(135deg, #16245C 0%, #1565C0 55%, #1E88E5 100%)',
        'classly-wordmark':
          'linear-gradient(90deg, #2BB0F0 0%, #1565C0 100%)',
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
