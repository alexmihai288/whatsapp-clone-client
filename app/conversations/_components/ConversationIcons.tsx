import { FC } from "react";
import { DeleteConversation } from "./DeleteConversation";
import { ChatVideoButton } from "@/components/ChatVideoButton";
import { ChatAudioButton } from "@/components/ChatAudioButton";

interface ConversationIconsProps {
  conversationId: string;
}

export const ConversationIcons: FC<ConversationIconsProps> = ({
  conversationId,
}) => {
  return (
    <>
      <ChatVideoButton />
      <ChatAudioButton/>
      <DeleteConversation conversationId={conversationId} />
    </>
  );
};
