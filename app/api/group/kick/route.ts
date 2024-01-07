import { currentProfile } from "@/lib/CurrentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const { groupMemberId, groupId, userId } = await req.json();

    const isGroupOwner = await db.groupMember.findFirst({
      where: {
        id: groupMemberId,
        groupId: groupId,
        memberId: userId,
        isOwner: true,
      },
    });

  

    if (isGroupOwner) {
      return new NextResponse(
        "Unauthorized - Only group owners can kick members",
        { status: 401 }
      );
    }

    const kickedUser = await db.groupMember.delete({
      where: {
        id: groupMemberId,
        groupId: groupId,
        memberId: userId,
      },
      include: {
        member: true,
      },
    });

    return NextResponse.json(kickedUser);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
