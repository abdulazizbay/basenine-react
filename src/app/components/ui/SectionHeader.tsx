import { Link } from 'react-router-dom';

interface SectionHeaderAction {
	label: string;
	to: string;
}

interface SectionHeaderProps {
	eyebrow?: string;
	title: string;
	action?: SectionHeaderAction;
}

export default function SectionHeader({
	eyebrow,
	title,
	action,
}: SectionHeaderProps) {
	return (
		<div className="mb-8 flex flex-wrap items-end justify-between gap-4">
			<div>
				{eyebrow && (
					<p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-bn-red">
						{eyebrow}
					</p>
				)}
				<h2 className="font-display text-2xl font-bold text-bn-white sm:text-3xl">
					{title}
				</h2>
			</div>
			{action && (
				<Link
					to={action.to}
					className="text-sm font-semibold text-bn-muted transition-colors hover:text-bn-white"
				>
					{action.label} &rarr;
				</Link>
			)}
		</div>
	);
}
