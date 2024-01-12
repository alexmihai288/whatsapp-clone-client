import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allConversations = await db.conversation.findMany();
    return NextResponse.json({allConversations:allConversations},{status:200})
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
