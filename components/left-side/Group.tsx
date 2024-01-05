"use client";
import { FC } from "react";
import { AvatarWrapper } from "../AvatarWrapper";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
interface ConversationProps {
  name: string;
  imageUrl: string;
  groupId: string;
  whereClause?: string;
}

export const Group: FC<ConversationProps> = ({
  name,
  imageUrl,
  groupId,
  whereClause,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      onClick={() => router.push(`/groups/${groupId}`)}
      className={cn(
        "bg-darkTealGreenDark hover:bg-[#202c33] rounded-md cursor-pointer transition-colors container py-2 flex items-center gap-2.5",
        pathname.includes(groupId) && "bg-[#2a3942]",
        whereClause === "drawer" && "mt-2.5 "
      )}
    >
      <AvatarWrapper
        imageUrl={imageUrl}
        className="self-start w-7 h-7 sm:h-10 sm:w-10 object-cover"
      />
      <div className="w-full border-b-2 pb-2">
        <div className="">
          <h1 className="text-sm truncate max-w-36">{name}</h1>
          <p className="text-xs text-muted-foreground">Last message</p>
        </div>
      </div>
    </div>
  );
};
