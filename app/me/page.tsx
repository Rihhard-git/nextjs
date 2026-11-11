
import { getCurrentUser } from "../services/sessions"
import { generateToken } from "../actions/me"
import { getReadingListByUserId } from "../services/users"
import Link from "next/link"
import { markBlogAsRead } from "../actions/blogs"
import { redirect } from "next/navigation"


const ProfilePage = async () => {

    const loggedUser = await getCurrentUser()

    if (!loggedUser) {
        redirect("/login")
    }
    const readingList = await getReadingListByUserId(loggedUser?.id || 0)
    const read = readingList.filter((entry) => entry.read === 1)
    const unread = readingList.filter((entry) => entry.read === 0)
    
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 data-testid="user-profile" className="text-2xl font-bold mb-4">My Profile</h2>
            <p data-testid="user-name" className="mb-2"><strong>Name: </strong>{loggedUser?.name}</p>
            <p data-testid="user-username" className="mb-2"><strong>Username: </strong>{loggedUser?.username}</p>
            <hr className="mb-2"/>
            <h2 data-testid="reading-list-section" className="text-2xl font-bold mb-4">Reading List</h2>
            <h3 data-testid="no-unread-blogs" className="text-xl font-bold mb-4">Unread ({unread.length})</h3>
            {readingList.length 
            ?
            <div>
            <ul data-testid="unread-section" className="space-y-2">
                {unread.map((b) => (
                    <li key={b.id} className="p-3 hover:bg-gray-50 gap-4 flex items-center justify-between">
                        <Link key={b.id} href={`/blogs/${b.blogId}`} className="text-blue-600 hover:underline">
                            {b.blog.title}
                        </Link>
                        <form action={markBlogAsRead}>
                            <input type="hidden" name="id" value={b.blog.id}/>
                            <button data-testid="mark-read-" type="submit" className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded">
                                Mark as Read
                            </button>
                        </form>
                    </li>
                ))}
            </ul>
            <h3 className="text-xl font-bold mb-4">Read ({read.length})</h3>
            <ul className="space-y-2">
                {read.map((b) => (
                    <li key={b.id} className="p-3 hover:bg-gray-50 gap-4 flex items-center justify-between">
                        <Link key={b.id} href={`/blogs/${b.blogId}`} className="text-blue-600 hover:underline">
                            {b.blog.title}
                        </Link>
                    </li>
                ))}
            </ul>
            </div>
            :    
  
            <p data-testid="empty-reading-list">Your reading list is empty.</p>
            }
            <hr className="mb-2"/> 
            <h2 data-testid="api-token-section" className="text-2xl font-bold mb-4">API Token</h2>
            {loggedUser?.token ?
                <>
                    <p data-testid="token-display">Current token: </p>
                    <p data-testid="api-token" className="m-2">{loggedUser?.token}</p>
                </>   
            :
                <>
                    <p data-testid="no-token-message">No token has been generated yet</p>
                </>
            }
            <button data-testid="generate-token-button" onClick={generateToken} className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-white m-2">Generate New Token</button>
            
        </div>
    )
}

export default ProfilePage