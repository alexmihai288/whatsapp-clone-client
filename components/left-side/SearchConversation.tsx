import { FC } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface SearchConversationProps {}

export const SearchConversation: FC<SearchConversationProps> = ({}) => {
  return (
    <div className="bg-darkTealGreenDark container py-2 flex items-center">
      <div className="bg-darkTealGreen pl-3 h-8 flex items-center justify-center rounded-tl-md rounded-bl-md">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input
        placeholder="Search for a conversation"
        className="placeholder:text-muted-foreground rounded-tl-none rounded-bl-none bg-darkTealGreen h-8 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};
