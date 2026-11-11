import { resetDatabase } from "@/app/services/testing";
import { NextResponse, NextRequest } from "next/server";


export const DELETE = async (req: NextRequest) => {
    
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: "Not allowed in production"}, {status: 403})
  }

  await resetDatabase()

  return NextResponse.json({ message: "Database reset successful" }, { status: 200 })
}