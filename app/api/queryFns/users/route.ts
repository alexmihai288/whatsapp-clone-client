import { currentProfile } from "@/lib/CurrentProfile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const name = req.nextUrl.searchParams.get("name");

    const existingConversations = await db.conversation.findMany({
      where: {
        OR: [{ memberOneId: profile.userId }, { memberTwoId: profile.userId }],
      },
    });

    const existingUserIds = existingConversations.flatMap((conversation) => [
      conversation.memberOneId,
      conversation.memberTwoId,
    ]);

    const users = await db.profile.findMany({
      where: {
        userId: {
          notIn: [...existingUserIds],
          not: profile.userId,
        },
        // You can add additional conditions if needed
      },
      take: 10,
    });

    return NextResponse.json(users);
  } catch (error) {
    return new NextResponse("Internal Error");
  }
}
