import { FC } from "react";
import { Header } from "@/components/Header";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/CurrentProfile";
import MessagesWrapper from "./MessagesWrapper";

interface ChatWrapperProps {
  conversationId: string;
}

export const ChatWrapper: FC<ChatWrapperProps> = async ({ conversationId }) => {
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
      <MessagesWrapper currentMemberId={profile?.userId!} messages={conversation?.messages!} conversationId={conversationId}/>
    </div>
  );
};
