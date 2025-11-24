import React from 'react';
import { User, Mail, Phone, MapPin, Shield, Camera } from 'lucide-react';

export function Profile({ darkMode, user }) {
    // Mock user data
    const userData = {
        name: user?.name || 'Admin User',
        role: user?.role || 'Administrator',
        email: 'admin@college.edu',
        phone: '+91 98765 43210',
        location: 'Computer Science Block, Floor 2',
        id: 'ADM-2024-001'
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>My Profile</h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage your personal information</p>
            </div>

            {/* Profile Card */}
            <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
                {/* Banner */}
                <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>

                <div className="px-8 pb-8">
                    {/* Avatar & Action */}
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center text-3xl font-bold ${darkMode ? 'bg-slate-800 border-[#1E293B] text-white' : 'bg-white border-white text-slate-800'}`}>
                            {userData.name.charAt(0)}
                            <button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-700 border-2 border-white dark:border-[#1E293B]">
                                <Camera size={14} />
                            </button>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors">
                            Edit Profile
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{userData.name}</h1>
                            <p className="text-blue-500 font-medium flex items-center gap-1 mt-1 capitalize">
                                <Shield size={16} /> {userData.role}
                            </p>

                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <Mail size={18} /> {userData.email}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <Phone size={18} /> {userData.phone}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <MapPin size={18} /> {userData.location}
                                </div>
                            </div>
                        </div>

                        {/* Stats / ID Badge */}
                        <div className={`p-6 rounded-xl border flex flex-col justify-center items-center text-center ${darkMode ? 'bg-slate-800/50 border-gray-700' : 'bg-slate-50 border-gray-200'}`}>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">College ID</span>
                            <div className="text-2xl font-mono font-bold text-blue-600 mt-1">{userData.id}</div>
                            <div className={`mt-4 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700`}>
                                Active Status
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}