/**
 * JS-readable color tokens — mirror the CSS variables in global.css and the
 * Tailwind palette in tailwind.config.js (source: Figma).
 *
 * Use these only for imperative React Native APIs that don't accept a
 * `className` (e.g. tab bar tint, StatusBar, vector-icon `color` props).
 * For everything else, prefer NativeWind classes like `bg-neutral-900`.
 */
export const colors = {
  neutral: {
    0: "#FDFDFD",
    100: "#D9D9D9",
    400: "#747577",
    500: "#535557",
    600: "#444444",
    700: "#383838",
    800: "#282828",
    900: "#222222",
    950: "#1A1A1A",
  },
  primary: "#DFE41C",
  yellow: "#F6910A",
  red: "#ED5E5C",
  overlay: "rgba(0, 0, 0, 0.65)",
} as const;

export type Colors = typeof colors;
