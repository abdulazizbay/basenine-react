import { MemberStatus, MemberType } from "../enums/member.enum";

export interface Member {
  _id: string;
  memberNick: string;
  memberPhone: string;
  memberPassword: string;
  memberType: MemberType;
  memberStatus: MemberStatus;
  memberDesc?: string;
  memberAdress?: string;
  memberImage?: string;
  memberPoints: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface MemberInput {
  memberNick: string;
  memberPhone: string;
  memberPassword: string;
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberDesc?: string;
  memberAdress?: string;
  memberImage?: string;
  memberPoints?: number;
}

export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}

export interface MemberUpdateInput {
  memberNick?: string;
  memberPhone?: string;
  memberPassword?: string;
  memberDesc?: string;
  memberAdress?: string;
  memberImage?: string; 
}