import type { Member } from '../../../lib/types/member';
import { serverApi } from '../../../lib/config';
import ImageWithFallback from '../../components/ui/ImageWithFallback';

export type ProfileView = 'recently-viewed' | 'subscribed-teams' | 'settings';

interface ProfileSidebarProps {
	memberDetail: Member;
	activeView: ProfileView;
	onViewChange: (view: ProfileView) => void;
	onLogout: () => void;
}

function HistoryIcon({ className = 'h-4.5 w-4.5' }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
			<circle cx="12" cy="12" r="8.5" />
			<path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function HeartIcon({ className = 'h-4.5 w-4.5' }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
			<path
				d="M12 20.2s-7.5-4.6-9.9-9.3C.6 7.5 2.3 4 6 4c2 0 3.6 1.1 4.5 2.6C11.4 5.1 13 4 15 4c3.7 0 5.4 3.5 3.9 6.9-2.4 4.7-9.9 9.3-9.9 9.3Z"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function UserIcon({ className = 'h-4.5 w-4.5' }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
			<circle cx="12" cy="8" r="3.5" />
			<path d="M4.5 20c1.4-3.5 4.3-5.5 7.5-5.5s6.1 2 7.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function LogoutIcon({ className = 'h-4.5 w-4.5' }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
			<path d="M9 20H5.5A1.5 1.5 0 0 1 4 18.5v-13A1.5 1.5 0 0 1 5.5 4H9" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M15.5 16 20 12l-4.5-4" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M20 12H9" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

const menuItemClass = (active: boolean) =>
	`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
		active ? 'bg-bn-red text-white' : 'text-bn-muted hover:bg-white/5 hover:text-bn-white'
	}`;

export default function ProfileSidebar({
	memberDetail,
	activeView,
	onViewChange,
	onLogout,
}: ProfileSidebarProps) {
	return (
		<aside className="flex w-full shrink-0 flex-col rounded-2xl border border-bn-border bg-bn-surface lg:w-64">
			<div className="flex items-center gap-3.5 border-b border-bn-border p-5">
				<ImageWithFallback
					src={memberDetail.memberImage ? `${serverApi}/${memberDetail.memberImage}` : null}
					alt={memberDetail.memberNick}
					className="h-14 w-14 shrink-0 rounded-full"
				/>
				<div className="min-w-0">
					<p className="truncate font-display text-base font-bold text-bn-white">
						{memberDetail.memberNick}
					</p>
					<p className="truncate text-xs text-bn-muted">{memberDetail.memberPhone}</p>
					<p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-bn-red">
						{memberDetail.memberType}
					</p>
				</div>
			</div>

			<div className="p-3">
				<p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-bn-muted">
					Activity
				</p>
				<div className="flex flex-col gap-1">
					<button
						type="button"
						className={menuItemClass(activeView === 'recently-viewed')}
						onClick={() => onViewChange('recently-viewed')}
					>
						<HistoryIcon />
						Recently Viewed
					</button>
					<button
						type="button"
						className={menuItemClass(activeView === 'subscribed-teams')}
						onClick={() => onViewChange('subscribed-teams')}
					>
						<HeartIcon />
						Subscribed Teams
					</button>
				</div>
			</div>

			<div className="p-3 pt-0">
				<p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-bn-muted">
					Account
				</p>
				<div className="flex flex-col gap-1">
					<button
						type="button"
						className={menuItemClass(activeView === 'settings')}
						onClick={() => onViewChange('settings')}
					>
						<UserIcon />
						My Profile
					</button>
					<button
						type="button"
						className={`${menuItemClass(false)} hover:text-bn-red`}
						onClick={onLogout}
					>
						<LogoutIcon />
						Logout
					</button>
				</div>
			</div>
		</aside>
	);
}
