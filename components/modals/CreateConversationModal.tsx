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
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/queryFns/fetchUsers";

interface CreateConversationModalProps {}

export const CreateConversationModal: FC<
  CreateConversationModalProps
> = ({}) => {
  const [name, setName] = useState("");

  const { isOpen, type, onClose, data } = useModal();

  const isModalOpen = isOpen && type === "createConversation";

  console.log(data.initialUsers);
  const {
    data: users,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers({ name }),
    initialData: data.initialUsers,
  });

  useEffect(() => {
    refetch();
  }, [name, refetch]);

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
        />
      </DialogContent>
    </Dialog>
  );
};
