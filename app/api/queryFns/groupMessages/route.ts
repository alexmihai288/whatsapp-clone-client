import { currentProfile } from "@/lib/CurrentProfile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const groupId = req.nextUrl.searchParams.get("groupId");

    const messages = await db.groupMessage.findMany({
      where: {
        groupId: groupId!,
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
