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
        lightBeige: "#FEFAF0",
        satYellow: "#F7CE8B",
        accBlack: "#050503",
        satRed: {
          DEFAULT: "#B3414C",
          hover: "#aa555e",
        },
      },
    },
  },
  plugins: [],
};
export default config;
