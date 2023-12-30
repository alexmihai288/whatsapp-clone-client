"use client";

import { MoreVertical, Phone, Video } from "lucide-react";
import { FC } from "react";

interface ConversationIconsProps {}

export const ConversationIcons: FC<ConversationIconsProps> = ({}) => {
  return (
    <>
      <Video key={1} className="w-5 h-5 text-muted-foreground" />
      <Phone key={2} className="w-5 h-5 text-muted-foreground" />
      <MoreVertical key={3} className="w-5 h-5 text-muted-foreground ml-2" />
    </>
  );
};
