import { LeftSide } from "@/components/left-side/LeftSide";
import { FC, Suspense } from "react";
import { ChatWrapper } from "../_components/ChatWrapper";
import { MediaRoom } from "@/components/MediaRoom";

interface pageProps {
  params: { conversationId: string };
  searchParams: {
    video?: boolean;
    audio?: boolean;
  };
}

const page: FC<pageProps> = ({ params, searchParams }) => {
  return (
    <div className="flex">
      <div className="hidden xs:block xs:flex-1">
        <LeftSide />
      </div>

      <div className="flex-1">
        {searchParams?.video && (
          <MediaRoom chatId={params.conversationId} video={true} audio={true} />
        )}
        {searchParams?.audio && (
          <MediaRoom
            chatId={params.conversationId}
            video={false}
            audio={true}
          />
        )}
        {!searchParams?.video && !searchParams.audio && (
          <Suspense fallback={<ChatWrapper.Skeleton />}>
            <ChatWrapper conversationId={params.conversationId} />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default page;
