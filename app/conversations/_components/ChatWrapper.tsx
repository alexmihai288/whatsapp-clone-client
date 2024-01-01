import { FC } from "react";
import { ChatMessages } from "./ChatMessages";
import { Header } from "@/components/Header";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/CurrentProfile";
import { SendMessages } from "./SendMessages";

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
      messages: {
        include: {
          member: true,
        },
      },
    },
  });
  const otherMember =
    conversation?.memberOne.userId === profile?.userId
      ? conversation?.memberTwo
      : conversation?.memberOne;

      console.log(conversation)
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
        name="Dingo"
      />
      <ChatMessages />
      <SendMessages />
    </div>
  );
};
