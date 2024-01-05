"use client";
import { FC } from "react";
import { AvatarWrapper } from "../AvatarWrapper";
import { Profile } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
interface ConversationProps {
  conversationMember: Profile;
  conversationId: string;
  whereClause?: string;
}

export const Conversation: FC<ConversationProps> = ({
  conversationMember,
  conversationId,
  whereClause,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      onClick={() => router.push(`/conversations/${conversationId}`)}
      className={cn(
        " bg-darkTealGreenDark  rounded-md hover:bg-[#202c33] cursor-pointer transition-colors container py-2 flex items-center gap-2.5",
        pathname.includes(conversationId) && "bg-[#2a3942]",
        whereClause === "drawer" && "bg-tealGreenDark hover:bg-tealGreen mt-2.5"
      )}
    >
      <AvatarWrapper
        imageUrl={conversationMember.imageUrl}
        className="self-start w-7 h-7 sm:h-10 sm:w-10 object-cover"
      />
      <div className="flex justify-between w-full border-b-2 pb-2">
        <div className="">
          <h1 className="text-sm truncate max-w-36">
            {conversationMember.name}
          </h1>
          <p className="text-xs text-muted-foreground">Last message</p>
        </div>
        <p className="text-xs text-muted-foreground mb-auto">12:55</p>
      </div>
    </div>
  );
};
