"use client";

import { useModal } from "@/hooks/use-modal";
import { MessageCirclePlus, MoreVertical } from "lucide-react";
import { FC } from "react";

interface HomeIconsProps {}

export const HomeIcons: FC<HomeIconsProps> = ({}) => {
  const { onOpen } = useModal();

  return (
    <>
      <MessageCirclePlus
        key={1}
        className="cursor-pointer w-5 h-5 text-muted-foreground"
      />
      <MoreVertical
        onClick={() => onOpen("createConversation")}
        key={2}
        className="cursor-pointer w-5 h-5 text-muted-foreground"
      />
    </>
  );
};
