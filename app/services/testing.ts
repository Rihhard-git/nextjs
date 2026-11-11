import { db } from "@/db"
import { blogs, readingList, users } from "@/db/schema"
import bcrypt from "bcryptjs"

export const resetDatabase = async () => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error("Not allowed in production")
  }

  await db.delete(readingList)
  await db.delete(blogs)
  await db.delete(users)
}

export const seedDatabase = async (username: string, name: string, password: string) => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error("Not allowed in production")
  }
  const passwordHash = await bcrypt.hash(password, 10)
  
  await db.insert(users).values({ username, name, passwordHash })
}