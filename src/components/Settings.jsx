import React, { useState } from 'react';
import { Save, Lock, Bell, Globe, Database, Moon, Sun, ToggleLeft, ToggleRight, Download, Trash2, RefreshCw } from 'lucide-react';

export function Settings({ darkMode, toggleDarkMode }) {
    const [activeTab, setActiveTab] = useState('general');
    const [notifSettings, setNotifSettings] = useState({ email: true, push: true, newsletter: false });
    const handleSave = () => { alert("Settings saved successfully!"); };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
                <div className={`w-full md:w-64 rounded-xl border h-fit ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}><div className="p-2 space-y-1">{[{ id: 'general', label: 'General', icon: Globe }, { id: 'security', label: 'Security', icon: Lock }, { id: 'notifications', label: 'Notifications', icon: Bell }, { id: 'system', label: 'System', icon: Database }].map((item) => (<button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'}`}><item.icon size={18} /> {item.label}</button>))}</div></div>
                <div className={`flex-1 rounded-xl border p-6 ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
                    {activeTab === 'general' && (<div><h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Appearance</h3><div className={`flex items-center justify-between p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}><div className="flex items-center gap-3"><div><p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Dark Mode</p></div></div><button onClick={toggleDarkMode} className="px-4 py-2 rounded-lg border">{darkMode ? 'Switch to Light' : 'Switch to Dark'}</button></div></div>)}
                    {activeTab === 'notifications' && (<div className="space-y-4">{[{ key: 'email', label: 'Email Notifications' }, { key: 'push', label: 'Push Notifications' }].map((setting) => (<div key={setting.key} className={`flex items-center justify-between p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}><p>{setting.label}</p><button onClick={() => setNotifSettings({ ...notifSettings, [setting.key]: !notifSettings[setting.key] })}>{notifSettings[setting.key] ? <ToggleRight size={40} className="text-blue-600" /> : <ToggleLeft size={40} className="text-gray-300" />}</button></div>))}</div>)}
                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end"><button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg"><Save size={18} /> Save Changes</button></div>
                </div>
            </div>
        </div>
    );
}