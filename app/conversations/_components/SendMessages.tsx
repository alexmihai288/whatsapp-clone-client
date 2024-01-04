"use client";

import { EmojiPicker } from "@/components/EmojiPicker";
import { Input } from "@/components/ui/input";
import { useSocket } from "@/hooks/use-socket";
import { Message } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Paperclip, Send, X } from "lucide-react";
import { FC, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { DrawerWrapper } from "./DrawerWrapper";

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
  const [fileUrl, setFileUrl] = useState("");
  const { socket } = useSocket();

  const queryClient = useQueryClient();
  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({
      value,
      fileUrl,
    }: {
      value: string;
      fileUrl: string | undefined | null;
    }) => {
      const { data } = await axios.post("/api/message", {
        value,
        fileUrl,
        conversationId,
      });

      return data;
    },
    onMutate: (variables) => {
      socket?.emit(
        "send-message",
        variables.value,
        variables.fileUrl,
        currentMemberId,
        toMemberId,
        conversationId
      );

      queryClient.setQueryData(["messages"], (oldMessages: Message[]) => [
        ...oldMessages,
        {
          content: variables.value,
          fileUrl: variables.fileUrl,
          memberId: currentMemberId,
        },
      ]);

      setValue("");
      setFileUrl("");
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

      sendMessage({ value, fileUrl });
    }
  };

  const handleSubmit = (value: string) => {
    if (value.trim() !== "") sendMessage({ value, fileUrl });
  };
  return (
    <div className="flex flex-col">
      {fileUrl && (
        <div className="bg-darkTealGreenDark p-2 w-fit">
          <div className="rounded-md bg-darkTealGreen relative">
            <Image
              src={fileUrl}
              width={100}
              height={100}
              alt="image-url"
              className="object-cover rounded-md"
            />
            <X
              onClick={() => setFileUrl("")}
              className="text-rose-500 absolute -top-1.5 -right-1 w-4 h-4"
            />
          </div>
        </div>
      )}

      <div className="bg-darkTealGreen flex items-center justify-center gap-5 p-2.5">
        <div className="flex items-center gap-2.5">
          <EmojiPicker
            onChange={(emoji: string) => setValue((prevMsg) => prevMsg + emoji)}
          />
          <CldUploadWidget
            uploadPreset="opphlmxz"
            onUpload={(result: any) => setFileUrl(result.info.secure_url)}
          >
            {({ open }) => {
              const onClick = () => {
                open();
              };

              return (
                <Paperclip
                  onClick={onClick}
                  className="w-5 h-5 text-muted-foreground cursor-pointer"
                />
              );
            }}
          </CldUploadWidget>
          <DrawerWrapper currentUserId={currentMemberId} />
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
    </div>
  );
};
