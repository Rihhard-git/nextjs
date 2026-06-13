import Link from "next/link"
import { getBlogs } from "../services/blogs"
import { searchBlog } from "../actions/blogs"


const Blogs = async ({ searchParams, } : { searchParams: Promise<{ filter?: string}> }) => {

    const { filter } = await searchParams

    const blogs = await getBlogs()
    blogs.sort((a,b) => b.likes - a.likes)



    const blogsToShow = filter
        ? blogs.filter(b => b.title.toLowerCase().includes(filter.toLowerCase()))
        : blogs



    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Blogs</h2>

                <form action={searchBlog}>
                <input type="text" name="search" className="border m-2 rounded" />
                <button type="submit">search</button>
                </form>
            
            <ul className="space-y-2">
                {blogsToShow.map(b => (
                    <li key={b.id} className="border rounded p-3 hover:bg-gray-50">
                        <Link href={`/blogs/${b.id}`} className="text-blue-600 hover:underline" >
                        {b.title} 
                        </Link>
                    </li>
                ))}        
            </ul>
        </div>
    )
}
export default Blogs
