import { PlayerPosition } from '../../../lib/enums/player.enum';
import { POSITION_INFO, POSITION_ORDER } from '../../../lib/data/playerData';

interface PositionDiagramProps {
	activePosition: PlayerPosition;
}

export default function PositionDiagram({
	activePosition,
}: PositionDiagramProps) {
	return (
		<svg
			viewBox="0 0 400 440"
			xmlns="http://www.w3.org/2000/svg"
			className="block w-full"
		>
			<path
				d="M200,400 L2,202 A280,280 0 0 1 398,202 Z"
				fill="var(--color-bn-surface-2)"
				stroke="var(--color-bn-border)"
				strokeWidth={1}
			/>
			<line
				x1="200"
				y1="400"
				x2="2"
				y2="202"
				stroke="rgba(229,72,77,0.3)"
				strokeWidth={1.5}
				strokeDasharray="5 5"
			/>
			<line
				x1="200"
				y1="400"
				x2="398"
				y2="202"
				stroke="rgba(229,72,77,0.3)"
				strokeWidth={1.5}
				strokeDasharray="5 5"
			/>
			<polygon
				points="200,400 290,310 200,220 110,310"
				fill="var(--color-bn-bg)"
				stroke="rgba(229,72,77,0.3)"
				strokeWidth={1.5}
			/>

			<rect
				x="284"
				y="304"
				width="14"
				height="14"
				transform="rotate(45 291 311)"
				fill="var(--color-bn-white)"
			/>
			<rect
				x="193"
				y="213"
				width="14"
				height="14"
				transform="rotate(45 200 220)"
				fill="var(--color-bn-white)"
			/>
			<rect
				x="104"
				y="304"
				width="14"
				height="14"
				transform="rotate(45 111 311)"
				fill="var(--color-bn-white)"
			/>
			<rect
				x="193"
				y="393"
				width="14"
				height="14"
				transform="rotate(45 200 400)"
				fill="var(--color-bn-red)"
			/>
			<circle
				cx="200"
				cy="310"
				r="10"
				fill="var(--color-bn-surface-2)"
				stroke="var(--color-bn-border)"
				strokeWidth={1.5}
			/>

			{POSITION_ORDER.map((pos) => {
				const info = POSITION_INFO[pos];
				const isActive = pos === activePosition;
				return (
					<g key={pos}>
						<title>{info.label}</title>
						{isActive && (
							<circle
								cx={info.x}
								cy={info.y}
								r="22"
								fill="none"
								stroke="var(--color-bn-red)"
								strokeWidth={2}
								className="origin-center animate-ping [transform-box:fill-box]"
							/>
						)}
						<circle
							cx={info.x}
							cy={info.y}
							r={isActive ? 20 : 15}
							fill={
								isActive ? 'var(--color-bn-red)' : 'var(--color-bn-surface-2)'
							}
							stroke={
								isActive
									? 'var(--color-bn-red-light)'
									: 'var(--color-bn-border)'
							}
							strokeWidth={2}
						/>
						<text
							x={info.x}
							y={info.y + 4}
							textAnchor="middle"
							fill="var(--color-bn-white)"
							fontSize={isActive ? 13 : 12}
							fontWeight={isActive ? 800 : 700}
							className="pointer-events-none font-display"
						>
							{info.abbr}
						</text>
					</g>
				);
			})}
		</svg>
	);
}
