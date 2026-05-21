/** @type {import('tailwindcss').Config} */
const mutedColors = {
  slate: {
    50: "#f4f6fb",
    100: "#e8ecf6",
    200: "#d3dced",
    300: "#b5c3df",
    400: "#8da2ca",
    500: "#6f88b8",
    600: "#5a73a2",
    700: "#485d85",
    800: "#35486a",
    900: "#273754",
    950: "#1b263d",
  },
  cyan: {
    50: "#eef4fc",
    100: "#dce8f8",
    200: "#bfd3f1",
    300: "#9cbbe6",
    400: "#7ca4d8",
    500: "#5f8fc9",
    600: "#4b79b2",
    700: "#3d6494",
    800: "#345277",
    900: "#2f4864",
    950: "#1d2f43",
  },
  emerald: {
    50: "#eef6f2",
    100: "#dceee5",
    200: "#bdddcf",
    300: "#9ac9b5",
    400: "#7bb49c",
    500: "#5f9f84",
    600: "#4d856f",
    700: "#416d5d",
    800: "#39584d",
    900: "#32493f",
    950: "#1f2f29",
  },
  rose: {
    50: "#faf2f4",
    100: "#f5e4e8",
    200: "#ebcad3",
    300: "#dda6b5",
    400: "#ca7f94",
    500: "#b7647d",
    600: "#9d4f68",
    700: "#834258",
    800: "#6e3a4c",
    900: "#5d3443",
    950: "#381b29",
  },
};

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./context/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./functions/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: mutedColors,
    },
  },
  plugins: [],
};
