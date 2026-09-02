import type { Team } from '../types/team';

export function teamOf(value: string | Team | undefined): Team | null {
	return typeof value === 'object' && value !== null ? value : null;
}
