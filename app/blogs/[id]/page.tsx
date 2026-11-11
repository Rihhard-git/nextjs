import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs"
import { addToReadingList, likeABlog } from "@/app/actions/blogs";
import { getCurrentUser } from "@/app/services/sessions";
import { getReadingListByUserId } from "@/app/services/users";

const BlogPage = async ({ params }: { params: Promise<{ id: string}> }) => {
    const { id } = await params

    const blog = await getBlogById(Number(id))
    const currentUser = await getCurrentUser()
    const userData = await getReadingListByUserId(currentUser?.id || 0)
    const isInReadingList = userData.some((entry) => entry.blogId === Number(id))

    if (!blog) {
        notFound()
    }

    return (
        <div data-testid="blog-detail" className="max-w-2xl mx-auto p-6 border rounded m-6" >
            <h2 data-testid="blog-title" className="text-2xl font-bold mb-4">{blog.title}</h2>
            <p data-testid="blog-author" className="mb-2">Author: {blog.author}</p>
            <p data-testid="blog-url" className="mb-2">URL: {blog.url}</p>
            <p data-testid="blog-likes" className="mb-2">Likes: {blog.likes}</p>
            <form action={likeABlog}>
                <input type="hidden" name="id" value={blog.id}/>
                <button type="submit" className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded">
                    Like
                </button>
            </form>
            {!isInReadingList && (
                <form action={addToReadingList}>
                    <input type="hidden" name="blogId" value={blog.id}/>
                    <input type="hidden" name="userId" value={currentUser?.id}/>
                    <button data-testid="add-to-reading-list-button" type="submit" className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded mt-2">
                        Add to Reading List
                    </button>
                </form>
            )}
            {isInReadingList && (
                <p className="text-green-500 mt-2">Already in your reading list.</p>
            )}
        </div>
    )
}

export default BlogPage