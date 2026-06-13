import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs"
import { likeABlog } from "@/app/actions/blogs";

const BlogPage = async ({ params }: { params: Promise<{ id: string}> }) => {
    const { id } = await params

    const blog = await getBlogById(Number(id))

    if (!blog) {
        notFound()
    }

    return (
        <div className="max-w-2xl mx-auto p-6 border rounded m-6" >
            <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
            <p className="mb-2">Author: {blog.author}</p>
            <p className="mb-2">URL: {blog.url}</p>
            <p className="mb-2">Likes: {blog.likes}</p>
            <form action={likeABlog}>
                <input type="hidden" name="id" value={blog.id}/>
                <button type="submit" className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded">
                    Like
                </button>
            </form>
        </div>
    )
}

export default BlogPage