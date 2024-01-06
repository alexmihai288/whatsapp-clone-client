import { Phone, Video } from "lucide-react";
import { FC } from "react";
import { ManageGroupUsers } from "./ManageGroupUsers";
import { db } from "@/lib/db";

interface GroupIconsProps {
  groupId: string;
  userId: string;
}

export const GroupIcons: FC<GroupIconsProps> = async ({ groupId, userId }) => {
  const usersNotInGroupAndFriends = await db.profile.findMany({
    where: {
      userId: {
        not: userId, // Exclude the current user from the results
      },
      groupsMember: {
        none: {
          groupId: groupId, // Exclude users who are already in the specified group
        },
      },
      OR: [
        {
          conversationsInitiated: {
            some: {
              memberTwoId: userId, // Check if the current user initiated conversations
            },
          },
        },
        {
          conversationsReceived: {
            some: {
              memberOneId: userId, // Check if the current user received conversations
            },
          },
        },
      ],
    },
  });

  return (
    <>
      <Video key={1} className="w-5 h-5 text-muted-foreground" />
      <Phone key={2} className="w-5 h-5 text-muted-foreground" />
      <ManageGroupUsers groupId={groupId} usersNotInGroupAndFriends={usersNotInGroupAndFriends} />
    </>
  );
};
