import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "./shared";

interface ThresholdCardProps {
  scenario: string;
  threshold: string;
  description: string;
  color: string;
  icon: string;
  delay: number;
}

const ThresholdCard: React.FC<ThresholdCardProps> = ({
  scenario,
  threshold,
  description,
  color,
  icon,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const adjustedFrame = Math.max(0, frame - delay);

  const scale = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 80, stiffness: 120 },
  });

  const opacity = interpolate(adjustedFrame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        backgroundColor: COLORS.bgMedium,
        borderRadius: 20,
        padding: 28,
        flex: 1,
        opacity,
        transform: `scale(${scale})`,
        border: `3px solid ${color}`,
        boxShadow: `0 8px 32px ${color}40`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <span style={{ fontSize: 32, marginRight: 12 }}>{icon}</span>
        <div
          style={{
            fontFamily: FONTS.primary,
            fontSize: 22,
            fontWeight: "bold",
            color: COLORS.textPrimary,
          }}
        >
          {scenario}
        </div>
      </div>

      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 56,
          fontWeight: "bold",
          color: color,
          marginBottom: 16,
        }}
      >
        {threshold}
      </div>

      <div
        style={{
          fontFamily: FONTS.primary,
          fontSize: 16,
          color: COLORS.textSecondary,
          lineHeight: 1.5,
        }}
      >
        {description}
      </div>
    </div>
  );
};

interface ComponentItemProps {
  name: string;
  description: string;
  delay: number;
  color: string;
}

const ComponentItem: React.FC<ComponentItemProps> = ({
  name,
  description,
  delay,
  color,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);

  const opacity = interpolate(adjustedFrame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const slideX = interpolate(adjustedFrame, [0, 15], [20, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        opacity,
        transform: `translateX(${slideX}px)`,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: color,
          marginTop: 8,
          flexShrink: 0,
        }}
      />
      <div>
        <span
          style={{
            fontFamily: FONTS.primary,
            fontSize: 15,
            fontWeight: "bold",
            color: COLORS.textPrimary,
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: FONTS.primary,
            fontSize: 15,
            color: COLORS.textSecondary,
          }}
        >
          {" "}{description}
        </span>
      </div>
    </div>
  );
};

export const OutputInterpretation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const thresholds: Omit<ThresholdCardProps, "delay">[] = [
    {
      scenario: "Bear Case",
      threshold: "3x",
      description:
        "Downside protection. Even if things go wrong, the investment returns meaningful capital.",
      color: COLORS.chart4,
      icon: "🐻",
    },
    {
      scenario: "US Base",
      threshold: "10x",
      description:
        "Strong expected return with potential to return the fund if the company outperforms.",
      color: COLORS.chart3,
      icon: "🎯",
    },
    {
      scenario: "Global/US Bull",
      threshold: "30x",
      description:
        "At least one scenario should be an expected fund returner.",
      color: COLORS.chart2,
      icon: "🚀",
    },
  ];

  const components = [
    { name: "Stage Factor", description: "— Investment stage uncertainty", color: COLORS.chart1 },
    { name: "Founder Scorecard", description: "— 11 traits → transition probability", color: COLORS.chart2 },
    { name: "Company Scorecard", description: "— Signal/Product/Market cascade", color: COLORS.chart3 },
    { name: "Tailwinds Scorecard", description: "— Market multiplier (0.8x-1.5x)", color: COLORS.chart4 },
    { name: "ARR Adjustment", description: "— Progress-based risk reduction", color: COLORS.chart5 },
    { name: "Input Table", description: "— Position chances, market shares, multiples", color: COLORS.chart6 },
    { name: "TAM", description: "— Core & Full Platform × 3 scenarios", color: COLORS.chart1 },
    { name: "Dilution Path", description: "— Round projections → final ownership", color: COLORS.chart2 },
    { name: "Returns Path", description: "— Exit values → fund-level MOIC", color: COLORS.chart3 },
    { name: "Hurdle Valuations", description: "— Max entry at 30% IRR hurdle", color: COLORS.chart4 },
  ];

  // Title animation
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 80, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.bgDark} 0%, ${COLORS.bgMedium} 100%)`,
        padding: 60,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Section title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          marginBottom: 24,
        }}
      >
        <h2
          style={{
            fontFamily: FONTS.primary,
            fontSize: 52,
            fontWeight: "bold",
            color: COLORS.textPrimary,
            margin: 0,
          }}
        >
          Investment Thresholds
        </h2>
        <div
          style={{
            fontFamily: FONTS.primary,
            fontSize: 20,
            color: COLORS.textSecondary,
            marginTop: 10,
          }}
        >
          PWMOIC outputs for six TAM/scenario combinations
        </div>
        <div
          style={{
            width: 120,
            height: 4,
            backgroundColor: COLORS.accent,
            marginTop: 14,
            borderRadius: 2,
          }}
        />
      </div>

      {/* Thresholds */}
      <div
        style={{
          display: "flex",
          gap: 24,
          marginBottom: 32,
        }}
      >
        {thresholds.map((threshold, index) => (
          <ThresholdCard
            key={threshold.scenario}
            {...threshold}
            delay={50 + index * 40}
          />
        ))}
      </div>

      {/* Model components summary */}
      <div
        style={{
          backgroundColor: COLORS.bgMedium,
          borderRadius: 20,
          padding: 28,
          flex: 1,
          border: `2px solid ${COLORS.primaryLight}40`,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.primary,
            fontSize: 22,
            fontWeight: "bold",
            color: COLORS.accent,
            marginBottom: 20,
          }}
        >
          Model Component Summary
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "8px 48px",
          }}
        >
          {components.map((comp, i) => (
            <ComponentItem
              key={comp.name}
              name={comp.name}
              description={comp.description}
              color={comp.color}
              delay={200 + i * 15}
            />
          ))}
        </div>

        {/* Final formula */}
        <div
          style={{
            marginTop: 24,
            padding: 20,
            backgroundColor: COLORS.bgLight,
            borderRadius: 12,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 24,
              color: COLORS.textPrimary,
            }}
          >
            <span style={{ color: COLORS.secondary }}>Probability Tree</span>
            <span style={{ color: COLORS.textMuted }}> combines all inputs → </span>
            <span style={{ color: COLORS.accent }}>PWMOIC</span>
            <span style={{ color: COLORS.textMuted }}> = </span>
            <span style={{ color: COLORS.chart1 }}>Σ</span>
            <span style={{ color: COLORS.textMuted }}>(</span>
            <span style={{ color: COLORS.chart3 }}>P</span>
            <span style={{ color: COLORS.textMuted }}> × </span>
            <span style={{ color: COLORS.chart2 }}>MOIC</span>
            <span style={{ color: COLORS.textMuted }}>)</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
