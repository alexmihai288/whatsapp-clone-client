import { FC } from "react";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/CurrentProfile";
import { Loader2 } from "lucide-react";
import { GroupHeader } from "./GroupHeader";
import { GroupMessagesWrapper } from "./GroupMessagesWrapper";

interface GroupChatWrapperProps {
  groupId: string;
}

export const GroupChatWrapper = async ({ groupId }: GroupChatWrapperProps) => {
  const profile = await currentProfile();
  const group = await db.group.findUnique({
    where: {
      id: groupId,
    },
    include: {
      messages: true,
      members: {
        include:{
          member:true
        }
      },
    },
  });

  return (
    <div
      className="max-h-screen flex flex-col "
      style={{
        backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
        backgroundSize: "cover", // Optional: specify background size
        backgroundRepeat: "no-repeat", // Optional: specify background repeat
      }}
    >
      <GroupHeader
        groupId={groupId}
        name={group?.name!}
        imageUrl={group?.imageUrl!}
      />
      <GroupMessagesWrapper
                groupId={groupId}
        currentMemberId={profile?.userId!}
        messages={group?.messages!}
      />
    </div>
  );
};

GroupChatWrapper.Skeleton = function GroupChatWrapperSkeleton() {
  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
        backgroundSize: "cover", // Optional: specify background size
        backgroundRepeat: "no-repeat", // Optional: specify background repeat
      }}
    >
      <Loader2 className="h-32 w-32 text-muted-foreground animate-spin" />
    </div>
  );
};
