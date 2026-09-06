interface PaginationProps {
	page: number;
	count: number;
	onChange: (page: number) => void;
}

function getPageList(current: number, total: number): (number | 'ellipsis')[] {
	if (total <= 7) {
		return Array.from({ length: total }, (_, i) => i + 1);
	}

	const pages: (number | 'ellipsis')[] = [1];

	if (current > 3) pages.push('ellipsis');

	const start = Math.max(2, current - 1);
	const end = Math.min(total - 1, current + 1);
	for (let i = start; i <= end; i++) pages.push(i);

	if (current < total - 2) pages.push('ellipsis');

	pages.push(total);

	return pages;
}

const itemClassName =
	'flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors';

export default function Pagination({ page, count, onChange }: PaginationProps) {
	if (count <= 1) return null;

	const pages = getPageList(page, count);

	return (
		<div className="mt-12 flex items-center justify-center gap-1.5">
			<button
				disabled={page <= 1}
				onClick={() => onChange(page - 1)}
				aria-label="Previous page"
				className={`${itemClassName} border-bn-border text-bn-muted hover:bg-white/5 hover:text-bn-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-bn-muted`}
			>
				&larr;
			</button>

			{pages.map((p, i) =>
				p === 'ellipsis' ? (
					<span
						key={`ellipsis-${i}`}
						className="flex h-9 w-9 items-center justify-center text-bn-muted"
					>
						&hellip;
					</span>
				) : (
					<button
						key={p}
						onClick={() => onChange(p)}
						aria-current={p === page ? 'page' : undefined}
						className={`${itemClassName} ${
							p === page
								? 'border-bn-red bg-bn-red text-white'
								: 'border-bn-border text-bn-muted hover:bg-white/5 hover:text-bn-white'
						}`}
					>
						{p}
					</button>
				),
			)}

			<button
				disabled={page >= count}
				onClick={() => onChange(page + 1)}
				aria-label="Next page"
				className={`${itemClassName} border-bn-border text-bn-muted hover:bg-white/5 hover:text-bn-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-bn-muted`}
			>
				&rarr;
			</button>
		</div>
	);
}
