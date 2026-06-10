const blogs = [
    {
        id: 1,
        title: "First Blog",
        author: "NextJs",
        url: "nextjs.com",
        likes: 0
    },
    {
        id: 2,
        title: "Second Blog",
        author: "JSNext",
        url: "nextjs.com",
        likes: 0
    },
    {
        id: 3,
        title: "Third Blog",
        author: "Unknown",
        url: "nextjs.com",
        likes: 2
    }
]

let nextId = 4;

export const getBlogs = () => blogs;

export const addBlog = (title: string, author: string, url: string) => {
    blogs.push({id: nextId++, title, author, url, likes: 0})
}
export const getBlogById = (id: number) => blogs.find(b => b.id === id)

export const addLike = (id: number) => {
    const blog = blogs.find(b => b.id === id)
    if (blog) {
        blog.likes++;
    }
}