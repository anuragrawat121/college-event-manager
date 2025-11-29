import React, { useState } from 'react';
import { GraduationCap, ChevronDown } from 'lucide-react';

export default function Login({ onLogin, onForgotPassword }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');

    const handleSubmit = (e) => {
        e.preventDefault();
        const mockUsers = {
            admin: { name: 'Admin User', role: 'admin' },
            organizer: { name: 'Event Organizer', role: 'organizer' },
            student: { name: 'Anurag', role: 'student' },
        };
        onLogin(mockUsers[role]);
    };

    return (
        <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-[#3B82F6] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                        <GraduationCap size={32} className="text-white" />
                    </div>
                    <h1 className="text-slate-900 text-2xl font-bold mb-2">College Event Manager</h1>
                    <p className="text-slate-500">Sign in to continue to your dashboard</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">Email Address</label>
                        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]" required />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">Password</label>
                        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]" required />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">Select Role</label>
                        <div className="relative">
                            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6] appearance-none bg-white cursor-pointer">
                                <option value="student">Student</option>
                                <option value="organizer">Organizer</option>
                                <option value="admin">Administrator</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-2.5 rounded-lg transition-colors mt-2 shadow-md">Login</button>
                </form>
                <div className="mt-6 text-center">
                    <button onClick={onForgotPassword} className="text-[#3B82F6] text-sm font-medium hover:underline bg-transparent border-none cursor-pointer">Forgot password?</button>
                </div>
            </div>
        </div>
    );
}