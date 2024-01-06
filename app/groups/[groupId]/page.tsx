import { LeftSide } from "@/components/left-side/LeftSide";
import { FC, Suspense } from "react";
import { GroupChatWrapper } from "../_components/GroupChatWrapper";

interface pageProps {
  params: { groupId: string };
}

const page: FC<pageProps> = ({ params: { groupId } }) => {
  return (
    <div className="flex">
      <div className="hidden xs:block xs:flex-1">
        <LeftSide />
      </div>

      <div className="flex-1">
        <Suspense fallback={<GroupChatWrapper.Skeleton />}>
          <GroupChatWrapper groupId={groupId} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
