import { Header } from "../Header";
import { SearchConversation } from "./SearchConversation";
import { Feed } from "./Feed";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/CurrentProfile";
import { Skeleton } from "../ui/skeleton";
import { Search } from "lucide-react";

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

  const groups = await db.group.findMany({
    where: {
      members: {
        some: {
          memberId: profile?.userId,
        },
      },
    },
  });

  return (
    <div className="flex flex-col max-h-screen bg-darkTealGreenDark">
      <Header whereClause="home" imageUrl="/whatsapp-bg.webp" />
      <SearchConversation
        groups={groups}
        userConversations={conversations}
        currentUserId={profile?.userId!}
      />
      <Feed
        groups={groups}
        currentUserId={profile?.userId!}
        conversations={conversations}
      />
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
      <div className="w-full bg-darkTealGreenDark container py-2 flex items-center">
        <div className="cursor-pointer bg-darkTealGreen pl-3 h-8 flex items-center justify-center rounded-tl-md rounded-bl-md">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="cursor-pointer w-full text-muted-foreground rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md bg-darkTealGreen h-8 px-3 py-2 text-sm">
          Search for all conversations
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
