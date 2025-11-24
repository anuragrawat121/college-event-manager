import React, { useState } from 'react';
import { Save, Lock, Bell, Globe, Database, Moon, Sun } from 'lucide-react';

export function Settings({ darkMode, toggleDarkMode }) {
    const [activeTab, setActiveTab] = useState('general');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>Settings</h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage your account and application preferences</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">

                {/* Settings Sidebar */}
                <div className={`w-full md:w-64 rounded-xl border h-fit ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="p-2 space-y-1">
                        {[
                            { id: 'general', label: 'General', icon: Globe },
                            { id: 'security', label: 'Security', icon: Lock },
                            { id: 'notifications', label: 'Notifications', icon: Bell },
                            { id: 'system', label: 'System', icon: Database },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id
                                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Settings Content */}
                <div className={`flex-1 rounded-xl border p-6 ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>

                    {/* General Tab */}
                    {activeTab === 'general' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Profile Information</h3>
                                <p className="text-sm text-gray-500">Update your public profile details.</p>
                            </div>

                            <div className="grid gap-4 max-w-xl">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium mb-1.5 block text-gray-500">First Name</label>
                                        <input type="text" defaultValue="Admin" className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600 text-gray-200" : "bg-white border-gray-300"}`} />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1.5 block text-gray-500">Last Name</label>
                                        <input type="text" defaultValue="User" className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600 text-gray-200" : "bg-white border-gray-300"}`} />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block text-gray-500">Email Address</label>
                                    <input type="email" defaultValue="admin@college.edu" className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600 text-gray-200" : "bg-white border-gray-300"}`} />
                                </div>
                            </div>

                            <hr className={darkMode ? 'border-gray-700' : 'border-gray-100'} />

                            <div>
                                <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Appearance</h3>
                                <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                                        </div>
                                        <div>
                                            <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Dark Mode</p>
                                            <p className="text-sm text-gray-500">Toggle application theme</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={toggleDarkMode}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${darkMode
                                                ? 'border-gray-600 text-gray-200 hover:bg-gray-800'
                                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {darkMode ? 'Switch to Light' : 'Switch to Dark'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Password</h3>
                                <p className="text-sm text-gray-500">Change your password to keep your account secure.</p>
                            </div>

                            <div className="space-y-4 max-w-xl">
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block text-gray-500">Current Password</label>
                                    <input type="password" className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600" : "bg-white border-gray-300"}`} />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block text-gray-500">New Password</label>
                                    <input type="password" className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600" : "bg-white border-gray-300"}`} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Save Button (Common) */}
                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                            <Save size={18} />
                            Save Changes
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}