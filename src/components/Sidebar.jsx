import React from 'react';
import { Home, Calendar, FileText, Ticket, Bell, BarChart3, MessageSquare, Settings, Users, X } from 'lucide-react';

export default function Sidebar({ activeScreen, onNavigate, userRole, isOpen, onClose }) {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['admin', 'organizer', 'student'] },
        { id: 'calendar', label: 'Calendar', icon: Calendar, roles: ['admin', 'organizer', 'student'] },
        { id: 'events', label: 'Events', icon: Calendar, roles: ['admin', 'organizer'] },
        { id: 'users', label: 'Manage Users', icon: Users, roles: ['admin'] },
        { id: 'registrations', label: 'Registrations', icon: FileText, roles: ['admin', 'organizer'] },
        { id: 'attendance', label: 'Attendance', icon: Ticket, roles: ['admin', 'organizer'] },
        { id: 'notifications', label: 'Notifications', icon: Bell, roles: ['admin', 'organizer', 'student'] },
        { id: 'reports', label: 'Reports', icon: BarChart3, roles: ['admin', 'organizer'] },
        { id: 'feedback', label: 'Feedback', icon: MessageSquare, roles: ['admin', 'organizer', 'student'] },
        { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin', 'organizer', 'student'] },
    ];

    const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={onClose} />}
            <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1E293B] border-r border-slate-700 text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="h-16 flex items-center justify-between px-6 border-b border-slate-700">
                    <h1 className="text-xl font-bold tracking-wide">College Events</h1>
                    <button onClick={onClose} className="md:hidden p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {filteredNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeScreen === item.id;
                        return (
                            <button key={item.id} onClick={() => { onNavigate(item.id); onClose(); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-[#3B82F6] text-white shadow-md shadow-blue-900/20' : 'text-gray-400 hover:bg-[#334155] hover:text-white'}`}>
                                <Icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-slate-700"><div className="text-gray-500 text-xs font-medium text-center">v1.0.0 Beta</div></div>
            </div>
        </>
    );
}