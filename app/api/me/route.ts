import { getUserByToken } from "@/app/services/users";
import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";


export const GET = async (req: NextRequest) => {
    const authHeader = req.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Authorization missing'}, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')

    const user = await getUserByToken(token)




    if (!user) {
        return NextResponse.json({ error: "Unauthorized"}, {status: 401})
    }

    return NextResponse.json(user)



}