"use client"

import { useActionState, useEffect } from "react"
import { createBlog } from "../../actions/blogs"
import { useNotification } from "@/app/components/NotificationContext"
import { useRouter } from "next/navigation"

const NewBlog = () => {

    const [state, formAction] = useActionState(createBlog, { error: "", success: false })

    const { showNotification } = useNotification()
    const router = useRouter()

    useEffect(() => {
        if (state.success) {
            showNotification("blog created")
            router.push("/blogs")
        }
    }, [state, showNotification, router])
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Create a new Blog</h2>
            <form action={formAction} className="border rounded p-6">
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="Title" required className="border m-2 rounded"/>
                </div>
                <div>
                    <label htmlFor="author">Author</label>
                    <input type="text" id="author" name="Author" required className="border m-2 rounded"/>
                </div>
                <div>
                    <label htmlFor="url">URL</label>
                    <input type="text" id="url" name="URL" required className="border m-2 rounded"/>
                </div>   
                <button data-testid="create-blog-button" type="submit" className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded">Create</button>
                {state.error && <p style={{ color: "red" }}>{state.error}</p>}
            </form>
        </div>
    )
}
export default NewBlog