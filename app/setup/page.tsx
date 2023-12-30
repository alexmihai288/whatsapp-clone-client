import { initialProfile } from "@/lib/InitialProfile";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const profile = await initialProfile();

  if (profile) return redirect("/");
  return null;
};

export default page;
