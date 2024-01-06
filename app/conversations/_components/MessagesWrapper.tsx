"use client";
import { FC, useEffect } from "react";
import { SendMessages } from "./SendMessages";
import { ChatMessages } from "./ChatMessages";
import { Group, Message } from "@prisma/client";
import { useSocket } from "@/hooks/use-socket";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMessages } from "@/lib/queryFns/fetchMessages";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

interface MessagesWrapperProps {
  conversationId: string;
  messages: Message[];
  currentMemberId: string;
  toMemberId: string;
}

export const MessagesWrapper: FC<MessagesWrapperProps> = ({
  messages,
  conversationId,
  currentMemberId,
  toMemberId,
}) => {
  const { data } = useQuery({
    queryKey: ["messages"],
    queryFn: () => fetchMessages({ conversationId }),
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
      socket?.emit("join-group", data.id);
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  useEffect(() => {
    if (!socket) return;

    socket.on(
      "receive-message",
      (value, fileUrl, currentMemberId, conversationId) => {
        if (pathname.includes(conversationId)) {
          queryClient.setQueryData(["messages"], (oldMessages: Message[]) => [
            ...oldMessages,
            { content: value, fileUrl: fileUrl, memberId: currentMemberId },
          ]);
        } else {
          toast.success("You got a new message", {
            action: {
              label: "Check",
              onClick: () => router.push(`/conversations/${conversationId}`),
            },
          });
        }
      }
    );

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
      "receive-group-message",
      (value, fileUrl, currentMemberId, groupId) =>
        toast.success("You got a new group message", {
          action: {
            label: "Check",
            onClick: () => router.push(`/groups/${groupId}`),
          },
        })
    );

    socket.on("receive-message-settled", () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    });
    return () => {
      socket.off("receive-message");
      socket.off("receive-message-settled");
      socket.off("receive-group-message");
      socket.off("receive-invite-to-group");
    };
  }, [queryClient, socket]);

  return (
    <>
      <ChatMessages currentUserId={currentMemberId} messages={data} />
      <SendMessages
        toMemberId={toMemberId}
        currentMemberId={currentMemberId}
        conversationId={conversationId}
      />
    </>
  );
};
