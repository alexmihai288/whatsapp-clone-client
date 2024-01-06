import { FC } from "react";
import { AvatarWrapper } from "@/components/AvatarWrapper";
import { currentProfile } from "@/lib/CurrentProfile";
import { redirect } from "next/navigation";
import { GroupIcons } from "./GroupIcons";

interface GroupHeaderProps {
  imageUrl: string;
  name: string;
  groupId: string;
}

export const GroupHeader: FC<GroupHeaderProps> = async ({
  imageUrl,
  name,
  groupId,
}) => {
  const profile = await currentProfile();
  if (!profile?.userId) return redirect("/setup");

  return (
    <div className="border-l-2 border-[#2a3942] container py-2 bg-darkTealGreen flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <AvatarWrapper imageUrl={imageUrl} />{" "}
        <p className="text-sm  break-words  xs:truncate xs:max-w-12 sm:max-w-full mr-2.5">
          {name}
        </p>
      </div>

      <div className="flex items-center gap-2.5 ml-auto">
        <GroupIcons userId={profile.userId} groupId={groupId} />
      </div>
    </div>
  );
};
