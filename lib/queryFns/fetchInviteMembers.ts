import { Profile } from "@prisma/client";
import axios from "axios";

export const fetchInviteMembers = async ({ groupId }: { groupId: string }) => {
  const { data } = await axios.get(
    `/api/queryFns/inviteMembers/${groupId}`
  );
  return data as Profile[];
};
