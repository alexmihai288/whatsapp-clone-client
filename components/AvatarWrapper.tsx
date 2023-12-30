import { FC } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarWrapperProps {
  imageUrl: string;
  className?: string;
}

export const AvatarWrapper: FC<AvatarWrapperProps> = ({
  imageUrl,
  className,
}) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={imageUrl} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
