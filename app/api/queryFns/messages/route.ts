import { currentProfile } from "@/lib/CurrentProfile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const conversationId = req.nextUrl.searchParams.get("conversationId");

    const messages = await db.message.findMany({
      where: {
        conversationId: conversationId!,
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
