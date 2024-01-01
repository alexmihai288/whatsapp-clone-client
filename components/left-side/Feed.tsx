"use client";
import { FC } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Conversation } from "./Conversation";
import { useQuery } from "@tanstack/react-query";
import { ConversationWithMembers } from "@/types";
import { fetchConversations } from "@/lib/queryFns/fetchUsers";

interface FeedProps {
  conversations: ConversationWithMembers[];
  currentUserId: string;
}

export const Feed: FC<FeedProps> = ({ conversations, currentUserId}) => {
  const { data } = useQuery({
    queryKey: ["conversationMember"],
    queryFn: fetchConversations,
    initialData: conversations,
  });

  return (
    <ScrollArea className="h-screen">
      {data.map((conversation) => {
        const otherMember =
          conversation.memberOne.userId === currentUserId
            ? conversation.memberTwo
            : conversation.memberOne;
        return (
          <Conversation
            key={conversation.id}
            conversationMember={otherMember}
            conversationId={conversation.id}
          />
        );
      })}
    </ScrollArea>
  );
};
