import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "./shared";

interface ScorecardProps {
  title: string;
  icon: string;
  color: string;
  traits: string[];
  description: string;
  weight: string;
  delay: number;
}

const ScorecardCard: React.FC<ScorecardProps> = ({
  title,
  icon,
  color,
  traits,
  description,
  weight,
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
        border: `2px solid ${color}40`,
        boxShadow: `0 8px 32px ${color}20`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            backgroundColor: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
            fontSize: 28,
          }}
        >
          {icon}
        </div>
        <div>
          <div
            style={{
              fontFamily: FONTS.primary,
              fontSize: 26,
              fontWeight: "bold",
              color: COLORS.textPrimary,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 14,
              color: color,
            }}
          >
            {weight}
          </div>
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          fontFamily: FONTS.primary,
          fontSize: 15,
          color: COLORS.textSecondary,
          marginBottom: 20,
          lineHeight: 1.5,
        }}
      >
        {description}
      </div>

      {/* Traits */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {traits.map((trait, i) => {
          const traitDelay = delay + 30 + i * 8;
          const traitOpacity = interpolate(
            frame,
            [traitDelay, traitDelay + 15],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          const traitSlide = interpolate(
            frame,
            [traitDelay, traitDelay + 15],
            [20, 0],
            { extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                opacity: traitOpacity,
                transform: `translateX(${traitSlide}px)`,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: color,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: FONTS.primary,
                  fontSize: 13,
                  color: COLORS.textSecondary,
                }}
              >
                {trait}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Scorecards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scorecards: Omit<ScorecardProps, "delay">[] = [
    {
      title: "Founder Scorecard",
      icon: "👤",
      color: COLORS.chart1,
      weight: "~45% weight at Early Stage",
      description:
        "Evaluates 11 traits across execution and scaling potential. Internal Fire acts as a multiplier (1.0x-1.2x).",
      traits: [
        "Founder Market Fit",
        "Learning Velocity",
        "Technical Prowess",
        "Capital Efficiency",
        "Distribution Edge",
        "Storytelling & Vision",
        "Internal Fire (multiplier)",
        "Coachability",
        "Execution Evidence",
        "Delegation & Leadership",
        "Talent Philosophy",
      ],
    },
    {
      title: "Company Scorecard",
      icon: "🏢",
      color: COLORS.chart2,
      weight: "Stage-dependent dimensions",
      description:
        "Dimensions change by investment stage. Uses cascade logic: Strong (≥3.5), Adequate (2.5-3.4), Weak (<2.5).",
      traits: [
        "Pre-Seed: Problem & Market, Vision",
        "Seed: Signal Quality, Product & Tech",
        "Series A: PMF Metrics, Unit Economics",
        "ARR Scale & Growth Rate",
        "Net Revenue Retention",
        "Sales Efficiency & CAC Payback",
        "Gross Margin & Burn Multiple",
        "Product Depth & Technical Moat",
        "Competitive Position",
      ],
    },
    {
      title: "Tailwinds Scorecard",
      icon: "💨",
      color: COLORS.chart3,
      weight: "0.8x - 1.5x multiplier",
      description:
        "Generates a scalar multiplier applied to Early Stage probability based on market conditions.",
      traits: [
        "Regulatory/Compliance (40%)",
        "Vertical Tech Shift (30%)",
        "Secular/Behavioral Trends (20%)",
        "Macro/Cyclical Factors (10%)",
      ],
    },
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

  // Combined probability formula
  const formulaDelay = 280;
  const formulaOpacity = interpolate(
    frame,
    [formulaDelay, formulaDelay + 30],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const formulaScale = spring({
    frame: Math.max(0, frame - formulaDelay),
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
          Life Stage Assessments
        </h2>
        <div
          style={{
            fontFamily: FONTS.primary,
            fontSize: 20,
            color: COLORS.textSecondary,
            marginTop: 10,
          }}
        >
          Three scorecards combine to determine transition probabilities
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

      {/* Scorecards */}
      <div
        style={{
          display: "flex",
          gap: 24,
          flex: 1,
        }}
      >
        {scorecards.map((card, index) => (
          <ScorecardCard
            key={card.title}
            {...card}
            delay={50 + index * 50}
          />
        ))}
      </div>

      {/* Combined probability formula */}
      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "center",
          opacity: formulaOpacity,
          transform: `scale(${formulaScale})`,
        }}
      >
        <div
          style={{
            backgroundColor: COLORS.bgLight,
            padding: "20px 40px",
            borderRadius: 16,
            border: `2px solid ${COLORS.accent}`,
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.primary,
              fontSize: 16,
              color: COLORS.textSecondary,
            }}
          >
            Combined:
          </div>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 20,
              color: COLORS.textPrimary,
            }}
          >
            <span style={{ color: COLORS.chart1 }}>Founder</span>
            <span style={{ color: COLORS.textMuted }}> × 45% + </span>
            <span style={{ color: COLORS.chart2 }}>Company</span>
            <span style={{ color: COLORS.textMuted }}> × 35% + </span>
            <span style={{ color: COLORS.chart3 }}>Tailwinds</span>
            <span style={{ color: COLORS.textMuted }}> multiplier</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
