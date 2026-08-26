import type { MouseEventHandler, ReactNode } from 'react';

interface CardProps {
	children: ReactNode;
	className?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function Card({ children, className = '', onClick }: CardProps) {
	const interactive = Boolean(onClick);
	return (
		<div
			onClick={onClick}
			className={`rounded-2xl border border-bn-border bg-bn-surface transition-colors ${
				interactive
					? 'cursor-pointer hover:border-white/20 hover:bg-bn-surface-2'
					: ''
			} ${className}`}
		>
			{children}
		</div>
	);
}
