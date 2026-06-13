'use client'

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
    const { data: session } = useSession()

    return (
        <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4">
            <Link href="/" className="hover:text-gray-300">Home</Link>
            { " | "}
            <Link href="/blogs" className="hover:text-gray-300">Blogs</Link>
            { " | "}
            <Link href="/users" className="hover:text-gray-300">Users</Link>
            { " | "}
            {session ? (
                <>
                    <Link href="/blogs/new" className="hover:text-gray-300">Create New</Link>
                    { " | "}
                    <em className="text-gray-300">{session.user?.name} logged in</em> {""}
                    <button onClick={() => signOut()} className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm">Logout</button>
                </>
            ) : (
                <>
                    <Link href="/login" className="hover:text-gray-300">Login</Link>
                    { " | "}
                    <Link href="/register" className="hover:text-gray-300">Register</Link>
                </>               
            )}        
        </nav>
    )
}