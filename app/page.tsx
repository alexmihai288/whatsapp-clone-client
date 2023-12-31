import { NativeBg } from "@/components/NativeBg";
import { LeftSide } from "@/components/left-side/LeftSide";

export default function Home() {
  return (
    <div className="flex">
      <div className="flex-1">
        <LeftSide />
      </div>
      <div className="hidden xs:flex xs:flex-1">
        <NativeBg />
      </div>
    </div>
  );
}
