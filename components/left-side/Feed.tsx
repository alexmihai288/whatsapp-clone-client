import { FC } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Conversation } from "./Conversation";

interface FeedProps {}

export const Feed: FC<FeedProps> = ({}) => {
  return (
    <ScrollArea className="h-screen">
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </ScrollArea>
  );
};
