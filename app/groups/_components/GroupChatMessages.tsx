"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { GroupMessage } from "@prisma/client";
import Image from "next/image";
import { FC, useEffect, useRef } from "react";

interface ChatMessagesProps {
  currentUserId: string;
  messages: GroupMessage[];
}

export const GroupChatMessages: FC<ChatMessagesProps> = ({
  messages,
  currentUserId,
}) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the last message when the component mounts or messages change
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <ScrollArea className="h-screen">
      {messages?.map((msg, i) => (
        <div
          ref={i === messages?.length - 1 ? lastMessageRef : null}
          key={i}
          className={cn(
            currentUserId === msg?.memberId
              ? "ml-auto mr-5 bg-tealGreen px-4 py-2 rounded-md w-fit my-5"
              : "ml-5 bg-darkTealGreen px-4 py-2 rounded-md w-fit my-5"
          )}
        >
          {msg.fileUrl && (
            <Image
              src={msg.fileUrl}
              width={200}
              height={200}
              alt="image-url"
              className="object-cover rounded-md bg-[#2a3942] mb-2"
            />
          )}
          <p className="max-w-28 md:max-w-96 break-words">{msg?.content}</p>
        </div>
      ))}
    </ScrollArea>
  );
};
