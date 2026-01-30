import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  COLORS,
  FONTS,
  FadeIn,
} from "./shared";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Background gradient animation
  const gradientProgress = interpolate(frame, [0, durationInFrames], [0, 360]);

  // Title animation
  const titleScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 80, stiffness: 100 },
  });

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtitle animation
  const subtitleOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Acronym breakdown animation
  const acronymStart = 120;
  const acronymItems = [
    { letter: "P", word: "Probability", delay: 0 },
    { letter: "W", word: "Weighted", delay: 15 },
    { letter: "M", word: "Multiple on", delay: 30 },
    { letter: "O", word: "", delay: 0 },
    { letter: "I", word: "Invested", delay: 45 },
    { letter: "C", word: "Capital", delay: 60 },
  ];

  // Formula reveal
  const formulaOpacity = interpolate(frame, [220, 250], [0, 1], {
    extrapolateRight: "clamp",
  });

  const formulaScale = spring({
    frame: frame - 220,
    fps,
    config: { damping: 80, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientProgress}deg, ${COLORS.bgDark}, ${COLORS.bgMedium}, ${COLORS.bgDark})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Animated background particles */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 20 }).map((_, i) => {
          const x = (i * 137.5) % 100;
          const y = (i * 61.8) % 100;
          const size = 4 + (i % 3) * 2;
          const animOffset = i * 20;
          const particleOpacity = interpolate(
            (frame + animOffset) % 120,
            [0, 60, 120],
            [0, 0.3, 0]
          );
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: COLORS.accent,
                opacity: particleOpacity,
              }}
            />
          );
        })}
      </div>

      {/* Main title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          marginBottom: 20,
        }}
      >
        <h1
          style={{
            fontFamily: FONTS.primary,
            fontSize: 120,
            fontWeight: "bold",
            color: COLORS.textPrimary,
            letterSpacing: 8,
            margin: 0,
            textShadow: `0 4px 24px ${COLORS.primary}80`,
          }}
        >
          PWMOIC
        </h1>
      </div>

      {/* Acronym breakdown */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginBottom: 40,
          opacity: subtitleOpacity,
        }}
      >
        {acronymItems.map(({ letter, word, delay }, index) => {
          const itemFrame = frame - acronymStart - delay;
          const itemOpacity = interpolate(itemFrame, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const itemScale = spring({
            frame: Math.max(0, itemFrame),
            fps,
            config: { damping: 100 },
          });

          if (letter === "O") return null; // Skip the "on" part

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: itemOpacity,
                transform: `scale(${itemScale})`,
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.primary,
                  fontSize: 48,
                  fontWeight: "bold",
                  color: COLORS.accent,
                }}
              >
                {letter}
              </span>
              <span
                style={{
                  fontFamily: FONTS.primary,
                  fontSize: 18,
                  color: COLORS.textSecondary,
                }}
              >
                {word}
              </span>
            </div>
          );
        })}
      </div>

      {/* Core formula */}
      <div
        style={{
          opacity: formulaOpacity,
          transform: `scale(${formulaScale})`,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 42,
            color: COLORS.textPrimary,
            backgroundColor: COLORS.bgLight,
            padding: "24px 48px",
            borderRadius: 16,
            border: `3px solid ${COLORS.accent}`,
            boxShadow: `0 8px 32px ${COLORS.accent}40`,
          }}
        >
          <span style={{ color: COLORS.secondary }}>PWMOIC</span>
          {" = "}
          <span style={{ color: COLORS.chart1 }}>{"Σ"}</span>
          {"("}
          <span style={{ color: COLORS.chart3 }}>Probability</span>
          {" × "}
          <span style={{ color: COLORS.chart2 }}>MOIC</span>
          {")"}
        </div>
      </div>

      {/* Tagline */}
      <FadeIn delay={280}>
        <div
          style={{
            fontFamily: FONTS.primary,
            fontSize: 28,
            color: COLORS.textSecondary,
            marginTop: 60,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          A framework for modeling venture investment returns
          <br />
          through probability-weighted outcome analysis
        </div>
      </FadeIn>
    </AbsoluteFill>
  );
};
