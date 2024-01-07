import { GroupMember, Profile} from "@prisma/client";
import axios from "axios";

export const fetchGroupMembers = async ({
  groupId,
  ownerId,
}: {
  groupId: string;
  ownerId: string;
}) => {
  const { data } = await axios.get(
    `/api/queryFns/groupMembers?groupId=${groupId}&ownerId=${ownerId}`
  );
  return data as (GroupMember & {
    member: Profile;
  })[];
};
