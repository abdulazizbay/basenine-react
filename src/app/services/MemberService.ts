import axios from 'axios';
import { serverApi } from '../../lib/config';
import type { LoginInput, Member, MemberInput } from '../../lib/types/member';

class TeamService {
	private readonly path: string;
	constructor() {
		this.path = serverApi;
	}
	public async signup(input: MemberInput): Promise<Member> {
		try {
			const url = this.path + '/member/signup';
			const result = await axios.post(url, input, { withCredentials: true });
			const member: Member = result.data.member;
			localStorage.setItem('memberData', JSON.stringify(member));
			return member;
		} catch (err) {
			throw err;
		}
	}

	public async login(input: LoginInput): Promise<Member> {
		try {
			const url = this.path + '/member/login';
			const result = await axios.post(url, input, { withCredentials: true });
			const member: Member = result.data.member;
			localStorage.setItem('memberData', JSON.stringify(member));
			return member;
		} catch (err) {
			throw err;
		}
	}
}

export default TeamService;
