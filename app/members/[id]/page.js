'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import React, { use } from 'react';
import { API_BASE_URL } from '../../../lib/config';

export default function MemberDetail({ params }) {
    const unwrappedParams = use(params);
    const id = unwrappedParams.id;
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchMember() {
            try {
                const res = await fetch(`${API_BASE_URL}/getMemberDetails?id=${id}`);
                if (!res.ok) throw new Error('Failed to fetch');
                const json = await res.json();

                console.log('API response:', json);

                setMember(json.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchMember();
    }, [id]);

    const handleEdit = (id) => {
        router.push(`/members/edit/${id}`);
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (!member) return <div className="p-4">Member not found.</div>;

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">
                {member.first_name} {member.last_name}
            </h1>

            <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> {member.email || '-'}</p>
                <p><strong>Phone:</strong> {member.phone || '-'}</p>
                <p><strong>Birth Date:</strong> {member.birth_date || '-'}</p>
                <p><strong>Gender:</strong> {member.gender || '-'}</p>
                <p><strong>Address:</strong> {member.address || '-'}</p>
                <p><strong>Marital Status:</strong> {member.marital_status || '-'}</p>
                <p><strong>Spiritual Birthday:</strong> {member.spiritual_bday || '-'}</p>
                <p><strong>Status:</strong> {member.status || '-'}</p>
            </div>
            <div className="md:col-span-2 flex space-x-2">
                <button
                    onClick={() => router.push('/')}
                    className="mt-6 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded cursor-pointer"
                >
                    Back
                </button>
                <button
                    onClick={() => handleEdit(member.id)}
                    className="mt-6 bg-blue-300 hover:bg-gray-400 px-4 py-2 rounded cursor-pointer"
                >
                    Edit
                </button>
            </div>
        </div>
    );
}
