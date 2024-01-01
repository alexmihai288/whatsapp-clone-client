import { currentProfile } from "@/lib/CurrentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const { userId } = await req.json();

    if (!userId) return new NextResponse("UserId is empy", { status: 400 });

    const existingConversation = await db.conversation.findFirst({
      where: {
        OR: [
          {
            memberOneId: profile.userId,
            memberTwoId: userId,
          },
          {
            memberOneId: userId,
            memberTwoId: profile.userId,
          },
        ],
      },
    });

    if (existingConversation)
      return new NextResponse("Conversation already exists", { status: 400 });

      console.log(profile.userId, userId)
    const conversation = await db.conversation.create({
      data: {
        memberOneId: profile.userId,
        memberTwoId: userId,
      },
    });

    return NextResponse.json(conversation);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error");
  }
}
