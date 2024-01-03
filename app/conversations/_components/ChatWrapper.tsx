import { FC } from "react";
import { Header } from "@/components/Header";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/CurrentProfile";
import MessagesWrapper from "./MessagesWrapper";
import { Loader2 } from "lucide-react";

interface ChatWrapperProps {
  conversationId: string;
}

export const ChatWrapper = async ({ conversationId }: ChatWrapperProps) => {
  const profile = await currentProfile();
  const conversation = await db.conversation.findUnique({
    where: {
      id: conversationId,
    },
    include: {
      memberOne: true,
      memberTwo: true,
      messages: true,
    },
  });
  const otherMember =
    conversation?.memberOne.userId === profile?.userId
      ? conversation?.memberTwo
      : conversation?.memberOne;

  return (
    <div
      className="max-h-screen flex flex-col "
      style={{
        backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
        backgroundSize: "cover", // Optional: specify background size
        backgroundRepeat: "no-repeat", // Optional: specify background repeat
      }}
    >
      <Header
        imageUrl={otherMember?.imageUrl!}
        whereClause="conversation"
        name={otherMember?.name}
      />
      <MessagesWrapper
        toMemberId={otherMember?.connectionId!}
        currentMemberId={profile?.userId!}
        messages={conversation?.messages!}
        conversationId={conversationId}
      />
    </div>
  );
};

ChatWrapper.Skeleton = function ChatWrapperSkeleton() {
  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
        backgroundSize: "cover", // Optional: specify background size
        backgroundRepeat: "no-repeat", // Optional: specify background repeat
      }}
    >
      <Loader2 className="h-32 w-32 text-muted-foreground animate-spin" />
    </div>
  );
};
