import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "./constants";

interface AnimatedBoxProps {
  children: React.ReactNode;
  delay?: number;
  backgroundColor?: string;
  borderColor?: string;
  padding?: number;
  borderRadius?: number;
  width?: number | string;
  style?: React.CSSProperties;
}

export const AnimatedBox: React.FC<AnimatedBoxProps> = ({
  children,
  delay = 0,
  backgroundColor = COLORS.bgMedium,
  borderColor = COLORS.primaryLight,
  padding = 30,
  borderRadius = 16,
  width = "auto",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const adjustedFrame = Math.max(0, frame - delay);

  const scale = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 80, stiffness: 120 },
  });

  const opacity = interpolate(adjustedFrame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        backgroundColor,
        border: `2px solid ${borderColor}`,
        padding,
        borderRadius,
        width,
        opacity,
        transform: `scale(${scale})`,
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

interface FormulaBoxProps {
  formula: string;
  label?: string;
  delay?: number;
  highlightParts?: { text: string; color: string }[];
}

export const FormulaBox: React.FC<FormulaBoxProps> = ({
  formula,
  label,
  delay = 0,
  highlightParts = [],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const adjustedFrame = Math.max(0, frame - delay);

  const scale = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 80, stiffness: 120 },
  });

  const opacity = interpolate(adjustedFrame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Apply highlighting
  let parts: React.ReactNode[] = [formula];

  if (highlightParts.length > 0) {
    parts = [];
    let remaining = formula;
    let key = 0;

    while (remaining.length > 0) {
      let foundMatch = false;
      for (const { text, color } of highlightParts) {
        const index = remaining.indexOf(text);
        if (index === 0) {
          parts.push(
            <span key={key++} style={{ color, fontWeight: "bold" }}>
              {text}
            </span>
          );
          remaining = remaining.slice(text.length);
          foundMatch = true;
          break;
        } else if (index > 0) {
          parts.push(<span key={key++}>{remaining.slice(0, index)}</span>);
          parts.push(
            <span key={key++} style={{ color, fontWeight: "bold" }}>
              {text}
            </span>
          );
          remaining = remaining.slice(index + text.length);
          foundMatch = true;
          break;
        }
      }
      if (!foundMatch) {
        parts.push(<span key={key++}>{remaining}</span>);
        break;
      }
    }
  }

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        textAlign: "center",
      }}
    >
      {label && (
        <div
          style={{
            fontFamily: FONTS.primary,
            fontSize: 24,
            color: COLORS.textSecondary,
            marginBottom: 16,
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 36,
          color: COLORS.textPrimary,
          backgroundColor: COLORS.bgMedium,
          padding: "24px 48px",
          borderRadius: 12,
          border: `2px solid ${COLORS.accent}`,
          display: "inline-block",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3)",
        }}
      >
        {parts}
      </div>
    </div>
  );
};

interface StageNodeProps {
  label: string;
  probability?: string;
  color: string;
  delay?: number;
  isActive?: boolean;
  size?: number;
}

export const StageNode: React.FC<StageNodeProps> = ({
  label,
  probability,
  color,
  delay = 0,
  isActive = false,
  size = 120,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const adjustedFrame = Math.max(0, frame - delay);

  const scale = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 80, stiffness: 150 },
  });

  const opacity = interpolate(adjustedFrame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const pulseScale = isActive
    ? 1 + Math.sin(frame / 10) * 0.05
    : 1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity,
        transform: `scale(${scale * pulseScale})`,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isActive
            ? `0 0 30px ${color}80`
            : "0 4px 16px rgba(0, 0, 0, 0.3)",
          border: `3px solid ${isActive ? COLORS.textPrimary : "transparent"}`,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.primary,
            fontSize: size / 5,
            fontWeight: "bold",
            color: COLORS.textPrimary,
            textAlign: "center",
            padding: 8,
          }}
        >
          {label}
        </span>
      </div>
      {probability && (
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 18,
            color: COLORS.textSecondary,
            marginTop: 8,
          }}
        >
          {probability}
        </div>
      )}
    </div>
  );
};

interface ConnectorLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  delay?: number;
  color?: string;
  thickness?: number;
}

export const ConnectorLine: React.FC<ConnectorLineProps> = ({
  from,
  to,
  delay = 0,
  color = COLORS.textMuted,
  thickness = 3,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);

  const progress = interpolate(adjustedFrame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  return (
    <div
      style={{
        position: "absolute",
        left: from.x,
        top: from.y,
        width: length * progress,
        height: thickness,
        backgroundColor: color,
        transform: `rotate(${angle}deg)`,
        transformOrigin: "0 50%",
        borderRadius: thickness / 2,
      }}
    />
  );
};

interface ProgressBarProps {
  progress: number;
  label?: string;
  delay?: number;
  color?: string;
  width?: number;
  height?: number;
}

export const AnimatedProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  delay = 0,
  color = COLORS.secondary,
  width = 400,
  height = 24,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const adjustedFrame = Math.max(0, frame - delay);

  const animatedProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 50, stiffness: 80 },
    from: 0,
    to: progress,
  });

  const opacity = interpolate(adjustedFrame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity }}>
      {label && (
        <div
          style={{
            fontFamily: FONTS.primary,
            fontSize: 18,
            color: COLORS.textSecondary,
            marginBottom: 8,
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          width,
          height,
          backgroundColor: COLORS.bgLight,
          borderRadius: height / 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${animatedProgress * 100}%`,
            height: "100%",
            backgroundColor: color,
            borderRadius: height / 2,
            transition: "none",
          }}
        />
      </div>
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 16,
          color: COLORS.textPrimary,
          marginTop: 4,
          textAlign: "right",
        }}
      >
        {Math.round(animatedProgress * 100)}%
      </div>
    </div>
  );
};
