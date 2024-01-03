"use client";

import { useModal } from "@/hooks/use-modal";
import { Profile } from "@prisma/client";
import { MessageCirclePlus, MoreVertical } from "lucide-react";
import { FC } from "react";

interface HomeIconsProps {
  initialUsers: Profile[] | [];
}

export const HomeIcons: FC<HomeIconsProps> = ({ initialUsers }) => {
  const { onOpen } = useModal();

  return (
    <>
      <MessageCirclePlus
        onClick={() => onOpen("createConversation", { initialUsers })}
        key={1}
        className="cursor-pointer w-5 h-5 text-muted-foreground"
      />
      <MoreVertical
        key={2}
        className="cursor-pointer w-5 h-5 text-muted-foreground"
      />
    </>
  );
};
