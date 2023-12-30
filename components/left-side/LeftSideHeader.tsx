import { FC } from "react";
import { MessageCirclePlus, MoreVertical } from "lucide-react";
import { AvatarWrapper } from "../AvatarWrapper";

interface LeftSideHeaderProps {}

export const LeftSideHeader: FC<LeftSideHeaderProps> = ({}) => {
  return (
    <div className="flex-1 container py-2 bg-darkTealGreen flex items-center justify-between">
      <AvatarWrapper imageUrl="/whatsapp-bg.webp" />
      <div className="flex items-center gap-2.5">
        <MessageCirclePlus className="text-muted-foreground" />
        <MoreVertical className="text-muted-foreground" />
      </div>
    </div>
  );
};
