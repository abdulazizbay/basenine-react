import { Address } from '../enums/common.enum';
import { TeamOrder } from '../enums/team.enum';
import { Direction } from './common';

export interface Team {
	_id: string;
	teamNick: string;
	teamImage: string[];
	teamAddress: Address;
	teamSubscribers: number;
	teamViews: number;
	meFavourited?: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export type TeamOption = Pick<Team, '_id' | 'teamNick'>;

export interface Teams {
	list: Team[];
	metaCounter: { total: number }[];
}

export interface TeamInquiry {
	order: TeamOrder;
	direction: Direction;
	page: number;
	limit: number;
	search?: string;
}
