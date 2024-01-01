import { FC, Suspense } from "react";
import { AvatarWrapper } from "./AvatarWrapper";
import { ClerkLoaded, ClerkLoading, SignedIn, UserButton } from "@clerk/nextjs";
import { HomeIcons } from "./HomeIcons";
import { ConversationIcons } from "@/app/conversations/_components/ConversationIcons";
import { currentProfile } from "@/lib/CurrentProfile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
interface HeaderProps {
  imageUrl: string;
  name?: string;
  whereClause: "home" | "conversation";
}

export const Header: FC<HeaderProps> = async ({
  imageUrl,
  name,
  whereClause,
}) => {
  const profile = await currentProfile();
  if (!profile?.userId) return redirect("/setup");

  const initialUsers = await db.profile.findMany({
    take: 10,
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
          <p className="text-sm">{name}</p>
        </div>
      ) : (
        <>
          <ClerkLoading>
            <Skeleton className="rounded-full h-8 w-8 bg-darkTealGreenDark" />
          </ClerkLoading>
          <UserButton />
        </>
      )}
      <div className="flex items-center gap-2.5 ml-auto">
        {whereClause === "home" && <HomeIcons initialUsers={initialUsers} />}
        {whereClause === "conversation" && <ConversationIcons />}
      </div>
    </div>
  );
};
