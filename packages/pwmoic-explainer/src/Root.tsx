import React from "react";
import { Composition } from "remotion";
import { PWMOICExplainer, TOTAL_DURATION } from "./PWMOICExplainer";
import {
  Intro,
  Formula,
  ProbabilityTree,
  StageFactor,
  Scorecards,
  ARRAdjustment,
  OutputInterpretation,
  Summary,
  VIDEO,
} from "./components";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main full video */}
      <Composition
        id="PWMOICExplainer"
        component={PWMOICExplainer}
        durationInFrames={TOTAL_DURATION}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />

      {/* Individual scenes for preview/testing */}
      <Composition
        id="Intro"
        component={Intro}
        durationInFrames={360}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />

      <Composition
        id="Formula"
        component={Formula}
        durationInFrames={360}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />

      <Composition
        id="ProbabilityTree"
        component={ProbabilityTree}
        durationInFrames={450}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />

      <Composition
        id="StageFactor"
        component={StageFactor}
        durationInFrames={360}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />

      <Composition
        id="Scorecards"
        component={Scorecards}
        durationInFrames={390}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />

      <Composition
        id="ARRAdjustment"
        component={ARRAdjustment}
        durationInFrames={390}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />

      <Composition
        id="OutputInterpretation"
        component={OutputInterpretation}
        durationInFrames={390}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />

      <Composition
        id="Summary"
        component={Summary}
        durationInFrames={360}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />
    </>
  );
};
