import { LeftSide } from "@/components/left-side/LeftSide";

export default function Home() {
  return (
    <div className="flex">
      <div className="flex-1">
        <LeftSide />
      </div>
      <div className="hidden md:flex md:flex-1 bg-red-600">content de ala</div>
    </div>
  );
}
