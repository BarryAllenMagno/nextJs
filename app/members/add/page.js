'use client'

import { useState } from 'react';
import { API_BASE_URL } from '../../../../lib/config';

export default function Home() {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`${API_BASE_URL}/saveMember`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })

            const data = await res.json()
            alert(data.message || 'Saved successfully!')

            setForm({
                first_name: '',
                last_name: '',
                email: '',
            })

        } catch (err) {
            console.error(err)
            alert('Something went wrong.')
        }
    }

    return (
        <main className="p-6 max-w-3xl mx-auto min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-8 w-full">
                <h1 className="text-2xl font-bold mb-6">Add Member</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <label className="block mb-1 font-medium">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={form.first_name || ''}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                            placeholder="First Name"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={form.last_name || ''}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                            placeholder="Last Name"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email || ''}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            placeholder="Email"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Contact Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone || ''}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                            placeholder="Contact Number"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Birth Date</label>
                        <input
                            type="date"
                            name="birth_date"
                            value={form.birth_date || ''}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Gender</label>
                        <select
                            name="gender"
                            value={form.gender || ''}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="" disabled>Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium">Address</label>
                        <textarea
                            name="address"
                            value={form.address || ''}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="w-full border px-3 py-2 rounded"
                            placeholder="Address"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Marital Status</label>
                        <input
                            type="text"
                            name="marital_status"
                            value={form.marital_status || ''}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                            placeholder="Marital Status"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Spiritual Birthday</label>
                        <input
                            type="date"
                            name="spiritual_bday"
                            value={form.spiritual_bday || ''}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium">Status</label>
                        <input
                            type="text"
                            name="status"
                            value={form.status || ''}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                            placeholder="Status"
                        />
                    </div>

                    <div className="md:col-span-2 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => router.push('/')}
                            className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
