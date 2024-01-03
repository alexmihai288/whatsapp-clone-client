import { FC } from "react";
import { InitSocket } from "./SocketProvider";
import { currentProfile } from "@/lib/CurrentProfile";

interface SocketContainerProps {}

export const SocketContainer: FC<SocketContainerProps> = async ({}) => {
  const profile = await currentProfile();

  return <InitSocket connectionId={profile?.connectionId!} />;
};
