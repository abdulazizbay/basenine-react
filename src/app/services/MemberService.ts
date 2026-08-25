import axios from "axios";
import { serverApi } from "../../lib/config";
import {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../../lib/types/member";
import { Favourite } from "../../lib/types/favourite";

class MemberService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  public async signup(input: MemberInput): Promise<Member> {
    try {
      const url = this.path + "/member/signup";
      const result = await axios.post(url, input, { withCredentials: true });
      const member: Member = result.data.member;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      throw err;
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    try {
      const url = this.path + "/member/login";
      const result = await axios.post(url, input, { withCredentials: true });
      const member: Member = result.data.member;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      throw err;
    }
  }

  public async logout(): Promise<void> {
    try {
      const url = this.path + "/member/logout";
      const result = await axios.post(url, {}, { withCredentials: true });

      localStorage.removeItem("memberData");
      return result.data.logout;
    } catch (err) {
      throw err;
    }
  }

  public async getMemberDetail(): Promise<Member & { favourites: Favourite[] }> {
    try {
      const url = this.path + "/member/detail";
      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (err) {
      throw err;
    }
  }

  public async updateMember(input: MemberUpdateInput): Promise<Member> {
    try {
      const formData = new FormData();
      formData.append("memberNick", input.memberNick || "");
      formData.append("memberPhone", input.memberPhone || "");
      if (input.memberAddress) formData.append("memberAddress", input.memberAddress);
      formData.append("memberDesc", input.memberDesc || "");
      if (input.memberImage) formData.append("memberImage", input.memberImage);

      const result = await axios(`${serverApi}/member/update`, {
        method: "POST",
        data: formData,
        withCredentials: true,
        headers: {
          "Content-type": "multipart/form-data"
        }
      })
      const member: Member = result.data
      localStorage.setItem("memberData", JSON.stringify(member))
      return member
    } catch (err) {
      throw err;
    }
  }
}

export default MemberService;
