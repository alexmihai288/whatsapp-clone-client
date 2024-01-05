import { currentProfile } from "@/lib/CurrentProfile";
import { db } from "@/lib/db";
import { revalidatePathUrl } from "@/lib/revalidatePath";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const { name, imageUrl } = await req.json();

    const group = await db.group.create({
      data: {
        name,
        imageUrl,
        members: {
          create: [
            {
              isOwner: true,
              memberId: profile.userId,
            },
          ],
        },
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
