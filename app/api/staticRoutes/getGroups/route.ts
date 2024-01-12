import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allGroups = await db.group.findMany();
    return NextResponse.json({ allGroups: allGroups }, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
