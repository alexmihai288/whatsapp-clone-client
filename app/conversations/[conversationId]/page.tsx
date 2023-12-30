import { LeftSide } from "@/components/left-side/LeftSide";
import { FC } from "react";
import { ChatWrapper } from "../_components/ChatWrapper";

interface pageProps {
  params: { conversationId: string };
}

const page: FC<pageProps> = ({ params }) => {
  return (
    <div className="flex">
      <div className="hidden xs:block xs:flex-1">
        <LeftSide />
      </div>

      <div className="flex-1">
        <ChatWrapper />
      </div>
    </div>
  );
};

export default page;
