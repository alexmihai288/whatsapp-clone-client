import { currentProfile } from "@/lib/CurrentProfile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const groups = await db.group.findMany({
      where: {
        members: {
          some: {
            memberId: profile?.userId,
          },
        },
      },
    });
    
    return NextResponse.json(groups);
  } catch (error) {
    return new NextResponse("Internal Error");
  }
}
