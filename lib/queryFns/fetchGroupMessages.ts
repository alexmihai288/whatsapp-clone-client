import { GroupMessage } from "@prisma/client";
import axios from "axios";

export const fetchGroupMessages = async ({
  groupId,
}: {
  groupId: string;
}) => {
  const { data } = await axios.get(`/api/queryFns/groupMessages?groupId=${groupId}`);
  return data as GroupMessage[];
};
