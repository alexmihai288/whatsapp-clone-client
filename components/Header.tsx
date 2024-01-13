import { FC } from "react";
import { AvatarWrapper } from "./AvatarWrapper";
import { ClerkLoading, UserButton } from "@clerk/nextjs";
import { HomeIcons } from "./HomeIcons";
import { ConversationIcons } from "@/app/conversations/_components/ConversationIcons";
import { currentProfile } from "@/lib/CurrentProfile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Skeleton } from "./ui/skeleton";
interface HeaderProps {
  imageUrl: string;
  name?: string;
  whereClause: "home" | "conversation";
  conversationId?: string;
}

export const Header: FC<HeaderProps> = async ({
  imageUrl,
  name,
  whereClause,
  conversationId,
}) => {
  const profile = await currentProfile();
  if (!profile?.userId) return redirect("/setup");

  const existingConversations = await db.conversation.findMany({
    where: {
      OR: [{ memberOneId: profile.userId }, { memberTwoId: profile.userId }],
    },
  });

  // Extract user IDs from existing conversations
  const existingUserIds = existingConversations.flatMap((conversation) => [
    conversation.memberOneId,
    conversation.memberTwoId,
  ]);

  // Fetch users who don't have conversations with the current user
  const usersWithoutConversation = await db.profile.findMany({
    where: {
      userId: {
        notIn: [...existingUserIds, profile.userId],
      },
    },
  });

  return (
    <div
      className={`${
        whereClause === "conversation" && "border-l-2 border-[#2a3942]"
      } container py-2 bg-darkTealGreen flex items-center justify-between`}
    >
      {name ? (
        <div className="flex items-center gap-2.5">
          <AvatarWrapper imageUrl={imageUrl} />{" "}
          <p className="text-sm  break-words  xs:truncate xs:max-w-12 sm:max-w-full mr-2.5">
            {name}
          </p>
        </div>
      ) : (
        <>
          <ClerkLoading>
            <Skeleton className="rounded-full h-8 w-8 bg-darkTealGreenDark" />
          </ClerkLoading>
          <UserButton afterSignOutUrl="/" />
        </>
      )}
      <div className="flex items-center gap-2.5 ml-auto">
        {whereClause === "home" && <HomeIcons initialUsers={usersWithoutConversation} />}
        {whereClause === "conversation" && (
          <ConversationIcons conversationId={conversationId!} />
        )}
      </div>
    </div>
  );
};
