import { FC } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

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
      <AvatarFallback>
        <Skeleton className="rounded-full h-10 w-10" />
      </AvatarFallback>
    </Avatar>
  );
};
