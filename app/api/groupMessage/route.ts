import { currentProfile } from "@/lib/CurrentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const { value, fileUrl, groupId } = await req.json();

    const newMessage = await db.groupMessage.create({
      data: {
        content: value,
        memberId: profile.userId,
        groupId,
        fileUrl: fileUrl,
      },
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
