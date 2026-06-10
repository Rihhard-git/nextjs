"use server"

import { redirect } from "next/navigation"
import { addBlog, addLike } from "../services/blogs"
import { revalidatePath } from "next/cache"

export const createBlog = async (formData: FormData) => {
    const title = formData.get("title") as string
    const author = formData.get("author") as string
    const url = formData.get("url") as string
    addBlog(title, author, url)
    revalidatePath("/blogs")
    redirect("/blogs")
}

export const likeABlog = async (formData: FormData) => {
    const id = Number(formData.get('id'))
    addLike(id)
    revalidatePath(`/blogs/${id}`)
    revalidatePath("/blogs")
}

export const searchBlog = async (formData: FormData) => {
    const search = formData.get("search")
    redirect(`/blogs?filter=${search}`)
}