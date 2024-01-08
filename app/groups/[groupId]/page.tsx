import { LeftSide } from "@/components/left-side/LeftSide";
import { FC, Suspense } from "react";
import { GroupChatWrapper } from "../_components/GroupChatWrapper";
import { MediaRoom } from "@/components/MediaRoom";

interface pageProps {
  params: { groupId: string };
  searchParams: {
    video?: boolean;
    audio?: boolean;
  };
}

const page: FC<pageProps> = ({ params: { groupId }, searchParams }) => {
  return (
    <div className="flex">
      <div className="hidden xs:block xs:flex-1">
        <LeftSide />
      </div>

      <div className="flex-1">
        {searchParams?.video && (
          <MediaRoom chatId={groupId} video={true} audio={true} />
        )}
        {searchParams?.video && (
          <MediaRoom chatId={groupId} video={false} audio={true} />
        )}
        {!searchParams?.video && !searchParams.audio && (
          <Suspense fallback={<GroupChatWrapper.Skeleton />}>
            <GroupChatWrapper groupId={groupId} />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default page;
