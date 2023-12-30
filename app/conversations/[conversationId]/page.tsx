import { LeftSide } from "@/components/left-side/LeftSide";
import { FC } from "react";

interface pageProps {
  params: { conversationId: string };
}

const page: FC<pageProps> = ({ params }) => {
  return (
    <div className="flex items-center">
      <div className="flex-1">
        <LeftSide whereClause="conversation" />
      </div>
      <div className="flex-1">{params.conversationId}</div>
    </div>
  );
};

export default page;
