/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['Inter', 'Noto Sans SC', 'PingFang SC', 'system-ui', 'sans-serif'],
        body: ['Inter', 'Noto Sans SC', 'PingFang SC', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#F7F7F4',
          secondary: '#FAFAF7',
          tertiary: '#E6E5E0',
        },
        card: {
          DEFAULT: '#FFFFFF',
          hover: '#FAFAF7',
        },
        text: {
          DEFAULT: '#26251E',
          secondary: '#5A5852',
          tertiary: '#807D72',
          placeholder: '#A09C92',
        },
        border: {
          DEFAULT: '#E6E5E0',
          light: '#EFEEE8',
        },
        divider: '#E6E5E0',
        accent: {
          DEFAULT: '#F54E00',
          bg: '#FFE5D6',
        },
        success: {
          DEFAULT: '#1F8A65',
          bg: '#DCEEDF',
        },
        danger: {
          DEFAULT: '#CF2D56',
          bg: '#F8D7E0',
        },
        warning: {
          DEFAULT: '#C08532',
          bg: '#F7E7C8',
        },
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '12px',
      },
      lineHeight: {
        tight: '1.3',
        normal: '1.6',
        loose: '1.8',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
