// PWMOIC Explainer Video
// Entry point for Remotion
//
// Commands:
// - Preview: npm run dev (or: npx remotion studio)
// - Render full video: npm run render
// - Render specific scene: npx remotion render src/index.ts Intro out/intro.mp4
//
// Available compositions:
// - PWMOICExplainer (full video ~102 seconds)
// - Intro, Formula, ProbabilityTree, StageFactor
// - Scorecards, ARRAdjustment, OutputInterpretation, Summary

import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

registerRoot(RemotionRoot);
