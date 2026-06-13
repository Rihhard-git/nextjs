"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "../../db"
import { users } from "../../db/schema"

export const registerUser = async (prevState: { errors: object }, formData: FormData) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errors : any = {}

  if (!username || username.length < 4) {
    errors.username = "Username is too short!"
  }
  if (!password || password.length < 4) {
    errors.password = "Password is too short!"
  }
  if (!confirmPassword || password !== confirmPassword) {
    errors.confirm = "Passwords doesn't match"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name }}
  }




  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}