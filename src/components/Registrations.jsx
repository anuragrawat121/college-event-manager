import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Filter, Eye } from 'lucide-react';

export function Registrations({ darkMode }) {
    // Mock Data
    const [registrations, setRegistrations] = useState([
        { id: 1, student: 'John Doe', event: 'Tech Workshop 2024', date: '2024-10-15', status: 'pending', email: 'john@student.edu' },
        { id: 2, student: 'Jane Smith', event: 'Career Fair', date: '2024-10-14', status: 'approved', email: 'jane@student.edu' },
        { id: 3, student: 'Mike Ross', event: 'Tech Workshop 2024', date: '2024-10-15', status: 'rejected', email: 'mike@student.edu' },
        { id: 4, student: 'Sarah Connor', event: 'Cultural Fest', date: '2024-10-12', status: 'approved', email: 'sarah@student.edu' },
        { id: 5, student: 'Bruce Wayne', event: 'Hackathon', date: '2024-11-01', status: 'pending', email: 'bruce@student.edu' },
    ]);

    const handleStatusChange = (id, newStatus) => {
        setRegistrations(registrations.map(reg =>
            reg.id === id ? { ...reg, status: newStatus } : reg
        ));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-700';
            case 'rejected': return 'bg-red-100 text-red-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>Registrations</h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage student event sign-ups</p>
                </div>
                <div className="flex gap-3">
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${darkMode ? 'bg-[#0F172A] border-gray-600' : 'bg-white border-gray-200'}`}>
                        <Filter size={18} className="text-gray-400" />
                        <select className={`bg-transparent border-none outline-none text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table Card */}
            <div className={`rounded-xl border shadow-sm overflow-hidden ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className={`p-4 border-b flex items-center justify-between ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <h3 className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Recent Requests</h3>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${darkMode ? 'bg-[#0F172A] border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                        <Search size={18} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search students..."
                            className={`bg-transparent border-none outline-none w-48 text-sm ${darkMode ? 'text-gray-200 placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'}`}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <th className={`p-4 font-medium text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Student Name</th>
                                <th className={`p-4 font-medium text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Event</th>
                                <th className={`p-4 font-medium text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date</th>
                                <th className={`p-4 font-medium text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                                <th className={`p-4 font-medium text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map((reg) => (
                                <tr key={reg.id} className={`border-b last:border-0 ${darkMode ? 'border-gray-700 hover:bg-[#0F172A]' : 'border-gray-100 hover:bg-gray-50'} transition-colors`}>
                                    <td className="p-4">
                                        <div>
                                            <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{reg.student}</p>
                                            <p className="text-xs text-gray-500">{reg.email}</p>
                                        </div>
                                    </td>
                                    <td className={`p-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{reg.event}</td>
                                    <td className={`p-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{reg.date}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(reg.status)}`}>
                                            {reg.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            {reg.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusChange(reg.id, 'approved')}
                                                        className="p-1.5 rounded bg-green-100 text-green-600 hover:bg-green-200 transition"
                                                        title="Approve"
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(reg.id, 'rejected')}
                                                        className="p-1.5 rounded bg-red-100 text-red-600 hover:bg-red-200 transition"
                                                        title="Reject"
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                </>
                                            )}
                                            {reg.status !== 'pending' && (
                                                <button className={`p-1.5 rounded ${darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-400 hover:bg-gray-100'}`}>
                                                    <Eye size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}