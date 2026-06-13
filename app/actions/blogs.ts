"use server"

import { redirect } from "next/navigation"
import { addBlog, addLike } from "../services/blogs"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export const createBlog = async (
    prevState: { error: string; success?: boolean },
    formData: FormData) => {

    const session = await auth()
    if (!session) {
        redirect("/login")
    }
    const title = formData.get("title") as string

    if (!title || title.length < 5) {
       return {
            error: "Blog title must be at least 5 characters long.",
            success: false
       }
    }
    const author = formData.get("author") as string
    if (!author || author.length < 5) {
        return {
            error: "Blog author must be at least 5 characters long.",
            success: false
       }
    }
    const url = formData.get("url") as string
    if (!url || url.length < 5) {
        return {
            error: "Blog author must be at least 5 characters long.",
            success: false
       }
    }

    await addBlog(title, author, url)
    revalidatePath("/blogs")
    return { error: "", success: true}

}

export const likeABlog = async (formData: FormData) => {
    const id = Number(formData.get('id'))
    await addLike(id)
    revalidatePath(`/blogs/${id}`)
    revalidatePath("/blogs")
}

export const searchBlog = async (formData: FormData) => {
    const search = formData.get("search")
    redirect(`/blogs?filter=${search}`)
}