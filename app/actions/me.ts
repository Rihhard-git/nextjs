"use server"

import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { setToken } from "../services/users"

export const generateToken = async () => {

    const session = await auth()
    if (!session) {
        return
    }

    const token = crypto.randomUUID()

    await setToken(session?.user?.email, token)
    revalidatePath("/me")   
}