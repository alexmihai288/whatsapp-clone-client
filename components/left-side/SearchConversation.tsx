"use client";
import { FC, useState } from "react";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { ConversationWithMembers } from "@/types";
import { AvatarWrapper } from "../AvatarWrapper";
import { useRouter } from "next/navigation";
import { Group } from "@prisma/client";

interface SearchConversationProps {
  userConversations: ConversationWithMembers[];
  groups: Group[];
  currentUserId: string;
}

export const SearchConversation: FC<SearchConversationProps> = ({
  userConversations,
  groups,
  currentUserId,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const handleOnConversationSelect = ({
    conversationId,
  }: {
    conversationId: string;
  }) => {
    setOpen(false);
    router.push(`/conversations/${conversationId}`);
  };

  const handleOnGroupSelect = ({ groupId }: { groupId: string }) => {
    setOpen(false);
    router.push(`/groups/${groupId}`);
  };

  return (
    <>
      <div className="w-full bg-darkTealGreenDark container py-2 flex items-center">
        <div
          onClick={() => setOpen(true)}
          className="cursor-pointer bg-darkTealGreen pl-3 h-8 flex items-center justify-center rounded-tl-md rounded-bl-md"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <div
          onClick={() => setOpen(true)}
          className="whitespace-nowrap max-w-full xs:max-w-56 sm:max-w-72 md:max-w-full truncate cursor-pointer w-full text-muted-foreground rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md bg-darkTealGreen h-8 px-3 py-2 text-sm"
        >
          Search your conversations and groups
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          className="bg-darkTealGreenDark"
          placeholder="Search your conversations and groups"
        />
        <CommandList className="bg-darkTealGreenDark">
          <CommandEmpty>No results found</CommandEmpty>
          <CommandGroup heading={"Your conversations"}>
            {userConversations?.map((conversation) => {
              const otherMember =
                conversation?.memberOne.userId === currentUserId
                  ? conversation?.memberTwo
                  : conversation?.memberOne;
              return (
                <CommandItem
                  key={conversation.id}
                  className=" aria-selected:bg-tealGreen cursor-pointer"
                  onSelect={() =>
                    handleOnConversationSelect({
                      conversationId: conversation.id,
                    })
                  }
                >
                  <AvatarWrapper imageUrl={otherMember.imageUrl} />
                  <span className="ml-2.5">{otherMember.name}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandGroup heading={"Your groups"}>
            {groups?.map((group) => {
              return (
                <CommandItem
                  key={group.id}
                  className=" aria-selected:bg-tealGreen cursor-pointer"
                  onSelect={() => handleOnGroupSelect({ groupId: group.id })}
                >
                  <AvatarWrapper imageUrl={group.imageUrl} />
                  <span className="ml-2.5">{group.name}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
