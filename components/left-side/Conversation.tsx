"use client";
import { FC } from "react";
import { AvatarWrapper } from "../AvatarWrapper";
import { Profile } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
interface ConversationProps {
  conversationMember: Profile;
  conversationId: string;
}

export const Conversation: FC<ConversationProps> = ({
  conversationMember,
  conversationId,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      onClick={() => router.push(`/conversations/${conversationId}`)}
      className={cn(
        " bg-darkTealGreenDark hover:bg-[#202c33] cursor-pointer transition-colors container py-2 flex items-center gap-2.5",
        pathname.includes(conversationId) && "bg-[#202c33]"
      )}
    >
      <AvatarWrapper
        imageUrl={conversationMember.imageUrl}
        className="self-start"
      />
      <div className="flex justify-between w-full border-b-2 pb-2">
        <div className="">
          <h1>{conversationMember.name}</h1>
          <p className="text-xs text-muted-foreground">Last message</p>
        </div>
        <p className="text-xs text-muted-foreground mb-auto">12:55</p>
      </div>
    </div>
  );
};
