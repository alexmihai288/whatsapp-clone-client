import { FC } from "react";
import { AvatarWrapper } from "../AvatarWrapper";

interface ConversationProps {}

export const Conversation: FC<ConversationProps> = ({}) => {
  return (
    <div className="bg-darkTealGreenDark container py-2 flex items-center gap-2.5">
      <AvatarWrapper imageUrl="/whatsapp-bg.webp" className="self-start" />
      <div className="flex justify-between w-full border-b-2 pb-2">
        <div className="">
          <h1>Dingo</h1>
          <p className="text-xs">Last message</p>
        </div>
        <p className="text-xs text-muted-foreground mb-auto">12:55</p>
      </div>
    </div>
  );
};
