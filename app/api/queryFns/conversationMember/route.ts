import { currentProfile } from "@/lib/CurrentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const conversations = await db.conversation.findMany({
      where: {
        OR: [
          {
            memberOneId: profile?.userId,
          },
          {
            memberTwoId: profile?.userId,
          },
        ],
      },
      include: {
        memberOne: true,
        memberTwo: true,
      },
    });

    return NextResponse.json(conversations);
  } catch (error) {
    return new NextResponse("Internal Error");
  }
}
