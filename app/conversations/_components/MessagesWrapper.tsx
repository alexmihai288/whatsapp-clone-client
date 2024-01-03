"use client";
import { FC, useEffect } from "react";
import { SendMessages } from "./SendMessages";
import { ChatMessages } from "./ChatMessages";
import { Message } from "@prisma/client";
import { useSocket } from "@/hooks/use-socket";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMessages } from "@/lib/queryFns/fetchMessages";

interface MessagesWrapperProps {
  conversationId: string;
  messages: Message[];
  currentMemberId: string;
  toMemberId: string;
}

export const MessagesWrapper: FC<MessagesWrapperProps> = ({
  messages,
  conversationId,
  currentMemberId,
  toMemberId,
}) => {
  const { data } = useQuery({
    queryKey: ["messages"],
    queryFn: () => fetchMessages({ conversationId }),
    initialData: messages,
  });

  const { socket } = useSocket();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!socket) return;

    socket.on("receive-message", (value, currentMemberId) => {
      queryClient.setQueryData(["messages"], (oldMessages: Message[]) => [
        ...oldMessages,
        { content: value, memberId: currentMemberId },
      ]);
    });

    socket.on("receive-message-settled", () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    });
    return () => {
      socket.off("receive-message");
      socket.off("receive-message-error");
    };
  }, [queryClient, socket]);

  return (
    <>
      <ChatMessages currentUserId={currentMemberId} messages={data} />
      <SendMessages
        toMemberId={toMemberId}
        currentMemberId={currentMemberId}
        conversationId={conversationId}
      />
    </>
  );
};

export default MessagesWrapper;
