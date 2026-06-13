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
                    <label>Title</label>
                    <input type="text" name="title" required className="border m-2 rounded"/>
                </div>
                <div>
                    <label>Author</label>
                    <input type="text" name="author" required className="border m-2 rounded"/>
                </div>
                <div>
                    <label>Url</label>
                    <input type="text" name="url" required className="border m-2 rounded"/>
                </div>   
                <button type="submit" className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded">Create</button>
                {state.error && <p style={{ color: "red" }}>{state.error}</p>}
            </form>
        </div>
    )
}
export default NewBlog