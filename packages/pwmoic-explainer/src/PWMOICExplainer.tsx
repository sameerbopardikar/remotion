import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
} from "remotion";
import {
  Intro,
  Formula,
  ProbabilityTree,
  StageFactor,
  Scorecards,
  ARRAdjustment,
  OutputInterpretation,
  Summary,
  COLORS,
} from "./components";

// Scene durations in frames (at 30fps)
const SCENE_DURATIONS = {
  intro: 360, // 12 seconds
  formula: 360, // 12 seconds
  probabilityTree: 450, // 15 seconds
  stageFactor: 360, // 12 seconds
  scorecards: 390, // 13 seconds
  arrAdjustment: 390, // 13 seconds
  outputInterpretation: 390, // 13 seconds
  summary: 360, // 12 seconds
} as const;

// Calculate cumulative start frames
const SCENE_STARTS = {
  intro: 0,
  formula: SCENE_DURATIONS.intro,
  probabilityTree: SCENE_DURATIONS.intro + SCENE_DURATIONS.formula,
  stageFactor:
    SCENE_DURATIONS.intro +
    SCENE_DURATIONS.formula +
    SCENE_DURATIONS.probabilityTree,
  scorecards:
    SCENE_DURATIONS.intro +
    SCENE_DURATIONS.formula +
    SCENE_DURATIONS.probabilityTree +
    SCENE_DURATIONS.stageFactor,
  arrAdjustment:
    SCENE_DURATIONS.intro +
    SCENE_DURATIONS.formula +
    SCENE_DURATIONS.probabilityTree +
    SCENE_DURATIONS.stageFactor +
    SCENE_DURATIONS.scorecards,
  outputInterpretation:
    SCENE_DURATIONS.intro +
    SCENE_DURATIONS.formula +
    SCENE_DURATIONS.probabilityTree +
    SCENE_DURATIONS.stageFactor +
    SCENE_DURATIONS.scorecards +
    SCENE_DURATIONS.arrAdjustment,
  summary:
    SCENE_DURATIONS.intro +
    SCENE_DURATIONS.formula +
    SCENE_DURATIONS.probabilityTree +
    SCENE_DURATIONS.stageFactor +
    SCENE_DURATIONS.scorecards +
    SCENE_DURATIONS.arrAdjustment +
    SCENE_DURATIONS.outputInterpretation,
} as const;

export const TOTAL_DURATION =
  SCENE_DURATIONS.intro +
  SCENE_DURATIONS.formula +
  SCENE_DURATIONS.probabilityTree +
  SCENE_DURATIONS.stageFactor +
  SCENE_DURATIONS.scorecards +
  SCENE_DURATIONS.arrAdjustment +
  SCENE_DURATIONS.outputInterpretation +
  SCENE_DURATIONS.summary;

// Transition component for smooth scene changes
const SceneTransition: React.FC<{
  children: React.ReactNode;
  startFrame: number;
  duration: number;
}> = ({ children, startFrame, duration }) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  // Fade in at the start
  const fadeInDuration = 20;
  const fadeOutDuration = 20;

  const fadeIn = interpolate(relativeFrame, [0, fadeInDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    relativeFrame,
    [duration - fadeOutDuration, duration],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

export const PWMOICExplainer: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgDark }}>
      {/* Scene 1: Introduction */}
      <Sequence from={SCENE_STARTS.intro} durationInFrames={SCENE_DURATIONS.intro}>
        <SceneTransition
          startFrame={SCENE_STARTS.intro}
          duration={SCENE_DURATIONS.intro}
        >
          <Intro />
        </SceneTransition>
      </Sequence>

      {/* Scene 2: Core Formula */}
      <Sequence
        from={SCENE_STARTS.formula}
        durationInFrames={SCENE_DURATIONS.formula}
      >
        <SceneTransition
          startFrame={SCENE_STARTS.formula}
          duration={SCENE_DURATIONS.formula}
        >
          <Formula />
        </SceneTransition>
      </Sequence>

      {/* Scene 3: Probability Tree */}
      <Sequence
        from={SCENE_STARTS.probabilityTree}
        durationInFrames={SCENE_DURATIONS.probabilityTree}
      >
        <SceneTransition
          startFrame={SCENE_STARTS.probabilityTree}
          duration={SCENE_DURATIONS.probabilityTree}
        >
          <ProbabilityTree />
        </SceneTransition>
      </Sequence>

      {/* Scene 4: Stage Factor */}
      <Sequence
        from={SCENE_STARTS.stageFactor}
        durationInFrames={SCENE_DURATIONS.stageFactor}
      >
        <SceneTransition
          startFrame={SCENE_STARTS.stageFactor}
          duration={SCENE_DURATIONS.stageFactor}
        >
          <StageFactor />
        </SceneTransition>
      </Sequence>

      {/* Scene 5: Scorecards */}
      <Sequence
        from={SCENE_STARTS.scorecards}
        durationInFrames={SCENE_DURATIONS.scorecards}
      >
        <SceneTransition
          startFrame={SCENE_STARTS.scorecards}
          duration={SCENE_DURATIONS.scorecards}
        >
          <Scorecards />
        </SceneTransition>
      </Sequence>

      {/* Scene 6: ARR Adjustment */}
      <Sequence
        from={SCENE_STARTS.arrAdjustment}
        durationInFrames={SCENE_DURATIONS.arrAdjustment}
      >
        <SceneTransition
          startFrame={SCENE_STARTS.arrAdjustment}
          duration={SCENE_DURATIONS.arrAdjustment}
        >
          <ARRAdjustment />
        </SceneTransition>
      </Sequence>

      {/* Scene 7: Output Interpretation */}
      <Sequence
        from={SCENE_STARTS.outputInterpretation}
        durationInFrames={SCENE_DURATIONS.outputInterpretation}
      >
        <SceneTransition
          startFrame={SCENE_STARTS.outputInterpretation}
          duration={SCENE_DURATIONS.outputInterpretation}
        >
          <OutputInterpretation />
        </SceneTransition>
      </Sequence>

      {/* Scene 8: Summary */}
      <Sequence
        from={SCENE_STARTS.summary}
        durationInFrames={SCENE_DURATIONS.summary}
      >
        <SceneTransition
          startFrame={SCENE_STARTS.summary}
          duration={SCENE_DURATIONS.summary}
        >
          <Summary />
        </SceneTransition>
      </Sequence>
    </AbsoluteFill>
  );
};
