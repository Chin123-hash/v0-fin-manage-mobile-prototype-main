/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // GX Bank Dark Theme Palette mapped to your Tailwind classes
        background: {
          DEFAULT: "#1a0a2e",      // bg-background
          secondary: "#2d1b4e",    // bg-background-secondary
          card: "#3d2b5e",         // bg-background-card
          light: "#4d3b6e",
        },
        foreground: {
          DEFAULT: "#ffffff",      // text-foreground
          secondary: "#a78bba",    // text-foreground-secondary
          muted: "#8b7a9e",        // text-foreground-muted
        },
        accent: {
          DEFAULT: "#00f5d4",      // bg-accent / text-accent (Teal)
          dark: "#00d4aa",
          pink: "#ff006e",
          gold: "#ffd166",
          purple: "#9d4edd",
        },
        status: {
          success: "#00f5d4",
          warning: "#ffd166",
          error: "#ff006e",
        }
      },
    },
  },
  plugins: [],
};