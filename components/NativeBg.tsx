import Image from "next/image";
import { FC } from "react";
import { buttonVariants } from "./ui/button";
import { Lock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NativeBgProps {}

export const NativeBg: FC<NativeBgProps> = ({}) => {
  return (
    <div className="container py-5 flex flex-col gap-2.5 items-center justify-center w-full bg-darkTealGreen">
      <div className="flex-1 flex flex-col gap-2.5 items-center justify-center">
        <Image src="/native-bg.png" width={300} height={300} alt="native-bg"/>
        <p className="text-xl font-extralight">Download Whatsapp</p>
        <p className="text-xs text-center text-muted-foreground">
          Every day is a new opportunity to create, inspire, and cherish.
          Embrace the journey, learn from the challenges, and let gratitude be
          your guide. Life is a beautiful adventure waiting to unfold. ✨
          #LiveFully #LoveWholeheartedly
        </p>
        <Link
          href="https://www.whatsapp.com/download"
          target="_blank"
          className={cn(
            buttonVariants(),
            "bg-tealGreen hover:bg-[#06cf9c] transition-colors text-darkTealGreenDark"
          )}
        >
          Download the app
        </Link>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Lock className="w-3 h-3" />
        <p>Your messages are encrypted</p>
      </div>
    </div>
  );
};
