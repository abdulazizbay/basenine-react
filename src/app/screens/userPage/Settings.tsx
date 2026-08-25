import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useGlobals } from "../../hooks/useGlobals";
import { Member, MemberUpdateInput } from "../../../lib/types/member";
import { Address } from "../../../lib/enums/common.enum";
import { T } from "../../../lib/types/common";
import { Messages, serverApi } from "../../../lib/config";
import MemberService from "../../services/MemberService";

interface SettingsProps {
  memberDetail: Member;
  onUpdated: (updated: Member) => void;
}

export default function Settings({ memberDetail, onUpdated }: SettingsProps) {
  const { setAuthMember } = useGlobals();
  const { enqueueSnackbar } = useSnackbar();

  const [memberImagePreview, setMemberImagePreview] = useState<string>(
    memberDetail.memberImage ? `${serverApi}/${memberDetail.memberImage}` : "/icons/default-user.svg",
  );
  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>({
    memberNick: memberDetail.memberNick,
    memberPhone: memberDetail.memberPhone,
    memberDesc: memberDetail.memberDesc ?? "",
    memberAddress: memberDetail.memberAddress,
  });

  const handleChange = (field: keyof MemberUpdateInput) => (e: T) => {
    setMemberUpdateInput((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleImageChange = (e: T) => {
    const file = e.target.files[0];
    if (!file) return;
    const validTypes = ["image/jpg", "image/png", "image/jpeg"];
    if (!validTypes.includes(file.type)) {
      enqueueSnackbar(Messages.error5, { variant: "error" });
      return;
    }
    setMemberUpdateInput((prev) => ({ ...prev, memberImage: file }));
    setMemberImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      if (!memberUpdateInput.memberNick || !memberUpdateInput.memberPhone) {
        throw new Error(Messages.error3);
      }
      const member = new MemberService();
      const result = await member.updateMember(memberUpdateInput);
      setAuthMember(result);
      onUpdated(result);
      enqueueSnackbar("Profile updated", { variant: "success" });
    } catch (err) {
      enqueueSnackbar(err instanceof Error ? err.message : Messages.error1, { variant: "error" });
    }
  };

  return (
    <Box className="settings-form">
      <Box className="settings-image-row">
        <img src={memberImagePreview} className="settings-avatar" alt="avatar" />
        <Box>
          <Button component="label" className="settings-upload-button">
            Change Photo
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
          <p className="settings-hint">JPG, JPEG, or PNG only</p>
        </Box>
      </Box>

      <Box className="settings-row">
        <Box className="settings-field">
          <label>Username</label>
          <input type="text" value={memberUpdateInput.memberNick} onChange={handleChange("memberNick")} />
        </Box>

        <Box className="settings-field">
          <label>Phone</label>
          <input type="text" value={memberUpdateInput.memberPhone} onChange={handleChange("memberPhone")} />
        </Box>
      </Box>

      <Box className="settings-field">
        <label>Address</label>
        <select value={memberUpdateInput.memberAddress ?? ""} onChange={handleChange("memberAddress")}>
          <option value="">Select a city</option>
          {Object.values(Address).map((addr) => (
            <option key={addr} value={addr}>
              {addr}
            </option>
          ))}
        </select>
      </Box>

      <Box className="settings-field">
        <label>About</label>
        <textarea value={memberUpdateInput.memberDesc} onChange={handleChange("memberDesc")} />
      </Box>

      <Button className="settings-save" onClick={handleSubmit}>
        Save Changes
      </Button>
    </Box>
  );
}
