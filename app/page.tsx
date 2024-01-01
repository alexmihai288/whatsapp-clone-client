import { NativeBg } from "@/components/NativeBg";
import { LeftSide } from "@/components/left-side/LeftSide";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex overflow-hidden">
      <div className="flex-1">
        <Suspense fallback={<LeftSide.Skeleton />}>
          <LeftSide />
        </Suspense>
      </div>
      <div className="hidden xs:flex xs:flex-1">
        <NativeBg />
      </div>
    </div>
  );
}
