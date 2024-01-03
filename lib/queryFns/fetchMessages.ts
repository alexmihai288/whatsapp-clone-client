import { Message } from "@prisma/client";
import axios from "axios";

export const fetchMessages = async ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const { data } = await axios.get(
    `/api/queryFns/messages?conversationId=${conversationId}`
  );
  return data as Message[];
};
