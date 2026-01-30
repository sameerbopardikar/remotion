import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "./shared";

interface StageCardProps {
  stage: string;
  factor: number;
  description: string;
  color: string;
  delay: number;
  index: number;
}

const StageCard: React.FC<StageCardProps> = ({
  stage,
  factor,
  description,
  color,
  delay,
  index,
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

  const barProgress = spring({
    frame: Math.max(0, adjustedFrame - 15),
    fps,
    config: { damping: 50, stiffness: 80 },
    from: 0,
    to: factor,
  });

  return (
    <div
      style={{
        backgroundColor: COLORS.bgMedium,
        borderRadius: 20,
        padding: 32,
        flex: 1,
        opacity,
        transform: `scale(${scale})`,
        border: `2px solid ${color}40`,
        boxShadow: `0 8px 32px ${color}20`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 12,
            backgroundColor: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.primary,
              fontSize: 24,
              fontWeight: "bold",
              color: COLORS.textPrimary,
            }}
          >
            {index}
          </span>
        </div>
        <div>
          <div
            style={{
              fontFamily: FONTS.primary,
              fontSize: 28,
              fontWeight: "bold",
              color: COLORS.textPrimary,
            }}
          >
            {stage}
          </div>
        </div>
      </div>

      {/* Factor display */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          marginBottom: 20,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 64,
            fontWeight: "bold",
            color: color,
          }}
        >
          {(barProgress * 100).toFixed(1)}%
        </span>
        <span
          style={{
            fontFamily: FONTS.primary,
            fontSize: 18,
            color: COLORS.textMuted,
            marginLeft: 8,
          }}
        >
          stage factor
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: 16,
          backgroundColor: COLORS.bgLight,
          borderRadius: 8,
          overflow: "hidden",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: `${barProgress * 100}%`,
            height: "100%",
            backgroundColor: color,
            borderRadius: 8,
          }}
        />
      </div>

      {/* Description */}
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

export const StageFactor: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stages = [
    {
      stage: "Pre-Seed",
      factor: 0.625,
      description:
        "Highest uncertainty. Evaluations based on ideas, vision, and founder potential. Limited concrete evidence.",
      color: COLORS.chart4,
    },
    {
      stage: "Seed",
      factor: 0.8125,
      description:
        "Early traction signals available but limited data. Some validation of product-market fit hypothesis.",
      color: COLORS.chart3,
    },
    {
      stage: "Series A",
      factor: 1.0,
      description:
        "Real metrics, customer evidence, and demonstrated execution. Full confidence in assessment.",
      color: COLORS.chart2,
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

  // Explanation animation
  const explanationDelay = 200;
  const explanationOpacity = interpolate(
    frame,
    [explanationDelay, explanationDelay + 30],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  // Formula animation
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
        background: `linear-gradient(135deg, ${COLORS.bgDark} 0%, ${COLORS.bgMedium} 100%)`,
        padding: 80,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Section title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          marginBottom: 20,
        }}
      >
        <h2
          style={{
            fontFamily: FONTS.primary,
            fontSize: 56,
            fontWeight: "bold",
            color: COLORS.textPrimary,
            margin: 0,
          }}
        >
          Stage Factor Adjustment
        </h2>
        <div
          style={{
            fontFamily: FONTS.primary,
            fontSize: 22,
            color: COLORS.textSecondary,
            marginTop: 12,
          }}
        >
          Scaling probabilities based on investment timing uncertainty
        </div>
        <div
          style={{
            width: 120,
            height: 4,
            backgroundColor: COLORS.accent,
            marginTop: 16,
            borderRadius: 2,
          }}
        />
      </div>

      {/* Stage cards */}
      <div
        style={{
          display: "flex",
          gap: 32,
          flex: 1,
          alignItems: "stretch",
        }}
      >
        {stages.map((item, index) => (
          <StageCard
            key={item.stage}
            stage={item.stage}
            factor={item.factor}
            description={item.description}
            color={item.color}
            delay={60 + index * 40}
            index={index + 1}
          />
        ))}
      </div>

      {/* Bottom explanation */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginTop: 40,
        }}
      >
        {/* Key insight */}
        <div
          style={{
            flex: 1,
            opacity: explanationOpacity,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.primary,
              fontSize: 20,
              fontWeight: "bold",
              color: COLORS.accent,
              marginBottom: 12,
            }}
          >
            Key Insight
          </div>
          <div
            style={{
              fontFamily: FONTS.primary,
              fontSize: 18,
              color: COLORS.textSecondary,
              lineHeight: 1.6,
            }}
          >
            At earlier stages, there is less concrete evidence to validate
            scorecard assessments. The stage factor discounts expected returns
            for additional execution risk and assessment uncertainty.
          </div>
        </div>

        {/* Formula */}
        <div
          style={{
            opacity: formulaOpacity,
            transform: `scale(${formulaScale})`,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 24,
              color: COLORS.textPrimary,
              backgroundColor: COLORS.bgLight,
              padding: "20px 32px",
              borderRadius: 12,
              border: `2px solid ${COLORS.secondary}`,
            }}
          >
            <span style={{ color: COLORS.textSecondary }}>Adjusted P</span>
            <span style={{ color: COLORS.textMuted }}>(Early)</span>
            {" = "}
            <span style={{ color: COLORS.chart3 }}>Stage Factor</span>
            {" × "}
            <span style={{ color: COLORS.chart1 }}>P</span>
            <span style={{ color: COLORS.textMuted }}>(Early)</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
