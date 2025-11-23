import React, { useState } from 'react';
import { Search, Trash2, UserPlus, Mail, Shield, X, User, CheckCircle, XCircle } from 'lucide-react';

export function UserManagement({ darkMode }) {
    // Mock Data
    const [users, setUsers] = useState([
        { id: 1, name: 'Dr. Alan Smith', email: 'alan@college.edu', role: 'organizer', status: 'active' },
        { id: 2, name: 'Prof. Sarah Jones', email: 'sarah@college.edu', role: 'organizer', status: 'active' },
        { id: 3, name: 'John Doe', email: 'john.d@student.edu', role: 'student', status: 'active' },
        { id: 4, name: 'Jane Wilson', email: 'jane.w@student.edu', role: 'student', status: 'inactive' },
        { id: 5, name: 'Admin User', email: 'admin@college.edu', role: 'admin', status: 'active' },
    ]);

    // State for Modal
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // State for New User Form
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'student',
        status: 'active'
    });

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to remove this user?')) {
            setUsers(users.filter(user => user.id !== id));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        // Add new user to the list
        const newUser = {
            id: Date.now(), // Generate a unique ID
            ...formData
        };
        setUsers([newUser, ...users]); // Add to top of list

        // Reset and close
        setIsDialogOpen(false);
        setFormData({ name: '', email: '', role: 'student', status: 'active' });
    };

    const getRoleBadge = (role) => {
        switch (role) {
            case 'admin': return 'bg-purple-100 text-purple-700';
            case 'organizer': return 'bg-blue-100 text-blue-700';
            case 'student': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>User Management</h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage system access and roles</p>
                </div>
                <button
                    onClick={() => setIsDialogOpen(true)}
                    className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm"
                >
                    <UserPlus size={18} />
                    Add New User
                </button>
            </div>

            {/* Table Card */}
            <div className={`rounded-xl border shadow-sm overflow-hidden ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>

                {/* Toolbar */}
                <div className={`p-4 border-b flex items-center justify-between ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <h3 className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>All Users ({users.length})</h3>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${darkMode ? 'bg-[#0F172A] border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                        <Search size={18} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className={`bg-transparent border-none outline-none w-48 text-sm ${darkMode ? 'text-gray-200 placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'}`}
                        />
                    </div>
                </div>

                {/* User Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <th className={`p-4 font-medium text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>User</th>
                                <th className={`p-4 font-medium text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Role</th>
                                <th className={`p-4 font-medium text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                                <th className={`p-4 font-medium text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className={`border-b last:border-0 ${darkMode ? 'border-gray-700 hover:bg-[#0F172A]' : 'border-gray-100 hover:bg-gray-50'} transition-colors`}>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className={`font-medium text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{user.name}</p>
                                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                                    <Mail size={10} /> {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold capitalize ${getRoleBadge(user.role)}`}>
                                            <Shield size={10} /> {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium capitalize ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {user.status === 'active' ? <CheckCircle size={10} /> : <XCircle size={10} />} {user.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className={`p-2 rounded-lg hover:bg-red-50 ${darkMode ? 'text-red-400 hover:bg-red-900/20' : 'text-red-500'}`}
                                            title="Delete User"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add User Modal */}
            {isDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className={`w-full max-w-md rounded-2xl shadow-2xl p-6 ${darkMode ? "bg-[#1E293B] text-white" : "bg-white text-slate-900"}`}>

                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Add New User</h3>
                            <button onClick={() => setIsDialogOpen(false)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="text-sm font-medium mb-1 block">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Dr. Alice Smith"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full pl-10 pr-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600" : "bg-white border-gray-300"}`}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-sm font-medium mb-1 block">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        required
                                        placeholder="e.g. alice@college.edu"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={`w-full pl-10 pr-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600" : "bg-white border-gray-300"}`}
                                    />
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div>
                                <label className="text-sm font-medium mb-1 block">Role</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600" : "bg-white border-gray-300"}`}
                                >
                                    <option value="student">Student</option>
                                    <option value="organizer">Organizer</option>
                                    <option value="admin">Administrator</option>
                                </select>
                            </div>

                            {/* Status Selection */}
                            <div>
                                <label className="text-sm font-medium mb-1 block">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600" : "bg-white border-gray-300"}`}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsDialogOpen(false)}
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Create User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}