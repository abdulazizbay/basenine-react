import { useState } from 'react';
import type { Member, MemberUpdateInput } from '../../../lib/types/member';
import { Address } from '../../../lib/enums/common.enum';
import type { T } from '../../../lib/types/common';
import { serverApi } from '../../../lib/config';
import MemberService from '../../services/MemberService';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import ImageWithFallback from '../../components/ui/ImageWithFallback';

interface SettingsProps {
	memberDetail: Member;
	onUpdated: (updated: Member) => void;
}

const inputClassName =
	'w-full rounded-lg border border-bn-border bg-bn-surface px-3.5 py-2.5 text-sm text-bn-white outline-none transition-colors placeholder:text-bn-muted focus:border-bn-red';

export default function Settings({ memberDetail, onUpdated }: SettingsProps) {
	const { setAuthMember } = useAuth();
	const [feedback, setFeedback] = useState<{
		type: 'success' | 'error';
		text: string;
	} | null>(null);
	const [memberImagePreview, setMemberImagePreview] = useState<string | null>(
		memberDetail.memberImage ? `${serverApi}/${memberDetail.memberImage}` : null,
	);
	const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>({
		memberNick: memberDetail.memberNick,
		memberPhone: memberDetail.memberPhone,
		memberDesc: memberDetail.memberDesc ?? '',
		memberAddress: memberDetail.memberAddress,
	});

	const handleChange = (field: keyof MemberUpdateInput) => (e: T) => {
		setMemberUpdateInput((prev) => ({ ...prev, [field]: e.target.value }));
	};

	const handleImageChange = (e: T) => {
		const file = e.target.files[0];
		if (!file) return;
		const validTypes = ['image/jpg', 'image/png', 'image/jpeg'];
		if (!validTypes.includes(file.type)) {
			setFeedback({
				type: 'error',
				text: 'Only JPG, JPEG, or PNG images are allowed.',
			});
			return;
		}
		setMemberUpdateInput((prev) => ({ ...prev, memberImage: file }));
		setMemberImagePreview(URL.createObjectURL(file));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (!memberUpdateInput.memberNick || !memberUpdateInput.memberPhone) {
				throw new Error('Nickname and phone are required.');
			}
			const memberService = new MemberService();
			const result = await memberService.updateMember(memberUpdateInput);
			setAuthMember(result);
			onUpdated(result);
			setFeedback({ type: 'success', text: 'Profile updated.' });
		} catch (err) {
			console.log(err);
			setFeedback({
				type: 'error',
				text: err instanceof Error ? err.message : 'Could not update profile.',
			});
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-5">
			<div className="flex items-center gap-4">
				<ImageWithFallback
					src={memberImagePreview}
					alt={memberDetail.memberNick}
					className="h-16 w-16 shrink-0 rounded-full"
				/>
				<div>
					<label className="inline-flex cursor-pointer items-center justify-center rounded-full border border-bn-border bg-white/5 px-4 py-2 text-xs font-semibold text-bn-white transition-colors hover:bg-white/10">
						Change photo
						<input
							type="file"
							className="hidden"
							accept="image/png, image/jpeg"
							onChange={handleImageChange}
						/>
					</label>
					<p className="mt-2 text-[11px] text-bn-muted">JPG, JPEG, or PNG only</p>
				</div>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				<div>
					<label className="mb-1.5 block text-xs font-medium text-bn-muted">
						Username
					</label>
					<input
						className={inputClassName}
						value={memberUpdateInput.memberNick}
						onChange={handleChange('memberNick')}
					/>
				</div>
				<div>
					<label className="mb-1.5 block text-xs font-medium text-bn-muted">
						Phone
					</label>
					<input
						className={inputClassName}
						value={memberUpdateInput.memberPhone}
						onChange={handleChange('memberPhone')}
					/>
				</div>
			</div>

			<div>
				<label className="mb-1.5 block text-xs font-medium text-bn-muted">
					Address
				</label>
				<select
					className={inputClassName}
					value={memberUpdateInput.memberAddress ?? ''}
					onChange={handleChange('memberAddress')}
				>
					<option value="">Select a city</option>
					{Object.values(Address).map((addr) => (
						<option key={addr} value={addr}>
							{addr}
						</option>
					))}
				</select>
			</div>

			<div>
				<label className="mb-1.5 block text-xs font-medium text-bn-muted">
					About
				</label>
				<textarea
					rows={4}
					className={inputClassName}
					value={memberUpdateInput.memberDesc}
					onChange={handleChange('memberDesc')}
				/>
			</div>

			{feedback && (
				<p
					className={`text-xs font-medium ${
						feedback.type === 'success' ? 'text-bn-white' : 'text-bn-red-light'
					}`}
				>
					{feedback.text}
				</p>
			)}

			<Button type="submit" className="self-start">
				Save changes
			</Button>
		</form>
	);
}
