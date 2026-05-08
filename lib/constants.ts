// GX Bank Color Palette
export const colors = {
  // Background colors
  background: {
    primary: "#1a0a2e",
    secondary: "#2d1b4e",
    card: "#3d2b5e",
    cardLight: "#4d3b6e",
  },
  // Accent colors
  accent: {
    teal: "#00f5d4",
    tealDark: "#00d4aa",
    pink: "#ff006e",
    pinkDark: "#cc0058",
    gold: "#ffd166",
    purple: "#9d4edd",
  },
  // Text colors
  text: {
    primary: "#ffffff",
    secondary: "#a78bba",
    muted: "#8b7a9e",
  },
  // Status colors
  status: {
    success: "#00f5d4",
    warning: "#ffd166",
    error: "#ff006e",
  },
  // Tank/Water colors
  tank: {
    waterTop: "#1a3a4a",
    waterBottom: "#0d1f2d",
    bubbles: "rgba(0, 245, 212, 0.3)",
  },
} as const;

// Spacing scale
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// Border radius
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

// Font sizes
export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
} as const;

// Tab bar configuration
export const tabBarConfig = {
  height: 80,
  iconSize: 24,
} as const;
