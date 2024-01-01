import axios from "axios";
import { Profile } from "@prisma/client";
import { ConversationWithMembers } from "@/types";

export const fetchUsers = async ({ name }: { name: string }) => {
  const { data } = await axios.get(`/api/queryFns/users?name=${name}`);
  return data as Profile[];
};

export const fetchConversations = async () => {
  const { data } = await axios.get("/api/queryFns/conversationMember");
  return data as ConversationWithMembers[];
};
