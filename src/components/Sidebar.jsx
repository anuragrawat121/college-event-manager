import React from 'react';
import { Home, Calendar, FileText, Ticket, Bell, BarChart3, MessageSquare, Settings, Users } from 'lucide-react';

export default function Sidebar({ activeScreen, onNavigate, userRole }) {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['admin', 'organizer', 'student'] },
        { id: 'events', label: 'Events', icon: Calendar, roles: ['admin', 'organizer'] },

        // *** THIS IS THE NEW BUTTON ***
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
        <div className="w-64 bg-[#1E293B] h-screen flex flex-col border-r border-slate-700">
            <div className="p-6">
                <h1 className="text-white text-xl font-bold tracking-wide">College Events</h1>
            </div>

            <nav className="flex-1 px-3 space-y-1">
                {filteredNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeScreen === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-[#3B82F6] text-white shadow-md shadow-blue-900/20'
                                : 'text-gray-400 hover:bg-[#334155] hover:text-white'
                                }`}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-700">
                <div className="text-gray-500 text-xs font-medium text-center">
                    v1.0.0 Beta
                </div>
            </div>
        </div>
    );
}