import Link from "next/link";
import { getUsers } from "../services/users";

const Users = async () => {

    const users = await getUsers()

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <ul className="space-y-2">
                {users.map(u => (
                    <li key={u.id} className="border rounded p-3 hover:bg-gray-50">
                        <Link href={`/users/${u.username}` } className="text-blue-600 hover:underline">
                        {u.name} 
                        </Link>
                    </li>
                ))}        
            </ul>
        </div>
    )

}

export default Users