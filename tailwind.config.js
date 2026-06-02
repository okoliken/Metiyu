/** @type {import('tailwindcss').Config} */

// Map a CSS custom property to an rgb() value that supports Tailwind's
// <alpha-value> opacity modifiers (e.g. bg-primary/50). Tokens are defined in
// global.css :root and mirrored for JS in src/theme/colors.ts.
const token = (name) => `rgb(var(${name}) / <alpha-value>)`;

module.exports = {
  // NOTE: Update this to include the paths to all files that contain NativeWind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        neutral: {
          0: token("--color-neutral-0"),
          100: token("--color-neutral-100"),
          400: token("--color-neutral-400"),
          500: token("--color-neutral-500"),
          600: token("--color-neutral-600"),
          700: token("--color-neutral-700"),
          800: token("--color-neutral-800"),
          900: token("--color-neutral-900"),
          950: token("--color-neutral-950"),
        },
        primary: {
          DEFAULT: token("--color-primary"),
          500: token("--color-primary"),
        },
        yellow: {
          DEFAULT: token("--color-yellow"),
          500: token("--color-yellow"),
        },
        red: {
          DEFAULT: token("--color-red"),
          500: token("--color-red"),
        },
        overlay: token("--color-overlay"),
      },
    },
  },
  plugins: [],
};
