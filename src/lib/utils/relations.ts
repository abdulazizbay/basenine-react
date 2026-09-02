import type { Team } from "../types/team";

export function teamOf(value: string | Team): Team | null {
    return typeof value === 'object' && value !== null ? value : null;
}