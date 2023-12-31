import { FC } from "react";
import { Header } from "../Header";
import { SearchConversation } from "./SearchConversation";
import { Feed } from "./Feed";

interface LeftSideProps {}

export const LeftSide: FC<LeftSideProps> = () => {
  return (
    <div className="flex flex-col max-h-screen">
      <Header whereClause="home" imageUrl="/whatsapp-bg.webp" />
      <SearchConversation />
      <Feed />
    </div>
  );
};
