'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { API_BASE_URL } from '../../../../lib/config';

export default function EditMemberPage() {
    const router = useRouter();
    const { id } = useParams();
    const [member, setMember] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        birth_date: '',
        gender: '',
        address: '',
        marital_status: '',
        spiritual_bday: '',
        status: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/getMemberDetails?id=${id}`);
                const data = await res.json();
                setMember(data.data);
                console.log('Fetched member:', data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching member:', error);
                setLoading(false);
            }
        };

        if (id) fetchMember();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        const confirmed = window.confirm('Are you sure you want to update this member?');
        if (!confirmed) return;

        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/updateMember`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(member),
            });

            if (res.ok) {
                router.push('/members');
            } else {
                console.error('Failed to update member');
            }
        } catch (error) {
            console.error('Error updating member:', error);
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Member</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                    <label className="block mb-1 font-medium">First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={member.first_name || ''}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label className="block mb-1 font-medium">Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={member.last_name || ''}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={member.email || ''}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block mb-1 font-medium">Contact Number</label>
                    <input
                        type="text"
                        name="phone"
                        value={member.phone || ''}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Birth Date */}
                <div>
                    <label className="block mb-1 font-medium">Birth Date</label>
                    <input
                        type="date"
                        name="birth_date"
                        value={member.birth_date || ''}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Gender */}
                <div>
                    <label className="block mb-1 font-medium">Gender</label>
                    <select
                        name="gender"
                        value={member.gender || ''}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    >
                        <option value="" disabled>
                            Select gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>


                {/* Marital Status */}
                <div>
                    <label className="block mb-1 font-medium">Marital Status</label>
                    <input
                        type="text"
                        name="marital_status"
                        value={member.marital_status || ''}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Spiritual Birthday */}
                <div>
                    <label className="block mb-1 font-medium">Spiritual Birthday</label>
                    <input
                        type="date"
                        name="spiritual_bday"
                        value={member.spiritual_bday || ''}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block mb-1 font-medium">Status</label>
                    <input
                        type="text"
                        name="status"
                        value={member.status || ''}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Address - Full Width */}
                <div className="md:col-span-2">
                    <label className="block mb-1 font-medium">Address</label>
                    <textarea
                        name="address"
                        value={member.address || ''}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
                <div className="md:col-span-2 flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={() => router.push(`/members/${member.id}`)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );

}

