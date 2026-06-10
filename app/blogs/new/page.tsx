import { createBlog } from "../../actions/blogs"

const NewBlog = () => {
    return (
        <div>
            <h2>Create a new Blog</h2>
            <form action={createBlog}>
                <div>
                    <label>Title</label>
                    <input type="text" name="title" required/>
                </div>
                <div>
                    <label>Author</label>
                    <input type="text" name="author" required/>
                </div>
                <div>
                    <label>Url</label>
                    <input type="text" name="url" required/>
                </div>   
                <button type="submit">Create</button>
            </form>
        </div>
    )
}
export default NewBlog