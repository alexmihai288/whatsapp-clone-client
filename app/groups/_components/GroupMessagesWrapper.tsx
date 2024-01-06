"use client";
import { FC, useEffect } from "react";
import { Group, GroupMessage } from "@prisma/client";
import { useSocket } from "@/hooks/use-socket";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetchGroupMessages } from "@/lib/queryFns/fetchGroupMessages";
import { SendGroupMessages } from "./SendGroupMessages";
import { GroupChatMessages } from "./GroupChatMessages";
import axios from "axios";

interface MessagesWrapperProps {
  groupId: string;
  messages: GroupMessage[];
  currentMemberId: string;
}

export const GroupMessagesWrapper: FC<MessagesWrapperProps> = ({
  groupId,
  messages,
  currentMemberId,
}) => {
  const { data } = useQuery({
    queryKey: ["groupMessages"],
    queryFn: () => fetchGroupMessages({ groupId }),
    initialData: messages,
  });

  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  const { mutate: joinGroup, isPending } = useMutation({
    mutationFn: async (groupId) => {
      const { data } = await axios.post("/api/group/join-group", { groupId });
      return data as Group;
    },
    onSuccess: (data) => {
      toast.success(`You have joined ${data.name}`);
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      socket?.emit("join-group", data.id);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  useEffect(() => {
    if (!socket) return;

    socket.on("receive-invite-to-group", (groupId) => {
      toast.success("You got a group invitation", {
        actionButtonStyle: {
          color: isPending ? "bg-zinc-400" : "",
        },
        action: {
          label: "Join",
          onClick: () => joinGroup(groupId),
        },
      });
    });

    socket.on(
      "receive-message",
      (value, fileUrl, currentMemberId, conversationId) =>
        toast.success("You got a new message", {
          action: {
            label: "Check",
            onClick: () => router.push(`/conversations/${conversationId}`),
          },
        })
    );

    socket.on(
      "receive-group-message",
      (value, fileUrl, currentMemberId, groupId) => {
        if (pathname.includes(groupId)) {
          queryClient.setQueryData(
            ["groupMessages"],
            (oldMessages: GroupMessage[]) => [
              ...oldMessages,
              { content: value, fileUrl: fileUrl, memberId: currentMemberId },
            ]
          );
        } else {
          toast.success("You got a new group message", {
            action: {
              label: "Check",
              onClick: () => router.push(`/groups/${groupId}`),
            },
          });
        }
      }
    );

    socket.on("receive-group-message-settled", () => {
      queryClient.invalidateQueries({ queryKey: ["groupMessages"] });
    });
    return () => {
      socket.off("receive-invite-to-group");
      socket.off("receive-group-message");
      socket.off("receive-group-message-settled");
      socket.off("receive-message");
    };
  }, [queryClient, socket]);

  return (
    <>
      <GroupChatMessages currentUserId={currentMemberId} messages={data} />
      <SendGroupMessages currentMemberId={currentMemberId} groupId={groupId} />
    </>
  );
};
