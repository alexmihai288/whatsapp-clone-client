import { currentProfile } from "@/lib/CurrentProfile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const groupId = req.nextUrl.searchParams.get("groupId");
    const ownerId = req.nextUrl.searchParams.get("ownerId");

    const groupMembers = await db.groupMember.findMany({
      where: {
        groupId: groupId!,
        memberId: {
          not: ownerId!, // Exclude the specified user from the group members
        },
      },
      include: {
        member: true, // Include the associated Profile data for each member
      },
    });

    return NextResponse.json(groupMembers);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
