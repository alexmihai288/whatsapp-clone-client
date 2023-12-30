import { cn } from "@/lib/utils";
import { FC } from "react";
import { LeftSideHeader } from "./LeftSideHeader";
import { SearchConversation } from "./SearchConversation";
import { Feed } from "./Feed";

interface LeftSideProps {
  whereClause?: "conversation";
}

export const LeftSide: FC<LeftSideProps> = ({ whereClause }) => {
  return (
    <div
      className={cn(
        `${whereClause === "conversation" && "hidden md:flex"}`,
        "flex flex-col max-h-screen"
      )}
    >
      <LeftSideHeader />
      <SearchConversation />
      <Feed />
    </div>
  );
};
