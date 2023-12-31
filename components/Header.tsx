import { FC } from "react";
import { AvatarWrapper } from "./AvatarWrapper";
import { UserButton } from "@clerk/nextjs";
import { HomeIcons } from "./HomeIcons";
import { ConversationIcons } from "@/app/conversations/_components/ConversationIcons";
import { currentProfile } from "@/lib/CurrentProfile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
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
          <AvatarWrapper imageUrl={imageUrl} />
          <p className="text-sm">{name}</p>
        </div>
      ) : (
        <UserButton />
      )}
      <div className="flex items-center gap-2.5">
        {whereClause === "home" && <HomeIcons initialUsers={initialUsers} />}
        {whereClause === "conversation" && <ConversationIcons />}
      </div>
    </div>
  );
};
