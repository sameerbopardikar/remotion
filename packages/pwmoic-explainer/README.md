# PWMOIC Model Explainer Video

A comprehensive animated explainer video for the **Probability-Weighted Multiple on Invested Capital** framework, built with [Remotion](https://remotion.dev).

## 📺 Video Overview

**Duration:** ~102 seconds | **Resolution:** 1920×1080 | **Frame Rate:** 30fps

---

## 🎬 Scene Breakdown

### Scene 1: Introduction (0:00 - 0:12)
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                        PWMOIC                               │
│                                                             │
│     P          W          M          I          C           │
│  Probability Weighted  Multiple   Invested   Capital        │
│                                                             │
│         ┌────────────────────────────────────┐              │
│         │  PWMOIC = Σ(Probability × MOIC)    │              │
│         └────────────────────────────────────┘              │
│                                                             │
│     A framework for modeling venture investment returns     │
│         through probability-weighted outcome analysis       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Scene 2: Core Formula (0:12 - 0:24)
```
┌─────────────────────────────────────────────────────────────┐
│  Core Formula                                               │
│  ───────────                                                │
│                                                             │
│  ① Probability    P(i) = Π(transition probabilities)       │
│                                                             │
│  ② Revenue        Revenue(i) = TAM × Market Share(i)       │
│                                                             │
│  ③ Exit Value     Exit Value(i) = Revenue(i) × Exit Multiple│
│                                                             │
│  ④ MOIC           MOIC(i) = Exit Value × Ownership / Invest │
│                                                             │
│  ⑤ PWMOIC         PWMOIC(i) = P(i) × MOIC(i)               │
│                                                             │
│         Total: PWMOIC = Σ PWMOIC(i)                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Scene 3: Probability Tree Structure (0:24 - 0:39)
```
┌─────────────────────────────────────────────────────────────┐
│  Probability Tree Structure                                 │
│  ──────────────────────────                                 │
│                                                             │
│                                            ┌──► Leader      │
│                                            │                │
│  ┌──────────┐   ┌───────┐   ┌──────┐   ┌──────┐──► Challenger│
│  │Investment├──►│ Early ├──►│Cross ├──►│ Mass ├──► Follower │
│  └──────────┘   │ Stage │   │Chasm │   │Market│             │
│                 └───┬───┘   └──┬───┘   └──┬───┘──► Niche    │
│                     │          │          │                 │
│                     ▼          ▼          │                 │
│                  Failure    No Cross      │                 │
│                                           │                 │
│  Stage 1         Stage 2      Stage 3    Stage 4            │
│  Product-Market  Adopters→    Scaled     Final Position     │
│  Fit             Mainstream   Adoption                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Scene 4: Stage Factor Adjustment (0:39 - 0:51)
```
┌─────────────────────────────────────────────────────────────┐
│  Stage Factor Adjustment                                    │
│  ───────────────────────                                    │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  Pre-Seed   │  │    Seed     │  │  Series A   │          │
│  │             │  │             │  │             │          │
│  │   62.5%     │  │   81.25%    │  │   100%      │          │
│  │   ████░░░░  │  │   ██████░░  │  │   ████████  │          │
│  │             │  │             │  │             │          │
│  │  Highest    │  │  Early      │  │  Full       │          │
│  │  uncertainty│  │  traction   │  │  confidence │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                             │
│  Adjusted P(Early) = Stage Factor × P(Early)                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Scene 5: Life Stage Assessments (0:51 - 1:04)
```
┌─────────────────────────────────────────────────────────────┐
│  Life Stage Assessments                                     │
│  ──────────────────────                                     │
│                                                             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐         │
│  │ 👤 Founder   │ │ 🏢 Company   │ │ 💨 Tailwinds │         │
│  │   Scorecard  │ │   Scorecard  │ │   Scorecard  │         │
│  │              │ │              │ │              │         │
│  │ ~45% weight  │ │ Stage-based  │ │ 0.8x - 1.5x │         │
│  │              │ │              │ │  multiplier  │         │
│  │ • Market Fit │ │ • PMF Metrics│ │ • Regulatory │         │
│  │ • Learning   │ │ • Unit Econ  │ │ • Tech Shift │         │
│  │ • Technical  │ │ • Team/Org   │ │ • Trends     │         │
│  │ • Capital Eff│ │ • Product    │ │ • Macro      │         │
│  │ • Internal🔥 │ │ • Market     │ │              │         │
│  └──────────────┘ └──────────────┘ └──────────────┘         │
│                                                             │
│  Combined: Founder×45% + Company×35% + Tailwinds multiplier │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Scene 6: ARR Progress Adjustment (1:04 - 1:17)
```
┌─────────────────────────────────────────────────────────────┐
│  ARR Progress Adjustment                                    │
│  ───────────────────────                                    │
│                                                             │
│  ① Stage Completion %    $1M / $4M = 25%                   │
│  ② Risk Gap              1 - 57% = 43%                     │
│  ③ Risk Eliminated       25% × 43% = 10.75%                │
│  ④ Adjusted Probability  57% + 10.75% = 67.75%             │
│                                                             │
│  ┌────────────────────────────────────────────┐             │
│  │ ARR Progress: ████░░░░░░░░░░░░░░  Target $4M│             │
│  │               $1M                           │             │
│  └────────────────────────────────────────────┘             │
│                                                             │
│        Baseline          Adjusted                           │
│          57%      →       67.75%                            │
│                                                             │
│  Demonstrated progress reduces perceived risk               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Scene 7: Investment Thresholds (1:17 - 1:30)
```
┌─────────────────────────────────────────────────────────────┐
│  Investment Thresholds                                      │
│  ─────────────────────                                      │
│                                                             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐         │
│  │ 🐻 Bear Case │ │ 🎯 US Base   │ │ 🚀 Bull/Global│         │
│  │              │ │              │ │              │         │
│  │     3x       │ │     10x      │ │     30x      │         │
│  │              │ │              │ │              │         │
│  │  Downside    │ │  Strong      │ │  Fund        │         │
│  │  protection  │ │  expected    │ │  returner    │         │
│  │              │ │  return      │ │              │         │
│  └──────────────┘ └──────────────┘ └──────────────┘         │
│                                                             │
│  Model Components:                                          │
│  • Stage Factor  • Scorecards   • ARR Adjustment            │
│  • Input Table   • TAM (6 trees)• Dilution Path             │
│  • Returns Path  • Hurdle Rate Valuations                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Scene 8: Summary (1:30 - 1:42)
```
┌─────────────────────────────────────────────────────────────┐
│                         PWMOIC                              │
│                    Framework Summary                        │
│                                                             │
│  ┌────────────────────────┐  ┌────────────────────────┐     │
│  │ 🎯 Probability-Weighted │  │ 🌳 Four-Stage Tree     │     │
│  │    Returns              │  │    Structure           │     │
│  │ PWMOIC = Σ(P × MOIC)    │  │ Early→Cross→Mass→Pos  │     │
│  └────────────────────────┘  └────────────────────────┘     │
│                                                             │
│  ┌────────────────────────┐  ┌────────────────────────┐     │
│  │ 📊 Three Scorecards    │  │ 📈 Progress Adjustments│     │
│  │    Founder + Company   │  │    ARR reduces risk    │     │
│  │    + Tailwinds         │  │                        │     │
│  └────────────────────────┘  └────────────────────────┘     │
│                                                             │
│            💰 Investment Thresholds                         │
│              Bear 3x | US Base 10x | Bull 30x               │
│                                                             │
│              Data-Driven Venture Analysis                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Usage

### Preview in Browser
```bash
npm run dev
# Opens Remotion Studio at http://localhost:3000
```

### Render Video
```bash
# Full video
npm run render

# Individual scenes
npx remotion render src/index.ts Intro out/intro.mp4
npx remotion render src/index.ts Formula out/formula.mp4
npx remotion render src/index.ts ProbabilityTree out/tree.mp4
npx remotion render src/index.ts StageFactor out/stage.mp4
npx remotion render src/index.ts Scorecards out/scorecards.mp4
npx remotion render src/index.ts ARRAdjustment out/arr.mp4
npx remotion render src/index.ts OutputInterpretation out/output.mp4
npx remotion render src/index.ts Summary out/summary.mp4
```

---

## 🎨 Design System

| Element | Color |
|---------|-------|
| Background | `#0F172A` → `#1E293B` |
| Primary | `#1E3A5F` |
| Secondary (Success) | `#00A86B` |
| Accent | `#FFB800` |
| Text Primary | `#F8FAFC` |
| Text Secondary | `#94A3B8` |

### Stage Colors
- Early Stage: `#3B82F6` (Blue)
- Cross Chasm: `#10B981` (Green)
- Mass Market: `#F59E0B` (Amber)
- Position: `#8B5CF6` (Purple)

### Outcome Colors
- Leader: `#10B981` (Green)
- Challenger: `#3B82F6` (Blue)
- Follower: `#F59E0B` (Amber)
- Niche: `#94A3B8` (Gray)
- No Cross: `#EF4444` (Red)
- Failure: `#7F1D1D` (Dark Red)

---

## 📁 Project Structure

```
pwmoic-explainer/
├── src/
│   ├── index.ts              # Entry point
│   ├── Root.tsx              # Composition registry
│   ├── PWMOICExplainer.tsx   # Main video composition
│   └── components/
│       ├── Intro.tsx
│       ├── Formula.tsx
│       ├── ProbabilityTree.tsx
│       ├── StageFactor.tsx
│       ├── Scorecards.tsx
│       ├── ARRAdjustment.tsx
│       ├── OutputInterpretation.tsx
│       ├── Summary.tsx
│       └── shared/
│           ├── constants.ts   # Colors, fonts, timing
│           ├── AnimatedText.tsx
│           └── AnimatedBox.tsx
├── package.json
├── tsconfig.json
└── remotion.config.ts
```

---

## 📖 What is PWMOIC?

PWMOIC (Probability-Weighted Multiple on Invested Capital) is a framework for modeling venture investment returns by:

1. **Building a probability tree** of possible outcomes
2. **Assigning probabilities** based on founder, company, and market assessments
3. **Calculating expected returns** as the sum of probability-weighted outcomes

The core formula: **PWMOIC = Σ(Probability × MOIC)**

This enables investors to:
- Model downside protection (Bear case ≥3x)
- Set return expectations (US Base ≥10x)
- Identify fund returners (Bull/Global ≥30x)
