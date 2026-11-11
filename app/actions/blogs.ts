"use server"

import { redirect } from "next/navigation"
import { addBlog, addBlogToUsersReadingList, addLike, markAsRead } from "../services/blogs"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export const createBlog = async (
    prevState: { error: string; success?: boolean },
    formData: FormData) => {

    const session = await auth()
    if (!session) {
        redirect("/login")
    }
    const title = formData.get("Title") as string

    if (!title || title.length < 5) {
       return {
            error: "Blog title must be at least 5 characters long.",
            success: false
       }
    }
    const author = formData.get("Author") as string
    if (!author || author.length < 5) {
        return {
            error: "Blog author must be at least 5 characters long.",
            success: false
       }
    }
    const url = formData.get("URL") as string
    if (!url || url.length < 5) {
        return {
            error: "Blog URL must be at least 5 characters long.",
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

export const markBlogAsRead = async (formData: FormData) => {
    const blogId = Number(formData.get("id"))
    await markAsRead(blogId)
    revalidatePath("/me")
}

export const addToReadingList = async (formData: FormData) => {
    const blogId = Number(formData.get("blogId"))
    const userId = Number(formData.get("userId"))
    await addBlogToUsersReadingList(blogId, userId)
    revalidatePath("/me")
}