import { LeftSide } from "@/components/left-side/LeftSide";
import { FC, Suspense } from "react";
import { ChatWrapper } from "../_components/ChatWrapper";

interface pageProps {
  params: { conversationId: string };
}

const page: FC<pageProps> = ({ params: { conversationId } }) => {
  return (
    <div className="flex">
      <div className="hidden xs:block xs:flex-1">
        <LeftSide />
      </div>

      <div className="flex-1">
        <Suspense fallback={<ChatWrapper.Skeleton />}>
          <ChatWrapper conversationId={conversationId} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
