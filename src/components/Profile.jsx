import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Shield, Camera, X, Save, Edit } from 'lucide-react';

export function Profile({ darkMode, user }) {
    const [profileData, setProfileData] = useState({ name: user?.name || 'Guest', role: user?.role || 'Visitor', email: 'user@college.edu', phone: '+91 98765 43210', location: 'CS Block', id: 'LOADING...' });
    useEffect(() => { setProfileData(prev => ({ ...prev, id: user?.role === 'admin' ? 'EMP-001' : `STU-2024-${Math.floor(Math.random() * 9000)}` })); }, [user]);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState(profileData);
    const handleEditClick = () => { setEditForm(profileData); setIsEditing(true); };
    const handleSave = (e) => { e.preventDefault(); setProfileData(editForm); setIsEditing(false); };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                <div className="px-8 pb-8"><div className="relative flex justify-between items-end -mt-12 mb-6"><div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center text-3xl font-bold ${darkMode ? 'bg-slate-800 border-[#1E293B] text-white' : 'bg-white border-white text-slate-800'}`}>{profileData.name.charAt(0)}</div><button onClick={handleEditClick} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"><Edit size={16} /> Edit Profile</button></div><div className="grid md:grid-cols-2 gap-8"><div><h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{profileData.name}</h1><p className="text-blue-500">{profileData.role}</p><div className="mt-6 space-y-3"><div className="flex gap-3"><Mail size={18} /> {profileData.email}</div><div className="flex gap-3"><Phone size={18} /> {profileData.phone}</div></div></div><div className={`p-6 rounded-xl border text-center ${darkMode ? 'bg-slate-800/50 border-gray-700' : 'bg-slate-50 border-gray-200'}`}><div className="text-2xl font-mono font-bold text-blue-600">{profileData.id}</div></div></div></div>
            </div>
            {isEditing && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"><div className={`w-full max-w-md rounded-2xl shadow-2xl p-6 ${darkMode ? "bg-[#1E293B] text-white" : "bg-white text-slate-900"}`}><form onSubmit={handleSave} className="space-y-4"><input className={`w-full p-2 border rounded ${darkMode ? 'bg-[#0F172A] border-gray-600' : ''}`} value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} /><button className="w-full bg-blue-600 text-white py-2 rounded">Save</button></form></div></div>)}
        </div>
    );
}