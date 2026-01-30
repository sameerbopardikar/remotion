import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "./shared";

interface TreeNodeData {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  probability?: string;
  description?: string;
}

interface TreeConnection {
  from: string;
  to: string;
  label?: string;
}

const stages: TreeNodeData[] = [
  { id: "start", label: "Investment", x: 100, y: 400, color: COLORS.primary },
  { id: "early", label: "Early Stage", x: 350, y: 400, color: COLORS.stageEarly },
  { id: "cross", label: "Cross Chasm", x: 600, y: 400, color: COLORS.stageCross },
  { id: "mass", label: "Mass Market", x: 850, y: 400, color: COLORS.stageMass },
  { id: "position", label: "Position", x: 1100, y: 400, color: COLORS.stagePosition },
];

const outcomes: TreeNodeData[] = [
  { id: "leader", label: "Leader", x: 1400, y: 150, color: COLORS.leader, description: "Category winner" },
  { id: "challenger", label: "Challenger", x: 1400, y: 280, color: COLORS.challenger, description: "#2 or #3 position" },
  { id: "follower", label: "Follower", x: 1400, y: 410, color: COLORS.follower, description: "Viable smaller player" },
  { id: "niche", label: "Niche Only", x: 1400, y: 540, color: COLORS.niche, description: "Limited segment" },
  { id: "nocross", label: "No Cross", x: 1400, y: 670, color: COLORS.noCross, description: "Acqui-hire/small exit" },
  { id: "failure", label: "Failure", x: 1400, y: 800, color: COLORS.failure, description: "Complete loss" },
];

const connections: TreeConnection[] = [
  { from: "start", to: "early" },
  { from: "early", to: "cross" },
  { from: "cross", to: "mass" },
  { from: "mass", to: "position" },
  { from: "position", to: "leader" },
  { from: "position", to: "challenger" },
  { from: "position", to: "follower" },
  { from: "mass", to: "niche" },
  { from: "cross", to: "nocross" },
  { from: "early", to: "failure" },
];

const TreeNodeComponent: React.FC<{
  node: TreeNodeData;
  delay: number;
  size?: number;
  isStage?: boolean;
  showDescription?: boolean;
}> = ({ node, delay, size = 100, isStage = false, showDescription = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const adjustedFrame = Math.max(0, frame - delay);

  const scale = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 80, stiffness: 150 },
  });

  const opacity = interpolate(adjustedFrame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: node.x - size / 2,
        top: node.y - size / 2,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: isStage ? 16 : "50%",
          backgroundColor: node.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 4px 20px ${node.color}60`,
          border: `3px solid ${COLORS.textPrimary}20`,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.primary,
            fontSize: isStage ? 14 : 16,
            fontWeight: "bold",
            color: COLORS.textPrimary,
            textAlign: "center",
            padding: 8,
            lineHeight: 1.2,
          }}
        >
          {node.label}
        </span>
      </div>
      {showDescription && node.description && (
        <div
          style={{
            fontFamily: FONTS.primary,
            fontSize: 12,
            color: COLORS.textSecondary,
            textAlign: "center",
            marginTop: 8,
            maxWidth: size * 1.5,
            marginLeft: -(size * 0.25),
          }}
        >
          {node.description}
        </div>
      )}
    </div>
  );
};

const ConnectionLine: React.FC<{
  from: TreeNodeData;
  to: TreeNodeData;
  delay: number;
  isBranch?: boolean;
}> = ({ from, to, delay, isBranch = false }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);

  const progress = interpolate(adjustedFrame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  const startX = from.x + 50;
  const startY = from.y;
  const endX = to.x - 50;
  const endY = to.y;

  // Create curved path for branches
  const midX = (startX + endX) / 2;
  const path = isBranch
    ? `M ${startX} ${startY} Q ${midX} ${startY} ${midX} ${(startY + endY) / 2} Q ${midX} ${endY} ${endX} ${endY}`
    : `M ${startX} ${startY} L ${endX} ${endY}`;

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <path
        d={path}
        fill="none"
        stroke={COLORS.textMuted}
        strokeWidth={3}
        strokeDasharray={isBranch ? "none" : "none"}
        strokeLinecap="round"
        style={{
          strokeDasharray: 1000,
          strokeDashoffset: 1000 * (1 - progress),
        }}
      />
      {/* Arrow head */}
      {progress > 0.9 && (
        <polygon
          points={`${endX - 10},${endY - 8} ${endX},${endY} ${endX - 10},${endY + 8}`}
          fill={COLORS.textMuted}
          style={{
            opacity: interpolate(progress, [0.9, 1], [0, 1]),
          }}
        />
      )}
    </svg>
  );
};

export const ProbabilityTree: React.FC = () => {
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

  // Timeline for tree animation
  const stageDelays = [30, 70, 110, 150, 190];
  const outcomeDelays = [230, 250, 270, 290, 310, 330];
  const connectionDelays = [50, 90, 130, 170, 210, 235, 255, 275, 295, 315];

  // Stage labels appear
  const labelDelay = 380;
  const labelOpacity = interpolate(frame, [labelDelay, labelDelay + 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.bgDark} 0%, ${COLORS.bgMedium} 100%)`,
        padding: 60,
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
          Probability Tree Structure
        </h2>
        <div
          style={{
            width: 120,
            height: 4,
            backgroundColor: COLORS.accent,
            marginTop: 12,
            borderRadius: 2,
          }}
        />
      </div>

      {/* Tree visualization */}
      <div
        style={{
          position: "relative",
          flex: 1,
          marginTop: -40,
        }}
      >
        {/* Connections */}
        {connections.map((conn, i) => {
          const fromNode = [...stages, ...outcomes].find((n) => n.id === conn.from)!;
          const toNode = [...stages, ...outcomes].find((n) => n.id === conn.to)!;
          const isBranch = conn.from === "position" || conn.from === "mass" ||
                          conn.from === "cross" || conn.from === "early";
          return (
            <ConnectionLine
              key={`${conn.from}-${conn.to}`}
              from={fromNode}
              to={toNode}
              delay={connectionDelays[i] || 200}
              isBranch={isBranch && (conn.to !== "cross" && conn.to !== "mass" && conn.to !== "position")}
            />
          );
        })}

        {/* Stage nodes */}
        {stages.map((node, i) => (
          <TreeNodeComponent
            key={node.id}
            node={node}
            delay={stageDelays[i]}
            isStage={true}
            size={90}
          />
        ))}

        {/* Outcome nodes */}
        {outcomes.map((node, i) => (
          <TreeNodeComponent
            key={node.id}
            node={node}
            delay={outcomeDelays[i]}
            size={80}
            showDescription={true}
          />
        ))}

        {/* Stage progression labels */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 100,
            right: 200,
            display: "flex",
            justifyContent: "space-between",
            opacity: labelOpacity,
          }}
        >
          {[
            { stage: "1", label: "Product-Market Fit" },
            { stage: "2", label: "Early Adopters → Mainstream" },
            { stage: "3", label: "Scaled Adoption" },
            { stage: "4", label: "Final Competitive Position" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                maxWidth: 200,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.primary,
                  fontSize: 14,
                  color: COLORS.accent,
                  fontWeight: "bold",
                  marginBottom: 4,
                }}
              >
                Stage {item.stage}
              </div>
              <div
                style={{
                  fontFamily: FONTS.primary,
                  fontSize: 14,
                  color: COLORS.textSecondary,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Terminal outcomes legend */}
        <div
          style={{
            position: "absolute",
            top: 50,
            right: 60,
            opacity: labelOpacity,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.primary,
              fontSize: 18,
              color: COLORS.textPrimary,
              fontWeight: "bold",
              marginBottom: 16,
            }}
          >
            6 Terminal Outcomes
          </div>
          <div
            style={{
              fontFamily: FONTS.primary,
              fontSize: 14,
              color: COLORS.textSecondary,
              lineHeight: 1.6,
            }}
          >
            Each with distinct market
            <br />
            share assumptions
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
