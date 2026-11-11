import { eq } from "drizzle-orm";
import { db } from "../../db";
import { readingList, users } from "../../db/schema";

export const getUsers = async () => db.query.users.findMany();

export const getUserByUsername = async (username: string) => 
    db.query.users.findFirst({
        where: eq(users.username, username),
        columns: { passwordHash: false, token: false },
        with: { createdBlogs: true, readingList: true },
    })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setToken = async (username: any, token: string) => {

    await db.update(users).set({token: token}).where(eq(users.username, username))
}
export const getUserByToken = async (token: string) => 
    db.query.users.findFirst({
        where: eq(users.token, token),
        columns: { passwordHash: false, token: false },
        with: { createdBlogs: true, readingList: true },
        
})

export const getReadingListByUserId = async (userId: number) =>
    db.query.readingList.findMany({
        where: eq(readingList.userId, userId),
        with: { blog: true }
    })
