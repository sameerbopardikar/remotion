// Color palette for PWMOIC explainer
export const COLORS = {
  // Primary brand colors
  primary: "#1E3A5F",
  primaryLight: "#2E5A8F",
  secondary: "#00A86B",
  secondaryLight: "#00C878",
  accent: "#FFB800",
  accentLight: "#FFD54F",

  // Semantic colors
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",

  // Background colors
  bgDark: "#0F172A",
  bgMedium: "#1E293B",
  bgLight: "#334155",

  // Text colors
  textPrimary: "#F8FAFC",
  textSecondary: "#94A3B8",
  textMuted: "#64748B",

  // Chart/visualization colors
  chart1: "#3B82F6",
  chart2: "#10B981",
  chart3: "#F59E0B",
  chart4: "#EF4444",
  chart5: "#8B5CF6",
  chart6: "#EC4899",

  // Stage colors
  stageEarly: "#3B82F6",
  stageCross: "#10B981",
  stageMass: "#F59E0B",
  stagePosition: "#8B5CF6",

  // Outcome colors
  leader: "#10B981",
  challenger: "#3B82F6",
  follower: "#F59E0B",
  niche: "#94A3B8",
  noCross: "#EF4444",
  failure: "#7F1D1D",
} as const;

// Typography
export const FONTS = {
  primary: "SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
  mono: "SF Mono, Monaco, Consolas, monospace",
} as const;

// Animation timings (in frames at 30fps)
export const TIMING = {
  fadeIn: 15,
  fadeOut: 15,
  slideIn: 20,
  stagger: 5,
  hold: 30,
  sceneDuration: 300, // 10 seconds per scene
} as const;

// Video dimensions
export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;
