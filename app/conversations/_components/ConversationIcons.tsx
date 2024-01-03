import { Phone, Video } from "lucide-react";
import { FC } from "react";
import { DeleteConversation } from "./DeleteConversation";

interface ConversationIconsProps {
  conversationId:string
}

export const ConversationIcons: FC<ConversationIconsProps> = ({conversationId}) => {
  return (
    <>
      <Video key={1} className="w-5 h-5 text-muted-foreground" />
      <Phone key={2} className="w-5 h-5 text-muted-foreground" />
      <DeleteConversation conversationId={conversationId}/>
    </>
  );
};
