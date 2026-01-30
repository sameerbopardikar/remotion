import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "./shared";

export const ARRAdjustment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 80, stiffness: 100 },
  });

  // Example values for animation
  const exampleDelay = 80;
  const currentARR = 1.0; // $1M
  const targetARR = 4.0; // $4M
  const baseProb = 0.57;

  // Animated progress
  const exampleProgress = interpolate(
    frame,
    [exampleDelay, exampleDelay + 60],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const stageCompletion = currentARR / targetARR;
  const riskGap = 1 - baseProb;
  const riskEliminated = stageCompletion * riskGap;
  const adjustedProb = baseProb + riskEliminated;

  // Animated values
  const animatedRiskElim = exampleProgress * riskEliminated;
  const animatedAdjusted = baseProb + animatedRiskElim;

  // Steps animation
  const steps = [
    {
      number: 1,
      label: "Stage Completion %",
      formula: "Current ARR / Target ARR",
      value: `$${currentARR}M / $${targetARR}M = ${(stageCompletion * 100).toFixed(0)}%`,
      delay: 100,
    },
    {
      number: 2,
      label: "Risk Gap",
      formula: "1 - Baseline Probability",
      value: `1 - ${(baseProb * 100).toFixed(0)}% = ${(riskGap * 100).toFixed(0)}%`,
      delay: 150,
    },
    {
      number: 3,
      label: "Risk Eliminated",
      formula: "Completion % × Risk Gap",
      value: `${(stageCompletion * 100).toFixed(0)}% × ${(riskGap * 100).toFixed(0)}% = ${(riskEliminated * 100).toFixed(2)}%`,
      delay: 200,
    },
    {
      number: 4,
      label: "Adjusted Probability",
      formula: "Baseline + Risk Eliminated",
      value: `${(baseProb * 100).toFixed(0)}% + ${(riskEliminated * 100).toFixed(2)}% = ${(adjustedProb * 100).toFixed(2)}%`,
      delay: 250,
    },
  ];

  // Progress bar animation
  const barDelay = 300;
  const barProgress = spring({
    frame: Math.max(0, frame - barDelay),
    fps,
    config: { damping: 50, stiffness: 60 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.bgDark} 0%, ${COLORS.bgMedium} 100%)`,
        padding: 70,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Section title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          marginBottom: 30,
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
          ARR Progress Adjustment
        </h2>
        <div
          style={{
            fontFamily: FONTS.primary,
            fontSize: 20,
            color: COLORS.textSecondary,
            marginTop: 10,
          }}
        >
          Companies with demonstrated progress carry less risk
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

      <div
        style={{
          display: "flex",
          gap: 60,
          flex: 1,
        }}
      >
        {/* Left side - Steps */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: FONTS.primary,
              fontSize: 22,
              fontWeight: "bold",
              color: COLORS.accent,
              marginBottom: 24,
            }}
          >
            Adjustment Mechanics
          </div>

          {steps.map((step, i) => {
            const stepOpacity = interpolate(
              frame,
              [step.delay, step.delay + 25],
              [0, 1],
              { extrapolateRight: "clamp" }
            );
            const stepSlide = interpolate(
              frame,
              [step.delay, step.delay + 25],
              [30, 0],
              { extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  marginBottom: 24,
                  opacity: stepOpacity,
                  transform: `translateX(${stepSlide}px)`,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: COLORS.secondary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONTS.primary,
                    fontSize: 18,
                    fontWeight: "bold",
                    color: COLORS.textPrimary,
                    flexShrink: 0,
                  }}
                >
                  {step.number}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: FONTS.primary,
                      fontSize: 18,
                      fontWeight: "bold",
                      color: COLORS.textPrimary,
                      marginBottom: 4,
                    }}
                  >
                    {step.label}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 14,
                      color: COLORS.textMuted,
                      marginBottom: 6,
                    }}
                  >
                    {step.formula}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 16,
                      color: COLORS.chart2,
                      backgroundColor: COLORS.bgLight,
                      padding: "8px 14px",
                      borderRadius: 8,
                      display: "inline-block",
                    }}
                  >
                    {step.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right side - Visualization */}
        <div
          style={{
            width: 600,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Example box */}
          <div
            style={{
              backgroundColor: COLORS.bgMedium,
              borderRadius: 20,
              padding: 32,
              border: `2px solid ${COLORS.secondary}40`,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.primary,
                fontSize: 20,
                fontWeight: "bold",
                color: COLORS.accent,
                marginBottom: 24,
              }}
            >
              Example Calculation
            </div>

            {/* Progress visualization */}
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  fontFamily: FONTS.primary,
                  fontSize: 16,
                  color: COLORS.textSecondary,
                  marginBottom: 12,
                }}
              >
                ARR Progress to Early Stage Target
              </div>
              <div
                style={{
                  height: 40,
                  backgroundColor: COLORS.bgLight,
                  borderRadius: 20,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: `${barProgress * 25}%`,
                    height: "100%",
                    backgroundColor: COLORS.chart2,
                    borderRadius: 20,
                    transition: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontFamily: FONTS.mono,
                    fontSize: 14,
                    color: COLORS.textMuted,
                  }}
                >
                  Target: $4M
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontFamily: FONTS.mono,
                    fontSize: 14,
                    color: COLORS.textPrimary,
                  }}
                >
                  $1M
                </div>
              </div>
            </div>

            {/* Probability comparison */}
            <div
              style={{
                display: "flex",
                gap: 32,
                justifyContent: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: FONTS.primary,
                    fontSize: 14,
                    color: COLORS.textMuted,
                    marginBottom: 8,
                  }}
                >
                  Baseline
                </div>
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 48,
                    fontWeight: "bold",
                    color: COLORS.textSecondary,
                  }}
                >
                  {(baseProb * 100).toFixed(0)}%
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontFamily: FONTS.primary,
                  fontSize: 32,
                  color: COLORS.accent,
                }}
              >
                →
              </div>

              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: FONTS.primary,
                    fontSize: 14,
                    color: COLORS.textMuted,
                    marginBottom: 8,
                  }}
                >
                  Adjusted
                </div>
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 48,
                    fontWeight: "bold",
                    color: COLORS.secondary,
                  }}
                >
                  {(animatedAdjusted * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Key insight */}
            <div
              style={{
                marginTop: 24,
                padding: 16,
                backgroundColor: COLORS.bgLight,
                borderRadius: 12,
                borderLeft: `4px solid ${COLORS.accent}`,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.primary,
                  fontSize: 15,
                  color: COLORS.textSecondary,
                  lineHeight: 1.5,
                }}
              >
                Demonstrated progress reduces perceived risk. A company generating
                meaningful revenue has de-risked a portion of execution uncertainty.
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
