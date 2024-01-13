"use client";
import { FC } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Conversation } from "./Conversation";
import { useQuery } from "@tanstack/react-query";
import { ConversationWithMembers } from "@/types";
import { fetchConversations } from "@/lib/queryFns/fetchCoversations";
import { Group } from "@prisma/client";
import { fetchGroups } from "@/lib/queryFns/fetchGroups";
import { Group as GroupComponent } from "./Group";
import { GroupIcon, Users } from "lucide-react";

interface FeedProps {
  conversations: ConversationWithMembers[];
  groups: Group[];
  currentUserId: string;
  whereClause?: string;
}

export const Feed: FC<FeedProps> = ({
  conversations,
  groups,
  currentUserId,
  whereClause,
}) => {
  const { data: data1 } = useQuery({
    queryKey: ["conversationMember"],
    queryFn: fetchConversations,
    initialData: conversations,
  });

  const { data: data2 } = useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
    initialData: groups,
  });



  return (
    <ScrollArea className="h-screen pr-5">
      <div className="container mt-5 mb-2.5 flex items-center gap-2.5 text-sm text-muted-foreground">
        <p>Conversations</p>
        <Users className="w-4 h-4" />
      </div>
      {data1?.map((conversation) => {
        const otherMember =
          conversation.memberOne.userId === currentUserId
            ? conversation.memberTwo
            : conversation.memberOne;
        return (
          <Conversation
            whereClause={whereClause}
            key={conversation.id}
            conversationMember={otherMember}
            conversationId={conversation.id}
          />
        );
      })}
      <div className="container mt-5 mb-2.5 flex items-center gap-2.5 text-sm text-muted-foreground">
        <p>Groups</p>
        <GroupIcon className="w-4 h-4" />
      </div>

      {data2?.map((group) => {
        return (
          <GroupComponent
            whereClause={whereClause}
            key={group.id}
            groupId={group.id}
            name={group.name}
            imageUrl={group.imageUrl}
          />
        );
      })}
    </ScrollArea>
  );
};
