import light from "./public/theme/light";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Georgia", "serif"],
      },
      colors: {
        ...light,
      },
      boxShadow: {
        level0: light.elevation.level0,
        level1: `0 1px 2px 0 ${light.elevation.level1}`,
        level2: `0 2px 5px 0 ${light.elevation.level2}`,
        level3: `0 3px 6px 0 ${light.elevation.level3}`,
        level4: `0 4px 8px 0 ${light.elevation.level4}`,
        level5: `0 5px 10px 0 ${light.elevation.level5}`,
      },
    },
  },
  plugins: [],
};
