import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "./shared";

interface FormulaItemProps {
  index: number;
  label: string;
  formula: string;
  description: string;
  color: string;
  delay: number;
}

const FormulaItem: React.FC<FormulaItemProps> = ({
  index,
  label,
  formula,
  description,
  color,
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

  const slideX = interpolate(
    spring({ frame: adjustedFrame, fps, config: { damping: 80 } }),
    [0, 1],
    [-50, 0]
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 20,
        opacity,
        transform: `translateX(${slideX}px) scale(${scale})`,
        marginBottom: 20,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONTS.primary,
          fontSize: 20,
          fontWeight: "bold",
          color: COLORS.textPrimary,
          flexShrink: 0,
        }}
      >
        {index}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: FONTS.primary,
            fontSize: 22,
            fontWeight: "bold",
            color: COLORS.textPrimary,
            marginBottom: 8,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 20,
            color: color,
            backgroundColor: COLORS.bgLight,
            padding: "12px 16px",
            borderRadius: 8,
            marginBottom: 8,
            display: "inline-block",
          }}
        >
          {formula}
        </div>
        <div
          style={{
            fontFamily: FONTS.primary,
            fontSize: 16,
            color: COLORS.textSecondary,
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export const Formula: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const formulas = [
    {
      label: "Probability",
      formula: "P(i) = Π(transition probabilities)",
      description: "Product of all transition probabilities along the path to outcome i",
      color: COLORS.chart3,
    },
    {
      label: "Revenue",
      formula: "Revenue(i) = TAM × Market Share(i)",
      description: "Total addressable market multiplied by expected market capture",
      color: COLORS.chart1,
    },
    {
      label: "Exit Value",
      formula: "Exit Value(i) = Revenue(i) × Exit Multiple",
      description: "Revenue at exit multiplied by ARR multiple (10x-20x)",
      color: COLORS.chart2,
    },
    {
      label: "MOIC",
      formula: "MOIC(i) = Exit Value(i) × Ownership / Investment",
      description: "Multiple on invested capital for each outcome",
      color: COLORS.chart4,
    },
    {
      label: "PWMOIC",
      formula: "PWMOIC(i) = P(i) × MOIC(i)",
      description: "Probability-weighted return for each terminal outcome",
      color: COLORS.chart5,
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

  // Final formula animation
  const finalFormulaDelay = 240;
  const finalOpacity = interpolate(frame, [finalFormulaDelay, finalFormulaDelay + 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const finalScale = spring({
    frame: Math.max(0, frame - finalFormulaDelay),
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
          marginBottom: 40,
        }}
      >
        <h2
          style={{
            fontFamily: FONTS.primary,
            fontSize: 64,
            fontWeight: "bold",
            color: COLORS.textPrimary,
            margin: 0,
          }}
        >
          Core Formula
        </h2>
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

      {/* Formula breakdown */}
      <div
        style={{
          display: "flex",
          gap: 60,
          flex: 1,
        }}
      >
        {/* Left side - formulas */}
        <div style={{ flex: 1 }}>
          {formulas.map((item, index) => (
            <FormulaItem
              key={index}
              index={index + 1}
              label={item.label}
              formula={item.formula}
              description={item.description}
              color={item.color}
              delay={40 + index * 35}
            />
          ))}
        </div>

        {/* Right side - final aggregation */}
        <div
          style={{
            width: 500,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              opacity: finalOpacity,
              transform: `scale(${finalScale})`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: FONTS.primary,
                fontSize: 24,
                color: COLORS.textSecondary,
                marginBottom: 20,
              }}
            >
              Total Expected Return
            </div>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 36,
                color: COLORS.textPrimary,
                backgroundColor: COLORS.bgLight,
                padding: "32px 48px",
                borderRadius: 16,
                border: `3px solid ${COLORS.secondary}`,
                boxShadow: `0 8px 32px ${COLORS.secondary}40`,
              }}
            >
              <span style={{ color: COLORS.secondary, fontWeight: "bold" }}>
                PWMOIC
              </span>
              {" = "}
              <span style={{ color: COLORS.chart1 }}>{"Σ"}</span>
              <span style={{ color: COLORS.chart5 }}> PWMOIC(i)</span>
            </div>
            <div
              style={{
                fontFamily: FONTS.primary,
                fontSize: 18,
                color: COLORS.textMuted,
                marginTop: 20,
                maxWidth: 400,
              }}
            >
              Sum across all terminal outcomes in the probability tree
            </div>

            {/* Visual diagram */}
            <div
              style={{
                marginTop: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
              }}
            >
              {["P1×M1", "P2×M2", "P3×M3", "...", "Pn×Mn"].map((item, i) => {
                const itemDelay = finalFormulaDelay + 40 + i * 10;
                const itemOpacity = interpolate(
                  frame,
                  [itemDelay, itemDelay + 15],
                  [0, 1],
                  { extrapolateRight: "clamp" }
                );
                return (
                  <React.Fragment key={i}>
                    {i > 0 && (
                      <span
                        style={{
                          fontFamily: FONTS.mono,
                          fontSize: 24,
                          color: COLORS.textMuted,
                          opacity: itemOpacity,
                        }}
                      >
                        +
                      </span>
                    )}
                    <div
                      style={{
                        fontFamily: FONTS.mono,
                        fontSize: 18,
                        color: COLORS.textSecondary,
                        backgroundColor: COLORS.bgMedium,
                        padding: "8px 12px",
                        borderRadius: 6,
                        opacity: itemOpacity,
                      }}
                    >
                      {item}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
