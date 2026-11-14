import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          950: "#060708",
          900: "#0c0e12",
          850: "#12151b",
          800: "#181d24",
          700: "#242a34",
          600: "#363e4c",
          500: "#4f596b",
          400: "#7c8799",
          300: "#b2bcc9",
          200: "#d9e0e8",
          100: "#f0f4f8",
        },
        gold: {
          50: "#fbf8ec",
          100: "#f4edcd",
          200: "#ead89a",
          300: "#dfc064",
          400: "#d6ad3d",
          500: "#d4af37", // classic metallic gold
          600: "#b58d27",
          700: "#916b20",
          800: "#76551f",
          900: "#64461e",
          950: "#3a250d",
        },
        crimson: {
          800: "#7f1d1d",
          900: "#500724",
          950: "#2a0413",
        }
      },
      fontFamily: {
        serif: ["Cinzel", "Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.35)',
        'gold-sm': '0 0 10px -2px rgba(212, 175, 55, 0.25)',
        'card-dark': '0 8px 30px -4px rgba(0, 0, 0, 0.8)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'smoke': 'smoke 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        smoke: {
          '0%': { opacity: '0.2', transform: 'translateY(0) scale(1)' },
          '50%': { opacity: '0.8', transform: 'translateY(-15px) scale(1.1)' },
          '100%': { opacity: '0.2', transform: 'translateY(-30px) scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
