import { currentProfile } from "@/lib/CurrentProfile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    // const name = req.nextUrl.searchParams.get("name");

    const existingConversations = await db.conversation.findMany({
      where: {
        OR: [{ memberOneId: profile.userId }, { memberTwoId: profile.userId }],
      },
    });

    // Extract user IDs from existing conversations
    const existingUserIds = existingConversations.flatMap((conversation) => [
      conversation.memberOneId,
      conversation.memberTwoId,
    ]);
    // Fetch users who don't have conversations with the current user

    const usersWithoutConversation = await db.profile.findMany({
      where: {
        userId: {
          notIn: [...existingUserIds, profile.userId],
        },
      },
    });

    return NextResponse.json(usersWithoutConversation);
  } catch (error) {
    return new NextResponse((error as Error).message);
  }
}
