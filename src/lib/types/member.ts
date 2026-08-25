import { MemberStatus, MemberType } from "../enums/member.enum";
import { Address } from "../enums/common.enum";

export interface Member {
  _id: string;
  memberNick: string;
  memberPhone: string;
  memberPassword: string;
  memberType: MemberType;
  memberStatus: MemberStatus;
  memberDesc?: string;
  memberAddress?: Address;
  memberImage?: string;
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
  memberAddress?: Address;
  memberImage?: string;
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
  memberAddress?: Address;
  memberImage?: string;
}
