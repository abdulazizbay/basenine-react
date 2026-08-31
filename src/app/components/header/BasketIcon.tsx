interface CartIconProps {
	className?: string;
}

export default function CartIcon({ className = 'h-5 w-5' }: CartIconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
			<circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none" />
			<circle cx="18" cy="20" r="1.4" fill="currentColor" stroke="none" />
			<path
				d="M2.5 3h2l2.4 12.1a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
