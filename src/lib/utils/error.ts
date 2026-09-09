import axios from 'axios';

export function getErrorMessage(err: unknown, fallback: string): string {
	if (axios.isAxiosError(err)) {
		const data = err.response?.data;
		if (typeof data === 'string' && data) return data;
		if (data && typeof data.message === 'string' && data.message)
			return data.message;
	}
	if (err instanceof Error && err.message) return err.message;
	return fallback;
}
