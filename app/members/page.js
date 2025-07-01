'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '../../lib/config';
import EditMember from './edit/[id]/page';

export default function MembersPage() {
    const [members, setMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const router = useRouter();

    const handleView = (id) => {
        router.push(`/members/${id}`);
    };

    const fetchMembers = async (page = 1) => {
        try {
            const res = await fetch(`${API_BASE_URL}/getAllMembers?page=${page}`);
            const data = await res.json();
            setMembers(data.data);
            setCurrentPage(data.current_page);
            setLastPage(data.last_page);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    useEffect(() => {
        fetchMembers(currentPage);
    }, [currentPage]);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Members List</h1>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member) => (
                            <tr key={member.id}>
                                <td className="border p-2">
                                    {member.first_name} {member.last_name}
                                </td>
                                <td className="border p-2 space-x-2">
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 cursor-pointer"
                                        onClick={() => handleView(member.id)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                                        onClick={() => handleDelete(member.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* Pagination Controls */}
            <span>
                Page {currentPage} of {lastPage}
            </span>

            <div className="mt-4 flex justify-end space-x-2">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Previous
                </button>

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(lastPage, prev + 1))}
                    disabled={currentPage === lastPage}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );


}
