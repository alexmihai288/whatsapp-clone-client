"use client";
import { AvatarWrapper } from "@/components/AvatarWrapper";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSocket } from "@/hooks/use-socket";
import { fetchGroupMembers } from "@/lib/queryFns/fetchGroupMembers";
import { fetchInviteMembers } from "@/lib/queryFns/fetchInviteMembers";
import { GroupMember, Profile } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, MoreVertical } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

interface ManageGroupUsersProps {
  usersNotInGroupAndFriends: Profile[];
  groupId: string;
  ownerId: string;
  groupMembers: (GroupMember & {
    member: Profile;
  })[];
}

export const ManageGroupUsers: FC<ManageGroupUsersProps> = ({
  usersNotInGroupAndFriends,
  groupId,
  ownerId,
  groupMembers,
}) => {
  const { socket } = useSocket();
  const handleInvite = (memberId: string) => {
    toast.success("You sent an invitation");
    socket?.emit("invite-to-group", memberId, groupId);
  };

  const { data: data1, refetch } = useQuery({
    queryKey: ["groupMembers"],
    queryFn: () => fetchGroupMembers({ groupId, ownerId }),
    initialData: groupMembers,
  });

  const { data: data2 } = useQuery({
    queryKey: ["inviteMembers"],
    queryFn: () => fetchInviteMembers({ groupId }),
    initialData: usersNotInGroupAndFriends,
  });

  const { mutate: kick, isPending } = useMutation({
    mutationFn: async ({
      groupMemberId,
      groupId,
      userId,
    }: {
      groupMemberId: string;
      groupId: string;
      userId: string;
    }) => {
      const { data } = await axios.post("/api/group/kick", {
        groupMemberId,
        groupId,
        userId,
      });
      return data as GroupMember & {
        member: Profile;
      };
    },
    onSuccess: (data) => {
      toast.success(`You have kicked ${data.member.name}`);
      refetch();
      socket?.emit("send-kick",data.member.connectionId);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <Sheet>
      <SheetTrigger>
        <MoreVertical key={3} className="w-5 h-5 text-muted-foreground ml-2" />
      </SheetTrigger>
      <SheetContent className="bg-white text-black">
        <SheetHeader>
          <SheetTitle className="text-black mb-5">
            Manage participants or invite some
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-60 pr-5 mt-5">
          <div className="flex flex-col gap-2.5">
            {data1?.map((groupMember) => (
              <div
                key={groupMember.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <AvatarWrapper imageUrl={groupMember.member.imageUrl} />
                  <p>{groupMember.member.name}</p>
                </div>
                <Button
                  onClick={() =>
                    kick({
                      groupMemberId: groupMember.id,
                      groupId: groupId,
                      userId: groupMember.member.userId,
                    })
                  }
                  className="border-2 border-rose-500 text-xs px-2.5 py-1 h-6 hover:bg-rose-500 hover:text-white"
                >
                  {isPending && (
                    <Loader2 className="mr-2 w-4 h-4 text-muted-foreground animate-spin" />
                  )}{" "}
                  Kick
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>

        {data2.length > 0 && (
          <h1 className="font-bold text-md mb-5 mt-10">Or invite them</h1>
        )}

        <ScrollArea className="h-60 pr-5">
          <div className="flex flex-col gap-2.5">
            {data2.map((user) => (
              <div key={user.id} className="flex justify-between">
                <div className="flex items-center gap-2.5">
                  <AvatarWrapper imageUrl={user.imageUrl} />
                  <p className="text-sm font-medium">{user.name}</p>
                </div>

                <Button
                  onClick={() => handleInvite(user.connectionId)}
                  className="border-2 border-tealGreen text-xs px-2.5 py-1 h-6 hover:bg-tealGreen hover:text-white"
                >
                  Invite
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>

        {data2.length === 0 && (
          <h1 className="font-bold text-md mt-10">No friends to be invited</h1>
        )}
      </SheetContent>
    </Sheet>
  );
};
