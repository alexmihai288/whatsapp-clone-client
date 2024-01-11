import { currentProfile } from "@/lib/CurrentProfile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{params}:{params:{groupId:string, ownerId:string}}) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const groupMembers = await db.groupMember.findMany({
      where: {
        groupId: params.groupId,
        memberId: {
          not: params.ownerId, // Exclude the specified user from the group members
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
