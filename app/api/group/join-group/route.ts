import { currentProfile } from "@/lib/CurrentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const { groupId } = await req.json();

    const isAlreadyIn = await db.groupMember.findFirst({
      where: {
        groupId,
        memberId: profile.userId,
      },
    });

    if (isAlreadyIn)
      return new NextResponse("Already in the group", { status: 400 });

    const newGroupMember = await db.groupMember.create({
      data: {
        isOwner: false,
        memberId: profile.userId,
        groupId,
      },
      include: {
        Group: true,
      },
    });

    return NextResponse.json(newGroupMember.Group);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
