import { Input } from "@/components/ui/input";
import { FC } from "react";
import { ChatMessages } from "./ChatMessages";
import { Header } from "@/components/Header";
import { Paperclip, Send, Smile } from "lucide-react";

interface ChatWrapperProps {}

export const ChatWrapper: FC<ChatWrapperProps> = ({}) => {
  return (
    <div
      className="max-h-screen flex flex-col "
      style={{
        backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
        backgroundSize: "cover", // Optional: specify background size
        backgroundRepeat: "no-repeat", // Optional: specify background repeat
      }}
    >
      <Header
        imageUrl="/whatsapp-bg.webp"
        whereClause="conversation"
        name="Dingo"
      />
      <ChatMessages />
      <div className="bg-darkTealGreen flex items-center justify-center gap-5 p-2.5">
        <div className="flex items-center gap-2.5">
          <Smile className="w-5 h-5 text-muted-foreground" />
          <Paperclip className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex items-center w-full">
          <Input
            placeholder="Write a message..."
            className="bg-[#2a3942] w-full placeholder:text-muted-foreground rounded-tr-none rounded-br-none border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-10"
          />
          <div className="flex items-center justify-center rounded-tr-md rounded-br-md h-10 bg-[#2a3942] pr-3">
            <Send className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};
