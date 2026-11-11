import { seedDatabase } from "@/app/services/testing";
import { NextResponse, NextRequest } from "next/server";


export const POST = async (req: NextRequest) => {
    
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: "Not allowed in production"}, {status: 403})
  }

  const { username, name, password } = await req.json()
  await seedDatabase(username, name, password)

  return NextResponse.json({ message: "User created successfully" }, { status: 201 })
}