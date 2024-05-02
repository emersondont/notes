import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Inter': ['Inter', 'sans-serif']
      },
      colors: {
        background: "#242b42",
        text: "#626f96",
        text2: "#fff8dc",
        primary: "#1a2036",
        secondary: "#2e3650"
      }
    },
  },
  plugins: [],
};
export default config;
