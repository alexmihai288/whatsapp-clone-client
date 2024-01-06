import { currentProfile } from "@/lib/CurrentProfile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const groupId = req.nextUrl.searchParams.get("groupId");

    const usersNotInGroupAndFriends = await db.profile.findMany({
      where: {
        userId: {
          not: profile.userId, // Exclude the current user from the results
        },
        groupsMember: {
          none: {
            groupId: groupId!, // Exclude users who are already in the specified group
          },
        },
        OR: [
          {
            conversationsInitiated: {
              some: {
                memberTwoId: profile.userId, // Check if the current user initiated conversations
              },
            },
          },
          {
            conversationsReceived: {
              some: {
                memberOneId: profile.userId, // Check if the current user received conversations
              },
            },
          },
        ],
      },
    });

    return NextResponse.json(usersNotInGroupAndFriends);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
