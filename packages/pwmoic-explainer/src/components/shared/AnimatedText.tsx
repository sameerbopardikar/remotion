import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "./constants";

interface AnimatedTextProps {
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: string | number;
  textAlign?: "left" | "center" | "right";
  style?: React.CSSProperties;
  animationType?: "fade" | "spring" | "typewriter" | "slideUp";
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  fontSize = 48,
  color = COLORS.textPrimary,
  fontWeight = "normal",
  textAlign = "center",
  style = {},
  animationType = "spring",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const adjustedFrame = frame - delay;

  if (adjustedFrame < 0) {
    return null;
  }

  let opacity = 1;
  let transform = "";

  switch (animationType) {
    case "fade": {
      opacity = interpolate(adjustedFrame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
      });
      break;
    }
    case "spring": {
      const scale = spring({
        frame: adjustedFrame,
        fps,
        config: { damping: 100 },
      });
      opacity = interpolate(adjustedFrame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      });
      transform = `scale(${scale})`;
      break;
    }
    case "slideUp": {
      const slideProgress = spring({
        frame: adjustedFrame,
        fps,
        config: { damping: 80, stiffness: 100 },
      });
      const translateY = interpolate(slideProgress, [0, 1], [50, 0]);
      opacity = interpolate(adjustedFrame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      });
      transform = `translateY(${translateY}px)`;
      break;
    }
    case "typewriter": {
      const chars = Math.floor(adjustedFrame / 2);
      return (
        <div
          style={{
            fontFamily: FONTS.primary,
            fontSize,
            color,
            fontWeight,
            textAlign,
            ...style,
          }}
        >
          {text.slice(0, chars)}
          {chars < text.length && (
            <span style={{ opacity: frame % 10 < 5 ? 1 : 0 }}>|</span>
          )}
        </div>
      );
    }
  }

  return (
    <div
      style={{
        fontFamily: FONTS.primary,
        fontSize,
        color,
        fontWeight,
        textAlign,
        opacity,
        transform,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

interface AnimatedWordByWordProps {
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: string | number;
  staggerDelay?: number;
  style?: React.CSSProperties;
}

export const AnimatedWordByWord: React.FC<AnimatedWordByWordProps> = ({
  text,
  delay = 0,
  fontSize = 48,
  color = COLORS.textPrimary,
  fontWeight = "normal",
  staggerDelay = 5,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div
      style={{
        fontFamily: FONTS.primary,
        fontSize,
        fontWeight,
        textAlign: "center",
        ...style,
      }}
    >
      {words.map((word, i) => {
        const wordDelay = delay + i * staggerDelay;
        const adjustedFrame = frame - wordDelay;

        if (adjustedFrame < 0) {
          return (
            <span
              key={i}
              style={{ marginRight: 10, display: "inline-block", opacity: 0 }}
            >
              {word}
            </span>
          );
        }

        const scale = spring({
          frame: adjustedFrame,
          fps,
          config: { damping: 200 },
        });

        return (
          <span
            key={i}
            style={{
              marginRight: 10,
              display: "inline-block",
              color,
              transform: `scale(${scale})`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

interface FadeTransitionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export const FadeIn: React.FC<FadeTransitionProps> = ({
  children,
  delay = 0,
  duration = 20,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = frame - delay;

  const opacity = interpolate(adjustedFrame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return <div style={{ opacity }}>{children}</div>;
};

export const SlideIn: React.FC<
  FadeTransitionProps & { direction?: "up" | "down" | "left" | "right" }
> = ({ children, delay = 0, duration = 20, direction = "up" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const adjustedFrame = Math.max(0, frame - delay);

  const progress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 80, stiffness: 100 },
  });

  const offset = 100;
  let transform = "";
  switch (direction) {
    case "up":
      transform = `translateY(${interpolate(progress, [0, 1], [offset, 0])}px)`;
      break;
    case "down":
      transform = `translateY(${interpolate(progress, [0, 1], [-offset, 0])}px)`;
      break;
    case "left":
      transform = `translateX(${interpolate(progress, [0, 1], [offset, 0])}px)`;
      break;
    case "right":
      transform = `translateX(${interpolate(progress, [0, 1], [-offset, 0])}px)`;
      break;
  }

  const opacity = interpolate(adjustedFrame, [0, duration / 2], [0, 1], {
    extrapolateRight: "clamp",
  });

  return <div style={{ opacity, transform }}>{children}</div>;
};
