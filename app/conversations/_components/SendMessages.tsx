"use client";

import { Input } from "@/components/ui/input";
import { useSocket } from "@/hooks/use-socket";
import { Message } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Paperclip, Send, Smile } from "lucide-react";
import { FC, useState } from "react";

interface SendMessagesProps {
  currentMemberId: string;
  toMemberId: string;
  conversationId: string;
}

export const SendMessages: FC<SendMessagesProps> = ({
  conversationId,
  currentMemberId,
  toMemberId,
}) => {
  const [value, setValue] = useState("");
  const { socket } = useSocket();

  const queryClient = useQueryClient();
  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ value }: { value: string }) => {
      const { data } = await axios.post("/api/message", {
        value,
        conversationId,
      });

      return data;
    },
    onMutate: (variables) => {
      socket?.emit(
        "send-message",
        variables.value,
        currentMemberId,
        toMemberId
      );

      queryClient.setQueryData(["messages"], (oldMessages: Message[]) => [
        ...oldMessages,
        { content: variables.value, memberId: currentMemberId },
      ]);

      setValue("");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      socket?.emit("new-message-settled", toMemberId);
    },
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && value.trim() !== "") {
      // Prevent default behavior (e.g., new line) on Enter key press
      e.preventDefault();

      sendMessage({ value });
    }
  };

  const handleSubmit = (value: string) => {
    if (value.trim() !== "") sendMessage({ value });
  };
  return (
    <div className="bg-darkTealGreen flex items-center justify-center gap-5 p-2.5">
      <div className="flex items-center gap-2.5">
        <Smile className="w-5 h-5 text-muted-foreground" />
        <Paperclip className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="flex items-center w-full">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write a message..."
          className="bg-[#2a3942] w-full placeholder:text-muted-foreground rounded-tr-none rounded-br-none border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-10"
          onKeyDown={handleKeyPress}
        />
        <div className="flex items-center justify-center rounded-tr-md rounded-br-md h-10 bg-[#2a3942] pr-3">
          <Send
            onClick={() => handleSubmit(value)}
            className="w-5 h-5 text-muted-foreground"
          />
        </div>
      </div>
    </div>
  );
};
