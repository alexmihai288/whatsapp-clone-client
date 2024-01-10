import { currentProfile } from "@/lib/CurrentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    let conversastionToBeDeleted = await db.conversation.findFirst({
      where: {
        id: params.conversationId,
      },
    });

    if (!conversastionToBeDeleted)
      return new NextResponse("Bad request", { status: 500 });

    if (conversastionToBeDeleted)
      conversastionToBeDeleted = await db.conversation.delete({
        where: {
          id: params.conversationId,
        },
      });


    return NextResponse.json(conversastionToBeDeleted);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error");
  }
}
