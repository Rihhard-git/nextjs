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
        <div>
            <h2>Blogs</h2>
            <form action={searchBlog}>
                <input type="text" name="search" />
                <button type="submit">search</button>
            </form>
            <ul>
                {blogsToShow.map(b => (
                    <li key={b.id}>
                        <Link href={`/blogs/${b.id}`}>
                        {b.title} 
                        </Link>
                    </li>
                ))}        
            </ul>
        </div>
    )
}
export default Blogs
