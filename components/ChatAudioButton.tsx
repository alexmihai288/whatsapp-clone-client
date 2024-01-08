"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Phone, PhoneOff } from "lucide-react";

export const ChatAudioButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isAudio = searchParams?.get("audio");

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          audio: isAudio ? undefined : true,
        },
      },
      { skipNull: true }
    );

    router.push(url);
  };

  const Icon = isAudio ? PhoneOff : Phone;

  return (
    <button onClick={onClick} className="hover:opacity-75 transition">
      <Icon key={2} className="w-5 h-5 text-muted-foreground" />
    </button>
  );
};
