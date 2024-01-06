"use client";
import { AvatarWrapper } from "@/components/AvatarWrapper";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSocket } from "@/hooks/use-socket";
import { fetchInviteMembers } from "@/lib/queryFns/fetchInviteMembers";
import { Profile } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { MoreVertical } from "lucide-react";
import { FC } from "react";

interface ManageGroupUsersProps {
  usersNotInGroupAndFriends: Profile[];
  groupId: string;
}

export const ManageGroupUsers: FC<ManageGroupUsersProps> = ({
  usersNotInGroupAndFriends,
  groupId,
}) => {
  const { socket } = useSocket();
  const handleInvite = (memberId: string) => {
    socket?.emit("invite-to-group", memberId, groupId);
  };

  const { data } = useQuery({
    queryKey: ["inviteMembers"],
    queryFn: () => fetchInviteMembers({ groupId }),
    initialData: usersNotInGroupAndFriends,
  });

  return (
    <Sheet>
      <SheetTrigger>
        <MoreVertical key={3} className="w-5 h-5 text-muted-foreground ml-2" />
      </SheetTrigger>
      <SheetContent className="bg-white text-black">
        <SheetHeader>
          <SheetTitle className="text-black">
            Manage participants or invite some
          </SheetTitle>
        </SheetHeader>
        <p>User</p>
        <p>User</p>
        <p>User</p>
        <p>User</p>
        <p>User</p>
        <p>User</p>

        <h1 className="font-bold text-md my-10">Or invite them</h1>
        <div className="space-y-5">
          {data.map((user) => (
            <div key={user.id} className="flex justify-between">
              <div className="flex items-center gap-2.5">
                <AvatarWrapper imageUrl={user.imageUrl} />
                <p className="text-sm font-medium">{user.name}</p>
              </div>
              <Button
                onClick={() => handleInvite(user.connectionId)}
                className="border-2 border-tealGreen text-tealGreen"
              >
                Invite
              </Button>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
