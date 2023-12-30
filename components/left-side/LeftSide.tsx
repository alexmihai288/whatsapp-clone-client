import { FC } from "react";
import { Header } from "../Header";
import { SearchConversation } from "./SearchConversation";
import { Feed } from "./Feed";
import { currentProfile } from "@/lib/CurrentProfile";
import { redirect } from "next/navigation";

interface LeftSideProps {}

export const LeftSide: FC<LeftSideProps> = async () => {

  const profile = await currentProfile();
  if (!profile?.userId) return redirect("/setup");
  return (
    <div className="flex flex-col max-h-screen">
      <Header
        whereClause="home"
        imageUrl="/whatsapp-bg.webp"
      />
      <SearchConversation />
      <Feed />
    </div>
  );
};
