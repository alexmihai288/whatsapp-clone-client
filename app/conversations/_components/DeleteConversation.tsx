"use client";

import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface DeleteConversationProps {
  conversationId: string;
}

export const DeleteConversation: FC<DeleteConversationProps> = ({
  conversationId,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: deleteConversation, isPending } = useMutation({
    mutationFn: async ({ conversationId }: { conversationId: string }) => {
      const { data } = await axios.delete(
        `/api/conversation/${conversationId}`
      );

      return data;
    },
    onSuccess: () => {
      toast.success("You have deleted the conversation");
      queryClient.invalidateQueries({ queryKey: ["conversationMember"] });
      router.push("/");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical key={3} className="w-5 h-5 text-muted-foreground ml-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "border-2 border-tealGreenDark bg-white",
          isPending && "bg-zinc-300"
        )}
      >
        <DropdownMenuItem
          onClick={() => deleteConversation({ conversationId })}
          className="cursor-pointer text-rose-500 hover:text-rose-400  font-medium"
        >
          Delete this conversation
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
