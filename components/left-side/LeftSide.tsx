import { Header } from "../Header";
import { SearchConversation } from "./SearchConversation";
import { Feed } from "./Feed";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/CurrentProfile";
import { Skeleton } from "../ui/skeleton";

export const LeftSide = async () => {
  const profile = await currentProfile();

  const conversations = await db.conversation.findMany({
    where: {
      OR: [
        {
          memberOneId: profile?.userId,
        },
        {
          memberTwoId: profile?.userId,
        },
      ],
    },
    include: {
      memberOne: true,
      memberTwo: true,
    },
  });

  return (
    <div className="flex flex-col max-h-screen">
      <Header whereClause="home" imageUrl="/whatsapp-bg.webp" />
      <SearchConversation />
      <Feed currentUserId={profile?.userId!} conversations={conversations} />
    </div>
  );
};

LeftSide.Skeleton = function LeftSideSkeleton() {
  return (
    <div className="flex flex-col max-h-screen flex-1">
      <div className="container py-2 bg-darkTealGreen flex items-center justify-between">
        <Skeleton className="rounded-full h-8 w-8" />
        <div className="flex items-center gap-2.5 ml-auto">
          <Skeleton className="bg-darkTealGreenDark rounded-full h-5 w-5" />
          <Skeleton className="bg-darkTealGreenDark h-5 w-2.5" />
        </div>
      </div>
      <SearchConversation />
      <div className="bg-darkTealGreenDark hover:bg-[#202c33] cursor-pointer transition-colors container py-2 flex items-center gap-2.5">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex justify-between w-full border-b-2 pb-2">
          <div className="space-y-2.5">
            <Skeleton className="h-3 w-52" />
            <Skeleton className="h-2 w-20" />
          </div>
          <Skeleton className="w-10 h-3" />
        </div>
      </div>{" "}
      <div className="bg-darkTealGreenDark hover:bg-[#202c33] cursor-pointer transition-colors container py-2 flex items-center gap-2.5">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex justify-between w-full border-b-2 pb-2">
          <div className="space-y-2.5">
            <Skeleton className="h-3 w-52" />
            <Skeleton className="h-2 w-20" />
          </div>
          <Skeleton className="w-10 h-3" />
        </div>
      </div>{" "}
      <div className="bg-darkTealGreenDark hover:bg-[#202c33] cursor-pointer transition-colors container py-2 flex items-center gap-2.5">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex justify-between w-full border-b-2 pb-2">
          <div className="space-y-2.5">
            <Skeleton className="h-3 w-52" />
            <Skeleton className="h-2 w-20" />
          </div>
          <Skeleton className="w-10 h-3" />
        </div>
      </div>{" "}
      <div className="bg-darkTealGreenDark hover:bg-[#202c33] cursor-pointer transition-colors container py-2 flex items-center gap-2.5">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex justify-between w-full border-b-2 pb-2">
          <div className="space-y-2.5">
            <Skeleton className="h-3 w-52" />
            <Skeleton className="h-2 w-20" />
          </div>
          <Skeleton className="w-10 h-3" />
        </div>
      </div>{" "}
      <div className="bg-darkTealGreenDark hover:bg-[#202c33] cursor-pointer transition-colors container py-2 flex items-center gap-2.5">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex justify-between w-full border-b-2 pb-2">
          <div className="space-y-2.5">
            <Skeleton className="h-3 w-52" />
            <Skeleton className="h-2 w-20" />
          </div>
          <Skeleton className="w-10 h-3" />
        </div>
      </div>{" "}
      <div className="bg-darkTealGreenDark hover:bg-[#202c33] cursor-pointer transition-colors container py-2 flex items-center gap-2.5">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex justify-between w-full border-b-2 pb-2">
          <div className="space-y-2.5">
            <Skeleton className="h-3 w-52" />
            <Skeleton className="h-2 w-20" />
          </div>
          <Skeleton className="w-10 h-3" />
        </div>
      </div>{" "}
      <div className="bg-darkTealGreenDark hover:bg-[#202c33] cursor-pointer transition-colors container py-2 flex items-center gap-2.5">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex justify-between w-full border-b-2 pb-2">
          <div className="space-y-2.5">
            <Skeleton className="h-3 w-52" />
            <Skeleton className="h-2 w-20" />
          </div>
          <Skeleton className="w-10 h-3" />
        </div>
      </div>{" "}
      <div className="bg-darkTealGreenDark hover:bg-[#202c33] cursor-pointer transition-colors container py-2 flex items-center gap-2.5">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex justify-between w-full border-b-2 pb-2">
          <div className="space-y-2.5">
            <Skeleton className="h-3 w-52" />
            <Skeleton className="h-2 w-20" />
          </div>
          <Skeleton className="w-10 h-3" />
        </div>
      </div>
      <div className="bg-darkTealGreenDark hover:bg-[#202c33] cursor-pointer transition-colors container py-2 flex items-center gap-2.5">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex justify-between w-full border-b-2 pb-2">
          <div className="space-y-2.5">
            <Skeleton className="h-3 w-52" />
            <Skeleton className="h-2 w-20" />
          </div>
          <Skeleton className="w-10 h-3" />
        </div>
      </div>{" "}
      <div className="bg-darkTealGreenDark hover:bg-[#202c33] cursor-pointer transition-colors container py-2 flex items-center gap-2.5">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex justify-between w-full border-b-2 pb-2">
          <div className="space-y-2.5">
            <Skeleton className="h-3 w-52" />
            <Skeleton className="h-2 w-20" />
          </div>
          <Skeleton className="w-10 h-3" />
        </div>
      </div>{" "}
      <div className="bg-darkTealGreenDark hover:bg-[#202c33] cursor-pointer transition-colors container py-2 flex items-center gap-2.5">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex justify-between w-full border-b-2 pb-2">
          <div className="space-y-2.5">
            <Skeleton className="h-3 w-52" />
            <Skeleton className="h-2 w-20" />
          </div>
          <Skeleton className="w-10 h-3" />
        </div>
      </div>{" "}
      <div className="bg-darkTealGreenDark hover:bg-[#202c33] cursor-pointer transition-colors container py-2 flex items-center gap-2.5">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex justify-between w-full border-b-2 pb-2">
          <div className="space-y-2.5">
            <Skeleton className="h-3 w-52" />
            <Skeleton className="h-2 w-20" />
          </div>
          <Skeleton className="w-10 h-3" />
        </div>
      </div>{" "}
      <div className="bg-darkTealGreenDark hover:bg-[#202c33] cursor-pointer transition-colors container py-2 flex items-center gap-2.5">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex justify-between w-full border-b-2 pb-2">
          <div className="space-y-2.5">
            <Skeleton className="h-3 w-52" />
            <Skeleton className="h-2 w-20" />
          </div>
          <Skeleton className="w-10 h-3" />
        </div>
      </div>{" "}
      <div className="bg-darkTealGreenDark hover:bg-[#202c33] cursor-pointer transition-colors container py-2 flex items-center gap-2.5">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex justify-between w-full border-b-2 pb-2">
          <div className="space-y-2.5">
            <Skeleton className="h-3 w-52" />
            <Skeleton className="h-2 w-20" />
          </div>
          <Skeleton className="w-10 h-3" />
        </div>
      </div>
    </div>
  );
};
