// ============================================================
// CHEMVISION — Design System Theme Tokens
// ============================================================

export const theme = {
  colors: {
    primary: {
      50: "#EFF6FF",
      100: "#DBEAFE",
      200: "#BFDBFE",
      300: "#93C5FD",
      400: "#60A5FA",
      500: "#3B82F6",
      600: "#2563EB",
      700: "#1D4ED8",
      800: "#1E40AF",
      900: "#1E3A8A",
    },
    secondary: {
      50: "#F0FDFA",
      100: "#CCFBF1",
      200: "#99F6E4",
      300: "#5EEAD4",
      400: "#2DD4BF",
      500: "#14B8A6",
      600: "#0D9488",
      700: "#0F766E",
      800: "#115E59",
      900: "#134E4A",
    },
    accent: {
      50: "#FFF7ED",
      100: "#FFEDD5",
      200: "#FED7AA",
      300: "#FDBA74",
      400: "#FB923C",
      500: "#F97316",
      600: "#EA580C",
      700: "#C2410C",
      800: "#9A3412",
      900: "#7C2D12",
    },
  },
  spacing: {
    sidebar: "280px",
    sidebarCollapsed: "72px",
    navbar: "64px",
    contentMaxWidth: "1400px",
    pagePadding: "24px",
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },
  shadow: {
    card: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    elevated:
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    glass: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
  },
  glass: {
    light: "bg-white/70 backdrop-blur-xl border border-white/20",
    dark: "bg-slate-900/70 backdrop-blur-xl border border-slate-700/30",
  },
  animation: {
    spring: { type: "spring", stiffness: 300, damping: 30 },
    smooth: { type: "spring", stiffness: 200, damping: 25 },
    gentle: { type: "spring", stiffness: 100, damping: 20 },
    bounce: { type: "spring", stiffness: 400, damping: 10 },
  },
} as const;
