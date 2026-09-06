interface BrandProps {
	className?: string;
}

export default function Brand({ className = '' }: BrandProps) {
	return (
		<div className={`flex items-center gap-2.5 ${className}`}>
			<div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bn-red shadow-[0_8px_20px_rgba(229,72,77,0.3)]">
				<div className="absolute h-5 w-5 rounded-full border border-white/30" />
				<span className="relative font-display text-sm font-extrabold text-white">
					9
				</span>
			</div>
			<div className="flex flex-col leading-none">
				<span className="font-display text-base font-bold text-bn-white">
					basenine
				</span>
				<span className="mt-1 text-[9px] font-semibold tracking-[0.16em] text-bn-muted">
					BASEBALL PLATFORM
				</span>
			</div>
		</div>
	);
}
