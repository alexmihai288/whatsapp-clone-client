import { ConversationWithMembers } from "@/types";
import axios from "axios";

export const fetchConversations = async () => {
    const { data } = await axios.get("/api/queryFns/conversationMember");
    return data as ConversationWithMembers[];
  };
  