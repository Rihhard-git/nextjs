import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { blogs, readingList } from "../../db/schema";
import { getCurrentUser } from "./sessions";

export const getBlogs = async () => db.query.blogs.findMany();

export const getBlogById = async (id: number) => db.query.blogs.findFirst({where: eq(blogs.id, id)})

export const addBlog = async (title: string, author: string, url: string) => {

    const user = await getCurrentUser()
    if (!user) {
        throw new Error("Not logged id")
    }

    const res = await db.insert(blogs).values({ title, author, url, userId: user.id}).returning({ insertedId: blogs.id })
    await db.insert(readingList).values({ userId: user.id, blogId: res[0].insertedId, read: 0})
}

export const addLike = async (id: number) => {

    const blog = await getBlogById(id)
    if (blog) {
        await db
            .update(blogs)
            .set({ likes: blog.likes +1})
            .where(eq(blogs.id, id))
    }
}

export const markAsRead = async (blogId: number) => {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error("Not logged in")
    }

    const readingListEntry = await db.query.readingList.findFirst({
        where: (rl) => and(eq(rl.blogId, blogId), eq(rl.userId, user.id))
    })
    
    if (readingListEntry) {
        await db
            .update(readingList)
            .set({ read: 1 })
            .where(eq(readingList.id, readingListEntry.id))
    }
}

export const addBlogToUsersReadingList = async (blogId: number, userId: number) => {
    await db.insert(readingList).values({ userId, blogId, read: 0 })
}