"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import { FC, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/queryFns/fetchUsers";
import { ScrollArea } from "../ui/scroll-area";
import { AvatarWrapper } from "../AvatarWrapper";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useSocket } from "@/hooks/use-socket";

interface CreateConversationModalProps {}

export const CreateConversationModal: FC<
  CreateConversationModalProps
> = ({}) => {
  const [name, setName] = useState("");

  const { isOpen, type, onClose} = useModal();
  const isModalOpen = isOpen && type === "createConversation";

  const {
    data: users,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers({ name }),
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetch();
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [name, refetch]);

  console.log(users);

  const router = useRouter();

  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const { mutate: startConversation, isPending } = useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      const { data } = await axios.post("/api/conversation", { userId });
      return data;
    },
    onSuccess: (data) => {
      onClose();
      router.push(`/conversations/${data.id}`);
      toast.success("You started a new conversation");
      socket?.emit("send-start-conversation", data.memberTwo.connectionId);
      queryClient.invalidateQueries({ queryKey: ["conversationMember"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      return toast.error("Something went wrong");
    },
  });

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Search for people</DialogTitle>
        </DialogHeader>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white border-2 border-tealGreen focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="eg: name"
        />
        {users?.length === 0 ? (
          <p className="text-muted-foreground">No user: {name}</p>
        ) : (
          <div className="flex items-center gap-2.5">
            <p className="text-muted-foreground">Suggested users:</p>
            {isFetching && (
              <Loader2 className="animate-spin text-muted-foreground h-4 w-4" />
            )}
          </div>
        )}
        <ScrollArea className="h-48">
          <div className="space-y-2.5">
            {users &&
              users.length > 0 &&
              users?.map((user) => (
                <div
                  onClick={() => startConversation({ userId: user.userId })}
                  key={user.id}
                  className="flex items-center justify-between p-2 rounded-md hover:text-white hover:bg-tealGreen transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <AvatarWrapper imageUrl={user.imageUrl} />
                    {user.name}
                  </div>
                  <Button
                    disabled={isPending}
                    className="border border-tealGreen text-tealGreenDark"
                  >
                    Start conversation{" "}
                    {isPending && (
                      <Loader2 className="animate-spin ml-2 w-4 h-4" />
                    )}
                  </Button>
                </div>
              ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
