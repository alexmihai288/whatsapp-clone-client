"use client";
import { HomeIcons } from "@/components/HomeIcons";
import { Feed } from "@/components/left-side/Feed";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { ConversationWithMembers } from "@/types";
import { Profile } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDownCircle } from "lucide-react";
import { FC, useState } from "react";

interface DrawerWrapperProps {
  currentUserId: string;
}

export const DrawerWrapper: FC<DrawerWrapperProps> = ({ currentUserId }) => {
  const [rotate, setRotate] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setRotate(true);
    setTimeout(() => {
      setModalOpen(true);
    }, 300);
  };

  const handleClose = () => {
    setModalOpen(false);
    setTimeout(() => {
      setRotate(false);
    }, 300);
  };

  const queryClient = useQueryClient();

  return (
    <>
      <ChevronDownCircle
        onClick={handleClick}
        className={cn(
          "w-5 h-5 text-muted-foreground cursor-pointer xs:hidden transition-transform",
          rotate && "rotate-180 "
        )}
      />
      <Drawer
        open={modalOpen}
        onOpenChange={setModalOpen}
        onClose={handleClose}
      >
        <DrawerContent className="max-h-[500px] bg-white px-5">
          <div className="flex items-center justify-end gap-5 my-5">
            <HomeIcons
              initialUsers={queryClient.getQueryData(["users"]) as Profile[]}
            />
          </div>
          <Feed
            whereClause="drawer"
            currentUserId={currentUserId}
            conversations={
              queryClient.getQueryData([
                "conversationMember",
              ]) as ConversationWithMembers[]
            }
          />
        </DrawerContent>
      </Drawer>
    </>
  );
};
