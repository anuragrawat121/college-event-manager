import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Shield, Camera, X, Save, Edit } from 'lucide-react';

export function Profile({ darkMode, user }) {

    // 1. Local State
    const [profileData, setProfileData] = useState({
        name: user?.name || 'Guest User',
        role: user?.role || 'Visitor',
        email: `${user?.name?.toLowerCase().replace(/\s+/g, '.') || 'user'}@college.edu`,
        phone: '+91 98765 43210',
        location: 'Computer Science Block, Floor 2',
        id: 'LOADING...'
    });

    // 2. Generate IDs
    useEffect(() => {
        let generatedId = '';
        const randomNum = Math.floor(1000 + Math.random() * 9000);

        switch (user?.role) {
            case 'admin': generatedId = 'EMP-001'; break;
            case 'organizer': generatedId = `ORG-2024-${randomNum}`; break;
            case 'student': generatedId = `STU-2024-${randomNum}`; break;
            default: generatedId = `GST-${randomNum}`;
        }

        setProfileData(prev => ({ ...prev, id: generatedId }));
    }, [user]);

    // 3. Modal State
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState(profileData);

    // 4. Handlers
    const handleEditClick = () => {
        setEditForm(profileData);
        setIsEditing(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        setProfileData(editForm);
        setIsEditing(false);
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
                <div className={`h-32 bg-gradient-to-r ${profileData.role === 'admin' ? 'from-purple-600 to-blue-600' :
                        profileData.role === 'organizer' ? 'from-blue-600 to-cyan-600' :
                            'from-emerald-500 to-teal-600'
                    }`}></div>

                <div className="px-8 pb-8">

                    {/* Avatar & Edit Button Row */}
                    <div className="relative flex justify-between items-end -mt-12 mb-6">

                        {/* Avatar Circle (With Camera Sticker) */}
                        <div className={`relative w-24 h-24 rounded-full border-4 flex items-center justify-center text-3xl font-bold ${darkMode ? 'bg-slate-800 border-[#1E293B] text-white' : 'bg-white border-white text-slate-800'}`}>
                            {profileData.name.charAt(0)}

                            {/* Camera Icon - Strictly positioned on the Avatar */}
                            <button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-700 border-2 border-white dark:border-[#1E293B] transition-transform hover:scale-110">
                                <Camera size={14} />
                            </button>
                        </div>

                        {/* Edit Profile Button (Clean Layout) */}
                        <button
                            onClick={handleEditClick}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm"
                        >
                            <Edit size={16} /> {/* Icon sits nicely next to text */}
                            <span>Edit Profile</span>
                        </button>
                    </div>

                    {/* User Details Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{profileData.name}</h1>
                            <p className="text-blue-500 font-medium flex items-center gap-1 mt-1 capitalize">
                                <Shield size={16} /> {profileData.role}
                            </p>

                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <Mail size={18} /> {profileData.email}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <Phone size={18} /> {profileData.phone}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <MapPin size={18} /> {profileData.location}
                                </div>
                            </div>
                        </div>

                        {/* ID Badge */}
                        <div className={`p-6 rounded-xl border flex flex-col justify-center items-center text-center ${darkMode ? 'bg-slate-800/50 border-gray-700' : 'bg-slate-50 border-gray-200'}`}>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                {profileData.role === 'admin' ? 'Employee ID' : 'Student / Staff ID'}
                            </span>
                            <div className="text-2xl font-mono font-bold text-blue-600 mt-1">{profileData.id}</div>
                            <div className={`mt-4 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700`}>
                                Active Status
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- EDIT MODAL --- */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className={`w-full max-w-md rounded-2xl shadow-2xl p-6 ${darkMode ? "bg-[#1E293B] text-white" : "bg-white text-slate-900"}`}>

                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Edit Profile</h3>
                            <button onClick={() => setIsEditing(false)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4">
                            {/* Inputs (With fixed text colors for dark mode) */}
                            <div>
                                <label className="text-sm font-medium mb-1 block text-gray-500">Full Name</label>
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600 text-white" : "bg-white border-gray-300 text-slate-900"}`}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block text-gray-500">Phone Number</label>
                                <input
                                    type="text"
                                    value={editForm.phone}
                                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                    className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600 text-white" : "bg-white border-gray-300 text-slate-900"}`}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block text-gray-500">Office / Location</label>
                                <input
                                    type="text"
                                    value={editForm.location}
                                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                    className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600 text-white" : "bg-white border-gray-300 text-slate-900"}`}
                                />
                            </div>

                            {/* Disabled Email */}
                            <div>
                                <label className="text-sm font-medium mb-1 block text-gray-500">Email Address (Read Only)</label>
                                <input
                                    type="email"
                                    disabled
                                    value={editForm.email}
                                    className={`w-full px-3 py-2 rounded-lg border outline-none cursor-not-allowed opacity-70 ${darkMode ? "bg-slate-800 border-gray-600 text-gray-400" : "bg-gray-100 border-gray-300 text-gray-500"}`}
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Save size={18} /> Save Changes
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}

        </div>
    );
}