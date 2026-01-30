import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "./shared";

export const Summary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Background animation
  const gradientAngle = interpolate(frame, [0, durationInFrames], [0, 360]);

  // Title animation
  const titleOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 60, stiffness: 80 },
  });

  // Key points
  const keyPoints = [
    {
      icon: "🎯",
      title: "Probability-Weighted Returns",
      description: "PWMOIC = Σ(Probability × MOIC) across all outcomes",
    },
    {
      icon: "🌳",
      title: "Four-Stage Tree Structure",
      description: "Early → Cross Chasm → Mass Market → Position",
    },
    {
      icon: "📊",
      title: "Three Scorecards",
      description: "Founder + Company + Tailwinds = Transition Probabilities",
    },
    {
      icon: "📈",
      title: "Progress Adjustments",
      description: "ARR progress reduces perceived execution risk",
    },
    {
      icon: "💰",
      title: "Investment Thresholds",
      description: "Bear 3x | US Base 10x | Bull/Global 30x",
    },
  ];

  // Final tagline
  const taglineDelay = 280;
  const taglineOpacity = interpolate(
    frame,
    [taglineDelay, taglineDelay + 40],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const taglineScale = spring({
    frame: Math.max(0, frame - taglineDelay),
    fps,
    config: { damping: 60, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientAngle}deg, ${COLORS.bgDark}, ${COLORS.primary}20, ${COLORS.bgDark})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
      }}
    >
      {/* Animated background elements */}
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
        {Array.from({ length: 15 }).map((_, i) => {
          const x = (i * 137.5) % 100;
          const y = (i * 61.8) % 100;
          const size = 200 + (i % 3) * 100;
          const rotation = (frame + i * 30) / 3;
          const particleOpacity = 0.03;

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
                border: `2px solid ${COLORS.accent}`,
                opacity: particleOpacity,
                transform: `rotate(${rotation}deg)`,
              }}
            />
          );
        })}
      </div>

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          marginBottom: 60,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: FONTS.primary,
            fontSize: 72,
            fontWeight: "bold",
            color: COLORS.textPrimary,
            margin: 0,
            letterSpacing: 4,
          }}
        >
          PWMOIC
        </h1>
        <div
          style={{
            fontFamily: FONTS.primary,
            fontSize: 28,
            color: COLORS.textSecondary,
            marginTop: 12,
          }}
        >
          Framework Summary
        </div>
      </div>

      {/* Key points */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 24,
          maxWidth: 1200,
        }}
      >
        {keyPoints.map((point, i) => {
          const pointDelay = 60 + i * 30;
          const pointOpacity = interpolate(
            frame,
            [pointDelay, pointDelay + 25],
            [0, 1],
            { extrapolateRight: "clamp" }
          );

          const pointScale = spring({
            frame: Math.max(0, frame - pointDelay),
            fps,
            config: { damping: 80, stiffness: 120 },
          });

          return (
            <div
              key={i}
              style={{
                backgroundColor: COLORS.bgMedium,
                borderRadius: 16,
                padding: 24,
                width: 340,
                opacity: pointOpacity,
                transform: `scale(${pointScale})`,
                border: `2px solid ${COLORS.primaryLight}40`,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: 28, marginRight: 12 }}>
                  {point.icon}
                </span>
                <span
                  style={{
                    fontFamily: FONTS.primary,
                    fontSize: 18,
                    fontWeight: "bold",
                    color: COLORS.textPrimary,
                  }}
                >
                  {point.title}
                </span>
              </div>
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 14,
                  color: COLORS.textSecondary,
                }}
              >
                {point.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Final tagline */}
      <div
        style={{
          marginTop: 60,
          opacity: taglineOpacity,
          transform: `scale(${taglineScale})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.primary,
            fontSize: 32,
            color: COLORS.accent,
            fontWeight: "bold",
          }}
        >
          Data-Driven Venture Analysis
        </div>
        <div
          style={{
            fontFamily: FONTS.primary,
            fontSize: 20,
            color: COLORS.textMuted,
            marginTop: 12,
          }}
        >
          Modeling startup success through probability-weighted outcomes
        </div>
      </div>
    </AbsoluteFill>
  );
};
