import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const conversations = await db.conversation.findMany();
    return NextResponse.json(conversations);
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
