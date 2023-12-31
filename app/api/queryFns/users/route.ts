import { currentProfile } from "@/lib/CurrentProfile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const name = req.nextUrl.searchParams.get("name");

    const users = await db.profile.findMany({
      where: {
        name: {
          contains: name || "",
        },
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    return new NextResponse("Internal Error");
  }
}
