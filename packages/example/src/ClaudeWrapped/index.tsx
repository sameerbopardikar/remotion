import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {
	linearTiming,
	TransitionSeries,
} from '@remotion/transitions';
import {slide} from '@remotion/transitions/slide';
import {fade} from '@remotion/transitions/fade';

// Claude brand colors
const CLAUDE_ORANGE = '#D97706';
const CLAUDE_CREAM = '#FEF3E2';
const CLAUDE_DARK = '#1C1917';

// Scene 1: Intro
const IntroScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const titleScale = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 100},
	});

	const subtitleOpacity = spring({
		frame: frame - 15,
		fps,
		config: {damping: 20},
	});

	const yearScale = spring({
		frame: frame - 30,
		fps,
		config: {damping: 8, stiffness: 80},
	});

	const glowIntensity = Math.sin(frame * 0.1) * 0.3 + 0.7;

	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(135deg, ${CLAUDE_DARK} 0%, #292524 100%)`,
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}
		>
			<div
				style={{
					fontSize: 72,
					fontWeight: 'bold',
					color: CLAUDE_ORANGE,
					transform: `scale(${titleScale})`,
					textShadow: `0 0 ${40 * glowIntensity}px ${CLAUDE_ORANGE}`,
					fontFamily: 'system-ui, sans-serif',
				}}
			>
				Claude Wrapped
			</div>
			<div
				style={{
					fontSize: 28,
					color: CLAUDE_CREAM,
					opacity: subtitleOpacity,
					marginTop: 20,
					fontFamily: 'system-ui, sans-serif',
				}}
			>
				Your Year with AI
			</div>
			<div
				style={{
					fontSize: 120,
					fontWeight: 'bold',
					color: CLAUDE_ORANGE,
					transform: `scale(${yearScale})`,
					marginTop: 40,
					fontFamily: 'system-ui, sans-serif',
				}}
			>
				2024
			</div>
		</AbsoluteFill>
	);
};

// Animated Counter Component
const AnimatedNumber: React.FC<{
	value: number;
	suffix?: string;
	delay?: number;
}> = ({value, suffix = '', delay = 0}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const progress = spring({
		frame: frame - delay,
		fps,
		config: {damping: 30, stiffness: 80},
	});

	const displayValue = Math.floor(interpolate(progress, [0, 1], [0, value]));

	return (
		<span>
			{displayValue.toLocaleString()}
			{suffix}
		</span>
	);
};

// Scene 2: Total Conversations
const ConversationsScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const cardScale = spring({
		frame,
		fps,
		config: {damping: 12},
	});

	const labelOpacity = spring({
		frame: frame - 10,
		fps,
		config: {damping: 20},
	});

	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)`,
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}
		>
			<div
				style={{
					fontSize: 32,
					color: 'rgba(255,255,255,0.8)',
					opacity: labelOpacity,
					fontFamily: 'system-ui, sans-serif',
					marginBottom: 20,
				}}
			>
				You had
			</div>
			<div
				style={{
					fontSize: 140,
					fontWeight: 'bold',
					color: 'white',
					transform: `scale(${cardScale})`,
					fontFamily: 'system-ui, sans-serif',
				}}
			>
				<AnimatedNumber value={847} delay={15} />
			</div>
			<div
				style={{
					fontSize: 48,
					color: 'rgba(255,255,255,0.9)',
					opacity: labelOpacity,
					fontFamily: 'system-ui, sans-serif',
					marginTop: 20,
				}}
			>
				conversations with Claude
			</div>
			<div
				style={{
					fontSize: 24,
					color: 'rgba(255,255,255,0.6)',
					marginTop: 40,
					opacity: labelOpacity,
					fontFamily: 'system-ui, sans-serif',
				}}
			>
				That's more than 95% of users!
			</div>
		</AbsoluteFill>
	);
};

// Scene 3: Lines of Code
const CodeScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scale = spring({
		frame,
		fps,
		config: {damping: 12},
	});

	const codeLines = [
		'function buildDreams() {',
		'  const ideas = await claude.think();',
		'  return ideas.map(realize);',
		'}',
	];

	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(135deg, #059669 0%, #047857 100%)`,
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}
		>
			<div
				style={{
					fontSize: 32,
					color: 'rgba(255,255,255,0.8)',
					fontFamily: 'system-ui, sans-serif',
					marginBottom: 20,
				}}
			>
				Together we wrote
			</div>
			<div
				style={{
					fontSize: 120,
					fontWeight: 'bold',
					color: 'white',
					transform: `scale(${scale})`,
					fontFamily: 'system-ui, sans-serif',
				}}
			>
				<AnimatedNumber value={12847} delay={15} />
			</div>
			<div
				style={{
					fontSize: 48,
					color: 'rgba(255,255,255,0.9)',
					fontFamily: 'system-ui, sans-serif',
					marginTop: 10,
				}}
			>
				lines of code
			</div>
			<div
				style={{
					marginTop: 40,
					backgroundColor: 'rgba(0,0,0,0.3)',
					padding: 30,
					borderRadius: 16,
					fontFamily: 'monospace',
					fontSize: 18,
					color: '#A7F3D0',
					textAlign: 'left',
					transform: `scale(${spring({frame: frame - 30, fps, config: {damping: 15}})})`,
				}}
			>
				{codeLines.map((line, i) => (
					<div
						key={i}
						style={{
							opacity: spring({
								frame: frame - 35 - i * 5,
								fps,
								config: {damping: 20},
							}),
						}}
					>
						{line}
					</div>
				))}
			</div>
		</AbsoluteFill>
	);
};

// Scene 4: Top Topics
const TopicsScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const topics = [
		{name: 'React & TypeScript', percent: 34, color: '#61DAFB'},
		{name: 'Python & Data Science', percent: 28, color: '#3776AB'},
		{name: 'System Design', percent: 22, color: '#FF6B6B'},
		{name: 'Writing & Editing', percent: 16, color: '#FFC107'},
	];

	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)`,
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				padding: 60,
			}}
		>
			<div
				style={{
					fontSize: 48,
					fontWeight: 'bold',
					color: 'white',
					marginBottom: 50,
					fontFamily: 'system-ui, sans-serif',
					transform: `scale(${spring({frame, fps, config: {damping: 12}})})`,
				}}
			>
				Your Top Topics
			</div>
			<div style={{width: '100%', maxWidth: 600}}>
				{topics.map((topic, i) => {
					const barProgress = spring({
						frame: frame - 20 - i * 10,
						fps,
						config: {damping: 15},
					});

					return (
						<div
							key={topic.name}
							style={{
								marginBottom: 25,
								opacity: spring({
									frame: frame - 10 - i * 8,
									fps,
									config: {damping: 20},
								}),
							}}
						>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									marginBottom: 8,
									fontFamily: 'system-ui, sans-serif',
									color: 'white',
									fontSize: 20,
								}}
							>
								<span>{topic.name}</span>
								<span>{Math.floor(topic.percent * barProgress)}%</span>
							</div>
							<div
								style={{
									height: 24,
									backgroundColor: 'rgba(255,255,255,0.2)',
									borderRadius: 12,
									overflow: 'hidden',
								}}
							>
								<div
									style={{
										height: '100%',
										width: `${topic.percent * barProgress}%`,
										backgroundColor: topic.color,
										borderRadius: 12,
										boxShadow: `0 0 20px ${topic.color}`,
									}}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};

// Scene 5: Peak Hours
const PeakHoursScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const hours = [
		{hour: '9 AM', height: 40},
		{hour: '10 AM', height: 65},
		{hour: '11 AM', height: 85},
		{hour: '12 PM', height: 50},
		{hour: '1 PM', height: 35},
		{hour: '2 PM', height: 70},
		{hour: '3 PM', height: 100},
		{hour: '4 PM', height: 80},
		{hour: '5 PM', height: 45},
	];

	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)`,
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				padding: 60,
			}}
		>
			<div
				style={{
					fontSize: 48,
					fontWeight: 'bold',
					color: 'white',
					marginBottom: 20,
					fontFamily: 'system-ui, sans-serif',
					transform: `scale(${spring({frame, fps, config: {damping: 12}})})`,
				}}
			>
				Your Peak Productivity
			</div>
			<div
				style={{
					fontSize: 72,
					fontWeight: 'bold',
					color: '#FEF08A',
					marginBottom: 50,
					fontFamily: 'system-ui, sans-serif',
					transform: `scale(${spring({frame: frame - 10, fps, config: {damping: 12}})})`,
				}}
			>
				3 PM
			</div>
			<div
				style={{
					display: 'flex',
					alignItems: 'flex-end',
					gap: 12,
					height: 200,
				}}
			>
				{hours.map((h, i) => {
					const barHeight = spring({
						frame: frame - 25 - i * 3,
						fps,
						config: {damping: 12},
					});

					return (
						<div
							key={h.hour}
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<div
								style={{
									width: 40,
									height: h.height * 1.8 * barHeight,
									backgroundColor:
										h.height === 100 ? '#FEF08A' : 'rgba(255,255,255,0.4)',
									borderRadius: 8,
									boxShadow:
										h.height === 100 ? '0 0 20px rgba(254, 240, 138, 0.6)' : 'none',
								}}
							/>
							<div
								style={{
									marginTop: 10,
									fontSize: 11,
									color: 'rgba(255,255,255,0.7)',
									fontFamily: 'system-ui, sans-serif',
								}}
							>
								{h.hour}
							</div>
						</div>
					);
				})}
			</div>
			<div
				style={{
					marginTop: 30,
					fontSize: 20,
					color: 'rgba(255,255,255,0.7)',
					fontFamily: 'system-ui, sans-serif',
				}}
			>
				Afternoon coder detected!
			</div>
		</AbsoluteFill>
	);
};

// Scene 6: Fun Fact
const FunFactScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const emojiScale = spring({
		frame,
		fps,
		config: {damping: 8, stiffness: 100},
	});

	const textOpacity = spring({
		frame: frame - 15,
		fps,
		config: {damping: 20},
	});

	const bounce = Math.sin(frame * 0.15) * 10;

	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(135deg, #F59E0B 0%, #D97706 100%)`,
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}
		>
			<div
				style={{
					fontSize: 120,
					transform: `scale(${emojiScale}) translateY(${bounce}px)`,
				}}
			>
				🚀
			</div>
			<div
				style={{
					fontSize: 48,
					fontWeight: 'bold',
					color: 'white',
					marginTop: 30,
					opacity: textOpacity,
					fontFamily: 'system-ui, sans-serif',
					textAlign: 'center',
					padding: '0 60px',
				}}
			>
				Your longest conversation
			</div>
			<div
				style={{
					fontSize: 80,
					fontWeight: 'bold',
					color: CLAUDE_DARK,
					marginTop: 20,
					transform: `scale(${spring({frame: frame - 25, fps, config: {damping: 12}})})`,
					fontFamily: 'system-ui, sans-serif',
				}}
			>
				<AnimatedNumber value={127} delay={30} /> messages
			</div>
			<div
				style={{
					fontSize: 24,
					color: 'rgba(255,255,255,0.8)',
					marginTop: 20,
					opacity: textOpacity,
					fontFamily: 'system-ui, sans-serif',
				}}
			>
				That's a true collaboration marathon!
			</div>
		</AbsoluteFill>
	);
};

// Scene 7: Outro
const OutroScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scale = spring({
		frame,
		fps,
		config: {damping: 12},
	});

	const textOpacity = spring({
		frame: frame - 20,
		fps,
		config: {damping: 20},
	});

	const glowIntensity = Math.sin(frame * 0.08) * 0.3 + 0.7;

	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(135deg, ${CLAUDE_DARK} 0%, #292524 100%)`,
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}
		>
			<div
				style={{
					fontSize: 56,
					fontWeight: 'bold',
					color: CLAUDE_ORANGE,
					transform: `scale(${scale})`,
					textShadow: `0 0 ${30 * glowIntensity}px ${CLAUDE_ORANGE}`,
					fontFamily: 'system-ui, sans-serif',
					textAlign: 'center',
				}}
			>
				Thanks for an amazing year!
			</div>
			<div
				style={{
					fontSize: 32,
					color: CLAUDE_CREAM,
					opacity: textOpacity,
					marginTop: 30,
					fontFamily: 'system-ui, sans-serif',
				}}
			>
				Here's to even more in 2025
			</div>
			<div
				style={{
					marginTop: 60,
					display: 'flex',
					gap: 40,
					opacity: spring({frame: frame - 35, fps, config: {damping: 20}}),
				}}
			>
				<Stat label="Conversations" value="847" />
				<Stat label="Lines of Code" value="12,847" />
				<Stat label="Topics Explored" value="42" />
			</div>
			<div
				style={{
					fontSize: 24,
					color: 'rgba(255,255,255,0.5)',
					marginTop: 60,
					opacity: spring({frame: frame - 50, fps, config: {damping: 20}}),
					fontFamily: 'system-ui, sans-serif',
				}}
			>
				Made with Remotion + Claude
			</div>
		</AbsoluteFill>
	);
};

const Stat: React.FC<{label: string; value: string}> = ({label, value}) => (
	<div style={{textAlign: 'center'}}>
		<div
			style={{
				fontSize: 36,
				fontWeight: 'bold',
				color: CLAUDE_ORANGE,
				fontFamily: 'system-ui, sans-serif',
			}}
		>
			{value}
		</div>
		<div
			style={{
				fontSize: 16,
				color: CLAUDE_CREAM,
				fontFamily: 'system-ui, sans-serif',
				marginTop: 5,
			}}
		>
			{label}
		</div>
	</div>
);

// Main Composition
export const ClaudeWrapped: React.FC = () => {
	const SCENE_DURATION = 90; // 3 seconds per scene at 30fps
	const TRANSITION_DURATION = 20;

	return (
		<TransitionSeries>
			<TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
				<IntroScene />
			</TransitionSeries.Sequence>

			<TransitionSeries.Transition
				presentation={slide({direction: 'from-right'})}
				timing={linearTiming({durationInFrames: TRANSITION_DURATION})}
			/>

			<TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
				<ConversationsScene />
			</TransitionSeries.Sequence>

			<TransitionSeries.Transition
				presentation={slide({direction: 'from-bottom'})}
				timing={linearTiming({durationInFrames: TRANSITION_DURATION})}
			/>

			<TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
				<CodeScene />
			</TransitionSeries.Sequence>

			<TransitionSeries.Transition
				presentation={fade()}
				timing={linearTiming({durationInFrames: TRANSITION_DURATION})}
			/>

			<TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
				<TopicsScene />
			</TransitionSeries.Sequence>

			<TransitionSeries.Transition
				presentation={slide({direction: 'from-left'})}
				timing={linearTiming({durationInFrames: TRANSITION_DURATION})}
			/>

			<TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
				<PeakHoursScene />
			</TransitionSeries.Sequence>

			<TransitionSeries.Transition
				presentation={slide({direction: 'from-top'})}
				timing={linearTiming({durationInFrames: TRANSITION_DURATION})}
			/>

			<TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
				<FunFactScene />
			</TransitionSeries.Sequence>

			<TransitionSeries.Transition
				presentation={fade()}
				timing={linearTiming({durationInFrames: TRANSITION_DURATION})}
			/>

			<TransitionSeries.Sequence durationInFrames={SCENE_DURATION + 30}>
				<OutroScene />
			</TransitionSeries.Sequence>
		</TransitionSeries>
	);
};

export default ClaudeWrapped;
