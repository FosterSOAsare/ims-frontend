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
        primary: "var(--primary)",
        sec: "var(--sec)",
        gray: {
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          400: "var(--gray-400)",
          300: 'var(--gray-300)',
          500: "var(--gray-500)",
          700: "var(--gray-700)",
        },
        warning: {
          50: "var(--warning-50)",
          100: "var(--warning-100)",
          300: "var(--warning-300)",
          500: "var(--warning-500)",
          600: "var(--warning-600)",
          700: "var(--warning-700)",
        },
        error: {
          50: "var(--error-50)",
          500: "var(--error-500)",
        },
        success: {
          300: "var(--success-300)",
        },
        blue: {
          100: "var(--blue-100)",
        },
        bg: 'var(--bg)'
      },
      fontFamily: {
        satoshi: ["'Satoshi', sans-serif"]
      }
    },
  },
  plugins: [],
};
export default config;
