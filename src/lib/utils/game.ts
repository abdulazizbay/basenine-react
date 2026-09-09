import { GameStatus } from '../enums/game.enum';
import type { Game } from '../types/game';

export function getGameScore(game: Game): { a: number; b: number } | null {
	if (game.gameStatus !== GameStatus.FINISHED) return null;
	if (game.teamAScore === null || game.teamBScore === null) return null;
	return { a: game.teamAScore, b: game.teamBScore };
}
